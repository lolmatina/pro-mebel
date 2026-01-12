<?php

declare(strict_types=1);

namespace App\Infrastructure\Telegram\Commands;

use Longman\TelegramBot\Commands\SystemCommand;
use Longman\TelegramBot\Entities\ServerResponse;

class HelpCommand extends SystemCommand
{
    protected $name = 'help';
    protected $description = 'Show help information';
    protected $usage = '/help';
    protected $version = '1.0.0';

    public function execute(): ServerResponse
    {
        $message = "📚 <b>Справка</b>\n\n";
        $message .= "Доступные команды:\n\n";
        $message .= "/start <пароль> - Авторизация и подписка на уведомления\n";
        $message .= "/stop - Отключить уведомления\n";
        $message .= "/help - Показать эту справку\n\n";
        $message .= "После авторизации вы будете получать уведомления о всех новых заявках с сайта.";

        return $this->replyToChat($message, ['parse_mode' => 'HTML']);
    }
}
