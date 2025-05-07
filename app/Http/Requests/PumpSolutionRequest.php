<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Rules\ValidPumpCategory;
use App\Rules\ValidPumpSpecification;

class PumpSolutionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:pump_solutions,slug,' . $this->pump_solution?->id],
            'description' => ['nullable', 'string'],
            'category' => ['required', 'string', Rule::in(['SOLAR PUMPS', 'SOLAR PUMPS MAX', 'SEWAGE PUMPS', 'SUBMERSIBLE PUMPS', 'BOOSTER PUMPS', 'SPRINKLER PUMPS', 'SOLAR PANEL', 'SOLAR LIGHT', 'WIRE ROPE'])],
            'item_code' => ['nullable', 'string', 'max:50'],
            'q_max' => ['nullable', 'numeric', 'min:0'],
            'h_max' => ['nullable', 'numeric', 'min:0'],
            'rated_q' => ['nullable', 'numeric', 'min:0'],
            'rated_h' => ['nullable', 'numeric', 'min:0'],
            'motor' => ['nullable', 'numeric', 'min:0'],
            'motor_unit' => ['nullable', 'string', 'in:HP,kW'],
            'price_zmw' => ['required', 'numeric', 'min:0'],
            'vat_rate' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'net_price_zmw' => ['nullable', 'numeric', 'min:0'],
            'notes' => ['nullable', 'string'],
            'is_featured' => ['boolean'],
            'order' => ['integer', 'min:0'],
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