export type Region = "India" | "Asia" | "Europe" | "Middle East" | "Islands";
export type Category =
  | "Beach"
  | "Mountains"
  | "Culture"
  | "Adventure"
  | "Honeymoon"
  | "City";

export type ItineraryDay = { title: string; description: string };

export type Destination = {
  slug: string;
  name: string;
  country: string;
  region: Region;
  categories: Category[];
  tagline: string;
  description: string;
  image: string;
  gallery: string[];
  rating: number;
  reviews: number;
  pricePerPerson: number;
  originalPrice: number;
  nights: number;
  bestTime: string;
  highlights: string[];
  inclusions: string[];
  itinerary: ItineraryDay[];
  featured?: boolean;
};

// Must match `images.remotePatterns[].search` in next.config.ts; next/image handles resizing.
export const UNSPLASH_QUERY = "?auto=format&fit=crop&w=2400&q=80";

export const unsplash = (id: string) => `https://images.unsplash.com/${id}${UNSPLASH_QUERY}`;

export const destinations: Destination[] = [
  {
    slug: "maldives-overwater-escape",
    name: "Maldives",
    country: "Maldives",
    region: "Islands",
    categories: ["Beach", "Honeymoon"],
    tagline: "Overwater villas & turquoise lagoons",
    description:
      "Wake up above a crystal-clear lagoon, snorkel with manta rays and end your days with candle-lit dinners on a private sandbank. Our Maldives escape pairs a luxury overwater villa with curated island experiences.",
    image: unsplash("photo-1514282401047-d79a71a590e8"),
    gallery: [
      unsplash("photo-1514282401047-d79a71a590e8"),
      unsplash("photo-1507525428034-b723cf961d3e"),
      unsplash("photo-1506929562872-bb421503ef21"),
      unsplash("photo-1520250497591-112f2f40a3f4"),
    ],
    rating: 4.9,
    reviews: 1284,
    pricePerPerson: 84999,
    originalPrice: 99999,
    nights: 5,
    bestTime: "Nov – Apr",
    highlights: [
      "Overwater villa with private plunge pool",
      "Sunset dolphin cruise",
      "Guided snorkelling at the house reef",
      "Private sandbank dinner",
    ],
    inclusions: [
      "Return flights",
      "Seaplane transfers",
      "All meals",
      "Water sports",
    ],
    itinerary: [
      {
        title: "Arrival & seaplane transfer",
        description:
          "Land in Malé and take a scenic seaplane ride over the atolls to your resort. Welcome drinks and sunset at leisure.",
      },
      {
        title: "Reef & snorkelling day",
        description:
          "Explore the vibrant house reef with a marine biologist, followed by a spa session overlooking the ocean.",
      },
      {
        title: "Dolphin cruise",
        description:
          "A relaxed morning, then an evening cruise to spot spinner dolphins as the sun dips into the Indian Ocean.",
      },
      {
        title: "Sandbank picnic",
        description:
          "Speedboat to a private sandbank for a gourmet picnic and a day of total seclusion.",
      },
      {
        title: "Departure",
        description:
          "Breakfast in your villa and a seaplane transfer back to Malé for your onward flight.",
      },
    ],
    featured: true,
  },
  {
    slug: "bali-temples-and-rice-terraces",
    name: "Bali",
    country: "Indonesia",
    region: "Asia",
    categories: ["Culture", "Beach", "Honeymoon"],
    tagline: "Temples, terraces & tropical sunsets",
    description:
      "From the jungle cafés of Ubud to the cliff-top temples of Uluwatu, Bali blends spirituality, nature and beach life like nowhere else. Stay in a private pool villa and discover the island at your own pace.",
    image: unsplash("photo-1537996194471-e657df975ab4"),
    gallery: [
      unsplash("photo-1537996194471-e657df975ab4"),
      unsplash("photo-1559827260-dc66d52bef19"),
      unsplash("photo-1544550581-5f7ceaf7f992"),
      unsplash("photo-1566073771259-6a8506099945"),
    ],
    rating: 4.8,
    reviews: 2190,
    pricePerPerson: 54999,
    originalPrice: 64999,
    nights: 6,
    bestTime: "Apr – Oct",
    highlights: [
      "Tegallalang rice terrace walk",
      "Uluwatu temple Kecak fire dance",
      "Private pool villa in Ubud",
      "Nusa Penida day trip",
    ],
    inclusions: ["Return flights", "Airport transfers", "Breakfast", "Guided tours"],
    itinerary: [
      {
        title: "Welcome to Bali",
        description: "Arrive in Denpasar and transfer to your villa in Ubud. Evening Balinese massage.",
      },
      {
        title: "Ubud culture trail",
        description: "Sacred Monkey Forest, Tegallalang rice terraces and the Ubud art market.",
      },
      {
        title: "Volcano sunrise",
        description: "Optional Mount Batur sunrise trek followed by natural hot springs.",
      },
      {
        title: "Nusa Penida",
        description: "Fast boat to Kelingking Beach, Angel's Billabong and Crystal Bay.",
      },
      {
        title: "Uluwatu & Kecak",
        description: "Move to the coast, explore cliff temples and watch the Kecak fire dance at sunset.",
      },
      {
        title: "Beach day & farewell",
        description: "Lazy morning at Padang Padang beach, farewell seafood dinner at Jimbaran Bay.",
      },
    ],
    featured: true,
  },
  {
    slug: "santorini-sunset-romance",
    name: "Santorini",
    country: "Greece",
    region: "Europe",
    categories: ["Honeymoon", "Beach", "Culture"],
    tagline: "Whitewashed cliffs & caldera sunsets",
    description:
      "Iconic blue domes, volcanic beaches and the most famous sunsets in the world. Stay in a cave suite in Oia, sail the caldera and taste wines grown in volcanic soil.",
    image: unsplash("photo-1570077188670-e3a8d69ac5ff"),
    gallery: [
      unsplash("photo-1570077188670-e3a8d69ac5ff"),
      unsplash("photo-1507525428034-b723cf961d3e"),
      unsplash("photo-1520250497591-112f2f40a3f4"),
      unsplash("photo-1566073771259-6a8506099945"),
    ],
    rating: 4.9,
    reviews: 986,
    pricePerPerson: 1_24_999,
    originalPrice: 1_44_999,
    nights: 6,
    bestTime: "May – Oct",
    highlights: [
      "Cave suite with caldera view",
      "Catamaran sunset cruise",
      "Volcanic wine tasting",
      "Oia village photo walk",
    ],
    inclusions: ["Return flights", "Ferry & transfers", "Breakfast", "Catamaran cruise"],
    itinerary: [
      { title: "Arrive in Athens", description: "Short city tour and overnight near the Acropolis." },
      { title: "Ferry to Santorini", description: "Scenic ferry ride and check-in to your cave suite in Oia." },
      { title: "Caldera cruise", description: "Catamaran cruise with hot springs swim and BBQ dinner on board." },
      { title: "Wine & villages", description: "Visit Pyrgos and Megalochori with a volcanic wine tasting." },
      { title: "Beach day", description: "Red Beach and Perissa black sand beach at your leisure." },
      { title: "Departure", description: "Fly back home with memories of the Aegean." },
    ],
    featured: true,
  },
  {
    slug: "swiss-alps-grand-tour",
    name: "Swiss Alps",
    country: "Switzerland",
    region: "Europe",
    categories: ["Mountains", "Adventure", "Honeymoon"],
    tagline: "Snow peaks, glacier trains & lakeside towns",
    description:
      "Ride panoramic trains past glaciers, stand on the Top of Europe and sip hot chocolate in fairy-tale villages. A classic Swiss journey covering Lucerne, Interlaken and Zermatt.",
    image: unsplash("photo-1506905925346-21bda4d32df4"),
    gallery: [
      unsplash("photo-1506905925346-21bda4d32df4"),
      unsplash("photo-1469474968028-56623f02e42e"),
      unsplash("photo-1501785888041-af3ef285b470"),
      unsplash("photo-1476514525535-07fb3b4ae5f1"),
    ],
    rating: 4.8,
    reviews: 1520,
    pricePerPerson: 1_59_999,
    originalPrice: 1_79_999,
    nights: 7,
    bestTime: "Jun – Sep, Dec – Feb",
    highlights: [
      "Jungfraujoch – Top of Europe",
      "Glacier Express panoramic ride",
      "Lake Lucerne cruise",
      "Matterhorn views from Zermatt",
    ],
    inclusions: ["Return flights", "Swiss Travel Pass", "4★ hotels", "Breakfast"],
    itinerary: [
      { title: "Zurich arrival", description: "Train to Lucerne, evening walk across the Chapel Bridge." },
      { title: "Mount Titlis", description: "Rotair cable car and the glacier cliff walk." },
      { title: "Interlaken", description: "Scenic Golden Pass ride to Interlaken, lakeside evening." },
      { title: "Top of Europe", description: "Cogwheel train to Jungfraujoch, ice palace and Sphinx terrace." },
      { title: "Glacier Express", description: "Panoramic train journey to car-free Zermatt." },
      { title: "Matterhorn", description: "Gornergrat railway for postcard Matterhorn views." },
      { title: "Departure", description: "Return to Zurich for your flight home." },
    ],
  },
  {
    slug: "dubai-desert-and-skyline",
    name: "Dubai",
    country: "UAE",
    region: "Middle East",
    categories: ["City", "Adventure"],
    tagline: "Skyscrapers, souks & desert safaris",
    description:
      "Dine at the top of the Burj Khalifa, dune-bash across golden deserts and shop till you drop in the world's largest malls. Dubai is luxury and adventure rolled into one.",
    image: unsplash("photo-1512453979798-5ea266f8880c"),
    gallery: [
      unsplash("photo-1512453979798-5ea266f8880c"),
      unsplash("photo-1566073771259-6a8506099945"),
      unsplash("photo-1520250497591-112f2f40a3f4"),
      unsplash("photo-1507525428034-b723cf961d3e"),
    ],
    rating: 4.7,
    reviews: 3402,
    pricePerPerson: 44999,
    originalPrice: 52999,
    nights: 4,
    bestTime: "Nov – Mar",
    highlights: [
      "Burj Khalifa 124th floor",
      "Desert safari with BBQ dinner",
      "Dhow cruise at Dubai Marina",
      "Abu Dhabi Grand Mosque day trip",
    ],
    inclusions: ["Return flights", "UAE visa", "4★ hotel", "Breakfast"],
    itinerary: [
      { title: "Arrival", description: "Check-in and evening dhow cruise with dinner at the Marina." },
      { title: "City tour & Burj Khalifa", description: "Old Dubai souks, Dubai Frame and sunset at the Burj Khalifa." },
      { title: "Desert safari", description: "Dune bashing, camel ride and a BBQ dinner under the stars." },
      { title: "Abu Dhabi", description: "Sheikh Zayed Grand Mosque and Ferrari World." },
    ],
    featured: true,
  },
  {
    slug: "tokyo-neon-and-tradition",
    name: "Tokyo",
    country: "Japan",
    region: "Asia",
    categories: ["City", "Culture"],
    tagline: "Neon streets & ancient shrines",
    description:
      "Lose yourself in Shibuya's crossing, find calm in Meiji Shrine and eat the best sushi of your life. Add a bullet-train day to Kyoto for temples and geisha districts.",
    image: unsplash("photo-1540959733332-eab4deabeeaf"),
    gallery: [
      unsplash("photo-1540959733332-eab4deabeeaf"),
      unsplash("photo-1493976040374-85c8e12f0c0e"),
      unsplash("photo-1528127269322-539801943592"),
      unsplash("photo-1476514525535-07fb3b4ae5f1"),
    ],
    rating: 4.9,
    reviews: 1765,
    pricePerPerson: 1_09_999,
    originalPrice: 1_24_999,
    nights: 6,
    bestTime: "Mar – May, Oct – Nov",
    highlights: [
      "Shibuya Sky observation deck",
      "Bullet train to Kyoto",
      "Tsukiji outer market food tour",
      "Mount Fuji & Hakone day trip",
    ],
    inclusions: ["Return flights", "JR Pass", "Boutique hotels", "Breakfast"],
    itinerary: [
      { title: "Konnichiwa Tokyo", description: "Arrive at Narita/Haneda and explore Shinjuku's neon lanes." },
      { title: "Classic Tokyo", description: "Senso-ji, Meiji Shrine, Harajuku and Shibuya Sky." },
      { title: "Mount Fuji", description: "Lake Kawaguchi, Hakone ropeway and a traditional onsen." },
      { title: "Kyoto by Shinkansen", description: "Fushimi Inari's torii gates and the Gion district." },
      { title: "Arashiyama", description: "Bamboo grove, Kinkaku-ji and back to Tokyo." },
      { title: "Sayonara", description: "Last-minute shopping in Ginza and departure." },
    ],
  },
  {
    slug: "kerala-backwaters-bliss",
    name: "Kerala",
    country: "India",
    region: "India",
    categories: ["Culture", "Honeymoon"],
    tagline: "God's own country – houseboats & hills",
    description:
      "Float through palm-fringed backwaters on a private houseboat, walk among Munnar's tea gardens and unwind with authentic Ayurveda. Kerala is India at its most serene.",
    image: unsplash("photo-1602216056096-3b40cc0c9944"),
    gallery: [
      unsplash("photo-1602216056096-3b40cc0c9944"),
      unsplash("photo-1469474968028-56623f02e42e"),
      unsplash("photo-1506929562872-bb421503ef21"),
      unsplash("photo-1566073771259-6a8506099945"),
    ],
    rating: 4.8,
    reviews: 2876,
    pricePerPerson: 24999,
    originalPrice: 31999,
    nights: 5,
    bestTime: "Sep – Mar",
    highlights: [
      "Overnight private houseboat in Alleppey",
      "Munnar tea plantation tour",
      "Kathakali performance",
      "Ayurvedic spa session",
    ],
    inclusions: ["Flights from metros", "Private cab", "Houseboat stay", "Breakfast & dinner"],
    itinerary: [
      { title: "Kochi", description: "Fort Kochi heritage walk and Chinese fishing nets at sunset." },
      { title: "Munnar", description: "Drive through waterfalls into the tea hills of Munnar." },
      { title: "Tea gardens", description: "Tea museum, Eravikulam National Park and Mattupetty Dam." },
      { title: "Alleppey houseboat", description: "Cruise the backwaters with freshly cooked Kerala meals." },
      { title: "Departure", description: "Return to Kochi for your onward journey." },
    ],
    featured: true,
  },
  {
    slug: "royal-rajasthan",
    name: "Rajasthan",
    country: "India",
    region: "India",
    categories: ["Culture", "City"],
    tagline: "Palaces, forts & desert camps",
    description:
      "Journey through the Pink City of Jaipur, the lake palaces of Udaipur and the golden dunes of Jaisalmer. Stay in heritage havelis and experience royal Rajasthani hospitality.",
    image: unsplash("photo-1477587458883-47145ed94245"),
    gallery: [
      unsplash("photo-1477587458883-47145ed94245"),
      unsplash("photo-1524492412937-b28074a5d7da"),
      unsplash("photo-1564507592333-c60657eea523"),
      unsplash("photo-1548013146-72479768bada"),
    ],
    rating: 4.7,
    reviews: 1943,
    pricePerPerson: 29999,
    originalPrice: 36999,
    nights: 6,
    bestTime: "Oct – Mar",
    highlights: [
      "Amber Fort & Hawa Mahal",
      "Sunset boat ride on Lake Pichola",
      "Luxury desert camp in Jaisalmer",
      "Taj Mahal add-on from Jaipur",
    ],
    inclusions: ["Private AC cab", "Heritage hotels", "Breakfast", "Desert safari"],
    itinerary: [
      { title: "Jaipur", description: "Arrive in the Pink City, evening at Chokhi Dhani village." },
      { title: "Forts of Jaipur", description: "Amber Fort, City Palace, Hawa Mahal and Jantar Mantar." },
      { title: "Agra day trip", description: "Sunrise at the Taj Mahal and Agra Fort." },
      { title: "Udaipur", description: "City of Lakes – City Palace and a Lake Pichola boat ride." },
      { title: "Jaisalmer", description: "Golden Fort, Patwon ki Haveli and overnight desert camp." },
      { title: "Departure", description: "Camel safari at dawn and transfer to the airport." },
    ],
  },
  {
    slug: "goa-beach-vibes",
    name: "Goa",
    country: "India",
    region: "India",
    categories: ["Beach", "Adventure"],
    tagline: "Sun, sand & Portuguese charm",
    description:
      "Beach shacks, water sports, colourful Latin quarters and the best seafood in India. Our Goa getaway is perfect for friends, families and couples alike.",
    image: unsplash("photo-1512343879784-a960bf40e7f2"),
    gallery: [
      unsplash("photo-1512343879784-a960bf40e7f2"),
      unsplash("photo-1507525428034-b723cf961d3e"),
      unsplash("photo-1506929562872-bb421503ef21"),
      unsplash("photo-1520250497591-112f2f40a3f4"),
    ],
    rating: 4.6,
    reviews: 4120,
    pricePerPerson: 14999,
    originalPrice: 19999,
    nights: 4,
    bestTime: "Nov – Feb",
    highlights: [
      "Beachfront resort in North Goa",
      "Water sports at Baga",
      "Old Goa churches & Fontainhas",
      "Sunset cruise on the Mandovi",
    ],
    inclusions: ["Return flights", "Beach resort", "Breakfast", "Scooter rental"],
    itinerary: [
      { title: "Arrival", description: "Check in to your beach resort and catch the sunset at Vagator." },
      { title: "North Goa", description: "Fort Aguada, Calangute, Baga water sports and Anjuna flea market." },
      { title: "South Goa", description: "Old Goa churches, Fontainhas and a Mandovi river cruise." },
      { title: "Departure", description: "Lazy breakfast by the beach and transfer to the airport." },
    ],
  },
  {
    slug: "iceland-northern-lights",
    name: "Iceland",
    country: "Iceland",
    region: "Europe",
    categories: ["Adventure", "Mountains"],
    tagline: "Auroras, glaciers & volcanic beaches",
    description:
      "Chase the northern lights, walk on glaciers and soak in geothermal lagoons. Iceland's otherworldly landscapes make it the ultimate adventure destination.",
    image: unsplash("photo-1531366936337-7c912a4589a7"),
    gallery: [
      unsplash("photo-1531366936337-7c912a4589a7"),
      unsplash("photo-1476514525535-07fb3b4ae5f1"),
      unsplash("photo-1469474968028-56623f02e42e"),
      unsplash("photo-1506905925346-21bda4d32df4"),
    ],
    rating: 4.9,
    reviews: 712,
    pricePerPerson: 1_89_999,
    originalPrice: 2_09_999,
    nights: 6,
    bestTime: "Sep – Mar",
    highlights: [
      "Northern lights super-jeep hunt",
      "Golden Circle tour",
      "Glacier hike on Sólheimajökull",
      "Blue Lagoon soak",
    ],
    inclusions: ["Return flights", "4x4 tours", "Hotels", "Breakfast"],
    itinerary: [
      { title: "Reykjavík", description: "Arrive and soak in the Blue Lagoon on the way to the city." },
      { title: "Golden Circle", description: "Þingvellir, Geysir and Gullfoss waterfall." },
      { title: "South coast", description: "Seljalandsfoss, Skógafoss and the black sands of Reynisfjara." },
      { title: "Glacier day", description: "Guided glacier hike and Jökulsárlón iceberg lagoon." },
      { title: "Aurora night", description: "Super-jeep northern lights hunt away from city lights." },
      { title: "Departure", description: "Breakfast and transfer to Keflavík airport." },
    ],
  },
  {
    slug: "rome-eternal-city",
    name: "Rome",
    country: "Italy",
    region: "Europe",
    categories: ["Culture", "City"],
    tagline: "Ancient ruins & la dolce vita",
    description:
      "Walk through 2,000 years of history at the Colosseum, toss a coin in the Trevi Fountain and feast on authentic pasta and gelato in Trastevere.",
    image: unsplash("photo-1552832230-c0197dd311b5"),
    gallery: [
      unsplash("photo-1552832230-c0197dd311b5"),
      unsplash("photo-1502602898657-3e91760cbb34"),
      unsplash("photo-1499856871958-5b9627545d1a"),
      unsplash("photo-1566073771259-6a8506099945"),
    ],
    rating: 4.8,
    reviews: 1108,
    pricePerPerson: 1_14_999,
    originalPrice: 1_29_999,
    nights: 5,
    bestTime: "Apr – Jun, Sep – Oct",
    highlights: [
      "Skip-the-line Colosseum tour",
      "Vatican Museums & Sistine Chapel",
      "Trastevere food walk",
      "Day trip to Florence",
    ],
    inclusions: ["Return flights", "Schengen visa help", "Boutique hotel", "Breakfast"],
    itinerary: [
      { title: "Benvenuti a Roma", description: "Evening stroll to the Trevi Fountain and Spanish Steps." },
      { title: "Ancient Rome", description: "Colosseum, Roman Forum and Palatine Hill." },
      { title: "Vatican City", description: "St. Peter's Basilica, Vatican Museums and Sistine Chapel." },
      { title: "Florence", description: "High-speed train to Florence – Duomo and Ponte Vecchio." },
      { title: "Arrivederci", description: "Last cappuccino and transfer to the airport." },
    ],
  },
  {
    slug: "singapore-city-of-lights",
    name: "Singapore",
    country: "Singapore",
    region: "Asia",
    categories: ["City", "Adventure"],
    tagline: "Futuristic gardens & family fun",
    description:
      "Gardens by the Bay, Universal Studios and hawker food heaven — Singapore is the perfect family holiday with something for every age.",
    image: unsplash("photo-1525625293386-3f8f99389edd"),
    gallery: [
      unsplash("photo-1525625293386-3f8f99389edd"),
      unsplash("photo-1566073771259-6a8506099945"),
      unsplash("photo-1520250497591-112f2f40a3f4"),
      unsplash("photo-1507525428034-b723cf961d3e"),
    ],
    rating: 4.7,
    reviews: 2654,
    pricePerPerson: 49999,
    originalPrice: 57999,
    nights: 4,
    bestTime: "Feb – Apr",
    highlights: [
      "Universal Studios Singapore",
      "Gardens by the Bay light show",
      "Sentosa Island & cable car",
      "Night Safari",
    ],
    inclusions: ["Return flights", "Visa", "4★ hotel", "Attraction tickets"],
    itinerary: [
      { title: "Arrival", description: "Marina Bay Sands light show and dinner at Lau Pa Sat." },
      { title: "Sentosa", description: "Cable car, Universal Studios and Wings of Time." },
      { title: "City & gardens", description: "Gardens by the Bay, Cloud Forest and the Night Safari." },
      { title: "Departure", description: "Shopping on Orchard Road and transfer to Changi." },
    ],
  },
];

