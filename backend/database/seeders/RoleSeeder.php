<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        app(PermissionRegistrar::class)->forgetCachedPermissions();

        Permission::where('guard_name', 'web')->delete();
        Role::where('guard_name', 'web')->delete();

        $permissions = config('permission.permissions');
        foreach ($permissions as $permission) {
            Permission::updateOrCreate(
                ['name' => $permission['name'], 'guard_name' => 'api'],
                ['guard_name' => 'api']
            );
        }

        $superAdmin = Role::updateOrCreate(['name' => 'super_admin', 'guard_name' => 'api'], ['guard_name' => 'api']);
        $admin = Role::updateOrCreate(['name' => 'admin', 'guard_name' => 'api'], ['guard_name' => 'api']);
        $editor = Role::updateOrCreate(['name' => 'editor', 'guard_name' => 'api'], ['guard_name' => 'api']);
        $viewer = Role::updateOrCreate(['name' => 'viewer', 'guard_name' => 'api'], ['guard_name' => 'api']);

        $superAdmin->syncPermissions(Permission::all());

        $admin->syncPermissions(Permission::all()->except([
            'create_user', 'edit_user', 'delete_user',
            'create_role', 'edit_role', 'delete_role',
            'delete_setting', 'delete_media',
        ]));

        $editor->syncPermissions(Permission::whereIn('name', [
            'view_dashboard',
            'view_page', 'create_page', 'edit_page',
            'view_program', 'create_program', 'edit_program',
            'view_gallery_category', 'create_gallery_category', 'edit_gallery_category',
            'view_gallery', 'create_gallery', 'edit_gallery',
            'view_team', 'create_team', 'edit_team',
            'view_event', 'create_event', 'edit_event',
            'view_testimonial', 'create_testimonial', 'edit_testimonial',
            'approve_testimonial', 'reject_testimonial',
            'view_donor', 'create_donor', 'edit_donor', 'verify_donor',
            'view_blood_request', 'edit_blood_request', 'assign_donor',
            'view_volunteer', 'create_volunteer', 'edit_volunteer',
            'view_contact_message', 'edit_contact_message',
            'view_donation',
            'view_media', 'upload_media',
        ])->get());

        $viewer->syncPermissions(Permission::whereIn('name', [
            'view_dashboard',
            'view_page',
            'view_program',
            'view_gallery_category',
            'view_gallery',
            'view_team',
            'view_event',
            'view_testimonial',
            'view_donor',
            'view_blood_request',
            'view_volunteer',
            'view_contact_message',
            'view_donation',
            'view_media',
        ])->get());
    }
}
