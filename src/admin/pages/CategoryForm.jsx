import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCategories } from '../../context/CategoryContext';
import { FiSave, FiArrowLeft, FiUpload, FiX, FiImage } from 'react-icons/fi';
import imageUtils from '../../utils/imageUtils';
import LocalImage from '../../components/LocalImage';

export default function CategoryForm() {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const { addCategory, updateCategory, getCategoryById } = useCategories();
  
  const isEditing = Boolean(categoryId);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageMethod, setImageMethod] = useState('url'); // 'url' or 'upload'
  const [storageInfo] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (isEditing) {
      const category = getCategoryById(categoryId);
      if (category && !category.isStatic) {
        setFormData({
          title: category.title || '',
          description: category.description || '',
          image: category.image || ''
        });
        setImagePreview(category.image || '');
        // Reset upload state when loading existing category
        setUploadedImage(null);
        setImageMethod(category.image && category.image.startsWith('/images/Categories/') ? 'upload' : 'url');
      } else if (category?.isStatic) {
        setError('Cannot edit static categories');
        setTimeout(() => navigate('/admin/categories'), 2000);
      } else {
        setError('Category not found');
        setTimeout(() => navigate('/admin/categories'), 2000);
      }
    }

    // Cleanup function to revoke blob URLs when component unmounts or category changes
    return () => {
      if (uploadedImage?.previewUrl && uploadedImage.previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(uploadedImage.previewUrl);
      }
    };
  }, [categoryId, isEditing, getCategoryById, navigate]);

  const generateCategoryId = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageMethodChange = (method) => {
    // Clean up uploaded image if switching away from upload
    if (imageMethod === 'upload' && method === 'url' && uploadedImage) {
      if (uploadedImage.previewUrl && uploadedImage.previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(uploadedImage.previewUrl);
      }
      setUploadedImage(null);
    }
    
    // Clear preview and form data if switching methods
    if (method !== imageMethod) {
      setImagePreview('');
      setFormData(prev => ({
        ...prev,
        image: ''
      }));
    }
    
    setImageMethod(method);
  };

  const handleImageChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      image: value
    }));
    setImagePreview(value);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      // Validate file
      const validation = imageUtils.validateImageFile(file);
      if (!validation.valid) {
        setError(validation.error);
        return;
      }

      const previewUrl = imageUtils.getImagePreviewUrl(file);
      const uploadResult = await imageUtils.uploadImageToServer(file);

      if (uploadResult.success) {
        setUploadedImage({
          file,
          fileName: uploadResult.fileName,
          url: uploadResult.url,
          previewUrl
        });
        setImagePreview(previewUrl);
        setFormData((prev) => ({
          ...prev,
          image: uploadResult.url
        }));
        setError('');
      } else {
        setError(uploadResult.error || 'Failed to upload image');
        if (previewUrl && previewUrl.startsWith('blob:')) {
          URL.revokeObjectURL(previewUrl);
        }
      }
    } catch (error) {
      let errorMessage = 'Failed to upload image';
      
      if (error && typeof error === 'object') {
        if (error.error) {
          errorMessage = error.error;
        } else if (error.message) {
          errorMessage = error.message;
        }
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      
      setError('Error uploading image: ' + errorMessage);
    }
  };

  const removeUploadedImage = () => {
    if (uploadedImage) {
      // Clean up preview URL
      if (uploadedImage.previewUrl && uploadedImage.previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(uploadedImage.previewUrl);
      }
    }
    setUploadedImage(null);
    setImagePreview('');
    setFormData(prev => ({
      ...prev,
      image: ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (!formData.title.trim()) {
        throw new Error('Category title is required');
      }

      if (!formData.description.trim()) {
        throw new Error('Category description is required');
      }

      const categoryData = {
        ...formData,
        title: formData.title.trim(),
        description: formData.description.trim()
      };

      if (isEditing) {
        await updateCategory(categoryId, categoryData);
      } else {
        // Generate ID from title for new categories
        const generatedId = generateCategoryId(formData.title);
        await addCategory({ ...categoryData, id: generatedId });
      }

      navigate('/admin/categories');
    } catch (err) {
      setError(err.message || 'An error occurred while saving the category');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/admin/categories')}
            className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-4"
          >
            <FiArrowLeft className="mr-2" />
            Back to Categories
          </button>
          
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditing ? 'Edit Category' : 'Add New Category'}
          </h1>
          <p className="mt-2 text-gray-600">
            {isEditing 
              ? 'Update the category information below' 
              : 'Create a new tour package category for your website'
            }
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Category Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g. Adventure Tours"
              />
              {formData.title && (
                <p className="mt-1 text-sm text-gray-500">
                  ID will be: {generateCategoryId(formData.title)}
                </p>
              )}
            </div>

            {/* Category Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Brief description of this category..."
              />
            </div>

            {/* Category Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Category Image
              </label>
              
              {/* Image Method Selection */}
              <div className="flex space-x-4 mb-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="imageMethod"
                    value="url"
                    checked={imageMethod === 'url'}
                    onChange={(e) => handleImageMethodChange(e.target.value)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Image URL/Path</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="imageMethod"
                    value="upload"
                    checked={imageMethod === 'upload'}
                    onChange={(e) => handleImageMethodChange(e.target.value)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Upload Image</span>
                </label>
              </div>

              {/* URL Input */}
              {imageMethod === 'url' && (
                <div className="space-y-2">
                  <input
                    type="text"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleImageChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg or /images/category.jpg"
                  />
                  <p className="text-xs text-gray-500">
                    Supports relative paths (e.g., /images/beach-2.jpg) and full URLs
                  </p>
                </div>
              )}

              {/* File Upload */}
              {imageMethod === 'upload' && (
                <div className="space-y-4">
                  {!uploadedImage ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                      <FiImage className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4">
                        <label htmlFor="imageUpload" className="cursor-pointer">
                          <span className="mt-2 block text-sm font-medium text-gray-900">
                            Upload an image
                          </span>
                          <span className="mt-1 block text-sm text-gray-500">
                            PNG, JPG, WebP up to 2MB (optimized for browser storage)
                          </span>
                          <input
                            id="imageUpload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                        <button
                          type="button"
                          onClick={() => document.getElementById('imageUpload').click()}
                          className="mt-3 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <FiUpload className="mr-2" />
                          Choose File
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="relative border border-gray-300 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <FiImage className="h-8 w-8 text-green-500" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {uploadedImage.fileName}
                            </p>
                            <p className="text-sm text-gray-500">Image uploaded successfully</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={removeUploadedImage}
                          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <FiX className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {/* Image Preview */}
              {imagePreview && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                  <div className="w-48 h-32 rounded-lg overflow-hidden border border-gray-200">
                    <LocalImage
                      src={imagePreview}
                      alt="Category preview"
                      className="w-full h-full object-cover"
                      fallback=""
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Preview */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Category Preview
              </label>
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="bg-white rounded-lg overflow-hidden shadow-sm max-w-sm">
                  {imagePreview && (
                    <div className="h-32 overflow-hidden">
                      <img 
                        src={imagePreview} 
                        alt={formData.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-2 text-blue-600">
                      {formData.title || 'Category Title'}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {formData.description || 'Category description...'}
                    </p>
                    <div className="inline-flex items-center text-blue-600 font-medium text-sm">
                      Explore Packages →
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/admin/categories')}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`inline-flex items-center px-6 py-2 rounded-lg text-white font-medium transition-colors ${
                  isLoading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {isEditing ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  <>
                    <FiSave className="mr-2" />
                    {isEditing ? 'Update Category' : 'Create Category'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}