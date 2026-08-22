<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Volunteer;
use Illuminate\Database\Eloquent\Factories\Factory;

class VolunteerFactory extends Factory
{
    protected $model = Volunteer::class;

    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->safeEmail(),
            'phone' => fake()->phoneNumber(),
            'address' => fake()->address(),
            'occupation' => fake()->jobTitle(),
            'skills' => fake()->bs(),
            'availability' => fake()->randomElement(['weekdays', 'weekends', 'flexible']),
            'motivation' => fake()->paragraph(),
            'status' => fake()->randomElement(['pending', 'approved', 'rejected', 'inactive']),
            'created_by' => User::factory(),
        ];
    }

    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
        ]);
    }
}
