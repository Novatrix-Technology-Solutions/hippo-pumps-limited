<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use League\Csv\Reader;

return new class extends Migration
{
    public function up()
    {
        Schema::table('pump_solutions', function (Blueprint $table) {
            $table->dropColumn('image');
        });

        // Load the CSV file
        $csv = Reader::createFromPath(public_path('HIPPO PUMPS 2025.csv'), 'r');
        $csv->setHeaderOffset(3); // Set the header offset to skip the first 3 rows
        $csv->skipInputBOM();
        $csv->setHeaderOffset(null);

        $records = $csv->getRecords();

        foreach ($records as $record) {
            // Extract the data from the CSV record
            $product = $record['PRODUCT'] ?? null;
            $itemDescription = $record['ITEM DESCRIPTION'] ?? null;
            $qMax = $record['Q.Max\r\n(m/hr)'] ?? null;
            $hMax = $record['H.Max\r\n(m)'] ?? null;
            $ratedQ = $record['RatedQ\r\n(m/hr)'] ?? null;
            $ratedH = $record['RatedH\r\n     (m)'] ?? null;
            $motor = $record['MOTOR'] ?? null;
            $priceZMW = $record['Price\r\nZMW\r\nNo VAT'] ?? null;
            $vatRate = $record['VAT\r\nRate'] ?? null;
            $nettPrice = $record['      Nett\r\n     Price\r\nZMW Incl\r\n      VAT'] ?? null;
            $notes = $record['Notes'] ?? null;

            // Create an array of specifications
            $specifications = [
                'product' => $product,
                'item_description' => $itemDescription,
                'q_max' => $qMax,
                'h_max' => $hMax,
                'rated_q' => $ratedQ,
                'rated_h' => $ratedH,
                'motor' => $motor,
                'price_zmw' => $priceZMW,
                'vat_rate' => $vatRate,
                'nett_price' => $nettPrice,
                'notes' => $notes,
            ];

            // Find the pump solution by title or create a new one
            $pumpSolution = DB::table('pump_solutions')->where('title', $product)->first();

            if ($pumpSolution) {
                // Update the pump solution with the specifications
                DB::table('pump_solutions')
                    ->where('id', $pumpSolution->id)
                    ->update(['specifications' => json_encode($specifications)]);
            }
        }
    }

    public function down()
    {
        Schema::table('pump_solutions', function (Blueprint $table) {
            $table->string('image')->nullable();
        });
    }
};
