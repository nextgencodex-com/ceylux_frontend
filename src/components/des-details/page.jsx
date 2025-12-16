import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

// Complete destination data
const destinations = [
  {
    id: 1,
    title: "Sigiriya Rock Fortress",
    description:
      "Sigiriya, also known as Lion Rock, is one of Sri Lanka's most iconic and awe-inspiring destinations. Located in the heart of the island, this UNESCO World Heritage Site is a 200-meter-high ancient rock fortress built in the 5th century by King Kashyapa. With stunning frescoes, royal palace ruins, and lush landscaped gardens, Sigiriya blends natural beauty with historic grandeur. One of Sigiriya's most fascinating features is the Mirror Wall, a polished wall once used for royal reflection, now covered with ancient poems and graffiti dating back over a thousand years. Visitors can also explore the summit ruins of the palace, which offer breathtaking panoramic views of the landscape. The climb to the top involves around 1200 steps, passing by caves, murals, and stone stairways—a journey that blends nature, history, and architecture in a uniquely immersive experience.",
    image: "/images/sigiriya hero 1.jpeg",
    gallery: ["/images/sigiriya 1.jpg", "/images/sigiriya 2.jpg", "/images/sigiriya 3.jpg", "/images/sigiriya 4.jpg"],
  },
  {
    id: 2,
    title: "Ella",
    description:
      "Ella is a serene hill town surrounded by cloud forests and tea plantations. It's known for hikes like Little Adam's Peak and the breathtaking Nine Arch Bridge. This picturesque destination is famous for its stunning landscapes, tea plantations, and laid-back atmosphere. Key attractions include Little Adam's Peak for sunrise hikes, Nine Arch Bridge - an architectural marvel, tea plantations and factory tours, scenic train rides through the mountains, and waterfalls and hiking trails. Ella offers a perfect escape from the heat of the lowlands, with cool mountain air and breathtaking views of rolling hills covered in tea bushes. It's a haven for nature lovers and adventure seekers.",
    image: "/images/Ella hero 1.jpg",
    gallery: ["/images/Ella 1.jpg", "/images/Ella 2.jpg", "/images/Ella 3.jpg", "/images/Ella 4.jpg"],
  },
  {
    id: 3,
    title: "Yala National Park",
    description:
      "Yala National Park is Sri Lanka's most famous wildlife destination, home to leopards, elephants, and sloth bears. It's renowned for its high density of leopards and diverse wildlife. The park features one of the highest leopard densities in the world, large herds of Asian elephants, sloth bears and crocodiles, over 200 species of birds, beautiful coastal landscapes, and ancient Buddhist temples within the park. Safari tours are available in the early morning and late afternoon when wildlife is most active. The park's varied ecosystems include forests, grasslands, lagoons, and beaches.",
    image: "/images/yala hero 1.jpg",
    gallery: ["/images/yala 1.jpg", "/images/yala 2.jpg", "/images/yala 3.jpg", "/images/yala 4.jpg"],
  },
  {
    id: 4,
    title: "Mirissa Beach",
    description:
      "Mirissa is a small town on the south coast of Sri Lanka, famous for its beautiful beaches, whale watching, and laid-back atmosphere. It's one of the best places in the world to see blue whales. Popular activities include whale watching tours (November to April), surfing lessons and board rentals, beach relaxation and swimming, fresh seafood dining, sunset viewing, and island hopping to nearby beaches. The crescent-shaped beach is lined with palm trees and offers a perfect blend of adventure and relaxation. The town has a vibrant backpacker scene with plenty of accommodation and dining options.",
    image: "/images/mirissa hero 1.jpg",
    gallery: ["/images/mirissa 1.jpg", "/images/mirissa 2.jpg", "/images/mirissa 3.jpg", "/images/mirissa 4.jpg"],
  },
  {
    id: 5,
    title: "Dambulla Cave Temple",
    description:
      "The Dambulla Cave Temple, also known as the Golden Temple of Dambulla, is a UNESCO World Heritage site located in the central part of Sri Lanka. It's the largest and best-preserved cave temple complex in the country. The temple complex features five caves with over 150 Buddha statues, ancient murals covering 2,100 square meters, a 14-meter golden Buddha statue, stunning views of the surrounding countryside, and religious significance for Buddhists. The caves date back to the 1st century BCE and have been continuously maintained and enhanced over the centuries. The temple is an important pilgrimage site and a testament to Sri Lanka's rich Buddhist heritage.",
    image: "/images/dambulla.jpg",
    gallery: ["/images/cave 1.jpg", "/images/cave 2.jpg", "/images/cave 3.jpg", "/images/cave 4.jpg"],
  },
  {
    id: 6,
    title: "Pidurangala Rock",
    description:
      "Pidurangala Rock is a massive rock formation located just north of Sigiriya. While less famous than its neighbor, it offers one of the best views of Sigiriya and the surrounding landscape, especially at sunrise. The hike features a moderate 30-45 minute climb, ancient Buddhist temple at the base, stunning views of Sigiriya Rock, panoramic vistas of the countryside, fewer crowds than Sigiriya, and perfect sunrise and sunset viewing spots. The rock is home to an ancient Buddhist temple and offers a more peaceful alternative to the busy Sigiriya site. The view from the top is absolutely spectacular, making it a favorite among photographers and nature lovers.",
    image: "/images/pidurangala hero 1.jpg",
    gallery: ["/images/rock 1.jpg", "/images/rock 2.jpg", "/images/rock 3.jpg", "/images/rock 4.jpg"],
  },
  {
    id: 7,
    title: "Kandy",
    description:
      "Kandy, the last capital of the ancient kings' era of Sri Lanka, is a UNESCO World Heritage site and the cultural heart of the island. Nestled among misty mountains, this charming city is famous for its rich cultural heritage. Key attractions include the Temple of the Sacred Tooth Relic - home to Buddha's tooth, Royal Botanical Gardens with rare orchids, cultural dance performances, tea plantations and factories, scenic mountain views and waterfalls, and traditional Ayurvedic treatments. The city comes alive during the Esala Perahera festival in July/August, when the sacred tooth relic is paraded through the streets with traditional dancers, drummers, and decorated elephants.",
    image: "/images/kandy hero 2.jpg",
    gallery: ["/images/kandy 1.jpg", "/images/kandy 2.jpg", "/images/kandy 3.jpg", "/images/kandy 4.jpg"],
  },
  {
    id: 8,
    title: "Galle Fort",
    description:
      "Galle Fort is a UNESCO World Heritage site and one of the best-preserved examples of a fortified city built by Europeans in South and Southeast Asia. The fort was built by the Portuguese in 1588 and extensively fortified by the Dutch. The fort features well-preserved colonial architecture, lighthouse and ramparts with ocean views, boutique hotels and restaurants, art galleries and museums, historic churches and mosques, and charming cobblestone streets. Walking through the fort feels like stepping back in time, with its narrow streets, colonial buildings, and the sound of waves crashing against the ancient walls. It's a perfect blend of history and modern luxury.",
    image: "/images/galle fort hero 1.jpg",
    gallery: ["/images/fort 1.jpg", "/images/fort 2.jpg", "/images/fort 3.jpg", "/images/fort 4.jpg"],
  },
  {
    id: 9,
    title: "Anuradhapura",
    description:
      "Anuradhapura was the first capital of Sri Lanka and is one of the oldest continuously inhabited cities in the world. This UNESCO World Heritage site is home to some of the most impressive Buddhist monuments in Asia. Key sites include the Sacred Bodhi Tree - grown from a cutting of the original tree under which Buddha attained enlightenment, Ruwanwelisaya Stupa - one of the tallest ancient monuments in the world, Jetavanaramaya - the largest brick structure in the ancient world, Abhayagiri Monastery complex, ancient royal palaces and bathing ponds, and moonstone carvings and guard stones. The city was the center of Theravada Buddhism for many centuries and remains an important pilgrimage site for Buddhists from around the world.",
    image: "/images/anuradhapura hero 2.jpg",
    gallery: ["/images/anu 1.jpg", "/images/anu 2.jpg", "/images/anu 3.jpg", "/images/anu 4.jpg"],
  },
  {
    id: 10,
    title: "Polonnaruwa",
    description:
      "Polonnaruwa was the second capital of Sri Lanka after the destruction of Anuradhapura in 993. This UNESCO World Heritage site contains some of the best-preserved ruins of the ancient world. The site features Gal Vihara - four magnificent Buddha statues carved from a single granite rock, Royal Palace complex with audience halls, Quadrangle with the Vatadage and other religious buildings, Lankatilaka Temple with impressive architecture, ancient irrigation systems and reservoirs, and archaeological museum with artifacts. The ruins are spread over a large area and can be explored by bicycle, making it a unique way to experience the ancient city. The site offers a fascinating glimpse into the sophisticated urban planning of ancient Sri Lanka.",
    image: "/images/polonnaruwa hero 1.jpg",
    gallery: ["/images/polon 1.jpg", "/images/polon 2.jpg", "/images/polon 3.jpg", "/images/polon 4.jpg"],
  },
  {
    id: 11,
    title: "Nuwara Eliya",
    description:
      "Nuwara Eliya, often called 'Little England', is a hill station located in the central highlands of Sri Lanka. The city was developed by the British during the colonial period and retains much of its colonial charm. Key attractions include tea plantations and factory tours, colonial architecture and hotels, Victoria Park with seasonal flowers, Gregory Lake for boating, golf course with mountain views, and horse racing track. The cool climate and misty atmosphere make it a perfect escape from the heat of the lowlands. The city is surrounded by rolling hills covered in tea bushes, creating a picturesque landscape that's perfect for photography and relaxation.",
    image: "/images/nuwaraeliya hero 1.jpg",
    gallery: ["/images/ne 1.jpg", "/images/ne 2.jpg", "/images/ne 3.jpg", "/images/ne 4.jpg"],
  },
  {
    id: 12,
    title: "Bentota",
    description:
      "Bentota is a popular beach destination located on the southwest coast of Sri Lanka, known for its golden sands, clear waters, and excellent water sports facilities. The area offers a perfect blend of beach relaxation and adventure. Popular activities include water sports (jet skiing, windsurfing, banana boat rides), river cruises on the Bentota River, beach relaxation and swimming, Galapatha Temple visit, Ayurvedic spa treatments, and fresh seafood dining. The Bentota River meets the ocean here, creating a unique ecosystem that's perfect for river cruises and wildlife watching. The area is also known for its Ayurvedic treatments and wellness retreats.",
    image: "/images/beach-1.jpg",
    gallery: ["/images/ben 1.jpg", "/images/ben 2.jpg", "/images/ben 3.jpg", "/images/ben 4.jpg"],
  }
];

