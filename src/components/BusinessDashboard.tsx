import React, { useState } from 'react';
import { Briefcase, Plus, TrendingUp, Users, DollarSign, Star, CheckCircle, MapPin, Building, Mail, Phone } from 'lucide-react';
import { BusinessListing, KZNRegion, Language } from '../types';
import { TRANSLATIONS } from '../lib/i18n';

interface BusinessDashboardProps {
  language: Language;
}

export const BusinessDashboard: React.FC<BusinessDashboardProps> = ({ language }) => {
  const t = TRANSLATIONS[language];
  const [showForm, setShowForm] = useState<boolean>(false);
  const [submissions, setSubmissions] = useState<BusinessListing[]>([
    {
      id: 'biz-1',
      title: 'Drakensberg Alpine Helicopter Flips',
      category: 'Adventure & Tour',
      region: 'Drakensberg',
      description: '15-minute scenic helicopter flights over the Tugela Falls and Sentinel Peak Amphitheatre.',
      priceZAR: 1850,
      address: 'Dragon Peaks Airfield, Cathedral Peak Road',
      contactEmail: 'fly@drakensbergair.co.za',
      contactPhone: '+27 36 488 1200',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
      status: 'active'
    }
  ]);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Safari & Wildlife',
    region: 'Durban & Coast' as KZNRegion,
    description: '',
    priceZAR: '',
    address: '',
    contactEmail: '',
    contactPhone: '',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80'
  });

  const [successMsg, setSuccessMsg] = useState<string>('');

  const handleSubmitListing = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg('');

    try {
      const response = await fetch('/api/business/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (data.success && data.listing) {
        setSubmissions([data.listing, ...submissions]);
        setSuccessMsg('Your listing has been submitted and published to Visit KZN!');
        setShowForm(false);
        setFormData({
          title: '',
          category: 'Safari & Wildlife',
          region: 'Durban & Coast',
          description: '',
          priceZAR: '',
          address: '',
          contactEmail: '',
          contactPhone: '',
          image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80'
        });
      }
    } catch (err) {
      console.error('Submission error:', err);
    }
  };

  return (
    <div className="py-12 bg-slate-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Briefcase className="w-3.5 h-3.5 text-amber-400" />
              <span>Tourism Partner Portal</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              {t.dashboardTitle}
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              {t.dashboardSubtitle}
            </p>
          </div>

          <button
            id="add-new-listing-btn"
            onClick={() => setShowForm(!showForm)}
            className="px-5 py-3 rounded-xl bg-amber-500 text-slate-950 font-black text-xs hover:bg-amber-400 transition shadow-lg shadow-amber-500/20 flex items-center gap-2 self-start md:self-auto"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>{showForm ? 'Close Form' : 'List Your KZN Business'}</span>
          </button>
        </div>

        {/* Success Alert */}
        {successMsg && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 font-semibold">Monthly Bookings</span>
              <Users className="w-5 h-5 text-amber-400" />
            </div>
            <div className="text-3xl font-black text-white">142</div>
            <span className="text-[10px] text-emerald-400 font-bold mt-1 block">↑ +18% from last month</span>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 font-semibold">Gross Revenue (ZAR)</span>
              <DollarSign className="w-5 h-5 text-amber-400" />
            </div>
            <div className="text-3xl font-black text-amber-400">R428,500</div>
            <span className="text-[10px] text-emerald-400 font-bold mt-1 block">Payouts synchronized via PayFast</span>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 font-semibold">Average Guest Rating</span>
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
            </div>
            <div className="text-3xl font-black text-white">4.92 / 5</div>
            <span className="text-[10px] text-slate-400 mt-1 block">Based on 310 verified reviews</span>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 font-semibold">Active Listings</span>
              <Building className="w-5 h-5 text-amber-400" />
            </div>
            <div className="text-3xl font-black text-white">{submissions.length}</div>
            <span className="text-[10px] text-amber-300 font-bold mt-1 block">Verified Operator</span>
          </div>
        </div>

        {/* New Listing Form */}
        {showForm && (
          <form 
            id="business-listing-form"
            onSubmit={handleSubmitListing}
            className="mb-10 bg-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl"
          >
            <h3 className="text-xl font-extrabold text-amber-400 mb-4">Add New Attraction / Service Listing</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Business Title</label>
                <input
                  id="biz-title-input"
                  type="text"
                  required
                  placeholder="e.g. Zululand Quad Bike Bush Safari"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Category</label>
                <select
                  id="biz-category-select"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                >
                  <option value="Safari & Wildlife">Safari & Wildlife</option>
                  <option value="Beach & Coast">Beach & Coast</option>
                  <option value="Culture & Heritage">Culture & Heritage</option>
                  <option value="Adventure & Nature">Adventure & Nature</option>
                  <option value="Accommodation">Accommodation & Lodge</option>
                  <option value="Restaurant">Restaurant & Dining</option>
                  <option value="Transport">Transport & Transfer</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">KZN Region</label>
                <select
                  id="biz-region-select"
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value as KZNRegion })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                >
                  <option value="Durban & Coast">Durban & Coast</option>
                  <option value="Drakensberg">Drakensberg</option>
                  <option value="Zululand & Elephant Coast">Zululand & Elephant Coast</option>
                  <option value="Natal Midlands">Natal Midlands</option>
                  <option value="Battlefields">Battlefields</option>
                  <option value="South Coast">South Coast</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Rate per Person (ZAR)</label>
                <input
                  id="biz-price-input"
                  type="number"
                  required
                  placeholder="e.g. 450"
                  value={formData.priceZAR}
                  onChange={(e) => setFormData({ ...formData, priceZAR: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Full Description</label>
                <textarea
                  id="biz-desc-input"
                  rows={3}
                  required
                  placeholder="Describe your tour, lodge, or culinary experience..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Contact Email</label>
                <input
                  id="biz-email-input"
                  type="email"
                  required
                  placeholder="operator@visitkzn.co.za"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Contact Phone</label>
                <input
                  id="biz-phone-input"
                  type="tel"
                  placeholder="+27 31 123 4567"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                />
              </div>

            </div>

            <button
              id="submit-biz-form-btn"
              type="submit"
              className="w-full py-3.5 rounded-xl bg-amber-500 text-slate-950 font-black text-sm hover:bg-amber-400 transition shadow-lg shadow-amber-500/20 mt-4"
            >
              Publish Listing to Directory
            </button>
          </form>
        )}

        {/* Existing Listings */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">Your Active Directory Listings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {submissions.map((item) => (
              <div key={item.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex gap-4">
                <img src={item.image} alt={item.title} className="w-24 h-24 rounded-xl object-cover shrink-0" />
                <div>
                  <div className="flex items-center gap-2 text-xs text-amber-400 font-bold mb-1">
                    <span>{item.category}</span>
                    <span>•</span>
                    <span>{item.region}</span>
                  </div>
                  <h4 className="font-bold text-white text-base mb-1">{item.title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-2 mb-2">{item.description}</p>
                  <div className="text-sm font-black text-amber-400">R{item.priceZAR} / person</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
