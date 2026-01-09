<?php

declare(strict_types=1);

namespace App\Application\Actions\Category;

use Psr\Http\Message\ResponseInterface as Response;

class DeleteCategoryAction extends CategoryAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $categoryId = (int) $this->resolveArg('id');
        $category = $this->categoryRepository->findCategoryOfId($categoryId);
        
        // In a real implementation, you would delete from database
        $this->logger->info("Category of id `{$categoryId}` was deleted.");

        return $this->respondWithData(['message' => 'Category deleted successfully'], 200);
    }
}


