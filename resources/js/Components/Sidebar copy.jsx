import ApplicationLogo from '@/Components/ApplicationLogo';
import NavLink from '@/Components/NavLink';
import { Link } from '@inertiajs/react';
import { FaBuilding, FaCog, FaHome, FaMoneyBillWave, FaMoneyCheckAlt, FaUsers } from 'react-icons/fa';

const Sidebar = ({ isSidebarCollapsed, setIsSidebarCollapsed }) => {
    return (
        <div
            className={`bg-gray-800 text-white transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'w-20' : 'w-64'} space-y-6 py-7 px-2 fixed top-0 left-0 h-screen z-50`}
        >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between px-4">
                <Link href="/" className="text-2xl font-semibold text-white">
                    <ApplicationLogo className="h-9 w-auto" />
                </Link>

                {/* Hamburger Button */}
                {/* <button
                    onClick={() => setIsSidebarCollapsed(prev => !prev)}
                    className="text-white p-2 transition duration-300 ease-in-out transform hover:scale-110"
                >
                    {isSidebarCollapsed ? (
                        <FaBars className="h-6 w-6" />
                    ) : (
                        <FaBars className="h-6 w-6" />
                    )}
                </button> */}
            </div>

            {/* Sidebar Menu */}
            <div className="space-y-4 mt-6">
                {[
                    { href: 'dashboard', icon: <FaHome />, label: 'Dashboard' },
                    { href: 'banks.index', icon: <FaBuilding />, label: 'Banks Accounts' },
                    { href: 'companies.index', icon: <FaBuilding />, label: 'Companies' },
                    { href: 'account-types.index', icon: <FaCog />, label: 'Account Types' },
                    { href: 'loan-types.index', icon: <FaMoneyCheckAlt />, label: 'Loan Types' },
                    { href: 'loans.index', icon: <FaMoneyCheckAlt />, label: 'Loan Summary' },
                    { href: 'balances.index', icon: <FaMoneyBillWave />, label: 'Balances' },
                    { href: 'users.index', icon: <FaUsers />, label: 'Users Management' }
                ].map(({ href, icon, label }) => (
                    <div key={href} className="block">
                        <NavLink
                            href={route(href)}
                            active={route().current(href)}
                            className={`flex items-center space-x-4 p-2 rounded transition-all duration-300 ease-in-out hover:bg-gray-700 ${route().current(href) ? 'bg-gray-600' : ''}`}
                        >
                            <span className="text-2xl">{icon}</span>
                            {/* Show label only when sidebar is expanded */}
                            {!isSidebarCollapsed && (
                                <span className="transition-all duration-200 ease-in-out">{label}</span>
                            )}
                        </NavLink>
                    </div>
                ))}
            </div>

            {/* Sidebar Footer (Optional) */}
            {!isSidebarCollapsed && (
                <div className="absolute bottom-10 left-0 px-4 py-2 text-center text-gray-400 text-xs">
                    <span>&copy; 2024 Asian Holdings</span>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
