<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EventResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'description' => $this->description,
            'event_date' => $this->event_date,
            'end_date' => $this->end_date,
            'location' => $this->location,
            'image' => $this->image,
            'registration_url' => $this->registration_url,
            'status' => $this->status,
            'created_by' => $this->whenLoaded('creator', fn() => new UserResource($this->creator)),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
