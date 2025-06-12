<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Maatwebsite\Excel\Facades\Excel;
use App\Models\PumpSolution;
use App\Imports\PumpsImport;

class ImportPumps extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'import:pumps {file : The path to the CSV/XLSX file}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Imports pump data from a CSV or XLSX file';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $file = $this->argument('file');

        try {
            Excel::import(new PumpsImport, $file);

            $this->info('Pumps imported successfully!');
        } catch (\Exception $e) {
            $this->error('Error importing pumps: ' . $e->getMessage());
        }
    }
}
