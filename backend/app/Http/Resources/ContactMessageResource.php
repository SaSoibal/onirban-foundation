<?php

namespace App\Http\Resources;

use App\Models\User;
use Carbon\CarbonInterface;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property-read int $id
 * @property-read string $name
 * @property-read string $email
 * @property-read string|null $phone
 * @property-read string $subject
 * @property-read string $message
 * @property-read string $status
 * @property-read CarbonInterface|null $replied_at
 * @property-read User|null $replier
 * @property-read CarbonInterface|null $created_at
 * @property-read CarbonInterface|null $updated_at
 */
class ContactMessageResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'subject' => $this->subject,
            'message' => $this->message,
            'status' => $this->status,
            'replied_at' => $this->replied_at,
            'replied_by' => $this->whenLoaded('replier', fn () => new UserResource($this->replier)),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
