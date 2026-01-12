<?php

declare(strict_types=1);

namespace App\Domain\Application;

use App\Domain\DomainException\DomainRecordNotFoundException;

class ApplicationNotFoundException extends DomainRecordNotFoundException
{
    public $message = 'The application you requested does not exist.';
}
