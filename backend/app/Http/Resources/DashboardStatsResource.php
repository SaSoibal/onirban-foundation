<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DashboardStatsResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'total_donors' => $this['total_donors'] ?? 0,
            'verified_donors' => $this['verified_donors'] ?? 0,
            'active_blood_requests' => $this['active_blood_requests'] ?? 0,
            'pending_volunteers' => $this['pending_volunteers'] ?? 0,
            'unread_messages' => $this['unread_messages'] ?? 0,
            'total_donations' => $this['total_donations'] ?? 0,
            'recent_activity' => ActivityLogResource::collection($this['recent_activity'] ?? []),
        ];
    }
}
