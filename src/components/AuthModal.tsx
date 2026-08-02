import React, { useState } from 'react';
import { X, User, Shield, Sparkles, Check } from 'lucide-react';
import { UserAccount } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserAccount | null;
  onSignIn: (user: UserAccount) => void;
  onSignOut: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  user,
  onSignIn,
  onSignOut
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [role, setRole] = useState<'tourist' | 'business_partner'>('tourist');

  const handleDemoSignIn = () => {
    onSignIn({
      id: 'usr-demo-1',
      name: 'Sipho Ndlovu',
      email: 'sipho@visitkzn.co.za',
      role: 'tourist',
      savedFavorites: ['hluhluwe-imfolozi', 'drakensberg-amphitheatre'],
      bookings: []
    });
    onClose();
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignIn({
      id: 'usr-' + Date.now(),
      name: name || 'KZN Visitor',
      email: email || 'visitor@visitkzn.co.za',
      role,
      savedFavorites: [],
      bookings: []
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
        
        {/* Close Button */}
        <button
          id="close-auth-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {user ? (
          /* Signed In View */
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-black text-2xl flex items-center justify-center mx-auto">
              {user.name[0]}
            </div>
            <h3 className="text-2xl font-black">{user.name}</h3>
            <p className="text-xs text-slate-400">{user.email} • Role: {user.role}</p>

            <button
              id="sign-out-btn"
              onClick={() => {
                onSignOut();
                onClose();
              }}
              className="w-full py-3 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-bold text-xs transition"
            >
              Sign Out
            </button>
          </div>
        ) : (
          /* Sign In Form */
          <form id="auth-form" onSubmit={handleCustomSubmit} className="space-y-4">
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center mx-auto mb-2">
                <User className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-white">Visit KZN Account</h3>
              <p className="text-xs text-slate-400 mt-1">Sign in to save itineraries, track bookings, and access park permits.</p>
            </div>

            {/* Quick Demo Button */}
            <button
              id="demo-tourist-signin-btn"
              type="button"
              onClick={handleDemoSignIn}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 text-amber-300 font-bold text-xs hover:bg-amber-500/30 transition flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Quick Sign In as Tourist Demo (Sipho Ndlovu)</span>
            </button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800" /></div>
              <div className="relative flex justify-center text-[10px] uppercase font-bold text-slate-500"><span className="bg-slate-900 px-2">or enter details</span></div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Your Full Name</label>
              <input
                id="auth-name-input"
                type="text"
                placeholder="e.g. Thandiwe Khumalo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Email Address</label>
              <input
                id="auth-email-input"
                type="email"
                placeholder="thandiwe@visitkzn.co.za"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Account Type</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  id="role-opt-tourist"
                  type="button"
                  onClick={() => setRole('tourist')}
                  className={`py-2 rounded-xl text-xs font-bold border transition ${
                    role === 'tourist' ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                >
                  Tourist / Traveler
                </button>
                <button
                  id="role-opt-partner"
                  type="button"
                  onClick={() => setRole('business_partner')}
                  className={`py-2 rounded-xl text-xs font-bold border transition ${
                    role === 'business_partner' ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                >
                  Business Partner
                </button>
              </div>
            </div>

            <button
              id="submit-auth-btn"
              type="submit"
              className="w-full py-3.5 rounded-xl bg-amber-500 text-slate-950 font-black text-xs hover:bg-amber-400 transition shadow-lg shadow-amber-500/20 mt-4"
            >
              Continue to Visit KZN
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
