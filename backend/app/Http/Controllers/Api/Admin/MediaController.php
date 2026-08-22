<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Admin\StoreMediaRequest;
use App\Http\Resources\MediaResource;
use App\Models\Media;
use Illuminate\Http\Request;

class MediaController extends Controller
{
    public function index(Request $request)
    {
        $query = Media::query();

        if ($collection = $request->query('collection')) {
            $query->where('collection', $collection);
        }

        if ($fileType = $request->query('file_type')) {
            $query->where('file_type', $fileType);
        }

        $media = $query->orderByDesc('created_at')->paginate(20);

        return response()->json([
            'success' => true,
            'data' => MediaResource::collection($media),
            'links' => $media->linkPills()->toArray(), // @phpstan-ignore-line
            'meta' => $media->toArray()['meta'] ?? [],
        ]);
    }

    public function store(StoreMediaRequest $request)
    {
        $file = $request->file('file');
        $path = $file->store('media', 'public');

        $media = Media::create([
            'file_name' => $file->getClientOriginalName(),
            'file_path' => $path,
            'file_type' => $this->guessFileType($file->getMimeType()),
            'file_size' => $file->getSize(),
            'mime_type' => $file->getMimeType(),
            'collection' => $request->input('collection', 'general'),
            'sort_order' => $request->input('sort_order', 0),
            'created_by' => $request->user()->id,
        ]);

        return response()->json([
            'success' => true,
            'data' => new MediaResource($media),
        ], 201);
    }

    public function destroy(Media $media)
    {
        $media->delete();

        return response()->json([
            'success' => true,
            'message' => 'Media deleted',
        ]);
    }

    private function guessFileType(string $mimeType): string
    {
        if (str_starts_with($mimeType, 'image/')) {
            return 'image';
        }
        if (str_starts_with($mimeType, 'video/')) {
            return 'video';
        }
        if (str_starts_with($mimeType, 'audio/')) {
            return 'audio';
        }

        return 'document';
    }
}
