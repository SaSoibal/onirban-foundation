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
            'image_url' => 'https://images.unsplash.com/photo-1615461066842-3250230d5e3f?w=1200&h=500&fit=crop',
            'link_url' => '/blood-donors',
            'button_text' => 'Find Donors',
            'sort_order' => 1,
            'is_active' => true,
            'status' => 'active',
        ]);

        Banner::create([
            'title' => 'Request Blood in Emergency',
            'subtitle' => 'Post a blood request and get help from our verified donors near you.',
            'image_url' => 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1200&h=500&fit=crop',
            'link_url' => '/blood-request',
            'button_text' => 'Request Blood',
            'sort_order' => 2,
            'is_active' => true,
            'status' => 'active',
        ]);
    }
}
