<?php

declare(strict_types=1);

namespace App\Application\Actions\Telegram;

use App\Application\Actions\Action;
use Longman\TelegramBot\Exception\TelegramException;
use Longman\TelegramBot\Telegram;
use Psr\Http\Message\ResponseInterface as Response;

class TelegramWebhookAction extends Action
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

            // Set custom commands path
            $telegram->addCommandsPaths([
                __DIR__ . '/../../../Infrastructure/Telegram/Commands',
            ]);

            // Enable MySQL connection for Telegram Bot (optional - for logging)
            /*
            $telegram->enableMySql([
                'host'     => $_ENV['DB_HOST'] ?? 'localhost',
                'port'     => (int) ($_ENV['DB_PORT'] ?? 3306),
                'user'     => $_ENV['DB_USER'] ?? 'orders_user',
                'password' => $_ENV['DB_PASSWORD'] ?? 'orders_password',
                'database' => $_ENV['DB_NAME'] ?? 'orders',
            ]);
            */

            // Handle webhook request
            $serverResponse = $telegram->handle();

            $this->logger->info('Telegram webhook processed', [
                'ok' => $serverResponse->isOk(),
                'description' => $serverResponse->getDescription(),
            ]);

            return $this->respondWithData([
                'ok' => $serverResponse->isOk(),
                'description' => $serverResponse->getDescription(),
            ]);

        } catch (TelegramException $e) {
            $this->logger->error('Telegram webhook error: ' . $e->getMessage());
            return $this->respondWithData(['error' => $e->getMessage()], 500);
        }
    }
}
