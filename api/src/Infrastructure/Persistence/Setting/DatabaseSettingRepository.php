<?php

declare(strict_types=1);

namespace App\Infrastructure\Persistence\Setting;

use App\Domain\Setting\Setting;
use App\Domain\Setting\SettingNotFoundException;
use App\Domain\Setting\SettingRepository;
use App\Infrastructure\Database\Database;

class DatabaseSettingRepository implements SettingRepository
{
    private Database $database;

    public function __construct(Database $database)
    {
        $this->database = $database;
    }

    public function findByKey(string $key): Setting
    {
        $pdo = $this->database->getConnection();
        $stmt = $pdo->prepare('SELECT * FROM settings WHERE setting_key = :key');
        $stmt->execute(['key' => $key]);
        $row = $stmt->fetch();

        if (!$row) {
            throw new SettingNotFoundException();
        }

        return new Setting(
            (int) $row['id'],
            $row['setting_key'],
            (bool) $row['setting_value']
        );
    }

    public function toggle(string $key): Setting
    {
        $pdo = $this->database->getConnection();
        
        // First, get the current setting
        $setting = $this->findByKey($key);
        
        // Toggle the value
        $newValue = !$setting->getSettingValue();
        
        // Update in database
        $stmt = $pdo->prepare('UPDATE settings SET setting_value = :value WHERE setting_key = :key');
        $stmt->execute([
            'value' => (int) $newValue,
            'key' => $key
        ]);

        // Return updated setting
        return $this->findByKey($key);
    }
}
