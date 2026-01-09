<?php

declare(strict_types=1);

namespace App\Application\Actions\Review;

use App\Infrastructure\Storage\FileUploader;
use Psr\Http\Message\ResponseInterface as Response;

class CreateReviewAction extends ReviewAction
{
    private FileUploader $fileUploader;

    public function __construct(
        \Psr\Log\LoggerInterface $logger,
        \App\Domain\Review\ReviewRepository $reviewRepository,
        FileUploader $fileUploader
    ) {
        parent::__construct($logger, $reviewRepository);
        $this->fileUploader = $fileUploader;
    }

    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $data = $this->request->getParsedBody();
        $files = $this->request->getUploadedFiles();
        
        if (!isset($data['name']) || empty($data['name'])) {
            return $this->respondWithData(['error' => 'Name is required'], 400);
        }
        
        if (!isset($data['review']) || empty($data['review'])) {
            return $this->respondWithData(['error' => 'Review is required'], 400);
        }
        
        if (!isset($data['rating']) || !is_numeric($data['rating'])) {
            return $this->respondWithData(['error' => 'Rating is required'], 400);
        }
        
        $rating = (int) $data['rating'];
        if ($rating < 1 || $rating > 5) {
            return $this->respondWithData(['error' => 'Rating must be between 1 and 5'], 400);
        }
        
        if (!isset($files['image']) || $files['image']->getError() !== UPLOAD_ERR_OK) {
            return $this->respondWithData(['error' => 'Image file is required'], 400);
        }
        
        // Upload and compress image
        try {
            $uploadedFile = $files['image'];
            $tmpFile = [
                'tmp_name' => $uploadedFile->getStream()->getMetadata('uri'),
                'error' => $uploadedFile->getError(),
                'size' => $uploadedFile->getSize(),
            ];
            
            $imagePath = $this->fileUploader->upload($tmpFile);
        } catch (\Exception $e) {
            return $this->respondWithData(['error' => 'Failed to upload image: ' . $e->getMessage()], 400);
        }
        
        $name = (string) $data['name'];
        $reviewText = (string) $data['review'];
        
        // Save to database
        $review = $this->reviewRepository->create($name, $reviewText, $rating, $imagePath);
        
        $this->logger->info("Review created: {$name}");

        return $this->respondWithData($review, 201);
    }
}

