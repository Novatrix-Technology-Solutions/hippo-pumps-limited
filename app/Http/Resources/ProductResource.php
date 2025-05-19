<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'description' => $this->description,
            'category' => $this->category,
            'item_code' => $this->item_code,
            'q_max' => $this->q_max,
            'h_max' => $this->h_max,
            'rated_q' => $this->rated_q,
            'rated_h' => $this->rated_h,
            'motor' => $this->motor,
            'motor_unit' => $this->motor_unit,
            'price_zmw' => $this->price_zmw,
            'vat_rate' => $this->vat_rate,
            'net_price_zmw' => $this->net_price_zmw,
            'notes' => $this->notes,
            'is_featured' => $this->is_featured,
            'order' => $this->order,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
} 