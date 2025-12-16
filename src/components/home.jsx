"use client"

import { useState, useEffect } from "react"
import { Paperclip, Upload, Send, Mic, Facebook, MessageCircle, Music } from "lucide-react"
import { useNavigate } from "react-router-dom"
import InteractiveSriLankaMap from "./map"

export default function Home() {
  const navigate = useNavigate()
  const [selectedFile, setSelectedFile] = useState(null)
  const [dragActive, setDragActive] = useState(false)
  const [tripQuery, setTripQuery] = useState("")
  const [showUploadSection, setShowUploadSection] = useState(false)

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.botpress.cloud/webchat/v0/inject.js";
    script.async = true;
    script.onload = () => {
      window.botpressWebChat.init({
        botId: "978fea9e-4cc3-437a-b3f5-3eb8baba0022",
        hostUrl: "https://cdn.botpress.cloud/webchat/v0",
        messagingUrl: "https://messaging.botpress.cloud",
        clientId: "978fea9e-4cc3-437a-b3f5-3eb8baba0022",
        enableConversationDeletion: true,
        showPoweredBy: false,
        useSessionStorage: false,
        botName: "Ceyluxe AI",
        layoutWidth: "400px",
        stylesheet: "https://cdn.botpress.cloud/webchat/v0/themes/default.css",
        enableReset: true,
        avatarUrl: "https://cdn-icons-png.flaticon.com/512/4712/4712109.png",
      });

      // Hide the widget initially
      window.botpressWebChat.hide();
    };
    document.body.appendChild(script);

    // Cleanup function to remove the script when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleFileSelect = (file) => {
    setSelectedFile(file)
  }
  
  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0])
    }
  }

  const handleSendMessage = () => {
    if (tripQuery.trim()) {
      console.log("Sending query:", tripQuery)
      if (selectedFile) {
        console.log("With attached file:", selectedFile.name)
      }
      setTripQuery("")
      setSelectedFile(null)
      setShowUploadSection(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Add Google Font in a style tag */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Agbalumo&display=swap');
          .agbalumo-font {
            font-family: 'Agbalumo', sans-serif;
          }
        `}
      </style>

      {/* Hero Section with Agbalumo font */}
      <div className="relative mt-4 sm:mt-6 lg:mt-8 mx-2 sm:mx-4 lg:mx-8">
        <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-2xl sm:rounded-3xl overflow-hidden">
          <img
            src="/images/hero.jpg"
            alt="Beautiful tropical island with crystal clear water"
            className="w-full h-full object-cover"
          />

          {/* Hero Content Overlay with font changes */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-2 sm:px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-2 sm:mb-4 drop-shadow-lg agbalumo-font">
              Welcome To
              <br />
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl">Magic Island</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-1 sm:mb-2 drop-shadow-md font-medium agbalumo-font">
              Adventure Starts Here
            </p>
            <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6 lg:mb-8 drop-shadow-md agbalumo-font">
              Sri Lanka
            </p>
            <button 
              className="bg-white/20 backdrop-blur-sm border-2 border-white text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-full font-semibold hover:bg-white/30 transition-all duration-300 mb-4 sm:mb-6 lg:mb-8 text-sm sm:text-base"
              onClick={() => {
                document.getElementById('ai-assistant')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Plan Your Trip With AI
            </button>
          </div>
        </div>

        {/* Social media icons */}
        <div className="flex justify-center space-x-3 sm:space-x-4 mt-4 sm:mt-2">
          <div className="bg-white rounded-2xl p-2 sm:p-3 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer min-w-[60px] sm:min-w-[70px]">
            <div className="flex flex-col items-center">
              <div className="w-4 h-4 sm:w-5 sm:h-5 mb-1">
                <Facebook className="w-full h-full text-blue-600" />
              </div>
              <span className="text-[8px] sm:text-xs font-medium text-gray-700">Facebook</span>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-2 sm:p-3 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer min-w-[60px] sm:min-w-[70px]">
            <div className="flex flex-col items-center">
              <div className="w-4 h-4 sm:w-5 sm:h-5 mb-1">
                <MessageCircle className="w-full h-full text-green-500" />
              </div>
              <span className="text-[8px] sm:text-xs font-medium text-gray-700">Whatsapp</span>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-2 sm:p-3 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer min-w-[60px] sm:min-w-[70px]">
            <div className="flex flex-col items-center">
              <div className="w-4 h-4 sm:w-5 sm:h-5 mb-1">
                <Music className="w-full h-full text-black" />
              </div>
              <span className="text-[8px] sm:text-xs font-medium text-gray-700">Tik tok</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Travel Assistant Section */}
      <div id="ai-assistant" className="max-w-4xl mx-auto px-4 sm:px-4 py-8 sm:py-12 lg:py-16">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4">
            <span className="text-cyan-400">AI</span> <span className="text-gray-800">Travel</span>{" "}
            <span className="text-cyan-400">Assistant</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-2">
            Effortlessly Plan Your Trip With Smart AI Assistance
          </p>
        </div>

        {/* Modified AI Input Section with Attachment icon on the left */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 mb-8 sm:mb-10 lg:mb-12">
          <div className="flex items-center space-x-4">
            {/* Input with attachment icon on the left */}
            <div className="relative flex-1">
              <button
                onClick={() => setShowUploadSection(!showUploadSection)}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <Paperclip className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              {/* Increased padding-left to pl-12 for more spacing */}
              <input
                type="text"
                value={tripQuery}
                onChange={(e) => setTripQuery(e.target.value)}
                placeholder="Let AI Help Your Plan Perfect Getaway..."
                className="w-full pl-14 pr-4 sm:pr-6 py-3 sm:py-4 text-base sm:text-lg border-0 focus:outline-none focus:ring-0 rounded-lg"
              />
            </div>
            {/* Swapped buttons: Send on left, Mic on right */}
            <div className="flex space-x-2">
              <button className="bg-gray-200 text-gray-700 p-3 sm:p-4 rounded-full hover:bg-gray-300 transition-colors">
                <Mic className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button 
                className="bg-black text-white p-3 sm:p-4 rounded-full hover:bg-gray-800 transition-colors"
                onClick={handleSendMessage}
              >
                <Send className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>

          {/* Image Upload Section - Now conditionally rendered */}
          {showUploadSection && (
            <div className="mt-6 transition-all duration-300 ease-in-out">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
                  Share Your Travel Inspiration
                </h3>
                <div
                  className={`relative border-2 border-dashed rounded-lg sm:rounded-xl p-4 sm:p-6 lg:p-8 text-center transition-all duration-300 ${
                    dragActive
                      ? "border-cyan-400 bg-cyan-50"
                      : selectedFile
                        ? "border-green-400 bg-green-50"
                        : "border-gray-300 hover:border-cyan-400 hover:bg-gray-50"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input type="file" id="file-upload" className="hidden" onChange={handleFileChange} accept="image/*" />
                  {selectedFile ? (
                    <div className="space-y-3 sm:space-y-4">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                      </div>
                      <div>
                        <p className="text-base sm:text-lg font-semibold text-green-600">File Selected!</p>
                        <p className="text-sm sm:text-base text-gray-600 break-all">{selectedFile.name}</p>
                        <p className="text-xs sm:text-sm text-gray-500">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedFile(null)}
                        className="text-red-500 hover:text-red-700 font-medium text-sm sm:text-base"
                      >
                        Remove file
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3 sm:space-y-4">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto">
                        <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-600" />
                      </div>
                      <div>
                        <p className="text-base sm:text-lg font-semibold text-gray-700">Drop your travel photos here</p>
                        <p className="text-sm sm:text-base text-gray-500">or click to browse</p>
                      </div>
                      <label
                        htmlFor="file-upload"
                        className="inline-block bg-cyan-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-cyan-600 transition-colors cursor-pointer text-sm sm:text-base"
                      >
                        Choose Files
                      </label>
                      <p className="text-xs text-gray-400">Supports: JPG, PNG, GIF up to 10MB</p>
                    </div>
                  )}
                </div>
                {selectedFile && (
                  <div className="mt-4 sm:mt-6 flex justify-center">
                    <button 
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg text-sm sm:text-base"
                      onClick={handleSendMessage}
                    >
                      Upload & Get AI Recommendations
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Botpress Chat Toggle Button */}
        <div className="flex justify-center my-6">
          <button
            onClick={() => window.botpressWebChat?.toggle()}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:from-cyan-600 hover:to-blue-600 transition"
          >
            Chat with our AI Assistant
          </button>
        </div>
      </div>

      {/* Best Selling Tour Packages Section */}
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - Title and Description */}
          <div className="lg:w-1/3">
            <div className="sticky top-24">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                <span className="text-gray-800">Best Selling</span>{" "}
                <span className="text-cyan-400">Tour Packages</span>
              </h2>
              <p className="text-gray-600 mb-6">
                Discover our most popular tour packages curated by thousands of happy travelers
              </p>
              <button className="bg-cyan-400 hover:bg-cyan-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300 shadow-lg">
                View All Packages
              </button>
              <div className="mt-8 hidden lg:block">
                <div className="bg-gradient-to-r from-cyan-100 to-blue-100 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Why Choose Us?</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-cyan-500 mr-2">✓</span>
                      <span>5000+ Happy Customers</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-500 mr-2">✓</span>
                      <span>Local Expert Guides</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-500 mr-2">✓</span>
                      <span>Flexible Cancellation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-500 mr-2">✓</span>
                      <span>24/7 Customer Support</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Tour Packages Grid */}
          <div className="lg:w-2/3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* History & Culture */}
              <div 
                className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 h-64"
                onClick={() => navigate('/planning/category/cultural-heritage')}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-600">
                  <img
                    src="/images/history.jpg"
                    alt="History & Culture"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-white font-bold text-lg">History & Culture</h3>
                  <p className="text-gray-200 text-sm">Explore ancient temples and rich heritage</p>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full">Most Popular</span>
                </div>
              </div>

              {/* Adventure Tours */}
              <div 
                className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 h-64"
                onClick={() => navigate('/planning/category/adventure-tours')}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600">
                  <img
                    src="/images/misty.jpg"
                    alt="Adventure Tours"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-white font-bold text-lg">Adventure Tours</h3>
                  <p className="text-gray-200 text-sm">Tea plantations and cool climates</p>
                </div>
              </div>

              {/* Wildlife & Nature */}
              <div 
                className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 h-64"
                onClick={() => navigate('/planning/category/wildlife-nature')}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-600">
                  <img
                    src="/images/safari.jpg"
                    alt="Wildlife & Nature"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-white font-bold text-lg">Wildlife & Nature</h3>
                  <p className="text-gray-200 text-sm">Elephants, leopards and more</p>
                </div>
              </div>

              {/* Honeymoon Packages */}
              <div 
                className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 h-64"
                onClick={() => navigate('/planning/category/honeymoon-packages')}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-600">
                  <img
                    src="/images/honeymoon.jpg"
                    alt="Honeymoon Packages"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-white font-bold text-lg">Honeymoon</h3>
                  <p className="text-gray-200 text-sm">Romantic getaways for couples</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Sri Lanka Map Section */}
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12 lg:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
            <span className="text-cyan-400">Explore</span>{" "}
            <span className="text-gray-800">Sri Lanka</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-2 mt-4">
            Click on the map to discover popular destinations and attractions
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <InteractiveSriLankaMap />
        </div>
      </div>

      {/* Tour Packages & Top Places to Visit Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16 mb-16 sm:mb-20 lg:mb-24">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
            <span className="text-cyan-400">TOUR PACKAGES &</span>{" "}
            <span className="text-gray-800">TOP PLACES TO VISIT</span>
          </h2>
        </div>

        {/* Tour Packages List */}
        <div className="space-y-8 sm:space-y-12">
          {/* Beach Getaway Package */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-4 sm:p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex gap-3 flex-shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden shadow-md">
                <img src="/images/beach-1.jpg" alt="Beach view" className="w-full h-full object-cover" />
              </div>
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden shadow-md">
                <img src="/images/beach-2.jpg" alt="Coastal view" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                Beach getaway package soak in the sun,surf and golden sands!
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-2">
                <span className="font-semibold">Recommended places:</span> mirissa, unawatuna, benthota, hikkaduwa,
                nilaveli, arugam bay
              </p>
            </div>
            <div className="flex gap-1 flex-shrink-0">
              <span className="text-black text-lg">★</span>
              <span className="text-yellow-400 text-lg">★</span>
              <span className="text-yellow-400 text-lg">★</span>
              <span className="text-yellow-400 text-lg">★</span>
              <span className="text-yellow-400 text-lg">★</span>
            </div>
          </div>

          {/* Cultural Heritage Tour */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-4 sm:p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex gap-3 flex-shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden shadow-md">
                <img src="/images/cultural-1.jpg" alt="Ancient temple" className="w-full h-full object-cover" />
              </div>
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden shadow-md">
                <img src="/images/cultural-2.jpg" alt="Historical site" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                Cultural heritage tour explore ancient kingdoms and sacred temple.
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-2">
                <span className="font-semibold">Recommend place:</span> sigiriya rock fortress, polonnaruwa, dambulla
                cave temple of the tooth (kandy)
              </p>
            </div>
            <div className="flex gap-1 flex-shrink-0">
              <span className="text-yellow-400 text-lg">★</span>
              <span className="text-yellow-400 text-lg">★</span>
              <span className="text-yellow-400 text-lg">★</span>
              <span className="text-yellow-400 text-lg">★</span>
              <span className="text-black text-lg">★</span>
            </div>
          </div>

          {/* Spiritual & Wellness Retreat */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-4 sm:p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex gap-3 flex-shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden shadow-md">
                <img src="/images/wellness-1.jpg" alt="Meditation center" className="w-full h-full object-cover" />
              </div>
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden shadow-md">
                <img src="/images/wellness-2.jpg" alt="Yoga retreat" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                Spiritual & wellness retreat find your inner peace with yoga and meditation in scenic surrounding.
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-2">
                <span className="font-semibold">Recommended place:</span> dambulla, arugam bay(retreat centers), kandy
                (meditation center) hunnasgiriya
              </p>
            </div>
            <div className="flex gap-1 flex-shrink-0">
              <span className="text-yellow-400 text-lg">★</span>
              <span className="text-yellow-400 text-lg">★</span>
              <span className="text-yellow-400 text-lg">★</span>
              <span className="text-yellow-400 text-lg">★</span>
              <span className="text-yellow-400 text-lg">★</span>
            </div>
          </div>

          {/* Romantic Honeymoon Getaway */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-4 sm:p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex gap-3 flex-shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden shadow-md">
                <img src="/images/honeymoon-1.jpg" alt="Luxury resort" className="w-full h-full object-cover" />
              </div>
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden shadow-md">
                <img src="/images/honeymoon-2.jpg" alt="Romantic setting" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                Romantic honeymoon getaway escape together with unforgattable moments made just for two.
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-2">
                <span className="font-semibold">Recommended destination:</span> bentota (luxury resort) nuwara eliya
                (colonial - style getways) ella (romantic train rides) trincomalee (secluded beache)
              </p>
            </div>
            <div className="flex gap-1 flex-shrink-0">
              <span className="text-black text-lg">★</span>
              <span className="text-yellow-400 text-lg">★</span>
              <span className="text-yellow-400 text-lg">★</span>
              <span className="text-yellow-400 text-lg">★</span>
              <span className="text-yellow-400 text-lg">★</span>
            </div>
          </div>

          {/* Food & Culture Experience */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-4 sm:p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex gap-3 flex-shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden shadow-md">
                <img src="/images/food-1.jpg" alt="Local cuisine" className="w-full h-full object-cover" />
              </div>
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden shadow-md">
                <img src="/images/food-2.jpg" alt="Traditional dishes" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                Food & culture experience taste the real sri lanka from steet food to traditional dishes.
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-2">
                <span className="font-semibold">Recommended sport:</span> galle fort (cafes), colombo street food tours
                jaffna cuisine experience, kandy culture show.
              </p>
            </div>
            <div className="flex gap-1 flex-shrink-0">
              <span className="text-black text-lg">★</span>
              <span className="text-yellow-400 text-lg">★</span>
              <span className="text-yellow-400 text-lg">★</span>
              <span className="text-yellow-400 text-lg">★</span>
              <span className="text-yellow-400 text-lg">★</span>
            </div>
          </div>

          {/* Wildlife & Nature Safari */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-4 sm:p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex gap-3 flex-shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden shadow-md">
                <img src="/images/wildlife-1.jpg" alt="Safari animals" className="w-full h-full object-cover" />
              </div>
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden shadow-md">
                <img src="/images/wildlife-2.jpg" alt="Nature reserve" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                Wildlife &nature safari get wild with nature and see majestic animals in their natural habitat.
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-2">
                <span className="font-semibold">Recommended parks:</span> yala national park ,udawalawe, minneriya,
                wilpaththuwa, ksudulla
              </p>
            </div>
            <div className="flex gap-1 flex-shrink-0">
              <span className="text-yellow-400 text-lg">★</span>
              <span className="text-yellow-400 text-lg">★</span>
              <span className="text-yellow-400 text-lg">★</span>
              <span className="text-yellow-400 text-lg">★</span>
              <span className="text-black text-lg">★</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}