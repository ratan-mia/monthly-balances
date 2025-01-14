import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const TablePagination = ({
    pageSize,
    setPageSize,
    pageIndex,
    pageCount,
    canPreviousPage,
    canNextPage,
    previousPage,
    nextPage,
    pageSizeOptions = [5, 10, 25, 50]
}) => {
    return (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Page Size Selector */}
                <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-700">
                        Show
                        <select
                            value={pageSize}
                            onChange={e => setPageSize(Number(e.target.value))}
                            className="mx-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        >
                            {pageSizeOptions.map(size => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                        entries
                    </label>
                </div>

                {/* Navigation Controls */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={previousPage}
                        disabled={!canPreviousPage}
                        className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <FaChevronLeft className="w-4 h-4 mr-1" />
                        Previous
                    </button>

                    <span className="text-sm text-gray-700">
                        Page{' '}
                        <span className="font-medium">{pageIndex + 1}</span>
                        {' '}of{' '}
                        <span className="font-medium">{pageCount}</span>
                    </span>

                    <button
                        onClick={nextPage}
                        disabled={!canNextPage}
                        className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                        <FaChevronRight className="w-4 h-4 ml-1" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TablePagination;
