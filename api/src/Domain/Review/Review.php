<?php

declare(strict_types=1);

namespace App\Domain\Review;

use JsonSerializable;

class Review implements JsonSerializable
{
    private ?int $id;
    private string $name;
    private string $review;
    private int $rating;
    private string $image;

    public function __construct(
        ?int $id,
        string $name,
        string $review,
        int $rating,
        string $image
    ) {
        $this->id = $id;
        $this->name = $name;
        $this->review = $review;
        $this->rating = $rating;
        $this->image = $image;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getReview(): string
    {
        return $this->review;
    }

    public function getRating(): int
    {
        return $this->rating;
    }

    public function getImage(): string
    {
        return $this->image;
    }

    #[\ReturnTypeWillChange]
    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'review' => $this->review,
            'rating' => $this->rating,
            'image' => $this->image,
        ];
    }
}

