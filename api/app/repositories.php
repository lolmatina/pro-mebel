<?php

declare(strict_types=1);

use App\Domain\Category\CategoryRepository;
use App\Domain\Product\ProductRepository;
use App\Domain\Review\ReviewRepository;
use App\Domain\SubCategory\SubCategoryRepository;
use App\Domain\User\UserRepository;
use App\Infrastructure\Persistence\Category\DatabaseCategoryRepository;
use App\Infrastructure\Persistence\Product\DatabaseProductRepository;
use App\Infrastructure\Persistence\Review\DatabaseReviewRepository;
use App\Infrastructure\Persistence\SubCategory\DatabaseSubCategoryRepository;
use App\Infrastructure\Persistence\User\InMemoryUserRepository;
use DI\ContainerBuilder;

return function (ContainerBuilder $containerBuilder) {
    // Here we map our repository interfaces to their database implementations
    $containerBuilder->addDefinitions([
        UserRepository::class => \DI\autowire(InMemoryUserRepository::class),
        CategoryRepository::class => \DI\autowire(DatabaseCategoryRepository::class),
        SubCategoryRepository::class => \DI\autowire(DatabaseSubCategoryRepository::class),
        ProductRepository::class => \DI\autowire(DatabaseProductRepository::class),
        ReviewRepository::class => \DI\autowire(DatabaseReviewRepository::class),
    ]);
};
