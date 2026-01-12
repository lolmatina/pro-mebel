<?php

declare(strict_types=1);

namespace App\Domain\Application;

interface ApplicationRepository
{
    /**
     * @return Application[]
     */
    public function findAll(): array;

    /**
     * @param int $id
     * @return Application
     * @throws ApplicationNotFoundException
     */
    public function findApplicationOfId(int $id): Application;

    /**
     * @param string $email
     * @param string $fullName
     * @param string $city
     * @param string $description
     * @param bool $readyToOrder
     * @param int|null $productId
     * @return Application
     */
    public function create(
        string $email,
        string $fullName,
        string $city,
        string $description,
        bool $readyToOrder,
        ?int $productId = null
    ): Application;

    /**
     * @param int $id
     * @return void
     * @throws ApplicationNotFoundException
     */
    public function delete(int $id): void;
}
