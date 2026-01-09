<?php

declare(strict_types=1);

use App\Application\Middleware\SessionMiddleware;
use Slim\App;

return function (App $app) {
    // CORS is now handled in index.php before Slim runs
    $app->add(SessionMiddleware::class);
};
