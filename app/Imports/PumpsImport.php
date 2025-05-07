<?php

namespace App\Imports;

use App\Models\PumpSolution;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class PumpsImport implements \Maatwebsite\Excel\Concerns\ToModel, \Maatwebsite\Excel\Concerns\WithHeadingRow
{
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        return new PumpSolution([
            'model_name' => $row['model_name'],
            'flow_rate' => $row['flow_rate'],
            'max_head' => $row['max_head'],
        ]);
    }
}