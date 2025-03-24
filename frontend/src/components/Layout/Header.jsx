'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, BellIcon } from '@heroicons/react/24/outline'
import { HiMiniBellAlert } from "react-icons/hi2";

const navigation = [
  { name: 'Home', href: '#' },
  { name: 'Donate', href: '#' },
  { name: 'About', href: '#' },
  { name: 'Contact', href: '#' },
  { name: 'Top Donors', href: '#' }
]

export default function Header() {
    const notificationCount = 5;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const [notificationOpen, setNotificationOpen] = useState(false);

  // Toggle profile menu and ensure notification popup is closed
  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen)
    setNotificationOpen(false) // Close notifications if opening profile menu
  }

  // Toggle notification popup and ensure profile menu is closed
  const toggleNotifications = () => {
    setNotificationOpen(!notificationOpen)
    setProfileMenuOpen(false) // Close profile menu if opening notifications
  }

  return (
    <div className="bg-white navbar-footer">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img alt="Logo" src='./defacto-logo.png' className="h-8 w-auto" />
            </a>
          </div>

          {/* Mobile Menu AnimatedButton */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="size-6" aria-hidden="true" />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm font-semibold text-gray-900">
                {item.name}
              </a>
            ))}
          </div>

          {/* Right Side (LoginPage/Notifications/Profile) */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-4">
            {isLoggedIn ? (
              <>
                {/* Notification AnimatedButton */}
                <button
                    onClick={toggleNotifications}
                    className="relative p-2 rounded-full text-gray-700  focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <span className="sr-only">View notifications</span>
                    {notificationCount > 0 ? (<><HiMiniBellAlert  className="size-6"/>
                        <span className="absolute top-[-5px] right-[7px] bg-[rgb(249,30,30)] text-white text-[9px] font-bold w-[14px] h-[14px] flex items-center justify-center rounded-full">
                        {notificationCount}
                    </span></>)
                        : <BellIcon className="size-6"/>}

                </button>


                {/* Notification Popup */}
                {notificationOpen && (
                  <div className="absolute right-4 top-20 w-64 bg-white shadow-lg rounded-md p-4">
                    <p className="text-gray-700 text-center">{notificationCount >0 ? "🔔 You have a new notification!" : "🔕 No new Notification!"}</p>
                  </div>
                )}

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={toggleProfileMenu}
                    className="relative flex rounded-full bg-gray-200 p-1.5 focus:outline-none"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="size-8 rounded-full"
                      src="https://randomuser.me/api/portraits/men/35.jpg"
                      alt="Profile"
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {profileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Your Profile
                      </a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Settings
                      </a>
                      <button
                        onClick={() => setIsLoggedIn(false)}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <a href="#" className="text-sm font-semibold text-gray-900">
                Log in <span aria-hidden="true">&rarr;</span>
              </a>
            )}
          </div>
        </nav>

        {/* Mobile Navigation Dialog */}
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  alt="Logo"
                  src="./defacto-logo.png"
                  className="h-8 w-auto"
                />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="size-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a key={item.name} href={item.href} className="block px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  {isLoggedIn ? (
                    <>
                      <button className="block w-full text-left px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">
                        Your Profile
                      </button>
                      <button className="block w-full text-left px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">
                        Settings
                      </button>
                      <button
                        onClick={() => setIsLoggedIn(false)}
                        className="block w-full text-left px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        Sign out
                      </button>
                    </>
                  ) : (
                    <a href="#" className="block px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">
                      Log in
                    </a>
                  )}
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </div>
  )
}
