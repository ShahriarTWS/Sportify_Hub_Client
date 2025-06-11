import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { Trophy, Menu, X, User, Calendar, Settings, LogOut, Plus } from 'lucide-react';
import sportifylogo from '../../assets/logo/sportifyLogo.png';


const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    
    const user = false;
    const navigate = useNavigate();

 

    return (
        <nav className=" shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2 ">
                            <img className='h-16' src={sportifylogo} alt="" />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8 text-base-200">
                        <NavLink to="/" className=" hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                            Home
                        </NavLink>

                        <NavLink to="/events" className=" hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                            Events
                        </NavLink>

                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                                    className="flex items-center space-x-2  hover:text-blue-600 transition-colors"
                                    title={user.name}
                                >
                                    <img
                                        src={user.profilePicture}
                                        alt={user.name}
                                        className="h-8 w-8 rounded-full object-cover border-2 border-gray-300"
                                    />
                                    <span className="text-sm font-medium">{user.name}</span>
                                </button>

                                {showProfileMenu && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md text-base-200 shadow-lg py-1 z-50">
                                        <Link
                                            to="/create-event"
                                            className="flex items-center px-4 py-2 text-sm  hover:bg-gray-100"
                                            onClick={() => setShowProfileMenu(false)}
                                        >
                                            <Plus className="h-4 w-4 mr-2" />
                                            Create Event
                                        </Link>
                                        <Link
                                            to="/my-bookings"
                                            className="flex items-center px-4 py-2 text-sm  hover:bg-gray-100"
                                            onClick={() => setShowProfileMenu(false)}
                                        >
                                            <Calendar className="h-4 w-4 mr-2" />
                                            My Bookings
                                        </Link>
                                        <Link
                                            to="/manage-events"
                                            className="flex items-center px-4 py-2 text-sm  hover:bg-gray-100"
                                            onClick={() => setShowProfileMenu(false)}
                                        >
                                            <Settings className="h-4 w-4 mr-2" />
                                            Manage Events
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center w-full px-4 py-2 text-sm  hover:bg-gray-100"
                                        >
                                            <LogOut className="h-4 w-4 mr-2" />
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4 text-base-200">
                                <Link
                                    to="/login"
                                    className=" hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className=" text-base-100  focus:outline-none "
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
                        <NavLink to="/" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">
                            Home
                        </NavLink>
                        <NavLink to="/events" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">
                            Events
                        </NavLink>

                        {user ? (
                            <>
                                <div className="flex items-center px-3 py-2 border-t border-gray-200">
                                    <img
                                        src={user.profilePicture}
                                        alt={user.name}
                                        className="h-8 w-8 rounded-full object-cover border-2 border-gray-300 mr-3"
                                    />
                                    <span className="text-sm font-medium text-gray-900">{user.name}</span>
                                </div>
                                <Link to="/create-event" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">
                                    Create Event
                                </Link>
                                <Link to="/my-bookings" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">
                                    My Bookings
                                </Link>
                                <Link to="/manage-events" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">
                                    Manage Events
                                </Link>
                                <button
                                    // onClick={handleLogout}
                                    className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">
                                    Login
                                </Link>
                                <Link to="/register" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;