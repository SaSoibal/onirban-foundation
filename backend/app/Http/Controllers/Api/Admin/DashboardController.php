<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\DashboardStatsResource;
use App\Models\BloodDonor;
use App\Models\BloodRequest;
use App\Models\ContactMessage;
use App\Models\Donation;
use App\Models\Volunteer;
use App\Models\ActivityLog;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function stats()
    {
        $stats = [
            'total_donors' => BloodDonor::count(),
            'verified_donors' => BloodDonor::where('is_verified', true)->count(),
            'active_blood_requests' => BloodRequest::where('status', 'active')->count(),
            'pending_volunteers' => Volunteer::where('status', 'pending')->count(),
            'unread_messages' => ContactMessage::where('status', 'new')->count(),
            'total_donations' => Donation::where('status', 'completed')->sum('amount'),
            'recent_activity' => ActivityLog::with('user')->orderByDesc('created_at')->limit(10)->get(),
        ];

        return response()->json([
            'success' => true,
            'data' => new DashboardStatsResource($stats),
        ]);
    }
}
