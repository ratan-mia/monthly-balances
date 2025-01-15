import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
    FaArrowLeft,
    FaBuilding,
    FaChartLine,
    FaCreditCard,
    FaEdit,
    FaMoneyBillWave,
    FaTrash,
    FaUniversity,
    FaUser,
} from "react-icons/fa";

const InfoCard = ({ title, children }) => (
    <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
        <div className="space-y-4">{children}</div>
    </div>
);

const InfoRow = ({ icon: Icon, label, value, className = "" }) => (
    <div className="flex items-start">
        <div className="flex-shrink-0 mt-1">
            <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <div className="ml-3">
            <dt className="text-sm font-medium text-gray-500">{label}</dt>
            <dd className={`mt-1 text-sm ${className}`}>{value}</dd>
        </div>
    </div>
);

const StatCard = ({ label, value, type = "default" }) => {
    const colors = {
        default: "bg-blue-50 text-blue-700",
        success: "bg-green-50 text-green-700",
        warning: "bg-yellow-50 text-yellow-700",
        danger: "bg-red-50 text-red-700",
    };

    return (
        <div className={`rounded-lg p-4 ${colors[type]}`}>
            <div className="font-medium">{label}</div>
            <div className="text-2xl font-semibold mt-1">{value}</div>
        </div>
    );
};

export default function Show({ balance }) {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "BDT",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Balance Details
                </h2>
            }
        >
            <Head title="Balance Details" />

            <div className="container mx-auto px-2 py-8 max-w-6xl">
                {/* Navigation and Actions */}
                <div className="flex justify-between items-center mb-6">
                    <Link
                        href="/balances"
                        className="flex items-center text-gray-600 hover:text-gray-900"
                    >
                        <FaArrowLeft className="mr-2" />
                        Back to Balances
                    </Link>

                    <div className="flex space-x-3">
                        <Link
                            href={`/balances/${balance.id}/edit`}
                            className="inline-flex items-center px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                        >
                            <FaEdit className="mr-2" />
                            Edit Balance
                        </Link>

                        <button
                            onClick={() => {
                                if (
                                    confirm(
                                        "Are you sure you want to delete this balance?"
                                    )
                                ) {
                                    Inertia.delete(`/balances/${balance.id}`);
                                }
                            }}
                            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            <FaTrash className="mr-2" />
                            Delete Balance
                        </button>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <StatCard
                        label="Opening Balance"
                        value={formatCurrency(
                            Number(balance.opening_balance || 0)
                        )}
                        type="default"
                    />
                    <StatCard
                        label="Inflows"
                        value={formatCurrency(Number(balance.inflows || 0))}
                        type="success"
                    />
                    <StatCard
                        label="Outflows"
                        value={formatCurrency(Number(balance.outflows || 0))}
                        type="danger"
                    />
                </div>

                {/* Details Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Company and User Info */}
                    <InfoCard title="Account Information">
                        <InfoRow
                            icon={FaBuilding}
                            label="Company"
                            value={balance.company.name}
                        />
                        <InfoRow
                            icon={FaUser}
                            label="Responsible User"
                            value={balance.user.name}
                        />
                        <InfoRow
                            icon={FaUniversity}
                            label="Bank"
                            value={balance.bank.name}
                        />
                        <InfoRow
                            icon={FaCreditCard}
                            label="Account Type"
                            value={balance.account_type.name}
                        />
                        <InfoRow
                            icon={FaCreditCard}
                            label="Account Number"
                            value={balance.account_number}
                        />
                    </InfoCard>

                    {/* Balance Details */}
                    <InfoCard title="Balance Details">
                        <InfoRow
                            icon={FaMoneyBillWave}
                            label="Opening Balance"
                            value={formatCurrency(balance.opening_balance)}
                            className="font-medium text-gray-900"
                        />
                        <InfoRow
                            icon={FaChartLine}
                            label="Inflows"
                            value={formatCurrency(balance.inflows)}
                            className="font-medium text-green-600"
                        />
                        <InfoRow
                            icon={FaChartLine}
                            label="Outflows"
                            value={formatCurrency(balance.outflows)}
                            className="font-medium text-red-600"
                        />
                        <InfoRow
                            icon={FaMoneyBillWave}
                            label="Closing Balance"
                            value={formatCurrency(balance.closing_balance)}
                            className="font-medium text-gray-900"
                        />
                    </InfoCard>
                </div>

                {/* Account Activity Summary */}
                <div className="mt-6">
                    <InfoCard title="Account Activity Summary">
                        <div className="bg-gray-50 rounded-lg p-4">
                            {/* Flow Analysis */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                                        Flow Analysis
                                    </h4>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Net Flow:</span>
                                            <span
                                                className={
                                                    Number(
                                                        balance.inflows || 0
                                                    ) -
                                                        Number(
                                                            balance.outflows ||
                                                                0
                                                        ) >=
                                                    0
                                                        ? "text-green-600"
                                                        : "text-red-600"
                                                }
                                            >
                                                {formatCurrency(
                                                    Number(
                                                        balance.inflows || 0
                                                    ) -
                                                        Number(
                                                            balance.outflows ||
                                                                0
                                                        )
                                                )}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span>Flow Ratio:</span>
                                            <span>
                                                {Number(balance.outflows || 0) === 0
                                                    ? "∞"
                                                    : (
                                                          Number(balance.inflows || 0) /
                                                          Number(balance.outflows || 1)
                                                      ).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                                        Balance Changes
                                    </h4>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Total Change:</span>
                                            <span
                                                className={
                                                    Number(
                                                        balance.closing_balance ||
                                                            0
                                                    ) -
                                                        Number(
                                                            balance.opening_balance ||
                                                                0
                                                        ) >=
                                                    0
                                                        ? "text-green-600"
                                                        : "text-red-600"
                                                }
                                            >
                                                {formatCurrency(
                                                    Number(
                                                        balance.closing_balance ||
                                                            0
                                                    ) -
                                                        Number(
                                                            balance.opening_balance ||
                                                                0
                                                        )
                                                )}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span>Change Percentage:</span>
                                            <span>
                                                {Number(
                                                    balance.opening_balance || 0
                                                ) === 0
                                                    ? "∞"
                                                    : `${(
                                                          ((Number(
                                                              balance.closing_balance ||
                                                                  0
                                                          ) -
                                                              Number(
                                                                  balance.opening_balance ||
                                                                      0
                                                              )) /
                                                              Number(
                                                                  balance.opening_balance ||
                                                                      0
                                                              )) *
                                                          100
                                                      ).toFixed(2)}%`}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </InfoCard>
                </div>

                {/* Meta Information */}
                <div className="mt-6 bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p>
                                Created:{" "}
                                {new Date(
                                    balance.created_at
                                ).toLocaleDateString()}
                            </p>
                        </div>
                        <div>
                            <p>
                                Last Updated:{" "}
                                {new Date(
                                    balance.updated_at
                                ).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
