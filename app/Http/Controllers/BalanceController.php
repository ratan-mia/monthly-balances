<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

use App\Models\AccountType;
use App\Models\Balance;
use App\Models\Company;
use App\Models\Bank;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BalanceController extends Controller
{
    public function index()
    {
        $companyId = auth()->user()->company_id; // Restrict to the logged-in user's company
        $balances = Balance::where('company_id', $companyId)->get();

        // Return an Inertia response with balances data
        return Inertia::render('Balances/Index', [
            'balances' => $balances
        ]);
    }

    public function create()
    {

        $companies = Company::all(); // Fetch all companies
        $banks = Bank::all(); // Fetch all banks
        $users = User::all(); // Fetch all users
        $accountTypes = AccountType::all(); // Fetch all account types
        // Render the create page
        return Inertia::render(
            'Balances/Create',
            [
                'companies' => $companies,
                'banks' => $banks,
                'users' => $users,
                'accountTypes' => $accountTypes,
            ]
        );
    }

    public function store(Request $request)
    {

        // Step 1: Get the logged-in user (user_id)
        $userId = Auth::id(); // This will give you the authenticated user's ID

        if (!$userId) {
            // Handle case when the user is not authenticated
            return response()->json(['error' => 'User is not authenticated'], 401);
        }


        $request->validate([
            // 'fund_name' => 'required|string|max:255',
            'opening_balance' => 'required|numeric',
            // 'current_balance' => 'required|numeric',
            // 'fund_utilized' => 'nullable|numeric',
            // 'remaining_balance' => 'nullable|numeric',
            // 'company_id' => 'nullable|max:255',
            'company_id' => 'required|exists:companies,id',  // Validate Companies exists
            // 'bank_name' => 'nullable|max:255',
            'bank_id' => 'required|exists:banks,id',  // Validate bank exists
            // 'responsible_person' => 'nullable|string|max:255',
            'account_type' => 'nullable|string|max:50',
            'account_number' => 'nullable|string|max:50',
            'inflows' => 'nullable|numeric',
            'outflows' => 'nullable|numeric',
        ]);

        $closingBalance = $request->opening_balance + $request->inflows - $request->outflows;
        Balance::create([
            // 'company_id' => auth()->user()->company_id,
            // 'fund_name' => $request->fund_name,
            // 'current_balance' => $request->current_balance,
            // 'fund_utilized' => $request->fund_utilized,
            // 'remaining_balance' => $request->remaining_balance,
            'user_id' => $userId, // Use the user_id from the logged-in user
            'company_id' => $request->company,
            'bank_name' => $request->bank_name,
            'responsible_person' => $request->responsible_person,
            // 'responsible_person' => auth()->user()->name,
            'account_type' => $request->account_type,
            'account_number' => $request->account_number,
            'opening_balance' => $request->opening_balance,
            'inflows' => $request->inflows,
            'outflows' => $request->outflows,
            'closing_balance' => $closingBalance,
        ]);

        return redirect()->route('balances.index')->with('success', 'Balance added successfully.');
    }

    public function edit(Balance $balance)
    {
        $this->authorize('view', $balance); // Ensure data belongs to the user

        // Render the edit page with balance data
        return Inertia::render('Balances/Edit', [
            'balance' => $balance
        ]);
    }

    public function update(Request $request, Balance $balance)
    {
        $this->authorize('update', $balance);

        $request->validate([
            'fund_name' => 'required|string|max:255',
            'opening_balance' => 'required|numeric',
            'current_balance' => 'required|numeric',
            'fund_utilized' => 'nullable|numeric',
            'remaining_balance' => 'nullable|numeric',
        ]);

        $balance->update($request->only([
            'fund_name',
            'opening_balance',
            'current_balance',
            'fund_utilized',
            'remaining_balance',
        ]));

        return redirect()->route('balances.index')->with('success', 'Balance updated successfully.');
    }

    public function destroy(Balance $balance)
    {
        $this->authorize('delete', $balance);
        $balance->delete();

        return redirect()->route('balances.index')->with('success', 'Balance deleted successfully.');
    }
}
