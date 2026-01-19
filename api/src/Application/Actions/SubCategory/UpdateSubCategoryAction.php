<?php

declare(strict_types=1);

namespace App\Application\Actions\SubCategory;

use App\Domain\SubCategory\SubCategory;
use Psr\Http\Message\ResponseInterface as Response;

class UpdateSubCategoryAction extends SubCategoryAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $subCategoryId = (int) $this->resolveArg('id');
        $subCategory = $this->subCategoryRepository->findSubCategoryOfId($subCategoryId);
        
        $data = $this->getFormData();
        
        if (!isset($data['name']) || empty($data['name'])) {
            return $this->respondWithData(['error' => 'Name is required'], 400);
        }
        
        $name = (string) $data['name'];
        $categoryId = isset($data['categoryId']) ? (int) $data['categoryId'] : null;
        
        // Update in database
        $updatedSubCategory = $this->subCategoryRepository->update($subCategoryId, $name, $categoryId);
        
        $this->logger->info("SubCategory of id `{$subCategoryId}` was updated.");

        return $this->respondWithData($updatedSubCategory);
    }
}


