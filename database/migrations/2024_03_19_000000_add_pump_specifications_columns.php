<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('pump_solutions', function (Blueprint $table) {
            // Add new columns
            $table->decimal('q_max', 10, 2)->nullable();
            $table->decimal('h_max', 10, 2)->nullable();
            $table->decimal('rated_q', 10, 2)->nullable();
            $table->decimal('rated_h', 10, 2)->nullable();
            $table->decimal('motor', 10, 2)->nullable();
            $table->decimal('price_zmw', 10, 2)->nullable();
            $table->decimal('vat_rate', 5, 2)->nullable();
            $table->decimal('net_price_zmw', 10, 2)->nullable();
            $table->string('category')->nullable();
        });

        // Only drop columns if they exist
        if (Schema::hasColumn('pump_solutions', 'specifications')) {
            Schema::table('pump_solutions', function (Blueprint $table) {
                $table->dropColumn('specifications');
            });
        }
    }

    public function down()
    {
        Schema::table('pump_solutions', function (Blueprint $table) {
            // Drop new columns
            $table->dropColumn([
                'q_max',
                'h_max',
                'rated_q',
                'rated_h',
                'motor',
                'price_zmw',
                'vat_rate',
                'net_price_zmw',
                'category'
            ]);
        });

        // Add back the specifications column if it was dropped
        if (!Schema::hasColumn('pump_solutions', 'specifications')) {
            Schema::table('pump_solutions', function (Blueprint $table) {
                $table->json('specifications')->nullable();
            });
        }
    }
}; 