import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiMenu, 
  FiX, 
  FiHome, 
  FiPackage, 
  FiUsers, 
  FiBarChart, 
  FiSettings, 
  FiLogOut,
  FiMapPin,
  FiBell,
  FiSearch,
  FiEdit3,
  FiTag
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: FiHome,
      current: location.pathname === '/admin/dashboard'
    },
    {
      name: 'Tour Packages',
      href: '/admin/packages',
      icon: FiPackage,
      current: location.pathname.startsWith('/admin/packages')
    },
    {
      name: 'Categories',
      href: '/admin/categories',
      icon: FiTag,
      current: location.pathname.startsWith('/admin/categories')
    },
    {
      name: 'Customized Packages',
      href: '/admin/customized-packages',
      icon: FiEdit3,
      current: location.pathname === '/admin/customized-packages'
    },
    // {
    //   name: 'Customers',
    //   href: '/admin/customers',
    //   icon: FiUsers,
    //   current: location.pathname === '/admin/customers'
    // },
    // {
    //   name: 'Analytics',
    //   href: '/admin/analytics',
    //   icon: FiBarChart,
    //   current: location.pathname === '/admin/analytics'
    // },
    // {
    //   name: 'Settings',
    //   href: '/admin/settings',
    //   icon: FiSettings,
    //   current: location.pathname === '/admin/settings'
    // }
  ];

  return (
    <div className="h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        navigationItems={navigationItems}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main content - with proper margin for desktop sidebar */}
      <div className="lg:pl-64">
        <div className="flex flex-col min-h-screen">
          {/* Top bar */}
          <TopBar 
            setSidebarOpen={setSidebarOpen}
            user={user}
            logout={logout}
          />

          {/* Page content */}
          <main className="flex-1 overflow-y-auto focus:outline-none">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <div className="absolute inset-0 bg-gray-600 opacity-75" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminLayout;