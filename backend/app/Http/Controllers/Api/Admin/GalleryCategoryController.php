<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\GalleryCategoryResource;
use App\Models\GalleryCategory;
use Illuminate\Http\Request;

class GalleryCategoryController extends Controller
{
    public function index(Request $request)
    {
        $query = GalleryCategory::query();

        if ($search = $request->query('search')) {
            $query->where('name', 'like', "%{$search}%");
        }

        $categories = $query->orderBy('name')->paginate(15);

        return response()->json([
            'success' => true,
            'data' => GalleryCategoryResource::collection($categories),
            'links' => $categories->linkPills()->toArray(), // @phpstan-ignore-line
            'meta' => $categories->toArray()['meta'] ?? [],
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:1000'],
        ]);

        $category = GalleryCategory::create($data);

        return response()->json([
            'success' => true,
            'data' => new GalleryCategoryResource($category),
        ], 201);
    }

    public function show(GalleryCategory $category)
    {
        return response()->json([
            'success' => true,
            'data' => new GalleryCategoryResource($category),
        ]);
    }

    public function update(Request $request, GalleryCategory $category)
    {
        $data = $request->validate([
            'name' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:1000'],
        ]);

        $category->update($data);

        return response()->json([
            'success' => true,
            'data' => new GalleryCategoryResource($category),
        ]);
    }

    public function destroy(GalleryCategory $category)
    {
        $category->delete();

        return response()->json([
            'success' => true,
            'message' => 'Category deleted',
        ]);
    }
}
