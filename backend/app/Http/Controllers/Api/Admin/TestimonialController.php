<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Admin\StoreTestimonialRequest;
use App\Http\Resources\TestimonialResource;
use App\Models\Testimonial;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    public function index(Request $request)
    {
        $query = Testimonial::query();

        if ($status = $request->query('status')) {
            $query->where('status', $status);
        }

        if ($search = $request->query('search')) {
            $query->where('name', 'like', "%{$search}%")
                ->orWhere('content', 'like', "%{$search}%");
        }

        $testimonials = $query->orderByDesc('created_at')->paginate(15);

        return response()->json([
            'success' => true,
            'data' => TestimonialResource::collection($testimonials),
            'links' => $testimonials->linkPills()->toArray(),
            'meta' => $testimonials->toArray()['meta'] ?? [],
        ]);
    }

    public function store(StoreTestimonialRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = $request->user()->id;

        if ($request->hasFile('photo')) {
            $data['photo'] = $request->file('photo')->store('testimonials', 'public');
        }

        $testimonial = Testimonial::create($data);

        return response()->json([
            'success' => true,
            'data' => new TestimonialResource($testimonial),
        ], 201);
    }

    public function show(Testimonial $testimonial)
    {
        return response()->json([
            'success' => true,
            'data' => new TestimonialResource($testimonial),
        ]);
    }

    public function update(Request $request, Testimonial $testimonial)
    {
        $data = $request->validate([
            'name' => ['nullable', 'string', 'max:255'],
            'designation' => ['nullable', 'string', 'max:255'],
            'content' => ['nullable', 'string', 'min:10'],
            'photo' => ['nullable', 'image', 'max:2048'],
            'rating' => ['nullable', 'integer', 'min:1', 'max:5'],
            'status' => ['nullable', 'in:pending,approved,rejected'],
        ]);

        if ($request->hasFile('photo')) {
            $data['photo'] = $request->file('photo')->store('testimonials', 'public');
        }

        $testimonial->update($data);

        return response()->json([
            'success' => true,
            'data' => new TestimonialResource($testimonial),
        ]);
    }

    public function destroy(Testimonial $testimonial)
    {
        $testimonial->delete();

        return response()->json([
            'success' => true,
            'message' => 'Testimonial deleted',
        ]);
    }

    public function approve(Testimonial $testimonial)
    {
        $testimonial->update(['status' => 'approved']);

        return response()->json([
            'success' => true,
            'data' => new TestimonialResource($testimonial),
        ]);
    }

    public function reject(Testimonial $testimonial)
    {
        $testimonial->update(['status' => 'rejected']);

        return response()->json([
            'success' => true,
            'data' => new TestimonialResource($testimonial),
        ]);
    }
}
