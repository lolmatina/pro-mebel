<?php

declare(strict_types=1);

namespace App\Application\Actions\Telegram;

use App\Application\Actions\Action;
use Longman\TelegramBot\Exception\TelegramException;
use Longman\TelegramBot\Telegram;
use Psr\Http\Message\ResponseInterface as Response;

class StopTelegramBotAction extends Action
{
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
            // Create Telegram API object
            $telegram = new Telegram($botToken, $botUsername);

            // Delete webhook and drop all pending updates
            $deleteResult = $telegram->deleteWebhook(['drop_pending_updates' => true]);

            $this->logger->info('Telegram bot stopped', [
                'webhook_deleted' => $deleteResult->isOk(),
                'pending_updates_dropped' => true,
            ]);

            return $this->respondWithData([
                'success' => true,
                'message' => 'Bot stopped successfully',
                'webhook_deleted' => $deleteResult->isOk(),
                'pending_updates_dropped' => true,
            ]);

        } catch (TelegramException $e) {
            $this->logger->error('Failed to stop Telegram bot: ' . $e->getMessage());
            return $this->respondWithData(['error' => $e->getMessage()], 500);
        }
    }
}
