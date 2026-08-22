<?php

namespace App\Http\Resources;

use App\Models\User;
use Carbon\CarbonInterface;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property-read int $id
 * @property-read string $name
 * @property-read string $designation
 * @property-read string|null $bio
 * @property-read string|null $photo
 * @property-read string|null $email
 * @property-read string|null $phone
 * @property-read int $sort_order
 * @property-read string $status
 * @property-read User|null $creator
 * @property-read CarbonInterface|null $created_at
 * @property-read CarbonInterface|null $updated_at
 */
class TeamMemberResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'designation' => $this->designation,
            'bio' => $this->bio,
            'photo' => $this->photo,
            'email' => $this->email,
            'phone' => $this->phone,
            'sort_order' => $this->sort_order,
            'status' => $this->status,
            'created_by' => $this->whenLoaded('creator', fn () => new UserResource($this->creator)),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
