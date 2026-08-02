import React from 'react';
import { X, MapPin, Star, Calendar, Check, Compass, ShoppingBag, Heart } from 'lucide-react';
import { Attraction, Language } from '../types';
import { TRANSLATIONS } from '../lib/i18n';

interface AttractionModalProps {
  attraction: Attraction | null;
  onClose: () => void;
  onAddToCart: (attraction: Attraction) => void;
  onToggleFavorite: (id: string) => void;
  isFavorite: boolean;
  currency: 'ZAR' | 'USD';
  language: Language;
}

export const AttractionModal: React.FC<AttractionModalProps> = ({
  attraction,
  onClose,
  onAddToCart,
  onToggleFavorite,
  isFavorite,
  currency,
  language
}) => {
  if (!attraction) return null;

  const t = TRANSLATIONS[language];
  const rateZARtoUSD = 0.055;
  const priceDisplay = currency === 'ZAR' 
    ? `R${attraction.priceZAR}`
    : `$${Math.round(attraction.priceZAR * rateZARtoUSD)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl text-white my-8">
        
        {/* Close Button */}
        <button
          id="close-attraction-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-slate-950/70 border border-slate-700 text-slate-300 hover:text-amber-400 hover:border-amber-400 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Cover Image */}
        <div className="relative h-72 sm:h-96 w-full overflow-hidden">
          <img
            src={attraction.image}
            alt={attraction.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
          
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/90 text-slate-950 font-black text-xs uppercase tracking-wider">
              {attraction.category}
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700 text-slate-200 font-semibold text-xs">
              {attraction.region}
            </span>
          </div>

          <button
            id="toggle-modal-favorite-btn"
            onClick={() => onToggleFavorite(attraction.id)}
            className="absolute top-4 right-16 z-10 p-2.5 rounded-full bg-slate-950/70 border border-slate-700 text-white hover:text-red-400 transition"
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
          </button>

          <div className="absolute bottom-6 left-6 right-6">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-1">
              {attraction.title}
            </h2>
            <p className="text-amber-300 font-medium text-sm sm:text-base">
              {attraction.subtitle}
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Metadata Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold text-sm">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{attraction.rating} ({attraction.reviewsCount} reviews)</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>{attraction.location}</span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400 font-medium block">Permit / Entry Fee</span>
              <span className="text-2xl font-black text-amber-400">
                {attraction.priceZAR === 0 ? 'Free Entry' : priceDisplay}
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">About Destination</h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {attraction.description}
            </p>
          </div>

          {/* Highlights */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">Experience Highlights</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {attraction.highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-medium text-slate-200">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Gallery Preview */}
          {attraction.gallery && attraction.gallery.length > 0 && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">Gallery</h3>
              <div className="grid grid-cols-3 gap-3">
                {attraction.gallery.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Gallery ${i}`}
                    className="w-full h-24 object-cover rounded-xl border border-slate-700"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Best Time to Visit & Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-800/40 border border-slate-800">
              <Calendar className="w-5 h-5 text-amber-400" />
              <div>
                <span className="text-xs text-slate-400 font-semibold block">Best Season to Visit</span>
                <span className="text-xs font-bold text-slate-200">{attraction.bestTimeToVisit}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {attraction.tags.map((tag, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-6 border-t border-slate-800 flex items-center justify-between gap-4">
            <button
              id="modal-close-action-btn"
              onClick={onClose}
              className="px-5 py-3 rounded-xl bg-slate-800 text-slate-300 font-semibold text-sm hover:bg-slate-700 transition"
            >
              Back to List
            </button>

            <button
              id="modal-add-to-cart-btn"
              onClick={() => {
                onAddToCart(attraction);
                onClose();
              }}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 font-extrabold text-sm hover:brightness-110 transition shadow-lg shadow-amber-500/25 flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4 fill-slate-950" />
              <span>{t.btnAddToCart} ({priceDisplay})</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
