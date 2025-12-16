import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiPackage, 
  FiUsers, 
  FiDollarSign, 
  FiTrendingUp,
  FiCalendar,
  FiMapPin,
  FiStar,
  FiEye
} from 'react-icons/fi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { usePackages } from '../context/PackageContext';
import { databaseService } from '../../services/databaseService';
import LocalImage from '../../components/LocalImage';

const Dashboard = () => {
  const { packages } = usePackages();
  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load analytics data
  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const result = await databaseService.getAnalytics();
        if (result.success) {
          setAnalytics(result.data);
        }
      } catch (error) {
        console.error('Failed to load analytics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  // Sample data for charts (will be replaced with real data from Firebase)
  const revenueData = [
    { month: 'Jan', revenue: 45000, bookings: 24 },
    { month: 'Feb', revenue: 52000, bookings: 28 },
    { month: 'Mar', revenue: 48000, bookings: 26 },
    { month: 'Apr', revenue: 61000, bookings: 32 },
    { month: 'May', revenue: 55000, bookings: 30 },
    { month: 'Jun', revenue: 67000, bookings: 36 },
  ];

  const packageData = [
    { name: 'Cultural Tours', value: 35, color: '#06B6D4' },
    { name: 'Beach Holidays', value: 28, color: '#10B981' },
    { name: 'Adventure Tours', value: 20, color: '#F59E0B' },
    { name: 'Wildlife Safaris', value: 17, color: '#EF4444' },
  ];

  const stats = [
    {
      name: 'Total Revenue',
      value: '$328,000',
      change: '+12.5%',
      changeType: 'increase',
      icon: FiDollarSign,
      color: 'bg-green-500'
    },
    {
      name: 'Active Packages',
      value: packages?.length?.toString() || '0',
      change: '+2',
      changeType: 'increase',
      icon: FiPackage,
      color: 'bg-blue-500'
    },
    {
      name: 'Total Customers',
      value: analytics?.totalCustomers?.toString() || '0',
      change: '+8.2%',
      changeType: 'increase',
      icon: FiUsers,
      color: 'bg-purple-500'
    },
    {
      name: 'Booking Rate',
      value: '73.2%',
      change: '+2.1%',
      changeType: 'increase',
      icon: FiTrendingUp,
      color: 'bg-orange-500'
    }
  ];

  const recentBookings = analytics?.recentBookings || [];
  const topPackages = packages?.slice(0, 3) || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">Welcome back! Here's what's happening with CeyLuxe today.</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200">
            <FiCalendar className="h-4 w-4 inline mr-2" />
            Last 30 days
          </button>
          <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors duration-200">
            Generate Report
          </button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Revenue Overview</h3>
            <div className="flex space-x-2">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-cyan-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Revenue</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Bookings</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#06b6d4" 
                strokeWidth={3}
                dot={{ fill: '#06b6d4', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="bookings" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                yAxisId="right"
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Package Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Package Distribution</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={packageData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {packageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {packageData.map((item, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-600">{item.name}</span>
                <span className="text-sm font-medium text-gray-900 ml-auto">{item.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200"
        >
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
              <button className="text-sm text-cyan-600 hover:text-cyan-800 font-medium">
                View all
              </button>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {recentBookings.length > 0 ? (
              recentBookings.map((booking, index) => (
                <div key={index} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {booking.customerName?.charAt(0) || 'N'}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{booking.customerName || 'No Name'}</p>
                        <p className="text-sm text-gray-500">{booking.packageTitle || 'Unknown Package'}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">${booking.amount || '0'}</p>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        booking.status === 'confirmed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status || 'pending'}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-gray-500">
                No recent bookings
              </div>
            )}
          </div>
        </motion.div>

        {/* Top Packages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200"
        >
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Top Performing Packages</h3>
              <button className="text-sm text-cyan-600 hover:text-cyan-800 font-medium">
                View all
              </button>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {topPackages.length > 0 ? (
              topPackages.map((pkg, index) => (
                <div key={index} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                      {pkg.image ? (
                        <LocalImage 
                          src={pkg.image} 
                          alt={pkg.title} 
                          className="h-full w-full object-cover"
                          fallback="/images/placeholder.jpg"
                        />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                          <FiMapPin className="h-6 w-6 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{pkg.title}</p>
                      <div className="flex items-center mt-1">
                        <FiUsers className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-500">{pkg.maxGuests} max guests</span>
                        <span className="text-sm text-gray-500 ml-3">{pkg.duration}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">${pkg.price}</p>
                      <p className="text-xs text-gray-500">{pkg.category}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-gray-500">
                No packages available
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;