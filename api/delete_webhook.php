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

if (empty($botToken) || empty($botUsername)) {
    echo "Error: TELEGRAM_BOT_TOKEN and TELEGRAM_BOT_USERNAME must be set in .env file\n";
    exit(1);
}

try {
    // Create Telegram API object
    $telegram = new Telegram($botToken, $botUsername);

    // Delete webhook and drop pending updates
    $result = $telegram->deleteWebhook(['drop_pending_updates' => true]);

    if ($result->isOk()) {
        echo "Webhook was deleted successfully!\n";
        echo "All pending updates have been dropped.\n";
    } else {
        echo "Failed to delete webhook: " . $result->getDescription() . "\n";
    }
} catch (TelegramException $e) {
    echo "Error: {$e->getMessage()}\n";
    exit(1);
}
