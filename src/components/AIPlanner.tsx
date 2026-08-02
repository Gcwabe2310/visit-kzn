import React, { useState } from 'react';
import { Sparkles, Calendar, Wallet, Compass, Users, CheckCircle2, MapPin, Printer, ArrowRight, ShieldAlert, Package, ShoppingBag, Loader2 } from 'lucide-react';
import { GeneratedItinerary, ItineraryPreference, Language } from '../types';
import { TRANSLATIONS } from '../lib/i18n';

interface AIPlannerProps {
  onAddItineraryToCart: (itinerary: GeneratedItinerary) => void;
  currency: 'ZAR' | 'USD';
  language: Language;
}

export const AIPlanner: React.FC<AIPlannerProps> = ({ onAddItineraryToCart, currency, language }) => {
  const t = TRANSLATIONS[language];
  const rateZARtoUSD = 0.055;

  const [durationDays, setDurationDays] = useState<number>(3);
  const [budgetLevel, setBudgetLevel] = useState<'Budget' | 'Moderate' | 'Luxury'>('Moderate');
  const [style, setStyle] = useState<'Safari & Wildlife' | 'Beach & Surf' | 'Cultural & Historical' | 'Adventure & Hiking' | 'Balanced'>('Balanced');
  const [groupSize, setGroupSize] = useState<'Solo' | 'Couple' | 'Family' | 'Group'>('Couple');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Big 5 Safari', 'Drakensberg Peak', 'Durban Golden Mile']);

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedItinerary, setGeneratedItinerary] = useState<GeneratedItinerary | null>(null);
  const [activeDayIndex, setActiveDayIndex] = useState<number>(0);

  const availableInterests = [
    'Big 5 Safari',
    'Drakensberg Peak',
    'Durban Golden Mile',
    'Zulu Cultural Village',
    'iSimangaliso Hippo Cruise',
    'Shisa Nyama BBQ',
    'Midlands Craft Meander',
    'Anglo-Zulu Battlefields',
    'Oribi Gorge Zipline'
  ];

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleGenerateItinerary = async () => {
    setIsGenerating(true);
    setGeneratedItinerary(null);

    try {
      const response = await fetch('/api/plan-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          durationDays,
          budgetLevel,
          style,
          groupSize,
          interests: selectedInterests
        })
      });

      const data = await response.json();
      if (data.success && data.itinerary) {
        setGeneratedItinerary(data.itinerary);
      }
    } catch (err) {
      console.error('Itinerary generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-12 bg-slate-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Planner Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-700/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4 shadow-lg shadow-amber-500/10">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Powered by Gemini 3.6 Flash</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            {t.aiPlannerTitle}
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            {t.aiPlannerSubtitle}
          </p>
        </div>

        {/* Form Container */}
        <div className="max-w-4xl mx-auto bg-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl mb-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            
            {/* Duration Selector */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold uppercase text-slate-300 mb-2">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>{t.aiFormDays}: <strong className="text-amber-400 text-sm font-extrabold">{durationDays} Days</strong></span>
              </label>
              <input
                id="ai-planner-duration-range"
                type="range"
                min="1"
                max="10"
                value={durationDays}
                onChange={(e) => setDurationDays(Number(e.target.value))}
                className="w-full accent-amber-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>1 Day Weekend Getaway</span>
                <span>5 Days Exploration</span>
                <span>10 Days Expedition</span>
              </div>
            </div>

            {/* Budget Selector */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold uppercase text-slate-300 mb-2">
                <Wallet className="w-4 h-4 text-amber-400" />
                <span>{t.aiFormBudget}</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Budget', 'Moderate', 'Luxury'] as const).map((b) => (
                  <button
                    key={b}
                    id={`budget-opt-${b}`}
                    type="button"
                    onClick={() => setBudgetLevel(b)}
                    className={`py-2.5 rounded-xl font-bold text-xs transition border ${
                      budgetLevel === b
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Travel Style */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold uppercase text-slate-300 mb-2">
                <Compass className="w-4 h-4 text-amber-400" />
                <span>{t.aiFormStyle}</span>
              </label>
              <select
                id="ai-planner-style-select"
                value={style}
                onChange={(e) => setStyle(e.target.value as any)}
                className="w-full px-4 py-3 rounded-xl bg-slate-800 text-white text-sm border border-slate-700 focus:outline-none focus:border-amber-400"
              >
                <option value="Balanced">Balanced Mix (Safari, Coast & Peak)</option>
                <option value="Safari & Wildlife">Big 5 Safari & Wildlife Focus</option>
                <option value="Beach & Surf">Durban Beach & Warm Surf Relax</option>
                <option value="Cultural & Historical">Zulu Culture & Battlefields</option>
                <option value="Adventure & Hiking">Drakensberg Mountains & Canyon Hiking</option>
              </select>
            </div>

            {/* Group Size */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold uppercase text-slate-300 mb-2">
                <Users className="w-4 h-4 text-amber-400" />
                <span>{t.aiFormGroup}</span>
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(['Solo', 'Couple', 'Family', 'Group'] as const).map((g) => (
                  <button
                    key={g}
                    id={`group-opt-${g}`}
                    type="button"
                    onClick={() => setGroupSize(g)}
                    className={`py-2.5 rounded-xl font-bold text-xs transition border ${
                      groupSize === g
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Interests Checkboxes */}
          <div className="mb-8 pt-6 border-t border-slate-800">
            <label className="block text-xs font-bold uppercase text-slate-400 mb-3">
              Must-Include Experiences:
            </label>
            <div className="flex flex-wrap gap-2">
              {availableInterests.map((interest) => {
                const isSelected = selectedInterests.includes(interest);
                return (
                  <button
                    key={interest}
                    id={`interest-tag-${interest.replace(/\s+/g, '-')}`}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                      isSelected
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                        : 'bg-slate-800/60 text-slate-400 border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    {isSelected ? '✓ ' : '+ '}
                    {interest}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Generate Button */}
          <button
            id="submit-generate-itinerary-btn"
            onClick={handleGenerateItinerary}
            disabled={isGenerating}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 font-black text-base hover:brightness-110 transition shadow-xl shadow-amber-500/25 flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Gemini is Crafting Your KwaZulu-Natal Expedition...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 fill-slate-950" />
                <span>{t.aiBtnGenerate}</span>
              </>
            )}
          </button>

        </div>

        {/* Results Section */}
        {generatedItinerary && (
          <div className="max-w-4xl mx-auto bg-slate-900 border border-amber-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl animate-fade-in space-y-8">
            
            {/* Result Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800 gap-4">
              <div>
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs uppercase border border-amber-500/30">
                  Custom AI Travel Plan
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-2">
                  {generatedItinerary.title}
                </h3>
                <p className="text-slate-300 text-sm mt-1 leading-relaxed">
                  {generatedItinerary.summary}
                </p>
              </div>

              <div className="text-left md:text-right shrink-0 bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
                <span className="text-xs text-slate-400 font-semibold block">Estimated Total Cost</span>
                <span className="text-3xl font-black text-amber-400">
                  {currency === 'ZAR'
                    ? `R${generatedItinerary.estimatedCostZAR}`
                    : `$${Math.round(generatedItinerary.estimatedCostZAR * rateZARtoUSD)}`}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Est. Distance: {generatedItinerary.totalDistanceKm} km</span>
              </div>
            </div>

            {/* Days Navigation Tabs */}
            <div>
              <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
                {generatedItinerary.days.map((day, idx) => (
                  <button
                    key={day.dayNumber}
                    id={`itinerary-day-tab-${day.dayNumber}`}
                    onClick={() => setActiveDayIndex(idx)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                      activeDayIndex === idx
                        ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    Day {day.dayNumber}
                  </button>
                ))}
              </div>

              {/* Active Day Detail */}
              {generatedItinerary.days[activeDayIndex] && (
                <div className="mt-6 p-6 rounded-2xl bg-slate-800/50 border border-slate-700/80 space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xl font-extrabold text-amber-400">
                      Day {generatedItinerary.days[activeDayIndex].dayNumber}: {generatedItinerary.days[activeDayIndex].title}
                    </h4>
                    <span className="px-3 py-1 rounded-lg bg-slate-900 text-amber-300 font-bold text-xs border border-slate-700">
                      Est. R{generatedItinerary.days[activeDayIndex].dayCostZAR}
                    </span>
                  </div>

                  <div className="space-y-4 text-sm">
                    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                      <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">🌅 Morning:</span>
                      <p className="text-slate-200 leading-relaxed">{generatedItinerary.days[activeDayIndex].morning}</p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                      <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">☀️ Afternoon:</span>
                      <p className="text-slate-200 leading-relaxed">{generatedItinerary.days[activeDayIndex].afternoon}</p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                      <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">🌙 Evening:</span>
                      <p className="text-slate-200 leading-relaxed">{generatedItinerary.days[activeDayIndex].evening}</p>
                    </div>
                  </div>

                  {/* Highlights Tags */}
                  <div>
                    <span className="text-xs font-bold uppercase text-slate-400 block mb-2">Key Stops & Attractions:</span>
                    <div className="flex flex-wrap gap-2">
                      {generatedItinerary.days[activeDayIndex].highlightedSpots.map((spot, sIdx) => (
                        <span key={sIdx} className="px-3 py-1 rounded-lg bg-amber-500/10 text-amber-300 text-xs font-medium border border-amber-500/30 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-amber-400" />
                          {spot}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Packing List & Safety Tips Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-800">
              
              {/* Packing List */}
              <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700">
                <div className="flex items-center gap-2 mb-3">
                  <Package className="w-5 h-5 text-amber-400" />
                  <h4 className="font-bold text-sm uppercase text-white">Recommended Packing List</h4>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  {generatedItinerary.packingList.map((item, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2">
                      <span className="text-amber-400">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Safety & Zulu Etiquette */}
              <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldAlert className="w-5 h-5 text-amber-400" />
                  <h4 className="font-bold text-sm uppercase text-white">Safety & Zulu Etiquette Tips</h4>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  {generatedItinerary.safetyTips.map((tip, tIdx) => (
                    <li key={tIdx} className="flex items-start gap-2">
                      <span className="text-amber-400">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Actions Bar */}
            <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <button
                id="print-itinerary-btn"
                onClick={handlePrint}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-semibold text-xs flex items-center gap-2 transition"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save PDF</span>
              </button>

              <button
                id="add-itinerary-to-cart-btn"
                onClick={() => onAddItineraryToCart(generatedItinerary)}
                className="px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-black text-xs hover:bg-amber-400 transition shadow-lg shadow-amber-500/20 flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 fill-slate-950" />
                <span>Add Complete Itinerary Package to Travel Cart</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
