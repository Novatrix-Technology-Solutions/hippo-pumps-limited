<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class OptimizationServiceProvider extends ServiceProvider
{
    public function register()
    {
        //
    }

    public function boot()
    {
        // Optimize Blade views
        $this->optimizeBladeViews();

        // Optimize database queries
        $this->optimizeDatabaseQueries();

        // Optimize cache
        $this->optimizeCache();
    }

    private function optimizeBladeViews()
    {
        // Cache compiled views
        if ($this->app->environment('production')) {
            $this->app['view']->addLocation(storage_path('framework/views'));
        }

        // Add view composers for common data
        View::composer('*', function ($view) {
            $view->with('appName', config('app.name'));
            $view->with('appUrl', config('app.url'));
        });
    }

    private function optimizeDatabaseQueries()
    {
        // Enable query logging in development
        if ($this->app->environment('local')) {
            \DB::enableQueryLog();
        }

        // Set strict mode for MySQL
        if ($this->app->environment('production')) {
            \DB::statement('SET SESSION sql_mode = "STRICT_ALL_TABLES"');
        }
    }

    private function optimizeCache()
    {
        // Set default cache TTL
        config(['cache.ttl' => 3600]);

        // Clear cache on deployment
        if ($this->app->environment('production')) {
            Cache::tags(['app'])->flush();
        }
    }
} 