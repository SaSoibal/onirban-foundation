<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Admin\UpdateBloodRequestRequest;
use App\Http\Resources\BloodRequestResource;
use App\Models\BloodRequest;
use Illuminate\Http\Request;

class BloodRequestController extends Controller
{
    public function index(Request $request)
    {
        $query = BloodRequest::query();

        if ($status = $request->query('status')) {
            $query->where('status', $status);
        }

        if ($bloodGroup = $request->query('blood_group')) {
            $query->where('blood_group', $bloodGroup);
        }

        if ($search = $request->query('search')) {
            $query->where('requester_name', 'like', "%{$search}%")
                  ->orWhere('hospital_name', 'like', "%{$search}%");
        }

        $requests = $query->orderByDesc('created_at')->paginate(15);

        return response()->json([
            'success' => true,
            'data' => BloodRequestResource::collection($requests),
            'links' => $requests->linkPills()->toArray(),
            'meta' => $requests->toArray()['meta'] ?? [],
        ]);
    }

    public function show(BloodRequest $bloodRequest)
    {
        return response()->json([
            'success' => true,
            'data' => new BloodRequestResource($bloodRequest),
        ]);
    }

    public function update(UpdateBloodRequestRequest $request, BloodRequest $bloodRequest)
    {
        $bloodRequest->update($request->validated());

        return response()->json([
            'success' => true,
            'data' => new BloodRequestResource($bloodRequest),
        ]);
    }

    public function destroy(BloodRequest $bloodRequest)
    {
        $bloodRequest->delete();

        return response()->json([
            'success' => true,
            'message' => 'Blood request deleted',
        ]);
    }

    public function assign(Request $request, BloodRequest $bloodRequest)
    {
        $validated = $request->validate([
            'assigned_donor_id' => ['required', 'integer', 'exists:blood_donors,id'],
        ]);

        $bloodRequest->update([
            'assigned_donor_id' => $validated['assigned_donor_id'],
            'status' => 'active',
        ]);

        return response()->json([
            'success' => true,
            'data' => new BloodRequestResource($bloodRequest),
        ]);
    }
}
