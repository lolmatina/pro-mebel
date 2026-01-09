<?php

declare(strict_types=1);

namespace App\Application\Actions\SubCategory;

use Psr\Http\Message\ResponseInterface as Response;

class ViewSubCategoryAction extends SubCategoryAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $subCategoryId = (int) $this->resolveArg('id');
        $subCategory = $this->subCategoryRepository->findSubCategoryOfId($subCategoryId);

        $this->logger->info("SubCategory of id `{$subCategoryId}` was viewed.");

        return $this->respondWithData($subCategory);
    }
}


