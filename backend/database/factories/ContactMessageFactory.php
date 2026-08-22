<?php

namespace Database\Factories;

use App\Models\ContactMessage;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ContactMessageFactory extends Factory
{
    protected $model = ContactMessage::class;

    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->safeEmail(),
            'phone' => fake()->phoneNumber(),
            'subject' => fake()->sentence(3),
            'message' => fake()->paragraph(),
            'status' => fake()->randomElement(['new', 'read', 'replied', 'closed']),
            'replied_at' => fake()->optional()->dateTime(),
            'replied_by' => User::factory(),
        ];
    }

    public function unread(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'new',
        ]);
    }
}
