// Category-specific activities for tour packages

export const categoryActivities = {
  'beach-holidays': {
    day1: [
      { id: "chill-jungle", name: "Chill at Jungle Beach", price: "30$" },
      { id: "swimming-jungle", name: "Swimming at Jungle Beach", price: "30$" },
      { id: "snorkeling-turtles", name: "Snorkeling with Sea Turtles", price: "40$" },
      { id: "unawatuna-walk", name: "Unawatuna Beach Walk", price: "20$" },
      { id: "glass-boat", name: "Glass-Bottom Boat Ride", price: "35$" },
      { id: "relax-cantaloupe", name: "Relax at Cantaloupe Infinity Pool", price: "25$" },
      { id: "sunset-galle", name: "Sunset walk at Galle Fort", price: "30$" },
      { id: "beach-volleyball", name: "Beach Volleyball", price: "15$" },
      { id: "jet-ski", name: "Jet Ski Riding", price: "50$" }
    ],
    day2: [
      { id: "morning-walk-mirissa", name: "Morning Walk at Mirissa Beach", price: "20$" },
      { id: "whale-watching", name: "Whale Watching Tour", price: "60$" },
      { id: "surfing-mirissa", name: "Surfing at Mirissa", price: "45$" },
      { id: "coconut-climb", name: "Coconut Tree Hill Climb", price: "25$" },
      { id: "photoshoot-beach", name: "Beach Photoshoot", price: "35$" },
      { id: "visit-secret", name: "Visit Secret Beach", price: "30$" },
      { id: "swimming-sunbathing", name: "Swimming or Sunbathing", price: "20$" },
      { id: "evening-cocktails", name: "Evening Cocktails at Beach Bar", price: "40$" },
      { id: "banana-boat", name: "Banana Boat Ride", price: "25$" }
    ]
  },

  'adventure-tours': {
    day1: [
      { id: "ella-hiking", name: "Ella Rock Hiking", price: "45$" },
      { id: "nine-arch-bridge", name: "Nine Arch Bridge Trek", price: "30$" },
      { id: "little-adams", name: "Little Adam's Peak Climb", price: "40$" },
      { id: "zip-lining", name: "Zip Lining Adventure", price: "55$" },
      { id: "tea-plantation", name: "Tea Plantation Hiking", price: "35$" },
      { id: "waterfall-jump", name: "Waterfall Jumping", price: "50$" },
      { id: "rock-climbing", name: "Rock Climbing Session", price: "60$" },
      { id: "mountain-biking", name: "Mountain Biking", price: "40$" },
      { id: "canyoning", name: "Canyoning Adventure", price: "70$" }
    ],
    day2: [
      { id: "white-water-rafting", name: "White Water Rafting", price: "80$" },
      { id: "hot-air-balloon", name: "Hot Air Balloon Ride", price: "120$" },
      { id: "paragliding", name: "Paragliding Experience", price: "90$" },
      { id: "cave-exploration", name: "Cave Exploration", price: "45$" },
      { id: "abseiling", name: "Abseiling/Rappelling", price: "55$" },
      { id: "train-journey", name: "Scenic Train Journey", price: "35$" },
      { id: "camping-setup", name: "Mountain Camping Setup", price: "40$" },
      { id: "night-trek", name: "Night Trekking", price: "50$" },
      { id: "wildlife-tracking", name: "Wildlife Tracking", price: "45$" }
    ]
  },

  'cultural-heritage': {
    day1: [
      { id: "sigiriya-climb", name: "Sigiriya Rock Fortress Climb", price: "50$" },
      { id: "dambulla-caves", name: "Dambulla Cave Temple Visit", price: "40$" },
      { id: "ancient-city-tour", name: "Ancient City Tour", price: "45$" },
      { id: "temple-blessing", name: "Temple Blessing Ceremony", price: "25$" },
      { id: "traditional-dance", name: "Traditional Dance Show", price: "35$" },
      { id: "cooking-class", name: "Traditional Cooking Class", price: "40$" },
      { id: "art-gallery", name: "Local Art Gallery Visit", price: "20$" },
      { id: "craft-workshop", name: "Traditional Craft Workshop", price: "45$" },
      { id: "monk-meditation", name: "Meditation with Monks", price: "30$" }
    ],
    day2: [
      { id: "tooth-temple", name: "Temple of the Tooth Visit", price: "30$" },
      { id: "royal-garden", name: "Royal Botanical Gardens", price: "25$" },
      { id: "cultural-museum", name: "Cultural Museum Tour", price: "20$" },
      { id: "spice-garden", name: "Spice Garden Experience", price: "35$" },
      { id: "village-tour", name: "Traditional Village Tour", price: "40$" },
      { id: "handicraft-center", name: "Handicraft Center Visit", price: "25$" },
      { id: "mask-making", name: "Traditional Mask Making", price: "50$" },
      { id: "batik-painting", name: "Batik Painting Workshop", price: "45$" },
      { id: "heritage-walk", name: "Heritage City Walk", price: "30$" }
    ]
  },

  'wildlife-nature': {
    day1: [
      { id: "yala-safari", name: "Yala National Park Safari", price: "70$" },
      { id: "leopard-spotting", name: "Leopard Spotting Tour", price: "80$" },
      { id: "bird-watching", name: "Bird Watching Experience", price: "45$" },
      { id: "elephant-orphanage", name: "Elephant Orphanage Visit", price: "40$" },
      { id: "nature-walk", name: "Guided Nature Walk", price: "35$" },
      { id: "wildlife-photography", name: "Wildlife Photography Tour", price: "60$" },
      { id: "jeep-safari", name: "4WD Jeep Safari", price: "75$" },
      { id: "botanical-tour", name: "Botanical Garden Tour", price: "30$" },
      { id: "camping-wildlife", name: "Wildlife Camping", price: "85$" }
    ],
    day2: [
      { id: "udawalawe-safari", name: "Udawalawe Safari", price: "65$" },
      { id: "whale-watching-mirissa", name: "Whale Watching", price: "60$" },
      { id: "turtle-sanctuary", name: "Turtle Sanctuary Visit", price: "35$" },
      { id: "butterfly-garden", name: "Butterfly Garden Tour", price: "25$" },
      { id: "mangrove-boat", name: "Mangrove Boat Safari", price: "45$" },
      { id: "crocodile-farm", name: "Crocodile Farm Visit", price: "30$" },
      { id: "rainforest-trek", name: "Rainforest Trekking", price: "50$" },
      { id: "night-safari", name: "Night Safari Experience", price: "70$" },
      { id: "conservation-center", name: "Wildlife Conservation Center", price: "40$" }
    ]
  },

  'honeymoon-packages': {
    day1: [
      { id: "couples-spa", name: "Couples Spa Treatment", price: "90$" },
      { id: "romantic-dinner", name: "Romantic Candlelight Dinner", price: "80$" },
      { id: "sunset-cruise", name: "Private Sunset Cruise", price: "120$" },
      { id: "couples-massage", name: "Couples Massage Session", price: "70$" },
      { id: "private-beach", name: "Private Beach Picnic", price: "60$" },
      { id: "wine-tasting", name: "Wine Tasting Experience", price: "55$" },
      { id: "couples-cooking", name: "Couples Cooking Class", price: "65$" },
      { id: "flower-bath", name: "Romantic Flower Bath", price: "45$" },
      { id: "photography-session", name: "Couples Photography Session", price: "75$" }
    ],
    day2: [
      { id: "helicopter-ride", name: "Helicopter Scenic Ride", price: "200$" },
      { id: "private-villa", name: "Private Villa Experience", price: "150$" },
      { id: "champagne-breakfast", name: "Champagne Breakfast in Bed", price: "60$" },
      { id: "couples-yoga", name: "Couples Yoga Session", price: "40$" },
      { id: "stargazing", name: "Romantic Stargazing", price: "35$" },
      { id: "hot-air-balloon-romantic", name: "Romantic Hot Air Balloon", price: "180$" },
      { id: "beach-horseback", name: "Beach Horseback Riding", price: "85$" },
      { id: "sunset-dinner-cruise", name: "Sunset Dinner Cruise", price: "110$" },
      { id: "couples-meditation", name: "Couples Meditation Retreat", price: "50$" }
    ]
  },

  'pilgrimage-tours': {
    day1: [
      { id: "sacred-tooth-temple", name: "Sacred Tooth Temple Visit", price: "30$" },
      { id: "buddhist-meditation", name: "Buddhist Meditation Session", price: "25$" },
      { id: "temple-blessing-ceremony", name: "Temple Blessing Ceremony", price: "20$" },
      { id: "sri-pada-climb", name: "Sri Pada (Adam's Peak) Climb", price: "60$" },
      { id: "monastery-visit", name: "Ancient Monastery Visit", price: "35$" },
      { id: "pilgrimage-walk", name: "Sacred Pilgrimage Walk", price: "40$" },
      { id: "chanting-participation", name: "Chanting Participation", price: "15$" },
      { id: "spiritual-counseling", name: "Spiritual Counseling Session", price: "45$" },
      { id: "temple-volunteer", name: "Temple Volunteer Work", price: "20$" }
    ],
    day2: [
      { id: "anuradhapura-sacred", name: "Anuradhapura Sacred City", price: "50$" },
      { id: "bodhi-tree", name: "Sacred Bodhi Tree Visit", price: "25$" },
      { id: "meditation-retreat", name: "Silent Meditation Retreat", price: "55$" },
      { id: "religious-museum", name: "Religious Museum Tour", price: "30$" },
      { id: "holy-water-ceremony", name: "Holy Water Ceremony", price: "20$" },
      { id: "scripture-reading", name: "Sacred Scripture Reading", price: "15$" },
      { id: "pilgrimage-circuit", name: "Complete Pilgrimage Circuit", price: "70$" },
      { id: "alms-giving", name: "Traditional Alms Giving", price: "25$" },
      { id: "spiritual-guidance", name: "Personal Spiritual Guidance", price: "40$" }
    ]
  },

  'family-vacations': {
    day1: [
      { id: "zoo-visit", name: "National Zoo Visit", price: "25$" },
      { id: "water-park", name: "Water Park Fun", price: "40$" },
      { id: "family-beach-games", name: "Family Beach Games", price: "20$" },
      { id: "kids-cooking-class", name: "Kids Cooking Class", price: "35$" },
      { id: "treasure-hunt", name: "Beach Treasure Hunt", price: "25$" },
      { id: "boat-ride-family", name: "Family Boat Ride", price: "45$" },
      { id: "animal-feeding", name: "Animal Feeding Experience", price: "30$" },
      { id: "mini-golf", name: "Mini Golf Course", price: "20$" },
      { id: "cultural-puppet-show", name: "Cultural Puppet Show", price: "25$" }
    ],
    day2: [
      { id: "theme-park", name: "Adventure Theme Park", price: "50$" },
      { id: "family-cycling", name: "Family Cycling Tour", price: "35$" },
      { id: "aquarium-visit", name: "Marine Aquarium Visit", price: "30$" },
      { id: "ice-cream-making", name: "Ice Cream Making Workshop", price: "25$" },
      { id: "family-photography", name: "Family Photography Session", price: "40$" },
      { id: "playground-time", name: "Adventure Playground", price: "15$" },
      { id: "magic-show", name: "Magic Show Entertainment", price: "30$" },
      { id: "craft-activities", name: "Family Craft Activities", price: "25$" },
      { id: "movie-night", name: "Outdoor Movie Night", price: "20$" }
    ]
  }
};

// Default package names and descriptions for each category
export const categoryPackageInfo = {
  'beach-holidays': {
    title: "Beach Paradise Escape",
    description: "Discover Sri Lanka's golden beaches with pristine waters and exciting water activities"
  },
  'adventure-tours': {
    title: "Hill Country Adventure",
    description: "Thrilling mountain adventures with hiking, climbing, and extreme sports"
  },
  'cultural-heritage': {
    title: "Cultural Triangle Discovery",
    description: "Explore ancient temples, traditions, and rich cultural heritage"
  },
  'wildlife-nature': {
    title: "Wildlife Safari Adventure",
    description: "Encounter diverse wildlife and explore stunning national parks"
  },
  'honeymoon-packages': {
    title: "Romantic Honeymoon Getaway",
    description: "Perfect romantic experiences for newlyweds and couples"
  },
  'pilgrimage-tours': {
    title: "Sacred Pilgrimage Journey",
    description: "Spiritual journeys to sacred sites and temples across Sri Lanka"
  },
  'family-vacations': {
    title: "Family Fun Adventure",
    description: "Perfect family-friendly activities and safe adventures for all ages"
  }
};