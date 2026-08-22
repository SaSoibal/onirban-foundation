<?php

namespace App\Http\Resources;

use App\Models\User;
use Carbon\CarbonInterface;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property-read int $id
 * @property-read string $title
 * @property-read string $slug
 * @property-read string|null $description
 * @property-read CarbonInterface|null $event_date
 * @property-read CarbonInterface|null $end_date
 * @property-read string|null $location
 * @property-read string|null $image
 * @property-read string|null $registration_url
 * @property-read string $status
 * @property-read User|null $creator
 * @property-read CarbonInterface|null $created_at
 * @property-read CarbonInterface|null $updated_at
 */
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
            'created_by' => $this->whenLoaded('creator', fn () => new UserResource($this->creator)),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
