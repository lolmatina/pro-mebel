<?php

declare(strict_types=1);

namespace App\Domain\Application;

use JsonSerializable;

class Application implements JsonSerializable
{
    private ?int $id;

    private string $email;

    private string $fullName;

    private string $phone;

    private string $city;

    private string $description;

    private bool $readyToOrder;

    private ?int $productId;

    private ?string $createdAt;

    public function __construct(
        ?int $id,
        string $email,
        string $fullName,
        string $phone,
        string $city,
        string $description,
        bool $readyToOrder,
        ?int $productId = null,
        ?string $createdAt = null
    ) {
        $this->id = $id;
        $this->email = $email;
        $this->fullName = $fullName;
        $this->phone = $phone;
        $this->city = $city;
        $this->description = $description;
        $this->readyToOrder = $readyToOrder;
        $this->productId = $productId;
        $this->createdAt = $createdAt;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getFullName(): string
    {
        return $this->fullName;
    }

    public function getPhone(): string
    {
        return $this->phone;
    }

    public function getCity(): string
    {
        return $this->city;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function isReadyToOrder(): bool
    {
        return $this->readyToOrder;
    }

    public function getProductId(): ?int
    {
        return $this->productId;
    }

    public function getCreatedAt(): ?string
    {
        return $this->createdAt;
    }

    #[\ReturnTypeWillChange]
    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'email' => $this->email,
            'fullName' => $this->fullName,
            'phone' => $this->phone,
            'city' => $this->city,
            'description' => $this->description,
            'readyToOrder' => $this->readyToOrder,
            'productId' => $this->productId,
            'createdAt' => $this->createdAt,
        ];
    }
}
