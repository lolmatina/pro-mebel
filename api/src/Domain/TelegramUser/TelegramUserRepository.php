<?php

declare(strict_types=1);

namespace App\Domain\TelegramUser;

interface TelegramUserRepository
{
    /**
     * @return TelegramUser[]
     */
    public function findAll(): array;

    /**
     * @return TelegramUser[]
     */
    public function findAllActive(): array;

    /**
     * @param int $chatId
     * @return TelegramUser
     * @throws TelegramUserNotFoundException
     */
    public function findByChatId(int $chatId): TelegramUser;

    /**
     * @param int $chatId
     * @return bool
     */
    public function existsByChatId(int $chatId): bool;

    /**
     * @param int $chatId
     * @param string|null $username
     * @param string|null $firstName
     * @param string|null $lastName
     * @return TelegramUser
     */
    public function create(
        int $chatId,
        ?string $username = null,
        ?string $firstName = null,
        ?string $lastName = null
    ): TelegramUser;

    /**
     * @param int $chatId
     * @param bool $isActive
     * @return void
     * @throws TelegramUserNotFoundException
     */
    public function updateStatus(int $chatId, bool $isActive): void;
}
