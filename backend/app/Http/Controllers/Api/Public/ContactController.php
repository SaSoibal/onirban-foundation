<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\ContactMessageResource;
use App\Http\Requests\Api\Public\ContactMessageRequest;
use App\Models\ContactMessage;

class ContactController extends Controller
{
    public function store(ContactMessageRequest $request)
    {
        $message = ContactMessage::create($request->validated());

        return response()->json([
            'success' => true,
            'data' => new ContactMessageResource($message),
        ], 201);
    }
}
