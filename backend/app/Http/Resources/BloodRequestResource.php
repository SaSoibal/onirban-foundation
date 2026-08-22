<?php

namespace App\Http\Resources;

use App\Models\BloodDonor;
use Carbon\CarbonInterface;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property-read int $id
 * @property-read string $requester_name
 * @property-read string $requester_phone
 * @property-read string $blood_group
 * @property-read int $units_needed
 * @property-read string $hospital_name
 * @property-read string|null $hospital_address
 * @property-read CarbonInterface|null $deadline
 * @property-read string|null $reason
 * @property-read string $status
 * @property-read int|null $assigned_donor_id
 * @property-read BloodDonor|null $assignedDonor
 * @property-read string|null $notes
 * @property-read CarbonInterface|null $created_at
 * @property-read CarbonInterface|null $updated_at
 */
class BloodRequestResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'requester_name' => $this->requester_name,
            'requester_phone' => $this->requester_phone,
            'blood_group' => $this->blood_group,
            'units_needed' => $this->units_needed,
            'hospital_name' => $this->hospital_name,
            'hospital_address' => $this->hospital_address,
            'deadline' => $this->deadline,
            'reason' => $this->reason,
            'status' => $this->status,
            'assigned_donor_id' => $this->assigned_donor_id,
            'assigned_donor' => $this->whenLoaded('assignedDonor', fn () => new BloodDonorResource($this->assignedDonor)),
            'notes' => $this->when($request->user(), $this->notes),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
