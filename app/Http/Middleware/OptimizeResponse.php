<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class OptimizeResponse
{
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Only optimize successful responses
        if (!$response->isSuccessful()) {
            return $response;
        }

        try {
            // Add security headers
            $response->headers->set('X-Content-Type-Options', 'nosniff');
            $response->headers->set('X-Frame-Options', 'SAMEORIGIN');
            $response->headers->set('X-XSS-Protection', '1; mode=block');
            $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');
            $response->headers->set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');

            // Enable compression
            if (extension_loaded('zlib')) {
                $response->headers->set('Vary', 'Accept-Encoding');
                $response->headers->set('Content-Encoding', 'gzip');
                $response->setContent(gzencode($response->getContent(), 9));
            }

            // Cache control for static assets
            if ($this->isStaticAsset($request)) {
                $response->headers->set('Cache-Control', 'public, max-age=31536000');
            }

            return $response;
        } catch (\Exception $e) {
            Log::error('Error in OptimizeResponse middleware: ' . $e->getMessage());
            return $response;
        }
    }

    private function isStaticAsset(Request $request): bool
    {
        $path = $request->path();
        return preg_match('/\.(css|js|jpg|jpeg|png|gif|ico|svg|woff|woff2|ttf|eot)$/', $path);
    }
} 