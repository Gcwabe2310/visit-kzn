import React, { useState } from 'react';
import { ATTRACTIONS_DATA, ACCOMMODATIONS_DATA, RESTAURANTS_DATA } from '../data/kznData';
import { Attraction, Accommodation, Restaurant, Language } from '../types';
import { MapPin, Star, Eye, Navigation, Filter, Sparkles, Layers } from 'lucide-react';
import { TRANSLATIONS } from '../lib/i18n';

interface InteractiveMapProps {
  onSelectAttraction: (attraction: Attraction) => void;
  onAddToCart: (item: any) => void;
  currency: 'ZAR' | 'USD';
  language: Language;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  onSelectAttraction,
  onAddToCart,
  currency,
  language
}) => {
  const t = TRANSLATIONS[language];
  const [filterType, setFilterType] = useState<'All' | 'Attractions' | 'Hotels' | 'Dining'>('All');
  const [selectedPin, setSelectedPin] = useState<any | null>(ATTRACTIONS_DATA[0]);

  const rateZARtoUSD = 0.055;

  // Map markers mapping lat/lng to container percentages for interactive positioning
  const mapWidth = 100;
  const mapHeight = 100;

  // Helper to map geographic coordinates to map display percentage
  // KZN Latitude range approx: -31.0 to -26.8
  // KZN Longitude range approx: 28.8 to 33.0
  const getPositionStyle = (lat: number, lng: number) => {
    const minLat = -31.2;
    const maxLat = -26.8;
    const minLng = 28.5;
    const maxLng = 33.2;

    const topPct = ((maxLat - lat) / (maxLat - minLat)) * 80 + 10;
    const leftPct = ((lng - minLng) / (maxLng - minLng)) * 80 + 10;

    return {
      top: `${Math.min(90, Math.max(10, topPct))}%`,
      left: `${Math.min(90, Math.max(10, leftPct))}%`
    };
  };

  const allLocations = [
    ...ATTRACTIONS_DATA.map(a => ({ ...a, itemType: 'Attractions' as const })),
    ...ACCOMMODATIONS_DATA.map(h => ({ ...h, itemType: 'Hotels' as const, priceZAR: h.pricePerNightZAR })),
    ...RESTAURANTS_DATA.map(r => ({ ...r, itemType: 'Dining' as const, priceZAR: 250 }))
  ].filter(item => filterType === 'All' || item.itemType === filterType);

  return (
    <div className="py-12 bg-slate-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Navigation className="w-3.5 h-3.5 text-amber-400" />
              <span>Geographic Destination Map</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Interactive KwaZulu-Natal Map
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Locate Big 5 game reserves, Drakensberg mountain trails, Durban piers, and historic sites on the KZN regional map.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
            {(['All', 'Attractions', 'Hotels', 'Dining'] as const).map((type) => (
              <button
                key={type}
                id={`map-filter-btn-${type}`}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  filterType === type
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Map Container Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Interactive Visual Map Stage */}
          <div className="lg:col-span-8 bg-slate-900 border border-amber-500/30 rounded-3xl p-6 relative overflow-hidden shadow-2xl min-h-[500px] flex flex-col justify-between">
            
            {/* Top Region Overlay Badges */}
            <div className="relative z-10 flex flex-wrap gap-2 pointer-events-none">
              <span className="px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-[10px] font-bold text-amber-300 border border-slate-800">
                📍 Zululand & Elephant Coast (North)
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-[10px] font-bold text-amber-300 border border-slate-800">
                🏔️ Drakensberg Peaks (West)
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-[10px] font-bold text-amber-300 border border-slate-800">
                🌊 Durban & South Coast (East)
              </span>
            </div>

            {/* Simulated Geographic Canvas SVG Background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 150 C 200 100, 400 200, 500 120 C 600 50, 700 180, 750 300 C 780 400, 650 550, 500 580 C 350 600, 200 480, 150 400 C 100 320, 80 200, 100 150 Z" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4"/>
                <path d="M600 100 L 720 500" stroke="#38bdf8" strokeWidth="4" strokeDasharray="8 8" /> {/* Indian Ocean Coastline */}
              </svg>
            </div>

            {/* Map Pins */}
            <div className="relative w-full h-[450px] my-4">
              {allLocations.map((item) => {
                const isSelected = selectedPin?.id === item.id;
                const pos = getPositionStyle(item.coordinates.lat, item.coordinates.lng);

                return (
                  <button
                    key={item.id}
                    id={`map-pin-${item.id}`}
                    onClick={() => setSelectedPin(item)}
                    style={pos}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group z-20 ${
                      isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                    }`}
                  >
                    <div className={`p-2 rounded-full shadow-lg border transition-all ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 border-white ring-4 ring-amber-500/30'
                        : item.itemType === 'Attractions'
                        ? 'bg-slate-900 text-amber-400 border-amber-500/60'
                        : item.itemType === 'Hotels'
                        ? 'bg-slate-900 text-blue-400 border-blue-500/60'
                        : 'bg-slate-900 text-emerald-400 border-emerald-500/60'
                    }`}>
                      <MapPin className="w-4 h-4" />
                    </div>

                    {/* Tooltip on hover */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 rounded-md bg-slate-950 text-white text-[10px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition border border-slate-700 pointer-events-none">
                      {item.title || (item as any).name}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Map Legend */}
            <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Attractions</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span> Hotels & Lodges</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span> Dining</span>
              </div>
              <span className="text-[11px] text-amber-400 font-semibold">Click pins for destination preview</span>
            </div>

          </div>

          {/* Pin Preview Sidebar Card */}
          <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
            {selectedPin ? (
              <div className="space-y-4">
                <div className="relative h-48 rounded-2xl overflow-hidden border border-slate-800">
                  <img
                    src={selectedPin.image}
                    alt={selectedPin.title || selectedPin.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/80 text-amber-300 font-bold text-[10px] uppercase border border-slate-700">
                    {selectedPin.itemType || selectedPin.category}
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span>{selectedPin.region}</span>
                    <div className="flex items-center gap-1 text-amber-400 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{selectedPin.rating}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">
                    {selectedPin.title || selectedPin.name}
                  </h3>

                  <div className="flex items-center gap-1 text-xs text-slate-400 mb-3">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{selectedPin.location}</span>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
                    {selectedPin.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Price / Fee</span>
                    <span className="text-xl font-black text-amber-400">
                      {currency === 'ZAR' ? `R${selectedPin.priceZAR}` : `$${Math.round(selectedPin.priceZAR * rateZARtoUSD)}`}
                    </span>
                  </div>

                  <button
                    id="map-card-add-to-cart-btn"
                    onClick={() => onAddToCart(selectedPin)}
                    className="px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-xs hover:bg-amber-400 transition shadow-md shadow-amber-500/20"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500 text-sm">
                Select any map pin to inspect destination details.
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
