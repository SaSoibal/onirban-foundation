<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Admin\StorePageRequest;
use App\Http\Requests\Api\Admin\UpdatePageRequest;
use App\Http\Resources\PageResource;
use App\Models\Page;
use Illuminate\Http\Request;

class PageController extends Controller
{
    public function index(Request $request)
    {
        $query = Page::query();

        if ($status = $request->query('status')) {
            $query->where('status', $status);
        }

        if ($search = $request->query('search')) {
            $query->where('title', 'like', "%{$search}%")
                ->orWhere('slug', 'like', "%{$search}%");
        }

        $pages = $query->orderByDesc('created_at')->paginate(15);

        return response()->json([
            'success' => true,
            'data' => PageResource::collection($pages),
            'links' => $pages->linkPills()->toArray(), // @phpstan-ignore-line
            'meta' => $pages->toArray()['meta'] ?? [],
        ]);
    }

    public function store(StorePageRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = $request->user()->id;
        $data['updated_by'] = $request->user()->id;

        if ($request->hasFile('featured_image')) {
            $data['featured_image'] = $request->file('featured_image')->store('pages', 'public');
        }

        $page = Page::create($data);

        return response()->json([
            'success' => true,
            'data' => new PageResource($page),
        ], 201);
    }

    public function show(Page $page)
    {
        return response()->json([
            'success' => true,
            'data' => new PageResource($page),
        ]);
    }

    public function update(UpdatePageRequest $request, Page $page)
    {
        $data = $request->validated();
        $data['updated_by'] = $request->user()->id;

        if ($request->hasFile('featured_image')) {
            $data['featured_image'] = $request->file('featured_image')->store('pages', 'public');
        }

        $page->update($data);

        return response()->json([
            'success' => true,
            'data' => new PageResource($page),
        ]);
    }

    public function destroy(Page $page)
    {
        $page->delete();

        return response()->json([
            'success' => true,
            'message' => 'Page deleted',
        ]);
    }
}
