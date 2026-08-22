<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Admin\UpdateDonorRequest;
use App\Http\Requests\Api\Admin\VerifyDonorRequest;
use App\Http\Resources\BloodDonorResource;
use App\Models\BloodDonor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BloodDonorController extends Controller
{
    public function index(Request $request)
    {
        $query = BloodDonor::query();

        if ($bloodGroup = str_replace(' ', '+', (string) $request->query('blood_group'))) { dd(bin2hex((string) $request->query('blood_group')), $request->query('blood_group'));
            $query->where('blood_group', $bloodGroup);
        }

        if ($district = $request->query('district')) {
            $query->where('district', 'like', "%{$district}%");
        }

        if ($verified = $request->query('is_verified')) {
            $query->where('is_verified', filter_var($verified, FILTER_VALIDATE_BOOLEAN));
        }

        if ($status = $request->query('status')) {
            $query->where('status', $status);
        }

        if ($search = $request->query('search')) {
            $query->where('name', 'like', "%{$search}%")
                ->orWhere('phone', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%");
        }

        $donors = $query->orderByDesc('created_at')->paginate(15);

        return response()->json([
            'success' => true,
            'data' => BloodDonorResource::collection($donors),
            'links' => $donors->linkPills()->toArray(), // @phpstan-ignore-line
            'meta' => $donors->toArray()['meta'] ?? [],
        ]);
    }

    public function show(BloodDonor $donor)
    {
        return response()->json([
            'success' => true,
            'data' => new BloodDonorResource($donor),
        ]);
    }

    public function update(UpdateDonorRequest $request, BloodDonor $donor)
    {
        $data = $request->validated();

        if ($request->hasFile('photo')) {
            $data['photo'] = $request->file('photo')->store('donors', 'public');
        }

        $donor->update($data);

        return response()->json([
            'success' => true,
            'data' => new BloodDonorResource($donor),
        ]);
    }

    public function destroy(BloodDonor $donor)
    {
        $donor->delete();

        return response()->json([
            'success' => true,
            'message' => 'Donor deleted',
        ]);
    }

    public function verify(VerifyDonorRequest $request, BloodDonor $donor)
    {
        $donor->update([
            'is_verified' => $request->boolean('is_verified'),
            'verified_by' => $request->user()->id,
            'verified_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'data' => new BloodDonorResource($donor),
        ]);
    }

    public function stats()
    {
        $total = BloodDonor::count();
        $verified = BloodDonor::where('is_verified', true)->count();
        $byBloodGroup = BloodDonor::where('is_verified', true)
            ->select('blood_group', DB::raw('count(*) as count'))
            ->groupBy('blood_group')
            ->pluck('count', 'blood_group');

        return response()->json([
            'success' => true,
            'data' => [
                'total' => $total,
                'verified' => $verified,
                'by_blood_group' => $byBloodGroup,
            ],
        ]);
    }
}
