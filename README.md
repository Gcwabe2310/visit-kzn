# Visit KZN - KwaZulu-Natal Tourism Platform 🇿🇦

Welcome to **Visit KZN**, an official production-ready tourism platform for KwaZulu-Natal, South Africa. Discover Big 5 game safaris, the UNESCO Drakensberg mountain range, Durban's warm subtropical Golden Mile, rich Zulu cultural heritage, and regional dining.

---

## 🌟 Key Features

1. **Attractions & Safaris Explorer**
   - Hluhluwe-iMfolozi Game Reserve (White Rhino sanctuary & Big 5).
   - Drakensberg Amphitheatre & Tugela Falls hike.
   - Durban Golden Mile & uShaka Marine World.
   - iSimangaliso Wetland Park (UNESCO site with St Lucia hippo cruises).
   - Nelson Mandela Capture Site & Marco Cianfanelli steel sculpture.
   - Anglo-Zulu War Battlefields (Isandlwana & Rorke's Drift).

2. **Luxury Hotels & Safari Lodges**
   - Relais & Châteaux safari lodges, beach resorts, and country cottages.
   - Real check-in date selection, guest count, and room rates in ZAR / USD.

3. **Culinary & Dining Guide**
   - Max's Lifestyle Umlazi Shisa Nyama (open-flame Zulu braai).
   - Johnny's Roti Bunny Chow in Durban.
   - Shipwreck dining at Cargo Hold uShaka.
   - Table reservation system with instant deposits.

4. **Transfers & 4x4 Vehicle Rentals**
   - King Shaka International Airport (DUR) express shuttles.
   - Fully equipped 4x4 Land Cruisers for game reserves & Sani Pass mountain trips.

5. **Gemini AI Itinerary Architect**
   - Server-side integration using `@google/genai` and model `gemini-3.6-flash`.
   - Generates tailored multi-day KZN travel plans with day-by-day morning/afternoon/evening schedules, ZAR costs, travel distances, packing lists, and Zulu cultural etiquette tips.

6. **Interactive Destination Map**
   - Interactive geographic visualization of KwaZulu-Natal regions.
   - Clickable map pins for attractions, hotels, and restaurants with quick popups.

7. **Multilingual Support**
   - **English (EN)**
   - **isiZulu (ZU)** (*"Siyakwamukela e-KwaZulu-Natal!"*)
   - **Afrikaans (AF)** (*"Welkom in KwaZulu-Natal!"*)
   - **German (DE)** (*"Willkommen in KwaZulu-Natal!"*)

8. **Booking Drawer & Payment Integration**
   - Itemized cart with multi-currency support (ZAR R / USD $).
   - Payment gateway simulation: Credit Card, PayFast, SnapScan, and Direct EFT.
   - Printable Digital Travel Voucher & QR Pass generation with reference code.

9. **Tourism Partner Portal & Business Dashboard**
   - Allows local KZN operators, tour guides, and lodge managers to list experiences.
   - Live revenue metrics, booking counts, and tourist analytics.

---

## 🛠 Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Motion animations, Lucide Icons.
- **Backend**: Node.js, Express, `tsx` in development, `esbuild` for production CJS bundle.
- **AI Engine**: `@google/genai` SDK (`gemini-3.6-flash`).
- **State & Storage**: LocalStorage fallback persistence & Firebase configuration.

---

## 🚀 Running the Project

```bash
# Install dependencies
npm install

# Start development server on http://localhost:3000
npm run dev

# Build production bundle
npm run build

# Start production CJS server
npm run start
```

---

## 📄 Export & Deployment

This project can be exported directly as a ZIP archive or pushed to GitHub / Cloud Run via AI Studio settings menu.
