import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link } from "@inertiajs/react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useMemo, useState } from "react";
import {
    FaChevronDown,
    FaChevronUp,
    FaEdit,
    FaEye,
    FaFileExcel,
    FaFilePdf,
    FaPlus,
    FaPrint,
    FaSearch,
    FaTrash,
} from "react-icons/fa";


import {
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
} from "react-table";
import * as XLSX from "xlsx";

// Separate component for the action buttons
// const ActionButton = ({ onClick, icon: Icon, label, color = "blue" }) => (
//     <button
//         onClick={onClick}
//         className={`
//             inline-flex items-center gap-2
//             bg-white text-${color}-600
//             text-sm font-medium px-4 py-2
//             border border-${color}-600
//             rounded-lg shadow-sm
//             hover:bg-${color}-600 hover:text-white
//             focus:outline-none focus:ring-2 focus:ring-${color}-400
//             transition-all duration-300
//         `}
//     >
//         <Icon className="w-4 h-4" />
//         <span>{label}</span>
//     </button>
// );
import ActionButton from '@/Components/Buttons/ActionButton';

// Separate component for the Stats Card
// const StatsCard = ({ title, value, colorClass }) => (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//         <h3 className="text-sm font-medium text-gray-500">{title}</h3>
//         <p className={`mt-2 text-3xl font-semibold ${colorClass}`}>{value}</p>
//     </div>
// );

const StatsCard = ({ title, value, colorClass }) => {
    // Handle null, undefined, or non-numeric values
    const formatValue = (val) => {
        const numericValue = typeof val === "string" ? parseFloat(val) : val;
        if (isNaN(numericValue)) return "BDT 0.00";

        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "BDT",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(numericValue);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            <p className={`mt-2 text-3xl font-semibold ${colorClass}`}>
                {formatValue(value)}
            </p>
        </div>
    );
};

