<?php

declare(strict_types=1);

namespace App\Application\Actions\HeroBlock;

use App\Domain\HeroBlock\HeroBlock;
use App\Domain\HeroBlock\HeroBlockRepository;
use App\Infrastructure\Storage\FileUploader;
use Psr\Http\Message\ResponseInterface as Response;

class UpdateHeroBlockAction extends HeroBlockAction
{
    private FileUploader $fileUploader;

    public function __construct(
        \Psr\Log\LoggerInterface $logger,
        HeroBlockRepository $heroBlockRepository,
        FileUploader $fileUploader
    ) {
        parent::__construct($logger, $heroBlockRepository);
        $this->fileUploader = $fileUploader;
    }

    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $heroBlockId = (int) $this->resolveArg('id');
        $heroBlock = $this->heroBlockRepository->findHeroBlockOfId($heroBlockId);
        
        $data = $this->request->getParsedBody();
        $files = $this->request->getUploadedFiles();
        
        $title = isset($data['title']) ? (string) $data['title'] : $heroBlock->getTitle();
        $link = isset($data['link']) ? (string) $data['link'] : $heroBlock->getLink();
        $image = $heroBlock->getImage(); // Keep old image by default
        
        if (empty($title)) {
            return $this->respondWithData(['error' => 'Title cannot be empty'], 400);
        }
        
        if (empty($link)) {
            return $this->respondWithData(['error' => 'Link cannot be empty'], 400);
        }
        
        // Handle new image upload
        if (isset($files['image']) && $files['image']->getError() === UPLOAD_ERR_OK) {
            try {
                $uploadedFile = $files['image'];
                $tmpFile = [
                    'tmp_name' => $uploadedFile->getStream()->getMetadata('uri'),
                    'error' => $uploadedFile->getError(),
                    'size' => $uploadedFile->getSize(),
                ];
                
                // Upload new image
                $newImagePath = $this->fileUploader->upload($tmpFile);
                
                // Delete old image if it exists
                if (!empty($heroBlock->getImage())) {
                    $this->fileUploader->delete($heroBlock->getImage());
                }
                
                $image = $newImagePath;
            } catch (\Exception $e) {
                return $this->respondWithData(['error' => 'Failed to upload image: ' . $e->getMessage()], 400);
            }
        }
        
        // Update in database
        $updatedHeroBlock = $this->heroBlockRepository->update($heroBlockId, $title, $link, $image);
        
        $this->logger->info("Hero block of id `{$heroBlockId}` was updated.");

        return $this->respondWithData($updatedHeroBlock);
    }
}




