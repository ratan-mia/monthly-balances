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
        // Get the logged-in user's ID
        $userId = auth()->id();

        // Retrieve balances for the logged-in user, eager loading relevant fields
        $balances = Balance::with([
            'company:id,name',        // Only get the 'id' and 'name' fields for company
            'bank:id,name',           // Only get the 'id' and 'name' fields for bank
            'user:id,name',           // Only get the 'id' and 'name' fields for user
            'accountType:id,name'     // Only get the 'id' and 'name' fields for accountType
        ])
            ->where('user_id', $userId)
            ->get();

        // Return the Inertia response with only the relevant balance and related model data
        return Inertia::render('Balances/Index', [
            'balances' => $balances,
            'userId' => $userId,
        ]);
    }





    public function show($id)
    {
        $balance = Balance::with(['company', 'bank', 'accountType'])->find($id);

        if (!$balance) {
            return redirect()->route('balances.index')->with('error', 'Balance not found');
        }

        return Inertia::render('Balances/Show', [
            'invoiceData' => $balance
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
        // Dump all incoming request data for debugging
        // dd($request->all());

        // Get the logged-in user
        $userId = Auth::id();

        if (!$userId) {
            return response()->json(['error' => 'User is not authenticated'], 401);
        }

        // Find the company by name (you can also find by ID if needed)
        $company = Company::where('id', $request->company_id)->first();

        if (!$company) {
            return response()->json(['error' => 'Company not found'], 404);
        }

        // Find the bank by its ID
        $bank = Bank::where('id', $request->bank_id)->first();

        if (!$bank) {
            return response()->json(['error' => 'Bank not found'], 404);
        }

        // Find the account type by its name
        $accountType = AccountType::where('id', $request->account_type_id)->first();

        if (!$accountType) {
            return response()->json(['error' => 'Account type not found'], 404);
        }

        // Validate incoming data
        $request->validate([
            'opening_balance' => 'required|numeric', // Required and must be a number
            'company_id' => 'required|exists:companies,id',  // Validate Company exists
            'bank_id' => 'required|exists:banks,id',  // Validate Bank exists
            'account_type_id' => 'required|exists:account_types,id',  // Validate Account type exists
            'account_number' => 'nullable|string|max:50',  // Optional account number with max length
            'user_id' => 'nullable|exists:users,id', // Validate responsible person (optional)
        ]);

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


    public function edit($id)
    {
        // Get the logged-in user
        $userId = Auth::id();

        if (!$userId) {
            return response()->json(['error' => 'User is not authenticated'], 401);
        }

        // Find the company (optional, if needed)
        $company = Company::find(1); // Adjust as needed, e.g., find by user's associated company

        if (!$company) {
            return response()->json(['error' => 'Company not found'], 404);
        }

        // Find the balance by its ID
        $balance = Balance::find($id);

        if (!$balance) {
            return response()->json(['error' => 'Balance not found'], 404);
        }

        // Fetch necessary data for the edit view (banks, account types, etc.)
        $banks = Bank::all();
        $accountTypes = AccountType::all();
        $companies = Company::all(); // Adjust this as needed
        $users = User::all(); // Assuming you might need user data

        // Render the edit page with the balance data
        return Inertia::render(
            'Balances/Edit',
            [
                'balance' => $balance,
                'companies' => $companies,
                'banks' => $banks,
                'accountTypes' => $accountTypes,
                'users' => $users, // Optional, depending on the requirements
            ]
        );
    }



    public function update(Request $request, $id)
    {
        // Get the logged-in user
        $userId = Auth::id();

        if (!$userId) {
            return response()->json(['error' => 'User is not authenticated'], 401);
        }

        // Find the balance by its ID
        $balance = Balance::find($id);

        if (!$balance) {
            return response()->json(['error' => 'Balance not found'], 404);
        }

        // Optionally, you can check if the user is authorized to update this balance.
        // For example, if only certain users can update a balance related to a specific company or bank:
        if ($balance->user_id !== $userId) {
            return response()->json(['error' => 'You are not authorized to update this balance'], 403);
        }

        // Find the company by ID
        $company = Company::where('id', $request->company_id)->first();
        if (!$company) {
            return response()->json(['error' => 'Company not found'], 404);
        }

        // Find the bank by ID
        $bank = Bank::where('id', $request->bank_id)->first();
        if (!$bank) {
            return response()->json(['error' => 'Bank not found'], 404);
        }

        // Find the account type by ID
        $accountType = AccountType::where('id', $request->account_type_id)->first();
        if (!$accountType) {
            return response()->json(['error' => 'Account type not found'], 404);
        }

        // Validate incoming data
        $request->validate([
            'opening_balance' => 'required|numeric',  // Required and must be a number
            'company_id' => 'required|exists:companies,id',  // Validate Company exists
            'bank_id' => 'required|exists:banks,id',  // Validate Bank exists
            'account_type_id' => 'required|exists:account_types,id',  // Validate Account type exists
            'account_number' => 'nullable|string|max:50',  // Optional account number with max length
            'user_id' => 'nullable|exists:users,id',  // Optional, if you want to associate a user with the balance
        ]);

        // Update the balance
        $balance->company_id = $request->company_id;
        $balance->bank_id = $request->bank_id;
        $balance->account_type_id = $request->account_type_id;
        $balance->account_number = $request->account_number ?? $balance->account_number; // Preserve the current account number if not provided
        $balance->opening_balance = $request->opening_balance;

        // Optionally update the user_id if provided
        if ($request->user_id) {
            $balance->user_id = $request->user_id;
        }

        // Save the updated balance
        $balance->save();

        // Return a success response
        return redirect()->route('balances.index')->with('success', 'Balance updated successfully.');
    }



    public function destroy(Balance $balance)
    {
        $this->authorize('delete', $balance);
        $balance->delete();

        return redirect()->route('balances.index')->with('success', 'Balance deleted successfully.');
    }
}
