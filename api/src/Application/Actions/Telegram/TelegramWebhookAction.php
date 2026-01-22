<?php

declare(strict_types=1);

namespace App\Application\Actions\Telegram;

use App\Application\Actions\Action;
use App\Domain\TelegramUser\TelegramUserRepository;
use Longman\TelegramBot\Exception\TelegramException;
use Longman\TelegramBot\Request;
use Longman\TelegramBot\Telegram;
use Psr\Http\Message\ResponseInterface as Response;

class TelegramWebhookAction extends Action
{
    private TelegramUserRepository $telegramUserRepository;

    public function __construct(
        \Psr\Log\LoggerInterface $logger,
        TelegramUserRepository $telegramUserRepository
    ) {
        parent::__construct($logger);
        $this->telegramUserRepository = $telegramUserRepository;
    }

    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        // Get bot configuration from environment
        $botToken = $_ENV['TELEGRAM_BOT_TOKEN'] ?? '';
        $botUsername = $_ENV['TELEGRAM_BOT_USERNAME'] ?? '';

        if (empty($botToken) || empty($botUsername)) {
            $this->logger->error('Telegram bot not configured');
            return $this->respondWithData(['error' => 'Bot not configured'], 500);
        }

        try {
            // Get raw input from Telegram
            $input = file_get_contents('php://input');
            if (empty($input)) {
                $this->logger->error('Empty webhook input');
                return $this->respondWithData(['error' => 'Empty input'], 400);
            }

            $update = json_decode($input, true);
            if (json_last_error() !== JSON_ERROR_NONE) {
                $this->logger->error('Invalid JSON in webhook: ' . json_last_error_msg());
                return $this->respondWithData(['error' => 'Invalid JSON'], 400);
            }

            // Initialize Telegram API for sending responses
            $telegram = new Telegram($botToken, $botUsername);
            Request::initialize($telegram);

            // Process the update
            $this->processUpdate($update);

            $this->logger->info('Telegram webhook processed successfully');

            return $this->respondWithData([
                'ok' => true,
                'description' => 'Update processed',
            ]);

        } catch (\Exception $e) {
            $this->logger->error('Telegram webhook error: ' . $e->getMessage());
            return $this->respondWithData(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Process incoming update from Telegram
     */
    private function processUpdate(array $update): void
    {
        // Handle message updates
        if (isset($update['message'])) {
            $message = $update['message'];
            $chatId = $message['chat']['id'] ?? null;
            $text = $message['text'] ?? '';

            if (!$chatId) {
                return;
            }

            // Handle commands
            if (strpos($text, '/') === 0) {
                $this->handleCommand($chatId, $text, $message);
            }
        }
    }

    /**
     * Handle bot commands
     */
    private function handleCommand(int $chatId, string $text, array $message): void
    {
        // Parse command and arguments
        $parts = explode(' ', $text, 2);
        $command = strtolower(trim($parts[0]));
        $args = isset($parts[1]) ? trim($parts[1]) : '';

        // Remove bot username from command if present (@botname)
        $command = preg_replace('/@' . preg_quote($_ENV['TELEGRAM_BOT_USERNAME'] ?? '', '/') . '$/i', '', $command);

        switch ($command) {
            case '/start':
                $this->handleStartCommand($chatId, $args, $message);
                break;

            case '/stop':
                $this->handleStopCommand($chatId);
                break;

            case '/help':
                $this->handleHelpCommand($chatId);
                break;

            default:
                $this->sendMessage($chatId, "❓ Неизвестная команда. Используйте /help для справки.");
                break;
        }
    }

    /**
     * Handle /start command
     */
    private function handleStartCommand(int $chatId, string $password, array $message): void
    {
        try {
            // Check if user already exists
            if ($this->telegramUserRepository->existsByChatId($chatId)) {
                $this->sendMessage(
                    $chatId,
                    "✅ Вы уже авторизованы!\n\n" .
                    "Вы будете получать уведомления о новых заявках."
                );
                return;
            }

            // If no password provided, ask for it
            if (empty($password)) {
                $this->sendMessage(
                    $chatId,
                    "🔐 Добро пожаловать!\n\n" .
                    "Для авторизации отправьте команду:\n" .
                    "/start <пароль>"
                );
                return;
            }

            // Check password
            $correctPassword = $_ENV['TELEGRAM_BOT_PASSWORD'] ?? 'change-me';
            if ($password !== $correctPassword) {
                $this->sendMessage(
                    $chatId,
                    "❌ Неверный пароль!\n\n" .
                    "Попробуйте еще раз: /start <пароль>"
                );
                return;
            }

            // Save user to database
            $from = $message['from'] ?? [];
            $this->telegramUserRepository->create(
                $chatId,
                $from['username'] ?? null,
                $from['first_name'] ?? null,
                $from['last_name'] ?? null
            );

            $this->sendMessage(
                $chatId,
                "✅ Авторизация успешна!\n\n" .
                "Теперь вы будете получать уведомления о всех новых заявках.\n\n" .
                "Команды:\n" .
                "/help - Справка\n" .
                "/stop - Отключить уведомления"
            );

        } catch (\Exception $e) {
            $this->logger->error('Error in /start command: ' . $e->getMessage());
            $this->sendMessage(
                $chatId,
                "❌ Произошла ошибка при авторизации.\n" .
                "Пожалуйста, попробуйте позже."
            );
        }
    }

    /**
     * Handle /stop command
     */
    private function handleStopCommand(int $chatId): void
    {
        try {
            if (!$this->telegramUserRepository->existsByChatId($chatId)) {
                $this->sendMessage(
                    $chatId,
                    "❓ Вы не авторизованы.\n\n" .
                    "Для начала работы используйте /start <пароль>"
                );
                return;
            }

            $this->telegramUserRepository->updateStatus($chatId, false);

            $this->sendMessage(
                $chatId,
                "👋 Уведомления отключены.\n\n" .
                "Вы больше не будете получать сообщения о новых заявках.\n\n" .
                "Для возобновления используйте /start <пароль>"
            );

        } catch (\Exception $e) {
            $this->logger->error('Error in /stop command: ' . $e->getMessage());
            $this->sendMessage(
                $chatId,
                "❌ Произошла ошибка.\n" .
                "Пожалуйста, попробуйте позже."
            );
        }
    }

    /**
     * Handle /help command
     */
    private function handleHelpCommand(int $chatId): void
    {
        $this->sendMessage(
            $chatId,
            "📖 <b>Справка по командам бота</b>\n\n" .
            "/start &lt;пароль&gt; - Авторизация и подключение к уведомлениям\n" .
            "/stop - Отключить уведомления\n" .
            "/help - Показать эту справку\n\n" .
            "После авторизации вы будете автоматически получать уведомления о всех новых заявках."
        );
    }

    /**
     * Send message to chat
     */
    private function sendMessage(int $chatId, string $text): void
    {
        try {
            Request::sendMessage([
                'chat_id' => $chatId,
                'text' => $text,
                'parse_mode' => 'HTML',
            ]);
        } catch (TelegramException $e) {
            $this->logger->error("Failed to send message to chat {$chatId}: " . $e->getMessage());
        }
    }
}
