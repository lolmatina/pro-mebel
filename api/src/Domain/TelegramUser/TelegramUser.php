<?php

declare(strict_types=1);

namespace App\Domain\TelegramUser;

use JsonSerializable;

class TelegramUser implements JsonSerializable
{
    private ?int $id;

    private int $chatId;

    private ?string $username;

    private ?string $firstName;

    private ?string $lastName;

    private bool $isActive;

    private ?string $createdAt;

    public function __construct(
        ?int $id,
        int $chatId,
        ?string $username = null,
        ?string $firstName = null,
        ?string $lastName = null,
        bool $isActive = true,
        ?string $createdAt = null
    ) {
        $this->id = $id;
        $this->chatId = $chatId;
        $this->username = $username;
        $this->firstName = $firstName;
        $this->lastName = $lastName;
        $this->isActive = $isActive;
        $this->createdAt = $createdAt;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getChatId(): int
    {
        return $this->chatId;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function isActive(): bool
    {
        return $this->isActive;
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
            'chatId' => $this->chatId,
            'username' => $this->username,
            'firstName' => $this->firstName,
            'lastName' => $this->lastName,
            'isActive' => $this->isActive,
            'createdAt' => $this->createdAt,
        ];
    }
}
