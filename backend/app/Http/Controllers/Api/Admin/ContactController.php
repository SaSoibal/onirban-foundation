<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ContactMessageResource;
use App\Models\ContactMessage;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function index(Request $request)
    {
        $query = ContactMessage::query();

        if ($status = $request->query('status')) {
            $query->where('status', $status);
        }

        if ($search = $request->query('search')) {
            $query->where('name', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%")
                ->orWhere('subject', 'like', "%{$search}%");
        }

        $messages = $query->orderByDesc('created_at')->paginate(15);

        return response()->json([
            'success' => true,
            'data' => ContactMessageResource::collection($messages),
            'links' => $messages->linkPills()->toArray(), // @phpstan-ignore-line
            'meta' => $messages->toArray()['meta'] ?? [],
        ]);
    }

    public function show(ContactMessage $contactMessage)
    {
        return response()->json([
            'success' => true,
            'data' => new ContactMessageResource($contactMessage),
        ]);
    }

    public function update(Request $request, ContactMessage $contactMessage)
    {
        $data = $request->validate([
            'status' => ['required', 'in:new,read,replied,closed'],
        ]);

        $contactMessage->update($data);

        return response()->json([
            'success' => true,
            'data' => new ContactMessageResource($contactMessage),
        ]);
    }

    public function destroy(ContactMessage $contactMessage)
    {
        $contactMessage->delete();

        return response()->json([
            'success' => true,
            'message' => 'Contact message deleted',
        ]);
    }
}
