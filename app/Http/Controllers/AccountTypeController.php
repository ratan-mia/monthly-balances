<?php

namespace App\Http\Controllers;

use App\Models\AccountType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AccountTypeController extends Controller
{
    public function index()
    {
        $accountTypes = AccountType::all();
        return Inertia::render('AccountTypes/Index', ['accountTypes' => $accountTypes]);
    }

    public function create()
    {
        return Inertia::render('AccountTypes/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        AccountType::create($request->only(['name', 'description']));

        return redirect()->route('account-types.index')->with('success', 'Account Type created successfully.');
    }

    public function edit($id)
    {
        $accountType = AccountType::findOrFail($id);
        return Inertia::render('AccountTypes/Edit', ['accountType' => $accountType]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $accountType = AccountType::findOrFail($id);
        $accountType->update($request->only(['name', 'description']));

        return redirect()->route('account-types.index')->with('success', 'Account Type updated successfully.');
    }

    public function destroy($id)
    {
        $accountType = AccountType::findOrFail($id);
        $accountType->delete();

        return redirect()->route('account-types.index')->with('success', 'Account Type deleted successfully.');
    }
}
