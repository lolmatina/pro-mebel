<?php

declare(strict_types=1);

namespace App\Infrastructure\Persistence\Category;

use App\Domain\Category\Category;
use App\Domain\Category\CategoryNotFoundException;
use App\Domain\Category\CategoryRepository;
use App\Infrastructure\Database\Database;
use PDO;

class DatabaseCategoryRepository implements CategoryRepository
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
        $stmt = $this->db->query('SELECT * FROM categories ORDER BY id ASC');
        $rows = $stmt->fetchAll();

        $categories = [];
        foreach ($rows as $row) {
            $categories[] = new Category(
                (int) $row['id'],
                $row['name']
            );
        }

        return $categories;
    }

    /**
     * {@inheritdoc}
     */
    public function findCategoryOfId(int $id): Category
    {
        $stmt = $this->db->prepare('SELECT * FROM categories WHERE id = :id');
        $stmt->execute(['id' => $id]);
        $row = $stmt->fetch();

        if (!$row) {
            throw new CategoryNotFoundException();
        }

        return new Category(
            (int) $row['id'],
            $row['name']
        );
    }

    public function create(string $name): Category
    {
        $stmt = $this->db->prepare('INSERT INTO categories (name) VALUES (:name)');
        $stmt->execute(['name' => $name]);

        $id = (int) $this->db->lastInsertId();

        return new Category($id, $name);
    }

    public function update(int $id, string $name): Category
    {
        // First check if exists
        $this->findCategoryOfId($id);

        $stmt = $this->db->prepare('UPDATE categories SET name = :name WHERE id = :id');
        $stmt->execute(['id' => $id, 'name' => $name]);

        return new Category($id, $name);
    }

    public function delete(int $id): void
    {
        // First check if exists
        $this->findCategoryOfId($id);

        $stmt = $this->db->prepare('DELETE FROM categories WHERE id = :id');
        $stmt->execute(['id' => $id]);
    }
}


