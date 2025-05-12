<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run()
    {
        $csvData = [
            // SOLAR PUMPS
            ['HIPPO 3DC3.5-80-48-600', 'SOLAR PUMPS', '3.5', '80', null, null, '0.75HP', '6700', null, '6700'],
            ['HIPPO 3DC3.5-95-48-750', 'SOLAR PUMPS', '3.5', '95', null, null, '1HP', '7260', null, '7260'],
            ['HIPPO 3DC3.5-123-72-1100', 'SOLAR PUMPS', '3.8', '123', null, null, '1.5HP', '7920', null, '7920'],
            ['HIPPO 3DC3.8-155-110-1300', 'SOLAR PUMPS', '3.8', '155', null, null, '1.75HP', '8250', null, '8250'],
            ['HIPPO 3DC3.8-180-110-1500', 'SOLAR PUMPS', '3.8', '180', null, null, '2HP', '8700', null, '8700'],
            ['HIPPO 4DC11.5-100-200-1500S', 'SOLAR PUMPS', '11.5', '100', null, null, '2HP', '10170', null, '10170'],
            ['HIPPO 3MIX3.5-95-110-750', 'SOLAR PUMPS', '3.5', '95', null, null, '1HP', '9790', null, '9790'],
            ['HIPPO 3MIX3.8-123-150-1100', 'SOLAR PUMPS', '3.8', '123', null, null, '1.5HP', '11330', null, '11330'],
            ['HIPPO 3MIX3.8-203-200-1500', 'SOLAR PUMPS', '3.8', '203', null, null, '2HP', '12820', null, '12820'],
            ['HIPPO 4MIX11.5-100-200-1500S', 'SOLAR PUMPS', '11.5', '100', null, null, '2HP', '10900', null, '10900'],

            // SOLAR PUMPS MAX
            ['HIPPO 4GS3/9-4000 A/D', 'SOLAR PUMPS MAX', null, null, '3', '175', '5HP', '13750', null, '13750'],
            ['HIPPO 4GS10/6-5500 A/D', 'SOLAR PUMPS MAX', null, null, '10', '104', '7.5HP', '16000', null, '16000'],
            ['HIPPO 4GS8/9-7500 A/D', 'SOLAR PUMPS MAX', null, null, '8', '180', '10HP', '18600', null, '18600'],
            ['HIPPO 4GS6/12-7500 A/D', 'SOLAR PUMPS MAX', null, null, '6', '210', '10HP', '18900', null, '18900'],
            ['HIPPO 4GS8/13-11000 A/D', 'SOLAR PUMPS MAX', null, null, '8', '260', '20HP', '22000', null, '22000'],

            // SEWAGE PUMPS
            ['WQD10-10-0.75', 'SEWAGE PUMPS', null, null, '10', '10', '1HP', '2900', '16%', '3364'],
            ['WQD10-15-1.1', 'SEWAGE PUMPS', null, null, '10', '15', '1.5HP', '3500', '16%', '4060'],
            ['50WQD10-28-1.5N', 'SEWAGE PUMPS', null, null, '10', '28', '2HP', '4300', '16%', '4988'],

            // SUBMERSIBLE PUMPS
            ['QDX1.5-32-0.75', 'SUBMERSIBLE PUMPS', null, null, '1.5', '32', '1HP', '2900', '16%', '3364'],
            ['QDX10-16-0.75', 'SUBMERSIBLE PUMPS', null, null, '10', '16', '1HP', '2900', '16%', '3132'],
            ['QDX30-6-0.75', 'SUBMERSIBLE PUMPS', null, null, '30', '6', '1HP', '3200', '16%', '3712'],
            ['QDX3-32-1.1', 'SUBMERSIBLE PUMPS', null, null, '3', '32', '1.5HP', '3800', '16%', '4408'],

            // BOOSTER PUMPS
            ['PUN402-DN32', 'BOOSTER PUMPS', '100L/min', '21m', '50L/min', '15m', '1HP', '4700', '16%', '5452'],
            ['PUN601', 'BOOSTER PUMPS', '115L/min', '25m', '50L/min', '20m', '1.5HP', '3400', '16%', '3944'],
            ['CPM158', 'BOOSTER PUMPS', null, null, '5', '26', '1HP', '2900', '16%', '3364'],

            // SPRINKLER PUMPS
            ['NB60-60-230A', 'SPRINKLER PUMPS', null, null, null, null, null, '8900', null, '8900'],

            // SOLAR PANEL
            ['JKM550M-BDVP', 'SOLAR PANEL', null, null, null, null, null, '2600', null, '2600'],

            // SOLAR LIGHT
            ['250W', 'SOLAR LIGHT', null, null, null, null, null, '1840', null, '1840'],
            ['300W', 'SOLAR LIGHT', null, null, null, null, null, '1960', null, '1960'],

            // WIRE ROPE
            ['55M', 'WIRE ROPE', null, null, null, null, null, '361', '16%', '430'],
            ['80M', 'WIRE ROPE', null, null, null, null, null, '488', '16%', '580'],
        ];

        foreach ($csvData as $index => $row) {
            DB::table('products')->insert([
                'title' => $row[0],
                'slug' => Str::slug($row[0]),
                'category' => $row[1],
                'q_max' => $row[2],
                'h_max' => $row[3],
                'rated_q' => $row[4],
                'rated_h' => $row[5],
                'motor' => $row[6],
                'price_zmw_no_vat' => $row[7],
                'vat_rate' => $row[8],
                'price_zmw_including_vat' => $row[9],
                'is_featured' => false,
                'order' => $index + 1,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
} 