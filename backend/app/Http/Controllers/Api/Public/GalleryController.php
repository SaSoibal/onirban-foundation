<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\GalleryResource;
use App\Http\Resources\GalleryCategoryResource;
use App\Models\Gallery;
use App\Models\GalleryCategory;
use Illuminate\Http\Request;

class GalleryController extends Controller
{
    public function index(Request $request)
    {
        $query = Gallery::query();

        if ($categoryId = $request->query('category_id')) {
            $query->where('category_id', $categoryId);
        }

        $galleries = $query->orderByDesc('sort_order')->paginate(24);

        return response()->json([
            'success' => true,
            'data' => GalleryResource::collection($galleries),
            'links' => $galleries->linkPills()->toArray(),
            'meta' => $galleries->toArray()['meta'] ?? [],
        ]);
    }

    public function categories()
    {
        $categories = GalleryCategory::orderBy('name')->get();

        return response()->json([
            'success' => true,
            'data' => GalleryCategoryResource::collection($categories),
        ]);
    }
}
