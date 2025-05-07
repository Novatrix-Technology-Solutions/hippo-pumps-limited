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
        'item_code',
        'q_max',
        'h_max',
        'rated_q',
        'rated_h',
        'motor',
        'motor_unit',
        'price_zmw',
        'vat_rate',
        'net_price_zmw',
        'notes',
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

    protected function decimal_formatter($value) {
        return number_format(floatval($value), 2, '.', '');
    }

    public function getQMaxAttribute($value)
    {
        return $value ? $this->decimal_formatter($value) : null;
    }

    public function getHMaxAttribute($value)
    {
        return $value ? $this->decimal_formatter($value) : null;
    }

    public function getRatedQAttribute($value)
    {
        return $value ? $this->decimal_formatter($value) : null;
    }

    public function getRatedHAttribute($value)
    {
        return $value ? $this->decimal_formatter($value) : null;
    }

    public function getMotorAttribute($value)
    {
        return $value ? $this->decimal_formatter($value) : null;
    }

    public function getPriceZmwAttribute($value)
    {
        return $value ? $this->decimal_formatter($value) : null;
    }

    public function getVatRateAttribute($value)
    {
        return $value ? $this->decimal_formatter($value) : null;
    }

    public function getNetPriceZmwAttribute($value)
    {
        return $value ? $this->decimal_formatter($value) : null;
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($pumpSolution) {
            $pumpSolution->sanitizeInputs();
            if (empty($pumpSolution->slug)) {
                $pumpSolution->slug = Str::slug($pumpSolution->title);
            }
        });

        static::updating(function ($pumpSolution) {
            $pumpSolution->sanitizeInputs();
            if ($pumpSolution->isDirty('title')) {
                $pumpSolution->slug = Str::slug($pumpSolution->title);
            }
        });
    }

    protected function sanitizeInputs()
    {
        $this->title = $this->sanitizeString($this->title);
        $this->description = $this->sanitizeString($this->description);
        $this->category = $this->sanitizeString($this->category);
        $this->item_code = $this->sanitizeString($this->item_code);
        $this->notes = $this->sanitizeString($this->notes);
        
        // Sanitize numeric values
        $this->q_max = $this->sanitizeNumeric($this->q_max);
        $this->h_max = $this->sanitizeNumeric($this->h_max);
        $this->rated_q = $this->sanitizeNumeric($this->rated_q);
        $this->rated_h = $this->sanitizeNumeric($this->rated_h);
        $this->motor = $this->sanitizeNumeric($this->motor);
        $this->price_zmw = $this->sanitizeNumeric($this->price_zmw);
        $this->vat_rate = $this->sanitizeNumeric($this->vat_rate);
        $this->net_price_zmw = $this->sanitizeNumeric($this->net_price_zmw);
        $this->is_featured = $this->sanitizeBoolean($this->is_featured);
        $this->order = $this->sanitizeNumeric($this->order);
    }

    protected function sanitizeString($value)
    {
        return $value ? htmlspecialchars(strip_tags($value), ENT_QUOTES, 'UTF-8') : null;
    }

    protected function sanitizeNumeric($value)
    {
        return is_numeric($value) ? floatval($value) : null;
    }

    protected function sanitizeBoolean($value)
    {
        return is_bool($value) ? $value : null;
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function setSlugAttribute($value)
    {
        $this->attributes['slug'] = Str::slug($value);
    }

    // Define available categories from the CSV
    const CATEGORIES = [
        'SOLAR PUMPS',
        'SOLAR PUMPS MAX',
        'SEWAGE PUMPS',
        'SUBMERSIBLE PUMPS',
        'BOOSTER PUMPS',
        'SPRINKLER PUMPS',
        'SOLAR PANEL',
        'SOLAR LIGHT',
        'WIRE ROPE'
    ];

    public static function getCategories()
    {
        return self::query()->distinct()->pluck('category')->toArray();
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

    public static function rules($id = null)
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|in:SOLAR PUMPS,SOLAR PUMPS MAX,SEWAGE PUMPS,SUBMERSIBLE PUMPS,BOOSTER PUMPS,SPRINKLER PUMPS,SOLAR PANEL,SOLAR LIGHT,WIRE ROPE',
            'q_max' => 'nullable|numeric|min:0',
            'h_max' => 'nullable|numeric|min:0',
            'rated_q' => 'nullable|numeric|min:0',
            'rated_h' => 'nullable|numeric|min:0',
            'motor' => 'nullable|numeric|min:0',
            'price_zmw' => 'nullable|numeric|min:0',
            'vat_rate' => 'nullable|numeric|min:0|max:100',
            'net_price_zmw' => 'nullable|numeric|min:0',
            'is_featured' => 'boolean',
            'order' => 'nullable|integer|min:0',
        ];
    }
} 