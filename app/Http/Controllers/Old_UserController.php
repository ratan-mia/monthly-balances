<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        // Get all users with their roles
        $users = User::with('roles')->get();
        $roles = Role::all(); // Get all roles

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'roles' => $roles,
        ]);
    }

    public function assignRole(Request $request, User $user)
    {
        $request->validate([
            'role' => 'required|exists:roles,name',
        ]);

        // Assign the new role to the user
        $user->syncRoles($request->role); // You can also use $user->assignRole($request->role) if not using syncRoles

        return redirect()->route('admin.users.index')->with('success', 'Role assigned successfully!');
    }
}
