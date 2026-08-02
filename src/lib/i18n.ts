import { Language } from '../types';

export interface Translations {
  navExplore: string;
  navHotels: string;
  navDining: string;
  navTransport: string;
  navAIPlanner: string;
  navMap: string;
  navBusiness: string;
  heroTitle: string;
  heroSubtitle: string;
  searchPlaceholder: string;
  btnSearch: string;
  btnPlanTrip: string;
  btnBookNow: string;
  btnDetails: string;
  btnAddToCart: string;
  badgeUNESCO: string;
  filterAllRegions: string;
  filterAllCategories: string;
  currencyZAR: string;
  aiPlannerTitle: string;
  aiPlannerSubtitle: string;
  aiFormDays: string;
  aiFormBudget: string;
  aiFormStyle: string;
  aiFormGroup: string;
  aiBtnGenerate: string;
  cartTitle: string;
  cartEmpty: string;
  cartTotal: string;
  checkoutBtn: string;
  dashboardTitle: string;
  dashboardSubtitle: string;
  welcomeZulu: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    navExplore: 'Explore KZN',
    navHotels: 'Hotels & Lodges',
    navDining: 'Restaurants',
    navTransport: 'Transfers & 4x4',
    navAIPlanner: 'AI Trip Planner',
    navMap: 'Interactive Map',
    navBusiness: 'Partner Portal',
    heroTitle: 'Discover KwaZulu-Natal',
    heroSubtitle: 'From Big 5 safaris & majestic Drakensberg peaks to Durban’s warm beaches and rich Zulu heritage.',
    searchPlaceholder: 'Search safaris, Drakensberg hiking, Durban beaches...',
    btnSearch: 'Search',
    btnPlanTrip: 'Plan AI Itinerary',
    btnBookNow: 'Book Now',
    btnDetails: 'View Details',
    btnAddToCart: 'Add to Travel Cart',
    badgeUNESCO: 'UNESCO World Heritage',
    filterAllRegions: 'All KZN Regions',
    filterAllCategories: 'All Categories',
    currencyZAR: 'ZAR (R)',
    aiPlannerTitle: 'Gemini AI Itinerary Architect',
    aiPlannerSubtitle: 'Tell us your travel vision, budget, and group type. Gemini creates your tailored KwaZulu-Natal journey in seconds.',
    aiFormDays: 'Trip Duration (Days)',
    aiFormBudget: 'Budget Level',
    aiFormStyle: 'Travel Style',
    aiFormGroup: 'Group Type',
    aiBtnGenerate: 'Generate Custom KZN Itinerary',
    cartTitle: 'Your Travel Cart & Bookings',
    cartEmpty: 'Your travel cart is empty. Explore experiences to add!',
    cartTotal: 'Total Payable',
    checkoutBtn: 'Proceed to Secure Checkout',
    dashboardTitle: 'KZN Tourism Business Dashboard',
    dashboardSubtitle: 'Manage listings, track tourist bookings, and boost your local experience revenue.',
    welcomeZulu: 'Siyakwamukela e-KwaZulu-Natal!',
  },
  zu: {
    navExplore: 'Bheka KwaZulu-Natal',
    navHotels: 'Ama-Hhotela nendawo yokuhlala',
    navDining: 'Amaresitshudeni',
    navTransport: 'Izithuthi ne-4x4',
    navAIPlanner: 'I-AI Hlela Uhambo',
    navMap: 'Imephu Ethile',
    navBusiness: 'Indawo Yamabhizinisi',
    heroTitle: 'Zitholele I-KwaZulu-Natal',
    heroSubtitle: 'Kusuka kuma-Big 5 safari nezintaba ze-Drakensberg kuya emabhishi afudumele eThekwini nemvelaphi yesiZulu.',
    searchPlaceholder: 'Funa ama-safari, izintaba, amabhishi eThekwini...',
    btnSearch: 'Funa',
    btnPlanTrip: 'Hlela Uhambo lwe-AI',
    btnBookNow: 'Beka Manje',
    btnDetails: 'Buka Eminye Imininingwane',
    btnAddToCart: 'Faka Ekalishi',
    badgeUNESCO: 'I-UNESCO World Heritage',
    filterAllRegions: 'Zonke Izifunda zase-KZN',
    filterAllCategories: 'Zonke Izinhlobo',
    currencyZAR: 'ZAR (R)',
    aiPlannerTitle: 'I-Gemini AI Umhleli Wezohambo',
    aiPlannerSubtitle: 'Tshela i-AI isikhathi nohlobo lohambo lwakho ukuze ikwakhele uhlelo oluphelele lwe-KZN.',
    aiFormDays: 'Izinsuku Zohambo',
    aiFormBudget: 'Isabelomali',
    aiFormStyle: 'Uhlobo Lohambo',
    aiFormGroup: 'Abahambayo',
    aiBtnGenerate: 'Yakha Uhlelo Lwe-KZN',
    cartTitle: 'Ikalishi Lakho Lokubhuka',
    cartEmpty: 'Ikalishi lakho lingenalutho. Bheka izindawo ukuze uzifake!',
    cartTotal: 'Isamba Esikhokhelwayo',
    checkoutBtn: 'Yiya Ekukhokheni Kwasemthethweni',
    dashboardTitle: 'Ideshibhodi Ye-KZN Tourism',
    dashboardSubtitle: 'Stjengisa amabhizinisi akho, uphathe ukubhuka kwabavakashi nosizo lwezezimali.',
    welcomeZulu: 'Siyakwamukela e-KwaZulu-Natal!',
  },
  af: {
    navExplore: 'Verken KZN',
    navHotels: 'Hotelle & Lodges',
    navDining: 'Restaurante',
    navTransport: 'Vervoer & 4x4',
    navAIPlanner: 'AI Reisbeplanner',
    navMap: 'Interaktiewe Kaart',
    navBusiness: 'Venootskapsportaal',
    heroTitle: 'Ontdek KwaZulu-Natal',
    heroSubtitle: 'Van Groot 5 wildtuine en Drakensberge tot Durban se warm strande en Zoeloe-erfenis.',
    searchPlaceholder: 'Soek wildtuine, staproetes, strande...',
    btnSearch: 'Soek',
    btnPlanTrip: 'Beplan met AI',
    btnBookNow: 'Bespreek Nou',
    btnDetails: 'Sien Besonderhede',
    btnAddToCart: 'Voeg by Reismandie',
    badgeUNESCO: 'UNESCO Wêrelderfenis',
    filterAllRegions: 'Alle KZN Streek',
    filterAllCategories: 'Alle Kategorieë',
    currencyZAR: 'ZAR (R)',
    aiPlannerTitle: 'Gemini AI Reis Argitek',
    aiPlannerSubtitle: 'Sê vir Gemini jou reisskedule en begroting vir ’n persoonlike KwaZulu-Natal reisplan.',
    aiFormDays: 'Reisduur (Dae)',
    aiFormBudget: 'Begroting',
    aiFormStyle: 'Reisstyl',
    aiFormGroup: 'Groep',
    aiBtnGenerate: 'Genereer KZN Reisplan',
    cartTitle: 'U Reismandie & Besprekings',
    cartEmpty: 'U reismandie is leeg. Verken ervarings om by te voeg!',
    cartTotal: 'Totale Bedrag',
    checkoutBtn: 'Gaan na Veilige Betaalpunt',
    dashboardTitle: 'KZN Toerisme Besigheidsportaal',
    dashboardSubtitle: 'Bestuur besprekings en toeriste dienste.',
    welcomeZulu: 'Welkom in KwaZulu-Natal!',
  },
  de: {
    navExplore: 'KZN Entdecken',
    navHotels: 'Hotels & Lodges',
    navDining: 'Restaurants',
    navTransport: 'Transfers & 4x4',
    navAIPlanner: 'AI Reiseplaner',
    navMap: 'Interaktive Karte',
    navBusiness: 'Partner Portal',
    heroTitle: 'Entdecken Sie KwaZulu-Natal',
    heroSubtitle: 'Von den Big 5 Safaris und Drakensbergen bis zu Durbans Stränden und Zulu-Kultur.',
    searchPlaceholder: 'Safaris, Wandern, Strände suchen...',
    btnSearch: 'Suchen',
    btnPlanTrip: 'AI Reise Planen',
    btnBookNow: 'Jetzt Buchen',
    btnDetails: 'Details Ansehen',
    btnAddToCart: 'Zum Warenkorb Hinzufügen',
    badgeUNESCO: 'UNESCO Weltkulturerbe',
    filterAllRegions: 'Alle KZN Regionen',
    filterAllCategories: 'Alle Kategorien',
    currencyZAR: 'ZAR (R)',
    aiPlannerTitle: 'Gemini AI Reise-Architekt',
    aiPlannerSubtitle: 'Planen Sie Ihre perfekte KwaZulu-Natal Reise mit intelligenter KI.',
    aiFormDays: 'Reisedauer (Tage)',
    aiFormBudget: 'Budget',
    aiFormStyle: 'Reisestil',
    aiFormGroup: 'Gruppe',
    aiBtnGenerate: 'KZN Reiseplan Erstellen',
    cartTitle: 'Ihr Warenkorb & Buchungen',
    cartEmpty: 'Ihr Warenkorb ist leer.',
    cartTotal: 'Gesamtsumme',
    checkoutBtn: 'Zur Sicheren Kasse',
    dashboardTitle: 'KZN Tourismus Partner Portal',
    dashboardSubtitle: 'Verwalten Sie Buchungen und Angebote.',
    welcomeZulu: 'Willkommen in KwaZulu-Natal!',
  }
};
