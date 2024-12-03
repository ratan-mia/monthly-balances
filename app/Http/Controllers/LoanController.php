<?php

// app/Http/Controllers/LoanController.php

namespace App\Http\Controllers;

use App\Models\Loan;
use App\Models\LoanType;
use App\Models\Company;
use App\Models\User;
use App\Models\Bank;
use Inertia\Inertia;
use Illuminate\Http\Request;

class LoanController extends Controller
{
    /**
     * Display a listing of the loans.
     */
    public function index()
    {
        // Fetch all loans with the related company, user, and bank data

        $loans = Loan::with(['loanType', 'company', 'user', 'bank'])->get();

        // Return the Inertia response to display the loans list
        return Inertia::render('Loans/Index', [
            'loans' => $loans, // Passing the raw loans data to the view
        ]);
    }

    /**
     * Show the form for creating a new loan.
     */
    public function create()
    {


        $loanTypes = LoanType::all();  // Get all loan types to populate the dropdown

        // Get all companies, users, and banks to populate the form options
        $companies = Company::all();
        $users = User::all();
        $banks = Bank::all();

        // Return the Inertia response to display the loan creation form
        return Inertia::render('Loans/Create', [
            'companies' => $companies,
            'users' => $users,
            'banks' => $banks,
            'loanTypes' => $loanTypes,  // Passing the loan types to the view
        ]);
    }

    /**
     * Store a newly created loan in storage.
     */
    public function store(Request $request)
    {
        // Validate the request data
        $validated = $request->validate([
            'company_id' => 'required|exists:companies,id',
            'user_id' => 'required|exists:users,id',
            'bank_id' => 'required|exists:banks,id',
            'loan_type_id' => 'nullable|exists:loan_types,id',
            'type' => 'required|string|max:255',
            'limit' => 'required|numeric',
            'occupied_balance' => 'required|numeric',
            // 'available_balance' => 'required|numeric',
        ]);

        $available_balance = $validated['limit'] - $validated['occupied_balance'];
        $validated['available_balance'] = $available_balance;

        // Create the loan record
        Loan::create($validated);

        // Redirect back to the loans list with a success message
        return redirect()->route('loans.index')->with('success', 'Loan created successfully.');
    }

    /**
     * Display the specified loan.
     */
    public function show($id)
    {
        // Find the loan by ID and load its related company, user, and bank data
        $loan = Loan::with(['company', 'user', 'bank'])->findOrFail($id);

        // Return the Inertia response to display the loan details
        return Inertia::render('Loans/Show', [
            'loan' => $loan, // Passing the raw loan data to the view
        ]);
    }

    /**
     * Show the form for editing the specified loan.
     */
    public function edit($id)
    {
        // Get the loan by ID
        $loan = Loan::findOrFail($id);


        // Get all companies, users, and banks for form options
        $companies = Company::all();
        $users = User::all();
        $banks = Bank::all();
        $loanTypes = LoanType::all();

        // Return the Inertia response to display the edit form
        return Inertia::render('Loans/Edit', [
            'loan' => $loan, // Passing the raw loan data to the view
            'companies' => $companies,
            'users' => $users,
            'banks' => $banks,
            'loanTypes' => $loanTypes,  // Passing the loan types to the view
        ]);
    }

    /**
     * Update the specified loan in storage.
     */
    public function update(Request $request, $id)
    {
        // Validate the request data
        $validated = $request->validate([
            'company_id' => 'required|exists:companies,id',
            'user_id' => 'required|exists:users,id',
            'bank_id' => 'required|exists:banks,id',
            'type' => 'required|string|max:255',
            'loan_type_id' => 'nullable|exists:loan_types,id',
            'limit' => 'required|numeric',
            'occupied_balance' => 'required|numeric',
            // 'available_balance' => 'required|numeric',
        ]);

        // Find the loan by ID
        $loan = Loan::findOrFail($id);

        $available_balance = $validated['limit'] - $validated['occupied_balance'];
        $validated['available_balance'] = $available_balance;


        // Update the loan record
        $loan->update($validated);

        // Redirect back to the loans list with a success message
        return redirect()->route('loans.index')->with('success', 'Loan updated successfully.');
    }

    /**
     * Remove the specified loan from storage.
     */
    public function destroy($id)
    {
        // Find the loan by ID
        $loan = Loan::findOrFail($id);

        // Delete the loan
        $loan->delete();

        // Redirect back to the loans list with a success message
        return redirect()->route('loans.index')->with('success', 'Loan deleted successfully.');
    }
}
