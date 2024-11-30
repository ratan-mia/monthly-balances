<?php

namespace App\Http\Controllers;

use App\Models\Balance;
use App\Models\AccountType;
use App\Models\Bank;
use App\Models\Company;
use App\Models\User;
use Inertia\Inertia;

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



        $companies = Company::all();
        $users = User::all();
        $accountTypes = AccountType::all();
        $banks = Bank::all();

        // Pass data to Inertia
        return Inertia::render('Dashboard', [
            'balances' => $balances,
            'companies' => $companies,
            'users' => $users,
            'accountTypes' => $accountTypes,
            'banks' => $banks,
            'chartData' => $chartData,
            'trendData' => $trendDataForChart,
        ]);
    }
}
