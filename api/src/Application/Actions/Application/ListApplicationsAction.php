<?php

declare(strict_types=1);

namespace App\Application\Actions\Application;

use Psr\Http\Message\ResponseInterface as Response;

class ListApplicationsAction extends ApplicationAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $queryParams = $this->request->getQueryParams();
        
        $page = (int) ($queryParams['page'] ?? 1);
        $limit = (int) ($queryParams['limit'] ?? 10);
        
        $page = max(1, $page);
        $limit = max(1, min(100, $limit)); // Limit between 1 and 100
        
        $allApplications = $this->applicationRepository->findAll();
        
        $total = count($allApplications);
        $totalPages = (int) ceil($total / $limit);
        
        $offset = ($page - 1) * $limit;
        $applications = array_slice($allApplications, $offset, $limit);
        
        $this->logger->info("Applications list was viewed. Page: {$page}, Limit: {$limit}");
        
        return $this->respondWithData([
            'data' => $applications,
            'pagination' => [
                'page' => $page,
                'limit' => $limit,
                'total' => $total,
                'totalPages' => $totalPages,
            ],
        ]);
    }
}
