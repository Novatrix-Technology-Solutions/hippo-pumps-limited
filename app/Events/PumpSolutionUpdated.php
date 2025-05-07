<?php

namespace App\Events;

use App\Models\PumpSolution;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class PumpSolutionUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $pumpSolution;

    public function __construct(PumpSolution $pumpSolution)
    {
        $this->pumpSolution = $pumpSolution;
    }

    public function broadcastOn()
    {
        return new Channel('pump-solutions');
    }

    public function broadcastWith()
    {
        return [
            'id' => $this->pumpSolution->id,
            'name' => $this->pumpSolution->name,
            'category' => $this->pumpSolution->category,
            'price' => $this->pumpSolution->price,
            'status' => $this->pumpSolution->status,
            'updated_at' => $this->pumpSolution->updated_at->toIso8601String(),
        ];
    }
} 