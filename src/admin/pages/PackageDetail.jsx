import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiArrowLeft, 
  FiEdit3, 
  FiTrash2, 
  FiStar,
  FiUsers,
  FiClock,
  FiDollarSign,
  FiMapPin,
  FiToggleLeft,
  FiToggleRight,
  FiCalendar,
  FiTag
} from 'react-icons/fi';
import { usePackages } from '../context/PackageContext';

const PackageDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPackageById, deletePackage, togglePackageStatus, toggleFeatured } = usePackages();
  
  const packageData = getPackageById(id);

  // Helper function to format Firebase timestamps
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'N/A';
    
    try {
      // Handle Firebase Timestamp objects
      if (timestamp.seconds !== undefined && timestamp.nanoseconds !== undefined) {
        return new Date(timestamp.seconds * 1000).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      }
      
      // Handle regular Date objects
      if (timestamp instanceof Date) {
        return timestamp.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      }
      
      // Handle date strings
      if (typeof timestamp === 'string') {
        const date = new Date(timestamp);
        if (!isNaN(date.getTime())) {
          return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          });
        }
      }
      
      return 'N/A';
    } catch (error) {
      console.error('Error formatting timestamp:', error);
      return 'Invalid Date';
    }
  };

  if (!packageData) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Package not found</h3>
        <p className="text-gray-600 mb-6">The package you're looking for doesn't exist.</p>
        <Link
          to="/admin/packages"
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
        >
          <FiArrowLeft className="h-5 w-5 mr-2" />
          Back to Packages
        </Link>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${packageData.title}"?`)) {
      deletePackage(id);
      navigate('/admin/packages');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between"
      >
        <div className="flex items-center space-x-4">
          <Link
            to="/admin/packages"
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <FiArrowLeft className="h-6 w-6" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{packageData.title}</h1>
            <p className="mt-2 text-gray-600">Package details and management</p>
          </div>
        </div>
        
        <div className="mt-4 md:mt-0 flex space-x-3">
          <button
            onClick={() => togglePackageStatus(id)}
            className={`inline-flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
              packageData.status === 'active'
                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                : 'bg-red-100 text-red-800 hover:bg-red-200'
            }`}
          >
            {packageData.status === 'active' ? (
              <FiToggleRight className="h-5 w-5 mr-2" />
            ) : (
              <FiToggleLeft className="h-5 w-5 mr-2" />
            )}
            {packageData.status === 'active' ? 'Active' : 'Inactive'}
          </button>
          
          <button
            onClick={() => toggleFeatured(id)}
            className={`inline-flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
              packageData.featured
                ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <FiStar className="h-5 w-5 mr-2" />
            {packageData.featured ? 'Featured' : 'Not Featured'}
          </button>
          
          <Link
            to={`/admin/packages/${id}/edit`}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            <FiEdit3 className="h-5 w-5 mr-2" />
            Edit Package
          </Link>
          
          <button
            onClick={handleDelete}
            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            <FiTrash2 className="h-5 w-5 mr-2" />
            Delete
          </button>
        </div>
      </motion.div>

      {/* Package Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Package Overview</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600">{packageData.description}</p>
            </div>
          </motion.div>

          {/* Highlights */}
          {packageData.highlights && packageData.highlights.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Highlights</h2>
              <ul className="space-y-2">
                {packageData.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start">
                    <FiMapPin className="h-5 w-5 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{highlight}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Includes */}
          {packageData.includes && packageData.includes.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">What's Included</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {packageData.includes.map((include, index) => (
                  <div key={index} className="flex items-center">
                    <div className="h-2 w-2 bg-indigo-600 rounded-full mr-3"></div>
                    <span className="text-gray-600">{include}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Itinerary */}
          {packageData.itinerary && packageData.itinerary.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <FiCalendar className="h-6 w-6 mr-2 text-indigo-600" />
                Itinerary
              </h2>
              <div className="space-y-4">
                {packageData.itinerary.map((day, index) => (
                  <div key={index} className="flex">
                    <div className="flex-shrink-0 w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-indigo-600 font-semibold">Day {day.day}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">{day.title}</h3>
                      <p className="text-gray-600 mt-1">{day.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Package Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Package Details</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FiDollarSign className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-600">Price</span>
                </div>
                <span className="text-2xl font-bold text-indigo-600">${packageData.price}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FiClock className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-600">Duration</span>
                </div>
                <span className="font-medium text-gray-900">{packageData.duration}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FiUsers className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-600">Max Guests</span>
                </div>
                <span className="font-medium text-gray-900">{packageData.maxGuests}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FiTag className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-600">Category</span>
                </div>
                <span className="inline-flex px-2 py-1 text-sm font-medium rounded-full bg-indigo-100 text-indigo-800">
                  {packageData.category}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Difficulty</span>
                <span className={`inline-flex px-2 py-1 text-sm font-medium rounded-full ${
                  packageData.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                  packageData.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {packageData.difficulty}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Status & Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Status & Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Status</span>
                <span className={`inline-flex px-2 py-1 text-sm font-medium rounded-full ${
                  packageData.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {packageData.status}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Featured</span>
                <span className={`inline-flex px-2 py-1 text-sm font-medium rounded-full ${
                  packageData.featured 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {packageData.featured ? 'Yes' : 'No'}
                </span>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Created</span>
                  <span>{formatTimestamp(packageData.createdAt)}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500 mt-1">
                  <span>Updated</span>
                  <span>{formatTimestamp(packageData.updatedAt)}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button
                onClick={() => togglePackageStatus(id)}
                className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                {packageData.status === 'active' ? 'Deactivate' : 'Activate'} Package
              </button>
              
              <button
                onClick={() => toggleFeatured(id)}
                className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                {packageData.featured ? 'Remove from Featured' : 'Add to Featured'}
              </button>
              
              <Link
                to={`/admin/packages/${id}/edit`}
                className="w-full flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
              >
                Edit Package
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetail;