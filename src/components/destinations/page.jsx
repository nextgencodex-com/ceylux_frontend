import React, { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function PopularDestinations() {
  const navigate = useNavigate();
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const destinations = [
        {
          id: 1,
          title: "Sigiriya Rock Fortress",
          description:
            "Explore Sri Lanka's iconic Lion Rock fortress with palace ruins, ancient frescoes, and sweeping views over the jungle landscape.",
          image: "/images/sigiriya cover.jpg",
          alt: "Sigiriya Rock Fortress with ancient ruins",
        },
        {
          id: 2,
          title: "Ella",
          description:
            "A peaceful hill country town famous for Little Adam's Peak, Nine Arch Bridge, tea plantations, and scenic train rides.",
          image: "/images/ella cover.jpg",
          alt: "Ella hill country with green tea plantations",
        },
        {
          id: 3,
          title: "Yala National Park",
          description:
            "Go on a thrilling safari to see leopards, elephants, sloth bears, and hundreds of bird species in Sri Lanka's most popular national park.",
          image: "/images/yala.jpg",
          alt: "Leopard in Yala National Park",
        },
        {
          id: 4,
          title: "Mirissa Beach",
          description:
            "Perfect for whale watching, surfing, and relaxing under palm trees—Mirissa is a vibrant beach getaway on the south coast.",
          image: "/images/coconut-hill.jpg",
          alt: "Mirissa Beach sunset with palm trees",
        },
        {
          id: 5,
          title: "Dambulla Cave Temple",
          description:
            "A series of golden cave temples with more than 150 Buddha statues and ancient murals—a spiritual and artistic treasure.",
          image: "/images/cave cover.jpg",
          alt: "Golden Buddha statues in Dambulla Cave Temple",
        },
        {
          id: 6,
          title: "Pidurangala Rock",
          description:
            "Just next to Sigiriya, this lesser-known rock offers an amazing panoramic view of Lion Rock—especially at sunrise.",
          image: "/images/pidurangala cover.jpg",
          alt: "Hikers on Pidurangala Rock with mountain views",
        },
        {
          id: 7,
          title: "Kandy",
          description:
            "The cultural capital of Sri Lanka, home to the Temple of the Sacred Tooth Relic and surrounded by misty mountains.",
          image: "/images/kandy.jpg",
          alt: "Temple of the Sacred Tooth Relic in Kandy",
        },
        {
          id: 8,
          title: "Galle Fort",
          description:
            "A beautifully preserved 17th-century Dutch fort with colonial architecture, boutique hotels, and ocean views.",
          image: "/images/galle.jpg",
          alt: "Galle Fort with colonial architecture",
        },
        {
          id: 9,
          title: "Anuradhapura",
          description:
            "One of the ancient capitals of Sri Lanka, featuring the sacred Bodhi tree and impressive Buddhist monuments.",
          image: "/images/anuradhapura.jpg",
          alt: "Ancient stupas in Anuradhapura",
        },
        {
          id: 10,
          title: "Polonnaruwa",
          description:
            "The second ancient capital of Sri Lanka, featuring well-preserved ruins and the famous Gal Vihara Buddha statues.",
          image: "/images/polonnaruwa.jpg",
          alt: "Gal Vihara Buddha statues in Polonnaruwa",
        },
        {
          id: 11,
          title: "Nuwara Eliya",
          description:
            "Known as 'Little England', this hill station features tea plantations, colonial architecture, and cool mountain air.",
          image: "/images/nuwaraeliya cover.jpg",
          alt: "Tea plantations in Nuwara Eliya",
        },
        {
          id: 12,
          title: "Bentota",
          description:
            "A beautiful beach destination with golden sands, water sports, and the historic Galapatha Temple.",
          image: "/images/ben.jpg",
          alt: "Bentota Beach with golden sands",
        }
  ]

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
            src="/images/Destination.jpeg"
            alt="Beautiful Sri Lanka destinations and landscapes"
            className="w-full h-full object-cover"
          />

          {/* Hero Content Overlay with font changes */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-2 sm:px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-2 sm:mb-4 drop-shadow-lg agbalumo-font">
              Discover
              <br />
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl">Destinations</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-1 sm:mb-2 drop-shadow-md font-medium agbalumo-font">
              Explore Sri Lanka's Hidden Gems
            </p>
            <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6 lg:mb-8 drop-shadow-md agbalumo-font">
              From Ancient Fortresses to Pristine Beaches
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

      {/* Destinations Content Section */}
      <div className="py-12 px-4 sm:px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12">
          <span className="text-cyan-400">Most</span> <span className="text-gray-800">Popular</span>{" "}
          <span className="text-cyan-400">Destinations</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination) => (
              <div
                key={destination.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.alt}
                    className="object-cover w-full h-full"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {destination.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {destination.description}
                  </p>

                  <Link to={`/destinations/${destination.id}`}>
                    <button className="w-full bg-cyan-400 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200">
                      Read More
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
