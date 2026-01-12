<?php

declare(strict_types=1);

namespace App\Application\Actions\Application;

use App\Domain\Application\ApplicationRepository;
use App\Domain\Product\Product;
use App\Domain\Product\ProductNotFoundException;
use App\Domain\Product\ProductRepository;
use App\Domain\TelegramUser\TelegramUserRepository;
use App\Infrastructure\Telegram\TelegramBotService;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Log\LoggerInterface;

class CreateApplicationAction extends ApplicationAction
{
    private ProductRepository $productRepository;
    private TelegramBotService $telegramBotService;

    public function __construct(
        LoggerInterface $logger,
        ApplicationRepository $applicationRepository,
        ProductRepository $productRepository,
        TelegramBotService $telegramBotService
    ) {
        parent::__construct($logger, $applicationRepository);
        $this->productRepository = $productRepository;
        $this->telegramBotService = $telegramBotService;
    }

    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $data = $this->request->getParsedBody();
        
        // Validate required fields
        if (!isset($data['email']) || empty($data['email'])) {
            return $this->respondWithData(['error' => 'Email is required'], 400);
        }
        
        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            return $this->respondWithData(['error' => 'Invalid email format'], 400);
        }
        
        if (!isset($data['fullName']) || empty($data['fullName'])) {
            return $this->respondWithData(['error' => 'Full name is required'], 400);
        }
        
        if (!isset($data['city']) || empty($data['city'])) {
            return $this->respondWithData(['error' => 'City is required'], 400);
        }
        
        if (!isset($data['description']) || empty($data['description'])) {
            return $this->respondWithData(['error' => 'Description is required'], 400);
        }
        
        // Parse optional fields
        $readyToOrder = isset($data['readyToOrder']) && 
                       (bool) filter_var($data['readyToOrder'], FILTER_VALIDATE_BOOLEAN);
        
        $productId = null;
        $product = null;
        
        if (isset($data['productId']) && !empty($data['productId'])) {
            $productId = (int) $data['productId'];
            
            // Validate that product exists
            try {
                $product = $this->productRepository->findProductOfId($productId);
            } catch (ProductNotFoundException $e) {
                return $this->respondWithData(['error' => 'Product not found'], 404);
            }
        }
        
        // Create application
        $application = $this->applicationRepository->create(
            (string) $data['email'],
            (string) $data['fullName'],
            (string) $data['city'],
            (string) $data['description'],
            $readyToOrder,
            $productId
        );
        
        $this->logger->info("Application created: {$application->getId()}");
        
        // Send notification to Telegram
        try {
            $this->telegramBotService->sendApplicationNotification($application, $product);
            $this->logger->info("Telegram notification sent for application: {$application->getId()}");
        } catch (\Exception $e) {
            // Log error but don't fail the request
            $this->logger->error("Failed to send Telegram notification: {$e->getMessage()}");
        }

        return $this->respondWithData($application, 201);
    }
}
