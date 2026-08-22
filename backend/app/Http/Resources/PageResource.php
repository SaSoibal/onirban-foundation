<?php

namespace App\Http\Resources;

use App\Models\User;
use Carbon\CarbonInterface;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property-read int $id
 * @property-read string $slug
 * @property-read string $title
 * @property-read string|null $content
 * @property-read string|null $excerpt
 * @property-read string|null $meta_title
 * @property-read string|null $meta_description
 * @property-read string|null $featured_image
 * @property-read string $status
 * @property-read CarbonInterface|null $published_at
 * @property-read User|null $creator
 * @property-read User|null $updater
 * @property-read CarbonInterface|null $created_at
 * @property-read CarbonInterface|null $updated_at
 */
class PageResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'title' => $this->title,
            'content' => $this->content,
            'excerpt' => $this->excerpt,
            'meta_title' => $this->meta_title,
            'meta_description' => $this->meta_description,
            'featured_image' => $this->featured_image,
            'status' => $this->status,
            'published_at' => $this->published_at,
            'created_by' => $this->whenLoaded('creator', fn () => new UserResource($this->creator)),
            'updated_by' => $this->whenLoaded('updater', fn () => new UserResource($this->updater)),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
