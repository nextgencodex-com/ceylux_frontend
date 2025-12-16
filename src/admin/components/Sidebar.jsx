import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMapPin, FiX } from 'react-icons/fi';

const Sidebar = ({ navigationItems, sidebarOpen, setSidebarOpen }) => {
  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex flex-col flex-grow bg-gradient-to-b from-cyan-600 to-blue-700 pt-5 pb-4 overflow-y-auto">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 px-4">
            <div className="h-10 w-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
              <FiMapPin className="h-6 w-6 text-white" />
            </div>
            <div className="ml-3">
              <h1 className="text-xl font-bold text-white">CeyLuxe</h1>
              <p className="text-cyan-100 text-sm">Admin Panel</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="mt-8 flex-1 px-2 space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`${
                  item.current
                    ? 'bg-cyan-700 text-white shadow-md'
                    : 'text-cyan-100 hover:bg-cyan-700 hover:text-white'
                } group flex items-center px-2 py-3 text-sm font-medium rounded-lg transition-all duration-200`}
              >
                <item.icon
                  className={`${
                    item.current ? 'text-white' : 'text-cyan-200 group-hover:text-white'
                  } mr-3 flex-shrink-0 h-5 w-5 transition-colors duration-200`}
                />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User info */}
          <div className="flex-shrink-0 flex border-t border-cyan-500 p-4">
            <div className="flex items-center">
              <div className="h-9 w-9 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">Admin User</p>
                <p className="text-xs text-cyan-100">admin@ceyluxe.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <motion.div
          initial={{ x: -250 }}
          animate={{ x: 0 }}
          exit={{ x: -250 }}
          transition={{ type: "spring", damping: 20 }}
          className="lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-cyan-600 to-blue-700 overflow-y-auto"
        >
          <div className="flex flex-col h-full">
            {/* Mobile header */}
            <div className="flex items-center justify-between p-4 border-b border-cyan-500">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <FiMapPin className="h-5 w-5 text-white" />
                </div>
                <div className="ml-2">
                  <h1 className="text-lg font-bold text-white">CeyLuxe</h1>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-cyan-100 hover:text-white p-1"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>

            {/* Mobile navigation */}
            <nav className="flex-1 px-2 py-4 space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`${
                    item.current
                      ? 'bg-cyan-700 text-white shadow-md'
                      : 'text-cyan-100 hover:bg-cyan-700 hover:text-white'
                  } group flex items-center px-2 py-3 text-sm font-medium rounded-lg transition-all duration-200`}
                >
                  <item.icon
                    className={`${
                      item.current ? 'text-white' : 'text-cyan-200 group-hover:text-white'
                    } mr-3 flex-shrink-0 h-5 w-5 transition-colors duration-200`}
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Sidebar;