<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Admin\UpdateSettingRequest;
use App\Http\Resources\SettingResource;
use App\Models\SiteSetting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function index(Request $request)
    {
        $query = SiteSetting::query();

        if ($group = $request->query('group')) {
            $query->where('group', $group);
        }

        $settings = $query->get()->keyBy('key');

        return response()->json([
            'success' => true,
            'data' => SettingResource::collection($settings),
        ]);
    }

    public function show(string $key)
    {
        $setting = SiteSetting::where('key', $key)->firstOrFail();

        return response()->json([
            'success' => true,
            'data' => new SettingResource($setting),
        ]);
    }

    public function update(string $key, UpdateSettingRequest $request)
    {
        $setting = SiteSetting::where('key', $key)->firstOrFail();
        $setting->update($request->validated());

        return response()->json([
            'success' => true,
            'data' => new SettingResource($setting),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'key' => ['required', 'string', 'max:255', 'unique:site_settings,key'],
            'value' => ['nullable', 'string'],
            'type' => ['required', 'in:text,textarea,image,color,url,number,json'],
            'group' => ['required', 'in:general,seo,social,contact,donation,header,footer'],
            'label' => ['nullable', 'string', 'max:255'],
        ]);

        $setting = SiteSetting::create($validated);

        return response()->json([
            'success' => true,
            'data' => new SettingResource($setting),
        ], 201);
    }

    public function destroy(string $key)
    {
        $setting = SiteSetting::where('key', $key)->firstOrFail();
        $setting->delete();

        return response()->json([
            'success' => true,
            'message' => 'Setting deleted',
        ]);
    }
}
