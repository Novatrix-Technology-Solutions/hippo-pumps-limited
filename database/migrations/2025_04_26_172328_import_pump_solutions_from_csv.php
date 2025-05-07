<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::dropIfExists('pump_solutions');

        Schema::create('pump_solutions', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->nullable();
            $table->text('description')->nullable();
            $table->string('category')->nullable();
            $table->string('q_max')->nullable();
            $table->string('h_max')->nullable();
            $table->string('rated_q')->nullable();
            $table->string('rated_h')->nullable();
            $table->string('motor')->nullable();
            $table->string('price_zmw_no_vat')->nullable();
            $table->string('vat_rate')->nullable();
            $table->string('nett_price_zmw_incl_vat')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        $csvFile = fopen(public_path('HIPPO PUMPS 2025.csv'), 'r');

        // Skip the header rows
        fgetcsv($csvFile);
        fgetcsv($csvFile);
        fgetcsv($csvFile);

        while (($data = fgetcsv($csvFile)) !== false) {
            if (count($data) < 12) {
                continue; // Skip rows with insufficient data
            }

            \App\Models\PumpSolution::create([
                'title' => $data[3] ?? '',
                'q_max' => $data[4] ?? '',
                'h_max' => $data[5] ?? '',
                'rated_q' => $data[6] ?? '',
                'rated_h' => $data[7] ?? '',
                'motor' => $data[8] ?? '',
                'price_zmw_no_vat' => $data[9] ?? '',
                'vat_rate' => $data[10] ?? '',
                'nett_price_zmw_incl_vat' => $data[11] ?? '',
            ]);
        }

        fclose($csvFile);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pump_solutions');
    }
};
