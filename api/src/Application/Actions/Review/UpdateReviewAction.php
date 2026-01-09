<?php

declare(strict_types=1);

namespace App\Application\Actions\Review;

use App\Infrastructure\Storage\FileUploader;
use Psr\Http\Message\ResponseInterface as Response;

class UpdateReviewAction extends ReviewAction
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
        $reviewId = (int) $this->resolveArg('id');
        $review = $this->reviewRepository->findReviewOfId($reviewId);
        
        $data = $this->request->getParsedBody();
        $files = $this->request->getUploadedFiles();
        
        $name = isset($data['name']) ? (string) $data['name'] : $review->getName();
        $reviewText = isset($data['review']) ? (string) $data['review'] : $review->getReview();
        $rating = isset($data['rating']) ? (int) $data['rating'] : $review->getRating();
        $image = $review->getImage(); // Keep old image by default
        
        if (empty($name)) {
            return $this->respondWithData(['error' => 'Name cannot be empty'], 400);
        }
        
        if (empty($reviewText)) {
            return $this->respondWithData(['error' => 'Review cannot be empty'], 400);
        }
        
        if ($rating < 1 || $rating > 5) {
            return $this->respondWithData(['error' => 'Rating must be between 1 and 5'], 400);
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
                
                // Delete old image
                $this->fileUploader->delete($review->getImage());
                
                $image = $newImagePath;
            } catch (\Exception $e) {
                return $this->respondWithData(['error' => 'Failed to upload image: ' . $e->getMessage()], 400);
            }
        }
        
        // Update in database
        $updatedReview = $this->reviewRepository->update($reviewId, $name, $reviewText, $rating, $image);
        
        $this->logger->info("Review of id `{$reviewId}` was updated.");

        return $this->respondWithData($updatedReview);
    }
}

