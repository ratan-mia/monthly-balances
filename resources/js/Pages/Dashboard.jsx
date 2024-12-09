import BankWiseBalanceChart from "@/Components/BankWiseBalanceChart";
import LoanPerformanceChart from "@/Components/LoanPerformanceChart";
import StatBox from "@/Components/StatBox";

import LoanAllocationTable from "@/Components/LoanAllocationTable";
import TopPerformingCompanies from "@/Components/TopPerformingCompanies";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import 'iconify-icon';

import { Head } from "@inertiajs/react";
import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement, // For Pie chart
    Title,
    Tooltip,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";

// Register the chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement, // Register ArcElement for pie charts
    Title,
    Tooltip,
    Legend
);

export default function Dashboard({
    balances,
    companies,
    users,
    accountTypes,
    banks,
    chartData,
    trendData,
    companyBalances,
    topPerformingCompanies,
    profitMarginData,
    totalLoanAmount,
    topCompany,
    bankLoanAllocation,
    latestLoanRequest,
    loanPerformance,
    totalBalance,
    totalAvailableBalance,
    totalLoanLimit,
    totalInflows,
    totalOutflows,
    loanAllocations,
}) {
    // Process the balance data for charts
    const lineChartData = {
        labels: balances.map((balance) => `Month ${balance.month}`),
        datasets: [
            {
                label: "Inflows",
                data: balances.map((balance) => balance.total_inflows),
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
            },
            {
                label: "Outflows",
                data: balances.map((balance) => balance.total_outflows),
                fill: false,
                borderColor: "rgb(255, 99, 132)",
                tension: 0.1,
            },
        ],
    };

    const pieChartData = {
        labels: accountTypes.map((accountType) => accountType.name),
        datasets: [
            {
                data: accountTypes.map(
                    (accountType) => accountType.totalAccounts || 25
                ), // Assuming the data for each type is available
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                hoverOffset: 4,
            },
        ],
    };

    const barChartData = {
        labels: balances.map((balance) => `Month ${balance.month}`),
        datasets: [
            {
                label: "Inflows",
                data: balances.map((balance) => balance.total_inflows),
                backgroundColor: "#36A2EB",
            },
            {
                label: "Outflows",
                data: balances.map((balance) => balance.total_outflows),
                backgroundColor: "#FF6384",
            },
        ],
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-100 dark:text-gray-100">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-6">
                <div className="w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-100 dark:text-gray-100">
                            <h3 className="text-2xl font-semibold mb-6">
                                Welcome to the Dashboard!
                            </h3>

                            {/* Stats Section */}
                            {/* <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-6">
                                <div class="card shadow-none border border-gray-200 dark:border-neutral-600 dark:bg-neutral-700 rounded-lg h-full bg-gradient-to-r from-cyan-600/10 to-bg-white">
                                    <div class="card-body p-5">
                                        <div class="flex flex-wrap items-center justify-between gap-3">
                                            <div>
                                                <p class="font-medium text-neutral-900 dark:text-white mb-1">
                                                    Total Users
                                                </p>
                                                <h6 class="mb-0 dark:text-white">
                                                    20,000
                                                </h6>
                                            </div>
                                            <div class="w-[50px] h-[50px] bg-cyan-600 rounded-full flex justify-center items-center">
                                                <iconify-icon
                                                    icon="gridicons:multiple-users"
                                                    class="text-white text-2xl mb-0"
                                                ></iconify-icon>
                                            </div>
                                        </div>
                                        <p class="font-medium text-sm text-neutral-600 dark:text-white mt-3 mb-0 flex items-center gap-2">
                                            <span class="inline-flex items-center gap-1 text-success-600 dark:text-success-400">
                                                <iconify-icon
                                                    icon="bxs:up-arrow"
                                                    class="text-xs"
                                                ></iconify-icon>{" "}
                                                +4000
                                            </span>
                                            Last 30 days users
                                        </p>
                                    </div>
                                </div>
                            </div> */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {/* StatBox Components */}
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
                                    value={
                                        topCompany
                                            ? topCompany.company.name
                                            : "No data available"
                                    }
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
                                    title=""
                                    value={
                                        latestLoanRequest
                                            ? `${
                                                  latestLoanRequest.bank.name
                                              } - ${
                                                  latestLoanRequest.loan_type
                                                      .name
                                              } - ৳${latestLoanRequest.occupied_balance.toLocaleString()}`
                                            : "No recent requests"
                                    }
                                    icon="🆕"
                                    bgColor="bg-indigo-500"
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                                <div className="bg-white shadow p-4 rounded-lg">
                                    {/* <h2 className="text-lg font-bold mb-4 text-black">
                                    Loan Allocations
                                </h2> */}
                                    <LoanAllocationTable
                                        loans={loanAllocations}
                                    />
                                </div>
                            </div>

                            {/* Chart Section */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                                <div className="bg-white p-4 rounded-lg shadow dark:bg-gray-50">
                                    <h4 className="text-lg font-semibold text-gray-800 mb-4">
                                        Balance Trend (Inflows and Outflows)
                                    </h4>
                                    <Line data={lineChartData} />
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow dark:bg-gray-50">
                                    <h4 className="text-lg font-semibold text-gray-800 mb-4">
                                        Account Type Distribution (Pie Chart)
                                    </h4>
                                    <Pie data={pieChartData} />
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow dark:bg-gray-50">
                                    <h4 className="text-lg font-semibold text-gray-800 mb-4">
                                        Loan Performance over Month
                                    </h4>
                                    <LoanPerformanceChart
                                        loanPerformance={loanPerformance}
                                    />
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow dark:bg-gray-50">
                                    <h4 className="text-lg font-semibold text-gray-800 mb-4">
                                        Inflows vs Outflows (Monthly)
                                    </h4>
                                    <Bar data={barChartData} />
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow dark:bg-gray-50">
                                    <h4 className="text-lg font-semibold text-gray-800 mb-4">
                                        Bank-wise Balance
                                    </h4>
                                    <BankWiseBalanceChart
                                        chartData={chartData}
                                    />
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow dark:bg-gray-50">
                                    <h4 className="text-lg font-semibold text-gray-800 mb-4">
                                        Top Performing Companies (By Balance)
                                    </h4>
                                    <TopPerformingCompanies
                                        topCompaniesData={
                                            topPerformingCompanies
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
