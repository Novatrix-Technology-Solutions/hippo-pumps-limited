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
        'q_max',
        'h_max',
        'rated_q',
        'rated_h',
        'motor',
        'price_zmw',
        'vat_rate',
        'net_price_zmw',
        'is_featured',
        'order',
    ];

    protected $casts = [
        'q_max' => 'decimal:2',
        'h_max' => 'decimal:2',
        'rated_q' => 'decimal:2',
        'rated_h' => 'decimal:2',
        'motor' => 'decimal:2',
        'price_zmw' => 'decimal:2',
        'vat_rate' => 'decimal:2',
        'net_price_zmw' => 'decimal:2',
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

    // Add scopes for filtering
    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    public function scopeByPriceRange($query, $min, $max)
    {
        return $query->whereBetween('net_price_zmw', [$min, $max]);
    }

    public function scopeByMotorPower($query, $min, $max)
    {
        return $query->whereBetween('motor', [$min, $max]);
    }

    public function scopeByFlowRate($query, $min, $max)
    {
        return $query->whereBetween('q_max', [$min, $max]);
    }

    public function scopeByHead($query, $min, $max)
    {
        return $query->whereBetween('h_max', [$min, $max]);
    }
} 