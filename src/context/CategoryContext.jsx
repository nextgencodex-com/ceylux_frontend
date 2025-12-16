import React, { createContext, useContext, useState, useEffect } from 'react';
import { databaseService } from '../services/databaseService';

const CategoryContext = createContext();

export const useCategories = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategories must be used within a CategoryProvider');
  }
  return context;
};

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Static categories data 
  const staticCategories = [
    {
      id: 'beach-holidays',
      title: 'Beach Holidays',
      description: 'Discover Sri Lanka\'s golden coast with pristine beaches and water activities',
      image: '/images/beach holiday 1.jpg',
      isStatic: true
    },
    {
      id: 'adventure-tours',
      title: 'Adventure Tours',
      description: 'Thrilling experiences with hiking, climbing, and outdoor activities',
      image: '/images/adventure packages.png',
      isStatic: true
    },
    {
      id: 'cultural-heritage',
      title: 'Cultural Heritage',
      description: 'Ancient temples, traditions, and rich cultural experiences',
      image: '/images/cultural packages.jpg',
      isStatic: true
    },
    {
      id: 'wildlife-nature',
      title: 'Wildlife & Nature',
      description: 'Explore national parks and encounter diverse wildlife',
      image: '/images/wildlife-1.jpg',
      isStatic: true
    },
    {
      id: 'honeymoon-packages',
      title: 'Honeymoon Packages',
      description: 'Romantic getaways for newlyweds and couples',
      image: '/images/honeymoon packages.jpg',
      isStatic: true
    },
    {
      id: 'pilgrimage-tours',
      title: 'Pilgrimage Tours',
      description: 'Sacred sites and spiritual journeys across Sri Lanka',
      image: '/images/Pilgrimage Packages.jpg',
      isStatic: true
    },
    {
      id: 'family-vacations',
      title: 'Family Vacations',
      description: 'Perfect family-friendly adventures and activities',
      image: '/images/family packages.jpg',
      isStatic: true
    }
  ];

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const dynamicCategories = await databaseService.getCategories();
      const allCategories = [...staticCategories, ...dynamicCategories];
      setCategories(allCategories);
    } catch (err) {
      setError(err.message);
      // If error, just use static categories
      setCategories(staticCategories);
    } finally {
      setIsLoading(false);
    }
  };

  const addCategory = async (categoryData) => {
    try {
      setError(null);
      
      const newCategory = await databaseService.addCategory(categoryData);
      setCategories((prev) => [...prev, { ...newCategory, isStatic: false }]);
      return newCategory;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateCategory = async (categoryId, categoryData) => {
    try {
      setError(null);
      
      // Check if the category exists in our local state and it's not static
      const currentCategory = categories.find(cat => cat.id === categoryId);
      
      if (currentCategory && !currentCategory.isStatic) {
        // Direct update - let Firebase handle existence checking
        const updatedCategory = await databaseService.updateCategory(categoryId, categoryData);
        setCategories((prev) => prev.map((cat) => (cat.id === categoryId ? { ...updatedCategory, isStatic: false } : cat)));
        
        return updatedCategory;
      } else {
        if (currentCategory?.isStatic) {
          throw new Error('Cannot edit static categories');
        } else {
          throw new Error(`Category "${categoryId}" not found. Please refresh and try again.`);
        }
      }
    } catch (err) {
      setError(err.message);
      // Reload categories on error to ensure UI is in sync
      loadCategories();
      throw err;
    }
  };

  const deleteCategory = async (categoryId) => {
    try {
      setError(null);
      
      // Check if the category exists in our local state and it's not static
      const currentCategory = categories.find(cat => cat.id === categoryId);
      
      if (currentCategory && !currentCategory.isStatic) {
        // Direct delete - let Firebase handle existence checking
        await databaseService.deleteCategory(categoryId);
        setCategories((prev) => prev.filter((cat) => cat.id !== categoryId));
        setTimeout(() => {
          loadCategories();
        }, 500);
      } else {
        if (currentCategory?.isStatic) {
          throw new Error('Cannot delete static categories');
        } else {
          throw new Error(`Category "${categoryId}" not found. Please refresh and try again.`);
        }
      }
    } catch (err) {
      setError(err.message);
      // Reload categories on error to ensure UI is in sync
      loadCategories();
      throw err;
    }
  };

  // Get only dynamic categories (for admin management)
  const getDynamicCategories = () => {
    return categories.filter(cat => !cat.isStatic);
  };

  // Get all categories (for public display)
  const getAllCategories = () => {
    return categories;
  };

  // Get category by ID
  const getCategoryById = (categoryId) => {
    return categories.find(cat => cat.id === categoryId);
  };

  const value = {
    categories,
    isLoading,
    error,
    addCategory,
    updateCategory,
    deleteCategory,
    loadCategories,
    getDynamicCategories,
    getAllCategories,
    getCategoryById,
    staticCategories
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};