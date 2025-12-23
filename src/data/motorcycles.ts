export interface Motorcycle {
  id: string;
  brand: string;
  model: string;
  category: string;
  engine_cc: number;
  engine_type: string;
  power_hp: number;
  torque_nm: number;
  top_speed: number;
  mileage: string;
  fuel_type: string;
  transmission: string;
  price: number;
  country_origin: string;
  launch_year: number;
  images: string[];
  colors: { name: string; hex: string }[];
  variants: { name: string; price: number }[];
  description: string;
  features: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  count: number;
}

export const categories: Category[] = [
  { id: "sport", name: "Sport Bikes", description: "High-performance racing machines", icon: "🏎️", count: 45 },
  { id: "naked", name: "Naked Bikes", description: "Raw power, minimal fairing", icon: "⚡", count: 38 },
  { id: "cruiser", name: "Cruisers", description: "Relaxed riding position", icon: "🛣️", count: 32 },
  { id: "adventure", name: "Adventure", description: "Built for any terrain", icon: "🏔️", count: 28 },
  { id: "touring", name: "Touring", description: "Long-distance comfort", icon: "🌍", count: 22 },
  { id: "dirt", name: "Dirt/Motocross", description: "Off-road champions", icon: "🏁", count: 35 },
  { id: "electric", name: "Electric", description: "Zero emissions, full power", icon: "⚡", count: 18 },
  { id: "retro", name: "Retro/Classic", description: "Timeless design", icon: "🎭", count: 25 },
  { id: "scooter", name: "Scooters", description: "Urban mobility", icon: "🛵", count: 42 },
  { id: "hyperbike", name: "Hyperbikes", description: "Ultimate speed machines", icon: "🚀", count: 12 },
];

export const brands = [
  "Ducati", "BMW", "Kawasaki", "Honda", "Yamaha", "Suzuki", 
  "Harley-Davidson", "KTM", "Triumph", "Aprilia", "MV Agusta",
  "Indian", "Royal Enfield", "Husqvarna", "Zero", "Energica"
];

