<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('pump_solutions', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('category');
            $table->string('item_code')->nullable();
            $table->decimal('q_max', 10, 2)->nullable();
            $table->decimal('h_max', 10, 2)->nullable();
            $table->decimal('rated_q', 10, 2)->nullable();
            $table->decimal('rated_h', 10, 2)->nullable();
            $table->decimal('motor', 10, 2)->nullable();
            $table->string('motor_unit')->default('HP');
            $table->decimal('price_zmw', 10, 2);
            $table->decimal('vat_rate', 5, 2)->default(0);
            $table->decimal('net_price_zmw', 10, 2);
            $table->text('notes')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('pump_solutions');
    }
}; 