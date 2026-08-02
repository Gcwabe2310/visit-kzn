import React, { useState } from 'react';
import { TRANSPORT_OPTIONS } from '../data/kznData';
import { TransportOption, Language } from '../types';
import { Car, ShieldCheck, Users, Luggage, MapPin, Calendar, Check, Compass } from 'lucide-react';
import { TRANSLATIONS } from '../lib/i18n';

interface TransportSectionProps {
  onAddToCart: (item: any) => void;
  currency: 'ZAR' | 'USD';
  language: Language;
}

export const TransportSection: React.FC<TransportSectionProps> = ({ onAddToCart, currency, language }) => {
  const t = TRANSLATIONS[language];
  const [bookingTransport, setBookingTransport] = useState<TransportOption | null>(null);
  const [pickupDate, setPickupDate] = useState<string>('2026-08-10');
  const [passengers, setPassengers] = useState<number>(2);
  const rateZARtoUSD = 0.055;

  const handleConfirmTransport = (item: TransportOption) => {
    onAddToCart({
      id: item.id,
      title: `${item.provider} - ${item.type}`,
      type: 'transport',
      priceZAR: item.priceZAR,
      date: pickupDate,
      guests: passengers,
      details: `${item.route} (${passengers} passengers)`,
      referenceCode: 'TRN-' + Math.floor(100000 + Math.random() * 900000),
      status: 'confirmed'
    });
    setBookingTransport(null);
  };

  return (
    <div className="py-12 bg-slate-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Car className="w-3.5 h-3.5 text-amber-400" />
            <span>Airport Transfers & 4x4 Safari Car Rental</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            KZN Transport & Mobility
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Book seamless transfers from King Shaka Airport or equip yourself with fully geared 4x4 Land Cruisers for game reserves & mountain passes.
          </p>
        </div>

        {/* Transport Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TRANSPORT_OPTIONS.map((item) => {
            const priceDisplay = currency === 'ZAR'
              ? `R${item.priceZAR}`
              : `$${Math.round(item.priceZAR * rateZARtoUSD)}`;

            return (
              <div
                key={item.id}
                id={`transport-card-${item.id}`}
                className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl hover:border-amber-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.type}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-300 font-bold text-xs border border-slate-700">
                      {item.type}
                    </span>
                  </div>

                  <div className="p-6">
                    <span className="text-xs font-bold uppercase text-slate-400 block mb-1">
                      {item.provider}
                    </span>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {item.route}
                    </h3>

                    <div className="flex items-center gap-4 text-slate-400 text-xs mb-4">
                      <div className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-amber-400" />
                        <span>Up to {item.capacity} Guests</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                        <span>Insured & Tracked</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 mb-4">
                      {item.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                          <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-800/80 mt-2">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Rate</span>
                    <span className="text-xl font-black text-amber-400">{priceDisplay}</span>
                  </div>

                  <button
                    id={`book-transport-btn-${item.id}`}
                    onClick={() => setBookingTransport(item)}
                    className="px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-xs hover:bg-amber-400 transition shadow-md shadow-amber-500/20"
                  >
                    Schedule Transfer
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Transport Booking Modal */}
        {bookingTransport && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <div className="bg-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-white shadow-2xl">
              <h3 className="text-2xl font-black mb-1 text-amber-400">
                Book {bookingTransport.type}
              </h3>
              <p className="text-slate-400 text-xs mb-6">
                Provider: {bookingTransport.provider} • Route: {bookingTransport.route}
              </p>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Travel Date</label>
                  <input
                    id="transport-modal-date"
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Number of Passengers</label>
                  <input
                    id="transport-modal-passengers"
                    type="number"
                    min="1"
                    max={bookingTransport.capacity}
                    value={passengers}
                    onChange={(e) => setPassengers(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                  />
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 flex justify-between items-center">
                  <span className="text-xs text-slate-400 font-semibold">Total Transfer Rate:</span>
                  <span className="text-2xl font-black text-amber-400">
                    {currency === 'ZAR' ? `R${bookingTransport.priceZAR}` : `$${Math.round(bookingTransport.priceZAR * rateZARtoUSD)}`}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  id="cancel-transport-modal-btn"
                  onClick={() => setBookingTransport(null)}
                  className="flex-1 py-3 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-700 transition"
                >
                  Cancel
                </button>
                <button
                  id="confirm-transport-modal-btn"
                  onClick={() => handleConfirmTransport(bookingTransport)}
                  className="flex-1 py-3 rounded-xl bg-amber-500 text-slate-950 font-black text-xs hover:bg-amber-400 transition shadow-lg shadow-amber-500/20"
                >
                  Add Transfer to Cart
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
