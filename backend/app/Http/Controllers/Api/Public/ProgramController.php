<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProgramResource;
use App\Models\Program;
use Illuminate\Http\Request;

class ProgramController extends Controller
{
    public function index(Request $request)
    {
        $query = Program::query();

        if ($status = $request->query('status')) {
            $query->where('status', $status);
        }

        $programs = $query->orderByDesc('created_at')->paginate(12);

        return response()->json([
            'success' => true,
            'data' => ProgramResource::collection($programs),
            'links' => $programs->linkPills()->toArray(),
            'meta' => $programs->toArray()['meta'] ?? [],
        ]);
    }

    public function show(string $slug)
    {
        $program = Program::where('slug', $slug)->firstOrFail();

        return response()->json([
            'success' => true,
            'data' => new ProgramResource($program),
        ]);
    }
}
