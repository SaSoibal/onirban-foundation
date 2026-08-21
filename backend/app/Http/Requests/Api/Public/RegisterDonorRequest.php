<?php

namespace App\Http\Requests\Api\Public;

use Illuminate\Foundation\Http\FormRequest;

class RegisterDonorRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'size:11'],
            'email' => ['nullable', 'email', 'max:255'],
            'blood_group' => ['required', 'string', 'in:A+,A-,B+,B-,AB+,AB-,O+,O-'],
            'district' => ['required', 'string', 'max:100'],
            'last_donation_date' => ['nullable', 'date'],
            'photo' => ['nullable', 'image', 'max:2048'],
            'nid_number' => ['nullable', 'string', 'max:50'],
            'show_phone' => ['boolean'],
            'show_district' => ['boolean'],
        ];
    }
}
