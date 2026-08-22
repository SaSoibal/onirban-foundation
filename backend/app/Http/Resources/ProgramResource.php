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
 * @property-read string|null $short_description
 * @property-read string|null $image
 * @property-read CarbonInterface|null $start_date
 * @property-read CarbonInterface|null $end_date
 * @property-read string|null $location
 * @property-read string $status
 * @property-read User|null $creator
 * @property-read User|null $updater
 * @property-read CarbonInterface|null $created_at
 * @property-read CarbonInterface|null $updated_at
 */
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
