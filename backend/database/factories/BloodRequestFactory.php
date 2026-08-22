<?php

namespace Database\Factories;

use App\Models\BloodDonor;
use App\Models\BloodRequest;
use Illuminate\Database\Eloquent\Factories\Factory;

class BloodRequestFactory extends Factory
{
    protected $model = BloodRequest::class;

    public function definition(): array
    {
        return [
            'requester_name' => fake()->name(),
            'requester_phone' => fake()->phoneNumber(),
            'blood_group' => fake()->randomElement(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']),
            'units_needed' => fake()->numberBetween(1, 5),
            'hospital_name' => fake()->company(),
            'hospital_address' => fake()->address(),
            'deadline' => fake()->dateTimeBetween('+1 day', '+7 days'),
            'reason' => fake()->sentence(),
            'status' => fake()->randomElement(['pending', 'active', 'fulfilled', 'cancelled']),
            'assigned_donor_id' => BloodDonor::factory(),
            'notes' => fake()->optional()->paragraph(),
        ];
    }

    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'active',
        ]);
    }
}
