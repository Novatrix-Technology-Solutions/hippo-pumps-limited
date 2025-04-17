<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model // Renamed class from PumpSolution
{
    use HasFactory;

    protected $table = 'pump_solutions';

    // Assuming the table name will be 'products' (Eloquent default)
    // If the migration created 'pump_solutions', add:
    // protected $table = 'pump_solutions'; 

    protected $fillable = [
        'title',
        'slug',
        'description',
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