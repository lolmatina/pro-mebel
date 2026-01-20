<?php

declare(strict_types=1);

namespace App\Domain\HeroBlock;

use JsonSerializable;

class HeroBlock implements JsonSerializable
{
    private ?int $id;

    private string $title;

    private string $link;

    private string $image;

    public function __construct(?int $id, string $title, string $link, string $image)
    {
        $this->id = $id;
        $this->title = $title;
        $this->link = $link;
        $this->image = $image;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function getLink(): string
    {
        return $this->link;
    }

    public function getImage(): string
    {
        return $this->image;
    }

    #[\ReturnTypeWillChange]
    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'link' => $this->link,
            'image' => $this->image,
        ];
    }
}




