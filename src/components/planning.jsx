import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePublicPackages } from '../context/PublicPackagesContext';
import { useCategories } from '../context/CategoryContext';
import LocalImage from './LocalImage';
import { getImageUrl } from '../services/apiClient';

// Best selling tour packages data (static dummy data + dynamic from database)
const staticBestSellingPackages = [
  {
    id: 'static-1',
    title: 'Cultural Triangle Discovery',
    duration: '7 Days / 6 Nights',
    price: '430',
    images: ['/images/cult.jpg'],
    highlights: ['Sigiriya Rock Fortress', 'Dambulla Cave Temple', 'Temple of the Tooth', 'Cultural Dance Show'],
    category: 'cultural-heritage',
    description: 'Explore the ancient cultural wonders of Sri Lanka including UNESCO World Heritage sites.'
  },
  {
    id: 'static-2',
    title: 'Beach Paradise Escape',
    duration: '5 Days / 4 Nights',
    price: '380',
    images: ['/images/para.jpg'],
    highlights: ['Mirissa Beach', 'Whale Watching', 'Water Sports', 'Sunset Cruises'],
    category: 'beach-holidays',
    description: 'Relax on pristine beaches and enjoy exciting water activities along Sri Lanka\'s beautiful coast.'
  },
  {
    id: 'static-3',
    title: 'Wildlife Safari Adventure',
    duration: '4 Days / 3 Nights',
    price: '520',
    images: ['/images/wild.jpg'],
    highlights: ['Yala National Park', 'Leopard Spotting', 'Bird Watching', 'Safari Tours'],
    category: 'wildlife-nature',
    description: 'Experience thrilling wildlife encounters in Sri Lanka\'s premier national parks.'
  },
  {
    id: 'static-4',
    title: 'Hill Country Explorer',
    duration: '6 Days / 5 Nights',
    price: '450',
    images: ['/images/ella.jpg'],
    highlights: ['Ella Hiking', 'Nine Arch Bridge', 'Tea Plantations', 'Train Journey'],
    category: 'adventure-tours',
    description: 'Discover the scenic beauty of Sri Lanka\'s hill country with breathtaking landscapes.'
  },
  {
    id: 'static-5',
    title: 'Romantic Honeymoon',
    duration: '8 Days / 7 Nights',
    price: '680',
    images: ['/images/honeymoon-2.jpg'],
    highlights: ['Private Beach Villa', 'Couple Spa', 'Sunset Dinners', 'Island Hopping'],
    category: 'honeymoon-packages',
    description: 'Perfect romantic getaway designed for couples and newlyweds.'
  },
  {
    id: 'static-6',
    title: 'Family Fun Adventure',
    duration: '7 Days / 6 Nights',
    price: '580',
    images: ['/images/traveling.jpg'],
    highlights: ['Kid-friendly Activities', 'Educational Tours', 'Safe Adventures', 'Family Bonding'],
    category: 'family-vacations',
    description: 'Family-friendly adventures that create lasting memories for all ages.'
  }
];

