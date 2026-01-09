<?php

declare(strict_types=1);

namespace App\Application\Actions\SubCategory;

use Psr\Http\Message\ResponseInterface as Response;

class ListSubCategoriesAction extends SubCategoryAction
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
        
        $allSubCategories = $this->subCategoryRepository->findAll();
        $total = count($allSubCategories);
        $totalPages = (int) ceil($total / $limit);
        
        $offset = ($page - 1) * $limit;
        $subCategories = array_slice($allSubCategories, $offset, $limit);
        
        $this->logger->info("SubCategories list was viewed. Page: {$page}, Limit: {$limit}");
        
        return $this->respondWithData([
            'data' => $subCategories,
            'pagination' => [
                'page' => $page,
                'limit' => $limit,
                'total' => $total,
                'totalPages' => $totalPages,
            ],
        ]);
    }
}



