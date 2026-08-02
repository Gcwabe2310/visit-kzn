
import { PLACES } from "./src/data/places";

const CONTACT = "0815890376";
const WA = "https://wa.me/27815890376";
const TEL = "tel:+27815890376";

export default function AttractionsGrid() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-black mb-4">Explore KZN - No Prices Online</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {PLACES.map(p => (
          <div key={p.id} className="bg-white border border-zinc-200 rounded-[20px] p-5">
            <h3 className="font-bold">{p.name}</h3>
            <div className="text-xs uppercase tracking-widest text-zinc-500 mt-1">{p.region} • {p.tag}</div>
            <p className="text-sm text-zinc-600 mt-2">{p.desc}</p>
            <div className="mt-4 border-t pt-3">
              <div className="text-[11px] uppercase text-zinc-400">Contact EL SAR {CONTACT}</div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <a href={TEL} className="text-center bg-zinc-900 text-white rounded-full py-2 text-sm font-bold">Call</a>
                <a href={`${WA}?text=Hi, ${p.name} please`} target="_blank" className="text-center bg-green-500 text-white rounded-full py-2 text-sm font-bold">WhatsApp</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
U