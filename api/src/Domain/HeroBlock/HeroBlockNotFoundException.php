<?php

declare(strict_types=1);

namespace App\Domain\HeroBlock;

use App\Domain\DomainException\DomainRecordNotFoundException;

class HeroBlockNotFoundException extends DomainRecordNotFoundException
{
    public $message = 'The hero block you requested does not exist.';
}





