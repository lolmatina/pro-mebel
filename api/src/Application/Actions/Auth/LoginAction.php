<?php

declare(strict_types=1);

namespace App\Application\Actions\Auth;

use App\Application\Actions\Action;
use App\Application\Settings\SettingsInterface;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Psr\Http\Message\ResponseInterface as Response;
use Slim\Exception\HttpUnauthorizedException;

class LoginAction extends Action
{
    private SettingsInterface $settings;

    public function __construct(\Psr\Log\LoggerInterface $logger, SettingsInterface $settings)
    {
        parent::__construct($logger);
        $this->settings = $settings;
    }

    protected function action(): Response
    {
        $data = $this->getFormData();
        
        // Log for debugging
        $this->logger->info('Login attempt', [
            'received_data' => $data,
            'username' => $data['username'] ?? 'NOT SET',
            'password_length' => isset($data['password']) ? strlen($data['password']) : 0
        ]);
        
        $username = $data['username'] ?? '';
        $password = $data['password'] ?? '';
        
        $adminUsername = $this->settings->get('admin')['username'];
        $adminPassword = $this->settings->get('admin')['password'];
        
        $this->logger->info('Comparing credentials', [
            'expected_username' => $adminUsername,
            'received_username' => $username,
            'passwords_match' => $password === $adminPassword
        ]);
        
        if ($username !== $adminUsername || $password !== $adminPassword) {
            throw new HttpUnauthorizedException($this->request, 'Invalid credentials');
        }
        
        $jwtSecret = $this->settings->get('jwt')['secret'];
        $issuedAt = time();
        $expirationTime = $issuedAt + 3600; // Token valid for 1 hour
        
        $payload = [
            'iat' => $issuedAt,
            'exp' => $expirationTime,
            'username' => $username,
        ];
        
        $token = JWT::encode($payload, $jwtSecret, 'HS256');
        
        return $this->respondWithData([
            'token' => $token,
            'expires_in' => 3600,
        ]);
    }
}


