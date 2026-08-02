import React from 'react';
import { 
  Compass, 
  Hotel, 
  UtensilsCrossed, 
  Car, 
  Sparkles, 
  Map as MapIcon, 
  Briefcase, 
  ShoppingBag, 
  User, 
  Globe, 
  Coins 
} from 'lucide-react';
import { Language, UserAccount } from '../types';
import { TRANSLATIONS } from '../lib/i18n';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: 'ZAR' | 'USD';
  setCurrency: (curr: 'ZAR' | 'USD') => void;
  cartCount: number;
  setIsCartOpen: (open: boolean) => void;
  user: UserAccount | null;
  setIsAuthModalOpen: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  currency,
  setCurrency,
  cartCount,
  setIsCartOpen,
  user,
  setIsAuthModalOpen,
}) => {
  const t = TRANSLATIONS[language];

  const navItems = [
    { id: 'explore', label: t.navExplore, icon: Compass },
    { id: 'hotels', label: t.navHotels, icon: Hotel },
    { id: 'dining', label: t.navDining, icon: UtensilsCrossed },
    { id: 'transport', label: t.navTransport, icon: Car },
    { id: 'planner', label: t.navAIPlanner, icon: Sparkles, badge: 'AI' },
    { id: 'map', label: t.navMap, icon: MapIcon },
    { id: 'business', label: t.navBusiness, icon: Briefcase },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-amber-500/20 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <button 
            id="nav-logo-btn"
            onClick={() => setActiveTab('explore')}
            className="flex items-center gap-3 group text-left focus:outline-none"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 via-orange-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <span className="text-xl font-black text-slate-950 tracking-tighter">KZN</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-amber-200 via-amber-400 to-orange-400 bg-clip-text text-transparent">
                  VISIT KZN
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full">
                  South Africa
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium hidden md:block">
                KwaZulu-Natal Tourism
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all relative ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/25'
                      : 'text-slate-300 hover:text-amber-300 hover:bg-slate-800/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`px-1.5 py-0.2 text-[9px] font-extrabold rounded-full ${
                      isActive ? 'bg-slate-950 text-amber-400' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Controls: Language, Currency, Cart & Auth */}
          <div className="flex items-center gap-2.5">
            
            {/* Language Selector */}
            <div className="relative group">
              <button 
                id="language-selector-btn"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 hover:border-amber-500/50 text-xs font-medium transition"
              >
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span className="uppercase font-bold">{language}</span>
              </button>
              <div className="absolute right-0 mt-2 w-36 py-1.5 bg-slate-900 border border-slate-700 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <button
                  id="lang-option-en"
                  onClick={() => setLanguage('en')}
                  className={`w-full px-3 py-1.5 text-left text-xs font-medium flex items-center justify-between ${language === 'en' ? 'text-amber-400 font-bold bg-slate-800' : 'text-slate-300 hover:bg-slate-800/60'}`}
                >
                  <span>English</span>
                  <span>🇬🇧</span>
                </button>
                <button
                  id="lang-option-zu"
                  onClick={() => setLanguage('zu')}
                  className={`w-full px-3 py-1.5 text-left text-xs font-medium flex items-center justify-between ${language === 'zu' ? 'text-amber-400 font-bold bg-slate-800' : 'text-slate-300 hover:bg-slate-800/60'}`}
                >
                  <span>isiZulu</span>
                  <span>🇿🇦</span>
                </button>
                <button
                  id="lang-option-af"
                  onClick={() => setLanguage('af')}
                  className={`w-full px-3 py-1.5 text-left text-xs font-medium flex items-center justify-between ${language === 'af' ? 'text-amber-400 font-bold bg-slate-800' : 'text-slate-300 hover:bg-slate-800/60'}`}
                >
                  <span>Afrikaans</span>
                  <span>🇿🇦</span>
                </button>
                <button
                  id="lang-option-de"
                  onClick={() => setLanguage('de')}
                  className={`w-full px-3 py-1.5 text-left text-xs font-medium flex items-center justify-between ${language === 'de' ? 'text-amber-400 font-bold bg-slate-800' : 'text-slate-300 hover:bg-slate-800/60'}`}
                >
                  <span>Deutsch</span>
                  <span>🇩🇪</span>
                </button>
              </div>
            </div>

            {/* Currency Toggle */}
            <button
              id="currency-toggle-btn"
              onClick={() => setCurrency(currency === 'ZAR' ? 'USD' : 'ZAR')}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 hover:border-amber-500/50 text-xs font-medium transition"
              title="Toggle Currency (ZAR / USD)"
            >
              <Coins className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-bold">{currency === 'ZAR' ? 'R (ZAR)' : '$ (USD)'}</span>
            </button>

            {/* Travel Cart Button */}
            <button
              id="travel-cart-btn"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-amber-400 hover:border-amber-500 transition hover:bg-slate-800/90"
              aria-label="Travel Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-amber-500 text-slate-950 font-extrabold text-[11px] rounded-full flex items-center justify-center shadow-lg shadow-amber-500/40 animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Account / Sign In */}
            <button
              id="user-auth-btn"
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-300 hover:bg-amber-500/30 text-xs font-semibold transition"
            >
              <User className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">
                {user ? user.name.split(' ')[0] : 'Sign In'}
              </span>
            </button>

          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="lg:hidden flex items-center justify-between py-2 border-t border-slate-800 overflow-x-auto gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-tab-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
