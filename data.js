const listings = [
  {
    id: 1,
    title: "The Willow Suites",
    price: 1420,
    location: "City Centre",
    school: "Algonquin College",
    distanceKm: 2.4,
    distance: "12 min walk",
    rating: 4.8,
    deposit: "£1,800",
    lease: "12 months",
    roomType: "Private studio",
    furnished: true,
    noDeposit: false,
    utilitiesIncluded: true,
    petsAllowed: false,
    verified: true,
    availability: "Available now",
    landlord: "MapleNest Living",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80"
    ],
    description:
      "A warm and modern studio designed for students who want a short commute and a quiet living environment close to campus.",
    features: [
      "Private bathroom",
      "Study desk included",
      "High-speed Wi-Fi",
      "On-site laundry",
      "Secure entry"
    ],
    amenities: {
      wifi: true,
      laundry: true,
      gym: false,
      parking: false,
      security: true,
      elevator: true
    },
    commute: {
      walk: "12 min",
      bus: "6 min",
      bike: "5 min"
    },
    coordinates: {
      lat: 45.349,
      lng: -75.757
    },
    reviews: [
      {
        name: "An Chen",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
        rating: 5,
        text: "Very clean and peaceful. I liked how close it was to campus and grocery stores."
      },
      {
        name: "Rika Thomas",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
        rating: 4,
        text: "Good for international students. The furniture and Wi-Fi setup made moving easier."
      }
    ],
    studentScore: {
      overall: "A+",
      safety: 92,
      affordability: 78,
      studentExperience: 88
    },
    nearby: [
      "Campus shuttle stop",
      "Asian grocery",
      "Pharmacy",
      "Coffee shop"
    ]
  },
  {
    id: 2,
    title: "Foundry Lofts",
    price: 1300,
    location: "Little Italy",
    school: "Algonquin College",
    distanceKm: 4.8,
    distance: "15 min bus",
    rating: 4.6,
    deposit: "£1,500",
    lease: "8 months",
    roomType: "1 bedroom",
    furnished: false,
    noDeposit: true,
    utilitiesIncluded: false,
    petsAllowed: true,
    verified: true,
    availability: "Move in May 1",
    landlord: "UrbanKeys Rentals",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
    ],
    description:
      "An industrial-style loft with more space and flexible pet policy, ideal for students who want personality and easy transit access.",
    features: [
      "Large windows",
      "Pet-friendly building",
      "Storage closet",
      "Transit nearby",
      "Flexible lease"
    ],
    amenities: {
      wifi: false,
      laundry: true,
      gym: true,
      parking: true,
      security: true,
      elevator: false
    },
    commute: {
      walk: "52 min",
      bus: "15 min",
      bike: "14 min"
    },
    coordinates: {
      lat: 45.392,
      lng: -75.723
    },
    reviews: [
      {
        name: "Emily Zhao",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
        rating: 4,
        text: "The commute is okay and the area feels lively. Good option if you want more room."
      }
    ],
    studentScore: {
      overall: "A",
      safety: 86,
      affordability: 81,
      studentExperience: 84
    },
    nearby: [
      "Bus route",
      "Italian grocery",
      "Library branch",
      "Fitness studio"
    ]
  },
  {
    id: 3,
    title: "Belgrave Heights",
    price: 1250,
    location: "Nepean",
    school: "Algonquin College",
    distanceKm: 3.6,
    distance: "9 min drive",
    rating: 4.7,
    deposit: "£0",
    lease: "12 months",
    roomType: "Shared 2-bedroom",
    furnished: true,
    noDeposit: true,
    utilitiesIncluded: true,
    petsAllowed: false,
    verified: true,
    availability: "Available now",
    landlord: "Campus Corner Homes",
    image:
      "https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80"
    ],
    description:
      "A practical and affordable shared layout for students who want low upfront cost and included utilities.",
    features: [
      "No deposit",
      "Shared kitchen",
      "Utilities included",
      "Desk and bed included",
      "Quiet neighborhood"
    ],
    amenities: {
      wifi: true,
      laundry: true,
      gym: false,
      parking: true,
      security: false,
      elevator: false
    },
    commute: {
      walk: "40 min",
      bus: "18 min",
      bike: "12 min"
    },
    coordinates: {
      lat: 45.351,
      lng: -75.789
    },
    reviews: [
      {
        name: "Lisa Nguyen",
        avatar:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
        rating: 5,
        text: "Really good value for students. No deposit helped me a lot when I first moved."
      }
    ],
    studentScore: {
      overall: "A",
      safety: 83,
      affordability: 94,
      studentExperience: 85
    },
    nearby: [
      "Asian supermarket",
      "Bus station",
      "Medical clinic",
      "Bubble tea shop"
    ]
  },
  {
    id: 4,
    title: "Artisan Quarter",
    price: 1600,
    location: "Downtown West",
    school: "Carleton University",
    distanceKm: 5.2,
    distance: "20 min transit",
    rating: 4.9,
    deposit: "£2,000",
    lease: "12 months",
    roomType: "Private studio",
    furnished: true,
    noDeposit: false,
    utilitiesIncluded: true,
    petsAllowed: true,
    verified: true,
    availability: "Move in June 1",
    landlord: "NorthLine Properties",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80"
    ],
    description:
      "A polished premium studio in a stylish building with better amenities and downtown access.",
    features: [
      "Premium interiors",
      "Modern kitchen",
      "Utilities included",
      "Pet-friendly",
      "Secure lobby"
    ],
    amenities: {
      wifi: true,
      laundry: true,
      gym: true,
      parking: false,
      security: true,
      elevator: true
    },
    commute: {
      walk: "58 min",
      bus: "20 min",
      bike: "17 min"
    },
    coordinates: {
      lat: 45.404,
      lng: -75.706
    },
    reviews: [
      {
        name: "Mia Carter",
        avatar:
          "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=200&q=80",
        rating: 5,
        text: "Beautiful space and safe building. More expensive, but the experience feels premium."
      }
    ],
    studentScore: {
      overall: "A+",
      safety: 94,
      affordability: 70,
      studentExperience: 90
    },
    nearby: [
      "Downtown groceries",
      "LRT station",
      "Study café",
      "24/7 convenience store"
    ]
  },
  {
    id: 5,
    title: "Summit Residences",
    price: 1180,
    location: "Baseline",
    school: "Algonquin College",
    distanceKm: 1.8,
    distance: "8 min walk",
    rating: 4.5,
    deposit: "£900",
    lease: "10 months",
    roomType: "Shared apartment",
    furnished: true,
    noDeposit: false,
    utilitiesIncluded: true,
    petsAllowed: false,
    verified: false,
    availability: "Available now",
    landlord: "Summit Student Stay",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=1200&q=80"
    ],
    description:
      "One of the closest options to campus with a budget-friendly monthly rate and strong practicality for student life.",
    features: [
      "Close to campus",
      "Shared common area",
      "Utility bundle",
      "Bed included",
      "Student-focused layout"
    ],
    amenities: {
      wifi: true,
      laundry: true,
      gym: false,
      parking: false,
      security: true,
      elevator: false
    },
    commute: {
      walk: "8 min",
      bus: "4 min",
      bike: "3 min"
    },
    coordinates: {
      lat: 45.348,
      lng: -75.761
    },
    reviews: [
      {
        name: "Daniel Wu",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
        rating: 4,
        text: "Super convenient location for classes. Room is simple but functional."
      }
    ],
    studentScore: {
      overall: "A",
      safety: 82,
      affordability: 90,
      studentExperience: 87
    },
    nearby: [
      "Campus building",
      "Bus stop",
      "Food court",
      "Print shop"
    ]
  },
  {
    id: 6,
    title: "Riverstone House",
    price: 1360,
    location: "Westboro",
    school: "Carleton University",
    distanceKm: 9.1,
    distance: "28 min transit",
    rating: 4.4,
    deposit: "£1,200",
    lease: "12 months",
    roomType: "Private room",
    furnished: false,
    noDeposit: false,
    utilitiesIncluded: false,
    petsAllowed: true,
    verified: true,
    availability: "Move in July 1",
    landlord: "Riverstone Rentals",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
    ],
    description:
      "A calm residential option for students who prefer a quieter neighborhood and are okay with a longer commute.",
    features: [
      "Quiet street",
      "Natural light",
      "Pet-friendly",
      "Shared backyard",
      "Transit access"
    ],
    amenities: {
      wifi: false,
      laundry: true,
      gym: false,
      parking: true,
      security: false,
      elevator: false
    },
    commute: {
      walk: "95 min",
      bus: "28 min",
      bike: "24 min"
    },
    coordinates: {
      lat: 45.387,
      lng: -75.755
    },
    reviews: [
      {
        name: "Grace Lin",
        avatar:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
        rating: 4,
        text: "Good if you want a quieter place. Not the closest, but the area is nice."
      }
    ],
    studentScore: {
      overall: "B+",
      safety: 85,
      affordability: 79,
      studentExperience: 76
    },
    nearby: [
      "Local grocery",
      "Bus corridor",
      "Park",
      "Café"
    ]
  },
  {
    id: 7,
    title: "Canvas Commons",
    price: 1495,
    location: "Old Ottawa South",
    school: "Carleton University",
    distanceKm: 2.9,
    distance: "11 min bike",
    rating: 4.7,
    deposit: "£1,300",
    lease: "12 months",
    roomType: "Studio loft",
    furnished: true,
    noDeposit: false,
    utilitiesIncluded: true,
    petsAllowed: true,
    verified: true,
    availability: "Available now",
    landlord: "Canvas Stay",
    image:
      "https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80"
    ],
    description:
      "A bright loft-style unit with strong student appeal, stylish finishes, and bike-friendly access to campus.",
    features: [
      "Loft layout",
      "Bike storage",
      "Utilities included",
      "Furnished setup",
      "Pet-friendly"
    ],
    amenities: {
      wifi: true,
      laundry: true,
      gym: true,
      parking: false,
      security: true,
      elevator: true
    },
    commute: {
      walk: "32 min",
      bus: "13 min",
      bike: "11 min"
    },
    coordinates: {
      lat: 45.392,
      lng: -75.691
    },
    reviews: [
      {
        name: "Noah Park",
        avatar:
          "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=200&q=80",
        rating: 5,
        text: "One of my favorite listings. Nice design and great for students who bike."
      }
    ],
    studentScore: {
      overall: "A+",
      safety: 90,
      affordability: 75,
      studentExperience: 91
    },
    nearby: [
      "Bike path",
      "Grocery store",
      "Campus bridge",
      "Study café"
    ]
  },
  {
    id: 8,
    title: "Harbour View Rooms",
    price: 1090,
    location: "South Keys",
    school: "Algonquin College",
    distanceKm: 7.4,
    distance: "24 min transit",
    rating: 4.2,
    deposit: "£0",
    lease: "6 months",
    roomType: "Private room",
    furnished: true,
    noDeposit: true,
    utilitiesIncluded: false,
    petsAllowed: false,
    verified: false,
    availability: "Move in August 1",
    landlord: "Harbour Student Rooms",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80"
    ],
    description:
      "A flexible short-lease room option for students who want lower monthly rent and low move-in barriers.",
    features: [
      "Short lease",
      "No deposit",
      "Basic furnishing",
      "Transit nearby",
      "Budget option"
    ],
    amenities: {
      wifi: true,
      laundry: false,
      gym: false,
      parking: true,
      security: false,
      elevator: false
    },
    commute: {
      walk: "88 min",
      bus: "24 min",
      bike: "29 min"
    },
    coordinates: {
      lat: 45.367,
      lng: -75.642
    },
    reviews: [
      {
        name: "Eva Tran",
        avatar:
          "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=200&q=80",
        rating: 4,
        text: "Affordable and easy to move into. Better for budget-focused students."
      }
    ],
    studentScore: {
      overall: "B+",
      safety: 74,
      affordability: 93,
      studentExperience: 73
    },
    nearby: [
      "Transit hub",
      "Shopping centre",
      "Grocery",
      "Fast food"
    ]
  }
];