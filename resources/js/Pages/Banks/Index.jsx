import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import { Head } from '@inertiajs/react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useMemo, useState } from 'react';
import {
    FaEdit,
    FaEye,
    FaFileExcel,
    FaFilePdf,
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
import DeleteBankModal from '@/Components/Modals/DeleteBankModal';
import TablePagination from '@/Components/Table/TablePagination';

export default function Index({ auth, banks }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const columns = useMemo(
        () => [
            {
                Header: 'Bank Information',
                columns: [
                    {
                        Header: 'Name',
                        accessor: 'name',
                        Cell: ({ value }) => (
                            <div className="font-medium text-gray-900">{value}</div>
                        )
                    },
                    {
                        Header: 'Branch',
                        accessor: 'branch'
                    }
                ]
            },
            {
                Header: 'Account Details',
                columns: [
                    {
                        Header: 'Account Number',
                        accessor: 'account_number',
                        Cell: ({ value }) => (
                            <div className="font-mono text-sm">{value}</div>
                        )
                    },
                    {
                        Header: 'Address',
                        accessor: 'address',
                        Cell: ({ value }) => (
                            <div className="max-w-xs truncate" title={value}>
                                {value}
                            </div>
                        )
                    },
                    {
                        Header: 'Contact',
                        accessor: 'contact_number',
                        Cell: ({ value }) => (
                            <div className="font-mono text-sm">{value}</div>
                        )
                    }
                ]
            },
            {
                Header: 'Actions',
                accessor: 'id',
                Cell: ({ row }) => (
                    <div className="flex items-center gap-2">
                        <ActionButton
                            href={`/banks/${row.original.id}`}
                            icon={FaEye}
                            color="gray"
                            label="View"
                            className="!p-2"
                        />
                        <ActionButton
                            href={`/banks/${row.original.id}/edit`}
                            icon={FaEdit}
                            color="blue"
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
                ),
            }
        ],
        []
    );

    const data = useMemo(() => banks, [banks]);

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

    const handleRefresh = () => {
        setIsLoading(true);
        Inertia.reload({ onFinish: () => setIsLoading(false) });
    };

    const handleDelete = async (id) => {
        try {
            await Inertia.delete(`/banks/${id}`);
            setShowDeleteModal(false);
        } catch (error) {
            console.error('Error deleting bank:', error);
        }
    };

    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(banks.map(bank => ({
            'Bank Name': bank.name,
            'Branch': bank.branch,
            'Account Number': bank.account_number,
            'Address': bank.address,
            'Contact Number': bank.contact_number
        })));

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Banks');
        XLSX.writeFile(workbook, 'banks_list.xlsx');
    };

    const downloadPDF = () => {
        const doc = new jsPDF();

        // Add title
        doc.setFontSize(16);
        doc.text('Banks List', 14, 15);

        // Add timestamp
        doc.setFontSize(10);
        doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 25);

        // Add table
        doc.autoTable({
            head: [['Bank Name', 'Branch', 'Account Number', 'Address', 'Contact Number']],
            body: banks.map(bank => [
                bank.name,
                bank.branch,
                bank.account_number,
                bank.address,
                bank.contact_number
            ]),
            startY: 30,
            styles: { fontSize: 8 },
            headStyles: { fillColor: [51, 122, 183] }
        });

        doc.save('banks_list.pdf');
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Banks Management
                </h2>
            }
        >
            <Head title="Banks" />

            <div className="container mx-auto px-4 py-8">
                {/* Table Controls */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    {/* Search */}
                    <div className="relative w-full md:w-96">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaSearch className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            value={globalFilter || ""}
                            onChange={e => setGlobalFilter(e.target.value)}
                            placeholder="Search banks..."
                            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3">
                        <ActionButton
                            href="/banks/create"
                            icon={FaPlus}
                            label="Add New Bank"
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
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                {headerGroups.map(headerGroup => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map(column => (
                                            <th
                                                {...column.getHeaderProps(column.getSortByToggleProps())}
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
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
                            <tbody {...getTableBodyProps()} className="divide-y divide-gray-200 bg-white">
                                {page.map(row => {
                                    prepareRow(row);
                                    return (
                                        <tr {...row.getRowProps()} className="hover:bg-gray-50">
                                            {row.cells.map(cell => (
                                                <td
                                                    {...cell.getCellProps()}
                                                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                                >
                                                    {cell.render('Cell')}
                                                </td>
                                            ))}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
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
            </div>

            {/* Delete Modal */}
            <DeleteBankModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={() => handleDelete(deleteId)}
                bankName={banks.find(bank => bank.id === deleteId)?.name}
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
                }
            `}</style>
        </AuthenticatedLayout>
    );
}
