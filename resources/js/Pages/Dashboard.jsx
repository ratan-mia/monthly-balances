import BalanceTrendChart from "@/Components/BalanceTrendChart";
import BankWiseBalanceChart from "@/Components/BankWiseBalanceChart";
import CompanyBalancePieChart from "@/Components/CompanyBalancePieChart";
import LoanPerformanceChart from "@/Components/LoanPerformanceChart";
import ProfitMarginOverTime from "@/Components/ProfitMarginOverTime";
import StatBox from "@/Components/StatBox";
import TopPerformingCompanies from "@/Components/TopPerformingCompanies";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
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
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-6">
                <div className="w-full sm:px-6 lg:px-6">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-800">
                            <h3 className="text-2xl font-semibold mb-6">
                                Welcome to the Dashboard!
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-5">
                                {/* Total Loan */}
                                <div className="bg-white p-2 rounded-lg shadow dark:bg-gray-50">
                                    <StatBox
                                        title="Total Loan Amount"
                                        value={`৳${totalLoanAmount}`}
                                        icon="💰"
                                        bgColor="bg-blue-500"
                                    />
                                </div>
                                {/* Total Loan */}
                                <div className="bg-white p-2 rounded-lg shadow dark:bg-gray-50">
                                    <StatBox
                                        title="Top Company by Loan Utilization"
                                        value={
                                            topCompany
                                                ? topCompany.company.name
                                                : "N/A"
                                        }
                                        icon="🏢"
                                        bgColor="bg-indigo-500"
                                    />
                                </div>
                                <div className="bg-white p-2 rounded-lg shadow dark:bg-gray-50">
                                    <StatBox
                                        title="Latest Loan"
                                        value={`${latestLoanRequest.user.name} - ${latestLoanRequest.loan_type.name} - ৳${latestLoanRequest.occupied_balance}`}
                                        icon="🆕"
                                        bgColor="bg-yellow-500"
                                    />
                                </div>
                                <div className="bg-white p-2 rounded-lg shadow dark:bg-gray-50">
                                    <StatBox
                                        title="Loans by Bank"
                                        value={`${bankLoanAllocation.length} Banks`}
                                        icon="🏦"
                                        bgColor="bg-green-500"
                                    />
                                </div>
                            </div>

                            {/* Chart Section */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">




                                {/* Line Chart */}
                                <div className="bg-white p-2 rounded-lg shadow dark:bg-gray-50">
                                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-800 mb-4">
                                        Balance Trend (Inflows and Outflows)
                                    </h4>
                                    <Line data={lineChartData} />
                                </div>

                                {/* Pie Chart */}
                                <div className="bg-white p-2 rounded-lg shadow dark:bg-gray-50">
                                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-800 mb-4">
                                        Account Type Distribution (Pie Chart)
                                    </h4>
                                    <Pie data={pieChartData} />
                                </div>
                                             {/* Line Chart */}
                               <div className="bg-white p-2 rounded-lg shadow dark:bg-gray-50">
                                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-800 mb-4">
                                        Loan Performance over month
                                    </h4>

                                    <LoanPerformanceChart loanPerformance={loanPerformance} />


                                </div>

                                {/* Bar Chart */}
                                <div className="bg-white p-2 rounded-lg shadow dark:bg-gray-50">
                                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-800 mb-4">
                                        Inflows vs Outflows (Monthly)
                                    </h4>
                                    <Bar data={barChartData} />
                                </div>

                                {/* Bar Chart */}
                                <div className="bg-white p-2 rounded-lg shadow dark:bg-gray-50">
                                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-800 mb-4">
                                        Bank-wise Balance
                                    </h4>
                                    <BankWiseBalanceChart
                                        chartData={chartData}
                                    />
                                </div>

                                {/* Balance Trend Chart */}
                                <div className="bg-white p-2 rounded-lg shadow dark:bg-gray-50">
                                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-800 mb-4">
                                        Balance Trend Over Time
                                    </h4>
                                    <BalanceTrendChart trendData={trendData} />
                                </div>
                                {/* Balance Trend Chart */}
                                <div className="bg-white p-2 rounded-lg shadow dark:bg-gray-50">
                                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-800 mb-4">
                                        Balance Trend Over Time
                                    </h4>
                                    <CompanyBalancePieChart
                                        companyData={companyBalances}
                                    />
                                </div>

                                {/* Balance Trend Chart */}
                                <div className="bg-white p-2 rounded-lg shadow dark:bg-gray-50">
                                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-800 mb-4">
                                        Top Performing Companies (By Balance)
                                    </h4>
                                    <TopPerformingCompanies
                                        topCompaniesData={
                                            topPerformingCompanies
                                        }
                                    />
                                </div>

                                {/* Balance Trend Chart */}
                                <div className="bg-white p-2 rounded-lg shadow dark:bg-gray-50">
                                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-800 mb-4">
                                        Profit Margin Over Time
                                    </h4>
                                    <ProfitMarginOverTime
                                        profitData={profitMarginData}
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
