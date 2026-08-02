export type Place = {
  id: string;
  name: string;
  region: string;
  tag: string;
  desc: string;
  image?: string;
};

export const PLACES: Place[] = [
  { id: "durban", name: "Durban Golden Mile", region: "Coast", tag: "Beach & City", desc: "Wide beaches, promenade walks, surf spots and morning markets along the Indian Ocean." },
  { id: "drakensberg", name: "Drakensberg Mountains", region: "Berg", tag: "Hiking", desc: "Basalt cliffs, San rock art, and day hikes from Royal Natal to Giant's Castle." },
  { id: "isimangaliso", name: "iSimangaliso Wetland Park", region: "Elephant Coast", tag: "UNESCO", desc: "Lakes, dunes, coral reefs and turtle nesting in one continuous park." },
  { id: "hluhluwe", name: "Hluhluwe-iMfolozi Park", region: "Zululand", tag: "Safari", desc: "Africa's oldest reserve, known for rhino conservation and open savanna drives." },
  { id: "midlands", name: "Midlands Meander", region: "Midlands", tag: "Culture", desc: "Farm stalls, art studios, craft breweries and misty rolling hills." },
  { id: "kosi", name: "Kosi Bay", region: "Far North", tag: "Remote", desc: "Clear estuary channels, raffia forests and traditional fish traps." },
  { id: "umhlanga", name: "Umhlanga Rocks", region: "Coast", tag: "Stay", desc: "Modern apartments, pools, close to malls. Direct host contact only - no online price." },
  { id: "st-lucia", name: "St Lucia Estuary", region: "Elephant Coast", tag: "Stay & Tour", desc: "Hippo & croc tours, iSimangaliso gates 5 mins away. WhatsApp for best rate." },
];
Up


]