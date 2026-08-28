<?php

namespace Database\Seeders;

use App\Models\Banner;
use Illuminate\Database\Seeder;

class BannerSeeder extends Seeder
{
    public function run(): void
    {
        Banner::create([
            'title' => 'Save Lives Through Blood Donation',
            'subtitle' => 'Join Onirban Foundation in our mission to ensure no one dies due to lack of blood.',
            'link_url' => '/blood-donors',
            'button_text' => 'Find Donors',
            'sort_order' => 1,
            'is_active' => true,
            'status' => 'active',
        ]);

        Banner::create([
            'title' => 'Request Blood in Emergency',
            'subtitle' => 'Post a blood request and get help from our verified donors near you.',
            'link_url' => '/blood-request',
            'button_text' => 'Request Blood',
            'sort_order' => 2,
            'is_active' => true,
            'status' => 'active',
        ]);
    }
}
