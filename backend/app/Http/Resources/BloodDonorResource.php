<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

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
            'verified_by' => $this->whenLoaded('verifier', fn() => new UserResource($this->verifier)),
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
