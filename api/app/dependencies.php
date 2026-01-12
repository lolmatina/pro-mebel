<?php

declare(strict_types=1);

use App\Application\Settings\SettingsInterface;
use App\Domain\TelegramUser\TelegramUserRepository;
use App\Infrastructure\Storage\FileUploader;
use App\Infrastructure\Telegram\TelegramBotService;
use DI\ContainerBuilder;
use Monolog\Handler\StreamHandler;
use Monolog\Logger;
use Monolog\Processor\UidProcessor;
use Psr\Container\ContainerInterface;
use Psr\Log\LoggerInterface;

return function (ContainerBuilder $containerBuilder) {
    $containerBuilder->addDefinitions([
        LoggerInterface::class => function (ContainerInterface $c) {
            $settings = $c->get(SettingsInterface::class);

            $loggerSettings = $settings->get('logger');
            $logger = new Logger($loggerSettings['name']);

            $processor = new UidProcessor();
            $logger->pushProcessor($processor);

            $handler = new StreamHandler($loggerSettings['path'], $loggerSettings['level']);
            $logger->pushHandler($handler);

            return $logger;
        },
        FileUploader::class => function (ContainerInterface $c) {
            return new FileUploader(__DIR__ . '/../public/uploads');
        },
        TelegramBotService::class => function (ContainerInterface $c) {
            $botToken = $_ENV['TELEGRAM_BOT_TOKEN'] ?? '';
            $botUsername = $_ENV['TELEGRAM_BOT_USERNAME'] ?? '';
            
            if (empty($botToken) || empty($botUsername)) {
                throw new \RuntimeException('Telegram bot credentials not configured in .env file');
            }
            
            $telegramUserRepository = $c->get(TelegramUserRepository::class);
            $logger = $c->get(LoggerInterface::class);
            
            return new TelegramBotService($botToken, $botUsername, $telegramUserRepository, $logger);
        },
    ]);
};
