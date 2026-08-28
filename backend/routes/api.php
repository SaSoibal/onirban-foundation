<?php

use App\Http\Controllers\Api\Admin\ActivityLogController;
use App\Http\Controllers\Api\Admin\BloodDonorController as AdminBloodDonorController;
use App\Http\Controllers\Api\Admin\BloodRequestController as AdminBloodRequestController;
use App\Http\Controllers\Api\Admin\ContactController as AdminContactController;
use App\Http\Controllers\Api\Admin\DashboardController;
use App\Http\Controllers\Api\Admin\DonationController;
use App\Http\Controllers\Api\Admin\EventController as AdminEventController;
use App\Http\Controllers\Api\Admin\GalleryCategoryController;
use App\Http\Controllers\Api\Admin\GalleryController as AdminGalleryController;
use App\Http\Controllers\Api\Admin\MediaController;
use App\Http\Controllers\Api\Admin\PageController as AdminPageController;
use App\Http\Controllers\Api\Admin\PermissionController;
use App\Http\Controllers\Api\Admin\ProgramController as AdminProgramController;
use App\Http\Controllers\Api\Admin\RoleController;
use App\Http\Controllers\Api\Admin\SettingController;
use App\Http\Controllers\Api\Admin\TeamController as AdminTeamController;
use App\Http\Controllers\Api\Admin\TestimonialController as AdminTestimonialController;
use App\Http\Controllers\Api\Admin\UserController;
use App\Http\Controllers\Api\Admin\VolunteerController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\Public\BloodDonorController;
use App\Http\Controllers\Api\Public\BloodRequestController;
use App\Http\Controllers\Api\Public\EventController;
use App\Http\Controllers\Api\Public\GalleryController;
use App\Http\Controllers\Api\Public\PageController;
use App\Http\Controllers\Api\Public\ProgramController;
use App\Http\Controllers\Api\Public\PublicController;
use App\Http\Controllers\Api\Public\SettingsController;
use App\Http\Controllers\Api\Public\TeamController;
use App\Http\Controllers\Api\Public\TestimonialController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public Auth
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/register', [AuthController::class, 'register']);

// Public Content
Route::get('/pages', [PageController::class, 'index']);
Route::get('/pages/{slug}', [PageController::class, 'show']);

Route::get('/programs', [ProgramController::class, 'index']);
Route::get('/programs/{slug}', [ProgramController::class, 'show']);

Route::get('/gallery', [GalleryController::class, 'index']);
Route::get('/gallery/categories', [GalleryController::class, 'categories']);

Route::get('/team', [TeamController::class, 'index']);

Route::get('/events', [EventController::class, 'index']);
Route::get('/events/{slug}', [EventController::class, 'show']);

Route::get('/testimonials', [TestimonialController::class, 'index']);

Route::get('/blood-donors', [BloodDonorController::class, 'index']);
Route::get('/blood-donors/eligible', [BloodDonorController::class, 'eligible']);
Route::get('/blood-donors/{id}', [BloodDonorController::class, 'show']);

Route::get('/blood-requests', [BloodRequestController::class, 'index']);

Route::get('/health', function () {
    return response()->json([
        'success' => true,
        'message' => 'Onirban Foundation API is healthy',
        'timestamp' => now()->toIso8601String(),
    ]);
});

Route::get('/settings', [SettingsController::class, 'index']);
Route::get('/settings/{key}', [SettingsController::class, 'show']);

// Public Submissions
Route::post('/blood-donors/register', [PublicController::class, 'registerDonor']);
Route::post('/blood-requests', [PublicController::class, 'storeBloodRequest']);
Route::post('/contact', [PublicController::class, 'storeContactMessage']);
Route::post('/volunteers/register', [PublicController::class, 'registerVolunteer']);
Route::post('/donations', [PublicController::class, 'storeDonation']);

// Authenticated Routes
Route::middleware('auth:api')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::post('/auth/refresh', [AuthController::class, 'refresh']);
});

