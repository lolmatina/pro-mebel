<?php

declare(strict_types=1);

namespace App\Domain\Review;

interface ReviewRepository
{
    /**
     * @return Review[]
     */
    public function findAll(): array;

    /**
     * @param int $id
     * @return Review
     * @throws ReviewNotFoundException
     */
    public function findReviewOfId(int $id): Review;

    /**
     * @param string $name
     * @param string $review
     * @param int $rating
     * @param string $image
     * @return Review
     */
    public function create(string $name, string $review, int $rating, string $image): Review;

    /**
     * @param int $id
     * @param string $name
     * @param string $review
     * @param int $rating
     * @param string $image
     * @return Review
     */
    public function update(int $id, string $name, string $review, int $rating, string $image): Review;

    /**
     * @param int $id
     * @return void
     */
    public function delete(int $id): void;
}

