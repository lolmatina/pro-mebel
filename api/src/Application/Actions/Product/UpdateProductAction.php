<?php

declare(strict_types=1);

namespace App\Application\Actions\Product;

use App\Domain\Product\Product;
use App\Domain\Product\ProductRepository;
use App\Domain\SubCategory\SubCategoryNotFoundException;
use App\Domain\SubCategory\SubCategoryRepository;
use App\Infrastructure\Storage\FileUploader;
use Psr\Http\Message\ResponseInterface as Response;

class UpdateProductAction extends ProductAction
{
    private SubCategoryRepository $subCategoryRepository;
    private FileUploader $fileUploader;

    public function __construct(
        \Psr\Log\LoggerInterface $logger,
        ProductRepository $productRepository,
        SubCategoryRepository $subCategoryRepository,
        FileUploader $fileUploader
    ) {
        parent::__construct($logger, $productRepository);
        $this->subCategoryRepository = $subCategoryRepository;
        $this->fileUploader = $fileUploader;
    }

    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $productId = (int) $this->resolveArg('id');
        $product = $this->productRepository->findProductOfId($productId);
        
        $data = $this->request->getParsedBody();
        $files = $this->request->getUploadedFiles();
        
        $name = isset($data['name']) ? (string) $data['name'] : $product->getName();
        $description = isset($data['description']) ? (string) $data['description'] : $product->getDescription();
        $image = $product->getImage(); // Keep old image by default
        $subCategoryId = isset($data['subCategoryId']) ? (int) $data['subCategoryId'] : $product->getSubCategoryId();
        
        if (empty($name)) {
            return $this->respondWithData(['error' => 'Name cannot be empty'], 400);
        }
        
        if (empty($description)) {
            return $this->respondWithData(['error' => 'Description cannot be empty'], 400);
        }
        
        // Validate that subcategory exists if it's being updated
        if (isset($data['subCategoryId'])) {
            try {
                $this->subCategoryRepository->findSubCategoryOfId($subCategoryId);
            } catch (SubCategoryNotFoundException $e) {
                return $this->respondWithData(['error' => 'SubCategory not found'], 404);
            }
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
                $this->fileUploader->delete($product->getImage());
                
                $image = $newImagePath;
            } catch (\Exception $e) {
                return $this->respondWithData(['error' => 'Failed to upload image: ' . $e->getMessage()], 400);
            }
        }
        
        // Update in database
        $updatedProduct = $this->productRepository->update($productId, $name, $description, $image, $subCategoryId);
        
        $this->logger->info("Product of id `{$productId}` was updated.");

        return $this->respondWithData($updatedProduct);
    }
}

