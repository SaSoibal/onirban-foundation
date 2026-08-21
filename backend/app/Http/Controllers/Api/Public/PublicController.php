<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Public\ContactMessageRequest;
use App\Http\Requests\Api\Public\RegisterDonorRequest;
use App\Http\Requests\Api\Public\RegisterVolunteerRequest;
use App\Http\Requests\Api\Public\StoreBloodRequestRequest;
use App\Http\Requests\Api\Public\StoreDonationRequest;
use App\Http\Resources\BloodDonorResource;
use App\Http\Resources\BloodRequestResource;
use App\Http\Resources\ContactMessageResource;
use App\Http\Resources\DonationResource;
use App\Http\Resources\VolunteerResource;
use App\Models\BloodDonor;
use App\Models\BloodRequest;
use App\Models\ContactMessage;
use App\Models\Donation;
use App\Models\Volunteer;

class PublicController extends Controller
{
    public function registerDonor(RegisterDonorRequest $request)
    {
        $data = $request->validated();
        $data['status'] = 'active';

        if ($request->hasFile('photo')) {
            $data['photo'] = $request->file('photo')->store('donors', 'public');
        }

        $donor = BloodDonor::create($data);

        return response()->json([
            'success' => true,
            'data' => new BloodDonorResource($donor),
        ], 201);
    }

    public function storeBloodRequest(StoreBloodRequestRequest $request)
    {
        $bloodRequest = BloodRequest::create($request->validated());

        return response()->json([
            'success' => true,
            'data' => new BloodRequestResource($bloodRequest),
        ], 201);
    }

    public function storeContactMessage(ContactMessageRequest $request)
    {
        $message = ContactMessage::create($request->validated());

        return response()->json([
            'success' => true,
            'data' => new ContactMessageResource($message),
        ], 201);
    }

    public function registerVolunteer(RegisterVolunteerRequest $request)
    {
        $volunteer = Volunteer::create($request->validated());

        return response()->json([
            'success' => true,
            'data' => new VolunteerResource($volunteer),
        ], 201);
    }

    public function storeDonation(StoreDonationRequest $request)
    {
        $donation = Donation::create($request->validated());

        return response()->json([
            'success' => true,
            'data' => new DonationResource($donation),
        ], 201);
    }
}
