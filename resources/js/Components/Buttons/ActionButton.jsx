import { Link } from '@inertiajs/react';

const ActionButton = ({
    onClick,
    href,
    icon: Icon,
    label,
    color = "blue",
    type = "button",
    disabled = false,
    className = "",
    isLoading = false
}) => {
    const baseClasses = `
        inline-flex items-center gap-2
        text-sm font-medium px-4 py-2
        rounded-lg shadow-sm
        focus:outline-none focus:ring-2 focus:ring-offset-2
        transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
    `;

    const colorClasses = {
        blue: 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-400',
        red: 'bg-white text-red-600 border border-red-600 hover:bg-red-600 hover:text-white focus:ring-red-400',
        green: 'bg-white text-green-600 border border-green-600 hover:bg-green-600 hover:text-white focus:ring-green-400',
        yellow: 'bg-white text-yellow-600 border border-yellow-600 hover:bg-yellow-600 hover:text-white focus:ring-yellow-400',
        gray: 'bg-white text-gray-600 border border-gray-600 hover:bg-gray-600 hover:text-white focus:ring-gray-400'
    };

    const buttonContent = (
        <>
            {isLoading ? (
                <svg
                    className="animate-spin h-5 w-5 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                </svg>
            ) : Icon && (
                <Icon className="w-4 h-4" aria-hidden="true" />
            )}
            <span>{label}</span>
        </>
    );

    if (href) {
        return (
            <Link
                href={href}
                className={`${baseClasses} ${colorClasses[color]}`}
            >
                {buttonContent}
            </Link>
        );
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`${baseClasses} ${colorClasses[color]}`}
        >
            {buttonContent}
        </button>
    );
};

export default ActionButton;
