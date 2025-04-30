<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PumpSolutionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'description' => $this->description,
            'category' => $this->category,
            'q_max' => $this->q_max,
            'h_max' => $this->h_max,
            'rated_q' => $this->rated_q,
            'rated_h' => $this->rated_h,
            'motor' => $this->motor,
            'price_zmw' => $this->price_zmw,
            'vat_rate' => $this->vat_rate,
            'net_price_zmw' => $this->net_price_zmw,
            'is_featured' => $this->is_featured,
            'order' => $this->order,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
} 