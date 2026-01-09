<?php

declare(strict_types=1);

namespace App\Infrastructure\Persistence\Product;

use App\Domain\Product\Product;
use App\Domain\Product\ProductNotFoundException;
use App\Domain\Product\ProductRepository;
use App\Infrastructure\Database\Database;
use PDO;

class DatabaseProductRepository implements ProductRepository
{
    private PDO $db;

    public function __construct()
    {
        $this->db = Database::getConnection();
    }

    /**
     * {@inheritdoc}
     */
    public function findAll(): array
    {
        $stmt = $this->db->query('SELECT * FROM products ORDER BY id ASC');
        $rows = $stmt->fetchAll();

        $products = [];
        foreach ($rows as $row) {
            $products[] = new Product(
                (int) $row['id'],
                $row['name'],
                $row['description'],
                $row['image'],
                (int) $row['subcategory_id']
            );
        }

        return $products;
    }

    /**
     * {@inheritdoc}
     */
    public function findProductOfId(int $id): Product
    {
        $stmt = $this->db->prepare('SELECT * FROM products WHERE id = :id');
        $stmt->execute(['id' => $id]);
        $row = $stmt->fetch();

        if (!$row) {
            throw new ProductNotFoundException();
        }

        return new Product(
            (int) $row['id'],
            $row['name'],
            $row['description'],
            $row['image'],
            (int) $row['subcategory_id']
        );
    }

    /**
     * {@inheritdoc}
     */
    public function findBySubCategoryId(int $subCategoryId): array
    {
        $stmt = $this->db->prepare('SELECT * FROM products WHERE subcategory_id = :subcategory_id ORDER BY id ASC');
        $stmt->execute(['subcategory_id' => $subCategoryId]);
        $rows = $stmt->fetchAll();

        $products = [];
        foreach ($rows as $row) {
            $products[] = new Product(
                (int) $row['id'],
                $row['name'],
                $row['description'],
                $row['image'],
                (int) $row['subcategory_id']
            );
        }

        return $products;
    }

    public function create(string $name, string $description, string $image, int $subCategoryId): Product
    {
        $stmt = $this->db->prepare(
            'INSERT INTO products (name, description, image, subcategory_id) VALUES (:name, :description, :image, :subcategory_id)'
        );
        $stmt->execute([
            'name' => $name,
            'description' => $description,
            'image' => $image,
            'subcategory_id' => $subCategoryId,
        ]);

        $id = (int) $this->db->lastInsertId();

        return new Product($id, $name, $description, $image, $subCategoryId);
    }

    public function update(int $id, string $name, string $description, string $image, int $subCategoryId): Product
    {
        // First check if exists
        $this->findProductOfId($id);

        $stmt = $this->db->prepare(
            'UPDATE products SET name = :name, description = :description, image = :image, subcategory_id = :subcategory_id WHERE id = :id'
        );
        $stmt->execute([
            'id' => $id,
            'name' => $name,
            'description' => $description,
            'image' => $image,
            'subcategory_id' => $subCategoryId,
        ]);

        return new Product($id, $name, $description, $image, $subCategoryId);
    }

    public function delete(int $id): void
    {
        // First check if exists
        $this->findProductOfId($id);

        $stmt = $this->db->prepare('DELETE FROM products WHERE id = :id');
        $stmt->execute(['id' => $id]);
    }
}


