import React from 'react';
import { Trophy, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';
import { Link, NavLink } from 'react-router';
import sportifylogo from '../../assets/logo/sportifyLogo.png';

const Footer = () => {
    return (
        <footer className="bg-primary text-white">
            <div className="w-11/12 mx-auto py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center">
                            <Link to="/" className="flex items-center space-x-2 ">
                                <img className='h-16' src={sportifylogo} alt="" />
                            </Link>
                        </div>
                        <p className="text-gray-300 mb-4 max-w-md">
                            Your premier destination for athletic events. Connect with fellow athletes,
                            discover exciting competitions, and push your limits to achieve greatness.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                                <Instagram className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <NavLink to={'/'} className="text-gray-300 hover:text-white transition-colors">Home</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/events'} className="text-gray-300 hover:text-white transition-colors">Events</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/about'} className="text-gray-300 hover:text-white transition-colors">About Us</NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <Mail className="h-4 w-4 text-blue-400" />
                                <span className="text-gray-300">shahriar6874@gmail.com</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Phone className="h-4 w-4 text-blue-400" />
                                <span className="text-gray-300">+8801611-683400</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <MapPin className="h-4 w-4 text-blue-400" />
                                <span className="text-gray-300">Rajshahi, Bangladesh</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                    <p className="text-gray-400">&copy; 2025 AthleticHub. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;