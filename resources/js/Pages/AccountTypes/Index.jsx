import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import { Head } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import {
    FaEdit,
    FaInfoCircle,
    FaPlus,
    FaSearch,
    FaTrash
} from 'react-icons/fa';
import { usePagination, useSortBy, useTable } from 'react-table';

// Import our custom components
import ActionButton from '@/Components/Buttons/ActionButton';
import DeleteAccountTypeModal from '@/Components/Modals/DeleteAccountTypeModal';
import TablePagination from '@/Components/Table/TablePagination';

const Table = ({ columns, data }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        state,
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
        useSortBy,
        usePagination
    );

    const { pageIndex, pageSize } = state;

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

export default function Index({ auth, accountTypes }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const columns = useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name',
                Cell: ({ value }) => (
                    <div className="font-medium text-gray-900">{value}</div>
                )
            },
            {
                Header: 'Description',
                accessor: 'description',
                Cell: ({ value }) => (
                    <div className="flex items-start gap-2">
                        <FaInfoCircle className="text-gray-400 mt-1 flex-shrink-0" />
                        <span className="text-gray-600">{value || 'N/A'}</span>
                    </div>
                )
            },
            {
                Header: 'Actions',
                id: 'actions',
                Cell: ({ row }) => (
                    <div className="flex items-center gap-2">
                        <ActionButton
                            href={route('account-types.edit', row.original.id)}
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

    const handleDelete = async (id) => {
        try {
            await Inertia.delete(`/account-types/${id}`);
            setShowDeleteModal(false);
        } catch (error) {
            console.error('Error deleting account type:', error);
        }
    };

    const filteredData = accountTypes.filter(accountType =>
        searchQuery === '' ||
        Object.values(accountType).some(value =>
            String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Account Types Management
                </h2>
            }
        >
            <Head title="Account Types" />

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div className="relative w-full md:w-96">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaSearch className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            placeholder="Search account types..."
                            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                        />
                    </div>

                    <div className="flex items-center">
                        <ActionButton
                            href={route('account-types.create')}
                            icon={FaPlus}
                            label="Create Account Type"
                            color="green"
                        />
                    </div>
                </div>

                <Table
                    columns={columns}
                    data={filteredData}
                />
            </div>

            <DeleteAccountTypeModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={() => handleDelete(deleteId)}
                accountTypeName={accountTypes.find(at => at.id === deleteId)?.name}
            />
        </AuthenticatedLayout>
    );
}
