<?php

declare(strict_types=1);

namespace App\Domain\Product;

interface ProductRepository
{
    /**
     * @return Product[]
     */
    public function findAll(): array;

    /**
     * @param int $id
     * @return Product
     * @throws ProductNotFoundException
     */
    public function findProductOfId(int $id): Product;

    /**
     * @param int $subCategoryId
     * @return Product[]
     */
    public function findBySubCategoryId(int $subCategoryId): array;

    public function create(string $name, string $description, string $image, int $subCategoryId): Product;

    public function update(int $id, string $name, string $description, string $image, int $subCategoryId): Product;

    public function delete(int $id): void;
}



