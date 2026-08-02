import React from 'react';
import { Search, Sparkles, MapPin, Compass, Shield, Sun, Waves } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../lib/i18n';

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  onPlanAITrip: () => void;
  language: Language;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  setSearchQuery,
  selectedRegion,
  setSelectedRegion,
  selectedCategory,
  setSelectedCategory,
  onPlanAITrip,
  language
}) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="relative bg-slate-950 text-white overflow-hidden py-16 lg:py-24 border-b border-amber-500/20">
      {/* Background Graphic & Glow Effects */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity scale-105"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=2000&q=80')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-900/60" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Zulu Welcome Tag */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-700/20 border border-amber-500/40 text-amber-300 text-xs font-bold tracking-wide uppercase shadow-lg shadow-amber-500/10">
            <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
            <span>{t.welcomeZulu}</span>
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 leading-tight">
            {t.heroTitle}
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed">
            {t.heroSubtitle}
          </p>
        </div>

        {/* Search Bar & AI Action Box */}
        <div className="max-w-4xl mx-auto bg-slate-900/90 backdrop-blur-xl border border-amber-500/30 rounded-2xl p-4 sm:p-5 shadow-2xl shadow-slate-950/80 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Input Search */}
            <div className="md:col-span-6 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400" />
              <input
                id="hero-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-800/90 text-white placeholder-slate-400 text-sm border border-slate-700 focus:outline-none focus:border-amber-400 transition"
              />
            </div>

            {/* Region Selector */}
            <div className="md:col-span-3">
              <select
                id="hero-region-select"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-3.5 py-3 rounded-xl bg-slate-800 text-white text-sm border border-slate-700 focus:outline-none focus:border-amber-400 transition cursor-pointer"
              >
                <option value="All">{t.filterAllRegions}</option>
                <option value="Durban & Coast">Durban & Coast</option>
                <option value="Drakensberg">Drakensberg Mountains</option>
                <option value="Zululand & Elephant Coast">Zululand & Elephant Coast</option>
                <option value="Natal Midlands">Natal Midlands</option>
                <option value="Battlefields">Anglo-Zulu Battlefields</option>
                <option value="South Coast">South Coast</option>
              </select>
            </div>

            {/* AI Trip Planner Button */}
            <div className="md:col-span-3">
              <button
                id="hero-plan-ai-trip-btn"
                onClick={onPlanAITrip}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 font-extrabold text-sm hover:brightness-110 transition shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 fill-slate-950" />
                <span>{t.btnPlanTrip}</span>
              </button>
            </div>

          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-800 overflow-x-auto text-xs">
            <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] whitespace-nowrap">
              Quick Filter:
            </span>
            {['All', 'Safari & Wildlife', 'Beach & Coast', 'Culture & Heritage', 'Adventure & Nature', 'Food & Wine'].map((category) => (
              <button
                key={category}
                id={`hero-category-${category.replace(/[^a-zA-Z0-9]/g, '-')}`}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                    : 'bg-slate-800/60 text-slate-300 border border-slate-700 hover:border-slate-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* KZN Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-center">
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80">
            <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">2</div>
            <div className="text-xs text-slate-300 font-semibold">{t.badgeUNESCO}</div>
            <div className="text-[10px] text-slate-500">Drakensberg & iSimangaliso</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80">
            <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">Big 5</div>
            <div className="text-xs text-slate-300 font-semibold">Safari Wilderness</div>
            <div className="text-[10px] text-slate-500">Hluhluwe-iMfolozi Sanctuary</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80">
            <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">300+</div>
            <div className="text-xs text-slate-300 font-semibold">Days of Sunshine</div>
            <div className="text-[10px] text-slate-500">Subtropical Coastal Weather</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80">
            <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">600km</div>
            <div className="text-xs text-slate-300 font-semibold">Golden Indian Ocean Coast</div>
            <div className="text-[10px] text-slate-500">Warm Waves & Coral Reefs</div>
          </div>
        </div>

      </div>
    </div>
  );
};
