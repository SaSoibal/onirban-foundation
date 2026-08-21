<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\VolunteerResource;
use App\Models\Volunteer;
use Illuminate\Http\Request;

class VolunteerController extends Controller
{
    public function index(Request $request)
    {
        $query = Volunteer::query();

        if ($status = $request->query('status')) {
            $query->where('status', $status);
        }

        if ($search = $request->query('search')) {
            $query->where('name', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%");
        }

        $volunteers = $query->orderByDesc('created_at')->paginate(15);

        return response()->json([
            'success' => true,
            'data' => VolunteerResource::collection($volunteers),
            'links' => $volunteers->linkPills()->toArray(),
            'meta' => $volunteers->toArray()['meta'] ?? [],
        ]);
    }

    public function show(Volunteer $volunteer)
    {
        return response()->json([
            'success' => true,
            'data' => new VolunteerResource($volunteer),
        ]);
    }

    public function update(Request $request, Volunteer $volunteer)
    {
        $data = $request->validate([
            'name' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:20'],
            'address' => ['nullable', 'string', 'max:1000'],
            'occupation' => ['nullable', 'string', 'max:255'],
            'skills' => ['nullable', 'string', 'max:1000'],
            'availability' => ['nullable', 'string', 'max:255'],
            'motivation' => ['nullable', 'string', 'max:2000'],
            'status' => ['nullable', 'in:pending,approved,rejected,inactive'],
        ]);

        $volunteer->update($data);

        return response()->json([
            'success' => true,
            'data' => new VolunteerResource($volunteer),
        ]);
    }

    public function destroy(Volunteer $volunteer)
    {
        $volunteer->delete();

        return response()->json([
            'success' => true,
            'message' => 'Volunteer deleted',
        ]);
    }
}
