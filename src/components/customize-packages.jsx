"use client"

import { useState, useEffect, useRef } from "react"
import { Calendar, Minus, Plus, User, Mail, Phone } from "lucide-react"
import { useLocation } from "react-router-dom"
import { databaseService } from "../services/databaseService"
import { categoryActivities, categoryPackageInfo } from "../data/categoryActivities"

export default function Component() {
  const location = useLocation();
  const packageData = location.state?.packageData;
  const selectedCategory = packageData?.category || 'beach-holidays';
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Get category-specific activities
  const currentCategoryActivities = categoryActivities[selectedCategory] || categoryActivities['beach-holidays'];
  const day1Activities = currentCategoryActivities.day1;
  const day2Activities = currentCategoryActivities.day2;
  
  // Get package info for the category
  const packageInfo = categoryPackageInfo[selectedCategory] || categoryPackageInfo['beach-holidays'];
  
  // Get current date and next day for default values
  const getCurrentDate = () => {
    const today = new Date()
    return today.toISOString().split('T')[0].replace(/-/g, '/')
  }
  
  const getNextDate = (daysToAdd = 2) => {
    const today = new Date()
    today.setDate(today.getDate() + daysToAdd)
    return today.toISOString().split('T')[0].replace(/-/g, '/')
  }

  // Calendar helper functions
  const formatDateForInput = (dateStr) => {
    if (!dateStr) return ''
    const parts = dateStr.split('/')
    if (parts.length === 3) {
      return `${parts[0]}-${parts[1].padStart(2, '0')}-${parts[2].padStart(2, '0')}`
    }
    return dateStr
  }

  const formatDateFromInput = (dateStr) => {
    if (!dateStr) return ''
    return dateStr.replace(/-/g, '/')
  }

  const generateCalendarDays = (year, month) => {
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())
    
    const days = []
    const currentDate = new Date(startDate)
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDate))
      currentDate.setDate(currentDate.getDate() + 1)
    }
    
    return days
  }

  const isToday = (date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isSameMonth = (date, month) => {
    return date.getMonth() === month
  }

  const formatDateForDisplay = (date) => {
    return `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`
  }

  const [dateFrom, setDateFrom] = useState(getCurrentDate())
  const [dateTo, setDateTo] = useState(getNextDate(2))
  const [days, setDays] = useState("2")
  const [nights, setNights] = useState("2")
  const [day1Guests, setDay1Guests] = useState(3)
  const [day2Guests, setDay2Guests] = useState(3)
  
  // Transportation states
  const [day1Transportation, setDay1Transportation] = useState("private-vehicle")
  const [day2Transportation, setDay2Transportation] = useState("private-vehicle")
  
  // Hotel states
  const [day1Hotel, setDay1Hotel] = useState("cantaloupe-levels")
  const [day1MealPlan, setDay1MealPlan] = useState("bed-breakfast")
  const [day1RoomType, setDay1RoomType] = useState("luxury")
  const [day1CustomHotel, setDay1CustomHotel] = useState("")
  const [day1UseCustomHotel, setDay1UseCustomHotel] = useState(false)
  
  const [day2Hotel, setDay2Hotel] = useState("salt-mirissa")
  const [day2MealPlan, setDay2MealPlan] = useState("bed-breakfast")
  const [day2RoomType, setDay2RoomType] = useState("luxury")
  const [day2CustomHotel, setDay2CustomHotel] = useState("")
  const [day2UseCustomHotel, setDay2UseCustomHotel] = useState(false)
  
  // Calendar popup states
  const [showFromCalendar, setShowFromCalendar] = useState(false)
  const [showToCalendar, setShowToCalendar] = useState(false)
  const [calendarDate, setCalendarDate] = useState(new Date())
  
  // Refs for calendar containers
  const fromCalendarRef = useRef(null)
  const toCalendarRef = useRef(null)

  // Customer information
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    specialRequests: ""
  })
  
  // Submission states
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [whatsappStatus, setWhatsappStatus] = useState('')
  
  const [selectedActivitiesDay1, setSelectedActivitiesDay1] = useState([])
  const [selectedActivitiesDay2, setSelectedActivitiesDay2] = useState([])

  // Initialize default selected activities based on category
  useEffect(() => {
    if (day1Activities.length > 0) {
      setSelectedActivitiesDay1(day1Activities.slice(0, 3).map(activity => activity.id));
    }
    if (day2Activities.length > 0) {
      setSelectedActivitiesDay2(day2Activities.slice(0, 3).map(activity => activity.id));
    }
    
    // Initialize hotel options from package data
    if (packageData?.hotels && packageData.hotels.length > 0) {
      const day1PackageHotel = packageData.hotels.find(h => h.day === 1);
      const day2PackageHotel = packageData.hotels.find(h => h.day === 2);
      
      if (day1PackageHotel && day1PackageHotel.name) {
        setDay1Hotel(day1PackageHotel.name);
        setDay1MealPlan(day1PackageHotel.mealPlan || 'bed-breakfast');
        setDay1RoomType(day1PackageHotel.roomType || 'luxury');
      }
      
      if (day2PackageHotel && day2PackageHotel.name) {
        setDay2Hotel(day2PackageHotel.name);
        setDay2MealPlan(day2PackageHotel.mealPlan || 'bed-breakfast');
        setDay2RoomType(day2PackageHotel.roomType || 'luxury');
      }
    }
  }, [selectedCategory, packageData]);

  // Handle click outside to close calendars
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (fromCalendarRef.current && !fromCalendarRef.current.contains(event.target)) {
        setShowFromCalendar(false)
      }
      if (toCalendarRef.current && !toCalendarRef.current.contains(event.target)) {
        setShowToCalendar(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Get available hotels from package data
  const getAvailableHotels = (day) => {
    const defaultHotels = [
      { value: "cantaloupe-levels", label: "Cantaloupe Levels - Unawatuna", type: "Beach Resort" },
      { value: "salt-mirissa", label: "Salt Mirissa - Mirissa Beach", type: "Beach Hotel" },
      { value: "other-hotel", label: "Other Hotel (Specify Below)", type: "Custom" }
    ];
    
    if (packageData?.hotels && packageData.hotels.length > 0) {
      const packageHotels = packageData.hotels
        .filter(hotel => hotel.day === day && hotel.name)
        .map(hotel => ({
          value: hotel.name.toLowerCase().replace(/\s+/g, '-'),
          label: `${hotel.name}${hotel.type ? ` - ${hotel.type}` : ''}`,
          type: hotel.type || "Package Hotel",
          packageHotel: true,
          hotelData: hotel
        }));
      
      // Combine package hotels with default options
      return [...packageHotels, ...defaultHotels.filter(h => h.value === "other-hotel")];
    }
    
    return defaultHotels;
  };

  const toggleActivity = (activityId, day) => {
    if (day === 1) {
      setSelectedActivitiesDay1((prev) =>
        prev.includes(activityId) ? prev.filter((id) => id !== activityId) : [...prev, activityId],
      )
    } else {
      setSelectedActivitiesDay2((prev) =>
        prev.includes(activityId) ? prev.filter((id) => id !== activityId) : [...prev, activityId],
      )
    }
  }

  const handleCustomerInfoChange = (field, value) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const calculateTotalPrice = () => {
    let total = 0
    
    // Base package price
    total += 150 // Base price per day
    
    // Activities pricing (each activity $30)
    total += (selectedActivitiesDay1.length + selectedActivitiesDay2.length) * 30
    
    // Hotel pricing
    total += 200 // Day 1 hotel
    total += 250 // Day 2 hotel
    
    return total
  }

  // Helper function to generate WhatsApp message for customer
  const generateCustomerWhatsAppMessage = (packageData) => {
    const message = `
🌴 *CEYLUXE TOURISM - Package Confirmation* 🌴

Dear ${packageData.customerInfo.name},

Thank you for choosing Ceyluxe Tourism! We have received your customization request for:

📋 *${packageData.packageTitle}*
• Travel Dates: ${packageData.travelDates.from} to ${packageData.travelDates.to}
• Duration: ${packageData.duration.days} Days / ${packageData.duration.nights} Nights
• Total Price: $${packageData.totalPrice} ${packageData.currency}

Our travel experts will review your requirements and get back to you within 2 hours with:
✅ Detailed itinerary
✅ Availability confirmation  
✅ Final pricing
✅ Booking instructions

Your customization includes:
🏨 Hotels: ${packageData.dayDetails.map(day => day.hotel.name).join(', ')}
🎯 Activities: ${packageData.dayDetails.flatMap(day => day.activities.map(activity => activity.name)).slice(0, 3).join(', ')}${packageData.dayDetails.flatMap(day => day.activities).length > 3 ? '...' : ''}

For immediate assistance, call us at: +94 75 962 7589

Thank you for choosing Ceyluxe Tourism! 🙏

Best regards,
Ceyluxe Tourism Team
    `.trim();
    
    return encodeURIComponent(message);
  };

  // Helper function to generate WhatsApp message for business (to keep existing functionality)
  const generateWhatsAppMessage = (packageData) => {
    const message = `
🌴 *CEYLUXE TOURISM - Package Customization Request* 🌴

📋 *Package Details:*
• Package: ${packageData.packageTitle}
• Category: ${packageData.category}
• Travel Dates: ${packageData.travelDates.from} to ${packageData.travelDates.to}
• Duration: ${packageData.duration.days} Days / ${packageData.duration.nights} Nights

👤 *Customer Information:*
• Name: ${packageData.customerInfo.name}
• Email: ${packageData.customerInfo.email}
• Phone: ${packageData.customerInfo.phone}
${packageData.customerInfo.specialRequests ? `• Special Requests: ${packageData.customerInfo.specialRequests}` : ''}

📅 *Day 1 Details:*
• Guests: ${packageData.dayDetails[0].guests}
• Transportation: ${packageData.dayDetails[0].transportation}
• Hotel: ${packageData.dayDetails[0].hotel.name} (${packageData.dayDetails[0].hotel.roomType}, ${packageData.dayDetails[0].hotel.mealPlan})
• Activities: ${packageData.dayDetails[0].activities.map(activity => activity.name).join(', ')}

📅 *Day 2 Details:*
• Guests: ${packageData.dayDetails[1].guests}
• Transportation: ${packageData.dayDetails[1].transportation}
• Hotel: ${packageData.dayDetails[1].hotel.name} (${packageData.dayDetails[1].hotel.roomType}, ${packageData.dayDetails[1].hotel.mealPlan})
• Activities: ${packageData.dayDetails[1].activities.map(activity => activity.name).join(', ')}

💰 *Total Package Price: $${packageData.totalPrice} ${packageData.currency}*

Please confirm availability and provide detailed itinerary for this customized package.

Thank you! 🙏
    `.trim();
    
    return encodeURIComponent(message);
  };

  // Helper function to open WhatsApp to customer's number (for you to send message)
  const openWhatsAppToCustomer = (message, customerPhone) => {
    // Clean customer phone number (remove spaces, dashes, etc.)
    const cleanPhone = customerPhone.replace(/[\s\-\(\)]/g, '');
    // Add country code if not present (assuming Sri Lanka +94)
    const phoneNumber = cleanPhone.startsWith('+') ? cleanPhone.slice(1) : 
                       cleanPhone.startsWith('94') ? cleanPhone : 
                       cleanPhone.startsWith('0') ? '94' + cleanPhone.slice(1) : 
                       '94' + cleanPhone;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  // Helper function to open WhatsApp to business number (existing functionality)
  const openWhatsApp = (message) => {
    const phoneNumber = "94759627589"; // Your WhatsApp number without + and spaces
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSubmit = async () => {
    // Validate customer information
    if (!customerInfo.name.trim() || !customerInfo.email.trim() || !customerInfo.phone.trim()) {
      setSubmitError("Please fill in all required customer information fields.")
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      // Prepare customized package data
      const customizedPackageData = {
        // Package details
        packageTitle: `${packageInfo.title} - Customized`,
        category: selectedCategory,
        travelDates: {
          from: dateFrom,
          to: dateTo
        },
        duration: {
          days: parseInt(days),
          nights: parseInt(nights)
        },
        
        // Day-wise details
        dayDetails: [
          {
            day: 1,
            guests: day1Guests,
            transportation: day1Transportation,
            activities: selectedActivitiesDay1.map(id => 
              day1Activities.find(activity => activity.id === id)
            ).filter(Boolean),
            hotel: {
              name: day1UseCustomHotel ? day1CustomHotel : day1Hotel,
              mealPlan: day1MealPlan,
              roomType: day1RoomType,
              price: 200
            }
          },
          {
            day: 2,
            guests: day2Guests,
            transportation: day2Transportation,
            activities: selectedActivitiesDay2.map(id => 
              day2Activities.find(activity => activity.id === id)
            ).filter(Boolean),
            hotel: {
              name: day2UseCustomHotel ? day2CustomHotel : day2Hotel,
              mealPlan: day2MealPlan,
              roomType: day2RoomType,
              price: 250
            }
          }
        ],
        
        // Customer information
        customerInfo: {
          name: customerInfo.name.trim(),
          email: customerInfo.email.trim(),
          phone: customerInfo.phone.trim(),
          specialRequests: customerInfo.specialRequests.trim()
        },
        
        // Pricing
        totalPrice: calculateTotalPrice(),
        currency: "USD",
        
        // Metadata
        source: "website_customization",
        customizationType: selectedCategory
      }

      // Save to Firebase
      const result = await databaseService.customizedPackages.create(customizedPackageData)
      
      if (result.success) {
        setSubmitSuccess(true)
        setSubmitError(null)
        
        // Generate WhatsApp messages
        const businessMessage = generateWhatsAppMessage(customizedPackageData);
        const customerMessage = generateCustomerWhatsAppMessage(customizedPackageData);
        
        // Open WhatsApp to send message to customer first
        setWhatsappStatus('Opening customer WhatsApp...');
        setTimeout(() => {
          openWhatsAppToCustomer(customerMessage, customizedPackageData.customerInfo.phone);
          setWhatsappStatus('Customer WhatsApp opened. Opening business WhatsApp...');
        }, 1000);
        
        // Then open WhatsApp for business notification after a delay
        setTimeout(() => {
          openWhatsApp(businessMessage);
          setWhatsappStatus('Both WhatsApp windows opened successfully!');
        }, 3000);
        
        // Reset form after successful submission
        setTimeout(() => {
          setSubmitSuccess(false)
          setWhatsappStatus('')
          // Optionally redirect or reset form
        }, 8000) // Extended time to account for WhatsApp openings
      } else {
        setSubmitError(result.error || "Failed to save your customization. Please try again.")
      }
    } catch (error) {
      setSubmitError("An error occurred while saving your customization. Please try again.")
      console.error("Submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Calendar event handlers
  const handleDateSelect = (date, isFromDate) => {
    const formattedDate = formatDateForDisplay(date)
    if (isFromDate) {
      setDateFrom(formattedDate)
      setShowFromCalendar(false)
      
      // Auto-update "Date To" if it's before the new "Date From"
      const fromDateObj = new Date(date)
      const toDateObj = new Date(dateTo.replace(/\//g, '-'))
      if (toDateObj <= fromDateObj) {
        const nextDay = new Date(fromDateObj)
        nextDay.setDate(nextDay.getDate() + 1)
        setDateTo(formatDateForDisplay(nextDay))
      }
    } else {
      // Validate that "Date To" is after "Date From"
      const fromDateObj = new Date(dateFrom.replace(/\//g, '-'))
      const toDateObj = new Date(date)
      if (toDateObj <= fromDateObj) {
        alert('End date must be after start date')
        return
      }
      setDateTo(formattedDate)
      setShowToCalendar(false)
    }
  }

  const handleCalendarToggle = (isFromDate) => {
    if (isFromDate) {
      setShowFromCalendar(!showFromCalendar)
      setShowToCalendar(false)
    } else {
      setShowToCalendar(!showToCalendar)
      setShowFromCalendar(false)
    }
    setCalendarDate(new Date())
  }

  const navigateCalendar = (direction) => {
    const newDate = new Date(calendarDate)
    newDate.setMonth(newDate.getMonth() + direction)
    setCalendarDate(newDate)
  }

  // Calendar Component
  const CalendarPopup = ({ isVisible, onClose, onDateSelect, selectedDate }) => {
    if (!isVisible) return null

    const currentYear = calendarDate.getFullYear()
    const currentMonth = calendarDate.getMonth()
    const days = generateCalendarDays(currentYear, currentMonth)
    const monthNames = ["January", "February", "March", "April", "May", "June", 
                       "July", "August", "September", "October", "November", "December"]
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    return (
      <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 p-4 w-80">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigateCalendar(-1)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            ←
          </button>
          <h3 className="font-semibold text-gray-900">
            {monthNames[currentMonth]} {currentYear}
          </h3>
          <button
            onClick={() => navigateCalendar(1)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            →
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day) => (
            <div key={day} className="text-center text-xs font-medium text-gray-500 p-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((date, index) => {
            const isCurrentMonth = isSameMonth(date, currentMonth)
            const isTodayDate = isToday(date)
            const isSelected = selectedDate === formatDateForDisplay(date)
            const isPastDate = date < new Date().setHours(0, 0, 0, 0)
            
            return (
              <button
                key={index}
                onClick={() => isCurrentMonth && !isPastDate && onDateSelect(date)}
                className={`
                  p-2 text-sm rounded transition-colors
                  ${!isCurrentMonth ? 'text-gray-300 cursor-not-allowed' : 'text-gray-900'}
                  ${isPastDate ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-blue-100'}
                  ${isTodayDate ? 'bg-blue-500 text-white hover:bg-blue-600' : ''}
                  ${isSelected ? 'bg-blue-200 text-blue-900' : ''}
                `}
                disabled={!isCurrentMonth || isPastDate}
              >
                {date.getDate()}
              </button>
            )
          })}
        </div>

        {/* Close button */}
        <div className="mt-4 text-center">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">{packageInfo.title}</h1>
          <p className="text-lg text-gray-600">{packageInfo.description}</p>
        </div>

        {/* Basic Package Details */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Customize Basic Package Details</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Travel Dates Date From</label>
                <div className="relative" ref={fromCalendarRef}>
                  <input
                    type="text"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="YYYY/MM/DD"
                  />
                  <Calendar 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 cursor-pointer hover:text-blue-500" 
                    onClick={() => handleCalendarToggle(true)}
                  />
                  <CalendarPopup
                    isVisible={showFromCalendar}
                    onClose={() => setShowFromCalendar(false)}
                    onDateSelect={(date) => handleDateSelect(date, true)}
                    selectedDate={dateFrom}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Travel Dates Date To</label>
                <div className="relative" ref={toCalendarRef}>
                  <input
                    type="text"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="YYYY/MM/DD"
                  />
                  <Calendar 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 cursor-pointer hover:text-blue-500" 
                    onClick={() => handleCalendarToggle(false)}
                  />
                  <CalendarPopup
                    isVisible={showToCalendar}
                    onClose={() => setShowToCalendar(false)}
                    onDateSelect={(date) => handleDateSelect(date, false)}
                    selectedDate={dateTo}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Days</label>
                <select
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Nights</label>
                <select
                  value={nights}
                  onChange={(e) => setNights(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Day 1 Package Details */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Customize Day 1 Package Details</h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Transportation</label>
                <select 
                  value={day1Transportation}
                  onChange={(e) => setDay1Transportation(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="private-vehicle">Private Vehicle</option>
                  <option value="public-transport">Public Transport</option>
                  <option value="rental-car">Rental Car</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Number of Guests</label>
                <div className="flex items-center space-x-3">
                  <button
                    className="h-8 w-8 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => setDay1Guests(Math.max(1, day1Guests - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="text-lg font-medium w-8 text-center">{day1Guests}</span>
                  <button
                    className="h-8 w-8 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => setDay1Guests(day1Guests + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Select Activities</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {day1Activities.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-100 rounded-lg">
                    <input
                      type="checkbox"
                      id={activity.id}
                      checked={selectedActivitiesDay1.includes(activity.id)}
                      onChange={() => toggleActivity(activity.id, 1)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <label htmlFor={activity.id} className="text-sm font-medium cursor-pointer block truncate">
                        {activity.name}
                      </label>
                    </div>
                    <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded">
                      {activity.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Day 2 Package Details */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Customize Day 2 Package Details</h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Transportation</label>
                <select 
                  value={day2Transportation}
                  onChange={(e) => setDay2Transportation(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="private-vehicle">Private Vehicle</option>
                  <option value="public-transport">Public Transport</option>
                  <option value="rental-car">Rental Car</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Number of Guests</label>
                <div className="flex items-center space-x-3">
                  <button
                    className="h-8 w-8 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => setDay2Guests(Math.max(1, day2Guests - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="text-lg font-medium w-8 text-center">{day2Guests}</span>
                  <button
                    className="h-8 w-8 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => setDay2Guests(day2Guests + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Select Activities</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {day2Activities.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-100 rounded-lg">
                    <input
                      type="checkbox"
                      id={activity.id}
                      checked={selectedActivitiesDay2.includes(activity.id)}
                      onChange={() => toggleActivity(activity.id, 2)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <label htmlFor={activity.id} className="text-sm font-medium cursor-pointer block truncate">
                        {activity.name}
                      </label>
                    </div>
                    <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded">
                      {activity.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Hotel Customization */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6 space-y-8">
            {/* Day 1 Hotel */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Day 1 hotel Customize</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Hotel</label>
                  <select 
                    value={day1UseCustomHotel ? "other-hotel" : day1Hotel}
                    onChange={(e) => {
                      if (e.target.value === "other-hotel") {
                        setDay1UseCustomHotel(true);
                      } else {
                        setDay1UseCustomHotel(false);
                        setDay1Hotel(e.target.value);
                        // Set default values from package hotel if available
                        const selectedHotel = getAvailableHotels(1).find(h => h.value === e.target.value);
                        if (selectedHotel?.hotelData) {
                          setDay1MealPlan(selectedHotel.hotelData.mealPlan || 'bed-breakfast');
                          setDay1RoomType(selectedHotel.hotelData.roomType || 'luxury');
                        }
                      }
                    }}
                    className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {getAvailableHotels(1).map(hotel => (
                      <option key={hotel.value} value={hotel.value}>
                        {hotel.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Meal Plan</label>
                  <select 
                    value={day1MealPlan}
                    onChange={(e) => setDay1MealPlan(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="bed-breakfast">Bed & Breakfast</option>
                    <option value="half-board">Half Board</option>
                    <option value="full-board">Full Board</option>
                    <option value="all-inclusive">All Inclusive</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Room type</label>
                  <select 
                    value={day1RoomType}
                    onChange={(e) => setDay1RoomType(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="standard">Standard</option>
                    <option value="deluxe">Deluxe</option>
                    <option value="luxury">Luxury</option>
                    <option value="suite">Suite</option>
                  </select>
                </div>
                <button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                  Price 200 $
                </button>
              </div>
              
              {/* Custom Hotel Input for Day 1 */}
              {day1UseCustomHotel && (
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Hotel Name
                  </label>
                  <input
                    type="text"
                    value={day1CustomHotel}
                    onChange={(e) => setDay1CustomHotel(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Jetwing Lighthouse, Heritance Negombo..."
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    Please specify your preferred hotel. Our travel experts will check availability and pricing.
                  </p>
                </div>
              )}
            </div>

            {/* Day 2 Hotel */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Day 2 hotel Customize</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Hotel</label>
                  <select 
                    value={day2UseCustomHotel ? "other-hotel" : day2Hotel}
                    onChange={(e) => {
                      if (e.target.value === "other-hotel") {
                        setDay2UseCustomHotel(true);
                      } else {
                        setDay2UseCustomHotel(false);
                        setDay2Hotel(e.target.value);
                        // Set default values from package hotel if available
                        const selectedHotel = getAvailableHotels(2).find(h => h.value === e.target.value);
                        if (selectedHotel?.hotelData) {
                          setDay2MealPlan(selectedHotel.hotelData.mealPlan || 'bed-breakfast');
                          setDay2RoomType(selectedHotel.hotelData.roomType || 'luxury');
                        }
                      }
                    }}
                    className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {getAvailableHotels(2).map(hotel => (
                      <option key={hotel.value} value={hotel.value}>
                        {hotel.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Meal Plan</label>
                  <select 
                    value={day2MealPlan}
                    onChange={(e) => setDay2MealPlan(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="bed-breakfast">Bed & Breakfast</option>
                    <option value="half-board">Half Board</option>
                    <option value="full-board">Full Board</option>
                    <option value="all-inclusive">All Inclusive</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Room type</label>
                  <select 
                    value={day2RoomType}
                    onChange={(e) => setDay2RoomType(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="standard">Standard</option>
                    <option value="deluxe">Deluxe</option>
                    <option value="luxury">Luxury</option>
                    <option value="suite">Suite</option>
                  </select>
                </div>
                <button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                  Price 250 $
                </button>
              </div>
              
              {/* Custom Hotel Input for Day 2 */}
              {day2UseCustomHotel && (
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Hotel Name
                  </label>
                  <input
                    type="text"
                    value={day2CustomHotel}
                    onChange={(e) => setDay2CustomHotel(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Shangri-La Colombo, Cinnamon Grand..."
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    Please specify your preferred hotel. Our travel experts will check availability and pricing.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Customer Information */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <User className="h-6 w-6 text-blue-600" />
              Customer Information
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={customerInfo.name}
                    onChange={(e) => handleCustomerInfoChange('name', e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => handleCustomerInfoChange('email', e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) => handleCustomerInfoChange('phone', e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Special Requests (Optional)
                </label>
                <textarea
                  value={customerInfo.specialRequests}
                  onChange={(e) => handleCustomerInfoChange('specialRequests', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Any special dietary requirements, accessibility needs, etc."
                  rows={3}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Total Package Price */}
        <div className="flex justify-center">
          <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold text-lg py-4 px-12 rounded-lg shadow-lg">
            Total Package Price - ${calculateTotalPrice()}
          </div>
        </div>

        {/* Error/Success Messages */}
        {submitError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <p className="text-red-600 font-medium">{submitError}</p>
          </div>
        )}

        {submitSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <p className="text-green-600 font-medium">
              🎉 Package saved successfully! {whatsappStatus}
            </p>
            <p className="text-green-600 text-sm mt-2">
              1️⃣ Customer WhatsApp: Confirmation message<br/>
              2️⃣ Business WhatsApp: Internal notification
            </p>
          </div>
        )}

        {/* Hotel Suggestions */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Hotel Suggestions</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Salt Mirissa (Mirissa)</h4>
                <p className="text-sm text-gray-700">
                  Based on your whale watching and surfing plans, staying right on Mirissa Beach will save you travel
                  time and give you direct access to boat tours and surf schools.
                </p>
              </div>
              <div className="p-4 border-l-4 border-green-500 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Thaproban Pavilion Resort & Spa (Unawatuna)</h4>
                <p className="text-sm text-gray-700">
                  A beachfront resort perfect for snorkeling and relaxing by the sea, close to Jungle Beach and
                  beautiful sunset spots.
                </p>
              </div>
              <div className="p-4 border-l-4 border-purple-500 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Thaproban Beach House (Unawatuna)</h4>
                <p className="text-sm text-gray-700">
                  Located directly on the beach, ideal for easy access to swimming, beach dining, and coastal walks,
                  keeping you close to all beach activities.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Book Button */}
        <div className="flex justify-center">
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting || submitSuccess}
            className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold text-lg py-4 px-12 rounded-lg transition-colors flex items-center gap-3"
          >
            {isSubmitting && (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            )}
            {isSubmitting ? 'Saving Your Customization...' : 
             submitSuccess ? 'WhatsApp Messages Sent!' : 
             'Save & Send WhatsApp Confirmations'}
          </button>
        </div>
      </div>
    </div>
  )
}
