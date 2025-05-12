<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model // Renamed class from PumpSolution
{
    use HasFactory;

    const CATEGORIES = [
        'Building Services',
        'Irrigation',
        'Mining',
        'Industrial'
    ];

    protected $fillable = [
        'title',
        'slug',
        'category',
        'q_max',
        'h_max',
        'rated_q',
        'rated_h',
        'motor',
        'price_zmw_no_vat',
        'vat_rate',
        'price_zmw_including_vat',
        'is_featured',
        'order',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'order' => 'integer',
    ];
}