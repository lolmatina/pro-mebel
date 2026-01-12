<?php

declare(strict_types=1);

namespace App\Application\Actions\Application;

use Psr\Http\Message\ResponseInterface as Response;

class ViewApplicationAction extends ApplicationAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $applicationId = (int) $this->resolveArg('id');
        $application = $this->applicationRepository->findApplicationOfId($applicationId);

        $this->logger->info("Application of id `{$applicationId}` was viewed.");

        return $this->respondWithData($application);
    }
}
