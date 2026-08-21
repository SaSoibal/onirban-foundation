<?php

namespace App\Http\Requests\Api\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBloodRequestRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'status' => ['nullable', 'in:pending,active,fulfilled,cancelled,expired'],
            'assigned_donor_id' => ['nullable', 'integer', 'exists:blood_donors,id'],
            'notes' => ['nullable', 'string', 'max:2000'],
        ];
    }
}
