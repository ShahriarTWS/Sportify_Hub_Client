import React, { useState } from 'react';
import { Link, NavLink } from 'react-router';
import { Menu, X, Calendar, Settings, LogOut, Plus } from 'lucide-react';
import sportifylogo from '../../assets/logo/sportifyLogo.png';
import { useAuth } from '../../hooks/hooks';
import { motion } from 'framer-motion';

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const { user, logOut } = useAuth();

    const handleLogout = () => {
        logOut()
            .then(() => console.log('Logged out'))
            .catch(console.error);
    };

    const links = (
        <>
            <li>
                <NavLink to="/" className="block px-3 py-2 hover:text-blue-600 hover:bg-gray-50 rounded-md">
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/events" className="block px-3 py-2 hover:text-blue-600 hover:bg-gray-50 rounded-md">
                    Events
                </NavLink>
            </li>
        </>
    );


    return (
        <nav className=" top-0 ">
            <div className="max-w-7xl mx-auto ">
                <div className="flex justify-between h-16 items-center relative">
                    <Link to="/" className="flex items-center space-x-2">
                        <img className="h-16" src={sportifylogo} alt="Sportify Logo" />
                    </Link>

                    {/* Desktop Navigation */}
                    <ul className="hidden md:flex items-center space-x-6 text-base-200">
                        {links}
                        {user ? (
                            <div className="relative"> {/* Make dropdown position scoped */}
                                <div className="group flex items-center space-x-2 cursor-pointer">
                                    <img
                                        src={user.photoURL}
                                        alt={user.displayName}
                                        className="h-12 w-12 rounded-full object-cover border-2 border-gray-300"
                                        // onClick={() => setShowProfileMenu(!showProfileMenu)}
                                        onClick={() => setIsOpen(!isOpen)}
                                    />
                                    {/* Optional: name on hover */}
                                    <span className="pointer-events-none absolute right-1/2 -translate-y-1/2 top-full mt-1 px-3 py-1 rounded bg-blue-600 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        {user.displayName}
                                    </span>
                                </div>

                                {/* Dropdown Menu */}
                                {showProfileMenu && (
                                    <div className=" absolute -right-50 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg ">
                                        <Link to="/create-event" onClick={() => setShowProfileMenu(false)} className="flex items-center px-4 py-2 text-sm hover:bg-gray-100">
                                            <Plus className="h-4 w-4 mr-2" /> Create Event
                                        </Link>
                                        <Link to="/my-bookings" onClick={() => setShowProfileMenu(false)} className="flex items-center px-4 py-2 text-sm hover:bg-gray-100">
                                            <Calendar className="h-4 w-4 mr-2" /> My Bookings
                                        </Link>
                                        <Link to="/manage-events" onClick={() => setShowProfileMenu(false)} className="flex items-center px-4 py-2 text-sm hover:bg-gray-100">
                                            <Settings className="h-4 w-4 mr-2" /> Manage Events
                                        </Link>
                                        <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 text-left">
                                            <LogOut className="h-4 w-4 mr-2" /> Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <NavLink to="/auth/login" className="hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                    Login
                                </NavLink>
                                <Link to="/auth/register" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                                    Register
                                </Link>
                            </div>
                        )}
                    </ul>

                    {/* Mobile Hamburger Menu */}
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-base-100 focus:outline-none">
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white shadow-lg "
                >
                    <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {links}
                        {user ? (
                            <>
                                <div className="flex items-center px-3 py-2 border-t border-gray-200">
                                    <img
                                        src={user.photoURL}
                                        alt={user.name}
                                        className="h-12 w-12 rounded-full object-cover border-2 border-gray-300 mr-3"
                                    />
                                    <span className="text-sm font-medium text-gray-900">{user.displayName}</span>
                                </div>
                                <li><Link to="/events/create-event" className="block px-3 py-2">Create Event</Link></li>
                                <li><Link to="/my-bookings" className="block px-3 py-2">My Bookings</Link></li>
                                <li><Link to="/manage-events" className="block px-3 py-2">Manage Events</Link></li>
                                <li><button onClick={handleLogout} className="w-full text-left px-3 py-2 cursor-pointer">Logout</button></li>
                            </>
                        ) : (
                            <>
                                <li><NavLink to="/auth/login" className="block px-3 py-2">Login</NavLink></li>
                                <li><Link to="/auth/register" className="block px-3 py-2 ">Register</Link></li>
                            </>
                        )}
                    </ul>
                </motion.div>

            )}
        </nav>
    );
};

export default Navbar;
