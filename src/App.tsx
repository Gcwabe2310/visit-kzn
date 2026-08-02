import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AttractionsGrid } from './components/AttractionsGrid';
import { AttractionModal } from './components/AttractionModal';
import { HotelsSection } from './components/HotelsSection';
import { DiningSection } from './components/DiningSection';
import { TransportSection } from './components/TransportSection';
import { AIPlanner } from './components/AIPlanner';
import { InteractiveMap } from './components/InteractiveMap';
import { BusinessDashboard } from './components/BusinessDashboard';
import { BookingCartDrawer } from './components/BookingCartDrawer';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';

import { ATTRACTIONS_DATA } from './data/kznData';
import { Attraction, BookingItem, Language, UserAccount } from './types';
import { STORAGE_KEYS } from './lib/firebaseConfig';
import { CheckCircle, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('explore');
  const [language, setLanguage] = useState<Language>('en');
  const [currency, setCurrency] = useState<'ZAR' | 'USD'>('ZAR');

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Cart & Favorites state with localStorage persistence
  const [cartItems, setCartItems] = useState<BookingItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return saved ? JSON.parse(saved) : ['hluhluwe-imfolozi', 'drakensberg-amphitheatre'];
    } catch {
      return ['hluhluwe-imfolozi', 'drakensberg-amphitheatre'];
    }
  });

  const [user, setUser] = useState<UserAccount | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }, [user]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleAddToCart = (item: any) => {
    const newItem: BookingItem = {
      id: item.id + '-' + Date.now(),
      title: item.title || item.name || 'Experience Ticket',
      type: item.itemType ? (item.itemType.toLowerCase() as any) : 'attraction',
      priceZAR: item.priceZAR || item.pricePerNightZAR || 0,
      date: item.date || '2026-08-15',
      guests: item.guests || 1,
      details: item.subtitle || item.description || item.location || 'KwaZulu-Natal Activity',
      referenceCode: 'KZN-' + Math.floor(100000 + Math.random() * 900000),
      status: 'confirmed'
    };

    setCartItems((prev) => [newItem, ...prev]);
    showToast(`Added "${newItem.title}" to travel cart!`);
  };

  const handleAddItineraryToCart = (itinerary: any) => {
    const newItem: BookingItem = {
      id: 'itinerary-' + Date.now(),
      title: itinerary.title,
      type: 'attraction',
      priceZAR: itinerary.estimatedCostZAR,
      date: `${itinerary.days.length} Days Trip`,
      guests: 2,
      details: itinerary.summary,
      referenceCode: 'ITN-' + Math.floor(100000 + Math.random() * 900000),
      status: 'confirmed'
    };

    setCartItems((prev) => [newItem, ...prev]);
    showToast(`Added complete "${itinerary.title}" package to travel cart!`);
    setIsCartOpen(true);
  };

  const handleToggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((fId) => fId !== id));
      showToast('Removed destination from favorites.');
    } else {
      setFavorites([...favorites, id]);
      showToast('Saved destination to favorites!');
    }
  };

  // Filtered Attractions
  const filteredAttractions = ATTRACTIONS_DATA.filter((item) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matches =
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q));
      if (!matches) return false;
    }
    if (selectedRegion !== 'All' && item.region !== selectedRegion) return false;
    if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-white antialiased selection:bg-amber-500 selection:text-slate-950 flex flex-col">
      
      {/* Toast Alert Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 p-4 rounded-2xl bg-amber-500 text-slate-950 font-extrabold text-xs shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle className="w-5 h-5 text-slate-950" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
        currency={currency}
        setCurrency={setCurrency}
        cartCount={cartItems.length}
        setIsCartOpen={setIsCartOpen}
        user={user}
        setIsAuthModalOpen={setIsAuthModalOpen}
      />

      {/* Main Content Body */}
      <main className="flex-1">
        {activeTab === 'explore' && (
          <>
            <Hero
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedRegion={selectedRegion}
              setSelectedRegion={setSelectedRegion}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              onPlanAITrip={() => setActiveTab('planner')}
              language={language}
            />

            <AttractionsGrid
              attractions={filteredAttractions}
              onSelectAttraction={setSelectedAttraction}
              onAddToCart={handleAddToCart}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              currency={currency}
              language={language}
            />
          </>
        )}

        {activeTab === 'hotels' && (
          <HotelsSection
            onAddToCart={handleAddToCart}
            currency={currency}
            language={language}
          />
        )}

        {activeTab === 'dining' && (
          <DiningSection
            onAddToCart={handleAddToCart}
            language={language}
          />
        )}

        {activeTab === 'transport' && (
          <TransportSection
            onAddToCart={handleAddToCart}
            currency={currency}
            language={language}
          />
        )}

        {activeTab === 'planner' && (
          <AIPlanner
            onAddItineraryToCart={handleAddItineraryToCart}
            currency={currency}
            language={language}
          />
        )}

        {activeTab === 'map' && (
          <InteractiveMap
            onSelectAttraction={setSelectedAttraction}
            onAddToCart={handleAddToCart}
            currency={currency}
            language={language}
          />
        )}

        {activeTab === 'business' && (
          <BusinessDashboard
            language={language}
          />
        )}
      </main>

      {/* Modals & Drawers */}
      <AttractionModal
        attraction={selectedAttraction}
        onClose={() => setSelectedAttraction(null)}
        onAddToCart={handleAddToCart}
        onToggleFavorite={handleToggleFavorite}
        isFavorite={selectedAttraction ? favorites.includes(selectedAttraction.id) : false}
        currency={currency}
        language={language}
      />

      <BookingCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={(id) => setCartItems(cartItems.filter((i) => i.id !== id))}
        onClearCart={() => setCartItems([])}
        currency={currency}
        language={language}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        user={user}
        onSignIn={setUser}
        onSignOut={() => setUser(null)}
      />

      {/* Footer */}
      <Footer language={language} />

    </div>
  );
}