export default function DestinationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const destination = destinations.find((d) => d.id === parseInt(id));
  
  // Scroll to top when component mounts or id changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  
  const handleCustomize = (pkg) => {
    navigate('/customize-packages', { state: { packageData: pkg } });
  };

  if (!destination) {
    return (
      <div className="text-center text-red-600 py-20 text-xl font-semibold">
        Destination not found.
      </div>
    );
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

      {/* Hero Section with destination image */}
      <div className="relative mt-4 sm:mt-6 lg:mt-8 mx-2 sm:mx-4 lg:mx-8">
        <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-2xl sm:rounded-3xl overflow-hidden">
          <img
            src={destination.image}
            alt={destination.title}
            className="w-full h-full object-cover"
          />

          {/* Hero Content Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-2 sm:px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-2 sm:mb-4 drop-shadow-lg agbalumo-font">
              {destination.title}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-1 sm:mb-2 drop-shadow-md font-medium agbalumo-font">
              Discover the Magic
            </p>
            <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6 lg:mb-8 drop-shadow-md agbalumo-font">
              Experience Sri Lanka's Hidden Treasures
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-900">{destination.title}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Description */}
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">{destination.description}</p>
          </div>

          {/* Main Image */}
          <div className="rounded-lg overflow-hidden">
            <img
              src={destination.image}
              alt={destination.title}
              className="w-full h-80 object-cover"
            />
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {destination.gallery.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`${destination.title} ${index + 1}`}
              className="w-full h-48 object-cover rounded-lg"
            />
          ))}
        </div>

        {/* Best Time to Visit */}
        <div className="mb-12">
          <p className="text-gray-700 leading-relaxed">
            The best time to visit {destination.title.split(" ")[0]} is during the dry season, from December to April,
            when the weather is sunny and the journey is more comfortable. Early mornings (before 9 AM) or late
            afternoons (after 4 PM) are ideal to avoid crowds and heat.
          </p>
        </div>

        {/* Recommended Packages */}
        <div>
          <h2 className="text-2xl font-bold mb-8 text-cyan-400">Recommend packages</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Package 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="relative">
                <img
                  src="/images/cult.jpg"
                  alt="Cultural Triangle Discovery"
                  className="w-full h-48 object-cover"
                />
                <span className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded text-sm font-medium">
                  BH - 01
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900">Cultural Triangle Discovery</h3>
                <p className="text-gray-600 mb-2">7 Days / 6 Night</p>
                <p className="text-gray-700 text-sm mb-4">
                  Explore the ancient heritage of Sri Lanka with visits to Sigiriya Rock Fortress, Dambulla Cave Temple,
                  and the sacred city of Kandy.
                </p>

                <div className="mb-4">
                  <h4 className="font-semibold mb-2 text-gray-900">Highlight:</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      Sigiriya Rock Fortress
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      Dambulla Cave Temple
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      Temple of the Tooth (Kandy)
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      Cultural Dance Show
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <p className="text-lg font-bold text-gray-900">Starting from $430 per person</p>
                  <button 
                    onClick={() => handleCustomize({
                      title: "Cultural Triangle Discovery",
                      price: "$430",
                      category: "cultural-heritage",
                      duration: "7 Days / 6 Nights",
                      highlights: ["Sigiriya Rock Fortress", "Dambulla Cave Temple", "Temple of the Tooth", "Cultural Dance Show"]
                    })}
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

            {/* Package 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="relative">
                <img
                  src="/images/wild.jpg"
                  alt="Wildlife Adventure"
                  className="w-full h-48 object-cover"
                />
                <span className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded text-sm font-medium">
                  BH - 02
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900">Wildlife Adventure</h3>
                <p className="text-gray-600 mb-2">5 Days / 4 Night</p>
                <p className="text-gray-700 text-sm mb-4">
                  Experience Sri Lanka's incredible wildlife with safaris in Yala National Park and visits to elephant sanctuaries.
                </p>

                <div className="mb-4">
                  <h4 className="font-semibold mb-2 text-gray-900">Highlight:</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      Yala National Park Safari
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      Udawalawe Elephant Transit Home
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      Sinharaja Rain Forest
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      Bird Watching Tour
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <p className="text-lg font-bold text-gray-900">Starting from $380 per person</p>
                  <button 
                    onClick={() => handleCustomize({
                      title: "Wildlife Adventure",
                      price: "$380",
                      category: "wildlife-nature",
                      duration: "5 Days / 4 Nights",
                      highlights: ["Yala National Park Safari", "Udawalawe Elephant Transit Home", "Sinharaja Rain Forest", "Bird Watching Tour"]
                    })}
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

            {/* Package 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="relative">
                <img
                  src="/images/para.jpg"
                  alt="Beach Paradise"
                  className="w-full h-48 object-cover"
                />
                <span className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded text-sm font-medium">
                  BH - 03
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900">Beach Paradise</h3>
                <p className="text-gray-600 mb-2">6 Days / 5 Night</p>
                <p className="text-gray-700 text-sm mb-4">
                  Relax on Sri Lanka's stunning beaches with visits to Mirissa, Bentota, and Unawatuna.
                </p>

                <div className="mb-4">
                  <h4 className="font-semibold mb-2 text-gray-900">Highlight:</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      Mirissa Whale Watching
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      Bentota Water Sports
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      Unawatuna Beach Relaxation
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      Galle Fort Exploration
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <p className="text-lg font-bold text-gray-900">Starting from $350 per person</p>
                  <button 
                    onClick={() => handleCustomize({
                      title: "Beach Paradise",
                      price: "$350",
                      category: "beach-holidays",
                      duration: "6 Days / 5 Nights",
                      highlights: ["Mirissa Whale Watching", "Bentota Water Sports", "Unawatuna Beach Relaxation", "Galle Fort Exploration"]
                    })}
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
          </div>
        </div>
      </div>
    </div>
  );
}