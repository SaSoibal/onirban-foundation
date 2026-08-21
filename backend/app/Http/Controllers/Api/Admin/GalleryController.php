<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Admin\StoreGalleryRequest;
use App\Http\Resources\GalleryResource;
use App\Models\Gallery;
use Illuminate\Http\Request;

class GalleryController extends Controller
{
    public function index(Request $request)
    {
        $query = Gallery::query();

        if ($categoryId = $request->query('category_id')) {
            $query->where('category_id', $categoryId);
        }

        if ($search = $request->query('search')) {
            $query->where('title', 'like', "%{$search}%");
        }

        $galleries = $query->orderByDesc('sort_order')->paginate(24);

        return response()->json([
            'success' => true,
            'data' => GalleryResource::collection($galleries),
            'links' => $galleries->linkPills()->toArray(),
            'meta' => $galleries->toArray()['meta'] ?? [],
        ]);
    }

    public function store(StoreGalleryRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = $request->user()->id;

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('gallery', 'public');
        }

        $gallery = Gallery::create($data);

        return response()->json([
            'success' => true,
            'data' => new GalleryResource($gallery),
        ], 201);
    }

    public function show(Gallery $gallery)
    {
        return response()->json([
            'success' => true,
            'data' => new GalleryResource($gallery),
        ]);
    }

    public function update(Request $request, Gallery $gallery)
    {
        $data = $request->validate([
            'category_id' => ['nullable', 'integer', 'exists:gallery_categories,id'],
            'title' => ['nullable', 'string', 'max:255'],
            'image' => ['nullable', 'image', 'max:2048'],
            'caption' => ['nullable', 'string', 'max:500'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('gallery', 'public');
        }

        $gallery->update($data);

        return response()->json([
            'success' => true,
            'data' => new GalleryResource($gallery),
        ]);
    }

    public function destroy(Gallery $gallery)
    {
        $gallery->delete();

        return response()->json([
            'success' => true,
            'message' => 'Gallery item deleted',
        ]);
    }
}
