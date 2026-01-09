<?php

declare(strict_types=1);

namespace App\Application\Actions\SubCategory;

use App\Application\Actions\Action;
use App\Domain\SubCategory\SubCategoryRepository;
use Psr\Log\LoggerInterface;

abstract class SubCategoryAction extends Action
{
    protected SubCategoryRepository $subCategoryRepository;

    public function __construct(LoggerInterface $logger, SubCategoryRepository $subCategoryRepository)
    {
        parent::__construct($logger);
        $this->subCategoryRepository = $subCategoryRepository;
    }
}



