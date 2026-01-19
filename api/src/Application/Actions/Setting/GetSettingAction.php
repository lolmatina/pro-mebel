<?php

declare(strict_types=1);

namespace App\Application\Actions\Setting;

use Psr\Http\Message\ResponseInterface as Response;

class GetSettingAction extends SettingAction
{
    protected function action(): Response
    {
        // Default setting key is 'feature_flag'
        $key = $this->request->getQueryParams()['key'] ?? 'feature_flag';
        
        $setting = $this->settingRepository->findByKey($key);

        $this->logger->info("Setting '${key}' retrieved.");

        return $this->respondWithData([
            'value' => $setting->getSettingValue()
        ]);
    }
}
