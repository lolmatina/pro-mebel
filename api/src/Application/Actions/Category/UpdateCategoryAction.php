<?php

declare(strict_types=1);

namespace App\Application\Actions\Category;

use App\Domain\Category\Category;
use Psr\Http\Message\ResponseInterface as Response;

class UpdateCategoryAction extends CategoryAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $categoryId = (int) $this->resolveArg('id');
        $category = $this->categoryRepository->findCategoryOfId($categoryId);
        
        $data = $this->getFormData();
        
        if (!isset($data['name']) || empty($data['name'])) {
            return $this->respondWithData(['error' => 'Name is required'], 400);
        }
        
        $name = (string) $data['name'];
        
        // Update in database
        $updatedCategory = $this->categoryRepository->update($categoryId, $name);
        
        $this->logger->info("Category of id `{$categoryId}` was updated.");

        return $this->respondWithData($updatedCategory);
    }
}


