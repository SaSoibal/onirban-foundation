<?php

namespace App\Http\Resources;

use App\Models\User;
use Carbon\CarbonInterface;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

/**
 * @property-read int $id
 * @property-read string|null $title
 * @property-read string|null $subtitle
 * @property-read string $image_path
 * @property-read string|null $link_url
 * @property-read string|null $button_text
 * @property-read int $sort_order
 * @property-read bool $is_active
 * @property-read string $status
 * @property-read User|null $creator
 * @property-read User|null $updater
 * @property-read CarbonInterface|null $created_at
 * @property-read CarbonInterface|null $updated_at
 */
class BannerResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'subtitle' => $this->subtitle,
            'image_path' => $this->image_path,
            'image_url' => $this->image_path ? Storage::url($this->image_path) : null,
            'image_api_url' => $this->image_path ? str_replace('http://', 'https://', url("/api/banners/{$this->id}/image")) : null,
            'link_url' => $this->link_url,
            'button_text' => $this->button_text,
            'sort_order' => $this->sort_order,
            'is_active' => $this->is_active,
            'status' => $this->status,
            'created_by' => $this->whenLoaded('creator', fn () => new UserResource($this->creator)),
            'updated_by' => $this->whenLoaded('updater', fn () => new UserResource($this->updater)),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
