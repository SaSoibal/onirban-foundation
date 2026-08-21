<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\TeamMemberResource;
use App\Models\TeamMember;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    public function index(Request $request)
    {
        $query = TeamMember::query()->where('status', 'active');

        if ($search = $request->query('search')) {
            $query->where('name', 'like', "%{$search}%")
                ->orWhere('designation', 'like', "%{$search}%");
        }

        $members = $query->orderBy('sort_order')->paginate(20);

        return response()->json([
            'success' => true,
            'data' => TeamMemberResource::collection($members),
            'links' => $members->linkPills()->toArray(),
            'meta' => $members->toArray()['meta'] ?? [],
        ]);
    }
}
