<?php

declare(strict_types=1);

namespace App\Domain\SubCategory;

interface SubCategoryRepository
{
    /**
     * @return SubCategory[]
     */
    public function findAll(): array;

    /**
     * @param int $id
     * @return SubCategory
     * @throws SubCategoryNotFoundException
     */
    public function findSubCategoryOfId(int $id): SubCategory;

    /**
     * @param int $categoryId
     * @return SubCategory[]
     */
    public function findByCategoryId(int $categoryId): array;
}