export const motorcycles: Motorcycle[] = [
  {
    id: "ducati-panigale-v4",
    brand: "Ducati",
    model: "Panigale V4",
    category: "sport",
    engine_cc: 1103,
    engine_type: "V4 Desmosedici Stradale",
    power_hp: 214,
    torque_nm: 124,
    top_speed: 299,
    mileage: "12-15 km/l",
    fuel_type: "Petrol",
    transmission: "6-speed",
    price: 26999,
    country_origin: "Italy",
    launch_year: 2024,
    images: [
      "https://images.pexels.com/photos/2611686/pexels-photo-2611686.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2519374/pexels-photo-2519374.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    colors: [
      { name: "Ducati Red", hex: "#CC0000" },
      { name: "Arctic White", hex: "#F5F5F5" },
      { name: "Dark Stealth", hex: "#1A1A1A" }
    ],
    variants: [
      { name: "Standard", price: 26999 },
      { name: "S", price: 32999 },
      { name: "SP2", price: 42999 }
    ],
    description: "The Panigale V4 is the essence of Ducati sport bikes. Powered by a MotoGP-derived V4 engine, it delivers unprecedented performance for road use.",
    features: ["Öhlins Smart EC 2.0", "Brembo Stylema", "Quick Shift", "Launch Control", "Cornering ABS"]
  },
  {
    id: "bmw-s1000rr",
    brand: "BMW",
    model: "S 1000 RR",
    category: "sport",
    engine_cc: 999,
    engine_type: "Inline-4",
    power_hp: 205,
    torque_nm: 113,
    top_speed: 303,
    mileage: "14-18 km/l",
    fuel_type: "Petrol",
    transmission: "6-speed",
    price: 21995,
    country_origin: "Germany",
    launch_year: 2024,
    images: [
      "https://images.pexels.com/photos/1715193/pexels-photo-1715193.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    colors: [
      { name: "Racing Red", hex: "#DC143C" },
      { name: "Light White", hex: "#FFFFFF" },
      { name: "M Motorsport", hex: "#0066B1" }
    ],
    variants: [
      { name: "Standard", price: 21995 },
      { name: "M Sport", price: 25995 },
      { name: "M RR", price: 39995 }
    ],
    description: "The S 1000 RR defines the supersport segment with German precision engineering and cutting-edge electronics.",
    features: ["Dynamic Traction Control", "ABS Pro", "Shift Cam", "M GPS Lap Trigger", "M Carbon Package"]
  },
  {
    id: "kawasaki-ninja-zx10r",
    brand: "Kawasaki",
    model: "Ninja ZX-10R",
    category: "sport",
    engine_cc: 998,
    engine_type: "Inline-4",
    power_hp: 203,
    torque_nm: 115,
    top_speed: 299,
    mileage: "13-16 km/l",
    fuel_type: "Petrol",
    transmission: "6-speed",
    price: 17999,
    country_origin: "Japan",
    launch_year: 2024,
    images: [
      "https://images.pexels.com/photos/2549942/pexels-photo-2549942.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    colors: [
      { name: "Lime Green", hex: "#32CD32" },
      { name: "Metallic Black", hex: "#1C1C1C" },
      { name: "Pearl White", hex: "#FAFAFA" }
    ],
    variants: [
      { name: "Standard", price: 17999 },
      { name: "KRT Edition", price: 19499 }
    ],
    description: "Born from World Superbike Championship victories, the Ninja ZX-10R brings race-winning technology to the street.",
    features: ["KIBS", "KTRC", "KLCM", "Electronic Suspension", "Kawasaki Corner Management"]
  },
  {
    id: "harley-sportster-s",
    brand: "Harley-Davidson",
    model: "Sportster S",
    category: "cruiser",
    engine_cc: 1252,
    engine_type: "Revolution Max V-Twin",
    power_hp: 121,
    torque_nm: 127,
    top_speed: 225,
    mileage: "18-22 km/l",
    fuel_type: "Petrol",
    transmission: "6-speed",
    price: 14999,
    country_origin: "USA",
    launch_year: 2024,
    images: [
      "https://images.pexels.com/photos/2607554/pexels-photo-2607554.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    colors: [
      { name: "Vivid Black", hex: "#0D0D0D" },
      { name: "Stone Washed White", hex: "#E8E8E8" },
      { name: "Midnight Crimson", hex: "#722F37" }
    ],
    variants: [
      { name: "Standard", price: 14999 },
      { name: "Custom", price: 16999 }
    ],
    description: "The Sportster S represents a new chapter for Harley-Davidson with the all-new Revolution Max engine.",
    features: ["Cornering ABS", "Traction Control", "Multiple Ride Modes", "TFT Display", "LED Lighting"]
  },
  {
    id: "ktm-1290-super-adventure",
    brand: "KTM",
    model: "1290 Super Adventure R",
    category: "adventure",
    engine_cc: 1301,
    engine_type: "V-Twin",
    power_hp: 160,
    torque_nm: 138,
    top_speed: 240,
    mileage: "16-20 km/l",
    fuel_type: "Petrol",
    transmission: "6-speed",
    price: 19999,
    country_origin: "Austria",
    launch_year: 2024,
    images: [
      "https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    colors: [
      { name: "Orange", hex: "#FF6600" },
      { name: "Black", hex: "#1A1A1A" }
    ],
    variants: [
      { name: "R", price: 19999 },
      { name: "S", price: 21999 }
    ],
    description: "The ultimate adventure motorcycle for those who demand the best both on and off-road.",
    features: ["WP XPLOR Suspension", "Cornering ABS", "Motor Slip Regulation", "Quick Shifter+", "Cruise Control"]
  },
  {
    id: "honda-cbr1000rr-r",
    brand: "Honda",
    model: "CBR1000RR-R Fireblade",
    category: "sport",
    engine_cc: 999,
    engine_type: "Inline-4",
    power_hp: 217,
    torque_nm: 113,
    top_speed: 299,
    mileage: "12-15 km/l",
    fuel_type: "Petrol",
    transmission: "6-speed",
    price: 28999,
    country_origin: "Japan",
    launch_year: 2024,
    images: [
      "https://images.pexels.com/photos/1413412/pexels-photo-1413412.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    colors: [
      { name: "Grand Prix Red", hex: "#CC0000" },
      { name: "Matt Pearl Black", hex: "#1A1A1A" },
      { name: "Tricolor", hex: "#1428A0" }
    ],
    variants: [
      { name: "Standard", price: 28999 },
      { name: "SP", price: 38999 }
    ],
    description: "Born from Honda's MotoGP racing technology, the Fireblade SP represents the pinnacle of superbike engineering.",
    features: ["Öhlins Electronic Suspension", "Brembo GP4-RR", "Quick Shifter", "Winglets", "Launch Control"]
  },
  {
    id: "yamaha-mt09",
    brand: "Yamaha",
    model: "MT-09",
    category: "naked",
    engine_cc: 889,
    engine_type: "CP3 Triple",
    power_hp: 119,
    torque_nm: 93,
    top_speed: 240,
    mileage: "18-22 km/l",
    fuel_type: "Petrol",
    transmission: "6-speed",
    price: 9999,
    country_origin: "Japan",
    launch_year: 2024,
    images: [
      "https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    colors: [
      { name: "Icon Blue", hex: "#0033A0" },
      { name: "Tech Black", hex: "#1A1A1A" },
      { name: "Cyan Storm", hex: "#00CED1" }
    ],
    variants: [
      { name: "Standard", price: 9999 },
      { name: "SP", price: 11999 }
    ],
    description: "The Dark Side of Japan. Raw power meets aggressive styling in this torque monster.",
    features: ["IMU", "Ride Modes", "TFT Display", "Quick Shifter", "Cruise Control"]
  },
  {
    id: "triumph-speed-triple",
    brand: "Triumph",
    model: "Speed Triple 1200 RS",
    category: "naked",
    engine_cc: 1160,
    engine_type: "Triple",
    power_hp: 180,
    torque_nm: 125,
    top_speed: 260,
    mileage: "15-18 km/l",
    fuel_type: "Petrol",
    transmission: "6-speed",
    price: 17999,
    country_origin: "UK",
    launch_year: 2024,
    images: [
      "https://images.pexels.com/photos/1413413/pexels-photo-1413413.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    colors: [
      { name: "Crystal White", hex: "#FAFAFA" },
      { name: "Matt Silver Ice", hex: "#C0C0C0" },
      { name: "Sapphire Black", hex: "#0F0F0F" }
    ],
    variants: [
      { name: "RS", price: 17999 },
      { name: "RR", price: 21999 }
    ],
    description: "The ultimate performance naked with 180hp and handling that sets the benchmark.",
    features: ["Öhlins Smart EC 2.0", "Brembo Stylema", "TFT Display", "My Triumph Connectivity", "Cornering ABS"]
  },
  {
    id: "zero-sr-f",
    brand: "Zero",
    model: "SR/F",
    category: "electric",
    engine_cc: 0,
    engine_type: "Z-Force 75-10",
    power_hp: 110,
    torque_nm: 190,
    top_speed: 200,
    mileage: "160 km range",
    fuel_type: "Electric",
    transmission: "Direct Drive",
    price: 19495,
    country_origin: "USA",
    launch_year: 2024,
    images: [
      "https://images.pexels.com/photos/3836761/pexels-photo-3836761.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    colors: [
      { name: "Cool Silver", hex: "#A9A9A9" },
      { name: "Jet Black", hex: "#0A0A0A" }
    ],
    variants: [
      { name: "Standard", price: 19495 },
      { name: "Premium", price: 21495 }
    ],
    description: "The future of motorcycling. Instant torque, zero emissions, pure electric thrills.",
    features: ["Rapid Charging", "Bosch MSC", "TFT Display", "Bluetooth Connectivity", "Regenerative Braking"]
  },
  {
    id: "royal-enfield-continental",
    brand: "Royal Enfield",
    model: "Continental GT 650",
    category: "retro",
    engine_cc: 648,
    engine_type: "Parallel Twin",
    power_hp: 47,
    torque_nm: 52,
    top_speed: 160,
    mileage: "25-30 km/l",
    fuel_type: "Petrol",
    transmission: "6-speed",
    price: 6999,
    country_origin: "India",
    launch_year: 2024,
    images: [
      "https://images.pexels.com/photos/2549941/pexels-photo-2549941.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    colors: [
      { name: "British Racing Green", hex: "#004225" },
      { name: "Dr. Mayhem", hex: "#FF4500" },
      { name: "Ventura Blue", hex: "#0066CC" }
    ],
    variants: [
      { name: "Standard", price: 6999 },
      { name: "Custom", price: 7999 }
    ],
    description: "Classic café racer styling meets modern engineering in this affordable twin.",
    features: ["ABS", "Slip-Assist Clutch", "Twin Exhaust", "LED Tail Light", "Retro Styling"]
  },
  {
    id: "suzuki-hayabusa",
    brand: "Suzuki",
    model: "Hayabusa",
    category: "hyperbike",
    engine_cc: 1340,
    engine_type: "Inline-4",
    power_hp: 187,
    torque_nm: 150,
    top_speed: 299,
    mileage: "14-18 km/l",
    fuel_type: "Petrol",
    transmission: "6-speed",
    price: 18999,
    country_origin: "Japan",
    launch_year: 2024,
    images: [
      "https://images.pexels.com/photos/1413419/pexels-photo-1413419.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    colors: [
      { name: "Glass Sparkle Black", hex: "#1A1A1A" },
      { name: "Pearl Brilliant White", hex: "#FAFAFA" },
      { name: "Candy Daring Red", hex: "#AA0000" }
    ],
    variants: [
      { name: "Standard", price: 18999 }
    ],
    description: "The legendary Hayabusa. The ultimate sport bike that defined a generation.",
    features: ["S.I.R.S.", "Motion Track Brake", "Cruise Control", "Active Speed Limiter", "Launch Control"]
  },
  {
    id: "aprilia-rsv4",
    brand: "Aprilia",
    model: "RSV4 Factory",
    category: "sport",
    engine_cc: 1099,
    engine_type: "V4",
    power_hp: 217,
    torque_nm: 125,
    top_speed: 305,
    mileage: "11-14 km/l",
    fuel_type: "Petrol",
    transmission: "6-speed",
    price: 26999,
    country_origin: "Italy",
    launch_year: 2024,
    images: [
      "https://images.pexels.com/photos/2611690/pexels-photo-2611690.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    colors: [
      { name: "Aprilia Black", hex: "#0D0D0D" },
      { name: "Lava Red", hex: "#CF1020" }
    ],
    variants: [
      { name: "Factory", price: 26999 }
    ],
    description: "Italian racing DNA in every component. The RSV4 Factory is a pure-bred race machine for the road.",
    features: ["Öhlins Smart EC 2.0", "APRC", "Brembo Stylema", "Cornering ABS", "Quick Shift"]
  }
];

