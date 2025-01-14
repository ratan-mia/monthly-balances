import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import { Head } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import {
    FaBuilding,
    FaChevronDown,
    FaChevronUp,
    FaEdit,
    FaEnvelope,
    FaSearch,
    FaTrash,
    FaUserCircle,
    FaUserTag
} from 'react-icons/fa';
import { usePagination, useSortBy, useTable } from 'react-table';

// Import our custom components
import ActionButton from '@/Components/Buttons/ActionButton';
import DeleteUserModal from '@/Components/Modals/DeleteUserModal';
import EditUserModal from '@/Components/Modals/EditUserModal';
import TablePagination from '@/Components/Table/TablePagination';

const RoleBadge = ({ role }) => {
    const colors = {
        admin: 'bg-red-100 text-red-800',
        manager: 'bg-blue-100 text-blue-800',
        user: 'bg-green-100 text-green-800',
        default: 'bg-gray-100 text-gray-800'
    };

    const colorClass = colors[role.toLowerCase()] || colors.default;

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
            {role}
        </span>
    );
};

const CompanyBadge = ({ company }) => (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
        <FaBuilding className="mr-1 w-3 h-3" />
        {company.name}
    </span>
);

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
                        {headerGroups.map(headerGroup => {
                            const { key, ...headerGroupProps } = headerGroup.getHeaderGroupProps();
                            return (
                                <tr key={key} {...headerGroupProps}>
                                    {headerGroup.headers.map(column => {
                                        const { key, ...columnProps } = column.getHeaderProps(column.getSortByToggleProps());
                                        return (
                                            <th
                                                key={key}
                                                {...columnProps}
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                <div className="flex items-center space-x-1">
                                                    <span>{column.render('Header')}</span>
                                                    {column.isSorted ? (
                                                        column.isSortedDesc ? (
                                                            <FaChevronDown className="w-4 h-4" />
                                                        ) : (
                                                            <FaChevronUp className="w-4 h-4" />
                                                        )
                                                    ) : null}
                                                </div>
                                            </th>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {page.map(row => {
                            prepareRow(row);
                            const { key, ...rowProps } = row.getRowProps();
                            return (
                                <tr key={key} {...rowProps} className="hover:bg-gray-50">
                                    {row.cells.map(cell => {
                                        const { key, ...cellProps } = cell.getCellProps();
                                        return (
                                            <td
                                                key={key}
                                                {...cellProps}
                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                            >
                                                {cell.render('Cell')}
                                            </td>
                                        );
                                    })}
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
export default function UserIndex({ auth, users, roles, companies }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const columns = useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name',
                Cell: ({ value }) => (
                    <div className="flex items-center gap-2">
                        <FaUserCircle className="text-gray-400 w-5 h-5" />
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
            },
            {
                Header: 'Role',
                accessor: 'roles',
                Cell: ({ value }) => (
                    <div className="flex items-center gap-2">
                        <FaUserTag className="text-gray-400" />
                        <div className="flex gap-1">
                            {value && value.map(role => (
                                <RoleBadge key={`role-${role.id}`} role={role.name} />
                            ))}
                        </div>
                    </div>
                )
            },
            {
                Header: 'Companies',
                accessor: 'companies',
                Cell: ({ value }) => (
                    <div className="flex flex-wrap gap-1">
                        {value && value.map(company => (
                            <CompanyBadge key={`company-${company.id}`} company={company} />
                        ))}
                    </div>
                )
            },
            {
                Header: 'Actions',
                id: 'actions',
                Cell: ({ row }) => (
                    <div className="flex items-center gap-2">
                        <ActionButton
                            onClick={() => {
                                setSelectedUser(row.original);
                                setShowEditModal(true);
                            }}
                            icon={FaEdit}
                            color="yellow"
                            label="Edit"
                            className="!p-2"
                        />
                        <ActionButton
                            onClick={() => {
                                setSelectedUser(row.original);
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

    const handleUpdateProfile = async (updatedData) => {
        try {
            await Inertia.put(`/users/${selectedUser.id}`, updatedData);
            setShowEditModal(false);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await Inertia.delete(`/users/${id}`);
            setShowDeleteModal(false);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const filteredData = users.filter(user =>
        searchQuery === '' ||
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.roles.some(role => role.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (user.companies && user.companies.some(company =>
            company.name.toLowerCase().includes(searchQuery.toLowerCase())
        ))
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    User Management
                </h2>
            }
        >
            <Head title="User Management" />

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div className="relative w-full md:w-96">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaSearch className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            placeholder="Search users..."
                            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                        />
                    </div>
                </div>

                <Table
                    columns={columns}
                    data={filteredData}
                />
            </div>

            <EditUserModal
                isOpen={showEditModal}
                onClose={() => setShowEditModal(false)}
                onConfirm={handleUpdateProfile}
                user={selectedUser}
                roles={roles}
                companies={companies}
            />

            <DeleteUserModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={() => handleDelete(selectedUser?.id)}
                userName={selectedUser?.name}
            />
        </AuthenticatedLayout>
    );
}
