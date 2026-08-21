<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\BloodDonorResource;
use App\Models\BloodDonor;
use Illuminate\Http\Request;

class BloodDonorController extends Controller
{
    public function index(Request $request)
    {
        $query = BloodDonor::query()
            ->where('status', 'active')
            ->where('is_verified', true);

        if ($bloodGroup = $request->query('blood_group')) {
            $query->where('blood_group', $bloodGroup);
        }

        if ($district = $request->query('district')) {
            $query->where('district', 'like', "%{$district}%");
        }

        if ($search = $request->query('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%");
            });
        }

        $donors = $query->orderByDesc('created_at')->paginate(15);

        return response()->json([
            'success' => true,
            'data' => BloodDonorResource::collection($donors),
            'links' => $donors->linkPills()->toArray(),
            'meta' => $donors->toArray()['meta'] ?? [],
        ]);
    }

    public function eligible(Request $request)
    {
        $query = BloodDonor::query()
            ->where('status', 'active')
            ->where('is_verified', true)
            ->where(function ($q) {
                $q->whereNull('last_donation_date')
                  ->orWhereDate('last_donation_date', '<=', now()->subMonths(3)->toDateString());
            });

        if ($bloodGroup = $request->query('blood_group')) {
            $query->where('blood_group', $bloodGroup);
        }

        if ($district = $request->query('district')) {
            $query->where('district', 'like', "%{$district}%");
        }

        $donors = $query->orderByDesc('created_at')->paginate(15);

        return response()->json([
            'success' => true,
            'data' => BloodDonorResource::collection($donors),
            'links' => $donors->linkPills()->toArray(),
            'meta' => $donors->toArray()['meta'] ?? [],
        ]);
    }

    public function show(int $id)
    {
        $donor = BloodDonor::where('status', 'active')
            ->where('is_verified', true)
            ->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => new BloodDonorResource($donor),
        ]);
    }
}
