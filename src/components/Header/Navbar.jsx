import React, { useState } from 'react';
import { Link, NavLink } from 'react-router';
import { Menu, X, Calendar, Settings, LogOut, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import sportifylogo from '../../assets/logo/sportifyLogo.png';
import { useAuth } from '../../hooks/hooks';
import { motion } from 'framer-motion';
import Loading from '../Loading';
import ScrollToTop from '../../pages/ScrollToTop/ScrollToTop';

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);
    // const [showProfileMenu, setShowProfileMenu] = useState(false);
    const { user, logOut, loading } = useAuth();

    const handleLogout = () => {
        logOut()
            .then(() => {

            })
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
                    All Events
                </NavLink>
            </li>
        </>
    );


    return (
        <nav className=" top-0 ">
            <ScrollToTop></ScrollToTop>
            <div className="max-w-7xl mx-auto px-4 md:px-4">
                <div className="flex justify-between h-14 items-center relative">
                    <Link to="/" className="flex items-center space-x-2">
                        <img className="h-16" src={sportifylogo} alt="Sportify Logo" />
                    </Link>

                    {/* Desktop Navigation */}
                    <ul className="hidden md:flex items-center space-x-6 text-base-200">
                        {links}
                        {
                            loading ? (
                                <Loading />
                            ) : user ? (
                                <div className="relative flex gap-6 items-center">
                                    <div>
                                        <div className="group flex items-center  cursor-pointer">
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
                                    </div>
                                    <div>

                                        <button onClick={handleLogout} className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors ">
                                            Logout
                                        </button>
                                    </div>
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
                            )
                        }
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
                                <li><NavLink onClick={() => setIsOpen(false)} to="/eventInfo/create-event" className=" flex gap-2 px-3 py-2"><Plus></Plus>Create Event</NavLink></li>
                                <li><NavLink onClick={() => setIsOpen(false)} to="/eventInfo/myBookings" className="flex gap-2 px-3 py-2"><Calendar></Calendar>My Bookings</NavLink></li>
                                <li><NavLink onClick={() => setIsOpen(false)} to="/eventInfo/manageEvents" className="flex gap-2 px-3 py-2"><Settings></Settings>Manage Events</NavLink></li>
                                <li><button onClick={handleLogout} className="w-full flex gap-2 text-left px-3 py-2 cursor-pointer"><LogOut></LogOut>Logout</button></li>
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
