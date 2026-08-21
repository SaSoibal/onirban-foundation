<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BloodGroupSeeder extends Seeder
{
    public function run(): void
    {
        $groups = [
            ['name' => 'A+', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'A-', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'B+', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'B-', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'AB+', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'AB-', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'O+', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'O-', 'created_at' => now(), 'updated_at' => now()],
        ];

        DB::table('blood_groups')->insert($groups);
    }
}
