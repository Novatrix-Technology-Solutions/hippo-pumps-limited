<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('pump_solutions', function (Blueprint $table) {
            // Drop columns we no longer need
            $table->dropColumn([
                'description',
                'item_code',
                'motor_unit',
                'notes',
                'features',
                'specifications',
                'applications'
            ]);

            // Rename price columns to match our new structure
            $table->renameColumn('price_zmw', 'price_zmw_no_vat');
            $table->renameColumn('net_price_zmw', 'price_zmw_including_vat');

            // Update column types to match our form
            $table->string('q_max')->nullable()->change();
            $table->string('h_max')->nullable()->change();
            $table->string('rated_q')->nullable()->change();
            $table->string('rated_h')->nullable()->change();
            $table->string('motor')->nullable()->change();
            $table->string('price_zmw_no_vat')->nullable()->change();
            $table->string('vat_rate')->nullable()->change();
            $table->string('price_zmw_including_vat')->nullable()->change();
        });
    }

    public function down()
    {
        Schema::table('pump_solutions', function (Blueprint $table) {
            // Restore dropped columns
            $table->text('description')->nullable();
            $table->string('item_code')->nullable();
            $table->string('motor_unit')->default('HP');
            $table->text('notes')->nullable();
            $table->text('features')->nullable();
            $table->text('specifications')->nullable();
            $table->text('applications')->nullable();

            // Restore original column names
            $table->renameColumn('price_zmw_no_vat', 'price_zmw');
            $table->renameColumn('price_zmw_including_vat', 'net_price_zmw');

            // Restore original column types
            $table->decimal('q_max', 10, 2)->nullable()->change();
            $table->decimal('h_max', 10, 2)->nullable()->change();
            $table->decimal('rated_q', 10, 2)->nullable()->change();
            $table->decimal('rated_h', 10, 2)->nullable()->change();
            $table->decimal('motor', 10, 2)->nullable()->change();
            $table->decimal('price_zmw', 10, 2)->change();
            $table->decimal('vat_rate', 5, 2)->default(0)->change();
            $table->decimal('net_price_zmw', 10, 2)->change();
        });
    }
}; 