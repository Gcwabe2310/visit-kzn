import React, { useState } from 'react';
import { Attraction, Language } from '../types';
import { Star, MapPin, Heart, ArrowRight, Eye, Sparkles } from 'lucide-react';
import { TRANSLATIONS } from '../lib/i18n';

interface AttractionsGridProps {
  attractions: Attraction[];
  onSelectAttraction: (attraction: Attraction) => void;
  onAddToCart: (attraction: Attraction) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  currency: 'ZAR' | 'USD';
  language: Language;
}

export const AttractionsGrid: React.FC<AttractionsGridProps> = ({
  attractions,
  onSelectAttraction,
  onAddToCart,
  favorites,
  onToggleFavorite,
  currency,
  language
}) => {
  const t = TRANSLATIONS[language];
  const rateZARtoUSD = 0.055;

  return (
    <div className="py-12 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Top Destinations & Safaris</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Explore KwaZulu-Natal
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Handpicked Big 5 reserves, Drakensberg hiking peaks, coastal reefs, and historic Zulu heritage sites.
            </p>
          </div>

          <span className="text-xs text-amber-400 font-bold bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl self-start md:self-auto">
            Showing {attractions.length} destinations
          </span>
        </div>

        {/* Empty State */}
        {attractions.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/40 border border-slate-800 rounded-2xl">
            <p className="text-slate-400 font-medium">No attractions match your current search criteria.</p>
            <p className="text-xs text-slate-500 mt-1">Try resetting your filters or search keyword.</p>
          </div>
        ) : (
          /* Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {attractions.map((item) => {
              const isFav = favorites.includes(item.id);
              const priceDisplay = currency === 'ZAR' 
                ? `R${item.priceZAR}`
                : `$${Math.round(item.priceZAR * rateZARtoUSD)}`;

              return (
                <div
                  key={item.id}
                  id={`attraction-card-${item.id}`}
                  className="group bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl hover:border-amber-500/40 hover:shadow-2xl transition-all duration-300 flex flex-col"
                >
                  {/* Image Header */}
                  <div className="relative h-56 w-full overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/30" />
                    
                    {/* Category Pill */}
                    <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700 text-amber-300 font-bold text-[11px] uppercase tracking-wider">
                      {item.category}
                    </span>

                    {/* Favorite Button */}
                    <button
                      id={`fav-btn-${item.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(item.id);
                      }}
                      className="absolute top-3.5 right-3.5 p-2 rounded-full bg-slate-950/70 border border-slate-700 text-white hover:text-red-400 transition"
                      aria-label="Save Favorite"
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
                    </button>

                    {/* Price & Rating */}
                    <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between">
                      <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-700 text-amber-400 font-bold text-xs">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{item.rating}</span>
                      </div>

                      <span className="px-3 py-1 rounded-lg bg-amber-500 text-slate-950 font-black text-xs shadow-md">
                        {item.priceZAR === 0 ? 'Free Entry' : priceDisplay}
                      </span>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1.5 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </div>

                      <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors mb-2 line-clamp-1">
                        {item.title}
                      </h3>

                      <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed mb-4">
                        {item.subtitle}
                      </p>
                    </div>

                    {/* Buttons */}
                    <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                      <button
                        id={`view-details-${item.id}`}
                        onClick={() => onSelectAttraction(item)}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition flex items-center justify-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5 text-amber-400" />
                        <span>{t.btnDetails}</span>
                      </button>

                      <button
                        id={`quick-add-${item.id}`}
                        onClick={() => onAddToCart(item)}
                        className="py-2.5 px-4 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 hover:bg-amber-500 hover:text-slate-950 font-bold text-xs transition"
                        title={t.btnAddToCart}
                      >
                        Book
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};
