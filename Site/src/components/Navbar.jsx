import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ isLoggedIn, setIsLoggedIn, setLoggedInEmail, setLoggedInRole, loggedInEmail }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const location = useLocation();
    const dropdownRef = useRef(null);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setLoggedInEmail("");
        setLoggedInRole("");
        setDropdownOpen(false);
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Get first name or username from email
    const getUserDisplayName = () => {
        if (!loggedInEmail) return '';
        
        // If email contains a name part before @, use that
        if (loggedInEmail.includes('@')) {
            const namePart = loggedInEmail.split('@')[0];
            // Capitalize first letter and limit to 10 chars
            return namePart.charAt(0).toUpperCase() + namePart.slice(1).toLowerCase().substring(0, 9);
        }
        
        return loggedInEmail.substring(0, 10);
    };

    return (
        <nav className="fixed top-0 left-0 right-0 backdrop-blur-sm border-b border-gray-200 z-50 bg-white bg-opacity-80 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-xl font-semibold text-gray-900 hover:text-gray-700 transition-colors">
                            The Landmark Projects
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                        <Link 
                            to="/" 
                            className={`${isActive('/') ? 'text-blue-600 font-medium' : 'text-gray-600'} hover:text-gray-900 transition-colors px-3 py-2 text-sm font-medium`}
                        >
                            Home
                        </Link>
                        <Link 
                            to="/about" 
                            className={`${isActive('/about') ? 'text-blue-600 font-medium' : 'text-gray-600'} hover:text-gray-900 transition-colors px-3 py-2 text-sm font-medium`}
                        >
                            About Us
                        </Link>
                        <Link 
                            to="/projects" 
                            className={`${isActive('/projects') ? 'text-blue-600 font-medium' : 'text-gray-600'} hover:text-gray-900 transition-colors px-3 py-2 text-sm font-medium`}
                        >
                            Projects
                        </Link>
                        <Link 
                            to="/my-projects" 
                            className={`${isActive('/my-projects') ? 'text-blue-600 font-medium' : 'text-gray-600'} hover:text-gray-900 transition-colors px-3 py-2 text-sm font-medium`}
                        >
                            My Projects
                        </Link>
                        {isLoggedIn ? (
                            <div className="relative" ref={dropdownRef}>
                                <button 
                                    onClick={toggleDropdown}
                                    className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none transition-colors"
                                >
                                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                                        {getUserDisplayName().charAt(0).toUpperCase()}
                                    </div>
                                    <span className="max-w-xs truncate">{getUserDisplayName()}</span>
                                    <svg className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${dropdownOpen ? 'transform rotate-180' : ''}`} 
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                
                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
                                        <Link 
                                            to="/my-account" 
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            My Account
                                        </Link>
                                        <button 
                                            onClick={() => {
                                                handleLogout();
                                                setDropdownOpen(false);
                                            }}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/login" className="ml-4 bg-gray-900 text-white hover:bg-gray-800 transition-colors px-4 py-2 rounded-md text-sm font-medium">
                                Login
                            </Link>
                        )}
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
            <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-white bg-opacity-95 backdrop-blur-sm shadow-lg border-t border-gray-200`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <Link 
                        to="/" 
                        className={`block ${isActive('/') ? 'text-blue-600 font-medium' : 'text-gray-600'} hover:text-gray-900 px-3 py-2 text-base font-medium`}
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Home
                    </Link>
                    <Link 
                        to="/about" 
                        className={`block ${isActive('/about') ? 'text-blue-600 font-medium' : 'text-gray-600'} hover:text-gray-900 px-3 py-2 text-base font-medium`}
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        About Us
                    </Link>
                    <Link 
                        to="/projects" 
                        className={`block ${isActive('/projects') ? 'text-blue-600 font-medium' : 'text-gray-600'} hover:text-gray-900 px-3 py-2 text-base font-medium`}
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Projects
                    </Link>
                    <Link 
                        to="/my-projects" 
                        className={`block ${isActive('/my-projects') ? 'text-blue-600 font-medium' : 'text-gray-600'} hover:text-gray-900 px-3 py-2 text-base font-medium`}
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        My Projects
                    </Link>
                    {isLoggedIn ? (
                        <div className="border-t border-gray-200 pt-4 mt-4">
                            <div className="flex items-center px-3 py-2">
                                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center mr-3">
                                    {getUserDisplayName().charAt(0).toUpperCase()}
                                </div>
                                <span className="text-gray-800 font-medium">{getUserDisplayName()}</span>
                            </div>
                            <Link 
                                to="/my-account" 
                                className="flex items-center text-gray-600 hover:text-gray-900 px-3 py-2 text-base font-medium"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                My Account
                            </Link>
                            <button 
                                onClick={() => {
                                    handleLogout();
                                    setMobileMenuOpen(false);
                                }} 
                                className="flex items-center w-full text-left text-gray-600 hover:text-gray-900 px-3 py-2 text-base font-medium"
                            >
                                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link 
                            to="/login" 
                            className="block w-full text-left mt-4 bg-gray-900 text-white hover:bg-gray-800 px-4 py-2 rounded-md text-base font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;