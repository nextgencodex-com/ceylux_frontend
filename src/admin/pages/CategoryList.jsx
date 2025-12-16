import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCategories } from '../../context/CategoryContext';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit, FiTrash2, FiTag, FiEye } from 'react-icons/fi';
import LocalImage from '../../components/LocalImage';

export default function CategoryList() {
  const navigate = useNavigate();
  const { 
    getDynamicCategories, 
    getAllCategories, 
    deleteCategory, 
    isLoading, 
    error,
    staticCategories 
  } = useCategories();
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [activeTab, setActiveTab] = useState('dynamic'); // 'dynamic' or 'all'

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dynamicCategories = getDynamicCategories();
  const allCategories = getAllCategories();
  const displayCategories = activeTab === 'dynamic' ? dynamicCategories : allCategories;

  const handleDelete = async (category) => {
    if (category.isStatic) {
      alert('Cannot delete static categories!');
      return;
    }
    setCategoryToDelete(category);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (categoryToDelete) {
      try {
        await deleteCategory(categoryToDelete.id);
        setShowDeleteModal(false);
        setCategoryToDelete(null);
      } catch (error) {
        alert('Error deleting category. Please try again.');
      }
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    try {
      if (timestamp.toDate) {
        return timestamp.toDate().toLocaleDateString();
      }
      return new Date(timestamp).toLocaleDateString();
    } catch (error) {
      return 'N/A';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading categories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <FiTag className="mr-3 text-blue-600" />
                Category Management
              </h1>
              <p className="mt-2 text-gray-600">
                Manage tour package categories for your website
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <button
                onClick={() => navigate('/admin/categories/new')}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FiPlus className="mr-2" />
                Add New Category
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('dynamic')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'dynamic'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Custom Categories ({dynamicCategories.length})
              </button>
              <button
                onClick={() => setActiveTab('all')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'all'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                All Categories ({allCategories.length})
              </button>
            </nav>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Categories Grid */}
        {displayCategories.length === 0 ? (
          <div className="text-center py-12">
            <FiTag className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              {activeTab === 'dynamic' ? 'No custom categories' : 'No categories'}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {activeTab === 'dynamic' 
                ? 'Get started by creating your first custom category.' 
                : 'Categories will appear here once created.'
              }
            </p>
            {activeTab === 'dynamic' && (
              <div className="mt-6">
                <button
                  onClick={() => navigate('/admin/categories/new')}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FiPlus className="mr-2" />
                  Add New Category
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayCategories.map((category) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48">
                  <LocalImage
                    src={category.image || '/images/placeholder.jpg'}
                    alt={category.title}
                    className="w-full h-full object-cover"
                    fallback="/images/placeholder.jpg"
                  />
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {category.description}
                  </p>
                  
                  <div className="text-xs text-gray-500 mb-4">
                    <p>ID: {category.id}</p>
                    {category.createdAt && (
                      <p>Created: {formatDate(category.createdAt)}</p>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => navigate(`/planning/category/${category.id}`)}
                      className="flex-1 bg-green-100 text-green-700 py-2 px-3 rounded text-sm font-medium hover:bg-green-200 transition-colors flex items-center justify-center"
                    >
                      <FiEye className="w-4 h-4 mr-1" />
                      View
                    </button>
                    
                    {!category.isStatic && (
                      <>
                        <button
                          onClick={() => navigate(`/admin/categories/edit/${category.id}`)}
                          className="flex-1 bg-blue-100 text-blue-700 py-2 px-3 rounded text-sm font-medium hover:bg-blue-200 transition-colors flex items-center justify-center"
                        >
                          <FiEdit className="w-4 h-4 mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(category)}
                          className="flex-1 bg-red-100 text-red-700 py-2 px-3 rounded text-sm font-medium hover:bg-red-200 transition-colors flex items-center justify-center"
                        >
                          <FiTrash2 className="w-4 h-4 mr-1" />
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Summary Stats */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{staticCategories.length}</div>
              <div className="text-sm text-gray-600">Static Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{dynamicCategories.length}</div>
              <div className="text-sm text-gray-600">Custom Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{allCategories.length}</div>
              <div className="text-sm text-gray-600">Total Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {allCategories.filter(cat => cat.image).length}
              </div>
              <div className="text-sm text-gray-600">With Images</div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <FiTrash2 className="mx-auto mb-4 h-12 w-12 text-red-600" />
              <h3 className="text-lg font-medium text-gray-900">Delete Category</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete "{categoryToDelete?.title}"? 
                  This action cannot be undone.
                </p>
              </div>
              <div className="flex justify-center space-x-4 mt-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}