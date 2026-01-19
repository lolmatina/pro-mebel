<?php

declare(strict_types=1);

namespace App\Application\Actions\Product;

use App\Infrastructure\Storage\FileUploader;
use Psr\Http\Message\ResponseInterface as Response;

class DeleteProductAction extends ProductAction
{
    private FileUploader $fileUploader;

    public function __construct(\Psr\Log\LoggerInterface $logger, \App\Domain\Product\ProductRepository $productRepository, FileUploader $fileUploader)
    {
        parent::__construct($logger, $productRepository);
        $this->fileUploader = $fileUploader;
    }

    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $productId = (int) $this->resolveArg('id');
        $product = $this->productRepository->findProductOfId($productId);
        
        // Delete the image file
        $this->fileUploader->delete($product->getImage());
        
        // Delete from database
        $this->productRepository->delete($productId);

        $this->logger->info("Product of id `{$productId}` was deleted.");

        return $this->respondWithData(['message' => 'Product deleted successfully'], 200);
    }
}


