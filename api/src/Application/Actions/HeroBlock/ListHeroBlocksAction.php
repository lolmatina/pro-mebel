<?php

declare(strict_types=1);

namespace App\Application\Actions\HeroBlock;

use Psr\Http\Message\ResponseInterface as Response;

class ListHeroBlocksAction extends HeroBlockAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $heroBlocks = $this->heroBlockRepository->findAll();
        
        $this->logger->info("Hero blocks list was viewed.");
        
        return $this->respondWithData($heroBlocks);
    }
}





