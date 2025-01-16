import { Head } from "@inertiajs/react";
import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import React, { Suspense, useMemo } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';

// Lazy-loaded components
const LoanAllocationTable = React.lazy(() => import('@/Components/LoanAllocationTable'));
const BankWiseBalanceChart = React.lazy(() => import('@/Components/BankWiseBalanceChart'));
const TopPerformingCompanies = React.lazy(() => import('@/Components/TopPerformingCompanies'));
const LoanPerformanceChart = React.lazy(() => import('@/Components/LoanPerformanceChart'));
const StatBox = React.lazy(() => import('@/Components/StatBox'));
const AuthenticatedLayout = React.lazy(() => import('@/Layouts/AuthenticatedLayout'));

// Chart configuration
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

// Chart color constants
const CHART_COLORS = {
    inflows: 'rgb(75, 192, 192)',
    outflows: 'rgb(255, 99, 132)',
    accountTypes: ['#FF6384', '#36A2EB', '#FFCE56'],
};

export default function Dashboard({
    balances,
    accountTypes,
    totalInflows,
    totalOutflows,
    totalBalance,
    topCompany,
    bankLoanAllocation,
    totalAvailableBalance,
    totalLoanLimit,
    totalLoanAmount,
    latestLoanRequest,
    loanPerformance,
    chartData,
    topPerformingCompanies,
    loanAllocations,
}) {
    // Memoized chart data to prevent unnecessary re-renders
    const lineChartData = useMemo(() => ({
        labels: balances.map((balance) => `Month ${balance.month}`),
        datasets: [
            {
                label: "Inflows",
                data: balances.map((balance) => balance.total_inflows),
                fill: false,
                borderColor: CHART_COLORS.inflows,
                tension: 0.1,
            },
            {
                label: "Outflows",
                data: balances.map((balance) => balance.total_outflows),
                fill: false,
                borderColor: CHART_COLORS.outflows,
                tension: 0.1,
            },
        ],
    }), [balances]);

    const pieChartData = useMemo(() => ({
        labels: accountTypes.map((accountType) => accountType.name),
        datasets: [
            {
                data: accountTypes.map((accountType) => accountType.totalAccounts || 25),
                backgroundColor: CHART_COLORS.accountTypes,
                hoverOffset: 4,
            },
        ],
    }), [accountTypes]);

    const barChartData = useMemo(() => ({
        labels: balances.map((balance) => `Month ${balance.month}`),
        datasets: [
            {
                label: "Inflows",
                data: balances.map((balance) => balance.total_inflows),
                backgroundColor: CHART_COLORS.inflows,
            },
            {
                label: "Outflows",
                data: balances.map((balance) => balance.total_outflows),
                backgroundColor: CHART_COLORS.outflows,
            },
        ],
    }), [balances]);

    // Derived values with fallback
    const topCompanyName = topCompany?.company?.name || "No Company Data";
    const latestLoanRequestInfo = latestLoanRequest
        ? `${latestLoanRequest.bank.name} - ${latestLoanRequest.loan_type.name} - ৳${latestLoanRequest.occupied_balance.toLocaleString()}`
        : "No recent loan requests";

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-100">
                        Dashboard
                    </h2>
                }
            >
                <Head title="Dashboard" />

                <div className="py-6">
                    <div className="w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                            <div className="p-6 text-gray-900 dark:text-gray-100">
                                <h3 className="text-2xl font-semibold mb-6">
                                    Welcome to the Dashboard!
                                </h3>

                                {/* Financial Overview Grid */}
                                <div
                                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                                    aria-label="Financial Overview Statistics"
                                >
                                    <Suspense fallback={<div>Loading stat...</div>}>
                                        <StatBox
                                            title="Total Inflows"
                                            value={`৳${totalInflows.toLocaleString()}`}
                                            icon="💰"
                                            bgColor="bg-emerald-500"
                                        />
                                        <StatBox
                                            title="Total Outflows"
                                            value={`৳${totalOutflows.toLocaleString()}`}
                                            icon="💰"
                                            bgColor="bg-blue-500"
                                        />
                                        <StatBox
                                            title="Total Closing Balance"
                                            value={`৳${totalBalance.toLocaleString()}`}
                                            icon="💰"
                                            bgColor="bg-emerald-500"
                                        />
                                        <StatBox
                                            title="Top Company by Loan Utilization"
                                            value={topCompanyName}
                                            icon="🏢"
                                            bgColor="bg-indigo-500"
                                        />
                                        <StatBox
                                            title="Loans by Bank"
                                            value={`${bankLoanAllocation.length} Banks`}
                                            icon="🏦"
                                            bgColor="bg-green-500"
                                        />
                                        <StatBox
                                            title="Available Balance (Loanable)"
                                            value={`৳${totalAvailableBalance.toLocaleString()}`}
                                            icon="💰"
                                            bgColor="bg-blue-500"
                                        />
                                        <StatBox
                                            title="Total Loan Limit"
                                            value={`৳${totalLoanLimit.toLocaleString()}`}
                                            icon="💰"
                                            bgColor="bg-blue-500"
                                        />
                                        <StatBox
                                            title="Total Loan Amount"
                                            value={`৳${totalLoanAmount.toLocaleString()}`}
                                            icon="💰"
                                            bgColor="bg-blue-600"
                                        />
                                        <StatBox
                                            title="Latest Loan Request"
                                            value={latestLoanRequestInfo}
                                            icon="🆕"
                                            bgColor="bg-indigo-500"
                                        />
                                    </Suspense>
                                </div>

                                {/* Loan Allocations */}
                                {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                                    <Suspense fallback={<div>Loading loan allocations...</div>}>
                                        <div className="bg-white shadow p-4 rounded-lg">
                                            <LoanAllocationTable loans={loanAllocations} />
                                        </div>
                                    </Suspense>
                                </div> */}

                                {/* Chart Section */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                                    <Suspense fallback={<div>Loading charts...</div>}>
                                        {/* Balance Trend */}
                                        <div className="bg-white p-4 rounded-lg shadow dark:bg-gray-50">
                                            <h4 className="text-lg font-semibold text-gray-800 mb-4">
                                                Balance Trend (Inflows and Outflows)
                                            </h4>
                                            <Line data={lineChartData} />
                                        </div>

                                        {/* Account Type Distribution */}
                                        <div className="bg-white p-4 rounded-lg shadow dark:bg-gray-50">
                                            <h4 className="text-lg font-semibold text-gray-800 mb-4">
                                                Account Type Distribution
                                            </h4>
                                            <Pie data={pieChartData} />
                                        </div>

                                        {/* Loan Performance */}
                                        <div className="bg-white p-4 rounded-lg shadow dark:bg-gray-50">
                                            <h4 className="text-lg font-semibold text-gray-800 mb-4">
                                                Loan Performance over Month
                                            </h4>
                                            <LoanPerformanceChart loanPerformance={loanPerformance} />
                                        </div>

                                        {/* Monthly Inflows vs Outflows */}
                                        <div className="bg-white p-4 rounded-lg shadow dark:bg-gray-50">
                                            <h4 className="text-lg font-semibold text-gray-800 mb-4">
                                                Inflows vs Outflows (Monthly)
                                            </h4>
                                            <Bar data={barChartData} />
                                        </div>

                                        {/* Bank-wise Balance */}
                                        <div className="bg-white p-4 rounded-lg shadow dark:bg-gray-50">
                                            <h4 className="text-lg font-semibold text-gray-800 mb-4">
                                                Bank-wise Balance
                                            </h4>
                                            <BankWiseBalanceChart chartData={chartData} />
                                        </div>

                                        {/* Top Performing Companies */}
                                        <div className="bg-white p-4 rounded-lg shadow dark:bg-gray-50">
                                            <h4 className="text-lg font-semibold text-gray-800 mb-4">
                                                Top Performing Companies (By Balance)
                                            </h4>
                                            <TopPerformingCompanies topCompaniesData={topPerformingCompanies} />
                                        </div>
                                    </Suspense>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </Suspense>
    );
}
