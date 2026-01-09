<?php

declare(strict_types=1);

namespace App\Application\Actions\Review;

use App\Application\Actions\Action;
use App\Domain\Review\ReviewRepository;
use Psr\Log\LoggerInterface;

abstract class ReviewAction extends Action
{
    protected ReviewRepository $reviewRepository;

    public function __construct(LoggerInterface $logger, ReviewRepository $reviewRepository)
    {
        parent::__construct($logger);
        $this->reviewRepository = $reviewRepository;
    }
}

