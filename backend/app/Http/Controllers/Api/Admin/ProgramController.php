<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Admin\StoreProgramRequest;
use App\Http\Requests\Api\Admin\UpdateProgramRequest;
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

        if ($search = $request->query('search')) {
            $query->where('title', 'like', "%{$search}%");
        }

        $programs = $query->orderByDesc('created_at')->paginate(15);

        return response()->json([
            'success' => true,
            'data' => ProgramResource::collection($programs),
            'links' => $programs->linkPills()->toArray(), // @phpstan-ignore-line
            'meta' => $programs->toArray()['meta'] ?? [],
        ]);
    }

    public function store(StoreProgramRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = $request->user()->id;
        $data['updated_by'] = $request->user()->id;

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('programs', 'public');
        }

        $program = Program::create($data);

        return response()->json([
            'success' => true,
            'data' => new ProgramResource($program),
        ], 201);
    }

    public function show(Program $program)
    {
        return response()->json([
            'success' => true,
            'data' => new ProgramResource($program),
        ]);
    }

    public function update(UpdateProgramRequest $request, Program $program)
    {
        $data = $request->validated();
        $data['updated_by'] = $request->user()->id;

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('programs', 'public');
        }

        $program->update($data);

        return response()->json([
            'success' => true,
            'data' => new ProgramResource($program),
        ]);
    }

    public function destroy(Program $program)
    {
        $program->delete();

        return response()->json([
            'success' => true,
            'message' => 'Program deleted',
        ]);
    }
}
