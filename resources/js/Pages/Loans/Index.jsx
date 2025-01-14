import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import { Head } from '@inertiajs/react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useMemo, useState } from 'react';
import {
    FaChartLine,
    FaEdit,
    FaEye,
    FaFileExcel,
    FaFilePdf,
    FaMoneyBillWave,
    FaPercent,
    FaPlus,
    FaPrint,
    FaSearch,
    FaSync,
    FaTrash
} from 'react-icons/fa';
import { useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';
import * as XLSX from 'xlsx';

// Import our custom components
import ActionButton from '@/Components/Buttons/ActionButton';
import DeleteLoanModal from '@/Components/Modals/DeleteLoanModal';
import TablePagination from '@/Components/Table/TablePagination';

// Stats Card Component
const StatsCard = ({ title, value, icon: Icon, colorClass }) => (
    <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-600">{title}</p>
                <p className={`mt-2 text-3xl font-semibold ${colorClass}`}>
                    {typeof value === 'number'
                        ? value.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'BDT',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })
                        : value
                    }
                </p>
            </div>
            <div className={`p-3 rounded-full ${colorClass.replace('text', 'bg')} bg-opacity-10`}>
                <Icon className={`w-6 h-6 ${colorClass}`} />
            </div>
        </div>
    </div>
);

