"use client"

import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Menu, X, Settings } from "lucide-react"

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About us", path: "/about" },
    { name: "Planning a trip", path: "/planning" },
    { name: "Destinations", path: "/destinations" },
    { name: "Key experiences", path: "/experiences" },
    { name: "Contact us", path: "/contactus" }
  ]

  const handleNavClick = (item) => {
    navigate(item.path)
    setIsMobileMenuOpen(false)
  }

  return (
    <>
              <header className="flex justify-between items-center pt-4 sm:pt-6 px-2 sm:px-4 relative z-50 h-20">
          {/* Logo - Desktop (left side) */}
          <div className="hidden md:block">
            <img 
              src="/images/logo1.png" 
              alt="Ceyluxe Logo" 
              className="h-32 w-auto object-contain"
            />
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex justify-center w-full">
            <nav className="bg-white backdrop-blur-sm rounded-full p-1.5 shadow-lg border border-cyan-400">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item)}
                  className={`px-3 lg:px-5 py-2.5 text-sm font-medium transition-all duration-200 rounded-full whitespace-nowrap ${
                    location.pathname === item.path
                      ? "bg-cyan-400 text-white shadow-sm"
                      : "text-black hover:text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Admin Access Button - Desktop (right side) */}
          <div className="hidden md:block">
            <button
              onClick={() => navigate('/admin/login')}
              className="bg-gray-800 hover:bg-gray-900 text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105"
              title="Admin Dashboard"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Layout - Logo centered */}
          <div className="md:hidden flex-1 flex justify-center">
            <img 
              src="/images/logo1.png" 
              alt="Ceyluxe Logo" 
              className="h-24 w-auto object-contain"
            />
          </div>

          {/* Mobile Menu Button - Right Side */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Admin Access Button - Mobile */}
            <button
              onClick={() => navigate('/admin/login')}
              className="bg-gray-800 hover:bg-gray-900 text-white p-2.5 rounded-full shadow-lg transition-all duration-200"
              title="Admin Dashboard"
            >
              <Settings className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg border border-gray-200/50 hover:bg-white/95 transition-all duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-slate-700" />
              ) : (
                <Menu className="w-5 h-5 text-slate-700" />
              )}
            </button>
          </div>
        </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mx-4 max-w-xs w-full border border-white/20">
              <div className="space-y-3">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item)}
                    className={`w-full text-center px-4 py-3 text-base font-medium transition-all duration-300 rounded-xl ${
                      location.pathname === item.path
                        ? "bg-white/20 text-white shadow-lg border border-white/30"
                        : "text-white hover:bg-white/10 hover:text-white border border-transparent"
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
                
                {/* Admin Access in Mobile Menu */}
                <div className="pt-3 border-t border-white/20">
                  <button
                    onClick={() => {
                      navigate('/admin/login');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-center px-4 py-3 text-base font-medium transition-all duration-300 rounded-xl bg-gray-800/80 text-white hover:bg-gray-800 border border-gray-600/50 flex items-center justify-center"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Admin Dashboard
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}