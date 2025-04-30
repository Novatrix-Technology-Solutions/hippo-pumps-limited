<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Rules\ValidPumpCategory;
use App\Rules\ValidPumpSpecification;

class PumpSolutionRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'image' => ['nullable', 'image', 'max:2048'],
            'category' => ['required', new ValidPumpCategory],
            'sub_category' => ['required', 'string'],
            'flow_rate' => ['required', new ValidPumpSpecification('flow rate', 0)],
            'head' => ['required', new ValidPumpSpecification('head', 0)],
            'power' => ['required', new ValidPumpSpecification('power', 0)],
            'voltage' => ['required', new ValidPumpSpecification('voltage', 0)],
            'phase' => ['required', 'string', 'in:1,3'],
            'frequency' => ['required', new ValidPumpSpecification('frequency', 0)],
            'material' => ['required', 'string'],
            'price' => ['required', new ValidPumpSpecification('price', 0)],
            'status' => ['required', 'boolean'],
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'The pump name is required',
            'name.max' => 'The pump name cannot exceed 255 characters',
            'description.required' => 'The pump description is required',
            'image.image' => 'The file must be an image',
            'image.max' => 'The image size cannot exceed 2MB',
            'category.required' => 'The pump category is required',
            'sub_category.required' => 'The pump sub-category is required',
            'flow_rate.required' => 'The flow rate is required',
            'head.required' => 'The head is required',
            'power.required' => 'The power is required',
            'voltage.required' => 'The voltage is required',
            'phase.required' => 'The phase is required',
            'phase.in' => 'The phase must be either 1 or 3',
            'frequency.required' => 'The frequency is required',
            'material.required' => 'The material is required',
            'price.required' => 'The price is required',
            'status.required' => 'The status is required',
            'status.boolean' => 'The status must be either true or false',
        ];
    }
} 