<?php

declare(strict_types=1);

namespace App\Infrastructure\Persistence\Review;

use App\Domain\Review\Review;
use App\Domain\Review\ReviewNotFoundException;
use App\Domain\Review\ReviewRepository;
use App\Infrastructure\Database\Database;
use PDO;

class DatabaseReviewRepository implements ReviewRepository
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
        $stmt = $this->db->query('SELECT * FROM reviews ORDER BY id DESC');
        $rows = $stmt->fetchAll();

        $reviews = [];
        foreach ($rows as $row) {
            $reviews[] = new Review(
                (int) $row['id'],
                $row['name'],
                $row['review'],
                (int) $row['rating'],
                $row['image']
            );
        }

        return $reviews;
    }

    /**
     * {@inheritdoc}
     */
    public function findReviewOfId(int $id): Review
    {
        $stmt = $this->db->prepare('SELECT * FROM reviews WHERE id = :id');
        $stmt->execute(['id' => $id]);
        $row = $stmt->fetch();

        if (!$row) {
            throw new ReviewNotFoundException();
        }

        return new Review(
            (int) $row['id'],
            $row['name'],
            $row['review'],
            (int) $row['rating'],
            $row['image']
        );
    }

    public function create(string $name, string $review, int $rating, string $image): Review
    {
        $stmt = $this->db->prepare(
            'INSERT INTO reviews (name, review, rating, image) VALUES (:name, :review, :rating, :image)'
        );
        $stmt->execute([
            'name' => $name,
            'review' => $review,
            'rating' => $rating,
            'image' => $image
        ]);

        $id = (int) $this->db->lastInsertId();

        return new Review($id, $name, $review, $rating, $image);
    }

    public function update(int $id, string $name, string $review, int $rating, string $image): Review
    {
        // First check if exists
        $this->findReviewOfId($id);

        $stmt = $this->db->prepare(
            'UPDATE reviews SET name = :name, review = :review, rating = :rating, image = :image WHERE id = :id'
        );
        $stmt->execute([
            'id' => $id,
            'name' => $name,
            'review' => $review,
            'rating' => $rating,
            'image' => $image
        ]);

        return new Review($id, $name, $review, $rating, $image);
    }

    public function delete(int $id): void
    {
        // First check if exists
        $this->findReviewOfId($id);

        $stmt = $this->db->prepare('DELETE FROM reviews WHERE id = :id');
        $stmt->execute(['id' => $id]);
    }
}