export const regions: Region[] = ["India", "Asia", "Europe", "Middle East", "Islands"];
export const categories: Category[] = [
  "Beach",
  "Mountains",
  "Culture",
  "Adventure",
  "Honeymoon",
  "City",
];

export function getDestination(slug: string) {
  return destinations.find((d) => d.slug === slug);
}

export const testimonials = [
  {
    name: "Ananya Sharma",
    trip: "Bali Honeymoon",
    avatar: unsplash("photo-1494790108377-be9c29b29330"),
    quote:
      "Every single detail was taken care of — from the villa with a private pool to the surprise candle-light dinner. Best decision we made for our honeymoon!",
  },
  {
    name: "Rohan Mehta",
    trip: "Swiss Alps Grand Tour",
    avatar: unsplash("photo-1507003211169-0a1dd7228f2d"),
    quote:
      "The Swiss Travel Pass and hotel choices were spot on. The itinerary was relaxed yet we covered everything. Already planning the next trip with them.",
  },
  {
    name: "Priya Nair",
    trip: "Kerala Backwaters",
    avatar: unsplash("photo-1438761681033-6461ffad8d80"),
    quote:
      "Took my parents to Kerala and they loved every moment. The houseboat stay was magical and the driver was super courteous throughout.",
  },
  {
    name: "Kabir Singh",
    trip: "Dubai Explorer",
    avatar: unsplash("photo-1500648767791-00dcc994a43e"),
    quote:
      "Visa in 3 days, a great hotel near the metro and the desert safari was insane. Great value for money — highly recommended.",
  },
  {
    name: "Meera Iyer",
    trip: "Santorini Escape",
    avatar: unsplash("photo-1534528741775-53994a69daeb"),
    quote:
      "The cave suite in Oia with that caldera view… I'm still dreaming about it. 24×7 support on WhatsApp made the whole trip stress-free.",
  },
];

export const formatINR = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
