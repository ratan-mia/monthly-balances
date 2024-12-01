<?php

namespace App\Http\Controllers;

use App\Models\Bank;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BankController extends Controller
{
    public function index()
    {
        $banks = Bank::all();
        return Inertia::render('Banks/Index', ['banks' => $banks]);
    }

    public function create()
    {
        return Inertia::render('Banks/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'branch' => 'nullable|string|max:255',
            'account_number' => 'required|unique:banks|max:255',
            'address' => 'nullable|string|max:255',
            'contact_number' => 'nullable|string|max:15',
        ]);

        Bank::create($request->all());
        return redirect()->route('banks.index')->with('success', 'Bank created successfully!');
    }

    public function edit(Bank $bank)
    {
        return Inertia::render('Banks/Edit', ['bank' => $bank]);
    }

    public function update(Request $request, Bank $bank)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'branch' => 'nullable|string|max:255',
            'account_number' => 'required|unique:banks,account_number,' . $bank->id . '|max:255', // Unique validation excluding current record
            'address' => 'nullable|string|max:255',
            'contact_number' => 'nullable|string|max:15',
        ]);

        $bank->update($request->all());
        return redirect()->route('banks.index')->with('success', 'Bank updated successfully!');
    }

    public function show(Bank $bank)
    {
        return Inertia::render('Banks/Show', [
            'bank' => $bank,
        ]);
    }


    public function destroy(Bank $bank)
    {
        $bank->delete();
        return redirect()->route('banks.index')->with('success', 'Bank deleted successfully!');
    }
}
