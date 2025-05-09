<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Illuminate\Auth\Access\AuthorizationException;
use Throwable;
use Illuminate\Database\QueryException;
use PDOException;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
use Inertia\Inertia;
use Illuminate\Session\TokenMismatchException;

class Handler extends ExceptionHandler
{
    protected $dontReport = [
        AuthenticationException::class,
        AuthorizationException::class,
        ModelNotFoundException::class,
        ValidationException::class,
    ];

    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            if (app()->bound('sentry')) {
                app('sentry')->captureException($e);
            }
        });

        $this->renderable(function (Throwable $e, $request) {
            if ($request->is('api/*') || $request->wantsJson()) {
                $statusCode = $this->getStatusCode($e);
                
                return response()->json([
                    'message' => $this->getErrorMessage($e, $statusCode),
                    'status' => $statusCode
                ], $statusCode);
            }
            
            if (app()->environment('production')) {
                $statusCode = $this->getStatusCode($e);
                
                if ($statusCode === 500) {
                    return Inertia::render('Errors/ServerError');
                }
                
                if ($statusCode === 404) {
                    return Inertia::render('Errors/NotFound');
                }
                
                if ($statusCode === 403) {
                    return Inertia::render('Errors/Forbidden');
                }
            }
            
            return null;
        });
    }

    private function getStatusCode(Throwable $e): int
    {
        if ($e instanceof HttpExceptionInterface) {
            return $e->getStatusCode();
        }
        
        if ($e instanceof ValidationException) {
            return 422;
        }
        
        if ($e instanceof AuthenticationException) {
            return 401;
        }
        
        if ($e instanceof AuthorizationException) {
            return 403;
        }
        
        if ($e instanceof ModelNotFoundException) {
            return 404;
        }
        
        return 500;
    }
    
    private function getErrorMessage(Throwable $e, int $statusCode): string
    {
        if (app()->environment('production') && $statusCode === 500) {
            return 'Server Error';
        }
        
        if ($e instanceof ValidationException) {
            return 'The given data was invalid.';
        }
        
        return $e->getMessage() ?: 'Server Error';
    }

    public function render($request, Throwable $exception)
    {
        if ($request->expectsJson()) {
            if ($exception instanceof ModelNotFoundException) {
                return response()->json([
                    'message' => 'Resource not found'
                ], 404);
            }

            if ($exception instanceof AuthenticationException) {
                return response()->json([
                    'message' => 'Unauthenticated'
                ], 401);
            }

            if ($exception instanceof AuthorizationException) {
                return response()->json([
                    'message' => 'This action is unauthorized'
                ], 403);
            }

            if ($exception instanceof ValidationException) {
                return response()->json([
                    'message' => 'The given data was invalid',
                    'errors' => $exception->errors()
                ], 422);
            }

            if ($exception instanceof NotFoundHttpException) {
                return response()->json([
                    'message' => 'The requested resource was not found'
                ], 404);
            }

            if ($exception instanceof MethodNotAllowedHttpException) {
                return response()->json([
                    'message' => 'The specified method for the request is invalid'
                ], 405);
            }

            if ($exception instanceof TokenMismatchException) {
                return response()->json([
                    'message' => 'Your session has expired. Please log in again.'
                ], 419);
            }

            if (config('app.debug')) {
                return response()->json([
                    'message' => $exception->getMessage(),
                    'file' => $exception->getFile(),
                    'line' => $exception->getLine(),
                    'trace' => $exception->getTrace()
                ], 500);
            }

            return response()->json([
                'message' => 'Server Error'
            ], 500);
        }

        // Handle TokenMismatchException for web requests
        if ($exception instanceof TokenMismatchException) {
            return redirect()->route('login')->with('error', 'Your session has expired. Please log in again.');
        }

        return parent::render($request, $exception);
    }
} 