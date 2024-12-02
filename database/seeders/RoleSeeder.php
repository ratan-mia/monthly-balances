<?php

namespace Database\Seeders;

use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Seeder;


class RoleSeeder extends Seeder
{
    public function run()
    {
        // Create Roles
        Role::create(['name' => 'admin']);
        Role::create(['name' => 'user']);

        // Create Permissions
        Permission::create(['name' => 'view_dashboard']);
        Permission::create(['name' => 'edit_post']);
        // Add more permissions as needed...
    }
}
