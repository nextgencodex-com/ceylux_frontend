import React, { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import emailjs from '@emailjs/browser'

export default function ContactUsPage() {
  const navigate = useNavigate();
  const form = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // EmailJS configuration - Using environment variables
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Send email using EmailJS
      const result = await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        form.current,
        PUBLIC_KEY
      );

      console.log('Email sent successfully:', result.text);
      setMessage({ 
        type: 'success', 
        text: 'Message sent successfully! We will get back to you soon.' 
      });
      
      // Reset form
      form.current.reset();
      
    } catch (error) {
      console.error('Email send failed:', error);
      setMessage({ 
        type: 'error', 
        text: 'Failed to send message. Please try again or contact us directly.' 
      });
    } finally {
      setIsLoading(false);
    }
  };
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
              src="/images/Contact.jpeg"
              alt="Beautiful Sri Lanka landscape"
              className="w-full h-full object-cover"
            />

            {/* Hero Content Overlay with font changes */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-2 sm:px-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-2 sm:mb-4 drop-shadow-lg agbalumo-font">
                Get In
                <br />
                <span className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl">Touch</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl mb-1 sm:mb-2 drop-shadow-md font-medium agbalumo-font">
                We'd Love To Hear From You
              </p>
              <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6 lg:mb-8 drop-shadow-md agbalumo-font">
                Contact Us Today
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

        {/* Contact Form Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4">
              <span className="text-cyan-400">Contact</span> <span className="text-gray-800">Us</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-2">
              The Sri Lanka tourism alliance welcome individuals or organisations based in Sri Lanka or overseas
              including those in the private sector who own or work for a business connected to Sri Lanka tourism and
              those in the public sector working for government, education institution, regional or industry
              associations related to Sri Lanka tourism. Annual membership of the alliance is free.
            </p>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-2 mt-4">
            {" "}
              <a href="#" className="text-cyan-500 hover:text-cyan-600 underline font-semibold">
               
              </a>
            </p>
          </div>

          {/* Contact Form Card */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 w-full max-w-2xl mx-auto">
            {/* Success/Error Message */}
            {message.text && (
              <div className={`mb-6 p-4 rounded-lg ${
                message.type === 'success' 
                  ? 'bg-green-50 border border-green-200 text-green-800' 
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}>
                <div className="flex">
                  <div className="flex-shrink-0">
                    {message.type === 'success' ? (
                      <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">{message.text}</p>
                  </div>
                </div>
              </div>
            )}

            <form ref={form} onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="from_name"
                  type="text"
                  autoComplete="name"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm bg-gray-50"
                  placeholder="Enter Full Name"
                />
              </div>

              {/* Email Address */}
              <div>
                <label htmlFor="emailAddress" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  id="emailAddress"
                  name="from_email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm bg-gray-50"
                  placeholder="Enter Email Address"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  name="phone_number"
                  type="tel"
                  autoComplete="tel"
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm bg-gray-50"
                  placeholder="Enter phone Number"
                />
              </div>

              {/* Country */}
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm bg-gray-50"
                >
                  <option value="">Select Country</option>
                  <option value="LK">Sri Lanka</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="GB">United Kingdom</option>
                  <option value="AU">Australia</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                  <option value="IN">India</option>
                  <option value="JP">Japan</option>
                  <option value="SG">Singapore</option>
                </select>
              </div>

              {/* Question (Comments) */}
              <div>
                <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-1">
                  Question (Comments)
                </label>
                <textarea
                  id="comments"
                  name="message"
                  rows="4"
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm bg-gray-50"
                  placeholder="Enter Your question"
                ></textarea>
              </div>

              {/* Send Button */}
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center py-3 px-6 border border-transparent rounded-lg shadow-lg text-base font-medium text-white transition-all duration-300 ${
                    isLoading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
  