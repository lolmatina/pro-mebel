<?php

declare(strict_types=1);

use App\Application\Actions\Application\CreateApplicationAction;
use App\Application\Actions\Application\DeleteApplicationAction;
use App\Application\Actions\Application\ListApplicationsAction;
use App\Application\Actions\Application\ViewApplicationAction;
use App\Application\Actions\Auth\LoginAction;
use App\Application\Actions\Category\CreateCategoryAction;
use App\Application\Actions\Category\DeleteCategoryAction;
use App\Application\Actions\Category\GetSidebarAction;
use App\Application\Actions\Category\ListCategoriesAction;
use App\Application\Actions\Category\UpdateCategoryAction;
use App\Application\Actions\Category\ViewCategoryAction;
use App\Application\Actions\Product\CreateProductAction;
use App\Application\Actions\Product\DeleteProductAction;
use App\Application\Actions\Product\ListProductsAction;
use App\Application\Actions\Product\UpdateProductAction;
use App\Application\Actions\Product\ViewProductAction;
use App\Application\Actions\Review\CreateReviewAction;
use App\Application\Actions\Review\DeleteReviewAction;
use App\Application\Actions\Review\ListReviewsAction;
use App\Application\Actions\Review\UpdateReviewAction;
use App\Application\Actions\Review\ViewReviewAction;
use App\Application\Actions\Setting\GetSettingAction;
use App\Application\Actions\Setting\ToggleSettingAction;
use App\Application\Actions\SubCategory\CreateSubCategoryAction;
use App\Application\Actions\SubCategory\DeleteSubCategoryAction;
use App\Application\Actions\SubCategory\ListSubCategoriesAction;
use App\Application\Actions\SubCategory\UpdateSubCategoryAction;
use App\Application\Actions\SubCategory\ViewSubCategoryAction;
use App\Application\Actions\Telegram\StopTelegramBotAction;
use App\Application\Actions\Telegram\TelegramWebhookAction;
use App\Application\Actions\User\ListUsersAction;
use App\Application\Actions\User\ViewUserAction;
use App\Application\Middleware\JwtAuthMiddleware;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\App;
use Slim\Interfaces\RouteCollectorProxyInterface as Group;

return function (App $app) {
    $app->options('/{routes:.*}', function (Request $request, Response $response) {
        // CORS Pre-Flight OPTIONS Request Handler
        return $response;
    });

    // Public routes
    $app->get('/', function (Request $request, Response $response) {
        $response->getBody()->write('Hello world!');
        return $response;
    });

    $app->group('/users', function (Group $group) {
        $group->get('', ListUsersAction::class);
        $group->get('/{id}', ViewUserAction::class);
    });

    // Sidebar route
    $app->get('/sidebar', GetSidebarAction::class);

    // Public GET routes for Categories
    $app->group('/categories', function (Group $group) {
        $group->get('', ListCategoriesAction::class);
        $group->get('/{id}', ViewCategoryAction::class);
    });

    // Public GET routes for SubCategories
    $app->group('/subcategories', function (Group $group) {
        $group->get('', ListSubCategoriesAction::class);
        $group->get('/{id}', ViewSubCategoryAction::class);
    });

    // Public GET routes for Products
    $app->group('/products', function (Group $group) {
        $group->get('', ListProductsAction::class);
        $group->get('/{id}', ViewProductAction::class);
    });

    // Public GET routes for Reviews
    $app->group('/reviews', function (Group $group) {
        $group->get('', ListReviewsAction::class);
        $group->get('/{id}', ViewReviewAction::class);
    });

    // Authentication route (public)
    $app->post('/login', LoginAction::class);

    // Public route for application submission
    $app->post('/applications', CreateApplicationAction::class);

    // Telegram webhook (public)
    $app->post('/webhook', TelegramWebhookAction::class);

    // Public route to get setting value
    $app->get('/setting', GetSettingAction::class);

    // Admin routes (protected by JWT)
    $app->group('/admin', function (Group $group) {
        // Category CRUD (admin only)
        $group->group('/categories', function (Group $subGroup) {
            $subGroup->post('', CreateCategoryAction::class);
            $subGroup->put('/{id}', UpdateCategoryAction::class);
            $subGroup->delete('/{id}', DeleteCategoryAction::class);
        });

        // SubCategory CRUD (admin only)
        $group->group('/subcategories', function (Group $subGroup) {
            $subGroup->post('', CreateSubCategoryAction::class);
            $subGroup->put('/{id}', UpdateSubCategoryAction::class);
            $subGroup->delete('/{id}', DeleteSubCategoryAction::class);
        });

        // Product CRUD (admin only)
        $group->group('/products', function (Group $subGroup) {
            $subGroup->post('', CreateProductAction::class);
            $subGroup->put('/{id}', UpdateProductAction::class);
            $subGroup->post('/{id}', UpdateProductAction::class); // For file uploads
            $subGroup->delete('/{id}', DeleteProductAction::class);
        });

        // Review CRUD (admin only)
        $group->group('/reviews', function (Group $subGroup) {
            $subGroup->post('', CreateReviewAction::class);
            $subGroup->put('/{id}', UpdateReviewAction::class);
            $subGroup->post('/{id}', UpdateReviewAction::class); // For file uploads
            $subGroup->delete('/{id}', DeleteReviewAction::class);
        });

        // Application management (admin only)
        $group->group('/applications', function (Group $subGroup) {
            $subGroup->get('', ListApplicationsAction::class);
            $subGroup->get('/{id}', ViewApplicationAction::class);
            $subGroup->delete('/{id}', DeleteApplicationAction::class);
        });

        // Telegram bot management (admin only)
        $group->post('/telegram/stop', StopTelegramBotAction::class);

        // Setting toggle (admin only)
        $group->post('/setting/toggle', ToggleSettingAction::class);
    })->add(JwtAuthMiddleware::class);
};
