<?php

declare(strict_types=1);

namespace App\Application\Actions\SubCategory;

use App\Domain\SubCategory\SubCategory;
use Psr\Http\Message\ResponseInterface as Response;

class CreateSubCategoryAction extends SubCategoryAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $data = $this->getFormData();
        
        if (!isset($data['name']) || empty($data['name'])) {
            return $this->respondWithData(['error' => 'Name is required'], 400);
        }
        
        $name = (string) $data['name'];
        $categoryId = isset($data['categoryId']) ? (int) $data['categoryId'] : null;
        
        // Save to database
        $subCategory = $this->subCategoryRepository->create($name, $categoryId);
        
        $this->logger->info("SubCategory created: {$name}");

        return $this->respondWithData($subCategory, 201);
    }
}


