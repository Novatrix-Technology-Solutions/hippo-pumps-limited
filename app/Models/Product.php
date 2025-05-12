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
        'image',
        'category',
        'specifications',
        'is_featured',
        'order',
    ];

    protected $casts = [
        'specifications' => 'array',
        'is_featured' => 'boolean',
    ];
}