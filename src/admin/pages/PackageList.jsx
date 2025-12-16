import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiPlus, 
  FiSearch, 
  FiFilter, 
  FiEdit3, 
  FiTrash2, 
  FiEye,
  FiStar,
  FiUsers,
  FiClock,
  FiDollarSign,
  FiToggleLeft,
  FiToggleRight,
  FiPackage
} from 'react-icons/fi';
import { usePackages } from '../context/PackageContext';
import { Link } from 'react-router-dom';
import LocalImage from '../../components/LocalImage';

const PackageList = () => {
  const { packages, deletePackage, togglePackageStatus } = usePackages();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [packageToDelete, setPackageToDelete] = useState(null);

  // Filter packages based on search and filters
  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || pkg.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || pkg.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = ['all', 'Cultural', 'Beach', 'Adventure', 'Wildlife', 'Wellness'];
  const statuses = ['all', 'active', 'inactive'];

  const handleDeleteClick = (pkg) => {
    setPackageToDelete(pkg);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (packageToDelete) {
      deletePackage(packageToDelete.id);
      setShowDeleteModal(false);
      setPackageToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tour Packages</h1>
          <p className="mt-2 text-gray-600">Manage your tour packages and create new experiences</p>
        </div>
        <Link
          to="/admin/packages/new"
          className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <FiPlus className="h-5 w-5 mr-2" />
          Create New Package
        </Link>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search packages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            {statuses.map(status => (
              <option key={status} value={status}>
                {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>

          {/* Results Count */}
          <div className="flex items-center text-sm text-gray-600">
            <FiFilter className="h-4 w-4 mr-2" />
            {filteredPackages.length} packages found
          </div>
        </div>
      </motion.div>

      {/* Package Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredPackages.map((pkg, index) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200"
          >
            {/* Package Image */}
            <div className="relative h-48 bg-gray-200 overflow-hidden">
              <LocalImage
                src={pkg.images?.[0] || '/images/traveling.jpg'}
                alt={pkg.title || 'Package image'}
                className="w-full h-full object-cover"
                fallback="/images/traveling.jpg"
              />
              
              {/* Status Badge */}
              <div className="absolute top-3 left-3">
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  pkg.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {pkg.status}
                </span>
              </div>

              {/* Best Selling Badge */}
              {pkg.bestSelling && (
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-cyan-100 text-cyan-800">
                    <FiPackage className="h-3 w-3 mr-1" />
                    Best Selling
                  </span>
                </div>
              )}
            </div>

            {/* Package Content */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{pkg.title}</h3>
                <span className="text-2xl font-bold text-indigo-600">${pkg.price}</span>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{pkg.description}</p>

              {/* Package Stats */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <FiClock className="h-4 w-4 mr-1" />
                  {pkg.duration}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <FiUsers className="h-4 w-4 mr-1" />
                  {pkg.maxGuests} guests
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                    pkg.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                    pkg.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {pkg.difficulty}
                  </span>
                </div>
              </div>

              {/* Category */}
              <div className="mb-4">
                <span className="inline-flex px-3 py-1 text-sm font-medium rounded-full bg-indigo-100 text-indigo-800">
                  {pkg.category}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <Link
                    to={`/admin/packages/${pkg.id}`}
                    className="inline-flex items-center px-3 py-1.5 text-sm text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                  >
                    <FiEye className="h-4 w-4 mr-1" />
                    View
                  </Link>
                  <Link
                    to={`/admin/packages/${pkg.id}/edit`}
                    className="inline-flex items-center px-3 py-1.5 text-sm text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                  >
                    <FiEdit3 className="h-4 w-4 mr-1" />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteClick(pkg)}
                    className="inline-flex items-center px-3 py-1.5 text-sm text-gray-600 hover:text-red-600 transition-colors duration-200"
                  >
                    <FiTrash2 className="h-4 w-4 mr-1" />
                    Delete
                  </button>
                </div>

                <div className="flex space-x-2">
                  {/* Toggle Status */}
                  <button
                    onClick={() => togglePackageStatus(pkg.id)}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    {pkg.status === 'active' ? (
                      <FiToggleRight className="h-5 w-5 text-green-500" />
                    ) : (
                      <FiToggleLeft className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPackages.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <FiPackage className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No packages found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || categoryFilter !== 'all' || statusFilter !== 'all'
              ? 'Try adjusting your search criteria'
              : 'Get started by creating your first tour package'
            }
          </p>
          {(!searchTerm && categoryFilter === 'all' && statusFilter === 'all') && (
            <Link
              to="/admin/packages/new"
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
            >
              <FiPlus className="h-5 w-5 mr-2" />
              Create Your First Package
            </Link>
          )}
        </motion.div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-white rounded-lg shadow-xl p-6 m-4 max-w-md w-full"
          >
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <FiTrash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Package</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete "{packageToDelete?.title}"? This action cannot be undone.
              </p>
              <div className="flex space-x-3 justify-center">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default PackageList;