// Admin Routes
Route::middleware(['auth:api'])->prefix('admin')->group(function () {
    Route::get('/dashboard/stats', [DashboardController::class, 'stats']);

    // Settings
    Route::get('/settings', [SettingController::class, 'index']);
    Route::get('/settings/{key}', [SettingController::class, 'show']);
    Route::post('/settings', [SettingController::class, 'store']);
    Route::put('/settings/{key}', [SettingController::class, 'update']);
    Route::delete('/settings/{key}', [SettingController::class, 'destroy']);

    // Pages
    Route::get('/pages', [AdminPageController::class, 'index']);
    Route::post('/pages', [AdminPageController::class, 'store']);
    Route::get('/pages/{page}', [AdminPageController::class, 'show']);
    Route::put('/pages/{page}', [AdminPageController::class, 'update']);
    Route::delete('/pages/{page}', [AdminPageController::class, 'destroy']);

    // Programs
    Route::get('/programs', [AdminProgramController::class, 'index']);
    Route::post('/programs', [AdminProgramController::class, 'store']);
    Route::get('/programs/{program}', [AdminProgramController::class, 'show']);
    Route::put('/programs/{program}', [AdminProgramController::class, 'update']);
    Route::delete('/programs/{program}', [AdminProgramController::class, 'destroy']);

    // Gallery
    Route::get('/gallery', [AdminGalleryController::class, 'index']);
    Route::post('/gallery', [AdminGalleryController::class, 'store']);
    Route::get('/gallery/{gallery}', [AdminGalleryController::class, 'show']);
    Route::put('/gallery/{gallery}', [AdminGalleryController::class, 'update']);
    Route::delete('/gallery/{gallery}', [AdminGalleryController::class, 'destroy']);

    // Team
    Route::get('/team', [AdminTeamController::class, 'index']);
    Route::post('/team', [AdminTeamController::class, 'store']);
    Route::get('/team/{team}', [AdminTeamController::class, 'show']);
    Route::put('/team/{team}', [AdminTeamController::class, 'update']);
    Route::delete('/team/{team}', [AdminTeamController::class, 'destroy']);

    // Events
    Route::get('/events', [AdminEventController::class, 'index']);
    Route::post('/events', [AdminEventController::class, 'store']);
    Route::get('/events/{event}', [AdminEventController::class, 'show']);
    Route::put('/events/{event}', [AdminEventController::class, 'update']);
    Route::delete('/events/{event}', [AdminEventController::class, 'destroy']);

    // Testimonials
    Route::get('/testimonials', [AdminTestimonialController::class, 'index']);
    Route::post('/testimonials', [AdminTestimonialController::class, 'store']);
    Route::get('/testimonials/{testimonial}', [AdminTestimonialController::class, 'show']);
    Route::put('/testimonials/{testimonial}', [AdminTestimonialController::class, 'update']);
    Route::delete('/testimonials/{testimonial}', [AdminTestimonialController::class, 'destroy']);
    Route::post('/testimonials/{testimonial}/approve', [AdminTestimonialController::class, 'approve']);
    Route::post('/testimonials/{testimonial}/reject', [AdminTestimonialController::class, 'reject']);

    // Blood Donors
    Route::get('/blood-donors', [AdminBloodDonorController::class, 'index']);
    Route::get('/blood-donors/{donor}', [AdminBloodDonorController::class, 'show']);
    Route::put('/blood-donors/{donor}', [AdminBloodDonorController::class, 'update']);
    Route::delete('/blood-donors/{donor}', [AdminBloodDonorController::class, 'destroy']);
    Route::post('/blood-donors/{donor}/verify', [AdminBloodDonorController::class, 'verify']);
    Route::get('/blood-donors/stats', [AdminBloodDonorController::class, 'stats']);

    // Blood Requests
    Route::get('/blood-requests', [AdminBloodRequestController::class, 'index']);
    Route::get('/blood-requests/{bloodRequest}', [AdminBloodRequestController::class, 'show']);
    Route::put('/blood-requests/{bloodRequest}', [AdminBloodRequestController::class, 'update']);
    Route::delete('/blood-requests/{bloodRequest}', [AdminBloodRequestController::class, 'destroy']);
    Route::post('/blood-requests/{bloodRequest}/assign', [AdminBloodRequestController::class, 'assign']);

    // Volunteers
    Route::get('/volunteers', [VolunteerController::class, 'index']);
    Route::get('/volunteers/{volunteer}', [VolunteerController::class, 'show']);
    Route::put('/volunteers/{volunteer}', [VolunteerController::class, 'update']);
    Route::delete('/volunteers/{volunteer}', [VolunteerController::class, 'destroy']);

    // Contact Messages
    Route::get('/contact-messages', [AdminContactController::class, 'index']);
    Route::get('/contact-messages/{contactMessage}', [AdminContactController::class, 'show']);
    Route::put('/contact-messages/{contactMessage}', [AdminContactController::class, 'update']);
    Route::delete('/contact-messages/{contactMessage}', [AdminContactController::class, 'destroy']);

    // Users
    Route::get('/users', [UserController::class, 'index']);
    Route::post('/users', [UserController::class, 'store']);
    Route::get('/users/{user}', [UserController::class, 'show']);
    Route::put('/users/{user}', [UserController::class, 'update']);
    Route::delete('/users/{user}', [UserController::class, 'destroy']);

    // Roles
    Route::get('/roles', [RoleController::class, 'index']);
    Route::post('/roles', [RoleController::class, 'store']);
    Route::get('/roles/{role}', [RoleController::class, 'show']);
    Route::put('/roles/{role}', [RoleController::class, 'update']);
    Route::delete('/roles/{role}', [RoleController::class, 'destroy']);

    // Activity Logs
    Route::get('/activity-logs', [ActivityLogController::class, 'index']);
    Route::get('/activity-logs/{activityLog}', [ActivityLogController::class, 'show']);

    // Media
    Route::get('/media', [MediaController::class, 'index']);
    Route::post('/media/upload', [MediaController::class, 'store']);
    Route::delete('/media/{media}', [MediaController::class, 'destroy']);

    // Permissions
    Route::get('/permissions', [PermissionController::class, 'index']);

    // Donations
    Route::get('/donations', [DonationController::class, 'index']);
    Route::post('/donations', [DonationController::class, 'store']);
    Route::get('/donations/{donation}', [DonationController::class, 'show']);
    Route::put('/donations/{donation}', [DonationController::class, 'update']);
    Route::delete('/donations/{donation}', [DonationController::class, 'destroy']);

    // Gallery Categories
    Route::get('/gallery-categories', [GalleryCategoryController::class, 'index']);
    Route::post('/gallery-categories', [GalleryCategoryController::class, 'store']);
    Route::get('/gallery-categories/{galleryCategory}', [GalleryCategoryController::class, 'show']);
    Route::put('/gallery-categories/{galleryCategory}', [GalleryCategoryController::class, 'update']);
    Route::delete('/gallery-categories/{galleryCategory}', [GalleryCategoryController::class, 'destroy']);
});
