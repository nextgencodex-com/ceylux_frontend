import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { usePublicPackages } from '../context/PublicPackagesContext';
import { useCategories } from '../context/CategoryContext';
import LocalImage from './LocalImage';

// Category data with packages
const categoryData = {
  'beach-holidays': {
    title: 'Beach Holidays',
    description: 'Discover Sri Lanka\'s golden coast with pristine beaches and water activities',
    image: '/images/beach-1.jpg',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    packages: [
      {
        id: 'BH-01',
        title: 'Tropical Beach Paradise',
        duration: '5 Days / 4 Nights',
        price: '$380',
        image: '/images/Tropical-Paradise 1.jpg',
        highlights: ['Mirissa Beach', 'Whale Watching', 'Water Sports', 'Sunset Cruises'],
        description: 'Experience the perfect blend of relaxation and adventure on Sri Lanka\'s most beautiful beaches.'
      },
      {
        id: 'BH-02',
        title: 'Luxury Beach Resort',
        duration: '7 Days / 6 Nights',
        price: '$650',
        image: '/images/Beach-Resort 1.jpg',
        highlights: ['Private Beach Access', 'Luxury Accommodation', 'Spa Treatments', 'Gourmet Dining'],
        description: 'Indulge in luxury with our premium beach resort package featuring world-class amenities.'
      },
      {
        id: 'BH-03',
        title: 'Adventure Beach Combo',
        duration: '6 Days / 5 Nights',
        price: '$480',
        image: '/images/Adventure-Beach 1.jpg',
        highlights: ['Surfing Lessons', 'Snorkeling', 'Island Hopping', 'Beach Camping'],
        description: 'Combine beach relaxation with thrilling water sports and outdoor adventures.'
      }
    ]
  },
  'adventure-tours': {
    title: 'Adventure Tours',
    description: 'Thrilling experiences with hiking, climbing, and outdoor activities',
    image: '/images/ella.jpg',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    packages: [
      {
        id: 'AT-01',
        title: 'Hill Country Explorer',
        duration: '6 Days / 5 Nights',
        price: '$450',
        image: '/images/hill 1.jpg',
        highlights: ['Ella Hiking', 'Nine Arch Bridge', 'Tea Plantations', 'Train Journey'],
        description: 'Explore the misty hills and tea plantations of Sri Lanka\'s central highlands.'
      },
      {
        id: 'AT-02',
        title: 'Mountain Trekking',
        duration: '4 Days / 3 Nights',
        price: '$320',
        image: '/images/Mountain 1.jpg',
        highlights: ['Pidurangala Rock', 'Sunrise Hikes', 'Rock Climbing', 'Mountain Views'],
        description: 'Challenge yourself with exciting mountain treks and breathtaking panoramic views.'
      },
      {
        id: 'AT-03',
        title: 'Wilderness Adventure',
        duration: '5 Days / 4 Nights',
        price: '$390',
        image: '/images/wild 1.jpg',
        highlights: ['Forest Trails', 'Waterfall Hikes', 'Camping', 'Wildlife Spotting'],
        description: 'Immerse yourself in nature with guided wilderness adventures and camping experiences.'
      }
    ]
  },
  'cultural-heritage': {
    title: 'Cultural Heritage',
    description: 'Ancient temples, traditions, and rich cultural experiences',
    image: '/images/cultural-1.jpg',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    packages: [
      {
        id: 'CH-01',
        title: 'Cultural Triangle Discovery',
        duration: '7 Days / 6 Nights',
        price: '$430',
        image: '/images/sigiriya.jpg',
        highlights: ['Sigiriya Rock Fortress', 'Dambulla Cave Temple', 'Temple of the Tooth', 'Cultural Dance Show'],
        description: 'Journey through Sri Lanka\'s ancient kingdoms and UNESCO World Heritage sites.'
      },
      {
        id: 'CH-02',
        title: 'Sacred Cities Tour',
        duration: '5 Days / 4 Nights',
        price: '$380',
        image: '/images/cultural-2.jpg',
        highlights: ['Anuradhapura', 'Polonnaruwa', 'Sacred Bodhi Tree', 'Ancient Stupas'],
        description: 'Explore the sacred cities that shaped Sri Lanka\'s Buddhist heritage and culture.'
      },
      {
        id: 'CH-03',
        title: 'Traditional Arts & Crafts',
        duration: '4 Days / 3 Nights',
        price: '$290',
        image: '/images/history.jpg',
        highlights: ['Traditional Workshops', 'Artisan Villages', 'Handicraft Making', 'Cultural Performances'],
        description: 'Learn traditional Sri Lankan arts and crafts from master artisans and craftsmen.'
      }
    ]
  },
  'wildlife-nature': {
    title: 'Wildlife & Nature',
    description: 'Explore national parks and encounter diverse wildlife',
    image: '/images/wildlife-1.jpg',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    packages: [
      {
        id: 'WN-01',
        title: 'Wildlife Safari Adventure',
        duration: '4 Days / 3 Nights',
        price: '$520',
        image: '/images/yala.jpg',
        highlights: ['Yala National Park', 'Leopard Spotting', 'Bird Watching', 'Safari Tours'],
        description: 'Experience the thrill of wildlife safaris in Sri Lanka\'s most famous national park.'
      },
      {
        id: 'WN-02',
        title: 'Bird Watching Paradise',
        duration: '5 Days / 4 Nights',
        price: '$450',
        image: '/images/wildlife-2.jpg',
        highlights: ['Endemic Birds', 'Wetland Tours', 'Expert Guides', 'Photography'],
        description: 'Discover Sri Lanka\'s rich birdlife with expert guides and prime viewing locations.'
      },
      {
        id: 'WN-03',
        title: 'Elephant Conservation',
        duration: '3 Days / 2 Nights',
        price: '$280',
        image: '/images/safari.jpg',
        highlights: ['Elephant Orphanage', 'Conservation Center', 'Feeding Sessions', 'Educational Tours'],
        description: 'Learn about elephant conservation and interact with these gentle giants responsibly.'
      }
    ]
  },
  'honeymoon-packages': {
    title: 'Honeymoon Packages',
    description: 'Romantic getaways for newlyweds and couples',
    image: '/images/honeymoon-1.jpg',
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    packages: [
      {
        id: 'HM-01',
        title: 'Romantic Honeymoon',
        duration: '8 Days / 7 Nights',
        price: '$680',
        image: '/images/honeymoon package 1.jpg',
        highlights: ['Private Beach Villa', 'Couple Spa', 'Sunset Dinners', 'Island Hopping'],
        description: 'Create unforgettable memories with our romantic honeymoon package designed for couples.'
      },
      {
        id: 'HM-02',
        title: 'Luxury Couple Retreat',
        duration: '6 Days / 5 Nights',
        price: '$750',
        image: '/images/couple 1.jpg',
        highlights: ['Luxury Accommodation', 'Private Pool', 'Gourmet Dining', 'Couple Activities'],
        description: 'Indulge in luxury with our premium couple retreat featuring exclusive amenities.'
      },
      {
        id: 'HM-03',
        title: 'Adventure Romance',
        duration: '7 Days / 6 Nights',
        price: '$580',
        image: '/images/adventure romance 1.jpg',
        highlights: ['Adventure Activities', 'Romantic Dinners', 'Scenic Views', 'Couple Bonding'],
        description: 'Combine adventure and romance with exciting activities designed for couples.'
      }
    ]
  },
  'pilgrimage-tours': {
    title: 'Pilgrimage Tours',
    description: 'Sacred sites and spiritual journeys across Sri Lanka',
    image: '/images/cultural-2.jpg',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    packages: [
      {
        id: 'PT-01',
        title: 'Buddhist Pilgrimage',
        duration: '7 Days / 6 Nights',
        price: '$420',
        image: '/images/bodi 1.jpg',
        highlights: ['Sacred Bodhi Tree', 'Temple of the Tooth', 'Ancient Monasteries', 'Meditation Sessions'],
        description: 'Embark on a spiritual journey to Sri Lanka\'s most sacred Buddhist sites.'
      },
      {
        id: 'PT-02',
        title: 'Multi-Faith Pilgrimage',
        duration: '5 Days / 4 Nights',
        price: '$350',
        image: '/images/faith 1.png',
        highlights: ['Buddhist Temples', 'Hindu Kovils', 'Christian Churches', 'Islamic Mosques'],
        description: 'Explore the diverse religious heritage of Sri Lanka with visits to sacred sites of all faiths.'
      },
      {
        id: 'PT-03',
        title: 'Meditation Retreat',
        duration: '4 Days / 3 Nights',
        price: '$280',
        image: '/images/meditation 1.jpg',
        highlights: ['Meditation Centers', 'Silent Retreat', 'Spiritual Guidance', 'Peaceful Environment'],
        description: 'Find inner peace and spiritual growth with guided meditation and retreat experiences.'
      }
    ]
  },
  'family-vacations': {
    title: 'Family Vacations',
    description: 'Perfect family-friendly adventures and activities',
    image: '/images/traveling.jpg',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    packages: [
      {
        id: 'FV-01',
        title: 'Family Fun Adventure',
        duration: '7 Days / 6 Nights',
        price: '$580',
        image: '/images/family fun 1.jpg',
        highlights: ['Kid-friendly Activities', 'Educational Tours', 'Safe Adventures', 'Family Bonding'],
        description: 'Create lasting family memories with activities designed for all ages and interests.'
      },
      {
        id: 'FV-02',
        title: 'Educational Family Tour',
        duration: '6 Days / 5 Nights',
        price: '$520',
        image: '/images/educational 1.jpg',
        highlights: ['Historical Sites', 'Cultural Learning', 'Interactive Museums', 'Educational Guides'],
        description: 'Combine fun and learning with educational tours perfect for curious young minds.'
      },
      {
        id: 'FV-03',
        title: 'Beach Family Holiday',
        duration: '5 Days / 4 Nights',
        price: '$450',
        image: '/images/beach family 1.jpg',
        highlights: ['Safe Beaches', 'Water Activities', 'Family Resorts', 'Childcare Services'],
        description: 'Enjoy a relaxing beach holiday with family-friendly resorts and activities.'
      }
    ]
  }
};

