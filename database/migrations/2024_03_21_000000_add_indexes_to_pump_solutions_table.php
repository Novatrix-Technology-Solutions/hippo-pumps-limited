<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('pump_solutions', function (Blueprint $table) {
            if (Schema::hasColumn('pump_solutions', 'category')) {
                // Add indexes for frequently filtered columns
                $table->index('category');
                $table->index('net_price_zmw');
                $table->index('motor');
                $table->index('q_max');
                $table->index('h_max');
                
                
                // Add indexes for frequently sorted columns
                $table->index('title');
                $table->index('order');
                $table->index('created_at');
                
                // Add composite index for common filter combinations
                $table->index(['category', 'net_price_zmw']);
                $table->index(['category', 'motor']);
            }
        });
    }

    public function down()
    {
        Schema::table('pump_solutions', function (Blueprint $table) {
            // Remove indexes
            $table->dropIndex(['category']);
            $table->dropIndex(['net_price_zmw']);
            $table->dropIndex(['motor']);
            $table->dropIndex(['q_max']);
            $table->dropIndex(['h_max']);
            $table->dropIndex(['title']);
            $table->dropIndex(['order']);
            $table->dropIndex(['created_at']);
            $table->dropIndex(['category', 'net_price_zmw']);
            $table->dropIndex(['category', 'motor']);
        });
    }
}; 