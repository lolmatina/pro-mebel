<?php

declare(strict_types=1);

namespace App\Application\Actions\Review;

use Psr\Http\Message\ResponseInterface as Response;

class ViewReviewAction extends ReviewAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $reviewId = (int) $this->resolveArg('id');
        $review = $this->reviewRepository->findReviewOfId($reviewId);

        $this->logger->info("Review of id `{$reviewId}` was viewed.");

        return $this->respondWithData($review);
    }
}

