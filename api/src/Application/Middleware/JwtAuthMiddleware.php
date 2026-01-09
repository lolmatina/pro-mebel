<?php

declare(strict_types=1);

namespace App\Application\Middleware;

use App\Application\Settings\SettingsInterface;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\SignatureInvalidException;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use Slim\Exception\HttpUnauthorizedException;

class JwtAuthMiddleware implements MiddlewareInterface
{
    private SettingsInterface $settings;

    public function __construct(SettingsInterface $settings)
    {
        $this->settings = $settings;
    }

    public function process(Request $request, RequestHandler $handler): Response
    {
        $authHeader = $request->getHeaderLine('Authorization');
        
        if (empty($authHeader)) {
            throw new HttpUnauthorizedException($request, 'Authorization header is missing');
        }
        
        // Check if header starts with "Bearer "
        if (strpos($authHeader, 'Bearer ') !== 0) {
            throw new HttpUnauthorizedException($request, 'Invalid authorization header format');
        }
        
        $token = substr($authHeader, 7);
        
        if (empty($token)) {
            throw new HttpUnauthorizedException($request, 'Token is missing');
        }
        
        $jwtSecret = $this->settings->get('jwt')['secret'];
        
        try {
            $decoded = JWT::decode($token, new Key($jwtSecret, 'HS256'));
            
            // Add decoded token data to request attributes for use in controllers
            $request = $request->withAttribute('jwt', $decoded);
            
            return $handler->handle($request);
        } catch (ExpiredException $e) {
            throw new HttpUnauthorizedException($request, 'Token has expired');
        } catch (SignatureInvalidException $e) {
            throw new HttpUnauthorizedException($request, 'Invalid token signature');
        } catch (\Exception $e) {
            throw new HttpUnauthorizedException($request, 'Invalid token: ' . $e->getMessage());
        }
    }
}



