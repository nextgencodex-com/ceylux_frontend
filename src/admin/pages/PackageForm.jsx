import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiSave, 
  FiX, 
  FiPlus, 
  FiTrash2, 
  FiUpload,
  FiImage,
  FiMapPin,
  FiClock,
  FiUsers,
  FiDollarSign
} from 'react-icons/fi';
import { usePackages } from '../context/PackageContext';
import { useCategories } from '../../context/CategoryContext';
import ImageUpload from '../components/ImageUpload';
import imageUtils from '../../utils/imageUtils';

const PackageForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addPackage, updatePackage, getPackageById, packages, isLoading: packagesLoading } = usePackages();
  const { getAllCategories } = useCategories();
  
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'cultural-heritage',
    duration: '',
    price: '',
    maxGuests: '',
    difficulty: 'Easy',
    includes: [''],
    highlights: [''],
    itinerary: [{ day: 1, title: '', description: '' }],
    hotels: [
      {
        day: 1,
        name: '',
        type: '',
        mealPlan: 'Bed & Breakfast',
        roomType: 'Standard',
        price: ''
      },
      {
        day: 2,
        name: '',
        type: '',
        mealPlan: 'Bed & Breakfast',
        roomType: 'Standard',
        price: ''
      }
    ],
    images: [],
    status: 'active',
    bestSelling: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingPackage, setIsLoadingPackage] = useState(isEditing);

  useEffect(() => {
    if (isEditing && id) {
      // Wait for packages to load, then get the specific package
      if (!packagesLoading) {
        const existingPackage = getPackageById(id);
        if (existingPackage) {
          setFormData({
            ...existingPackage,
            includes: existingPackage.includes || [''],
            highlights: existingPackage.highlights || [''],
            itinerary: existingPackage.itinerary || [{ day: 1, title: '', description: '' }],
            hotels: existingPackage.hotels || [
              {
                day: 1,
                name: '',
                type: '',
                mealPlan: 'Bed & Breakfast',
                roomType: 'Standard',
                price: ''
              },
              {
                day: 2,
                name: '',
                type: '',
                mealPlan: 'Bed & Breakfast',
                roomType: 'Standard',
                price: ''
              }
            ],
            bestSelling: existingPackage.bestSelling || false,
            images: existingPackage.images ? existingPackage.images.map((url, index) => ({
              id: index,
              url: url,
              isLocal: url.startsWith('data:') ? false : url.startsWith('/images/packages/'),
              fileName: url.startsWith('/images/packages/') ? url.split('/').pop() : `image-${index + 1}.jpg`
            })) : []
          });
          setIsLoadingPackage(false);
        } else {
          // Package not found
          console.error('Package not found');
          setIsLoadingPackage(false);
        }
      }
    } else {
      setIsLoadingPackage(false);
    }
  }, [isEditing, id, getPackageById, packages, packagesLoading]);

  // Get all categories (static + dynamic) from CategoryContext
  const allCategories = getAllCategories();
  const categories = allCategories.map(category => ({
    value: category.id,
    label: category.title
  }));
  
  // Fallback categories if CategoryContext is not loaded yet
  const fallbackCategories = [
    { value: 'beach-holidays', label: 'Beach Holidays' },
    { value: 'adventure-tours', label: 'Adventure Tours' },
    { value: 'cultural-heritage', label: 'Cultural Heritage' },
    { value: 'wildlife-nature', label: 'Wildlife & Nature' },
    { value: 'honeymoon-packages', label: 'Honeymoon Packages' },
    { value: 'pilgrimage-tours', label: 'Pilgrimage Tours' },
    { value: 'family-vacations', label: 'Family Vacations' }
  ];
  
  // Use categories from context if available, otherwise use fallback
  const categoryOptions = categories.length > 0 ? categories : fallbackCategories;
  
  const difficulties = ['Easy', 'Medium', 'Hard'];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleArrayChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleItineraryChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addItineraryDay = () => {
    setFormData(prev => ({
      ...prev,
      itinerary: [...prev.itinerary, { 
        day: prev.itinerary.length + 1, 
        title: '', 
        description: '' 
      }]
    }));
  };

  const removeItineraryDay = (index) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary.filter((_, i) => i !== index)
        .map((item, i) => ({ ...item, day: i + 1 }))
    }));
  };

  // Hotel management functions
  const handleHotelChange = (dayIndex, field, value) => {
    setFormData(prev => ({
      ...prev,
      hotels: prev.hotels.map((hotel, i) => 
        i === dayIndex ? { ...hotel, [field]: value } : hotel
      )
    }));
  };

  const addHotelDay = () => {
    setFormData(prev => ({
      ...prev,
      hotels: [...prev.hotels, { 
        day: prev.hotels.length + 1, 
        name: '',
        type: '',
        mealPlan: 'Bed & Breakfast',
        roomType: 'Standard',
        price: ''
      }]
    }));
  };

  const removeHotelDay = (index) => {
    setFormData(prev => ({
      ...prev,
      hotels: prev.hotels.filter((_, i) => i !== index)
        .map((hotel, i) => ({ ...hotel, day: i + 1 }))
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.duration.trim()) newErrors.duration = 'Duration is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
    if (!formData.maxGuests || formData.maxGuests <= 0) newErrors.maxGuests = 'Valid max guests is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const processedImages = await Promise.all(
        formData.images.map(async (img) => {
          if (typeof img === 'string') {
            return img;
          }

          if (img?.url && !img.file) {
            return img.url;
          }

          if (img?.file) {
            try {
              const uploadResult = await imageUtils.uploadImageToServer(img.file);
              return uploadResult.success ? uploadResult.url : null;
            } catch (error) {
              console.error('Error uploading image:', error);
              return null;
            }
          }

          return null;
        })
      );

      console.log('Processed images:', processedImages);

      // Filter out any failed image uploads
      const validImages = processedImages.filter(img => img !== null);

      const packageData = {
        ...formData,
        price: parseFloat(formData.price),
        maxGuests: parseInt(formData.maxGuests),
        includes: formData.includes.filter(item => item.trim()),
        highlights: formData.highlights.filter(item => item.trim()),
        itinerary: formData.itinerary.filter(item => item.title.trim()),
        hotels: formData.hotels.filter(hotel => hotel.name.trim() || hotel.type.trim()), // Only include hotels with at least name or type
        images: validImages
      };

      if (isEditing) {
        const result = await updatePackage(id, packageData);
        if (result && result.success) {
          navigate('/admin/packages');
        } else {
          console.error('Failed to update package:', result?.error);
          alert('Failed to update package: ' + (result?.error || 'Unknown error'));
          // Stay on the form and let user try again
        }
      } else {
        const result = await addPackage(packageData);
        if (result && result.success) {
          navigate('/admin/packages');
        } else {
          console.error('Failed to add package:', result?.error);
          alert('Failed to add package: ' + (result?.error || 'Unknown error'));
          // Stay on the form and let user try again
        }
      }
    } catch (error) {
      console.error('Error saving package:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditing ? 'Edit Tour Package' : 'Create New Tour Package'}
          </h1>
          <p className="mt-2 text-gray-600">
            {isEditing ? 'Update package details and save changes' : 'Fill in the details to create a new tour package'}
          </p>
        </div>
        <button
          onClick={() => navigate('/admin/packages')}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
        >
          <FiX className="h-5 w-5 mr-2" />
          Cancel
        </button>
      </motion.div>

      {/* Loading State for Package Data */}
      {isLoadingPackage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center py-12"
        >
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading package details...</p>
          </div>
        </motion.div>
      )}

      {/* Form Content */}
      {!isLoadingPackage && (
        <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <FiMapPin className="h-6 w-6 mr-2 text-indigo-600" />
            Basic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Package Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.title ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter package title"
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.description ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Describe the tour package"
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {categoryOptions.map(category => (
                  <option key={category.value} value={category.value}>{category.label}</option>
                ))}
              </select>
            </div>

            {/* Difficulty */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty Level
              </label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>{difficulty}</option>
                ))}
              </select>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration *
              </label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.duration ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="e.g., 7 days, 2 weeks"
              />
              {errors.duration && <p className="mt-1 text-sm text-red-600">{errors.duration}</p>}
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (USD) *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiDollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.price ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="0.00"
                />
              </div>
              {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
            </div>

            {/* Max Guests */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Guests *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUsers className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  name="maxGuests"
                  value={formData.maxGuests}
                  onChange={handleInputChange}
                  min="1"
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.maxGuests ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="0"
                />
              </div>
              {errors.maxGuests && <p className="mt-1 text-sm text-red-600">{errors.maxGuests}</p>}
            </div>

            {/* Status and Best Selling */}
            <div className="md:col-span-2 flex flex-wrap gap-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="bestSelling"
                  checked={formData.bestSelling}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Best Selling Tour Package</span>
              </label>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Package Includes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Package Includes</h2>
          
          <div className="space-y-3">
            {formData.includes.map((include, index) => (
              <div key={index} className="flex items-center space-x-3">
                <input
                  type="text"
                  value={include}
                  onChange={(e) => handleArrayChange('includes', index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="What's included in this package?"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('includes', index)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  disabled={formData.includes.length === 1}
                >
                  <FiTrash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('includes')}
              className="inline-flex items-center px-3 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
            >
              <FiPlus className="h-4 w-4 mr-1" />
              Add Include
            </button>
          </div>
        </motion.div>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Package Highlights</h2>
          
          <div className="space-y-3">
            {formData.highlights.map((highlight, index) => (
              <div key={index} className="flex items-center space-x-3">
                <input
                  type="text"
                  value={highlight}
                  onChange={(e) => handleArrayChange('highlights', index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="What are the main highlights?"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('highlights', index)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  disabled={formData.highlights.length === 1}
                >
                  <FiTrash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('highlights')}
              className="inline-flex items-center px-3 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
            >
              <FiPlus className="h-4 w-4 mr-1" />
              Add Highlight
            </button>
          </div>
        </motion.div>

        {/* Images */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <FiImage className="h-6 w-6 mr-2 text-indigo-600" />
            Package Images
          </h2>
          
          <ImageUpload
            images={formData.images}
            onImagesChange={(images) => setFormData(prev => ({ ...prev, images }))}
            maxImages={5}
          />
        </motion.div>

        {/* Itinerary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <FiClock className="h-6 w-6 mr-2 text-indigo-600" />
            Itinerary
          </h2>
          
          <div className="space-y-4">
            {formData.itinerary.map((day, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Day {day.day}
                    </label>
                  </div>
                  <div>
                    <input
                      type="text"
                      value={day.title}
                      onChange={(e) => handleItineraryChange(index, 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Day title"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={day.description}
                      onChange={(e) => handleItineraryChange(index, 'description', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Day description"
                    />
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => removeItineraryDay(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      disabled={formData.itinerary.length === 1}
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addItineraryDay}
              className="inline-flex items-center px-3 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
            >
              <FiPlus className="h-4 w-4 mr-1" />
              Add Day
            </button>
          </div>
        </motion.div>

        {/* Hotels Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Package Hotels</h3>
              <button
                type="button"
                onClick={addHotelDay}
                className="inline-flex items-center px-3 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
              >
                <FiPlus className="h-4 w-4 mr-1" />
                Add Hotel Day
              </button>
            </div>
            {formData.hotels.map((hotel, index) => (
              <div key={index} className="mb-6 p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-700">Day {hotel.day} Hotel</h4>
                  <button
                    type="button"
                    onClick={() => removeHotelDay(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    disabled={formData.hotels.length === 1}
                  >
                    <FiTrash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hotel Name *
                    </label>
                    <input
                      type="text"
                      value={hotel.name}
                      onChange={(e) => handleHotelChange(index, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="e.g., Cantaloupe Levels"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hotel Type
                    </label>
                    <input
                      type="text"
                      value={hotel.type}
                      onChange={(e) => handleHotelChange(index, 'type', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="e.g., Beach Resort, Boutique Hotel"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Meal Plan
                    </label>
                    <select
                      value={hotel.mealPlan}
                      onChange={(e) => handleHotelChange(index, 'mealPlan', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="Bed & Breakfast">Bed & Breakfast</option>
                      <option value="Half Board">Half Board</option>
                      <option value="Full Board">Full Board</option>
                      <option value="All Inclusive">All Inclusive</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Room Type
                    </label>
                    <select
                      value={hotel.roomType}
                      onChange={(e) => handleHotelChange(index, 'roomType', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="Standard">Standard</option>
                      <option value="Deluxe">Deluxe</option>
                      <option value="Luxury">Luxury</option>
                      <option value="Suite">Suite</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price per Night (USD)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiDollarSign className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        value={hotel.price}
                        onChange={(e) => handleHotelChange(index, 'price', e.target.value)}
                        min="0"
                        step="0.01"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Submit Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200"
        >
          <button
            type="button"
            onClick={() => navigate('/admin/packages')}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            ) : (
              <FiSave className="h-5 w-5 mr-2" />
            )}
            {isEditing ? 'Update Package' : 'Create Package'}
          </button>
        </motion.div>
        </form>
      )}
    </div>
  );
};

export default PackageForm;