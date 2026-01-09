<?php

declare(strict_types=1);

namespace App\Application\Actions\Product;

use Psr\Http\Message\ResponseInterface as Response;

class ListProductsAction extends ProductAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $queryParams = $this->request->getQueryParams();
        
        $page = (int) ($queryParams['page'] ?? 1);
        $limit = (int) ($queryParams['limit'] ?? 10);
        $subCategoryIds = $queryParams['subCategoryIds'] ?? null;
        
        $page = max(1, $page);
        $limit = max(1, min(100, $limit)); // Limit between 1 and 100
        
        $allProducts = $this->productRepository->findAll();
        
        // Filter by subcategories if provided
        if ($subCategoryIds !== null) {
            // Handle both comma-separated string and array
            if (is_string($subCategoryIds)) {
                $subCategoryIds = array_map('intval', explode(',', $subCategoryIds));
            } elseif (is_array($subCategoryIds)) {
                $subCategoryIds = array_map('intval', $subCategoryIds);
            }
            
            $allProducts = array_filter($allProducts, function ($product) use ($subCategoryIds) {
                return in_array($product->getSubCategoryId(), $subCategoryIds);
            });
            
            // Re-index array after filtering
            $allProducts = array_values($allProducts);
        }
        
        $total = count($allProducts);
        $totalPages = (int) ceil($total / $limit);
        
        $offset = ($page - 1) * $limit;
        $products = array_slice($allProducts, $offset, $limit);
        
        $filterInfo = $subCategoryIds ? ' (filtered by subcategories: ' . implode(',', $subCategoryIds) . ')' : '';
        $this->logger->info("Products list was viewed. Page: {$page}, Limit: {$limit}{$filterInfo}");
        
        return $this->respondWithData([
            'data' => $products,
            'pagination' => [
                'page' => $page,
                'limit' => $limit,
                'total' => $total,
                'totalPages' => $totalPages,
            ],
        ]);
    }
}



