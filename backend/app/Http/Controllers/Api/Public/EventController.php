<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
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

        $events = $query->orderByDesc('event_date')->paginate(12);

        return response()->json([
            'success' => true,
            'data' => EventResource::collection($events),
            'links' => $events->linkPills()->toArray(), // @phpstan-ignore-line
            'meta' => $events->toArray()['meta'] ?? [],
        ]);
    }

    public function show(string $slug)
    {
        $event = Event::where('slug', $slug)->firstOrFail(); // @phpstan-ignore-line

        return response()->json([
            'success' => true,
            'data' => new EventResource($event),
        ]);
    }
}
