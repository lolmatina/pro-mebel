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

    public function create(string $name, ?int $categoryId = null): SubCategory;

    public function update(int $id, string $name, ?int $categoryId = null): SubCategory;

    public function delete(int $id): void;
}



