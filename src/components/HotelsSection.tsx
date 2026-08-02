import React, { useState } from 'react';
import { ACCOMMODATIONS_DATA } from '../data/kznData';
import { Accommodation, Language } from '../types';
import { Hotel, Star, MapPin, Check, Wifi, Sparkles, Calendar, Users, ShoppingBag } from 'lucide-react';
import { TRANSLATIONS } from '../lib/i18n';

interface HotelsSectionProps {
  onAddToCart: (item: any) => void;
  currency: 'ZAR' | 'USD';
  language: Language;
}

export const HotelsSection: React.FC<HotelsSectionProps> = ({
  onAddToCart,
  currency,
  language
}) => {
  const t = TRANSLATIONS[language];
  const [selectedType, setSelectedType] = useState<string>('All');
  const [bookingHotel, setBookingHotel] = useState<Accommodation | null>(null);
  const [checkInDate, setCheckInDate] = useState<string>('2026-08-10');
  const [nightsCount, setNightsCount] = useState<number>(2);
  const [guestsCount, setGuestsCount] = useState<number>(2);

  const rateZARtoUSD = 0.055;

  const filteredHotels = ACCOMMODATIONS_DATA.filter((h) => {
    if (selectedType !== 'All' && h.type !== selectedType) return false;
    return true;
  });

  const handleConfirmHotelBooking = (hotel: Accommodation) => {
    const totalCost = hotel.pricePerNightZAR * nightsCount;
    onAddToCart({
      id: hotel.id,
      title: hotel.name,
      type: 'hotel',
      priceZAR: totalCost,
      date: `${checkInDate} (${nightsCount} nights)`,
      guests: guestsCount,
      details: `${hotel.type} in ${hotel.region} for ${guestsCount} guests`,
      referenceCode: 'HTL-' + Math.floor(100000 + Math.random() * 900000),
      status: 'confirmed'
    });
    setBookingHotel(null);
  };

  return (
    <div className="py-12 bg-slate-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Hotel className="w-3.5 h-3.5 text-amber-400" />
              <span>Luxury Lodges & Coastal Resorts</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Where to Stay in KZN
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              From Relais & Châteaux game reserves in Zululand to iconic oceanfront lighthouse resorts in Umhlanga.
            </p>
          </div>

          {/* Type Filters */}
          <div className="flex items-center gap-2 overflow-x-auto text-xs py-1">
            {['All', 'Luxury Lodge', 'Beach Resort', 'Safari Camp', 'Cottage'].map((type) => (
              <button
                key={type}
                id={`hotel-type-filter-${type.replace(/\s+/g, '-')}`}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition whitespace-nowrap ${
                  selectedType === type
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredHotels.map((hotel) => {
            const priceNight = currency === 'ZAR'
              ? `R${hotel.pricePerNightZAR}`
              : `$${Math.round(hotel.pricePerNightZAR * rateZARtoUSD)}`;

            return (
              <div
                key={hotel.id}
                id={`hotel-card-${hotel.id}`}
                className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl hover:border-amber-500/40 transition-all flex flex-col sm:flex-row"
              >
                {/* Hotel Image */}
                <div className="relative w-full sm:w-2/5 h-64 sm:h-auto overflow-hidden">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-amber-300 font-bold text-[10px] uppercase border border-slate-700">
                    {hotel.type}
                  </span>
                </div>

                {/* Hotel Details */}
                <div className="p-6 sm:w-3/5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1 text-amber-400 font-bold text-xs bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{hotel.rating} ({hotel.reviewsCount})</span>
                      </div>
                      <span className="text-xs text-slate-400">{hotel.region}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-1">
                      {hotel.name}
                    </h3>

                    <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-3">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      <span>{hotel.location}</span>
                    </div>

                    <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed mb-4">
                      {hotel.description}
                    </p>

                    {/* Amenities */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {hotel.amenities.slice(0, 3).map((amenity, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[10px] border border-slate-700">
                          ✓ {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price & Reserve Button */}
                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 block font-medium">Starting from</span>
                      <span className="text-xl font-black text-amber-400">
                        {priceNight} <span className="text-xs font-normal text-slate-400">/ night</span>
                      </span>
                    </div>

                    <button
                      id={`book-hotel-btn-${hotel.id}`}
                      onClick={() => setBookingHotel(hotel)}
                      className="px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-xs hover:bg-amber-400 transition shadow-md shadow-amber-500/20"
                    >
                      Select Dates
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Date Selection Modal */}
        {bookingHotel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <div className="bg-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-white shadow-2xl">
              <h3 className="text-2xl font-black mb-1 text-amber-400">
                Book {bookingHotel.name}
              </h3>
              <p className="text-slate-400 text-xs mb-6">
                {bookingHotel.location} ({bookingHotel.type})
              </p>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Check-in Date</label>
                  <input
                    id="hotel-modal-checkin-date"
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Nights</label>
                    <input
                      id="hotel-modal-nights-count"
                      type="number"
                      min="1"
                      max="14"
                      value={nightsCount}
                      onChange={(e) => setNightsCount(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Guests</label>
                    <input
                      id="hotel-modal-guests-count"
                      type="number"
                      min="1"
                      max="6"
                      value={guestsCount}
                      onChange={(e) => setGuestsCount(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                    />
                  </div>
                </div>

                {/* Total Price Summary */}
                <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block">Total Stay Estimate</span>
                    <span className="text-xs text-amber-300">{nightsCount} nights x R{bookingHotel.pricePerNightZAR}</span>
                  </div>
                  <span className="text-2xl font-black text-amber-400">
                    {currency === 'ZAR' 
                      ? `R${bookingHotel.pricePerNightZAR * nightsCount}`
                      : `$${Math.round(bookingHotel.pricePerNightZAR * nightsCount * rateZARtoUSD)}`}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  id="close-hotel-modal-btn"
                  onClick={() => setBookingHotel(null)}
                  className="flex-1 py-3 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-700 transition"
                >
                  Cancel
                </button>
                <button
                  id="confirm-hotel-booking-btn"
                  onClick={() => handleConfirmHotelBooking(bookingHotel)}
                  className="flex-1 py-3 rounded-xl bg-amber-500 text-slate-950 font-black text-xs hover:bg-amber-400 transition shadow-lg shadow-amber-500/20"
                >
                  Add Stay to Cart
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
