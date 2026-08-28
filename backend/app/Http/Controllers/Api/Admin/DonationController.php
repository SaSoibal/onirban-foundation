<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\DonationResource;
use App\Models\Donation;
use Illuminate\Http\Request;

class DonationController extends Controller
{
    public function index(Request $request)
    {
        $query = Donation::query();

        if ($status = $request->query('status')) {
            $query->where('status', $status);
        }

        if ($search = $request->query('search')) {
            $query->where('donor_name', 'like', "%{$search}%");
        }

        $donations = $query->orderByDesc('created_at')->paginate(15);

        return response()->json([
            'success' => true,
            'data' => DonationResource::collection($donations),
            'links' => $donations->linkPills()->toArray(), // @phpstan-ignore-line
            'meta' => $donations->toArray()['meta'] ?? [],
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'donor_name' => ['required', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:20'],
            'amount' => ['required', 'numeric', 'min:1'],
            'currency' => ['required', 'string', 'max:10'],
            'payment_method' => ['nullable', 'string', 'max:50'],
            'transaction_id' => ['nullable', 'string', 'max:100'],
            'message' => ['nullable', 'string', 'max:1000'],
            'status' => ['nullable', 'string', 'max:50'],
        ]);

        $donation = Donation::create($data);

        return response()->json([
            'success' => true,
            'data' => new DonationResource($donation),
        ], 201);
    }

    public function show(Donation $donation)
    {
        return response()->json([
            'success' => true,
            'data' => new DonationResource($donation),
        ]);
    }

    public function update(Request $request, Donation $donation)
    {
        $data = $request->validate([
            'donor_name' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:20'],
            'amount' => ['nullable', 'numeric', 'min:1'],
            'currency' => ['nullable', 'string', 'max:10'],
            'payment_method' => ['nullable', 'string', 'max:50'],
            'transaction_id' => ['nullable', 'string', 'max:100'],
            'message' => ['nullable', 'string', 'max:1000'],
            'status' => ['nullable', 'string', 'max:50'],
        ]);

        $donation->update($data);

        return response()->json([
            'success' => true,
            'data' => new DonationResource($donation),
        ]);
    }

    public function destroy(Donation $donation)
    {
        $donation->delete();

        return response()->json([
            'success' => true,
            'message' => 'Donation deleted',
        ]);
    }
}
