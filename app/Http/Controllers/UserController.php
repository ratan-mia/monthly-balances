<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Company;
use Spatie\Permission\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    public function __construct()
    {
        // $this->middleware('can:admin');
    }

    public function index()
    {
        // Fetch users with their roles and companies using eager loading
        $users = User::with(['roles', 'companies'])->get();
        $roles = Role::all();
        $companies = Company::all();

        return inertia('Admin/UserIndex', [
            'users' => $users,
            'roles' => $roles,
            'companies' => $companies
        ]);
    }



    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'roles' => 'required|array',
            'roles.*' => 'exists:roles,id',
            'companies' => 'required|array',
            'companies.*' => 'exists:companies,id',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        $user->roles()->sync($validated['roles']);
        $user->companies()->sync($validated['companies']);

        return redirect()->back()->with('success', 'User created successfully.');
    }

    public function edit(User $user)
    {
        $roles = Role::all();
        $companies = Company::all();
        $user->load(['roles', 'companies']); // Eager load relationships

        return inertia('Admin/UserEdit', [
            'user' => $user,
            'roles' => $roles,
            'companies' => $companies
        ]);
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users')->ignore($user->id)
            ],
            'role' => ['required', 'string', 'exists:roles,name'],
            'company_ids' => ['required', 'array'],
            'company_ids.*' => ['exists:companies,id']
        ]);

        DB::beginTransaction();

        try {
            // Update user details
            $user->update([
                'name' => $validated['name'],
                'email' => $validated['email'],
            ]);

            // Update role using Spatie
            $user->syncRoles([$validated['role']]);

            // Sync companies
            $user->companies()->sync($validated['company_ids']);

            DB::commit();

            return redirect()
                ->route('users.index')
                ->with('success', 'User profile updated successfully.');
        } catch (\Exception $e) {
            DB::rollBack();

            return redirect()
                ->back()
                ->with('error', 'Error updating user: ' . $e->getMessage());
        }
    }

    public function assignRole(Request $request, User $user)
    {
        $validated = $request->validate([
            'role' => ['required', 'exists:roles,name'],
        ]);

        try {
            $user->syncRoles([$validated['role']]);

            return back()->with('success', 'Role assigned successfully.');
        } catch (\Exception $e) {
            return back()->with('error', 'Error assigning role: ' . $e->getMessage());
        }
    }

    public function destroy(User $user)
    {
        if ($user->id === auth()->id()) {
            return back()->with('error', 'You cannot delete your own account.');
        }

        DB::beginTransaction();

        try {
            // Remove role associations (handled by Spatie)
            $user->roles()->detach();

            // Remove company associations
            $user->companies()->detach();

            // Delete user
            $user->delete();

            DB::commit();

            return redirect()
                ->route('users.index')
                ->with('success', 'User deleted successfully.');
        } catch (\Exception $e) {
            DB::rollBack();

            return redirect()
                ->back()
                ->with('error', 'Error deleting user: ' . $e->getMessage());
        }
    }

    // Helper method to manage company assignments
    private function syncUserCompanies($user, $companyIds)
    {
        return $user->companies()->sync($companyIds);
    }
}
