<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    public function run()
    {
        // Get all existing pump solutions
        $existingSolutions = DB::table('pump_solutions')->get();

        foreach ($existingSolutions as $solution) {
            // Parse the existing specifications JSON
            $specifications = json_decode($solution->specifications, true) ?? [];

            // Map the old data to new structure
            $newData = [
                'title' => $solution->title,
                'slug' => $solution->slug,
                'description' => $solution->description,
                'category' => $this->mapCategory($solution->category),
                'q_max' => $specifications['q_max'] ?? null,
                'h_max' => $specifications['h_max'] ?? null,
                'rated_q' => $specifications['rated_q'] ?? null,
                'rated_h' => $specifications['rated_h'] ?? null,
                'motor' => $specifications['motor'] ?? null,
                'price_zmw' => $specifications['price_zmw'] ?? null,
                'vat_rate' => $specifications['vat_rate'] ?? null,
                'net_price_zmw' => $specifications['net_price_zmw'] ?? null,
                'is_featured' => $solution->is_featured,
                'order' => $solution->order,
            ];

            // Update the record
            DB::table('pump_solutions')
                ->where('id', $solution->id)
                ->update($newData);
        }
    }

    private function mapCategory($oldCategory)
    {
        // Map old categories to new ones
        $categoryMap = [
            'Building Services' => 'BOOSTER PUMPS',
            'Irrigation' => 'SPRINKLER PUMPS',
            'Mining' => 'SUBMERSIBLE PUMPS',
            'Industrial' => 'SEWAGE PUMPS',
        ];

        return $categoryMap[$oldCategory] ?? 'SOLAR PUMPS';
    }
} 