<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\BloodRequestResource;
use App\Models\BloodRequest;
use Illuminate\Http\Request;

class BloodRequestController extends Controller
{
    public function index(Request $request)
    {
        $query = BloodRequest::query()
            ->whereIn('status', ['active', 'pending']);

        if ($bloodGroup = $request->query('blood_group')) {
            $query->where('blood_group', $bloodGroup);
        }

        if ($status = $request->query('status')) {
            $query->where('status', $status);
        }

        $requests = $query->orderByDesc('created_at')->paginate(15);

        return response()->json([
            'success' => true,
            'data' => BloodRequestResource::collection($requests),
            'links' => $requests->linkPills()->toArray(),
            'meta' => $requests->toArray()['meta'] ?? [],
        ]);
    }
}
