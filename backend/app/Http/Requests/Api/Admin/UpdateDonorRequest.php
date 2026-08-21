<?php

namespace App\Http\Requests\Api\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateDonorRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['nullable', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'size:11'],
            'email' => ['nullable', 'email', 'max:255'],
            'blood_group' => ['nullable', 'string', 'in:A+,A-,B+,B-,AB+,AB-,O+,O-'],
            'district' => ['nullable', 'string', 'max:100'],
            'last_donation_date' => ['nullable', 'date'],
            'photo' => ['nullable', 'image', 'max:2048'],
            'nid_number' => ['nullable', 'string', 'max:50'],
            'show_phone' => ['boolean'],
            'show_district' => ['boolean'],
            'status' => ['nullable', 'in:active,inactive,suspended'],
        ];
    }
}
