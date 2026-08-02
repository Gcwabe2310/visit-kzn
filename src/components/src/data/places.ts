
import { useState } from "react";

type Place = {
  id: string;
  name: string;
  region: string;
  tag: string;
  desc: string;
};

const PLACES: Place[] = [
  { id: "durban", name: "Durban Golden Mile", region: "Coast", tag: "Beach & City", desc: "Wide beaches, promenade walks, surf spots and morning markets along the Indian Ocean." },
  { id: "drakensberg", name: "Drakensberg Mountains", region: "Berg", tag: "Hiking", desc: "Basalt cliffs, San rock art, and day hikes from Royal Natal to Giant's Castle." },
  { id: "isimangaliso", name: "iSimangaliso Wetland Park", region: "Elephant Coast", tag: "UNESCO", desc: "Lakes, dunes, coral reefs and turtle nesting in one continuous park." },
  { id: "hluhluwe", name: "Hluhluwe-iMfolozi Park", region: "Zululand", tag: "Safari", desc: "Africa's oldest reserve, known for rhino conservation and open savanna drives." },
  { id: "midlands", name: "Midlands Meander", region: "Midlands", tag: "Culture", desc: "Farm stalls, art studios, craft breweries and misty rolling hills." },
  { id: "kosi", name: "Kosi Bay", region: "Far North", tag: "Remote", desc: "Clear estuary channels, raffia forests and traditional fish traps." },
  { id: "durban-central", name: "Durban Central Stay", region: "Coast", tag: "Stay", desc: "Central, safe, walking distance to beach. Host-managed, no middleman." },
  { id: "umhlanga", name: "Umhlanga Ridge", region: "Coast", tag: "Stay", desc: "Modern apartments, pools, close to malls. Direct host contact." },
  { id: "st-lucia", name: "St Lucia Estuary", region: "Elephant Coast", tag: "Stay & Tour", desc: "Hippo & croc tours, Isimangaliso gates 5 mins away." },
];

const CONTACT_NUMBER = "0815890376";
const WHATSAPP_LINK = `https://wa.me/27815890376`;
const TEL_LINK = `tel:+27815890376`;

export default function App() {
  const [filter, setFilter] = useState("All");
  const regions = ["All", ...Array.from(new Set(PLACES.map(p => p.region)))];
  const filtered = filter === "All" ? PLACES : PLACES.filter(p => p.region === filter);

  return (
    <div className="min-h-screen bg-[#fbf8f3] text-zinc-900">
      <header className="max-w-6xl mx-auto px-6 pt-10 pb-6">
        <div className="flex flex-wrap justify-between items-start gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase border border-zinc-900 rounded-full px-3 py-1">Visit KZN • Direct Host • No Prices Online</div>
            <h1 className="mt-6 text-5xl md:text-7xl font-black tracking-tight leading-[0.9]">KwaZulu-Natal,<br/>unhurried.</h1>
            <p className="mt-4 max-w-xl text-zinc-600 leading-relaxed">A price-free guide. No booking fees. You deal direct with host on WhatsApp or Call. Ask for photos, dates, best rate.</p>
          </div>
          <div className="bg-zinc-900 text-white rounded-2xl px-5 py-4 text-sm">
            <div className="text-[11px] uppercase tracking-widest opacity-60">Contact EL SAR 031</div>
            <div className="mt-1 font-bold text-lg">{CONTACT_NUMBER}</div>
            <div className="mt-3 flex gap-2">
              <a href={TEL_LINK} className="bg-white text-zinc-900 rounded-full px-4 py-2 font-bold text-xs">Call Now</a>
              <a href={WHATSAPP_LINK} target="_blank" className="bg-green-500 text-white rounded-full px-4 py-2 font-bold text-xs">WhatsApp</a>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {regions.map(r => (
            <button key={r} onClick={() => setFilter(r)} className={`rounded-full px-4 py-2 text-sm border transition ${filter===r?"bg-zinc-900 text-white border-zinc-900":"bg-white border-zinc-200 hover:border-zinc-900"}`}>{r}</button>
          ))}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-16 grid md:grid-cols-3 gap-4">
        {filtered.map(p => (
          <div key={p.id} className="bg-white border border-zinc-200 rounded-[24px] p-6 flex flex-col">
            <div className="flex justify-between items-start gap-4">
              <h2 className="text-[18px] font-bold leading-tight">{p.name}</h2>
              <span className="shrink-0 text-[10px] uppercase tracking-widest bg-zinc-900 text-white rounded-full px-2.5 py-1">{p.tag}</span>
            </div>
            <div className="mt-2 text-xs tracking-widest uppercase text-zinc-500">{p.region}</div>
            <p className="mt-3 text-[14px] leading-relaxed text-zinc-600 flex-1">{p.desc}</p>
            <div className="mt-5 border-t border-zinc-100 pt-4">
              <div className="text-[11px] uppercase tracking-widest text-zinc-400">Enquire Direct • {CONTACT_NUMBER}</div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <a href={TEL_LINK} className="text-center rounded-full bg-zinc-900 text-white py-2.5 text-sm font-bold">Call</a>
                <a href={`${WHATSAPP_LINK}?text=Hi, I'm interested in ${encodeURIComponent(p.name)} - ${p.region}. Is it available?`} target="_blank" className="text-center rounded-full bg-green-500 text-white py-2.5 text-sm font-bold">WhatsApp</a>
              </div>
            </div>
          </div>
        ))}
      </main>

      <footer className="max-w-6xl mx-auto px-6 pb-12">
        <div className="bg-white border border-zinc-200 rounded-[20px] p-6 flex flex-wrap justify-between gap-4 items-center">
          <div className="text-sm"><b>EL SAR 031</b> • Umlazi, KZN • {CONTACT_NUMBER} • No prices online - we quote on WhatsApp</div>
          <div className="flex gap-2">
            <a href={TEL_LINK} className="rounded-full border border-zinc-900 px-4 py-2 text-sm font-bold">Call {CONTACT_NUMBER}</a>
            <a href={WHATSAPP_LINK} className="rounded-full bg-zinc-900 text-white px-4 py-2 text-sm font-bold">WhatsApp Us</a>
          </div>
        </div>
        <div className="mt-4 text-xs text-zinc-400 text-center">No prices • No middleman • Direct host contact only</div>
      </footer>
    </div>
  );
}


]