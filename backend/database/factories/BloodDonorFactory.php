<?php

namespace Database\Factories;

use App\Models\BloodDonor;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class BloodDonorFactory extends Factory
{
    protected $model = BloodDonor::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'name' => fake()->name(),
            'phone' => fake()->phoneNumber(),
            'email' => fake()->safeEmail(),
            'blood_group' => fake()->randomElement(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']),
            'district' => fake()->city(),
            'last_donation_date' => fake()->optional()->dateTime(),
            'photo' => null,
            'nid_number' => fake()->optional()->regexify('[A-Z0-9]{10,15}'),
            'is_verified' => fake()->boolean(80),
            'verified_by' => User::factory(),
            'verified_at' => fake()->optional()->dateTime(),
            'show_phone' => fake()->boolean(),
            'show_district' => fake()->boolean(),
            'status' => fake()->randomElement(['active', 'inactive', 'pending']),
        ];
    }

    public function verified(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_verified' => true,
            'status' => 'active',
        ]);
    }

    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_verified' => false,
            'status' => 'active',
        ]);
    }
}
