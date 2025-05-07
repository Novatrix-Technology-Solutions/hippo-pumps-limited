<?php

namespace App\Providers;


use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use PDOException;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
        if (env('APP_ENV') === 'production') {
            URL::forceScheme('https');
        }

        // Add custom database error handling
        DB::listen(function ($query) {
            if ($query->time > 1000) { // Log slow queries
                Log::warning('Slow query detected', [
                    'sql' => $query->sql,
                    'bindings' => $query->bindings,
                    'time' => $query->time,
                ]);
            }
        });

        // Handle database connection errors
        try {
            DB::connection()->getPdo();
        } catch (PDOException $e) {
            Log::error('Database connection error: ' . $e->getMessage());
            
            // If we're in production, we might want to use a fallback database
            if (app()->environment('production')) {
                config([
                    'database.connections.pgsql.host' => 'aws-0-us-east-1.pooler.supabase.com',
                    'database.connections.pgsql.port' => '5432',
                    'database.connections.pgsql.database' => 'postgres',
                    'database.connections.pgsql.username' => 'postgres.razdqlyekzjlhuzzoxkx',
                    'database.connections.pgsql.password' => 'mSLWxlIm9PpZSocy',
                ]);
            }
        }
    }
}
