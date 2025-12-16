import React, { createContext, useContext, useState, useEffect } from 'react';
import { databaseService } from '../../services/databaseService';

const PackageContext = createContext();

export const usePackages = () => {
  const context = useContext(PackageContext);
  if (!context) {
    throw new Error('usePackages must be used within a PackageProvider');
  }
  return context;
};

export const PackageProvider = ({ children }) => {
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPackages();
  }, []);

  const loadPackages = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await databaseService.packages.getAll();
      if (result.success) {
        setPackages(result.data);
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError('Failed to load packages');
    } finally {
      setIsLoading(false);
    }
  };

  const addPackage = async (packageData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await databaseService.packages.create(packageData);
      if (result.success) {
        setPackages((prev) => [...prev, result.data]);
        return { success: true, data: result.data };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      setError('Failed to add package');
      console.error('Error adding package:', error);
      return { success: false, error: 'Failed to add package' };
    } finally {
      setIsLoading(false);
    }
  };

  const updatePackage = async (id, packageData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await databaseService.packages.update(id, packageData);
      if (result.success) {
        setPackages((prev) => prev.map((pkg) => (pkg.id === id ? result.data : pkg)));
        return { success: true, data: result.data };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      setError('Failed to update package');
      console.error('Error updating package:', error);
      return { success: false, error: 'Failed to update package' };
    } finally {
      setIsLoading(false);
    }
  };

  const deletePackage = async (id) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await databaseService.packages.delete(id);
      if (result.success) {
        setPackages((prev) => prev.filter((pkg) => pkg.id !== id));
        return { success: true };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      const errorMessage = 'Failed to delete package';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const getPackageById = (id) => {
    // Return package from local state (synchronous)
    return packages.find(pkg => pkg.id === id) || null;
  };

  const getPackageByIdAsync = async (id) => {
    try {
      const result = await databaseService.packages.getById(id);
      return result;
    } catch (error) {
      return { success: false, data: null, error: 'Failed to get package' };
    }
  };

  const getPackagesByCategory = (category) => {
    return packages.filter(pkg => pkg.category === category);
  };

  const togglePackageStatus = async (id) => {
    const packageToUpdate = packages.find(pkg => pkg.id === id);
    if (packageToUpdate) {
      const newStatus = packageToUpdate.status === 'active' ? 'inactive' : 'active';
      await updatePackage(id, { status: newStatus });
    }
  };

  const toggleFeatured = async (id) => {
    const packageToUpdate = packages.find(pkg => pkg.id === id);
    if (packageToUpdate) {
      await updatePackage(id, { featured: !packageToUpdate.featured });
    }
  };

  // Create sample data for initial setup (call this once to populate your Firebase)
  const createSampleData = async () => {
    const samplePackages = [
      {
        title: 'Cultural Heritage Tour',
        description: 'Explore the rich cultural heritage of Sri Lanka with visits to ancient temples, royal palaces, and UNESCO World Heritage sites.',
        category: 'Cultural',
        duration: '7 days',
        price: 1200,
        maxGuests: 15,
        difficulty: 'Easy',
        includes: ['Accommodation', 'Meals', 'Transportation', 'Guide'],
        highlights: ['Sigiriya Rock Fortress', 'Dambulla Cave Temple', 'Kandy Temple'],
        itinerary: [
          { day: 1, title: 'Arrival in Colombo', description: 'Airport pickup and city tour' },
          { day: 2, title: 'Sigiriya', description: 'Visit the ancient rock fortress' },
          { day: 3, title: 'Dambulla', description: 'Explore cave temples' }
        ],
        status: 'active',
        featured: true
      },
      {
        title: 'Beach Paradise Package',
        description: 'Relax on pristine beaches, enjoy water sports, and experience the coastal beauty of Sri Lanka.',
        category: 'Beach',
        duration: '5 days',
        price: 800,
        maxGuests: 20,
        difficulty: 'Easy',
        includes: ['Beach Resort', 'Water Sports', 'Meals', 'Transportation'],
        highlights: ['Mirissa Beach', 'Whale Watching', 'Surfing Lessons'],
        itinerary: [
          { day: 1, title: 'Arrival at Beach Resort', description: 'Check-in and beach relaxation' },
          { day: 2, title: 'Water Sports Day', description: 'Surfing and snorkeling' },
          { day: 3, title: 'Whale Watching', description: 'Morning whale watching tour' }
        ],
        status: 'active',
        featured: true
      },
      {
        title: 'Adventure Explorer',
        description: 'Thrilling adventure activities including hiking, rock climbing, and wildlife encounters.',
        category: 'Adventure',
        duration: '10 days',
        price: 1800,
        maxGuests: 10,
        difficulty: 'Hard',
        includes: ['Adventure Gear', 'Expert Guides', 'Camping', 'All Meals'],
        highlights: ['Ella Rock Hike', 'White Water Rafting', 'Rock Climbing'],
        itinerary: [
          { day: 1, title: 'Base Camp Setup', description: 'Preparation and briefing' },
          { day: 2, title: 'Ella Rock Hike', description: 'Challenging mountain hike' },
          { day: 3, title: 'White Water Rafting', description: 'Thrilling river adventure' }
        ],
        status: 'active',
        featured: false
      }
    ];

    for (const packageData of samplePackages) {
      await databaseService.packages.create(packageData);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    packages,
    isLoading,
    error,
    addPackage,
    updatePackage,
    deletePackage,
    getPackageById,
    getPackageByIdAsync,
    getPackagesByCategory,
    togglePackageStatus,
    toggleFeatured,
    createSampleData,
    clearError,
    loadPackages
  };

  return (
    <PackageContext.Provider value={value}>
      {children}
    </PackageContext.Provider>
  );
};