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
        'q_max' => 'string',
        'h_max' => 'string',
        'rated_q' => 'string',
        'rated_h' => 'string',
        'motor' => 'string',
        'price_zmw' => 'string',
        'vat_rate' => 'string',
        'net_price_zmw' => 'string',
        'is_featured' => 'boolean',
    ];

function decimal_formatter($value) {
        return number_format(floatval($value), 2, '.', '');
    }
    public function getQMaxAttribute($value)
    {
        return $value ? decimal_formatter($value) : null;
    }

    public function getHMaxAttribute($value)
    {
        return $value ? decimal_formatter($value) : null;
    }

    public function getRatedQAttribute($value)
    {
        return $value ? decimal_formatter($value) : null;
    }

    public function getRatedHAttribute($value)
    {
        return $value ? decimal_formatter($value) : null;
    }

    public function getMotorAttribute($value)
    {
        return $value ? decimal_formatter($value) : null;
    }

    public function getPriceZmwAttribute($value)
    {
        return $value ? decimal_formatter($value) : null;
    }

    public function getVatRateAttribute($value)
    {
        return $value ? decimal_formatter($value) : null;
    }

    public function getNetPriceZmwAttribute($value)
    {
        return $value ? decimal_formatter($value) : null;
    }

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