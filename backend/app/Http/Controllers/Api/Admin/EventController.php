<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Admin\StoreEventRequest;
use App\Http\Resources\EventResource;
use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index(Request $request)
    {
        $query = Event::query();

        if ($status = $request->query('status')) {
            $query->where('status', $status);
        }

        if ($search = $request->query('search')) {
            $query->where('title', 'like', "%{$search}%")
                  ->orWhere('location', 'like', "%{$search}%");
        }

        $events = $query->orderByDesc('event_date')->paginate(15);

        return response()->json([
            'success' => true,
            'data' => EventResource::collection($events),
            'links' => $events->linkPills()->toArray(),
            'meta' => $events->toArray()['meta'] ?? [],
        ]);
    }

    public function store(StoreEventRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = $request->user()->id;

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('events', 'public');
        }

        $event = Event::create($data);

        return response()->json([
            'success' => true,
            'data' => new EventResource($event),
        ], 201);
    }

    public function show(Event $event)
    {
        return response()->json([
            'success' => true,
            'data' => new EventResource($event),
        ]);
    }

    public function update(Request $request, Event $event)
    {
        $data = $request->validate([
            'title' => ['nullable', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:events,slug,' . $event->id],
            'description' => ['nullable', 'string'],
            'event_date' => ['nullable', 'date'],
            'end_date' => ['nullable', 'date', 'after_or_equal:event_date'],
            'location' => ['nullable', 'string', 'max:255'],
            'image' => ['nullable', 'image', 'max:2048'],
            'registration_url' => ['nullable', 'url', 'max:500'],
            'status' => ['nullable', 'in:upcoming,ongoing,completed,cancelled'],
        ]);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('events', 'public');
        }

        $event->update($data);

        return response()->json([
            'success' => true,
            'data' => new EventResource($event),
        ]);
    }

    public function destroy(Event $event)
    {
        $event->delete();

        return response()->json([
            'success' => true,
            'message' => 'Event deleted',
        ]);
    }
}
