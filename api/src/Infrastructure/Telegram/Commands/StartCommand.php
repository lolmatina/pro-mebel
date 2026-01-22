<?php

declare(strict_types=1);

namespace App\Infrastructure\Telegram\Commands;

use App\Domain\TelegramUser\TelegramUserRepository;
use App\Infrastructure\Database\Database;
use Longman\TelegramBot\Commands\SystemCommand;
use Longman\TelegramBot\Entities\ServerResponse;
use Longman\TelegramBot\Exception\TelegramException;

class StartCommand extends SystemCommand
{
    protected $name = 'start';
    protected $description = 'Start command';
    protected $usage = '/start';
    protected $version = '1.0.0';

    public function execute(): ServerResponse
    {
        $message = $this->getMessage();
        $chatId = $message->getChat()->getId();
        
        /**
         * Use Longman parsing instead of string replace:
         * - Handles "/start@BotName ..."
         * - Handles deep-link payloads: https://t.me/BotName?start=payload
         */
        $text = trim((string) $message->getText(true));

        // Get password from environment (more reliable than $_ENV in many deployments)
        $correctPassword = (string) (getenv('TELEGRAM_BOT_PASSWORD') ?: ($_ENV['TELEGRAM_BOT_PASSWORD'] ?? 'change-me'));

        try {
            $repo = $this->getTelegramUserRepository();

            // Check if user already exists
            if ($repo->existsByChatId($chatId)) {
                return $this->replyToChat(
                    "✅ Вы уже авторизованы!\n\n" .
                    "Вы будете получать уведомления о новых заявках."
                );
            }

            // If no password provided, ask for it
            if (empty($text)) {
                return $this->replyToChat(
                    "🔐 Добро пожаловать!\n\n" .
                    "Для авторизации отправьте команду:\n" .
                    "/start <пароль>"
                );
            }

            // Check password
            if ($text !== $correctPassword) {
                return $this->replyToChat(
                    "❌ Неверный пароль!\n\n" .
                    "Попробуйте еще раз: /start <пароль>"
                );
            }

            // Save user to database
            $user = $message->getFrom();
            $repo->create(
                $chatId,
                $user->getUsername(),
                $user->getFirstName(),
                $user->getLastName()
            );

            return $this->replyToChat(
                "✅ Авторизация успешна!\n\n" .
                "Теперь вы будете получать уведомления о всех новых заявках.\n\n" .
                "Команды:\n" .
                "/help - Справка\n" .
                "/stop - Отключить уведомления"
            );

        } catch (\Exception $e) {
            error_log('Telegram bot error: ' . $e->getMessage());
            return $this->replyToChat(
                "❌ Произошла ошибка при авторизации.\n" .
                "Пожалуйста, попробуйте позже."
            );
        }
    }

    private function getTelegramUserRepository(): TelegramUserRepository
    {
        return new \App\Infrastructure\Persistence\TelegramUser\DatabaseTelegramUserRepository();
    }
}
