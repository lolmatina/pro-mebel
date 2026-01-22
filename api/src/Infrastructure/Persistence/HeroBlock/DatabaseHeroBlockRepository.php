<?php

declare(strict_types=1);

namespace App\Infrastructure\Persistence\HeroBlock;

use App\Domain\HeroBlock\HeroBlock;
use App\Domain\HeroBlock\HeroBlockNotFoundException;
use App\Domain\HeroBlock\HeroBlockRepository;
use App\Infrastructure\Database\Database;
use PDO;

class DatabaseHeroBlockRepository implements HeroBlockRepository
{
    private PDO $db;

    public function __construct()
    {
        $this->db = Database::getConnection();
    }

    /**
     * {@inheritdoc}
     */
    public function findAll(): array
    {
        $stmt = $this->db->query('SELECT * FROM hero_blocks ORDER BY id ASC');
        $rows = $stmt->fetchAll();

        $heroBlocks = [];
        foreach ($rows as $row) {
            $heroBlocks[] = new HeroBlock(
                (int) $row['id'],
                $row['title'],
                $row['link'],
                $row['image']
            );
        }

        return $heroBlocks;
    }

    /**
     * {@inheritdoc}
     */
    public function findHeroBlockOfId(int $id): HeroBlock
    {
        $stmt = $this->db->prepare('SELECT * FROM hero_blocks WHERE id = :id');
        $stmt->execute(['id' => $id]);
        $row = $stmt->fetch();

        if (!$row) {
            throw new HeroBlockNotFoundException();
        }

        return new HeroBlock(
            (int) $row['id'],
            $row['title'],
            $row['link'],
            $row['image']
        );
    }

    public function update(int $id, string $title, string $link, string $image): HeroBlock
    {
        // First check if exists
        $this->findHeroBlockOfId($id);

        $stmt = $this->db->prepare(
            'UPDATE hero_blocks SET title = :title, link = :link, image = :image WHERE id = :id'
        );
        $stmt->execute([
            'id' => $id,
            'title' => $title,
            'link' => $link,
            'image' => $image,
        ]);

        return new HeroBlock($id, $title, $link, $image);
    }
}







