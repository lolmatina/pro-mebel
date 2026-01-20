<?php

declare(strict_types=1);

namespace App\Application\Actions\Auth;

use App\Application\Actions\Action;
use App\Application\Settings\SettingsInterface;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\SignatureInvalidException;
use Psr\Http\Message\ResponseInterface as Response;

class ValidateTokenAction extends Action
{
    private SettingsInterface $settings;

    public function __construct(\Psr\Log\LoggerInterface $logger, SettingsInterface $settings)
    {
        parent::__construct($logger);
        $this->settings = $settings;
    }

    protected function action(): Response
    {
        $authHeader = $this->request->getHeaderLine('Authorization');
        
        if (empty($authHeader)) {
            return $this->respondWithData(['valid' => false, 'error' => 'Authorization header is missing'], 401);
        }
        
        // Check if header starts with "Bearer "
        if (strpos($authHeader, 'Bearer ') !== 0) {
            return $this->respondWithData(['valid' => false, 'error' => 'Invalid authorization header format'], 401);
        }
        
        $token = substr($authHeader, 7);
        
        if (empty($token)) {
            return $this->respondWithData(['valid' => false, 'error' => 'Token is missing'], 401);
        }
        
        $jwtSecret = $this->settings->get('jwt')['secret'];
        
        try {
            $decoded = JWT::decode($token, new Key($jwtSecret, 'HS256'));
            
            // Token is valid, return success with expiration info
            $expirationTime = $decoded->exp ?? null;
            $currentTime = time();
            $timeUntilExpiry = $expirationTime ? ($expirationTime - $currentTime) : null;
            
            return $this->respondWithData([
                'valid' => true,
                'expires_at' => $expirationTime,
                'time_until_expiry' => $timeUntilExpiry,
            ]);
        } catch (ExpiredException $e) {
            return $this->respondWithData(['valid' => false, 'error' => 'Token has expired'], 401);
        } catch (SignatureInvalidException $e) {
            return $this->respondWithData(['valid' => false, 'error' => 'Invalid token signature'], 401);
        } catch (\Exception $e) {
            return $this->respondWithData(['valid' => false, 'error' => 'Invalid token: ' . $e->getMessage()], 401);
        }
    }
}

