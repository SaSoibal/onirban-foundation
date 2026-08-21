<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\SettingResource;
use App\Models\SiteSetting;
use Illuminate\Http\Request;

class SettingsController extends Controller
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
}
