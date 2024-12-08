import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link } from "@inertiajs/react";
import { useMemo } from "react";
import {
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
} from "react-table";

// Export libraries
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

export default function BalancesIndex({
    balances,
    total_inflows,
    total_outflows,
    total_closing_balance,
    auth,
}) {
    const columns = useMemo(
        () => [
            { Header: "User", accessor: "user.name" },
            { Header: "Company", accessor: "company.name" },
            { Header: "Bank", accessor: "bank.name" },
            { Header: "Account Type", accessor: "account_type.name" },
            { Header: "Account Number", accessor: "account_number" },
            { Header: "Opening Balance", accessor: "opening_balance" },
            { Header: "Inflows", accessor: "inflows" },
            { Header: "Outflows", accessor: "outflows" },
            { Header: "Closing Balance", accessor: "closing_balance" },
            {
                Header: "Actions",
                accessor: "id",
                Cell: ({ value }) => (
                    <>
                        <Link
                            href={`/balances/${value}/edit`}
                            className="text-yellow-600 hover:text-yellow-700 mr-2"
                        >
                            Edit
                        </Link>
                        <button
                            onClick={() => deleteBalance(value)}
                            className="text-red-600 hover:text-red-700"
                        >
                            Delete
                        </button>
                    </>
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
        if (confirm("Are you sure you want to delete this balance?")) {
            Inertia.delete(`/balances/${id}`);
        }
    };

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.text("Balances Report", 14, 16);

        const tableColumn = columns.map((col) => col.Header);
        const tableRows = balances.map((balance) =>
            tableColumn.map((col) => {
                switch (col) {
                    case "User":
                        return balance.user?.name;
                    case "Company":
                        return balance.company?.name;
                    case "Bank":
                        return balance.bank?.name;
                    case "Account Type":
                        return balance.account_type?.name;
                    case "Account Number":
                        return balance.account_number;
                    case "Opening Balance":
                        return balance.opening_balance;
                    case "Inflows":
                        return balance.inflows;
                    case "Outflows":
                        return balance.outflows;
                    case "Closing Balance":
                        return balance.closing_balance;
                    default:
                        return "";
                }
            })
        );

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });

        doc.save("balances_report.pdf");
    };

    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(balances);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Balances");
        XLSX.writeFile(workbook, "balances_report.xlsx");
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Balances
                </h2>
            }
        >
            <Head title="Balances" />

            <div className="container w-full mx-auto px-6 py-8">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center">
                        <h1 className="text-3xl font-semibold text-gray-800 mr-4">
                            Balances
                        </h1>
                        <input
                            value={globalFilter || ""}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            placeholder="Search..."
                            className="px-4 py-2 border rounded-lg"
                        />
                    </div>

                    <div className="text-right space-x-4">
                        <Link
                            href="/balances/create"
                            className="inline-block bg-blue-600 text-white text-sm font-medium px-3 py-1.5 hover:bg-blue-700 transition-all duration-300"
                        >
                            Add Balance
                        </Link>
                        <button
                            onClick={downloadExcel}
                            className="inline-block bg-green-600 text-white text-sm font-medium px-3 py-1.5 hover:bg-green-700 transition-all duration-300"
                        >
                            Download Excel
                        </button>
                        <button
                            onClick={downloadPDF}
                            className="inline-block bg-red-600 text-white text-sm font-medium px-3 py-1.5 hover:bg-red-700 transition-all duration-300"
                        >
                            Download PDF
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                    <table {...getTableProps()} className="min-w-full">
                        <thead className="bg-gray-100 border-b">
                            {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column) => (
                                        <th
                                            {...column.getHeaderProps(
                                                column.getSortByToggleProps()
                                            )}
                                            className="px-6 py-3 text-left"
                                        >
                                            {column.render("Header")}
                                            <span>
                                                {column.isSorted
                                                    ? column.isSortedDesc
                                                        ? " 🔽"
                                                        : " 🔼"
                                                    : ""}
                                            </span>
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {page.map((row) => {
                                prepareRow(row);
                                return (
                                    <tr
                                        {...row.getRowProps()}
                                        className="border-b hover:bg-gray-50"
                                    >
                                        {row.cells.map((cell) => (
                                            <td
                                                {...cell.getCellProps()}
                                                className="px-6 py-4"
                                            >
                                                {cell.render("Cell")}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                                {/* Totals Row */}
                                <tfoot>
                            <tr className="bg-gray-100">
                                <td className="px-4 py-2 border text-right font-semibold" colSpan="6">
                                    Totals:
                                </td>
                                <td className="px-4 py-2 border font-semibold">{total_inflows}</td>
                                <td className="px-4 py-2 border font-semibold">{total_outflows}</td>
                                <td className="px-4 py-2 border font-semibold">{total_closing_balance}</td>
                                <td className="px-4 py-2 border"></td>
                            </tr>
                        </tfoot>

                    </table>

                    <div className="px-6 py-4 flex items-center justify-between">
                        <div>
                            <select
                                value={pageSize}
                                onChange={(e) =>
                                    setPageSize(Number(e.target.value))
                                }
                                className="border rounded px-3 py-1"
                            >
                                {[5,10, 25, 50].map((size) => (
                                    <option key={size} value={size}>
                                        Show {size}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="space-x-2">
                            <button
                                onClick={() => previousPage()}
                                disabled={!canPreviousPage}
                                className="px-3 py-1 border rounded disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <span>
                                Page {pageIndex + 1} of {pageOptions.length}
                            </span>
                            <button
                                onClick={() => nextPage()}
                                disabled={!canNextPage}
                                className="px-3 py-1 border rounded disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