export default function BalancesIndex({
    balances,
    total_inflows,
    total_outflows,
    total_closing_balance,
    auth,
}) {

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const columns = useMemo(
        () => [
            {
                Header: "User",
                accessor: "user.name",
                Cell: ({ value }) => (
                    <div className="font-medium text-gray-900">{value}</div>
                ),
            },
            { Header: "Company", accessor: "company.name" },
            { Header: "Bank", accessor: "bank.name" },
            { Header: "Account Type", accessor: "account_type.name" },
            { Header: "Account Number", accessor: "account_number" },
            {
                Header: "Opening Balance",
                accessor: "opening_balance",
                Cell: ({ value }) => (
                    <div className="text-right">
                        {Number(value).toLocaleString("en-US", {
                            style: "currency",
                            currency: "BDT",
                        })}
                    </div>
                ),
            },
            {
                Header: "Inflows",
                accessor: "inflows",
                Cell: ({ value }) => (
                    <div className="text-right text-green-600 font-medium">
                        +
                        {Number(value).toLocaleString("en-US", {
                            style: "currency",
                            currency: "BDT",
                        })}
                    </div>
                ),
            },
            {
                Header: "Outflows",
                accessor: "outflows",
                Cell: ({ value }) => (
                    <div className="text-right text-red-600 font-medium">
                        -
                        {Number(value).toLocaleString("en-US", {
                            style: "currency",
                            currency: "BDT",
                        })}
                    </div>
                ),
            },
            {
                Header: "Closing Balance",
                accessor: "closing_balance",
                Cell: ({ value }) => (
                    <div className="text-right font-semibold">
                        {Number(value).toLocaleString("en-US", {
                            style: "currency",
                            currency: "BDT",
                        })}
                    </div>
                ),
            },
            {
                Header: "Actions",
                accessor: "id",
                Cell: ({ value }) => (
                    <div className="flex items-center gap-3">
                               <ActionButton
                            href={`/balances/${value}`}
                            icon={FaEye}
                            color="gray"
                            label="View"
                            className="!p-2"
                        />
                        <ActionButton
                            href={`/balances/${value}/edit`}
                            icon={FaEdit}
                            color="yellow"
                            label="Edit"
                            className="!p-2"
                        />
                        <ActionButton
                            onClick={() => {
                                setDeleteId(value);
                                setShowDeleteModal(true);
                            }}
                            icon={FaTrash}
                            color="red"
                            label="Delete"
                            className="!p-2"
                        />
                    </div>
                ),
            },
        ],
        []
    );

    const data = useMemo(() => balances, [balances]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        state,
        setGlobalFilter,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        setPageSize,
    } = useTable(
        {
            columns,
            data,
            initialState: { pageSize: 10 },
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    const { globalFilter, pageIndex, pageSize } = state;

    const deleteBalance = (id) => {
        Inertia.delete(`/balances/${id}`);
        setShowDeleteModal(false);
    };

    const downloadPDF = () => {
        const doc = new jsPDF();
        const tableColumn = [
            "User Name",
            "Company",
            "Bank",
            "Account Type",
            "Account Number",
            "Opening Balance",
            "Inflows",
            "Outflows",
            "Closing Balance",
        ];

        const tableRows = balances.map((balance) => [
            balance.user?.name || "N/A",
            balance.company?.name || "N/A",
            balance.bank?.name || "N/A",
            balance.account_type?.name || "N/A",
            balance.account_number || "N/A",
            balance.opening_balance || "0",
            balance.inflows || "0",
            balance.outflows || "0",
            balance.closing_balance || "0",
        ]);

        doc.setFontSize(18);
        doc.text("Balances Report", 14, 20);

        doc.setFontSize(12);
        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 30,
        });

        const totalInflows = total_inflows || 0;
        const totalOutflows = total_outflows || 0;
        const totalClosingBalance = total_closing_balance || 0;

        doc.autoTable({
            head: [
                [
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "Total Inflows",
                    "Total Outflows",
                    "Total Closing Balance",
                ],
            ],
            body: [
                [
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    totalInflows,
                    totalOutflows,
                    totalClosingBalance,
                ],
            ],
            startY: doc.lastAutoTable.finalY + 10,
            theme: "grid",
            columnStyles: {
                6: { halign: "center", fontStyle: "bold" },
                7: { halign: "center", fontStyle: "bold" },
                8: { halign: "center", fontStyle: "bold" },
            },
        });

        doc.save("balances_report.pdf");
    };

    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(
            balances.map((balance) => ({
                "User Name": balance.user?.name || "N/A",
                Company: balance.company?.name || "N/A",
                Bank: balance.bank?.name || "N/A",
                "Account Type": balance.account_type?.name || "N/A",
                "Account Number": balance.account_number || "N/A",
                "Opening Balance": Number(
                    balance.opening_balance || 0
                ).toLocaleString("en-US", {
                    style: "currency",
                    currency: "BDT",
                }),
                Inflows: Number(balance.inflows || 0).toLocaleString("en-US", {
                    style: "currency",
                    currency: "BDT",
                }),
                Outflows: Number(balance.outflows || 0).toLocaleString(
                    "en-US",
                    {
                        style: "currency",
                        currency: "BDT",
                    }
                ),
                "Closing Balance": Number(
                    balance.closing_balance || 0
                ).toLocaleString("en-US", {
                    style: "currency",
                    currency: "BDT",
                }),
            }))
        );

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Balances");
        XLSX.writeFile(workbook, "balances.xlsx");
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-100">
                    Balances Management
                </h2>
            }
        >
            <Head title="Balances" />

            <div className="container mx-auto px-4 py-8">
                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatsCard
                        title="Total Inflows"
                        value={total_inflows || 0}
                        colorClass="text-green-600"
                    />
                    <StatsCard
                        title="Total Outflows"
                        value={total_outflows || 0}
                        colorClass="text-red-600"
                    />

                    <StatsCard
                        title="Net Balance"
                        value={total_closing_balance || 0}
                        colorClass="text-blue-600"
                    />
                </div>

                {/* Table Controls */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaSearch className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            value={globalFilter || ""}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            placeholder="Search in all columns..."
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm"
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <Link href="/balances/create">
                            <ActionButton
                                icon={FaPlus}
                                label="Add Balance"
                                color="green"
                            />
                        </Link>
                        <ActionButton
                            onClick={downloadExcel}
                            icon={FaFileExcel}
                            label="Export Excel"
                        />
                        <ActionButton
                            onClick={downloadPDF}
                            icon={FaFilePdf}
                            label="Export PDF"
                        />
                        <ActionButton
                            onClick={() => window.print()}
                            icon={FaPrint}
                            label="Print"
                            color="yellow"
                        />
                    </div>
                </div>

                {/* Table */}

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                {headerGroups.map((headerGroup, groupIndex) => (
                                    <tr key={`header-group-${groupIndex}`}>
                                        {headerGroup.headers.map(
                                            (column, columnIndex) => {
                                                const sortProps =
                                                    column.getSortByToggleProps();
                                                const { key, ...headerProps } =
                                                    column.getHeaderProps(
                                                        sortProps
                                                    );
                                                return (
                                                    <th
                                                        key={`header-${groupIndex}-${columnIndex}`}
                                                        {...headerProps}
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        <div className="flex items-center space-x-1">
                                                            <span>
                                                                {column.render(
                                                                    "Header"
                                                                )}
                                                            </span>
                                                            {column.isSorted &&
                                                                (column.isSortedDesc ? (
                                                                    <FaChevronDown className="w-4 h-4" />
                                                                ) : (
                                                                    <FaChevronUp className="w-4 h-4" />
                                                                ))}
                                                        </div>
                                                    </th>
                                                );
                                            }
                                        )}
                                    </tr>
                                ))}
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {page.map((row, rowIndex) => {
                                    prepareRow(row);
                                    return (
                                        <tr
                                            key={`row-${rowIndex}-${
                                                row.original.id || rowIndex
                                            }`}
                                            className="hover:bg-gray-50"
                                        >
                                            {row.cells.map(
                                                (cell, cellIndex) => {
                                                    const {
                                                        key,
                                                        ...cellProps
                                                    } = cell.getCellProps();
                                                    return (
                                                        <td
                                                            key={`cell-${rowIndex}-${cellIndex}`}
                                                            {...cellProps}
                                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                                        >
                                                            {cell.render(
                                                                "Cell"
                                                            )}
                                                        </td>
                                                    );
                                                }
                                            )}
                                        </tr>
                                    );
                                })}

                                {/* Totals Row */}
                                <tr className="bg-gray-50 font-semibold">
                                    <td
                                        colSpan={5}
                                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                    >
                                        Totals
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                                        {Number(
                                            data.reduce(
                                                (sum, row) =>
                                                    sum +
                                                    (Number(
                                                        row.opening_balance
                                                    ) || 0),
                                                0
                                            )
                                        ).toLocaleString("en-US", {
                                            style: "currency",
                                            currency: "BDT",
                                        })}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium text-right">
                                        +
                                        {Number(total_inflows).toLocaleString(
                                            "en-US",
                                            {
                                                style: "currency",
                                                currency: "BDT",
                                            }
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium text-right">
                                        -
                                        {Number(total_outflows).toLocaleString(
                                            "en-US",
                                            {
                                                style: "currency",
                                                currency: "BDT",
                                            }
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold text-right">
                                        {Number(
                                            total_closing_balance
                                        ).toLocaleString("en-US", {
                                            style: "currency",
                                            currency: "BDT",
                                        })}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {/* Empty cell for actions column */}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        {/* Background overlay */}
                        <div
                            className="fixed inset-0 transition-opacity"
                            aria-hidden="true"
                        >
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        {/* Modal panel */}
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <FaTrash className="h-6 w-6 text-red-600" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                                            Delete Balance
                                        </h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Are you sure you want to delete
                                                this balance? This action cannot
                                                be undone.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    onClick={() => deleteBalance(deleteId)}
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Delete
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowDeleteModal(false)}
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Print-specific styles */}
            <style>{`
                    @media print {
                        @page {
                            size: landscape;
                        }
                        body * {
                            visibility: hidden;
                        }
                        .container, .container * {
                            visibility: visible;
                        }
                        .container {
                            position: absolute;
                            left: 0;
                            top: 0;
                        }
                        .no-print, .no-print * {
                            display: none !important;
                        }
                    }
                `}</style>
        </AuthenticatedLayout>
    );
}
