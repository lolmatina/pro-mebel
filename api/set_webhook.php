<?php

declare(strict_types=1);

use Longman\TelegramBot\Exception\TelegramException;
use Longman\TelegramBot\Telegram;

require __DIR__ . '/vendor/autoload.php';

// Load environment variables from .env file
if (file_exists(__DIR__ . '/.env')) {
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
    $dotenv->load();
}

// Get bot configuration from environment
$botToken = $_ENV['TELEGRAM_BOT_TOKEN'] ?? '';
$botUsername = $_ENV['TELEGRAM_BOT_USERNAME'] ?? '';
$webhookUrl = $_ENV['TELEGRAM_WEBHOOK_URL'] ?? '';

if (empty($botToken) || empty($botUsername)) {
    echo "Error: TELEGRAM_BOT_TOKEN and TELEGRAM_BOT_USERNAME must be set in .env file\n";
    exit(1);
}

if (empty($webhookUrl)) {
    echo "Error: TELEGRAM_WEBHOOK_URL must be set in .env file\n";
    echo "Example: TELEGRAM_WEBHOOK_URL=https://yourdomain.com/webhook\n";
    exit(1);
}

try {
    // Create Telegram API object
    $telegram = new Telegram($botToken, $botUsername);

    // Set webhook
    $result = $telegram->setWebhook($webhookUrl);

    if ($result->isOk()) {
        echo "Webhook was set successfully!\n";
        echo "URL: {$webhookUrl}\n";
    } else {
        echo "Failed to set webhook: " . $result->getDescription() . "\n";
    }
} catch (TelegramException $e) {
    echo "Error: {$e->getMessage()}\n";
    exit(1);
}
