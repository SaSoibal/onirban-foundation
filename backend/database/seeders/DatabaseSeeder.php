<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Seed roles and permissions
        $this->call([
            RoleSeeder::class,
            BloodGroupSeeder::class,
        ]);

        // Create Super Admin
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
