<?php

declare(strict_types=1);

namespace App\Application\Actions\Review;

use Psr\Http\Message\ResponseInterface as Response;

class ListReviewsAction extends ReviewAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $page = (int) ($this->request->getQueryParams()['page'] ?? 1);
        $limit = (int) ($this->request->getQueryParams()['limit'] ?? 10);
        
        $page = max(1, $page);
        $limit = max(1, min(100, $limit));
        
        $allReviews = $this->reviewRepository->findAll();
        $total = count($allReviews);
        $totalPages = (int) ceil($total / $limit);
        
        $offset = ($page - 1) * $limit;
        $reviews = array_slice($allReviews, $offset, $limit);
        
        $this->logger->info("Reviews list was viewed. Page: {$page}, Limit: {$limit}");
        
        return $this->respondWithData([
            'data' => $reviews,
            'pagination' => [
                'page' => $page,
                'limit' => $limit,
                'total' => $total,
                'totalPages' => $totalPages,
            ],
        ]);
    }
}

