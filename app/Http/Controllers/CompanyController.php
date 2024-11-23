<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CompanyController extends Controller
{
    public function index()
    {
        // Display all companies
        $companies = Company::all();
        return Inertia::render('Companies/Index', [
            'companies' => $companies
        ]);
    }

    public function create()
    {
        // Show the form to create a new company
        return Inertia::render('Companies/Create');
    }

    public function store(Request $request)
    {
        // Validate and store the new company
        $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'nullable|string|max:255',
            'email' => 'required|email|unique:companies',
            'phone' => 'nullable|string|max:15',
        ]);

        Company::create($request->all());

        return redirect()->route('companies.index')->with('success', 'Company created successfully.');
    }

    public function show(Company $company)
    {
        // Display a single company's details
        return Inertia::render('Companies/Show', [
            'company' => $company
        ]);
    }

    public function edit(Company $company)
    {
        // Show the form to edit a company
        return Inertia::render('Companies/Edit', [
            'company' => $company
        ]);
    }

    public function update(Request $request, Company $company)
    {
        // Validate and update the company
        $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'nullable|string|max:255',
            'email' => 'required|email|unique:companies,email,' . $company->id,
            'phone' => 'nullable|string|max:15',
        ]);

        $company->update($request->all());

        return redirect()->route('companies.index')->with('success', 'Company updated successfully.');
    }

    public function destroy(Company $company)
    {
        // Delete the company
        $company->delete();

        return redirect()->route('companies.index')->with('success', 'Company deleted successfully.');
    }
}
