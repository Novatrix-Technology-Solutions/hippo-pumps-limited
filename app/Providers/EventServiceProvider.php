<?php

namespace App\Providers;

use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;
use App\Events\PumpSolutionUpdated;
use App\Listeners\HandlePumpSolutionUpdate;

class EventServiceProvider extends ServiceProvider
{
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        PumpSolutionUpdated::class => [
            HandlePumpSolutionUpdate::class,
        ],
    ];

    public function boot()
    {
        parent::boot();
    }
} 