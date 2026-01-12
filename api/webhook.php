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
    http_response_code(500);
    echo "Error: Bot not configured";
    exit(1);
}

try {
    // Create Telegram API object
    $telegram = new Telegram($botToken, $botUsername);

    // Set custom commands path
    $telegram->addCommandsPaths([
        __DIR__ . '/src/Infrastructure/Telegram/Commands',
    ]);

    // Enable MySQL connection for Telegram Bot (optional - for logging)
    /*
    $telegram->enableMySql([
        'host'     => $_ENV['DB_HOST'] ?? 'localhost',
        'port'     => $_ENV['DB_PORT'] ?? 3306,
        'user'     => $_ENV['DB_USER'] ?? 'orders_user',
        'password' => $_ENV['DB_PASSWORD'] ?? 'orders_password',
        'database' => $_ENV['DB_NAME'] ?? 'orders',
    ]);
    */

    // Handle webhook request
    $telegram->handle();

} catch (TelegramException $e) {
    error_log('Telegram webhook error: ' . $e->getMessage());
    http_response_code(500);
}
