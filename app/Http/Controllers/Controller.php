<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Throwable;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    /**
     * Execute an action and handle any exceptions.
     *
     * @param \Closure $action
     * @return mixed
     */
    protected function executeWithErrorHandling(\Closure $action)
    {
        try {
            return $action();
        } catch (Throwable $e) {
            Log::error('Controller action error', [
                'exception' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'url' => request()->url(),
                'method' => request()->method(),
                'ip' => request()->ip(),
                'user_id' => auth()->id(),
            ]);
            
            if (request()->wantsJson() || request()->expectsJson()) {
                return response()->json([
                    'error' => 'An error occurred while processing your request.',
                    'message' => config('app.debug') ? $e->getMessage() : 'Server Error',
                ], 500);
            }
            
            return back()->with('error', 'An error occurred while processing your request.');
        }
    }
    
    /**
     * Execute an Inertia render with error handling.
     *
     * @param string $component
     * @param array|\Closure $props
     * @return \Inertia\Response
     */
    protected function renderWithErrorHandling(string $component, $props = [])
    {
        return $this->executeWithErrorHandling(function () use ($component, $props) {
            if ($props instanceof \Closure) {
                $props = $props();
            }
            
            return Inertia::render($component, $props);
        });
    }
}
