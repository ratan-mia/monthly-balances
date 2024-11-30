import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, NavLink } from '@inertiajs/react';
import { useState } from 'react';

export default function Sidebar() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    return (
        <div
            className={`bg-gray-800 text-white transition-all duration-300 ${isSidebarCollapsed ? 'w-20' : 'w-64'} space-y-6 py-7 px-2 absolute sm:relative left-0`}
        >
            {/* Sidebar Header with Logo and Toggle */}
            <div className="flex items-center justify-between mb-8">
                <Link href="/" className="text-2xl font-semibold text-white">
                    <ApplicationLogo className="h-9 w-auto" />
                </Link>

                {/* Toggle button for collapsing/expanding sidebar */}
                <button
                    onClick={() => setIsSidebarCollapsed(prev => !prev)}
                    className="text-white sm:hidden p-2 rounded-md hover:bg-gray-700 focus:outline-none"
                >
                    {isSidebarCollapsed ? (
                        <svg
                            className="h-6 w-6"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    ) : (
                        <svg
                            className="h-6 w-6"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    )}
                </button>
            </div>

            {/* Sidebar Menu */}
            <div className="space-y-4">
                <div className="block">
                    <NavLink
                        href={route('dashboard')}
                        active={route().current('dashboard')}
                        className="flex items-center space-x-4 px-4 py-2 rounded-md hover:bg-gray-700 transition-all"
                    >
                        <span className="text-xl">{isSidebarCollapsed ? 'D' : 'Dashboard'}</span>
                    </NavLink>
                </div>

                <div className="block">
                    <NavLink
                        href={route('banks.index')}
                        active={route().current('banks.index')}
                        className="flex items-center space-x-4 px-4 py-2 rounded-md hover:bg-gray-700 transition-all"
                    >
                        <span className="text-xl">{isSidebarCollapsed ? 'B' : 'Banks'}</span>
                    </NavLink>
                </div>

                <div className="block">
                    <NavLink
                        href={route('companies.index')}
                        active={route().current('companies.index')}
                        className="flex items-center space-x-4 px-4 py-2 rounded-md hover:bg-gray-700 transition-all"
                    >
                        <span className="text-xl">{isSidebarCollapsed ? 'C' : 'Companies'}</span>
                    </NavLink>
                </div>

                <div className="block">
                    <NavLink
                        href={route('account-types.index')}
                        active={route().current('account-types.index')}
                        className="flex items-center space-x-4 px-4 py-2 rounded-md hover:bg-gray-700 transition-all"
                    >
                        <span className="text-xl">{isSidebarCollapsed ? 'A' : 'Account Types'}</span>
                    </NavLink>
                </div>

                <div className="block">
                    <NavLink
                        href={route('balances.index')}
                        active={route().current('balances.index')}
                        className="flex items-center space-x-4 px-4 py-2 rounded-md hover:bg-gray-700 transition-all"
                    >
                        <span className="text-xl">{isSidebarCollapsed ? 'B' : 'Balances'}</span>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}
