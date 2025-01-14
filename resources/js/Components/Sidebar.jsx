import NavLink from '@/Components/NavLink';
import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import {
    FaBars,
    FaBuilding,
    FaChevronLeft,
    FaChevronRight,
    FaCog,
    FaHome,
    FaMoneyBillWave,
    FaMoneyCheckAlt,
    FaUser,
    FaUsers
} from 'react-icons/fa';

const Sidebar = ({ isSidebarCollapsed, setIsSidebarCollapsed }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeGroup, setActiveGroup] = useState(null);

    // Close sidebar on route change for mobile
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [route().current()]);

    const menuItems = [
        {
            group: 'Overview',
            items: [
                { href: 'dashboard', icon: <FaHome className="transition-transform group-hover:scale-110" />, label: 'Dashboard' }
            ]
        },
        {
            group: 'Financial',
            items: [
                { href: 'banks.index', icon: <FaBuilding className="transition-transform group-hover:scale-110" />, label: 'Bank Accounts' },
                { href: 'balances.index', icon: <FaMoneyBillWave className="transition-transform group-hover:scale-110" />, label: 'Balances' },
            ]
        },
        {
            group: 'Management',
            items: [
                { href: 'companies.index', icon: <FaBuilding className="transition-transform group-hover:scale-110" />, label: 'Companies' },
                { href: 'account-types.index', icon: <FaCog className="transition-transform group-hover:scale-110" />, label: 'Account Types' },
            ]
        },
        {
            group: 'Loans',
            items: [
                { href: 'loan-types.index', icon: <FaMoneyCheckAlt className="transition-transform group-hover:scale-110" />, label: 'Loan Types' },
                { href: 'loans.index', icon: <FaMoneyCheckAlt className="transition-transform group-hover:scale-110" />, label: 'Loan Summary' },
            ]
        },
        {
            group: 'Administration',
            items: [
                { href: 'users.index', icon: <FaUsers className="transition-transform group-hover:scale-110" />, label: 'Users Management' },
            ]
        },
    ];

    return (
        <>
            {/* Mobile Hamburger Button */}
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-lg shadow-lg focus:outline-none hover:bg-gray-700 transition-colors"
                aria-label="Toggle Menu"
            >
                <FaBars className="text-xl" />
            </button>

            {/* Sidebar Container */}
            <div
                className={`
                    fixed lg:static top-0 left-0 h-screen z-40
                    bg-gray-900 text-gray-100
                    transition-all duration-300 ease-in-out
                    ${isSidebarCollapsed ? 'w-20' : 'w-64'}
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                    flex flex-col
                    shadow-xl
                `}
            >
                {/* Sidebar Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-700">
                    <Link
                        href="/"
                        className={`transition-opacity duration-200 ${isSidebarCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}
                    >
                        <img
                            src="https://asianholdings.com.bd/wp-content/uploads/2022/10/Asian-Holdings_W2-e1667211466563.png"
                            alt="Asian Holdings"
                            className="h-8 w-auto"
                        />
                    </Link>

                    {/* Collapse Toggle Button */}
                    <button
                        onClick={() => setIsSidebarCollapsed(prev => !prev)}
                        className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-700 transition-colors"
                        aria-label={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
                    >
                        {isSidebarCollapsed ? (
                            <FaChevronRight className="w-4 h-4" />
                        ) : (
                            <FaChevronLeft className="w-4 h-4" />
                        )}
                    </button>
                </div>

                {/* Sidebar Content */}
                <div className="flex-1 overflow-y-auto py-4 space-y-2">
                    {menuItems.map((menuGroup, groupIndex) => (
                        <div key={groupIndex} className="px-3">
                            {/* Group Label */}
                            {!isSidebarCollapsed && (
                                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 py-2">
                                    {menuGroup.group}
                                </div>
                            )}

                            {/* Group Items */}
                            {menuGroup.items.map(({ href, icon, label }) => (
                                <NavLink
                                    key={href}
                                    href={route(href)}
                                    className={`
                                        group flex items-center gap-x-3 px-3 py-2 rounded-lg
                                        transition-all duration-200
                                        hover:bg-gray-800
                                        ${route().current(href) ? 'bg-gray-800 text-white' : 'text-gray-300 hover:text-white'}
                                    `}
                                >
                                    <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                                        {icon}
                                    </div>

                                    {!isSidebarCollapsed && (
                                        <span className="text-sm font-medium truncate">
                                            {label}
                                        </span>
                                    )}
                                </NavLink>
                            ))}
                        </div>
                    ))}
                </div>

                {/* Sidebar Footer */}
                {!isSidebarCollapsed && (
                    <div className="border-t border-gray-700 p-4">
                        <div className="flex items-center gap-x-4">
                            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                                <FaUser className="w-4 h-4" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium">Admin User</p>
                                <p className="text-xs text-gray-400">admin@example.com</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </>
    );
};

export default Sidebar;
