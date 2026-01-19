<?php

declare(strict_types=1);

namespace App\Domain\Setting;

interface SettingRepository
{
    /**
     * @throws SettingNotFoundException
     */
    public function findByKey(string $key): Setting;

    /**
     * @throws SettingNotFoundException
     */
    public function toggle(string $key): Setting;
}
