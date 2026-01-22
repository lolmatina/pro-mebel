<?php

declare(strict_types=1);

namespace App\Domain\HeroBlock;

interface HeroBlockRepository
{
    /**
     * @return HeroBlock[]
     */
    public function findAll(): array;

    /**
     * @param int $id
     * @return HeroBlock
     * @throws HeroBlockNotFoundException
     */
    public function findHeroBlockOfId(int $id): HeroBlock;
}








