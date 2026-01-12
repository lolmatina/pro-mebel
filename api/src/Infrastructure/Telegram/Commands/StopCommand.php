<?php

declare(strict_types=1);

namespace App\Infrastructure\Telegram\Commands;

use App\Domain\TelegramUser\TelegramUserRepository;
use Longman\TelegramBot\Commands\SystemCommand;
use Longman\TelegramBot\Entities\ServerResponse;

class StopCommand extends SystemCommand
{
    protected $name = 'stop';
    protected $description = 'Stop receiving notifications';
    protected $usage = '/stop';
    protected $version = '1.0.0';

    public function execute(): ServerResponse
    {
        $message = $this->getMessage();
        $chatId = $message->getChat()->getId();

        try {
            $repo = $this->getTelegramUserRepository();

            // Check if user exists
            if (!$repo->existsByChatId($chatId)) {
                return $this->replyToChat(
                    "❌ Вы не авторизованы.\n\n" .
                    "Используйте /start для авторизации."
                );
            }

            // Deactivate user
            $repo->updateStatus($chatId, false);

            return $this->replyToChat(
                "✅ Уведомления отключены.\n\n" .
                "Используйте /start для повторной активации."
            );

        } catch (\Exception $e) {
            error_log('Telegram bot StopCommand error: ' . $e->getMessage());
            error_log('Trace: ' . $e->getTraceAsString());
            return $this->replyToChat(
                "❌ Произошла ошибка.\n" .
                "Пожалуйста, попробуйте позже.\n\n" .
                "Ошибка: " . $e->getMessage()
            );
        }
    }

    private function getTelegramUserRepository(): TelegramUserRepository
    {
        // Autoloader should handle this, but ensure Database class is available
        if (!class_exists('App\Infrastructure\Database\Database')) {
            require_once __DIR__ . '/../../../Infrastructure/Database/Database.php';
        }
        
        return new \App\Infrastructure\Persistence\TelegramUser\DatabaseTelegramUserRepository();
    }
}
