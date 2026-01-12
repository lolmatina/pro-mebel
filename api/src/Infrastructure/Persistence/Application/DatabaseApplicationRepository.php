<?php

declare(strict_types=1);

namespace App\Infrastructure\Persistence\Application;

use App\Domain\Application\Application;
use App\Domain\Application\ApplicationNotFoundException;
use App\Domain\Application\ApplicationRepository;
use App\Infrastructure\Database\Database;
use PDO;

class DatabaseApplicationRepository implements ApplicationRepository
{
    /**
     * {@inheritdoc}
     */
    public function findAll(): array
    {
        $db = Database::getConnection();
        $stmt = $db->query('SELECT * FROM applications ORDER BY created_at DESC');
        $rows = $stmt->fetchAll();

        $applications = [];
        foreach ($rows as $row) {
            $applications[] = new Application(
                (int) $row['id'],
                $row['email'],
                $row['full_name'],
                $row['city'],
                $row['description'],
                (bool) $row['ready_to_order'],
                $row['product_id'] !== null ? (int) $row['product_id'] : null,
                $row['created_at']
            );
        }

        return $applications;
    }

    /**
     * {@inheritdoc}
     */
    public function findApplicationOfId(int $id): Application
    {
        $db = Database::getConnection();
        $stmt = $db->prepare('SELECT * FROM applications WHERE id = :id');
        $stmt->execute(['id' => $id]);
        $row = $stmt->fetch();

        if (!$row) {
            throw new ApplicationNotFoundException();
        }

        return new Application(
            (int) $row['id'],
            $row['email'],
            $row['full_name'],
            $row['city'],
            $row['description'],
            (bool) $row['ready_to_order'],
            $row['product_id'] !== null ? (int) $row['product_id'] : null,
            $row['created_at']
        );
    }

    /**
     * {@inheritdoc}
     */
    public function create(
        string $email,
        string $fullName,
        string $city,
        string $description,
        bool $readyToOrder,
        ?int $productId = null
    ): Application {
        $db = Database::getConnection();
        $stmt = $db->prepare(
            'INSERT INTO applications (email, full_name, city, description, ready_to_order, product_id) 
             VALUES (:email, :full_name, :city, :description, :ready_to_order, :product_id)'
        );
        
        $stmt->execute([
            'email' => $email,
            'full_name' => $fullName,
            'city' => $city,
            'description' => $description,
            'ready_to_order' => $readyToOrder ? 1 : 0,
            'product_id' => $productId,
        ]);

        $id = (int) $db->lastInsertId();

        return $this->findApplicationOfId($id);
    }

    /**
     * {@inheritdoc}
     */
    public function delete(int $id): void
    {
        $db = Database::getConnection();
        $stmt = $db->prepare('DELETE FROM applications WHERE id = :id');
        $stmt->execute(['id' => $id]);

        if ($stmt->rowCount() === 0) {
            throw new ApplicationNotFoundException();
        }
    }
}
