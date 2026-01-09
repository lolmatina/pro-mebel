<?php

declare(strict_types=1);

namespace App\Application\Actions\Category;

use Psr\Http\Message\ResponseInterface as Response;

class ListCategoriesAction extends CategoryAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $page = (int) ($this->request->getQueryParams()['page'] ?? 1);
        $limit = (int) ($this->request->getQueryParams()['limit'] ?? 10);
        
        $page = max(1, $page);
        $limit = max(1, min(100, $limit)); // Limit between 1 and 100
        
        $allCategories = $this->categoryRepository->findAll();
        $total = count($allCategories);
        $totalPages = (int) ceil($total / $limit);
        
        $offset = ($page - 1) * $limit;
        $categories = array_slice($allCategories, $offset, $limit);
        
        $this->logger->info("Categories list was viewed. Page: {$page}, Limit: {$limit}");
        
        return $this->respondWithData([
            'data' => $categories,
            'pagination' => [
                'page' => $page,
                'limit' => $limit,
                'total' => $total,
                'totalPages' => $totalPages,
            ],
        ]);
    }
}



