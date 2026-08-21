<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProgramResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'description' => $this->description,
            'short_description' => $this->short_description,
            'image' => $this->image,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'location' => $this->location,
            'status' => $this->status,
            'created_by' => $this->whenLoaded('creator', fn () => new UserResource($this->creator)),
            'updated_by' => $this->whenLoaded('updater', fn () => new UserResource($this->updater)),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
