<?php

declare(strict_types=1);

namespace App\Domain\SubCategory;

use App\Domain\DomainException\DomainRecordNotFoundException;

class SubCategoryNotFoundException extends DomainRecordNotFoundException
{
    public $message = 'SubCategory not found.';
}



