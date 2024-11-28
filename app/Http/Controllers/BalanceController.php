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

        // Get the logged-in user
        $userId = Auth::id();

        if (!$userId) {
            return response()->json(['error' => 'User is not authenticated'], 401);
        }

        // Find the company by name
        $company = Company::where('name', 'Asian Imports Limited')->first();

        if (!$company) {
            return response()->json(['error' => 'Company not found'], 404);
        }

        // Find the bank by its ID
        $bank = Bank::find($request->bank_id);

        if (!$bank) {
            return response()->json(['error' => 'Bank not found'], 404);
        }

        // Find the account type by its name
        $accountType = AccountType::where('name', $request->account_type)->first();

        if (!$accountType) {
            return response()->json(['error' => 'Account type not found'], 404);
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
            // 'account_type' => 'nullable|string|max:50',
            'account_type' => 'required|exists:account_types,id',  // Validate bank exists
            'account_number' => 'nullable|string|max:50',
            'inflows' => 'nullable|numeric',
            'outflows' => 'nullable|numeric',
        ]);

        // $closingBalance = $request->opening_balance + $request->inflows - $request->outflows;

        // Balance::create([
        //     // 'company_id' => auth()->user()->company_id,
        //     // 'fund_name' => $request->fund_name,
        //     // 'current_balance' => $request->current_balance,
        //     // 'fund_utilized' => $request->fund_utilized,
        //     // 'remaining_balance' => $request->remaining_balance,
        //     // 'user_id' => $userId, // Use the user_id from the logged-in user
        //     // 'company_id' => $request->company,
        //     // 'bank_name' => $request->bank_name,
        //     'user_id' => $userId,
        //     'company_id' => $company->id,
        //     'bank_id' => $bank->id,
        //     'account_type_id' => $accountType->id,  // Use account_type_id here
        //     // 'responsible_person' => $request->responsible_person,
        //     // 'responsible_person' => auth()->user()->name,
        //     // 'account_type' => $request->account_type,
        //     'account_number' => $request->account_number,
        //     'opening_balance' => $request->opening_balance,
        //     'inflows' => $request->inflows,
        //     'outflows' => $request->outflows,
        //     'closing_balance' => $closingBalance,
        // ]);


        // Step 1: Get the latest balance entry for the user (assuming you have a 'date' field or something to identify days)
        $lastBalance = Balance::where('user_id', $userId)
            ->where('company_id', $company->id)
            ->where('bank_id', $bank->id)
            ->orderBy('created_at', 'desc')
            ->first();

        // Step 2: Calculate the opening balance for the next day (it will be the closing balance of the last entry)
        $openingBalanceForNextDay = $lastBalance ? $lastBalance->closing_balance : $request->opening_balance; // If no previous balance, use the provided opening_balance

        // Step 3: Insert the new balance for the next day
        $closingBalance = $openingBalanceForNextDay + $request->inflows - $request->outflows; // Closing balance logic

        Balance::create([
            'user_id' => $userId,
            'company_id' => $company->id,
            'bank_id' => $bank->id,
            'account_type_id' => $accountType->id,
            'account_number' => $request->account_number,
            'opening_balance' => $openingBalanceForNextDay, // Set opening balance for the next day
            'inflows' => $request->inflows,
            'outflows' => $request->outflows,
            'closing_balance' => $closingBalance, // Calculate closing balance
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
