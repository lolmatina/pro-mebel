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

    // Set custom commands path
    $telegram->addCommandsPaths([
        __DIR__ . '/src/Infrastructure/Telegram/Commands',
    ]);

    // Enable MySQL connection for Telegram Bot (optional - for logging)
    // If you want to log bot activity to database, uncomment the following:
    /*
    $telegram->enableMySql([
        'host'     => $_ENV['DB_HOST'] ?? 'localhost',
        'port'     => $_ENV['DB_PORT'] ?? 3306,
        'user'     => $_ENV['DB_USER'] ?? 'orders_user',
        'password' => $_ENV['DB_PASSWORD'] ?? 'orders_password',
        'database' => $_ENV['DB_NAME'] ?? 'orders',
    ]);
    */

    echo "Telegram bot started successfully!\n";
    echo "Bot username: @{$botUsername}\n";
    echo "Listening for updates via long polling...\n";
    echo "Press Ctrl+C to stop.\n\n";

    // Start the bot with long polling
    while (true) {
        try {
            // Process updates
            $serverResponse = $telegram->handleGetUpdates();

            if ($serverResponse->isOk()) {
                $updateCount = count($serverResponse->getResult());
                if ($updateCount > 0) {
                    echo "[" . date('Y-m-d H:i:s') . "] Processed {$updateCount} update(s)\n";
                }
            } else {
                echo "[" . date('Y-m-d H:i:s') . "] Failed to fetch updates: " . 
                     $serverResponse->getDescription() . "\n";
            }

            // Sleep for a short time before fetching next updates
            sleep(1);
        } catch (TelegramException $e) {
            echo "[" . date('Y-m-d H:i:s') . "] Telegram error: {$e->getMessage()}\n";
            sleep(5);
        }
    }
} catch (TelegramException $e) {
    echo "Error initializing Telegram bot: {$e->getMessage()}\n";
    exit(1);
}