export default function CategoryPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { getPackagesByCategory, isLoading, error } = usePublicPackages();
  const { getCategoryById, isLoading: categoriesLoading } = useCategories();
  
  // Scroll to top when component mounts or categoryId changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryId]);
  
  // Get category info from CategoryContext (includes both static and dynamic)
  const category = getCategoryById(categoryId);
  
  // Fallback to static category data if not found in context
  const staticCategory = categoryData[categoryId];
  const categoryInfo = category || staticCategory;
  
  // Provide default styling for dynamic categories
  const getCategoryStyle = () => {
    if (categoryInfo?.color && categoryInfo?.bgColor) {
      return {
        color: categoryInfo.color,
        bgColor: categoryInfo.bgColor
      };
    }
    
    // Default styling for dynamic categories
    return {
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    };
  };
  
  const categoryStyle = getCategoryStyle();
  
  // Get Firebase packages for this category
  const getCategoryPackages = () => {
    return getPackagesByCategory(categoryId) || [];
  };
  
  const firebasePackages = getCategoryPackages();
  // Combine static packages with Firebase packages
  const allPackages = [
    ...(staticCategory?.packages || []),
    ...firebasePackages
  ];
  
  const handleCustomize = (pkg) => {
    // Add category information to the package data
    const packageWithCategory = {
      ...pkg,
      category: categoryId // Use the categoryId from the URL params
    };
    navigate('/customize-packages', { state: { packageData: packageWithCategory } });
  };

  if (categoriesLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Loading category...</p>
        </div>
      </div>
    );
  }

  if (!categoryInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Category not found</h1>
          <Link to="/planning" className="text-blue-600 hover:underline">
            ← Back to Planning
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Google Font */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Agbalumo&display=swap');
          .agbalumo-font { font-family: 'Agbalumo', sans-serif; }
        `}
      </style>

      {/* Hero Section */}
      <div className="relative mt-4 sm:mt-6 lg:mt-8 mx-2 sm:mx-4 lg:mx-8">
        <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-2xl sm:rounded-3xl overflow-hidden">
          <LocalImage 
            src={categoryInfo.image} 
            alt={categoryInfo.title} 
            className="w-full h-full object-cover"
            fallback="/images/placeholder.jpg"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-2 sm:px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-2 sm:mb-4 drop-shadow-lg agbalumo-font">
              {categoryInfo.title}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-1 sm:mb-2 drop-shadow-md font-medium agbalumo-font">
              {categoryInfo.description}
            </p>
            <Link 
              to="/planning"
              className="mt-6 bg-white/20 backdrop-blur-sm border-2 border-white text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-full font-semibold hover:bg-white/30 transition-all duration-300 text-sm sm:text-base"
            >
              ← Back to Planning
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Category Description */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-cyan-400">{categoryInfo.title}</span>{" "}
            <span className="text-gray-800">Packages</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover our carefully curated {categoryInfo.title.toLowerCase()} packages designed to provide you with the best experiences and memories in Sri Lanka.
          </p>
        </div>

        {/* Packages Grid */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Loading packages...</p>
          </div>
        )}

        {error && !isLoading && (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">Error loading packages: {error}</p>
          </div>
        )}

        {!isLoading && allPackages.length === 0 && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="text-gray-400 mb-6">
                <svg className="w-32 h-32 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-4a2 2 0 01-2 2v1a2 2 0 01-2 2H8a2 2 0 01-2-2v-1a2 2 0 01-2-2H4"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">No Packages Available Yet</h3>
              <p className="text-gray-600 mb-6">
                We're working hard to bring you amazing {categoryInfo.title.toLowerCase()} packages. 
                Check back soon for exciting new additions!
              </p>
              <div className="space-y-3">
                <Link 
                  to="/planning" 
                  className="inline-block w-full bg-cyan-400 text-white py-3 px-6 rounded-md font-semibold hover:bg-cyan-500 transition-colors"
                >
                  Explore Other Categories
                </Link>
                {/* <Link 
                  to="/contactus" 
                  className="inline-block w-full border-2 border-cyan-400 text-cyan-600 py-3 px-6 rounded-md font-semibold hover:bg-cyan-50 transition-colors"
                >
                  Request Custom Package
                </Link> */}
              </div>
            </div>
          </div>
        )}

        {!isLoading && allPackages.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {allPackages.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="relative">
                  <LocalImage
                    src={pkg.images?.[0] || pkg.image || '/images/traveling.jpg'}
                    alt={pkg.title}
                    className="w-full h-48 object-cover"
                    fallback="/images/traveling.jpg"
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
                  <p className="text-gray-600 mb-2">{pkg.duration}</p>
                  <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                    {pkg.description || 'Experience the best of Sri Lanka with our carefully curated packages.'}
                  </p>

                  <div className="mb-4">
                    <h4 className="font-semibold mb-2 text-gray-900">Highlights:</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {(pkg.highlights || []).slice(0, 4).map((highlight, index) => (
                        <li key={index} className="flex items-center">
                          <span className={`w-2 h-2 rounded-full mr-2 ${categoryStyle.color.replace('text-', 'bg-')}`}></span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <p className="text-lg font-bold text-gray-900">
                      Starting from ${pkg.price?.toString().replace('$', '') || pkg.price || '0'} per person
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
        )}

        {/* Call to Action */}
        <div className={`text-center ${categoryStyle.bgColor} rounded-2xl p-8`}>
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
            Ready to Book Your {categoryInfo.title} Package?
          </h3>
          <p className="text-lg mb-6 text-gray-600">
            Contact our travel experts to customize your perfect {categoryInfo.title.toLowerCase()} experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contactus"
              className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
            >
              Get Free Consultation
            </Link>
            <Link 
              to="/planning"
              className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-colors"
            >
              View All Categories
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 