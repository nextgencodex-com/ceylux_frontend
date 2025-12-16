"use client"

import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
import { useNavigate } from "react-router-dom"

export default function Footer() {
  const navigate = useNavigate()

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About us", path: "/about" },
    { name: "Planning a trip", path: "/planning" },
    { name: "Destinations", path: "/destinations" },
    { name: "Key Experiences", path: "/experiences" },
    { name: "Contact us", path: "/contactus" }
  ]

  // Social links
  const social = {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    twitter: "https://twitter.com",
    youtube: "https://youtube.com"
  }

  return (
    <footer className="relative mt-16 sm:mt-20 lg:mt-24">
      <div className="mx-4 sm:mx-6 lg:mx-8 mb-8">
        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl">

          {/* Background Image */}
          <div className="relative h-[500px] sm:h-[500px] lg:h-[400px]">
            <img
              src="/images/footer 2.jpg"
              alt="Tropical island paradise footer background"
              className="w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20"></div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8 lg:p-12">

              {/* TOP NAV */}
              <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 mb-8">
                {navItems.map((item, index) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <button
                      onClick={() => navigate(item.path)}
                      className="text-white text-sm sm:text-base font-medium hover:text-cyan-200 transition-colors"
                    >
                      {item.name}
                    </button>

                    {index < navItems.length - 1 && (
                      <span className="text-white/60 hidden sm:inline">•</span>
                    )}
                  </div>
                ))}
              </nav>

              {/* CENTER TEXT */}
              <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8 leading-tight drop-shadow-lg">
                  Get started on planning
                  <br />
                  the best trip ever.
                </h2>
                <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-white drop-shadow-md tracking-wider">
                  SRI LANKA
                </p>
              </div>

              {/* BOTTOM */}
              <div className="flex flex-col -space-y-12">

                {/* Logo + Copyright */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
                  <img
                    src="/images/logo.png"
                    alt="Ceyluxe Logo"
                    className="h-20 w-auto object-contain drop-shadow-lg"
                  />

                  <div className="text-center sm:text-right">
                    <p className="text-white text-sm font-medium drop-shadow-md">
                      CONCEPT AND DESIGN BY <span className="font-bold">NextGen CodeX</span>
                    </p>
                    <p className="text-white/80 text-xs mt-1">
                      © {new Date().getFullYear()} Magic Island Tours. All rights reserved.
                    </p>
                  </div>
                </div>

                {/* SOCIAL ICONS */}
                <div className="flex justify-center mt-6">
                  <div className="flex gap-4">

                    <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="text-white hover:text-cyan-200 transition-colors">
                      <Facebook className="w-6 h-6" />
                    </a>

                    <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="text-white hover:text-cyan-200 transition-colors">
                      <Instagram className="w-6 h-6" />
                    </a>

                    <a href={social.twitter} target="_blank" rel="noopener noreferrer" className="text-white hover:text-cyan-200 transition-colors">
                      <Twitter className="w-6 h-6" />
                    </a>

                    <a href={social.youtube} target="_blank" rel="noopener noreferrer" className="text-white hover:text-cyan-200 transition-colors">
                      <Youtube className="w-6 h-6" />
                    </a>

                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}