<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        // Only handle the specifications column
        if (Schema::hasColumn('pump_solutions', 'specifications')) {
            Schema::table('pump_solutions', function (Blueprint $table) {
                $table->dropColumn('specifications');
            });
        }
    }

    public function down()
    {
        // Only add back the specifications column if it was dropped
        if (!Schema::hasColumn('pump_solutions', 'specifications')) {
            Schema::table('pump_solutions', function (Blueprint $table) {
                $table->json('specifications')->nullable();
            });
        }
    }
}; 