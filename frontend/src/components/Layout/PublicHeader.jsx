import React, { useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { IoIosPerson } from "react-icons/io";
import { ArrowRight } from 'lucide-react'; 
import { Link } from 'react-router-dom'
import NotificationIcon from '../UI/NotificationIcon';
import NotificationList from '../Notifications/NotificationList';

// Navigation links
const navigation = [
  { name: 'Home', path: '/' },
  { name: 'Donate', path: '/donate' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'Top Donors', path: '/top-donors' },
]

export default function PublicHeader() {
  const notificationCount = 5
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const [notificationOpen, setNotificationOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    profileImage: ""
  }

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Donation Received",
      message: "You received a donation of ₹500 from Alice.",
      isRead: false,
      time: "2 hours ago"
    },
    {
      id: 2,
      title: "New Message",
      message: "You have a new message from the admin.",
      isRead: false,
      time: "1 day ago"
    },
    {
      id: 3,
      title: "Campaign Update",
      message: "Your campaign reached 75% of the goal.",
      isRead: true,
      time: "3 days ago"
    },
    {
      id: 5,
      title: "Campaign Update",
      message: "Your campaign reached 75% of the goal.",
      isRead: true,
      time: "3 days ago"
    }
  ])

  const handleDeleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleClearAllNotifications = () => {
    setNotifications(prev => prev.length ? [] : prev); // optionally check if needed
    // Don't call setNotificationOpen(false)
  }

  const handleMarkAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };
  

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen)
    setNotificationOpen(false)
  }

  const toggleNotifications = () => {
    setNotificationOpen(!notificationOpen)
    setProfileMenuOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuOpen || notificationOpen) {
        const isClickInsideMenu = event.target.closest('[data-menu]')
        if (!isClickInsideMenu) {
          setProfileMenuOpen(false)
          setNotificationOpen(false)
        }
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [profileMenuOpen, notificationOpen])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative">
      {/* Header */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white/80 backdrop-blur-md'} py-5 md:py-4`}>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="block">
                <span className="sr-only">Donate2Serve</span>
                <img
                  alt="Donate2Serve Logo"
                  src="https://res.cloudinary.com/dcsiml3nf/image/upload/v1743251027/donate2serve-logo-black_oebyxf.png"
                  className="h-10 w-auto"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:gap-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-sm font-medium text-gray-800 hover:text-blue-600 relative group px-2 py-1"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2">
              {isLoggedIn ? (
                <>
                  {/* Notifications */}
                  <div className="relative" data-menu>
                    <button
                      onClick={toggleNotifications}
                      className="relative p-2 rounded-full text-gray-700 hover:bg-gray-100 transition focus:outline-none group"
                      aria-label="Notifications"
                    >
                      <NotificationIcon notificationCount={notificationCount} />
                    </button>

                    {notificationOpen && (
                     <NotificationList
                     notifications={notifications}
                     onDelete={handleDeleteNotification}
                     onClearAll={handleClearAllNotifications}
                     onClose={() => setNotificationOpen(false)}
                     onMarkAsRead={handleMarkAsRead}
                   />                  
                    )}
                  </div>

                  {/* Profile */}
                  <div className="relative" data-menu>
                    <button
                      onClick={toggleProfileMenu}
                      className="flex items-center gap-2 focus:outline-none"
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

                    {profileMenuOpen && (
                      <div className="absolute right-0 mt-2 w-52 rounded-lg bg-white shadow-lg ring-1 ring-black/5 py-1 z-10">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">John Doe</p>
                          <p className="text-xs text-gray-500 truncate">john.doe@example.com</p>
                        </div>
                        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                          Your Profile
                        </Link>
                        <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                          Settings
                        </Link>
                        <Link to="/donations" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                          Your Donations
                        </Link>
                        <button
                          onClick={() => setIsLoggedIn(false)}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 border-t border-gray-100"
                        >
                          Sign out
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex gap-4">
                  <Link
                    to="/login"
                    className="hidden md:inline text-sm font-medium text-gray-700 hover:text-blue-600 px-4 py-2"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    className="group text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 px-4 py-2 rounded-md shadow flex items-center gap-2 transition-all duration-300"
                  >
                    Sign up
                    <ArrowRight
                      size={16}
                      className="transform transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </div>

              )}

              {/* Mobile menu toggle */}
              <div className="md:hidden">
                <button
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  <span className="sr-only">{mobileMenuOpen ? 'Close main menu' : 'Open main menu'}</span>
                  {mobileMenuOpen ? (
                    <XMarkIcon className="h-6 w-6 transition-transform duration-300 rotate-90" />
                  ) : (
                    <Bars3Icon className="h-6 w-6 transition-transform duration-300" />
                  )}
                </button>

              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile menu modal */}
      <Transition show={mobileMenuOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="md:hidden"
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50 bg-black/25" />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm">
            <div className="flex items-center justify-between">
              <Link to="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
                <span className="sr-only">Donate2Serve</span>
                <img
                  alt="Logo"
                  src="https://res.cloudinary.com/dcsiml3nf/image/upload/v1743251027/donate2serve-logo-black_oebyxf.png"
                  className="h-8 w-auto"
                />
              </Link>
              <button
                type="button"
                className="rounded-md p-2.5 text-gray-700 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-200">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="block rounded-lg px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  {isLoggedIn ? (
                    <>
                      <div className="flex items-center px-3 pb-4">
                        <div className="flex-shrink-0">
                          {user?.profileImage ? (
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={user.profileImage}
                              alt="Profile"
                            />
                          ) : (
                            <IoIosPerson className="text-gray-500 h-10 w-10" />
                          )}

                        </div>
                        <div className="ml-3">
                          <div className="text-base font-medium text-gray-800">John Doe</div>
                          <div className="text-sm font-medium text-gray-500">john.doe@example.com</div>
                        </div>
                      </div>
                      <Link
                        to="/profile"
                        className="block rounded-lg px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Your Profile
                      </Link>
                      <Link
                        to="/settings"
                        className="block rounded-lg px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Settings
                      </Link>
                      <Link
                        to="/donations"
                        className="block rounded-lg px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Your Donations
                      </Link>
                      <button
                        onClick={() => {
                          setIsLoggedIn(false);
                          setMobileMenuOpen(false);
                        }}
                        className="block w-full text-left rounded-lg px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50"
                      >
                        Sign out
                      </button>
                    </>
                  ) : (
                    <div className="space-y-2">
                      {/* Show signup only on md+ screens */}
                      <Link
                        to="/signup"
                        className="hidden md:block text-center rounded-md border border-gray-300 px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Sign up
                      </Link>
                      {/* Show only login on mobile if not logged in */}
                      <Link
                        to="/login"
                        className="block w-full text-center rounded-md bg-blue-600 px-3 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Log in
                      </Link>
                    </div>

                  )}
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}
