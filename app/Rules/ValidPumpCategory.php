<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use App\Models\PumpSolution;

class ValidPumpCategory implements Rule
{
    public function passes($attribute, $value)
    {
        return in_array($value, PumpSolution::getCategories());
    }

    public function message()
    {
        return 'The selected :attribute is invalid.';
    }
} 