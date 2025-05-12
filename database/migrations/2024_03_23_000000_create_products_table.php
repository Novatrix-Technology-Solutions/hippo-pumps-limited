<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
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
            ]);
            $table->string('q_max')->nullable();
            $table->string('h_max')->nullable();
            $table->string('rated_q')->nullable();
            $table->string('rated_h')->nullable();
            $table->string('motor')->nullable();
            $table->string('price_zmw_no_vat');
            $table->string('vat_rate')->nullable();
            $table->string('price_zmw_including_vat');
            $table->boolean('is_featured')->default(false);
            $table->integer('order')->default(0);
            $table->timestamps();
            $table->softDeletes();

            // Add indexes for better performance
            $table->index('category');
            $table->index('is_featured');
            $table->index('order');
        });
    }

    public function down()
    {
        Schema::dropIfExists('products');
    }
}; 