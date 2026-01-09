<?php

declare(strict_types=1);

namespace App\Application\Actions\SubCategory;

use Psr\Http\Message\ResponseInterface as Response;

class DeleteSubCategoryAction extends SubCategoryAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $subCategoryId = (int) $this->resolveArg('id');
        $subCategory = $this->subCategoryRepository->findSubCategoryOfId($subCategoryId);
        
        // In a real implementation, you would delete from database
        $this->logger->info("SubCategory of id `{$subCategoryId}` was deleted.");

        return $this->respondWithData(['message' => 'SubCategory deleted successfully'], 200);
    }
}


