import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AboutUsPage() {
  const navigate = useNavigate();
  
  const navigateToAI = () => {
    navigate('/');
    setTimeout(() => {
      document.getElementById('ai-assistant')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

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
            src="/images/Aboutus.jpeg" 
            alt="Beautiful Sri Lanka cultural heritage" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-2 sm:px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-2 sm:mb-4 drop-shadow-lg agbalumo-font">
              About<br />
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl">Us</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-1 sm:mb-2 drop-shadow-md font-medium agbalumo-font">
              Discover Our Story
            </p>
            <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6 lg:mb-8 drop-shadow-md agbalumo-font">
              Your Trusted Travel Partner
            </p>
            <button 
              className="bg-white/20 backdrop-blur-sm border-2 border-white text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-full font-semibold hover:bg-white/30 transition-all duration-300 mb-4 sm:mb-6 lg:mb-8 text-sm sm:text-base"
              onClick={navigateToAI}
            >
              Plan Your Trip With AI
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Our Story Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-cyan-400">Our</span> <span className="text-gray-800">Story</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover the journey that brought Ceyluxe to life and our passion for showcasing Sri Lanka's beauty
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="/images/logo.png" 
                alt="Sri Lanka beauty" 
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">A Journey of Discovery</h3>
              <p className="text-gray-700 leading-relaxed">
                Founded with a deep love for Sri Lanka's rich culture, stunning landscapes, and warm hospitality, 
                Ceyluxe was born from a simple dream: to share the magic of this incredible island with travelers 
                from around the world.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our team of passionate travel experts, local guides, and cultural enthusiasts work together to 
                create authentic, unforgettable experiences that go beyond typical tourism. We believe in 
                sustainable travel that benefits both visitors and local communities.
              </p>
              <p className="text-gray-700 leading-relaxed">
                From the misty mountains of the central highlands to the pristine beaches of the southern coast, 
                from ancient temples to modern cities, we invite you to discover the real Sri Lanka with us.
              </p>
            </div>
          </div>
        </div>

        {/* Our Mission Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-cyan-400">Our</span> <span className="text-gray-800">Mission</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We're committed to providing exceptional travel experiences while preserving Sri Lanka's natural and cultural heritage
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Authentic Experiences</h3>
              <p className="text-gray-600">
                We create genuine connections between travelers and local communities, offering insights into 
                Sri Lanka's rich culture and traditions.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Sustainable Tourism</h3>
              <p className="text-gray-600">
                We promote responsible travel practices that protect the environment and support local 
                communities for future generations.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">24/7 Support</h3>
              <p className="text-gray-600">
                Our dedicated team provides round-the-clock assistance to ensure your journey is smooth, 
                safe, and memorable from start to finish.
              </p>
            </div>
          </div>
        </div>

        {/* Our Team Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-cyan-400">Our</span> <span className="text-gray-800">Team</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Meet the passionate individuals who make your Sri Lankan adventure possible
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <img 
                src="/images/t.i.png" 
                alt="Travel Expert" 
                className="w-32 h-32 rounded-full object-cover mx-auto mb-4 shadow-lg"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Travel Experts</h3>
              <p className="text-gray-600">Certified professionals with deep knowledge of Sri Lanka's destinations</p>
            </div>
            
            <div className="text-center">
              <img 
                src="/images/local.png" 
                alt="Local Guides" 
                className="w-32 h-32 rounded-full object-cover mx-auto mb-4 shadow-lg"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Local Guides</h3>
              <p className="text-gray-600">Native Sri Lankans who share authentic cultural insights</p>
            </div>
            
            <div className="text-center">
              <img 
                src="/images/cus.png" 
                alt="Customer Support" 
                className="w-32 h-32 rounded-full object-cover mx-auto mb-4 shadow-lg"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Customer Support</h3>
              <p className="text-gray-600">Dedicated team ensuring your satisfaction throughout your journey</p>
            </div>
            
            <div className="text-center">
              <img 
                src="/images/ai.png" 
                alt="AI Specialists" 
                className="w-32 h-32 rounded-full object-cover mx-auto mb-4 shadow-lg"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-2">AI Specialists</h3>
              <p className="text-gray-600">Technology experts creating personalized travel experiences</p>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-cyan-400">Why Choose</span> <span className="text-gray-800">Ceyluxe?</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Experience the difference that makes us the preferred choice for Sri Lankan adventures
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Local Expertise</h3>
                  <p className="text-gray-600">Our team includes native Sri Lankans with intimate knowledge of every destination.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Personalized Service</h3>
                  <p className="text-gray-600">Every itinerary is customized to match your interests, budget, and travel style.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Quality Assurance</h3>
                  <p className="text-gray-600">We carefully select partners and accommodations to ensure the highest standards.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">4</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Innovation</h3>
                  <p className="text-gray-600">Our AI-powered planning tools make trip planning effortless and personalized.</p>
                </div>
              </div>
            </div>
            
            <div>
              <img 
                src="/images/logo.png" 
                alt="Sri Lanka beach" 
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Start Your Sri Lankan Adventure?
          </h3>
          <p className="text-lg mb-6 opacity-90">
            Let us help you create the perfect itinerary for your dream vacation in Sri Lanka.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="bg-cyan-400 text-white px-8 py-3 rounded-full font-semibold hover:bg-cyan-500 transition-colors"
              onClick={navigateToAI}
            >
              Plan Your Trip With AI
            </button>
            <button className="border-2 border-cyan-400 text-white px-8 py-3 rounded-full font-semibold hover:bg-cyan-400 hover:text-white transition-colors">
              Contact Our Experts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 