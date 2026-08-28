<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            BloodGroupSeeder::class,
            BannerSeeder::class,
        ]);

        $admin = User::create([
            'name' => 'Super Admin',
            'email' => 'admin@onirban.org',
            'password' => bcrypt('password'),
            'phone' => '01700000000',
            'status' => 'active',
        ]);

        $admin->assignRole('super_admin');
    }
}
