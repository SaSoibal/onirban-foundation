<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        // Clear cache
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        $permissions = config('permission.permissions');
        foreach ($permissions as $permission) {
            Permission::create($permission);
        }

        // Create roles
        $superAdmin = Role::create(['name' => 'super_admin', 'guard_name' => 'api']);
        $admin = Role::create(['name' => 'admin', 'guard_name' => 'api']);
        $editor = Role::create(['name' => 'editor', 'guard_name' => 'api']);
        $viewer = Role::create(['name' => 'viewer', 'guard_name' => 'api']);

        // Assign all permissions to super admin
        $superAdmin->syncPermissions(Permission::all());

        // Assign most permissions to admin
        $admin->syncPermissions(Permission::all()->except([
            'create_user', 'edit_user', 'delete_user',
            'create_role', 'edit_role', 'delete_role',
            'delete_setting', 'delete_media',
        ]));

        // Assign content permissions to editor
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

        // Assign read-only permissions to viewer
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
