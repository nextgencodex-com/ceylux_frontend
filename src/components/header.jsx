"use client"

import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Menu, X } from "lucide-react"

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
            src="/images/Tour-Concept.png" 
            alt="Ceyluxe Logo" 
            className="h-32 w-auto object-contain"
          />
        </div>

        {/* Desktop Navigation - Centered */}
        <div className="hidden md:flex justify-center w-full">
          <nav className="bg-white backdrop-blur-sm rounded-full p-1.5 shadow-lg border border-cyan-400 agbalumo-font">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item)}
                className={`px-3 lg:px-5 py-2.5 text-sm font-medium transition-all duration-200 rounded-full whitespace-nowrap ${
                  location.pathname === item.path
                    ? "bg-gradient-to-r from-[#3b82f6]/20 via-[#22c55e]/20 to-[#eab308]/20 text-black shadow-sm"
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
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>

        {/* Mobile Layout - Logo centered */}
        <div className="md:hidden flex-1 flex justify-center">
          <img 
            src="/images/Tour-Concept.png"
            alt="Ceyluxe Logo" 
            className="h-24 w-auto object-contain"
          />
        </div>

        {/* Mobile Menu Button - Right Side (REMOVED Settings icon, only Menu button remains) */}
        <div className="md:hidden flex items-center">
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
                
                {/* Admin Access in Mobile Menu - Only icon, no text */}
                <div className="pt-3 border-t border-white/20">
                  <button
                    onClick={() => {
                      navigate('/admin/login');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-center px-4 py-3 text-base font-medium transition-all duration-300 rounded-xl bg-white/10 text-white hover:bg-white/20 border border-white/20 flex items-center justify-center"
                    title="Admin Dashboard"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
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