<?php

declare(strict_types=1);

namespace App\Domain\Setting;

use JsonSerializable;

class Setting implements JsonSerializable
{
    private ?int $id;
    private string $settingKey;
    private bool $settingValue;

    public function __construct(?int $id, string $settingKey, bool $settingValue)
    {
        $this->id = $id;
        $this->settingKey = $settingKey;
        $this->settingValue = $settingValue;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSettingKey(): string
    {
        return $this->settingKey;
    }

    public function getSettingValue(): bool
    {
        return $this->settingValue;
    }

    public function setSettingValue(bool $value): void
    {
        $this->settingValue = $value;
    }

    #[\ReturnTypeWillChange]
    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'setting_key' => $this->settingKey,
            'setting_value' => $this->settingValue,
        ];
    }
}
