import React, { createContext, useContext, useState, useEffect } from 'react';
import { databaseService } from '../services/databaseService';

const PublicPackagesContext = createContext();

export const usePublicPackages = () => {
  const context = useContext(PublicPackagesContext);
  if (!context) {
    throw new Error('usePublicPackages must be used within a PublicPackagesProvider');
  }
  return context;
};

export const PublicPackagesProvider = ({ children }) => {
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setIsLoading(true);
        const result = await databaseService.packages.getAll();
        if (result.success) {
          const activePackages = result.data.filter((pkg) => pkg.status === 'active');
          setPackages(activePackages);
          setError(null);
        } else {
          setError(result.error);
        }
      } catch (error) {
        setError('Failed to load packages');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPackages();
  }, []);

  // Get packages by category
  const getPackagesByCategory = (category) => {
    return packages.filter(pkg => 
      pkg.category && pkg.category.toLowerCase() === category.toLowerCase()
    );
  };

  // Get featured packages
  const getFeaturedPackages = () => {
    return packages.filter(pkg => pkg.featured === true);
  };

  // Get best selling packages (featured or most recently created)
  const getBestSellingPackages = (limit = 6) => {
    const featured = getFeaturedPackages();
    if (featured.length >= limit) {
      return featured.slice(0, limit);
    }
    
    // If not enough featured packages, include recent packages
    const recent = packages
      .filter(pkg => !pkg.featured)
      .sort((a, b) => new Date(b.createdAt?.seconds * 1000) - new Date(a.createdAt?.seconds * 1000));
    
    return [...featured, ...recent].slice(0, limit);
  };

  // Get all available categories from packages
  const getAvailableCategories = () => {
    const categories = [...new Set(packages.map(pkg => pkg.category))];
    return categories.filter(Boolean); // Remove any null/undefined categories
  };

  const value = {
    packages,
    isLoading,
    error,
    getPackagesByCategory,
    getFeaturedPackages,
    getBestSellingPackages,
    getAvailableCategories
  };

  return (
    <PublicPackagesContext.Provider value={value}>
      {children}
    </PublicPackagesContext.Provider>
  );
};

export default PublicPackagesContext;