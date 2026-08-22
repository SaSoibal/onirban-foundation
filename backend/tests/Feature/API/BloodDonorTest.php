<?php

namespace Tests\Feature\API;

use App\Models\BloodDonor;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class BloodDonorTest extends TestCase
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

    public function test_admin_can_list_blood_donors()
    {
        BloodDonor::factory()->count(3)->create();

        $response = $this->getJson('/api/admin/blood-donors');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
            ])
            ->assertJsonStructure([
                'success',
                'data' => [
                    '*' => ['id', 'name', 'phone', 'blood_group', 'district', 'is_verified'],
                ],
                'links',
                'meta',
            ]);
    }

    public function test_admin_can_filter_blood_donors_by_blood_group()
    {
        BloodDonor::factory()->create(['blood_group' => 'O+']);
        BloodDonor::factory()->create(['blood_group' => 'A+']);

        $response = $this->getJson('/api/admin/blood-donors?blood_group=O%2B');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
            ])
            ->assertJsonCount(1, 'data');
    }

    public function test_admin_can_verify_blood_donor()
    {
        $donor = BloodDonor::factory()->create(['is_verified' => false]);

        $response = $this->postJson("/api/admin/blood-donors/{$donor->id}/verify", [
            'is_verified' => true,
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'id' => $donor->id,
                    'is_verified' => true,
                ],
            ]);

        $this->assertDatabaseHas('blood_donors', [
            'id' => $donor->id,
            'is_verified' => true,
        ]);
    }

    public function test_public_can_register_blood_donor()
    {
        $response = $this->postJson('/api/blood-donors/register', [
            'name' => 'John Doe',
            'phone' => '01700000000',
            'email' => 'john@example.com',
            'blood_group' => 'O+',
            'district' => 'Dhaka',
            'last_donation_date' => '2024-01-15',
            'show_phone' => true,
            'show_district' => true,
        ]);

        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
            ])
            ->assertJsonStructure([
                'success',
                'data' => ['id', 'name', 'phone', 'blood_group', 'district'],
            ]);

        $this->assertDatabaseHas('blood_donors', [
            'name' => 'John Doe',
            'blood_group' => 'O+',
            'is_verified' => false,
        ]);
    }

    public function test_public_can_view_verified_blood_donors()
    {
        BloodDonor::factory()->create(['is_verified' => true, 'status' => 'active']);

        $response = $this->getJson('/api/blood-donors');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
            ]);
    }

    public function test_public_cannot_view_unverified_blood_donors()
    {
        BloodDonor::factory()->create(['is_verified' => false, 'status' => 'active']);

        $response = $this->getJson('/api/blood-donors');

        $response->assertStatus(200)
            ->assertJsonCount(0, 'data');
    }
}
