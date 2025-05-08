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
        Schema::table('pump_solutions', function (Blueprint $table) {
            if (!Schema::hasColumn('pump_solutions', 'features')) {
                $table->text('features')->nullable();
            }
            
            if (!Schema::hasColumn('pump_solutions', 'specifications')) {
                $table->text('specifications')->nullable();
            }
            
            if (!Schema::hasColumn('pump_solutions', 'applications')) {
                $table->text('applications')->nullable();
            }
            
            // Add soft deletes if not present
            if (!Schema::hasColumn('pump_solutions', 'deleted_at')) {
                $table->softDeletes();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pump_solutions', function (Blueprint $table) {
            $table->dropColumn([
                'features',
                'specifications',
                'applications',
                'deleted_at'
            ]);
        });
    }
};
