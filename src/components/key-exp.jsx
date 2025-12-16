import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function KeyExperiencesPage() {
  const navigate = useNavigate();
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const navigateToAI = () => {
    navigate('/');
    setTimeout(() => {
      document.getElementById('ai-assistant')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleBookNow = (categoryUrl) => {
    navigate(`/planning/category/${categoryUrl}`);
  };

  const experiences = [
    {
      id: 1,
      title: "Cultural Heritage",
      description: "Immerse yourself in Sri Lanka's rich cultural heritage with visits to ancient temples, historical sites, and traditional ceremonies.",
      image: "/images/cultural-1.jpg",
      highlights: ["Temple of the Sacred Tooth Relic", "Ancient City of Polonnaruwa", "Traditional Dance Performances", "Local Artisan Workshops"],
      duration: "2-3 days",
      price: "From $150",
      categoryUrl: "cultural-heritage"
    },
    {
      id: 2,
      title: "Wildlife Safari",
      description: "Experience the thrill of spotting elephants, leopards, and exotic birds in their natural habitat across Sri Lanka's national parks.",
      image: "/images/wildlife-1.jpg",
      highlights: ["Yala National Park Safari", "Udawalawe Elephant Gathering", "Bird Watching Tours", "Conservation Education"],
      duration: "1-2 days",
      price: "From $120",
      categoryUrl: "wildlife-nature"
    },
    {
      id: 3,
      title: "Tea Plantation Tours",
      description: "Discover the world-famous Ceylon tea with guided tours through lush tea estates in the misty highlands.",
      image: "/images/misty.jpg",
      highlights: ["Tea Factory Visits", "Tea Tasting Sessions", "Plantation Walks", "Traditional Tea Making"],
      duration: "1 day",
      price: "From $80",
      categoryUrl: "adventure-tours"
    },
    {
      id: 4,
      title: "Beach & Water Sports",
      description: "Enjoy pristine beaches and exciting water activities along Sri Lanka's stunning coastline.",
      image: "/images/beach-1.jpg",
      highlights: ["Surfing Lessons", "Snorkeling Adventures", "Whale Watching", "Beach Yoga Sessions"],
      duration: "2-4 days",
      price: "From $200",
      categoryUrl: "beach-holidays"
    },
    {
      id: 5,
      title: "Ayurveda & Wellness",
      description: "Rejuvenate your mind and body with traditional Ayurvedic treatments and wellness programs.",
      image: "/images/wellness-1.jpg",
      highlights: ["Ayurvedic Consultations", "Traditional Massages", "Meditation Sessions", "Herbal Medicine"],
      duration: "3-7 days",
      price: "From $300",
      categoryUrl: "pilgrimage-tours"
    },
    {
      id: 6,
      title: "Adventure Sports",
      description: "Get your adrenaline pumping with thrilling adventure activities in Sri Lanka's diverse landscapes.",
      image: "/images/wellness-2.jpg",
      highlights: ["Rock Climbing", "White Water Rafting", "Zip Lining", "Mountain Biking"],
      duration: "1-3 days",
      price: "From $100",
      categoryUrl: "adventure-tours"
    }
  ];

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
          <img 
            src="/images/Keyexp.jpeg" 
            alt="Key Experiences in Sri Lanka" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-2 sm:px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-2 sm:mb-4 drop-shadow-lg agbalumo-font">
              <span className="text-white">Key</span><br />
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-white">Experiences</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-1 sm:mb-2 drop-shadow-md font-medium agbalumo-font">
              Authentic Sri Lanka
            </p>
            <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6 lg:mb-8 drop-shadow-md agbalumo-font">
              Unforgettable Memories
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
        
        {/* Introduction Section */}
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-cyan-400">Discover</span> <span className="text-gray-800">Authentic</span>{" "}
            <span className="text-cyan-400">Experiences</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Sri Lanka offers a diverse range of experiences that go beyond typical tourism. 
            From ancient cultural traditions to thrilling adventures, each experience is designed 
            to create lasting memories and deep connections with this beautiful island nation.
          </p>
        </div>

        {/* Experiences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {experiences.map((experience) => (
            <div key={experience.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative h-48">
                <img 
                  src={experience.image} 
                  alt={experience.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-cyan-400 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {experience.duration}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {experience.price}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {experience.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {experience.description}
                </p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Highlights:</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {experience.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex-1 bg-cyan-400 text-white py-2 px-4 rounded-lg font-semibold hover:bg-cyan-500 transition-colors">
                    Learn More
                  </button>
                  <button 
                    className="flex-1 border border-cyan-400 text-cyan-400 py-2 px-4 rounded-lg font-semibold hover:bg-cyan-400 hover:text-white transition-colors"
                    onClick={() => handleBookNow(experience.categoryUrl)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Why Choose Our Experiences */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-cyan-400">Why Choose</span> <span className="text-gray-800">Our Experiences</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Local Expertise</h3>
              <p className="text-gray-600 text-sm">
                Expert guides with deep knowledge of local culture and traditions
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Flexible Timing</h3>
              <p className="text-gray-600 text-sm">
                Customizable schedules to fit your travel itinerary
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Authentic Experiences</h3>
              <p className="text-gray-600 text-sm">
                Genuine interactions with local communities and traditions
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Quality Assured</h3>
              <p className="text-gray-600 text-sm">
                Carefully curated experiences with safety and quality standards
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl p-8 text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Create Unforgettable Memories?
          </h3>
          <p className="text-lg mb-6 opacity-90">
            Let us help you discover the authentic experiences that make Sri Lanka truly special.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="bg-white text-cyan-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              onClick={navigateToAI}
            >
              Plan Your Trip With AI
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-cyan-600 transition-colors">
              Contact Our Experts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
