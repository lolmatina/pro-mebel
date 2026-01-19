<?php

declare(strict_types=1);

namespace App\Application\Actions\Setting;

use Psr\Http\Message\ResponseInterface as Response;

class ToggleSettingAction extends SettingAction
{
    protected function action(): Response
    {
        // Default setting key is 'feature_flag'
        $key = $this->request->getQueryParams()['key'] ?? 'feature_flag';
        
        $setting = $this->settingRepository->toggle($key);

        $this->logger->info("Setting '${key}' toggled to " . ($setting->getSettingValue() ? 'true' : 'false'));

        return $this->respondWithData([
            'value' => $setting->getSettingValue(),
            'message' => 'Setting toggled successfully'
        ]);
    }
}
