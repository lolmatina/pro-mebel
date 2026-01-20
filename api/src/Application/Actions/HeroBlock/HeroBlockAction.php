<?php

declare(strict_types=1);

namespace App\Application\Actions\HeroBlock;

use App\Application\Actions\Action;
use App\Domain\HeroBlock\HeroBlockRepository;
use Psr\Log\LoggerInterface;

abstract class HeroBlockAction extends Action
{
    protected HeroBlockRepository $heroBlockRepository;

    public function __construct(LoggerInterface $logger, HeroBlockRepository $heroBlockRepository)
    {
        parent::__construct($logger);
        $this->heroBlockRepository = $heroBlockRepository;
    }
}





