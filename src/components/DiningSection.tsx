import React, { useState } from 'react';
import { RESTAURANTS_DATA } from '../data/kznData';
import { Restaurant, Language } from '../types';
import { UtensilsCrossed, Star, MapPin, Clock, Calendar, Users, Check } from 'lucide-react';
import { TRANSLATIONS } from '../lib/i18n';

interface DiningSectionProps {
  onAddToCart: (item: any) => void;
  language: Language;
}

export const DiningSection: React.FC<DiningSectionProps> = ({ onAddToCart, language }) => {
  const t = TRANSLATIONS[language];
  const [reservingRestaurant, setReservingRestaurant] = useState<Restaurant | null>(null);
  const [reserveDate, setReserveDate] = useState<string>('2026-08-11');
  const [reserveTime, setReserveTime] = useState<string>('19:00');
  const [partySize, setPartySize] = useState<number>(2);

  const handleConfirmReservation = (restaurant: Restaurant) => {
    onAddToCart({
      id: restaurant.id,
      title: `${restaurant.name} Table Reservation`,
      type: 'restaurant',
      priceZAR: 150, // Reservation deposit per table
      date: `${reserveDate} at ${reserveTime}`,
      guests: partySize,
      details: `Table for ${partySize} at ${restaurant.name} (${restaurant.cuisine})`,
      referenceCode: 'TBL-' + Math.floor(100000 + Math.random() * 900000),
      status: 'confirmed'
    });
    setReservingRestaurant(null);
  };

  return (
    <div className="py-12 bg-slate-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
            <UtensilsCrossed className="w-3.5 h-3.5 text-amber-400" />
            <span>Zulu Shisa Nyama & Coastal Dining</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            KwaZulu-Natal Culinary Journey
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Experience traditional open-flame Zulu braai, authentic Durban spicy Bunny Chow, Mozambican prawns, and fine estate dining.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {RESTAURANTS_DATA.map((restaurant) => (
            <div
              key={restaurant.id}
              id={`restaurant-card-${restaurant.id}`}
              className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl hover:border-amber-500/40 transition-all flex flex-col sm:flex-row"
            >
              <div className="relative w-full sm:w-2/5 h-56 sm:h-auto overflow-hidden">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-amber-400 font-bold text-xs border border-slate-700">
                  {restaurant.priceRange}
                </span>
              </div>

              <div className="p-6 sm:w-3/5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                      {restaurant.cuisine}
                    </span>
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-bold bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{restaurant.rating} ({restaurant.reviewsCount})</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1">
                    {restaurant.name}
                  </h3>

                  <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-3">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">{restaurant.location}</span>
                  </div>

                  <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed mb-4">
                    {restaurant.description}
                  </p>

                  {/* Signature Dishes */}
                  <div className="mb-4">
                    <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Signature Specialties:</span>
                    <div className="flex flex-wrap gap-1">
                      {restaurant.signatureDishes.map((dish, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] border border-slate-700">
                          • {dish}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-slate-400 text-xs">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{restaurant.openHours}</span>
                  </div>

                  <button
                    id={`reserve-table-btn-${restaurant.id}`}
                    onClick={() => setReservingRestaurant(restaurant)}
                    className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-xs hover:bg-amber-400 transition shadow-md shadow-amber-500/20"
                  >
                    Reserve Table
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Reserve Modal */}
        {reservingRestaurant && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <div className="bg-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-white shadow-2xl">
              <h3 className="text-2xl font-black mb-1 text-amber-400">
                Reserve Table at {reservingRestaurant.name}
              </h3>
              <p className="text-slate-400 text-xs mb-6">
                {reservingRestaurant.cuisine} • {reservingRestaurant.location}
              </p>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Reservation Date</label>
                  <input
                    id="reserve-modal-date"
                    type="date"
                    value={reserveDate}
                    onChange={(e) => setReserveDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Preferred Time</label>
                    <select
                      id="reserve-modal-time"
                      value={reserveTime}
                      onChange={(e) => setReserveTime(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                    >
                      <option value="12:30">12:30 PM (Lunch)</option>
                      <option value="14:00">02:00 PM (Lunch)</option>
                      <option value="18:30">06:30 PM (Dinner)</option>
                      <option value="19:30">07:30 PM (Dinner)</option>
                      <option value="20:30">08:30 PM (Dinner)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Guests</label>
                    <input
                      id="reserve-modal-guests"
                      type="number"
                      min="1"
                      max="12"
                      value={partySize}
                      onChange={(e) => setPartySize(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                    />
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700 text-xs text-slate-300">
                  ⚡ Table reservation deposit: <strong className="text-amber-400">R150</strong> (Deducted from final dining bill).
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  id="cancel-reserve-modal-btn"
                  onClick={() => setReservingRestaurant(null)}
                  className="flex-1 py-3 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-700 transition"
                >
                  Cancel
                </button>
                <button
                  id="confirm-reserve-modal-btn"
                  onClick={() => handleConfirmReservation(reservingRestaurant)}
                  className="flex-1 py-3 rounded-xl bg-amber-500 text-slate-950 font-black text-xs hover:bg-amber-400 transition shadow-lg shadow-amber-500/20"
                >
                  Confirm Table Booking
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
