<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Admin\StoreTeamRequest;
use App\Http\Resources\TeamMemberResource;
use App\Models\TeamMember;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    public function index(Request $request)
    {
        $query = TeamMember::query();

        if ($status = $request->query('status')) {
            $query->where('status', $status);
        }

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

    public function store(StoreTeamRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = $request->user()->id;

        if ($request->hasFile('photo')) {
            $data['photo'] = $request->file('photo')->store('team', 'public');
        }

        $member = TeamMember::create($data);

        return response()->json([
            'success' => true,
            'data' => new TeamMemberResource($member),
        ], 201);
    }

    public function show(TeamMember $team)
    {
        return response()->json([
            'success' => true,
            'data' => new TeamMemberResource($team),
        ]);
    }

    public function update(Request $request, TeamMember $team)
    {
        $data = $request->validate([
            'name' => ['nullable', 'string', 'max:255'],
            'designation' => ['nullable', 'string', 'max:255'],
            'bio' => ['nullable', 'string'],
            'photo' => ['nullable', 'image', 'max:2048'],
            'email' => ['nullable', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:20'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'status' => ['nullable', 'in:active,inactive'],
        ]);

        if ($request->hasFile('photo')) {
            $data['photo'] = $request->file('photo')->store('team', 'public');
        }

        $team->update($data);

        return response()->json([
            'success' => true,
            'data' => new TeamMemberResource($team),
        ]);
    }

    public function destroy(TeamMember $team)
    {
        $team->delete();

        return response()->json([
            'success' => true,
            'message' => 'Team member deleted',
        ]);
    }
}
