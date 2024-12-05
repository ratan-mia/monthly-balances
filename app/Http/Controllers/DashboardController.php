<?php

namespace App\Http\Controllers;

use App\Models\Balance;
use App\Models\AccountType;
use App\Models\Bank;
use App\Models\Company;
use App\Models\User;
use App\Models\Loan;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;




class DashboardController extends Controller
{
    public function index()
    {
        // Fetch the data needed for the dashboard charts
        $balances = Balance::selectRaw('MONTH(created_at) as month, SUM(inflows) as total_inflows, SUM(outflows) as total_outflows')
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        // Fetching bank-wise balance data
        $bank_wise_balances = Balance::selectRaw('bank_id, SUM(opening_balance + inflows - outflows) as total_balance')
            ->groupBy('bank_id')
            ->with('bank:id,name') // Assuming you have a 'bank' relationship
            ->get();

        // Prepare data for chart (bank names and total balances)
        $chartData = $bank_wise_balances->map(function ($balance) {
            return [
                'bank_name' => $balance->bank->name, // Assuming 'name' is a field in the Bank model
                'total_balance' => $balance->total_balance,
            ];
        });

        // Fetch balance trend data over time (for example, monthly data)
        $trendData = Balance::selectRaw('DATE_FORMAT(created_at, "%Y-%m") as date, SUM(opening_balance + inflows - outflows) as total_balance')
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        // Prepare data for the chart
        $trendDataForChart = $trendData->map(function ($item) {
            return [
                'date' => $item->date,
                'total_balance' => $item->total_balance,
            ];
        });


        // Fetching data for the Pie chart - Grouped by company
        $company_balances = Balance::select('company_id', DB::raw('SUM(closing_balance) as total_balance'))
            ->groupBy('company_id')
            ->with('company')  // Assuming Balance model has a relation to Company model
            ->get();

        // Format the data for the frontend
        $formattedData = $company_balances->map(function ($balance) {
            return [
                'companyName' => $balance->company->name,  // Assuming Company model has a `name` field
                'balance' => $balance->total_balance,
            ];
        });

        $topPerformingCompanies = Balance::select('company_id', DB::raw('SUM(closing_balance) as total_balance'))
            ->groupBy('company_id')
            ->with('company')  // Assuming Balance model has a relation to Company model
            ->orderByDesc('total_balance')
            ->limit(10)  // Show top 10 performing companies
            ->get();

        $topCompaniesData = $topPerformingCompanies->map(function ($item) {
            return [
                'companyName' => $item->company->name,
                'total_balance' => $item->total_balance,
            ];
        });


        // Assuming Profit Margin is calculated as (Total Inflows - Total Outflows) / Total Inflows * 100
        $profitMarginData = Balance::selectRaw('DATE_FORMAT(created_at, "%Y-%m") as date,
    (SUM(inflows) - SUM(outflows)) / NULLIF(SUM(inflows), 0) * 100 as profit_margin')
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        // Format the data for the frontend
        $formattedProfitData = $profitMarginData->map(function ($item) {
            return [
                'date' => $item->date,
                'profit_margin' => $item->profit_margin,  // Profit margin as percentage
            ];
        });





        $companies = Company::all();
        $users = User::all();
        // $accountTypes = AccountType::all();

        // Get all account types
        $accountTypes = AccountType::all();

        // For each account type, calculate the total number of accounts associated with it
        $accountTypes = $accountTypes->map(function ($accountType) {
            // Count how many balances are associated with this account type
            $accountType->totalAccounts = Balance::where('account_type_id', $accountType->id)->count();
            return $accountType;
        });

        $banks = Bank::all();
        $totalLoanAmount = Loan::sum('occupied_balance');
        // Fetch top-performing company by loan amount
        $topCompany = Loan::select('company_id', DB::raw('SUM(occupied_balance) as total_amount'))
            ->groupBy('company_id')
            ->with('company')
            ->orderByDesc('total_amount')
            ->first();


        // Fetch bank-wise loan allocations
        $bankLoanAllocation = Bank::withCount('loans')->get();
        $latestLoanRequest = Loan::with('company', 'user', 'bank', 'loanType')->latest()->first();



        // Fetch loan performance over time (monthly)
        $loanPerformance = Loan::selectRaw('MONTH(created_at) as month, COUNT(id) as total_loans, SUM(occupied_balance) as total_amount')
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        $totalBalance = Balance::sum(DB::raw('opening_balance + inflows - outflows'));
        $totalAvailableBalance = Loan::sum('available_balance');
        $totalLoanLimit = Loan::sum('limit');
        $totalInflows = Balance::sum('inflows');  // Sum of all inflows
        $totalOutflows = Balance::sum('outflows');  // Sum of all outflows




        // Pass data to Inertia
        return Inertia::render('Dashboard', [
            'balances' => $balances,
            'companies' => $companies,
            'users' => $users,
            'accountTypes' => $accountTypes,
            'banks' => $banks,
            'chartData' => $chartData,
            'trendData' => $trendDataForChart,
            'companyBalances' => $formattedData,
            'topPerformingCompanies' => $topCompaniesData,
            'profitMarginData' => $formattedProfitData,
            'totalLoanAmount' => $totalLoanAmount,
            'topCompany' => $topCompany,
            'bankLoanAllocation' => $bankLoanAllocation,
            'latestLoanRequest' => $latestLoanRequest,
            'loanPerformance' => $loanPerformance,
            'totalBalance' => $totalBalance,
            'totalAvailableBalance' => $totalAvailableBalance,
            'totalLoanLimit' => $totalLoanLimit,
            'totalInflows' => $totalInflows,
            'totalOutflows' => $totalOutflows,
        ]);
    }
}
