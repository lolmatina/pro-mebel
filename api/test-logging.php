<?php

/**
 * Test script to verify logging is working properly
 * Run this from the command line: php test-logging.php
 */

require __DIR__ . '/vendor/autoload.php';

use Monolog\Handler\StreamHandler;
use Monolog\Logger;
use Monolog\Processor\UidProcessor;

echo "Testing logging configuration...\n\n";

// Test 1: Check if logs directory exists and is writable
$logsDir = __DIR__ . '/logs';
if (!is_dir($logsDir)) {
    echo "❌ FAIL: Logs directory does not exist at: $logsDir\n";
    exit(1);
}

if (!is_writable($logsDir)) {
    echo "❌ FAIL: Logs directory is not writable: $logsDir\n";
    echo "   Run: chmod 777 $logsDir\n";
    exit(1);
}

echo "✓ Logs directory exists and is writable\n";

// Test 2: Try to create a logger and write to file
try {
    $logFile = $logsDir . '/app.log';
    $logger = new Logger('test-logger');
    
    $processor = new UidProcessor();
    $logger->pushProcessor($processor);
    
    $handler = new StreamHandler($logFile, Logger::DEBUG);
    $logger->pushHandler($handler);
    
    echo "✓ Logger created successfully\n";
    
    // Test 3: Write test log entries
    $logger->info('Test log entry - INFO level');
    $logger->warning('Test log entry - WARNING level');
    $logger->error('Test log entry - ERROR level', [
        'test_data' => 'This is test context data',
        'request_uri' => '/test',
    ]);
    
    echo "✓ Test log entries written\n";
    
    // Test 4: Verify log file exists and has content
    if (!file_exists($logFile)) {
        echo "❌ FAIL: Log file was not created: $logFile\n";
        exit(1);
    }
    
    $logContent = file_get_contents($logFile);
    if (empty($logContent)) {
        echo "❌ FAIL: Log file is empty\n";
        exit(1);
    }
    
    echo "✓ Log file created and contains data\n";
    
    // Show last few lines of log
    echo "\n--- Last 10 lines of log file ---\n";
    $lines = file($logFile);
    $lastLines = array_slice($lines, -10);
    foreach ($lastLines as $line) {
        echo $line;
    }
    echo "--- End of log ---\n\n";
    
    echo "✅ All tests passed! Logging is working correctly.\n";
    echo "\nLog file location: $logFile\n";
    echo "To monitor logs: tail -f $logFile\n";
    
} catch (Exception $e) {
    echo "❌ FAIL: Error during logging test: " . $e->getMessage() . "\n";
    echo "   File: " . $e->getFile() . "\n";
    echo "   Line: " . $e->getLine() . "\n";
    exit(1);
}

