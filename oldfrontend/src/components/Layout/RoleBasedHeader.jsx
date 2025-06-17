import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiHeart, FiBarChart2, FiUser, FiBell, FiSearch, FiMenu, FiHome, FiX,
    FiPackage, FiClock, FiUsers, FiFileText, FiShoppingBag, FiLogOut, FiSettings
} from 'react-icons/fi';
import { RiHandHeartLine } from 'react-icons/ri';
import { Dialog, Transition } from '@headlessui/react';
import { IoIosPerson } from "react-icons/io";
import NotificationIcon from '../components/UI/NotificationIcon';
import NotificationList from '../components/Notifications/NotificationList';

const Header = ({ role = 'donor', userName = 'Alex' }) => {
    const [isMobile, setIsMobile] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchFocused, setSearchFocused] = useState(false);
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    // Refs
    const profileRef = useRef(null);
    const notificationRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const searchRef = useRef(null);
    const headerRef = useRef(null);

    // Mock data
    const user = {
        name: userName,
        email: `${userName.toLowerCase()}@example.com`,
        profileImage: ""
    };

    const [notifications, setNotifications] = useState([
        {
            id: 1,
            title: "New Donation",
            message: "You received a new donation request",
            isRead: false,
            time: "2 hours ago"
        },
        {
            id: 2,
            title: "System Update",
            message: "New features available in your dashboard",
            isRead: false,
            time: "1 day ago"
        }
    ]);

    // Enhanced scroll handler with glassmorphism effect
    const handleScroll = useCallback(() => {
        const scrollPosition = window.scrollY;
        const isScrolled = scrollPosition > 10;

        // Dynamic opacity based on scroll position (0 to 0.9)
        const opacity = Math.min(scrollPosition / 30, 0.9);

        // Apply styles dynamically
        if (headerRef.current) {
            headerRef.current.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
            headerRef.current.style.backdropFilter = `blur(${Math.min(scrollPosition / 5, 10)}px)`;

            // Shadow appears only when scrolling down
            if (isScrolled && scrollPosition > lastScroll.current) {
                headerRef.current.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            } else {
                headerRef.current.style.boxShadow = 'none';
            }
        }

        lastScroll.current = scrollPosition;
        setScrolled(isScrolled);
    }, []);

    useEffect(() => {
        const throttledScroll = throttle(handleScroll, 50);
        window.addEventListener('scroll', throttledScroll);
        return () => window.removeEventListener('scroll', throttledScroll);
    }, [handleScroll]);

    // Throttle function for scroll events
    function throttle(fn, wait) {
        let time = Date.now();
        return function () {
            if ((time + wait - Date.now()) < 0) {
                fn();
                time = Date.now();
            }
        };
    }

    // Close menus when clicking outside
    const handleClickOutside = useCallback((event) => {
        if (profileMenuOpen && profileRef.current && !profileRef.current.contains(event.target)) {
            setProfileMenuOpen(false);
        }
        if (notificationOpen && notificationRef.current && !notificationRef.current.contains(event.target)) {
            setNotificationOpen(false);
        }
        if (mobileMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
            setMobileMenuOpen(false);
        }
        if (searchFocused && searchRef.current && !searchRef.current.contains(event.target)) {
            setSearchFocused(false);
        }
    }, [profileMenuOpen, notificationOpen, mobileMenuOpen, searchFocused]);

    useEffect(() => {
        if (profileMenuOpen || notificationOpen || mobileMenuOpen || searchFocused) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [handleClickOutside, profileMenuOpen, notificationOpen, mobileMenuOpen, searchFocused]);

    // Menu mutual exclusion
    useEffect(() => {
        if (notificationOpen) setProfileMenuOpen(false);
        if (profileMenuOpen) setNotificationOpen(false);
        if (mobileMenuOpen) {
            setProfileMenuOpen(false);
            setNotificationOpen(false);
        }
    }, [notificationOpen, profileMenuOpen, mobileMenuOpen]);

    // Responsive checks
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Notification handlers
    const handleDeleteNotification = useCallback((id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    }, []);

    const handleClearAllNotifications = useCallback(() => {
        setNotifications([]);
    }, []);

    const handleMarkAsRead = useCallback((id) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    }, []);

    // Role configuration
    const roleConfig = {
        donor: {
            color: 'bg-gradient-to-r from-pink-500 to-rose-500',
            navColor: 'hover:bg-pink-100/50 active:bg-pink-100',
            activeColor: 'bg-pink-100 text-pink-700',
            icon: <FiHeart className="text-pink-500" />,
            navItems: [
                { path: '/dashboard', label: 'Dashboard', icon: <FiHome className="text-lg" /> },
                { path: '/new-donation', label: 'New Donation', icon: <RiHandHeartLine className="text-lg" /> },
                { path: '/donation-history', label: 'History', icon: <FiClock className="text-lg" /> },
                { path: '/requests', label: 'Requests', icon: <FiPackage className="text-lg" /> },
            ]
        },
        admin: {
            color: 'bg-gradient-to-r from-blue-500 to-cyan-500',
            navColor: 'hover:bg-blue-100/50 active:bg-blue-100',
            activeColor: 'bg-blue-100 text-blue-700',
            icon: <FiBarChart2 className="text-blue-500" />,
            navItems: [
                { path: '/dashboard', label: 'Dashboard', icon: <FiHome className="text-lg" /> },
                { path: '/analytics', label: 'Analytics', icon: <FiBarChart2 className="text-lg" /> },
                { path: '/manage-users', label: 'Users', icon: <FiUsers className="text-lg" /> },
                { path: '/content', label: 'Content', icon: <FiFileText className="text-lg" /> },
            ]
        },
        recipient: {
            color: 'bg-gradient-to-r from-emerald-500 to-teal-500',
            navColor: 'hover:bg-emerald-100/50 active:bg-emerald-100',
            activeColor: 'bg-emerald-100 text-emerald-700',
            icon: <RiHandHeartLine className="text-emerald-500" />,
            navItems: [
                { path: '/dashboard', label: 'Dashboard', icon: <FiHome className="text-lg" /> },
                { path: '/available-donations', label: 'Donations', icon: <FiShoppingBag className="text-lg" /> },
                { path: '/my-requests', label: 'My Requests', icon: <FiPackage className="text-lg" /> },
                { path: '/receipt-history', label: 'History', icon: <FiClock className="text-lg" /> },
            ]
        }
    };

    const currentRole = roleConfig[role.toLowerCase()] || roleConfig.donor;

    return (
        <header
            ref={headerRef}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-white shadow-lg'
                : 'bg-white/90 backdrop-blur-md shadow-sm'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center h-16">
                    {/* Left section - Logo and mobile menu button */}
                    <div className="flex items-center mr-auto">
                        <button
                            onClick={() => setMobileMenuOpen(true)}
                            className="lg:hidden p-2 -ml-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none"
                            aria-label="Open menu"
                        >
                            <FiMenu className="w-5 h-5" />
                        </button>

                        <Link to="/dashboard" className="flex items-center ml-2 lg:ml-0">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white ${currentRole.color} shadow-md`}>
                                {currentRole.icon}
                            </div>
                            <h1 className="ml-2 text-lg font-bold text-gray-800">Donate2Serve</h1>
                        </Link>
                    </div>

                    {/* Centered Desktop Navigation */}
                    <nav className="hidden lg:flex mx-auto">
                        <div className="flex items-center space-x-1 relative">
                            {currentRole.navItems.map((item) => (
                                <motion.div
                                    key={item.path}
                                    whileHover={{ y: -1 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="relative px-1"
                                >
                                    <Link
                                        to={item.path}
                                        className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all ${location.pathname === item.path
                                            ? currentRole.activeColor
                                            : `text-gray-600 hover:bg-gray-50`
                                            }`}
                                    >
                                        <span className="mr-2">{item.icon}</span>
                                        {item.label}
                                    </Link>
                                    {location.pathname === item.path && (
                                        <motion.div
                                            layoutId="navIndicator"
                                            className={`absolute bottom-0 left-0 right-0 h-1 ${currentRole.color.replace('bg-gradient-to-r ', '').split(' ')[0]} rounded-full`}
                                            transition={{ type: 'spring', bounce: 0.25 }}
                                        />
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </nav>

                    {/* Right section - Search, Notifications, Profile */}
                    <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
                        {/* Search - Desktop */}
                        <div className="hidden lg:block relative" ref={searchRef}>
                            <motion.div
                                animate={{
                                    width: searchFocused ? 280 : 200,
                                }}
                                className="relative"
                            >
                                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    onFocus={() => setSearchFocused(true)}
                                    onBlur={() => setSearchFocused(false)}
                                    className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-purple-300 bg-gray-50/70 transition-all duration-300"
                                />
                            </motion.div>
                        </div>

                        {/* Search - Mobile */}
                        <button
                            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
                            aria-label="Search"
                        >
                            <FiSearch className="w-5 h-5" />
                        </button>

                        {/* Notifications */}
                        <div className="relative" ref={notificationRef}>
                            <button
                                onClick={() => setNotificationOpen(!notificationOpen)}
                                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 relative"
                                aria-haspopup="true"
                                aria-expanded={notificationOpen}
                            >
                                <NotificationIcon notificationCount={notifications.filter(n => !n.isRead).length} />
                            </button>

                            <AnimatePresence>
                                {notificationOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                        transition={{
                                            type: "spring",
                                            damping: 25,
                                            stiffness: 300,
                                            duration: 0.2
                                        }}
                                        className="absolute right-0 mt-2 w-72 sm:w-80 origin-top-right rounded-lg bg-white shadow-lg z-50 overflow-hidden"
                                    >
                                        <NotificationList
                                            notifications={notifications}
                                            onDelete={handleDeleteNotification}
                                            onClearAll={handleClearAllNotifications}
                                            onClose={() => setNotificationOpen(false)}
                                            onMarkAsRead={handleMarkAsRead}
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Profile */}
                        <div className="relative">
                            <button
                                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                                className="focus:outline-none"
                                aria-haspopup="true"
                                aria-expanded={profileMenuOpen}
                            >
                                <span className="sr-only">Open user menu</span>
                                <div className="p-[2px] border rounded-[8px] h-[38px] w-[38px] flex items-center justify-center border-[rgba(128,128,128,0.4)]">
                                    <div className="bg-transparent h-full w-full flex items-center justify-center rounded-md">
                                        {user?.profileImage ? (
                                            <img
                                                className="h-full w-full object-cover rounded-md"
                                                src={user.profileImage}
                                                alt="Profile"
                                            />
                                        ) : (
                                            <IoIosPerson className="text-gray-500 h-7 w-7" />
                                        )}
                                    </div>
                                </div>
                            </button>

                            <AnimatePresence>
                                {profileMenuOpen && (
                                    <motion.div
                                        ref={profileRef}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black/5 py-1 z-50"
                                    >
                                        <div className="px-4 py-2 border-b border-gray-100">
                                            <p className="text-sm font-medium text-gray-900 truncate">{userName}</p>
                                            <p className="text-xs text-gray-500 capitalize">{role}</p>
                                        </div>
                                        <Link
                                            to="/profile"
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                            onClick={() => setProfileMenuOpen(false)}
                                        >
                                            <FiUser className="mr-2" /> Profile
                                        </Link>
                                        <Link
                                            to="/settings"
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                            onClick={() => setProfileMenuOpen(false)}
                                        >
                                            <FiSettings className="mr-2" /> Settings
                                        </Link>
                                        <button
                                            onClick={() => setProfileMenuOpen(false)}
                                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 border-t border-gray-100"
                                        >
                                            <FiLogOut className="mr-2" /> Sign out
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <Transition show={mobileMenuOpen} as={React.Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-50 overflow-y-auto lg:hidden"
                    onClose={setMobileMenuOpen}
                >
                    <Transition.Child
                        as={React.Fragment}
                        enter="ease-out duration-200"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
                    </Transition.Child>

                    <Transition.Child
                        as={React.Fragment}
                        enter="ease-out duration-200"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="ease-in duration-150"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <Dialog.Panel
                            ref={mobileMenuRef}
                            className="fixed inset-y-0 left-0 w-4/5 max-w-xs bg-white shadow-xl"
                        >
                            <div className="flex flex-col h-full">
                                <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
                                    <Link
                                        to="/dashboard"
                                        className="flex items-center"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white ${currentRole.color}`}>
                                            {currentRole.icon}
                                        </div>
                                        <span className="ml-2 text-lg font-bold text-gray-800">CareShare</span>
                                    </Link>
                                    <button
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="p-2 rounded-lg text-gray-500 hover:bg-gray-100"
                                    >
                                        <FiX className="w-5 h-5" />
                                    </button>
                                </div>

                                <nav className="flex-1 overflow-y-auto py-4 px-2">
                                    <ul className="space-y-1">
                                        {currentRole.navItems.map((item) => (
                                            <motion.li
                                                key={item.path}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <Link
                                                    to={item.path}
                                                    onClick={() => setMobileMenuOpen(false)}
                                                    className={`flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors ${location.pathname === item.path ? currentRole.activeColor : ''
                                                        }`}
                                                >
                                                    <span className="mr-3">{item.icon}</span>
                                                    <span className="font-medium">{item.label}</span>
                                                </Link>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </nav>

                                <div className="border-t border-gray-200 px-4 py-4">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className="p-[2px] border rounded-[8px] h-[42px] w-[42px] flex items-center justify-center border-[rgba(128,128,128,0.4)]">
                                            <div className="bg-transparent h-full w-full flex items-center justify-center rounded-md">
                                                {user?.profileImage ? (
                                                    <img
                                                        className="h-full w-full object-cover rounded-md"
                                                        src={user.profileImage}
                                                        alt="Profile"
                                                    />
                                                ) : (
                                                    <IoIosPerson className="text-gray-500 h-7 w-7" />
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{userName}</p>
                                            <p className="text-xs text-gray-500 capitalize">{role}</p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center w-full px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50"
                                    >
                                        <FiLogOut className="mr-3" />
                                        <span className="font-medium">Sign Out</span>
                                    </button>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </Dialog>
            </Transition>
        </header>
    );
};

export default Header;