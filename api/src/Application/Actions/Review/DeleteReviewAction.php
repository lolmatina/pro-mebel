<?php

declare(strict_types=1);

namespace App\Application\Actions\Review;

use App\Infrastructure\Storage\FileUploader;
use Psr\Http\Message\ResponseInterface as Response;

class DeleteReviewAction extends ReviewAction
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
        
        // Delete associated image file
        try {
            $this->fileUploader->delete($review->getImage());
        } catch (\Exception $e) {
            $this->logger->warning("Failed to delete image file: " . $e->getMessage());
        }
        
        $this->reviewRepository->delete($reviewId);
        
        $this->logger->info("Review of id `{$reviewId}` was deleted.");

        return $this->respondWithData(['message' => 'Review deleted successfully']);
    }
}

