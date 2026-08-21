<?php

namespace Tests\Feature\Admin;

use App\Models\BloodDonor;
use App\Models\BloodRequest;
use App\Models\ContactMessage;
use App\Models\Donation;
use App\Models\Volunteer;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        Role::create(['name' => 'super_admin', 'guard_name' => 'api']);
        $user = User::factory()->create();
        $user->assignRole('super_admin');
        $this->actingAs($user, 'api');
    }

    public function test_admin_can_view_dashboard_stats()
    {
        BloodDonor::factory()->count(5)->create();
        BloodRequest::factory()->count(3)->create(['status' => 'active']);
        Volunteer::factory()->count(2)->create(['status' => 'pending']);
        ContactMessage::factory()->count(4)->create(['status' => 'new']);
        Donation::factory()->count(2)->create(['status' => 'completed', 'amount' => 1000]);

        $response = $this->getJson('/api/admin/dashboard/stats');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
            ])
            ->assertJsonStructure([
                'success',
                'data' => [
                    'total_donors',
                    'verified_donors',
                    'active_blood_requests',
                    'pending_volunteers',
                    'unread_messages',
                    'total_donations',
                    'recent_activity',
                ],
            ]);
    }

    public function test_dashboard_returns_correct_stats()
    {
        BloodDonor::factory()->count(10)->create();
        BloodRequest::factory()->count(3)->create(['status' => 'active']);

        $response = $this->getJson('/api/admin/dashboard/stats');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'total_donors' => 10,
                    'active_blood_requests' => 3,
                ],
            ]);
    }

    public function test_unauthenticated_user_cannot_access_dashboard()
    {
        $response = $this->getJson('/api/admin/dashboard/stats');

        $response->assertStatus(401);
    }
}
