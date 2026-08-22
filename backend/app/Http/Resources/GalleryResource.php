<?php

namespace App\Http\Resources;

use App\Models\GalleryCategory;
use App\Models\User;
use Carbon\CarbonInterface;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property-read int $id
 * @property-read int $category_id
 * @property-read GalleryCategory|null $category
 * @property-read string $title
 * @property-read string $image
 * @property-read string|null $caption
 * @property-read int $sort_order
 * @property-read User|null $creator
 * @property-read CarbonInterface|null $created_at
 * @property-read CarbonInterface|null $updated_at
 */
class GalleryResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'category_id' => $this->category_id,
            'category' => $this->whenLoaded('category', fn () => new GalleryCategoryResource($this->category)),
            'title' => $this->title,
            'image' => $this->image,
            'caption' => $this->caption,
            'sort_order' => $this->sort_order,
            'created_by' => $this->whenLoaded('creator', fn () => new UserResource($this->creator)),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
