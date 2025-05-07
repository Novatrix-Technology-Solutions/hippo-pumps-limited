<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

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
            DB::enableQueryLog();
        }

        // Set database-specific optimizations
        if ($this->app->environment('production')) {
            $connection = config('database.default');
            
            if ($connection === 'mysql') {
                // MySQL specific optimizations
                DB::statement('SET SESSION sql_mode = "STRICT_ALL_TABLES"');
            } elseif ($connection === 'pgsql') {
                // PostgreSQL specific optimizations
                DB::statement('SET SESSION synchronous_commit = off');
                DB::statement('SET SESSION work_mem = "64MB"');
                DB::statement('SET SESSION maintenance_work_mem = "256MB"');
            }
        }
    }

    private function optimizeCache()
    {
        // Set default cache TTL
        config(['cache.ttl' => 3600]);

        // Clear cache on deployment
        if ($this->app->environment('production')) {
            $driver = config('cache.default');
            
            try {
                if ($driver === 'redis' || $driver === 'memcached') {
                    // These drivers support tags
                    Cache::tags(['app'])->flush();
                } else {
                    // For other drivers, clear the entire cache
                    Cache::flush();
                }
            } catch (\Exception $e) {
                // If there's any error with cache operations, just log it
                Log::warning('Cache optimization failed: ' . $e->getMessage());
            }
        }
    }
} 