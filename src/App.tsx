import { useState } from "react";

type Place = {
  id: string;
  name: string;
  region: string;
  tag: string;
  desc: string;
};

const PLACES: Place[] = [
  { id: "durban", name: "Durban Golden Mile", region: "Coast", tag: "Beach & City", desc: "Wide beaches, promenade walks, surf spots and morning markets along the Indian Ocean." },
  { id: "drakensberg", name: "Drakensberg Mountains", region: "Berg", tag: "Hiking", desc: "Basalt cliffs, san rock art, and day hikes from Royal Natal to Giant's Castle." },
  { id: "isimangaliso", name: "iSimangaliso Wetland Park", region: "Elephant Coast", tag: "UNESCO", desc: "Lakes, dunes, coral reefs and turtle nesting in one continuous park." },
  { id: "hluhluwe", name: "Hluhluwe-iMfolozi Park", region: "Zululand", tag: "Safari", desc: "Africa's oldest reserve, known for rhino conservation and open savanna drives." },
  { id: "midlands", name: "Midlands Meander", region: "Midlands", tag: "Culture", desc: "Farm stalls, art studios, craft breweries and misty rolling hills." },
  { id: "kosi", name: "Kosi Bay", region: "Far North", tag: "Remote", desc: "Clear estuary channels, raffia forests and traditional fish traps." },
];

export default function App() {
  const [filter, setFilter] = useState("All");
  const regions = ["All", ...Array.from(new Set(PLACES.map(p => p.region)))];
  const filtered = filter === "All" ? PLACES : PLACES.filter(p => p.region === filter);

  return (
    <div className="min-h-screen bg-[#fbf8f3] text-zinc-900">
      <header className="max-w-5xl mx-auto px-6 pt-12 pb-8">
        <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase border border-zinc-900 rounded-full px-3 py-1">Visit KZN • No Prices</div>
        <h1 className="mt-6 text-5xl md:text-7xl font-black tracking-tight leading-[0.9]">KwaZulu-Natal,<br/>unhurried.</h1>
        <p className="mt-4 max-w-xl text-zinc-600 leading-relaxed">A price-free guide. Just places, why to go, and how to shape a slow itinerary. No bookings, no rates.</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {regions.map(r => (
            <button key={r} onClick={() => setFilter(r)} className={`rounded-full px-4 py-2 text-sm border transition ${filter===r?"bg-zinc-900 text-white border-zinc-900":"bg-white border-zinc-200 hover:border-zinc-900"}`}>{r}</button>
          ))}
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-6 pb-16 grid md:grid-cols-2 gap-4">
        {filtered.map(p => (
          <div key={p.id} className="bg-white border border-zinc-200 rounded-[20px] p-6">
            <div className="flex justify-between items-start gap-4">
              <h2 className="text-xl font-bold leading-tight">{p.name}</h2>
              <span className="shrink-0 text-[10px] uppercase tracking-widest bg-zinc-900 text-white rounded-full px-2.5 py-1">{p.tag}</span>
            </div>
            <div className="mt-2 text-xs tracking-widest uppercase text-zinc-500">{p.region}</div>
            <p className="mt-3 text-[15px] leading-relaxed text-zinc-600">{p.desc}</p>
          </div>
        ))}
      </main>
      <footer className="max-w-5xl mx-auto px-6 pb-12 text-xs text-zinc-400">No prices • No booking • Just ideas for KZN</footer>
    </div>
  );
}

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
