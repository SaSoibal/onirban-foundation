<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
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

        $pages = $query->orderByDesc('created_at')->paginate(15);

        return response()->json([
            'success' => true,
            'data' => PageResource::collection($pages),
            'links' => $pages->linkPills()->toArray(),
            'meta' => $pages->toArray()['meta'] ?? [],
        ]);
    }

    public function show(string $slug)
    {
        $page = Page::where('slug', $slug)->firstOrFail();

        return response()->json([
            'success' => true,
            'data' => new PageResource($page),
        ]);
    }
}
