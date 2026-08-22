<?php

namespace App\Http\Resources;

use App\Models\User;
use Carbon\CarbonInterface;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property-read int $id
 * @property-read int|null $user_id
 * @property-read string $name
 * @property-read string|null $phone
 * @property-read bool $show_phone
 * @property-read string|null $email
 * @property-read string $blood_group
 * @property-read string|null $district
 * @property-read bool $show_district
 * @property-read CarbonInterface|null $last_donation_date
 * @property-read string|null $photo
 * @property-read string|null $nid_number
 * @property-read bool $is_verified
 * @property-read User|null $verifier
 * @property-read CarbonInterface|null $verified_at
 * @property-read string $status
 * @property-read bool $is_eligible
 * @property-read string|null $next_eligible_date
 * @property-read CarbonInterface|null $created_at
 * @property-read CarbonInterface|null $updated_at
 */
class BloodDonorResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'name' => $this->name,
            'phone' => $this->when($this->show_phone || $request->user(), $this->phone),
            'email' => $this->when($request->user(), $this->email),
            'blood_group' => $this->blood_group,
            'district' => $this->when($this->show_district || $request->user(), $this->district),
            'last_donation_date' => $this->last_donation_date,
            'photo' => $this->photo,
            'nid_number' => $this->when($request->user(), $this->nid_number),
            'is_verified' => $this->is_verified,
            'verified_by' => $this->whenLoaded('verifier', fn () => new UserResource($this->verifier)),
            'verified_at' => $this->verified_at,
            'show_phone' => $this->when($request->user(), $this->show_phone),
            'show_district' => $this->when($request->user(), $this->show_district),
            'status' => $this->status,
            'is_eligible' => $this->is_eligible,
            'next_eligible_date' => $this->next_eligible_date,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
