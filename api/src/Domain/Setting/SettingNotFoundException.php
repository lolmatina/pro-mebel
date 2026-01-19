<?php

declare(strict_types=1);

namespace App\Domain\Setting;

use App\Domain\DomainException\DomainRecordNotFoundException;

class SettingNotFoundException extends DomainRecordNotFoundException
{
    public $message = 'The setting you requested does not exist.';
}
