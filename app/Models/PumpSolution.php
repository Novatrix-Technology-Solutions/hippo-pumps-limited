<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class PumpSolution extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'category',
        'specifications',
        'is_featured',
        'order',
    ];

    protected $casts = [
        'specifications' => 'array',
        'is_featured' => 'boolean',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($pumpSolution) {
            if (empty($pumpSolution->slug)) {
                $pumpSolution->slug = Str::slug($pumpSolution->title);
            }
        });

        static::updating(function ($pumpSolution) {
            if ($pumpSolution->isDirty('title')) {
                $pumpSolution->slug = Str::slug($pumpSolution->title);
            }
        });
    }
} 