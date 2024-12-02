<?php

namespace App\Http\Controllers;

use App\Models\User;
use Spatie\Permission\Models\Role;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    public function __construct()
    {
        // Only allow admin to access the methods
        // $this->middleware('can:admin');
    }

    // Display the list of users along with their roles
    public function index()
    {
        // Fetch users with their roles using eager loading
        $users = User::with('roles')->get();

        // Fetch all available roles for selection in the form
        $roles = Role::all();

        // Return to Inertia with users and roles
        return inertia('Admin/UserIndex', compact('users', 'roles'));
    }

    // Show the edit form for a specific user
    public function edit(User $user)
    {
        // Fetch all roles to display in the role selection dropdown
        $roles = Role::all();

        // Return to Inertia with the user and roles
        return inertia('Admin/UserEdit', compact('user', 'roles'));
    }

    // Update user profile (name, email, and role)
    public function update(Request $request, User $user)
    {
        // dd($request->all());
        // Validate the user input for name, email, and role
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email,' . $user->id],
            'role' => ['nullable', 'exists:roles,name'], // Validate the role name
        ]);

        // Update the user's profile information (name, email)
        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
        ]);

        // If a role is provided, update the user's role(s)
        if (isset($validated['role'])) {
            // Sync the user with the new role (removes all previous roles)
            $user->syncRoles([$validated['role']]);  // Ensure role assignment is correct
        }

        // Redirect back to the users list with a success message
        return redirect()->route('users.index')->with('success', 'User profile updated successfully.');
    }

    // Assign a role to a user (via the role change dropdown)
    public function assignRole(Request $request, User $user)
    {
        // Validate the role being assigned
        $validated = $request->validate([
            'role' => ['required', 'exists:roles,name'],  // Validate that the role exists
        ]);

        // Sync the user with the new role (removes any other roles)
        $user->syncRoles([$validated['role']]);

        // Return to the previous page with a success message
        return back()->with('success', 'Role assigned successfully.');
    }

    // Delete a user from the system
    public function destroy(User $user)
    {
        // Ensure the user isn't the currently logged-in user (or an admin)
        if ($user->id === auth()->id()) {
            return back()->with('error', 'You cannot delete your own account.');
        }

        // Delete the user
        $user->delete();

        // Redirect back to the users list with a success message
        return redirect()->route('users.index')->with('success', 'User deleted successfully.');
    }
}
