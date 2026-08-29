<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\BannerResource;
use App\Models\Banner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class BannerController extends Controller
{
    public function index(Request $request)
    {
        $query = Banner::query();

        if ($status = $request->query('status')) {
            $query->where('status', $status);
        }

        if ($search = $request->query('search')) {
            $query->where('title', 'like', "%{$search}%");
        }

        $banners = $query->orderBy('sort_order')->orderByDesc('created_at')->paginate(15);

        return response()->json([
            'success' => true,
            'data' => BannerResource::collection($banners),
            'links' => $banners->linkPills()->toArray(), // @phpstan-ignore-line
            'meta' => $banners->toArray()['meta'] ?? [],
        ]);
    }

    public function store(Request $request)
    {
        Log::info('Banner store', [
            'has_file' => $request->hasFile('image'),
            'all_files' => $request->allFiles(),
            'input' => $request->except('image'),
        ]);

        $data = $request->validate([
            'title' => ['nullable', 'string', 'max:255'],
            'subtitle' => ['nullable', 'string', 'max:500'],
            'image' => ['nullable', 'image', 'max:2048'],
            'link_url' => ['nullable', 'url', 'max:500'],
            'button_text' => ['nullable', 'string', 'max:100'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['nullable', 'boolean'],
            'status' => ['nullable', 'string', 'max:50'],
        ]);

        if ($request->hasFile('image')) {
            try {
                $path = $request->file('image')->store('banners', 'public');
                $data['image_path'] = $path;
                Log::info('Banner image stored', ['path' => $path]);
            } catch (\Exception $e) {
                Log::error('Banner image store failed', ['error' => $e->getMessage()]);
            }
        }

        $data['created_by'] = $request->user()->id;
        $data['updated_by'] = $request->user()->id;

        $banner = Banner::create($data);

        return response()->json([
            'success' => true,
            'data' => new BannerResource($banner),
        ], 201);
    }

    public function show(Banner $banner)
    {
        return response()->json([
            'success' => true,
            'data' => new BannerResource($banner),
        ]);
    }

    public function update(Request $request, Banner $banner)
    {
        Log::info('Banner update', [
            'id' => $banner->id,
            'has_file' => $request->hasFile('image'),
            'all_files' => $request->allFiles(),
            'input' => $request->except('image'),
        ]);

        $data = $request->validate([
            'title' => ['nullable', 'string', 'max:255'],
            'subtitle' => ['nullable', 'string', 'max:500'],
            'image' => ['nullable', 'image', 'max:2048'],
            'link_url' => ['nullable', 'url', 'max:500'],
            'button_text' => ['nullable', 'string', 'max:100'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['nullable', 'boolean'],
            'status' => ['nullable', 'string', 'max:50'],
        ]);

        if ($request->hasFile('image')) {
            try {
                $path = $request->file('image')->store('banners', 'public');
                $data['image_path'] = $path;
                Log::info('Banner image stored on update', ['path' => $path]);
            } catch (\Exception $e) {
                Log::error('Banner image store failed on update', ['error' => $e->getMessage()]);
            }
        } else {
            $data['image_path'] = $banner->image_path;
        }

        $data['updated_by'] = $request->user()->id;

        $banner->update($data);

        return response()->json([
            'success' => true,
            'data' => new BannerResource($banner),
        ]);
    }

    public function destroy(Banner $banner)
    {
        $banner->delete();

        return response()->json([
            'success' => true,
            'message' => 'Banner deleted',
        ]);
    }
}
