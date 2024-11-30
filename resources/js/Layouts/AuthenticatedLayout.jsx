import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [showingSidebar, setShowingSidebar] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // Track sidebar collapsed state

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <div
                className={`bg-gray-800 text-white transition-all duration-300 ${isSidebarCollapsed ? 'w-20' : 'w-64'} space-y-6 py-7 px-2 absolute sm:relative left-0`}
            >
                <div className="flex items-center justify-between">
                    <Link href="/" className="text-2xl font-semibold text-white">
                        <ApplicationLogo className="h-9 w-auto" />
                    </Link>
                    {/* Toggle button for collapsing/expanding sidebar */}
                    <button
                        onClick={() => setIsSidebarCollapsed(prev => !prev)}
                        className="text-white sm:hidden p-2"
                    >
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
                    </button>
                </div>

                {/* Sidebar Menu as Block Divs */}
                <div className="space-y-4">
                    <div className="block">
                        <NavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                        >
                            {isSidebarCollapsed ? 'D' : 'Dashboard'}
                        </NavLink>
                    </div>

                    <div className="block">
                        <NavLink
                            href={route('banks.index')}
                            active={route().current('banks.index')}
                        >
                            {isSidebarCollapsed ? 'B' : 'Banks'}
                        </NavLink>
                    </div>

                    <div className="block">
                        <NavLink
                            href={route('companies.index')}
                            active={route().current('companies.index')}
                        >
                            {isSidebarCollapsed ? 'C' : 'Companies'}
                        </NavLink>
                    </div>

                    <div className="block">
                        <NavLink
                            href={route('account-types.index')}
                            active={route().current('account-types.index')}
                        >
                            {isSidebarCollapsed ? 'A' : 'Account Types'}
                        </NavLink>
                    </div>

                    <div className="block">
                        <NavLink
                            href={route('balances.index')}
                            active={route().current('balances.index')}
                        >
                            {isSidebarCollapsed ? 'B' : 'Balances'}
                        </NavLink>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 transition-all duration-300">
                <nav className="border-b border-gray-100 bg-white dark:border-gray-700 dark:bg-cyan-800">
                    <div className="mx-auto w-full  sm:px-6 lg:px-8">
                        <div className="flex h-16 justify-between">
                            <div className="flex">
                                {/* Mobile sidebar toggle */}
                                <div className="flex sm:hidden">
                                    <button
                                        onClick={() => setShowingSidebar(true)}
                                        className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none dark:text-gray-500 dark:hover:bg-gray-900 dark:hover:text-gray-400 dark:focus:bg-gray-900 dark:focus:text-gray-400"
                                    >
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
                                    </button>
                                </div>

                                {/* Desktop nav links */}
                                <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                    <NavLink
                                        href={route('dashboard')}
                                        active={route().current('dashboard')}
                                    >
                                        Dashboard
                                    </NavLink>
                                    <NavLink
                                        href={route('banks.index')}
                                        active={route().current('banks.index')}
                                    >
                                        Banks
                                    </NavLink>
                                    <NavLink
                                        href={route('companies.index')}
                                        active={route().current('companies.index')}
                                    >
                                        Companies
                                    </NavLink>
                                    <NavLink
                                        href={route('account-types.index')}
                                        active={route().current('account-types.index')}
                                    >
                                        Account Types
                                    </NavLink>
                                    <NavLink
                                        href={route('balances.index')}
                                        active={route().current('balances.index')}
                                    >
                                        Balances
                                    </NavLink>
                                </div>
                            </div>

                            <div className="hidden sm:ms-6 sm:flex sm:items-center">
                                <div className="relative ms-3">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none dark:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
                                                >
                                                    {user.name}
                                                    <svg
                                                        className="-me-0.5 ms-2 h-4 w-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link href={route('profile.edit')}>
                                                Profile
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href={route('logout')}
                                                method="post"
                                                as="button"
                                            >
                                                Log Out
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Header */}
                {header && (
                    <header className="bg-white shadow dark:bg-gray-900">
                        <div className="w-full px-4 py-6 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}

                {/* Main content */}
                <main>{children}</main>
            </div>
        </div>
    );
}
