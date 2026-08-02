export type Language = 'en' | 'zu' | 'af' | 'de';

export type Category = 
  | 'Safari & Wildlife'
  | 'Beach & Coast'
  | 'Culture & Heritage'
  | 'Adventure & Nature'
  | 'Food & Wine';

export type KZNRegion = 
  | 'Durban & Coast'
  | 'Drakensberg'
  | 'Zululand & Elephant Coast'
  | 'Natal Midlands'
  | 'Battlefields'
  | 'South Coast';

export interface Attraction {
  id: string;
  title: string;
  subtitle: string;
  region: KZNRegion;
  category: Category;
  description: string;
  location: string;
  rating: number;
  reviewsCount: number;
  priceZAR: number;
  coordinates: { lat: number; lng: number };
  image: string;
  gallery: string[];
  highlights: string[];
  bestTimeToVisit: string;
  tags: string[];
  featured?: boolean;
}

export interface Accommodation {
  id: string;
  name: string;
  region: KZNRegion;
  type: 'Luxury Lodge' | 'Beach Resort' | 'B&B' | 'Safari Camp' | 'Cottage';
  location: string;
  pricePerNightZAR: number;
  rating: number;
  reviewsCount: number;
  image: string;
  amenities: string[];
  description: string;
  coordinates: { lat: number; lng: number };
  availableRooms: number;
}

export interface Restaurant {
  id: string;
  name: string;
  region: KZNRegion;
  cuisine: string;
  location: string;
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  rating: number;
  reviewsCount: number;
  image: string;
  signatureDishes: string[];
  description: string;
  coordinates: { lat: number; lng: number };
  openHours: string;
}

export interface TransportOption {
  id: string;
  type: 'Airport Shuttle' | '4x4 Safari Rental' | 'Self-Drive Car' | 'Luxury Coach' | 'Helicopter Charter';
  provider: string;
  route: string;
  priceZAR: number;
  capacity: number;
  features: string[];
  image: string;
}

export interface BookingItem {
  id: string;
  type: 'attraction' | 'hotel' | 'restaurant' | 'transport';
  title: string;
  date: string;
  guests: number;
  priceZAR: number;
  referenceCode: string;
  details: string;
  status: 'confirmed' | 'pending';
}

export interface ItineraryDay {
  dayNumber: number;
  title: string;
  morning: string;
  afternoon: string;
  evening: string;
  highlightedSpots: string[];
  dayCostZAR: number;
}

export interface GeneratedItinerary {
  title: string;
  summary: string;
  estimatedCostZAR: number;
  totalDistanceKm: number;
  packingList: string[];
  safetyTips: string[];
  days: ItineraryDay[];
}

export interface ItineraryPreference {
  durationDays: number;
  budgetLevel: 'Budget' | 'Moderate' | 'Luxury';
  style: 'Safari & Wildlife' | 'Beach & Surf' | 'Cultural & Historical' | 'Adventure & Hiking' | 'Balanced';
  groupSize: 'Solo' | 'Couple' | 'Family' | 'Group';
  interests: string[];
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: 'tourist' | 'business_partner';
  savedFavorites: string[];
  bookings: BookingItem[];
}

export interface BusinessListing {
  id: string;
  title: string;
  category: string;
  region: KZNRegion;
  description: string;
  priceZAR: number;
  address: string;
  contactEmail: string;
  contactPhone: string;
  image: string;
  status: 'active' | 'pending';
}
