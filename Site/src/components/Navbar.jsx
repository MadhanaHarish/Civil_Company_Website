import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const toggleMobileMenu = () => {
        const mobileMenu = document.getElementById('mobileMenu');
        mobileMenu.classList.toggle('hidden');
    };

    return (
        <nav className="fixed top-0 left-0 right-0 backdrop-blur-sm border-b border-gray-200 z-50 bg-white bg-opacity-80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-xl font-semibold text-gray-900 hover:text-gray-700 transition-colors">
                            Civil Company Management
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-900 transition-colors px-3 py-2 text-sm font-medium">
                            Home
                        </Link>
                        <Link to="/about" className="text-gray-600 hover:text-gray-900 transition-colors px-3 py-2 text-sm font-medium">
                            About Us
                        </Link>
                        <Link to="/projects" className="text-gray-600 hover:text-gray-900 transition-colors px-3 py-2 text-sm font-medium">
                            Projects
                        </Link>
                        <Link to="/my-projects" className="text-gray-600 hover:text-gray-900 transition-colors px-3 py-2 text-sm font-medium">
                            My Projects
                        </Link>
                        <Link to="/login" className="ml-4 bg-gray-900 text-white hover:bg-gray-800 transition-colors px-4 py-2 rounded-md text-sm font-medium">
                            Login
                        </Link>
                    </div>
                    <div className="md:hidden">
                        <button className="text-gray-600 hover:text-gray-900 p-2" onClick={toggleMobileMenu}>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div id="mobileMenu" className="hidden md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <Link to="/" className="block text-gray-600 hover:text-gray-900 px-3 py-2 text-base font-medium">
                        Home
                    </Link>
                    <Link to="/about" className="block text-gray-600 hover:text-gray-900 px-3 py-2 text-base font-medium">
                        About Us
                    </Link>
                    <Link to="/projects" className="block text-gray-600 hover:text-gray-900 px-3 py-2 text-base font-medium">
                        Projects
                    </Link>
                    <Link to="/my-projects" className="block text-gray-600 hover:text-gray-900 px-3 py-2 text-base font-medium">
                        My Projects
                    </Link>
                    <Link to="/login" className="w-full mt-4 bg-gray-900 text-white hover:bg-gray-800 px-4 py-2 rounded-md text-base font-medium">
                        Login
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;