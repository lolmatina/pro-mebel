<?php

declare(strict_types=1);

namespace App\Domain\TelegramUser;

use App\Domain\DomainException\DomainRecordNotFoundException;

class TelegramUserNotFoundException extends DomainRecordNotFoundException
{
    public $message = 'The telegram user you requested does not exist.';
}
