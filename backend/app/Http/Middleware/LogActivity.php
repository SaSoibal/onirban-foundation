<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\ActivityLog;

class LogActivity
{
    protected array $except = [
        'api/auth/me',
        'api/auth/refresh',
    ];

    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        $user = Auth::user();
        if (!$user) {
            return $response;
        }

        $path = $request->path();
        if (str_starts_with($path, 'api/') && !in_array($path, $this->except)) {
            $method = $request->method();
            if (in_array($method, ['POST', 'PUT', 'PATCH', 'DELETE'])) {
                ActivityLog::create([
                    'user_id' => $user->id,
                    'action' => strtolower($method),
                    'subject_type' => $this->guessSubject($path),
                    'subject_id' => $this->guessSubjectId($request),
                    'ip_address' => $request->ip(),
                    'user_agent' => $request->userAgent(),
                    'properties' => [
                        'method' => $method,
                        'url' => $request->fullUrl(),
                        'input' => $this->safeInput($request),
                    ],
                ]);
            }
        }

        return $response;
    }

    private function guessSubject(string $path): string
    {
        $segments = explode('/', $path);
        $segment = end($segments) ?: $path;

        if (is_numeric($segment) && count($segments) >= 2) {
            $segment = $segments[count($segments) - 2];
        }

        $map = [
            'pages' => 'App\\Models\\Page',
            'programs' => 'App\\Models\\Program',
            'gallery' => 'App\\Models\\Gallery',
            'team' => 'App\\Models\\TeamMember',
            'events' => 'App\\Models\\Event',
            'testimonials' => 'App\\Models\\Testimonial',
            'blood-donors' => 'App\\Models\\BloodDonor',
            'blood-requests' => 'App\\Models\\BloodRequest',
            'volunteers' => 'App\\Models\\Volunteer',
            'contact-messages' => 'App\\Models\\ContactMessage',
            'donations' => 'App\\Models\\Donation',
            'settings' => 'App\\Models\\SiteSetting',
            'users' => 'App\\Models\\User',
            'roles' => 'Spatie\\Permission\\Models\\Role',
            'media' => 'App\\Models\\Media',
        ];

        return $map[$segment] ?? 'Unknown';
    }

    private function guessSubjectId(Request $request): ?int
    {
        $id = $request->route('page')?->id
            ?? $request->route('program')?->id
            ?? $request->route('gallery')?->id
            ?? $request->route('team')?->id
            ?? $request->route('event')?->id
            ?? $request->route('testimonial')?->id
            ?? $request->route('donor')?->id
            ?? $request->route('blood_request')?->id
            ?? $request->route('volunteer')?->id
            ?? $request->route('contact_message')?->id
            ?? $request->route('donation')?->id
            ?? $request->route('setting')?->id
            ?? $request->route('user')?->id
            ?? $request->route('role')?->id
            ?? $request->route('media')?->id;

        return $id ? $id->id : null;
    }

    private function safeInput(Request $request): array
    {
        $input = $request->all();
        foreach (['password', 'password_confirmation', 'token'] as $key) {
            if (isset($input[$key])) {
                $input[$key] = '***';
            }
        }
        return $input;
    }
}
