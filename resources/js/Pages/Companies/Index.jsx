import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import { Head } from '@inertiajs/react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useMemo, useState } from 'react';
import {
    FaBuilding,
    FaEdit,
    FaEnvelope,
    FaEye,
    FaFileExcel,
    FaFilePdf,
    FaMapMarkerAlt,
    FaPhone,
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
import DeleteCompanyModal from '@/Components/Modals/DeleteCompanyModal';
import TablePagination from '@/Components/Table/TablePagination';

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
                            <tr
                                key={headerGroup.id}
                                className="divide-x divide-gray-200"
                            >
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
                                <tr
                                    key={row.id}
                                    className="hover:bg-gray-50"
                                >
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

export default function Index({ auth, companies }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const columns = useMemo(
        () => [
            {
                Header: 'Company Information',
                columns: [
                    {
                        Header: 'Name',
                        accessor: 'name',
                        Cell: ({ value }) => (
                            <div className="flex items-center gap-2">
                                <FaBuilding className="text-gray-400" />
                                <span className="font-medium text-gray-900">{value}</span>
                            </div>
                        )
                    },
                    {
                        Header: 'Email',
                        accessor: 'email',
                        Cell: ({ value }) => (
                            <div className="flex items-center gap-2">
                                <FaEnvelope className="text-gray-400" />
                                <span>{value}</span>
                            </div>
                        )
                    }
                ]
            },
            {
                Header: 'Contact Details',
                columns: [
                    {
                        Header: 'Address',
                        accessor: 'address',
                        Cell: ({ value }) => (
                            <div className="flex items-center gap-2">
                                <FaMapMarkerAlt className="text-gray-400 flex-shrink-0" />
                                <span className="truncate max-w-xs">{value}</span>
                            </div>
                        )
                    },
                    {
                        Header: 'Phone',
                        accessor: 'phone',
                        Cell: ({ value }) => (
                            <div className="flex items-center gap-2">
                                <FaPhone className="text-gray-400" />
                                <span className="font-mono">{value}</span>
                            </div>
                        )
                    }
                ]
            },
            {
                Header: 'Actions',
                id: 'actions',
                Cell: ({ row }) => (
                    <div className="flex items-center gap-2">
                        <ActionButton
                            href={`/companies/${row.original.id}`}
                            icon={FaEye}
                            color="gray"
                            label="View"
                            className="!p-2"
                        />
                        <ActionButton
                            href={`/companies/${row.original.id}/edit`}
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
            await Inertia.delete(`/companies/${id}`);
            setShowDeleteModal(false);
        } catch (error) {
            console.error('Error deleting company:', error);
        }
    };

    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(companies.map(company => ({
            'Company Name': company.name,
            'Email': company.email,
            'Address': company.address,
            'Phone': company.phone
        })));

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Companies');
        XLSX.writeFile(workbook, 'companies_list.xlsx');
    };

    const downloadPDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.text('Companies List', 14, 15);
        doc.setFontSize(10);
        doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 25);

        doc.autoTable({
            head: [['Company Name', 'Email', 'Address', 'Phone']],
            body: companies.map(company => [
                company.name,
                company.email,
                company.address,
                company.phone
            ]),
            startY: 30,
            styles: { fontSize: 8 },
            headStyles: { fillColor: [51, 122, 183] }
        });

        doc.save('companies_list.pdf');
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Companies Management
                </h2>
            }
        >
            <Head title="Companies" />

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div className="relative w-full md:w-96">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaSearch className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            placeholder="Search companies..."
                            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <ActionButton
                            href="/companies/create"
                            icon={FaPlus}
                            label="Create Company"
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

                <Table
                    columns={columns}
                    data={companies.filter(company =>
                        searchQuery === '' ||
                        Object.values(company).some(value =>
                            String(value).toLowerCase().includes(searchQuery.toLowerCase())
                        )
                    )}
                />
            </div>

            <DeleteCompanyModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={() => handleDelete(deleteId)}
                companyName={companies.find(company => company.id === deleteId)?.name}
            />
        </AuthenticatedLayout>
    );
}
