<?php

declare(strict_types=1);

namespace App\Application\Actions\Category;

use App\Domain\Category\CategoryRepository;
use App\Domain\SubCategory\SubCategoryRepository;
use App\Domain\Product\ProductRepository;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Log\LoggerInterface;

class GetSidebarAction extends CategoryAction
{
    private SubCategoryRepository $subCategoryRepository;
    private ProductRepository $productRepository;

    public function __construct(
        LoggerInterface $logger,
        CategoryRepository $categoryRepository,
        SubCategoryRepository $subCategoryRepository,
        ProductRepository $productRepository
    ) {
        parent::__construct($logger, $categoryRepository);
        $this->subCategoryRepository = $subCategoryRepository;
        $this->productRepository = $productRepository;
    }

    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $categories = $this->categoryRepository->findAll();
        $products = $this->productRepository->findAll();

        // Count products per subcategory
        $productCounts = [];
        foreach ($products as $product) {
            $subCategoryId = $product->getSubCategoryId();
            if (!isset($productCounts[$subCategoryId])) {
                $productCounts[$subCategoryId] = 0;
            }
            $productCounts[$subCategoryId]++;
        }

        // Build sidebar structure
        $sidebar = [];
        foreach ($categories as $category) {
            $categoryData = [
                'id' => $category->getId(),
                'name' => $category->getName(),
                'subCategories' => []
            ];

            // Get subcategories for this specific category
            $subCategories = $this->subCategoryRepository->findByCategoryId($category->getId());
            
            foreach ($subCategories as $subCategory) {
                $subCategoryData = [
                    'id' => $subCategory->getId(),
                    'name' => $subCategory->getName(),
                    'productCount' => $productCounts[$subCategory->getId()] ?? 0
                ];
                $categoryData['subCategories'][] = $subCategoryData;
            }

            $sidebar[] = $categoryData;
        }

        $this->logger->info("Sidebar data retrieved");

        return $this->respondWithData($sidebar);
    }
}

