import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router';
import { Menu, X, Calendar, Settings, LogOut, Plus, ChevronDown, ChevronUp, Sun, Moon } from 'lucide-react';
import sportifylogo from '../../assets/logo/sportifyLogo.png';
import { useAuth } from '../../hooks/hooks';
import { motion } from 'framer-motion';
import Loading from '../Loading';
import ScrollToTop from '../../pages/ScrollToTop/ScrollToTop';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logOut, loading } = useAuth();

    // 🌙 THEME TOGGLE STATE
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const handleLogout = () => {
        logOut().catch(console.error);
    };

    const links = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `block px-3 py-2 rounded-md transition-colors ${isActive
                            ? "bg-base-300 text-base font-semibold underline underline-offset-4"
                            : "hover:text-blue-600 hover:bg-gray-50 "
                        }`
                    }
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/events"
                    className={({ isActive }) =>
                        `block px-3 py-2 rounded-md transition-colors ${isActive
                            ? "bg-base-300 text-base font-semibold underline underline-offset-4"
                            : "hover:text-blue-600 hover:bg-gray-50 "
                        }`
                    }
                >
                    All Events
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/about"
                    className={({ isActive }) =>
                        `block px-3 py-2 rounded-md transition-colors ${isActive
                            ? "bg-base-300 text-base font-semibold underline underline-offset-4"
                            : "hover:text-blue-600 hover:bg-gray-50 "
                        }`
                    }
                >
                    About
                </NavLink>
            </li>
        </>
    );

    return (
        <nav className="top-0">
            <ScrollToTop />
            <div className="w-11/12 mx-auto">
                <div className="flex justify-between h-14 items-center relative">
                    <Link to="/" className="flex items-center space-x-2">
                        <img className="h-16" src={sportifylogo} alt="Sportify Logo" />
                    </Link>

                    {/* Desktop Navigation */}
                    <ul className="hidden md:flex items-center space-x-6">
                        <>
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `block px-3 py-2 rounded-md transition-colors ${isActive
                                            ? "bg-base-300 text-base font-semibold underline underline-offset-4"
                                            : "hover:text-blue-600 text-white hover:bg-gray-50  "
                                        }`
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/events"
                                    className={({ isActive }) =>
                                        `block px-3 py-2 rounded-md transition-colors ${isActive
                                            ? "bg-base-300 text-base font-semibold underline underline-offset-4"
                                            : "hover:text-blue-600 text-white hover:bg-gray-50  "
                                        }`
                                    }
                                >
                                    All Events
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/about"
                                    className={({ isActive }) =>
                                        `block px-3 py-2 rounded-md transition-colors ${isActive
                                            ? "bg-base-300 text-base font-semibold underline underline-offset-4"
                                            : "hover:text-blue-600 text-white hover:bg-gray-50  "
                                        }`
                                    }
                                >
                                    About
                                </NavLink>
                            </li>

                            {/* 🌙 Theme Toggle Button */}
                            <li>
                                <button
                                    onClick={toggleTheme}
                                    aria-label="Toggle theme"
                                    className="p-2 rounded-full bg-base-100 shadow-md hover:scale-110 transition-transform duration-300 flex items-center justify-center"
                                >
                                    {theme === 'light' ? (
                                        <Moon className="w-6 h-6 text-gray-800" />
                                    ) : (
                                        <Sun className="w-6 h-6 text-yellow-400" />
                                    )}
                                </button>
                            </li>
                        </>

                        {loading ? (
                            <Loading />
                        ) : user ? (
                            <div className="relative flex gap-6 items-center">
                                <div className="relative">
                                    <div className="group flex items-center cursor-pointer">
                                        <img
                                            src={user.photoURL}
                                            alt={user.displayName}
                                            className="h-12 w-12 rounded-full object-cover border-2 border-gray-300"
                                            onClick={() => setIsOpen(!isOpen)}
                                        />
                                        <span className="pointer-events-none absolute right-1/2 -translate-y-1/2 top-full mt-1 px-3 py-1 rounded bg-blue-600 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                            {user.displayName}
                                        </span>
                                        {isOpen ? (
                                            <ChevronUp onClick={() => setIsOpen(!isOpen)} className="text-white w-6 h-6" />
                                        ) : (
                                            <ChevronDown onClick={() => setIsOpen(!isOpen)} className="text-white w-6 h-6" />
                                        )}
                                    </div>

                                    {/* Dropdown menu - positioned below profile */}
                                    {isOpen && (
                                        <div className="absolute top-full mt-2 right-0 w-48 bg-base-100 rounded-md shadow-lg z-50">
                                            <ul className="py-2 text-sm ">
                                                <li>
                                                    <NavLink
                                                        to="/eventInfo/create-event"
                                                        className={({ isActive }) =>
                                                            ` rounded-md transition-colors flex gap-2 px-3 py-2 items-center ${isActive
                                                                ? "bg-base-300  underline underline-offset-4"
                                                                : "hover:text-blue-600 hover:bg-gray-50  "
                                                            }`
                                                        }
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        <Plus /> Create Event
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink
                                                        to="/eventInfo/myBookings"
                                                        className={({ isActive }) =>
                                                            ` rounded-md transition-colors flex gap-2 px-3 py-2 items-center ${isActive
                                                                ? "bg-base-300  underline underline-offset-4"
                                                                : "hover:text-blue-600 hover:bg-gray-50  "
                                                            }`
                                                        }
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        <Calendar /> My Bookings
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink
                                                        to="/eventInfo/manageEvents"
                                                        className={({ isActive }) =>
                                                            ` rounded-md transition-colors flex gap-2 px-3 py-2 items-center ${isActive
                                                                ? "bg-base-300  underline underline-offset-4"
                                                                : "hover:text-blue-600 hover:bg-gray-50  "
                                                            }`
                                                        }
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        <Settings /> Manage Events
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <button
                                                        onClick={handleLogout}
                                                        className="w-full text-lefttext-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 flex gap-2 px-3 py-2 items-center"
                                                    >
                                                        <LogOut /> Logout
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <button onClick={handleLogout} className="bg-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors text-white">
                                        Logout
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <NavLink
                                    to="/auth/login"
                                    className={({ isActive }) =>
                                        `block px-3 py-2 rounded-md transition-colors ${isActive
                                            ? "text-white underline underline-offset-4 font-semibold"
                                            : "hover:text-blue-600 hover:bg-gray-50 text-white"
                                        }`
                                    }
                                >
                                    Login
                                </NavLink>
                                <Link to="/auth/register" className="bg-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors text-white">
                                    Register
                                </Link>
                            </div>
                        )}
                    </ul>

                    {/* Mobile Hamburger Menu */}
                    <div className="md:hidden flex gap-2">
                        <button
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                            className="p-2 rounded-full bg-base-100 shadow-md hover:scale-110 transition-transform duration-300 flex items-center justify-center"
                        >
                            {theme === 'light' ? (
                                <Moon className="w-6 h-6 text-gray-800" />
                            ) : (
                                <Sun className="w-6 h-6 text-yellow-400" />
                            )}
                        </button>
                        <button onClick={() => setIsOpen(!isOpen)} className=" text-white">
                            {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu not use */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="bg-base-100 shadow-lg max-w-3xl mx-auto md:hidden"
                >
                    <ul className="px-2 bg-base-200 pt-3 pb-4 space-y-1 sm:px-3 shadow-md ">
                        <div className='md:hidden'>
                            {links}
                        </div>

                        {user ? (
                            <>
                                {/* Profile Header */}
                                <div className="flex items-center px-3 py-3 border-t border-gray-200 md:border-0">
                                    <img
                                        src={user.photoURL}
                                        alt={user.name}
                                        className="h-12 w-12 rounded-full object-cover border-2 border-primary"
                                    />
                                    <span className="ml-3 text-sm font-semibold">
                                        {user.displayName}
                                    </span>
                                </div>

                                {/* Menu Items */}
                                <li>
                                    <NavLink
                                        onClick={() => setIsOpen(false)}
                                        to="/eventInfo/create-event"
                                        className="flex gap-2 px-3 py-2 items-center rounded-md hover:bg-primary/10 "
                                    >
                                        <Plus /> Create Event
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        onClick={() => setIsOpen(false)}
                                        to="/eventInfo/myBookings"
                                        className="flex gap-2 px-3 py-2 items-center rounded-md hover:bg-primary/10 "
                                    >
                                        <Calendar /> My Bookings
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        onClick={() => setIsOpen(false)}
                                        to="/eventInfo/manageEvents"
                                        className="flex gap-2 px-3 py-2 items-center rounded-md hover:bg-primary/10 "
                                    >
                                        <Settings /> Manage Events
                                    </NavLink>
                                </li>
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex gap-2 items-center text-left px-3 py-2 cursor-pointer rounded-md hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400"
                                    >
                                        <LogOut /> Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <NavLink
                                        to="/auth/login"
                                        className="flex gap-2 px-3 py-2 items-center rounded-md hover:bg-primary/10 "
                                    >
                                        Login
                                    </NavLink>
                                </li>
                                <li>
                                    <Link
                                        to="/auth/register"
                                        className="block px-3 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition"
                                    >
                                        Register
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </motion.div>
            )}
        </nav>
    );
};

export default Navbar;
