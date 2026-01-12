<?php

declare(strict_types=1);

require __DIR__ . '/vendor/autoload.php';

// Load environment variables
if (file_exists(__DIR__ . '/.env')) {
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
    $dotenv->load();
}

echo "=== Telegram Bot Configuration Test ===\n\n";

// Check configuration
$botToken = $_ENV['TELEGRAM_BOT_TOKEN'] ?? '';
$botUsername = $_ENV['TELEGRAM_BOT_USERNAME'] ?? '';
$botPassword = $_ENV['TELEGRAM_BOT_PASSWORD'] ?? '';

echo "Bot Token: " . (empty($botToken) ? "❌ NOT SET" : "✅ SET (length: " . strlen($botToken) . ")") . "\n";
echo "Bot Username: " . (empty($botUsername) ? "❌ NOT SET" : "✅ @{$botUsername}") . "\n";
echo "Bot Password: " . (empty($botPassword) ? "❌ NOT SET" : "✅ SET") . "\n\n";

if (empty($botToken) || empty($botUsername)) {
    echo "❌ Bot is not configured properly!\n";
    exit(1);
}

echo "=== Testing Bot Connection ===\n\n";

try {
    $telegram = new \Longman\TelegramBot\Telegram($botToken, $botUsername);
    
    // Try to get bot info
    $response = \Longman\TelegramBot\Request::getMe();
    
    if ($response->isOk()) {
        $result = $response->getResult();
        echo "✅ Bot is connected!\n";
        echo "   ID: " . $result->getId() . "\n";
        echo "   Name: " . $result->getFirstName() . "\n";
        echo "   Username: @" . $result->getUsername() . "\n";
        echo "   Can Join Groups: " . ($result->getCanJoinGroups() ? 'Yes' : 'No') . "\n";
        echo "   Can Read All Group Messages: " . ($result->getCanReadAllGroupMessages() ? 'Yes' : 'No') . "\n\n";
    } else {
        echo "❌ Bot connection failed!\n";
        echo "   Description: " . $response->getDescription() . "\n\n";
    }
    
    echo "=== Testing Webhook Info ===\n\n";
    
    $webhookInfo = \Longman\TelegramBot\Request::getWebhookInfo();
    
    if ($webhookInfo->isOk()) {
        $info = $webhookInfo->getResult();
        echo "Webhook URL: " . ($info->getUrl() ?: "Not set (using long polling)") . "\n";
        echo "Pending Updates: " . $info->getPendingUpdateCount() . "\n";
        
        if ($info->getLastErrorMessage()) {
            echo "⚠️  Last Error: " . $info->getLastErrorMessage() . "\n";
            echo "   Error Date: " . date('Y-m-d H:i:s', $info->getLastErrorDate()) . "\n";
        } else {
            echo "✅ No errors\n";
        }
    }
    
    echo "\n=== Testing Database Connection ===\n\n";
    
    try {
        $db = \App\Infrastructure\Database\Database::getConnection();
        echo "✅ Database connected!\n";
        
        // Check if tables exist
        $tables = ['telegram_users', 'applications'];
        foreach ($tables as $table) {
            $stmt = $db->query("SHOW TABLES LIKE '{$table}'");
            $exists = $stmt->rowCount() > 0;
            echo "   Table '{$table}': " . ($exists ? "✅ EXISTS" : "❌ MISSING") . "\n";
        }
    } catch (\Exception $e) {
        echo "❌ Database connection failed: " . $e->getMessage() . "\n";
    }
    
    echo "\n=== Commands Path ===\n\n";
    $commandsPath = __DIR__ . '/src/Infrastructure/Telegram/Commands';
    echo "Commands directory: {$commandsPath}\n";
    
    if (is_dir($commandsPath)) {
        echo "✅ Directory exists\n";
        $commands = scandir($commandsPath);
        $commands = array_filter($commands, function($file) {
            return substr($file, -4) === '.php';
        });
        echo "   Found commands: " . implode(', ', $commands) . "\n";
    } else {
        echo "❌ Directory not found\n";
    }
    
    echo "\n✅ Test completed!\n";
    
} catch (\Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
    echo "   Trace: " . $e->getTraceAsString() . "\n";
    exit(1);
}
