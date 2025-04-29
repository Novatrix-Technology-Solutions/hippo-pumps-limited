<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        // Add new columns only if they don't exist
        $columns = [
            'q_max' => 'decimal(10, 2)',
            'h_max' => 'decimal(10, 2)',
            'rated_q' => 'decimal(10, 2)',
            'rated_h' => 'decimal(10, 2)',
            'motor' => 'decimal(10, 2)',
            'price_zmw' => 'decimal(10, 2)',
            'vat_rate' => 'decimal(5, 2)',
            'net_price_zmw' => 'decimal(10, 2)',
            'category' => 'string'
        ];

        foreach ($columns as $column => $type) {
            if (!Schema::hasColumn('pump_solutions', $column)) {
                Schema::table('pump_solutions', function (Blueprint $table) use ($column, $type) {
                    if ($type === 'string') {
                        $table->string($column)->nullable();
                    } else {
                        $table->decimal($column, 10, 2)->nullable();
                    }
                });
            }
        }

        // Only drop specifications column if it exists
        if (Schema::hasColumn('pump_solutions', 'specifications')) {
            Schema::table('pump_solutions', function (Blueprint $table) {
                $table->dropColumn('specifications');
            });
        }
    }

    public function down()
    {
        // Drop columns only if they exist
        $columns = [
            'q_max',
            'h_max',
            'rated_q',
            'rated_h',
            'motor',
            'price_zmw',
            'vat_rate',
            'net_price_zmw',
            'category'
        ];

        foreach ($columns as $column) {
            if (Schema::hasColumn('pump_solutions', $column)) {
                Schema::table('pump_solutions', function (Blueprint $table) use ($column) {
                    $table->dropColumn($column);
                });
            }
        }

        // Add back the specifications column if it was dropped
        if (!Schema::hasColumn('pump_solutions', 'specifications')) {
            Schema::table('pump_solutions', function (Blueprint $table) {
                $table->json('specifications')->nullable();
            });
        }
    }
}; 