export const getMotorcycleById = (id: string): Motorcycle | undefined => {
  return motorcycles.find(m => m.id === id);
};

export const getMotorcyclesByCategory = (category: string): Motorcycle[] => {
  return motorcycles.filter(m => m.category === category);
};

export const getMotorcyclesByBrand = (brand: string): Motorcycle[] => {
  return motorcycles.filter(m => m.brand.toLowerCase() === brand.toLowerCase());
};

export const filterMotorcycles = (filters: {
  brand?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minEngine?: number;
  maxEngine?: number;
  fuelType?: string;
}): Motorcycle[] => {
  return motorcycles.filter(m => {
    if (filters.brand && m.brand !== filters.brand) return false;
    if (filters.category && m.category !== filters.category) return false;
    if (filters.minPrice && m.price < filters.minPrice) return false;
    if (filters.maxPrice && m.price > filters.maxPrice) return false;
    if (filters.minEngine && m.engine_cc < filters.minEngine) return false;
    if (filters.maxEngine && m.engine_cc > filters.maxEngine) return false;
    if (filters.fuelType && m.fuel_type !== filters.fuelType) return false;
    return true;
  });
};

export const searchMotorcycles = (query: string): Motorcycle[] => {
  const lowerQuery = query.toLowerCase();
  return motorcycles.filter(m => 
    m.brand.toLowerCase().includes(lowerQuery) ||
    m.model.toLowerCase().includes(lowerQuery) ||
    m.category.toLowerCase().includes(lowerQuery) ||
    m.description.toLowerCase().includes(lowerQuery)
  );
};