export default function PlanningTripPage() {
  const navigate = useNavigate();
  const { packages } = usePublicPackages();
  const { getAllCategories, isLoading: categoriesLoading } = useCategories();
  const [bestSellingPackages, setBestSellingPackages] = useState([]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Get all categories (static + dynamic)
  const tourCategories = getAllCategories();

  // Load best selling packages from database and combine with static data
  useEffect(() => {
    if (packages && packages.length > 0) {
      const dynamicBestSelling = packages.filter(pkg => pkg.bestSelling === true);
      // Combine static dummy data with dynamic database packages
      const combinedBestSelling = [...staticBestSellingPackages, ...dynamicBestSelling];
      setBestSellingPackages(combinedBestSelling);
    } else {
      // If no database packages, show static data only
      setBestSellingPackages(staticBestSellingPackages);
    }
  }, [packages]);
  
  const handleCustomize = (pkg) => {
    // Add category information to the package data
    const packageWithCategory = {
      ...pkg,
      category: pkg.category || 'beach-holidays' // fallback to beach-holidays if no category
    };
    navigate('/customize-packages', { state: { packageData: packageWithCategory } });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Google Font */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Agbalumo&display=swap');
          .agbalumo-font { font-family: 'Agbalumo', sans-serif; }
          .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            line-height: 1.4;
            max-height: calc(1.4em * 3);
          }
        `}
      </style>

      {/* Hero Section */}
      <div className="relative mt-4 sm:mt-6 lg:mt-8 mx-2 sm:mx-4 lg:mx-8">
        <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-2xl sm:rounded-3xl overflow-hidden">
          <img 
            src="/images/Planing.jpeg" 
            alt="Planning trip" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-2 sm:px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-2 sm:mb-4 drop-shadow-lg agbalumo-font">
              Planning<br />
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl">A Trip</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-1 sm:mb-2 drop-shadow-md font-medium agbalumo-font">
              Let AI Help You Plan
            </p>
            <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6 lg:mb-8 drop-shadow-md agbalumo-font">
              Your Perfect Adventure
            </p>
            <button 
              className="bg-white/20 backdrop-blur-sm border-2 border-white text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-full font-semibold hover:bg-white/30 transition-all duration-300 mb-4 sm:mb-6 lg:mb-8 text-sm sm:text-base"
              onClick={() => {
                navigate('/');
                setTimeout(() => {
                  document.getElementById('ai-assistant')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
            >
              Plan Your Trip With AI
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Tour Package Categories Section */}
        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12">
            <span className="text-cyan-400">Tour Package</span>{" "}
            <span className="text-gray-800">Categories</span>
          </h2>
          
          {/* Category Navigation Cards */}
          {categoriesLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="inline-block w-8 h-8 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
              <p className="ml-4 text-gray-600">Loading categories...</p>
            </div>
          ) : tourCategories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No categories available</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tourCategories.map((category) => (
                <Link 
                  key={category.id}
                  to={`/planning/category/${category.id}`}
                  className="group h-full"
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col">
                    <div className="relative h-48 overflow-hidden flex-shrink-0">
                      <LocalImage
                        src={category.image}
                        alt={category.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        fallback="/images/placeholder.jpg"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className={`text-xl font-bold mb-2 ${category.color || 'text-cyan-400'}`}>
                        {category.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
                        {category.description}
                      </p>
                      <div className={`flex items-center font-medium text-sm group-hover:underline ${category.color || 'text-cyan-400'} mt-auto`}>
                        Explore Packages →
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Best Selling Tour Packages Section */}
        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12">
            <span className="text-cyan-400">Best Selling</span>{" "}
            <span className="text-gray-800">Tour Packages</span>
          </h2>
          
          {bestSellingPackages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {bestSellingPackages.map((pkg) => (
                <div key={pkg.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="relative">
                      <LocalImage
                        src={pkg.images?.[0]}
                        alt={pkg.title}
                        className="w-full h-48 object-cover"
                        fallback="/images/placeholder.jpg"
                      />
                      <span className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded text-sm font-medium">
                        {pkg.category || 'Package'}
                      </span>
                      {pkg.featured && (
                        <span className="absolute top-4 right-4 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-gray-900">{pkg.title}</h3>
                      <p className="text-gray-600 mb-2">{pkg.duration || '5 Days / 4 Nights'}</p>
                      <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                        {pkg.description || 'Experience the best of Sri Lanka with our carefully curated packages designed for unforgettable memories.'}
                      </p>

                      <div className="mb-4">
                        <h4 className="font-semibold mb-2 text-gray-900">Highlights:</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          {(pkg.highlights || []).slice(0, 4).map((highlight, index) => (
                            <li key={index} className="flex items-center">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <p className="text-lg font-bold text-gray-900">
                          Starting from ${pkg.price || '300'} per person
                        </p>
                        <button 
                          onClick={() => handleCustomize(pkg)}
                          className="w-full bg-cyan-400 text-white py-3 px-6 rounded-md font-semibold hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                        >
                          Customize your package
                        </button>
                        <button className="w-full border border-green-600 text-green-600 py-3 px-6 rounded-md font-semibold hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center justify-center gap-2">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                          </svg>
                          Request via WhatsApp
                        </button>
                      </div>
                    </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-4">
                <svg className="w-24 h-24 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-4a2 2 0 01-2 2v1a2 2 0 01-2 2H8a2 2 0 01-2-2v-1a2 2 0 01-2-2H4"></path>
                </svg>
                <p className="text-xl font-medium text-gray-600">No Best Selling Packages Yet</p>
                <p className="text-gray-500 mt-2">Packages marked as "Best Selling" by admin will appear here</p>
              </div>
              <Link 
                to="/destinations" 
                className="inline-block bg-cyan-400 text-white py-2 px-6 rounded-md font-semibold hover:bg-cyan-500 transition-colors"
              >
                Explore All Packages
              </Link>
            </div>
          )}
        </div>

        {/* Call to Action Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Start Your Adventure?
          </h3>
          <p className="text-lg mb-6 opacity-90">
            Let our travel experts help you create the perfect itinerary for your dream vacation in Sri Lanka.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-cyan-400 text-white px-8 py-3 rounded-full font-semibold hover:bg-cyan-500 transition-colors">
              Get Free Consultation
            </button>
            <button className="border-2 border-cyan-400 text-white px-8 py-3 rounded-full font-semibold hover:bg-cyan-400 hover:text-white transition-colors">
              View All Packages
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 