<?php

namespace App\Http\Requests\Api\Public;

use Illuminate\Foundation\Http\FormRequest;

class StoreBloodRequestRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'requester_name' => ['required', 'string', 'max:255'],
            'requester_phone' => ['required', 'string', 'max:20'],
            'blood_group' => ['required', 'string', 'in:A+,A-,B+,B-,AB+,AB-,O+,O-'],
            'units_needed' => ['required', 'integer', 'min:1', 'max:10'],
            'hospital_name' => ['required', 'string', 'max:255'],
            'hospital_address' => ['nullable', 'string', 'max:1000'],
            'deadline' => ['nullable', 'date'],
            'reason' => ['nullable', 'string', 'max:1000'],
        ];
    }
}
