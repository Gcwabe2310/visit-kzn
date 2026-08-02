import { PLACES } from "./src/data/places";

const CONTACT = "0815890376";
const WA = "https://wa.me/27815890376";
const TEL = "tel:+27815890376";

export default function HotelsSection() {
  const stays = PLACES.filter(p => p.tag === "Stay" || p.region === "Coast");
  return (
    <section className="max-w-6xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-black mb-4">Stays - Direct Host, No Booking Fee</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {stays.map(p => (
          <div key={p.id} className="bg-white border border-zinc-200 rounded-[20px] p-5">
            <h3 className="font-bold">{p.name}</h3>
            <div className="text-xs uppercase text-zinc-500 mt-1">{p.region}</div>
            <p className="text-sm text-zinc-600 mt-2">{p.desc}</p>
            <div className="mt-4">
              <div className="text-[11px] uppercase text-zinc-400">Enquire: {CONTACT}</div>
              <div className="mt-2 flex gap-2">
                <a href={TEL} className="flex-1 text-center bg-zinc-900 text-white rounded-full py-2 text-sm font-bold">Call {CONTACT}</a>
                <a href={WA} target="_blank" className="flex-1 text-center bg-green-500 text-white rounded-full py-2 text-sm font-bold">WhatsApp</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
