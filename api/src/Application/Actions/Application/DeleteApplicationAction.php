<?php

declare(strict_types=1);

namespace App\Application\Actions\Application;

use Psr\Http\Message\ResponseInterface as Response;

class DeleteApplicationAction extends ApplicationAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $applicationId = (int) $this->resolveArg('id');
        $this->applicationRepository->delete($applicationId);

        $this->logger->info("Application of id `{$applicationId}` was deleted.");

        return $this->respondWithData(['message' => 'Application deleted successfully']);
    }
}
