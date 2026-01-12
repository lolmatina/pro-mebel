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
            // Log incoming request
            $input = $this->request->getBody()->getContents();
            $this->logger->info('Telegram webhook received', [
                'input' => $input,
            ]);

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

            // Handle webhook request (pass the input directly)
            $serverResponse = $telegram->handle();

            $this->logger->info('Telegram webhook processed', [
                'ok' => $serverResponse->isOk(),
                'description' => $serverResponse->getDescription(),
                'result' => $serverResponse->getResult(),
            ]);

            // Return success - Telegram expects 200 OK
            return $this->response->withStatus(200);

        } catch (TelegramException $e) {
            $this->logger->error('Telegram webhook error: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString(),
            ]);
            // Still return 200 to prevent Telegram from retrying
            return $this->response->withStatus(200);
        } catch (\Exception $e) {
            $this->logger->error('Unexpected error in webhook: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString(),
            ]);
            // Still return 200 to prevent Telegram from retrying
            return $this->response->withStatus(200);
        }
    }
}
