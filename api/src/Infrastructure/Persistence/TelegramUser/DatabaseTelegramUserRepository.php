<?php

declare(strict_types=1);

namespace App\Infrastructure\Persistence\TelegramUser;

use App\Domain\TelegramUser\TelegramUser;
use App\Domain\TelegramUser\TelegramUserNotFoundException;
use App\Domain\TelegramUser\TelegramUserRepository;
use App\Infrastructure\Database\Database;
use PDO;

class DatabaseTelegramUserRepository implements TelegramUserRepository
{
    /**
     * {@inheritdoc}
     */
    public function findAll(): array
    {
        $db = Database::getConnection();
        $stmt = $db->query('SELECT * FROM telegram_users ORDER BY created_at DESC');
        $rows = $stmt->fetchAll();

        return $this->hydrateTelegramUsers($rows);
    }

    /**
     * {@inheritdoc}
     */
    public function findAllActive(): array
    {
        $db = Database::getConnection();
        $stmt = $db->query('SELECT * FROM telegram_users WHERE is_active = 1 ORDER BY created_at DESC');
        $rows = $stmt->fetchAll();

        return $this->hydrateTelegramUsers($rows);
    }

    /**
     * {@inheritdoc}
     */
    public function findByChatId(int $chatId): TelegramUser
    {
        $db = Database::getConnection();
        $stmt = $db->prepare('SELECT * FROM telegram_users WHERE chat_id = :chat_id');
        $stmt->execute(['chat_id' => $chatId]);
        $row = $stmt->fetch();

        if (!$row) {
            throw new TelegramUserNotFoundException();
        }

        return $this->hydrateTelegramUser($row);
    }

    /**
     * {@inheritdoc}
     */
    public function existsByChatId(int $chatId): bool
    {
        $db = Database::getConnection();
        $stmt = $db->prepare('SELECT COUNT(*) as count FROM telegram_users WHERE chat_id = :chat_id');
        $stmt->execute(['chat_id' => $chatId]);
        $result = $stmt->fetch();

        return $result['count'] > 0;
    }

    /**
     * {@inheritdoc}
     */
    public function create(
        int $chatId,
        ?string $username = null,
        ?string $firstName = null,
        ?string $lastName = null
    ): TelegramUser {
        $db = Database::getConnection();
        $stmt = $db->prepare(
            'INSERT INTO telegram_users (chat_id, username, first_name, last_name, is_active) 
             VALUES (:chat_id, :username, :first_name, :last_name, 1)'
        );
        
        $stmt->execute([
            'chat_id' => $chatId,
            'username' => $username,
            'first_name' => $firstName,
            'last_name' => $lastName,
        ]);

        return $this->findByChatId($chatId);
    }

    /**
     * {@inheritdoc}
     */
    public function updateStatus(int $chatId, bool $isActive): void
    {
        $db = Database::getConnection();
        $stmt = $db->prepare('UPDATE telegram_users SET is_active = :is_active WHERE chat_id = :chat_id');
        $stmt->execute([
            'is_active' => $isActive ? 1 : 0,
            'chat_id' => $chatId,
        ]);

        if ($stmt->rowCount() === 0) {
            throw new TelegramUserNotFoundException();
        }
    }

    private function hydrateTelegramUser(array $row): TelegramUser
    {
        return new TelegramUser(
            (int) $row['id'],
            (int) $row['chat_id'],
            $row['username'],
            $row['first_name'],
            $row['last_name'],
            (bool) $row['is_active'],
            $row['created_at']
        );
    }

    private function hydrateTelegramUsers(array $rows): array
    {
        $users = [];
        foreach ($rows as $row) {
            $users[] = $this->hydrateTelegramUser($row);
        }
        return $users;
    }
}
