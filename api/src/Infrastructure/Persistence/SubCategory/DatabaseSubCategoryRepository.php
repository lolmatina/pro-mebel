<?php

declare(strict_types=1);

namespace App\Infrastructure\Persistence\SubCategory;

use App\Domain\SubCategory\SubCategory;
use App\Domain\SubCategory\SubCategoryNotFoundException;
use App\Domain\SubCategory\SubCategoryRepository;
use App\Infrastructure\Database\Database;
use PDO;

class DatabaseSubCategoryRepository implements SubCategoryRepository
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
        $stmt = $this->db->query('SELECT * FROM subcategories ORDER BY id ASC');
        $rows = $stmt->fetchAll();

        $subCategories = [];
        foreach ($rows as $row) {
            $subCategories[] = new SubCategory(
                (int) $row['id'],
                $row['name'],
                isset($row['category_id']) ? (int) $row['category_id'] : null
            );
        }

        return $subCategories;
    }

    /**
     * {@inheritdoc}
     */
    public function findSubCategoryOfId(int $id): SubCategory
    {
        $stmt = $this->db->prepare('SELECT * FROM subcategories WHERE id = :id');
        $stmt->execute(['id' => $id]);
        $row = $stmt->fetch();

        if (!$row) {
            throw new SubCategoryNotFoundException();
        }

        return new SubCategory(
            (int) $row['id'],
            $row['name'],
            isset($row['category_id']) ? (int) $row['category_id'] : null
        );
    }

    /**
     * {@inheritdoc}
     */
    public function findByCategoryId(int $categoryId): array
    {
        $stmt = $this->db->prepare('SELECT * FROM subcategories WHERE category_id = :category_id ORDER BY id ASC');
        $stmt->execute(['category_id' => $categoryId]);
        $rows = $stmt->fetchAll();

        $subCategories = [];
        foreach ($rows as $row) {
            $subCategories[] = new SubCategory(
                (int) $row['id'],
                $row['name'],
                (int) $row['category_id']
            );
        }

        return $subCategories;
    }

    public function create(string $name, ?int $categoryId = null): SubCategory
    {
        $stmt = $this->db->prepare('INSERT INTO subcategories (name, category_id) VALUES (:name, :category_id)');
        $stmt->execute([
            'name' => $name,
            'category_id' => $categoryId
        ]);

        $id = (int) $this->db->lastInsertId();

        return new SubCategory($id, $name, $categoryId);
    }

    public function update(int $id, string $name, ?int $categoryId = null): SubCategory
    {
        // First check if exists
        $existing = $this->findSubCategoryOfId($id);

        // If categoryId is not provided, keep the existing one
        $finalCategoryId = $categoryId !== null ? $categoryId : $existing->getCategoryId();

        $stmt = $this->db->prepare('UPDATE subcategories SET name = :name, category_id = :category_id WHERE id = :id');
        $stmt->execute([
            'id' => $id,
            'name' => $name,
            'category_id' => $finalCategoryId
        ]);

        return new SubCategory($id, $name, $finalCategoryId);
    }

    public function delete(int $id): void
    {
        // First check if exists
        $this->findSubCategoryOfId($id);

        $stmt = $this->db->prepare('DELETE FROM subcategories WHERE id = :id');
        $stmt->execute(['id' => $id]);
    }
}


