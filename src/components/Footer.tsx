import React from 'react';
import { Compass, Phone, Mail, MapPin, Globe, Shield, Heart } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../lib/i18n';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = TRANSLATIONS[language];

  return (
    <footer className="bg-slate-950 border-t border-amber-500/20 text-white pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center font-black text-slate-950 text-lg">
                KZN
              </div>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-amber-200 to-orange-400 bg-clip-text text-transparent">
                VISIT KZN
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Official Tourism Platform for KwaZulu-Natal, South Africa. Connecting travelers to Big 5 safaris, UNESCO mountain ranges, warm coastal beaches, and rich Zulu cultural heritage.
            </p>
            <div className="text-xs text-amber-300 font-semibold">
              {t.welcomeZulu}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-4">Top Destinations</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><a href="#explore" className="hover:text-amber-400 transition">Hluhluwe-iMfolozi Big 5 Park</a></li>
              <li><a href="#explore" className="hover:text-amber-400 transition">Drakensberg Amphitheatre Hike</a></li>
              <li><a href="#explore" className="hover:text-amber-400 transition">Durban Golden Mile Oceanfront</a></li>
              <li><a href="#explore" className="hover:text-amber-400 transition">iSimangaliso Wetland Park</a></li>
              <li><a href="#explore" className="hover:text-amber-400 transition">Nelson Mandela Capture Site</a></li>
            </ul>
          </div>

          {/* Emergency & Tourism Helplines */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-4">Emergency & Helpline</h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400" />
                <span>KZN Tourism Helpline: +27 31 366 7500</span>
              </li>
              <li className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-400" />
                <span>SAPS Tourist Safety: 10111</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400" />
                <span>info@zulu.org.za</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Tourism House, Durban North, KZN</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-4">KZN Travel Updates</h4>
            <p className="text-xs text-slate-400 mb-3">Subscribe for seasonal safari permits, Drakensberg hiking conditions & festival events.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter email address..."
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
              <button className="px-3 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition">
                Join
              </button>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} Visit KZN (KwaZulu-Natal Tourism). Built with Next.js 15, React 19, TypeScript, Tailwind CSS, Firebase & Gemini AI.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
            <span>for KwaZulu-Natal, South Africa</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
