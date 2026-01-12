<?php

declare(strict_types=1);

namespace App\Infrastructure\Telegram;

use App\Domain\Application\Application;
use App\Domain\Product\Product;
use App\Domain\TelegramUser\TelegramUserRepository;
use Longman\TelegramBot\Exception\TelegramException;
use Longman\TelegramBot\Request;
use Longman\TelegramBot\Telegram;
use Psr\Log\LoggerInterface;

class TelegramBotService
{
    private string $botToken;
    private string $botUsername;
    private TelegramUserRepository $telegramUserRepository;
    private LoggerInterface $logger;

    public function __construct(
        string $botToken,
        string $botUsername,
        TelegramUserRepository $telegramUserRepository,
        LoggerInterface $logger
    ) {
        $this->botToken = $botToken;
        $this->botUsername = $botUsername;
        $this->telegramUserRepository = $telegramUserRepository;
        $this->logger = $logger;
    }

    /**
     * Get Telegram Bot instance
     */
    public function getTelegram(): Telegram
    {
        try {
            return new Telegram($this->botToken, $this->botUsername);
        } catch (TelegramException $e) {
            $this->logger->error('Failed to create Telegram instance: ' . $e->getMessage());
            throw new \RuntimeException('Failed to initialize Telegram bot: ' . $e->getMessage());
        }
    }

    /**
     * Send application notification to all active telegram users
     */
    public function sendApplicationNotification(Application $application, ?Product $product = null): void
    {
        $activeUsers = $this->telegramUserRepository->findAllActive();

        if (empty($activeUsers)) {
            $this->logger->info('No active telegram users to notify');
            return;
        }

        $message = $this->formatApplicationMessage($application, $product);

        foreach ($activeUsers as $user) {
            try {
                $data = [
                    'chat_id' => $user->getChatId(),
                    'text' => $message,
                    'parse_mode' => 'HTML',
                ];

                // Add product image if available
                if ($product !== null && $product->getImage()) {
                    $this->sendPhotoMessage($user->getChatId(), $product->getImage(), $message);
                } else {
                    Request::sendMessage($data);
                }

                $this->logger->info("Notification sent to chat_id: {$user->getChatId()}");
            } catch (TelegramException $e) {
                $this->logger->error("Failed to send notification to chat_id {$user->getChatId()}: {$e->getMessage()}");
            }
        }
    }

    /**
     * Send photo message with caption
     */
    private function sendPhotoMessage(int $chatId, string $imageUrl, string $caption): void
    {
        try {
            $data = [
                'chat_id' => $chatId,
                'photo' => $imageUrl,
                'caption' => $caption,
                'parse_mode' => 'HTML',
            ];

            Request::sendPhoto($data);
        } catch (TelegramException $e) {
            // If photo fails, send as text message
            $this->logger->warning("Failed to send photo, sending as text: {$e->getMessage()}");
            Request::sendMessage([
                'chat_id' => $chatId,
                'text' => $caption . "\n\n🖼 Изображение: " . $imageUrl,
                'parse_mode' => 'HTML',
            ]);
        }
    }

    /**
     * Format application message for Telegram
     */
    private function formatApplicationMessage(Application $application, ?Product $product = null): string
    {
        $readyToOrder = $application->isReadyToOrder() ? '✅ Да' : '❌ Нет';
        
        $message = "🆕 <b>Новая заявка</b>\n\n";
        $message .= "📧 <b>Email:</b> {$application->getEmail()}\n";
        $message .= "👤 <b>Имя:</b> {$application->getFullName()}\n";
        $message .= "🏙 <b>Город:</b> {$application->getCity()}\n";
        $message .= "📝 <b>Описание:</b> {$application->getDescription()}\n";
        $message .= "🛒 <b>Готов оформить заказ:</b> {$readyToOrder}\n";
        
        if ($product !== null) {
            $message .= "\n🛋 <b>Товар:</b> {$product->getName()}\n";
            $message .= "📄 <b>Описание товара:</b> {$product->getDescription()}\n";
        }
        
        $message .= "\n⏰ <b>Дата:</b> {$application->getCreatedAt()}";

        return $message;
    }

    /**
     * Send message to specific chat
     */
    public function sendMessage(int $chatId, string $message): void
    {
        try {
            $data = [
                'chat_id' => $chatId,
                'text' => $message,
                'parse_mode' => 'HTML',
            ];

            Request::sendMessage($data);
            $this->logger->info("Message sent to chat_id: {$chatId}");
        } catch (TelegramException $e) {
            $this->logger->error("Failed to send message to chat_id {$chatId}: {$e->getMessage()}");
            throw new \RuntimeException('Failed to send Telegram message: ' . $e->getMessage());
        }
    }
}
