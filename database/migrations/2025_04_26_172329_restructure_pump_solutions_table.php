<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('pump_solutions', function (Blueprint $table) {
            // Drop existing columns that we'll replace
            $table->dropColumn(['specifications', 'category']);
            
            // Add new columns for specifications
            $table->decimal('q_max', 10, 2)->nullable()->comment('Maximum flow rate in m³/hr');
            $table->decimal('h_max', 10, 2)->nullable()->comment('Maximum head in meters');
            $table->decimal('rated_q', 10, 2)->nullable()->comment('Rated flow rate in m³/hr');
            $table->decimal('rated_h', 10, 2)->nullable()->comment('Rated head in meters');
            $table->decimal('motor', 10, 2)->nullable()->comment('Motor power in HP');
            $table->decimal('price_zmw', 10, 2)->nullable()->comment('Price in ZMW (No VAT)');
            $table->decimal('vat_rate', 5, 2)->nullable()->comment('VAT Rate');
            $table->decimal('net_price_zmw', 10, 2)->nullable()->comment('Net Price ZMW (Incl. VAT)');
            
            // Add category with enum constraint
            $table->enum('category', [
                'SOLAR PUMPS',
                'SOLAR PUMPS MAX',
                'SEWAGE PUMPS',
                'SUBMERSIBLE PUMPS',
                'BOOSTER PUMPS',
                'SPRINKLER PUMPS',
                'SOLAR PANEL',
                'SOLAR LIGHT',
                'WIRE ROPE'
            ])->after('description');
        });
    }

    public function down()
    {
        Schema::table('pump_solutions', function (Blueprint $table) {
            // Remove new columns
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
            
            // Restore original columns
            $table->json('specifications')->nullable();
            $table->string('category');
        });
    }
}; 