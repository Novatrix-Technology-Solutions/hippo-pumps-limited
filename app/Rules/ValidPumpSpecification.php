<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class ValidPumpSpecification implements Rule
{
    protected $field;
    protected $min;
    protected $max;

    public function __construct($field, $min = null, $max = null)
    {
        $this->field = $field;
        $this->min = $min;
        $this->max = $max;
    }

    public function passes($attribute, $value)
    {
        if (!is_numeric($value)) {
            return false;
        }

        if ($this->min !== null && $value < $this->min) {
            return false;
        }

        if ($this->max !== null && $value > $this->max) {
            return false;
        }

        return true;
    }

    public function message()
    {
        $message = "The {$this->field} must be a valid number";

        if ($this->min !== null && $this->max !== null) {
            $message .= " between {$this->min} and {$this->max}";
        } elseif ($this->min !== null) {
            $message .= " greater than or equal to {$this->min}";
        } elseif ($this->max !== null) {
            $message .= " less than or equal to {$this->max}";
        }

        return $message;
    }
} 