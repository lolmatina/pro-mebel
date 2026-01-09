<?php

declare(strict_types=1);

namespace App\Application\Actions\Category;

use App\Domain\Category\Category;
use Psr\Http\Message\ResponseInterface as Response;

class CreateCategoryAction extends CategoryAction
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
        
        // Save to database
        $category = $this->categoryRepository->create($name);
        
        $this->logger->info("Category created: {$name}");

        return $this->respondWithData($category, 201);
    }
}


