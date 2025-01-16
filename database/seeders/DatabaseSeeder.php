<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create Roles
        $adminRole = Role::create(['name' => 'admin', 'guard_name' => 'web']);
        $managerRole = Role::create(['name' => 'manager', 'guard_name' => 'web']);
        $userRole = Role::create(['name' => 'user', 'guard_name' => 'web']);

        // Create Permissions
        $permissions = [

            // Dashboard
            'view_dashboard',

            // User Management
            'users.view',
            'users.create',
            'users.edit',
            'users.delete',

            // Company Management
            'companies.view',
            'companies.create',
            'companies.edit',
            'companies.delete',

            // Balance Management
            'balances.view',
            'balances.create',
            'balances.edit',
            'balances.delete',

            // Bank Management
            'banks.view',
            'banks.create',
            'banks.edit',
            'banks.delete',

            // Account Types Management
            'account-types.view',
            'account-types.create',
            'account-types.edit',
            'account-types.delete',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission, 'guard_name' => 'web']);
        }

        // Assign all permissions to admin role
        $adminRole->givePermissionTo(Permission::all());

        // Assign specific permissions to manager role
        $managerRole->givePermissionTo([
            'users.view',
            'view_dashboard',
            'companies.view',
            'companies.edit',
            'balances.view',
            'balances.create',
            'balances.edit',
            'banks.view',
            'account-types.view',
        ]);

        // Assign limited permissions to user role
        $userRole->givePermissionTo([
            'balances.view',
            'companies.view',
            'banks.view',
            'account-types.view',
        ]);

        // Create Super Admin
        $superAdmin = User::create([
            'name' => 'Super Admin',
            'email' => 'superadmin@example.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);
        $superAdmin->assignRole('admin');

        // Create Manager
        $manager = User::create([
            'name' => 'Manager User',
            'email' => 'manager@example.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);
        $manager->assignRole('manager');

        // Create Regular User
        $user = User::create([
            'name' => 'Regular User',
            'email' => 'user@example.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);
        $user->assignRole('user');

        // Create test users in non-production environments
        if (app()->environment('local', 'development')) {
            User::factory(5)->create()->each(function ($user) {
                $user->assignRole('user');
            });
        }
    }
}
