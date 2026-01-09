<?php

declare(strict_types=1);

namespace App\Application\Actions\Product;

use App\Domain\Product\Product;
use App\Domain\Product\ProductRepository;
use App\Domain\SubCategory\SubCategoryNotFoundException;
use App\Domain\SubCategory\SubCategoryRepository;
use App\Infrastructure\Storage\FileUploader;
use Psr\Http\Message\ResponseInterface as Response;

class CreateProductAction extends ProductAction
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
        $data = $this->request->getParsedBody();
        $files = $this->request->getUploadedFiles();
        
        if (!isset($data['name']) || empty($data['name'])) {
            return $this->respondWithData(['error' => 'Name is required'], 400);
        }
        
        if (!isset($data['description']) || empty($data['description'])) {
            return $this->respondWithData(['error' => 'Description is required'], 400);
        }
        
        if (!isset($files['image']) || $files['image']->getError() !== UPLOAD_ERR_OK) {
            return $this->respondWithData(['error' => 'Image file is required'], 400);
        }
        
        if (!isset($data['subCategoryId']) || !is_numeric($data['subCategoryId'])) {
            return $this->respondWithData(['error' => 'SubCategory ID is required'], 400);
        }
        
        $subCategoryId = (int) $data['subCategoryId'];
        
        // Validate that subcategory exists
        try {
            $this->subCategoryRepository->findSubCategoryOfId($subCategoryId);
        } catch (SubCategoryNotFoundException $e) {
            return $this->respondWithData(['error' => 'SubCategory not found'], 404);
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
        $description = (string) $data['description'];
        
        // Save to database
        $product = $this->productRepository->create($name, $description, $imagePath, $subCategoryId);
        
        $this->logger->info("Product created: {$name}");

        return $this->respondWithData($product, 201);
    }
}

