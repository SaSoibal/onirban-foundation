<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\TestimonialResource;
use App\Models\Testimonial;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    public function index(Request $request)
    {
        $testimonials = Testimonial::where('status', 'approved')
            ->orderByDesc('rating')
            ->orderByDesc('created_at')
            ->paginate(12);

        return response()->json([
            'success' => true,
            'data' => TestimonialResource::collection($testimonials),
            'links' => $testimonials->linkPills()->toArray(),
            'meta' => $testimonials->toArray()['meta'] ?? [],
        ]);
    }
}
