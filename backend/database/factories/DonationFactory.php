<?php

namespace Database\Factories;

use App\Models\Donation;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class DonationFactory extends Factory
{
    protected $model = Donation::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'donor_name' => fake()->name(),
            'donor_email' => fake()->safeEmail(),
            'donor_phone' => fake()->phoneNumber(),
            'amount' => fake()->randomFloat(2, 100, 10000),
            'currency' => 'BDT',
            'payment_method' => fake()->randomElement(['cash', 'bank_transfer', 'online', 'check']),
            'transaction_id' => fake()->unique()->regexify('[A-Z0-9]{20}'),
            'message' => fake()->optional()->sentence(),
            'status' => fake()->randomElement(['pending', 'completed', 'failed', 'refunded']),
            'donated_at' => fake()->optional()->dateTime(),
        ];
    }

    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'completed',
        ]);
    }
}
