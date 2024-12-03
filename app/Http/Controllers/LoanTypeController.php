<?php

namespace App\Http\Controllers;

use App\Models\LoanType;
use Inertia\Inertia;
use Illuminate\Http\Request;

class LoanTypeController extends Controller
{
    public function index()
    {
        $loanTypes = LoanType::all();
        return Inertia::render('LoanTypes/Index', ['loanTypes' => $loanTypes]);
    }

    public function create()
    {
        return Inertia::render('LoanTypes/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        LoanType::create($request->all());
        return redirect()->route('loan-types.index');
    }

    public function edit(LoanType $loanType)
    {
        return Inertia::render('LoanTypes/Edit', ['loanType' => $loanType]);
    }

    public function update(Request $request, LoanType $loanType)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $loanType->update($request->all());
        return redirect()->route('loan-types.index');
    }

    public function destroy(LoanType $loanType)
    {
        $loanType->delete();
        return redirect()->route('loan-types.index');
    }
}
