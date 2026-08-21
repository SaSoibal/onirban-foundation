<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

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
            'replied_by' => $this->whenLoaded('replier', fn() => new UserResource($this->replier)),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
