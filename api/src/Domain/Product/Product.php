<?php

declare(strict_types=1);

namespace App\Domain\Product;

use JsonSerializable;

class Product implements JsonSerializable
{
    private ?int $id;

    private string $name;

    private string $description;

    private string $image;

    private int $subCategoryId;

    public function __construct(?int $id, string $name, string $description, string $image, int $subCategoryId)
    {
        $this->id = $id;
        $this->name = $name;
        $this->description = $description;
        $this->image = $image;
        $this->subCategoryId = $subCategoryId;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function getImage(): string
    {
        return $this->image;
    }

    public function getSubCategoryId(): int
    {
        return $this->subCategoryId;
    }

    #[\ReturnTypeWillChange]
    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'image' => $this->image,
            'subCategoryId' => $this->subCategoryId,
        ];
    }
}