const Table = ({ columns, data }) => {
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
        pageCount,
        setPageSize,
    } = useTable(
        {
            columns,
            data,
            initialState: { pageSize: 10 }
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    const { globalFilter, pageIndex, pageSize } = state;

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        {headerGroups.map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(column => (
                                    <th
                                        key={column.id}
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        {...column.getSortByToggleProps()}
                                    >
                                        <div className="flex items-center space-x-1">
                                            <span>{column.render('Header')}</span>
                                            <span>
                                                {column.isSorted
                                                    ? column.isSortedDesc
                                                        ? ' ↓'
                                                        : ' ↑'
                                                    : ''}
                                            </span>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {page.map(row => {
                            prepareRow(row);
                            return (
                                <tr key={row.id} className="hover:bg-gray-50">
                                    {row.cells.map(cell => (
                                        <td
                                            key={cell.column.id}
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                        >
                                            {cell.render('Cell')}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                    <tfoot>
                        <tr className="bg-gray-50 text-gray-500">
                            <td colSpan="5" className="px-6 py-4 font-semibold text-right">
                                Totals:
                            </td>
                            <td className="px-6 py-4 font-semibold">{data.reduce((sum, row) => sum + parseFloat(row.limit), 0).toLocaleString('en-US', { style: 'currency', currency: 'BDT' })}</td>
                            <td className="px-6 py-4 font-semibold">{data.reduce((sum, row) => sum + parseFloat(row.occupied_balance), 0).toLocaleString('en-US', { style: 'currency', currency: 'BDT' })}</td>
                            <td className="px-6 py-4 font-semibold">{data.reduce((sum, row) => sum + parseFloat(row.available_balance), 0).toLocaleString('en-US', { style: 'currency', currency: 'BDT' })}</td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <TablePagination
                pageSize={pageSize}
                setPageSize={setPageSize}
                pageIndex={pageIndex}
                pageCount={pageCount}
                canPreviousPage={canPreviousPage}
                canNextPage={canNextPage}
                previousPage={previousPage}
                nextPage={nextPage}
            />
        </div>
    );
};

export default function Index({ auth, loans, total_loans, total_limit, total_available_balance }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const columns = useMemo(
        () => [
            {
                Header: 'Loan ID',
                accessor: 'id',
                Cell: ({ value }) => (
                    <div className="font-mono text-xs">{value}</div>
                )
            },
            {
                Header: 'Company',
                accessor: 'company.name',
                Cell: ({ value }) => (
                    <div className="font-medium text-gray-900">{value}</div>
                )
            },
            {
                Header: 'User',
                accessor: 'user.name'
            },
            {
                Header: 'Bank',
                accessor: 'bank.name'
            },
            {
                Header: 'Loan Type',
                accessor: 'loan_type.name'
            },
            {
                Header: 'Limit',
                accessor: 'limit',
                Cell: ({ value }) => (
                    <div className="text-right font-medium">
                        {parseFloat(value).toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'BDT'
                        })}
                    </div>
                )
            },
            {
                Header: 'Occupied Balance',
                accessor: 'occupied_balance',
                Cell: ({ value }) => (
                    <div className="text-right font-medium text-red-600">
                        {parseFloat(value).toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'BDT'
                        })}
                    </div>
                )
            },
            {
                Header: 'Available Balance',
                accessor: 'available_balance',
                Cell: ({ value }) => (
                    <div className="text-right font-medium text-green-600">
                        {parseFloat(value).toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'BDT'
                        })}
                    </div>
                )
            },
            {
                Header: 'Actions',
                id: 'actions',
                Cell: ({ row }) => (
                    <div className="flex items-center gap-2">
                        <ActionButton
                            href={`/loans/${row.original.id}`}
                            icon={FaEye}
                            color="gray"
                            label="View"
                            className="!p-2"
                        />
                        <ActionButton
                            href={`/loans/${row.original.id}/edit`}
                            icon={FaEdit}
                            color="yellow"
                            label="Edit"
                            className="!p-2"
                        />
                        <ActionButton
                            onClick={() => {
                                setDeleteId(row.original.id);
                                setShowDeleteModal(true);
                            }}
                            icon={FaTrash}
                            color="red"
                            label="Delete"
                            className="!p-2"
                        />
                    </div>
                )
            }
        ],
        []
    );

    const handleRefresh = () => {
        setIsLoading(true);
        Inertia.reload({ onFinish: () => setIsLoading(false) });
    };

    const handleDelete = async (id) => {
        try {
            await Inertia.delete(`/loans/${id}`);
            setShowDeleteModal(false);
        } catch (error) {
            console.error('Error deleting loan:', error);
        }
    };

    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(loans.map(loan => ({
            'Loan ID': loan.id,
            'Company': loan.company.name,
            'User': loan.user.name,
            'Bank': loan.bank.name,
            'Loan Type': loan.loan_type.name,
            'Limit': parseFloat(loan.limit),
            'Occupied Balance': parseFloat(loan.occupied_balance),
            'Available Balance': parseFloat(loan.available_balance)
        })));

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Loans');
        XLSX.writeFile(workbook, 'loans_list.xlsx');
    };

    const downloadPDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.text('Loans Summary', 14, 15);
        doc.setFontSize(10);
        doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 25);

        doc.autoTable({
            head: [['Loan ID', 'Company', 'User', 'Bank', 'Loan Type', 'Limit', 'Occupied Balance', 'Available Balance']],
            body: loans.map(loan => [
                loan.id,
                loan.company.name,
                loan.user.name,
                loan.bank.name,
                loan.loan_type.name,
                parseFloat(loan.limit).toLocaleString('en-US', { style: 'currency', currency: 'BDT' }),
                parseFloat(loan.occupied_balance).toLocaleString('en-US', { style: 'currency', currency: 'BDT' }),
                parseFloat(loan.available_balance).toLocaleString('en-US', { style: 'currency', currency: 'BDT' })
            ]),
            startY: 35,
            styles: { fontSize: 8 },
            headStyles: { fillColor: [51, 122, 183] }
        });

        doc.save('loans_summary.pdf');
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Loans Management
                </h2>
            }
        >
            <Head title="Loans" />

            <div className="container mx-auto px-4 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <StatsCard
                        title="Total Loan Limit"
                        value={total_limit}
                        icon={FaChartLine}
                        colorClass="text-blue-600"
                    />
                    <StatsCard
                        title="Total Occupied Balance"
                        value={total_loans}
                        icon={FaMoneyBillWave}
                        colorClass="text-red-600"
                    />
                    <StatsCard
                        title="Total Available Balance"
                        value={total_available_balance}
                        icon={FaPercent}
                        colorClass="text-green-600"
                    />
                </div>

                {/* Table Controls */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div className="relative w-full md:w-96">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaSearch className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            placeholder="Search loans..."
                            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <ActionButton
                            href="/loans/create"
                            icon={FaPlus}
                            label="Add New Loan"
                            color="green"
                        />
                        <ActionButton
                            onClick={handleRefresh}
                            icon={FaSync}
                            label="Refresh"
                            color="blue"
                            isLoading={isLoading}
                        />
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
                            className="no-print"
                        />
                    </div>
                </div>

                {/* Table */}
                <Table
                    columns={columns}
                    data={loans.filter(loan =>
                        searchQuery === '' ||
                        Object.values(loan).some(value =>
                            String(value).toLowerCase().includes(searchQuery.toLowerCase())
                        ) ||
                        loan.company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        loan.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        loan.bank.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        loan.loan_type.name.toLowerCase().includes(searchQuery.toLowerCase())
                    )}
                />
            </div>

            {/* Delete Modal */}
            <DeleteLoanModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={() => handleDelete(deleteId)}
                loanId={deleteId}
                loanDetails={loans.find(loan => loan.id === deleteId)}
            />

            {/* Print Styles */}
            <style>{`
                @media print {
                    @page {
                        size: landscape;
                        margin: 1cm;
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
                        width: 100%;
                    }

                    .no-print, .no-print * {
                        display: none !important;
                    }

                    .stats-cards {
                        margin-bottom: 2cm;
                    }

                    table {
                        border-collapse: collapse;
                        width: 100%;
                    }

                    th, td {
                        border: 1px solid #ddd;
                        padding: 8px;
                        text-align: left;
                    }

                    thead {
                        background-color: #f8f9fa;
                    }

                    tfoot {
                        font-weight: bold;
                        background-color: #f8f9fa;
                    }

                    .text-right {
                        text-align: right;
                    }
                }
            `}</style>
        </AuthenticatedLayout>
    );
}
