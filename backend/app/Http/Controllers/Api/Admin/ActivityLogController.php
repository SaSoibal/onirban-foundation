<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ActivityLogResource;
use App\Models\ActivityLog;
use Illuminate\Http\Request;

class ActivityLogController extends Controller
{
    public function index(Request $request)
    {
        $query = ActivityLog::query()->with('user');

        if ($userId = $request->query('user_id')) {
            $query->where('user_id', $userId);
        }

        if ($action = $request->query('action')) {
            $query->where('action', $action);
        }

        if ($subjectType = $request->query('subject_type')) {
            $query->where('subject_type', $subjectType);
        }

        $logs = $query->orderByDesc('created_at')->paginate(20);

        return response()->json([
            'success' => true,
            'data' => ActivityLogResource::collection($logs),
            'links' => $logs->linkPills()->toArray(),
            'meta' => $logs->toArray()['meta'] ?? [],
        ]);
    }

    public function show(ActivityLog $activityLog)
    {
        return response()->json([
            'success' => true,
            'data' => new ActivityLogResource($activityLog->load('user')),
        ]);
    }
}
