<?php

declare(strict_types=1);

namespace App\Application\Actions\Application;

use App\Application\Actions\Action;
use App\Domain\Application\ApplicationRepository;
use Psr\Log\LoggerInterface;

abstract class ApplicationAction extends Action
{
    protected ApplicationRepository $applicationRepository;

    public function __construct(LoggerInterface $logger, ApplicationRepository $applicationRepository)
    {
        parent::__construct($logger);
        $this->applicationRepository = $applicationRepository;
    }
}
