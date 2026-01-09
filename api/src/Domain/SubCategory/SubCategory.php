<?php

declare(strict_types=1);

namespace App\Domain\SubCategory;

use JsonSerializable;

class SubCategory implements JsonSerializable
{
    private ?int $id;

    private string $name;

    private ?int $categoryId;

    public function __construct(?int $id, string $name, ?int $categoryId = null)
    {
        $this->id = $id;
        $this->name = $name;
        $this->categoryId = $categoryId;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getCategoryId(): ?int
    {
        return $this->categoryId;
    }

    #[\ReturnTypeWillChange]
    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'categoryId' => $this->categoryId,
        ];
    }
}



