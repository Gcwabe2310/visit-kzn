import express from 'express';
import path from 'path';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Initialize Gemini AI SDK (Server-Side Only)
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = apiKey
    ? new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      })
    : null;

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'Visit KZN Backend API', geminiAvailable: !!ai });
  });

  // AI Itinerary Generation Endpoint
  app.post('/api/plan-itinerary', async (req, res) => {
    const { durationDays = 3, budgetLevel = 'Moderate', style = 'Balanced', groupSize = 'Couple', interests = [] } = req.body;

    const promptText = `Generate a detailed day-by-day KwaZulu-Natal (KZN), South Africa tourism itinerary.
    User travel specs:
    - Duration: ${durationDays} days
    - Budget Level: ${budgetLevel}
    - Travel Style: ${style}
    - Group Type: ${groupSize}
    - Special Interests: ${interests.join(', ') || 'Culture, Safari, Beach'}

    Include top KZN destinations such as Hluhluwe-iMfolozi Big 5 Safari, Drakensberg Mountains (Amphitheatre, Tugela Falls), Durban Golden Mile, iSimangaliso Wetland Park (St Lucia hippos), Zulu cultural villages (Shakaland), Midlands Meander, Oribi Gorge, or Battlefields depending on the requested duration and style.
    Provide costs in South African Rand (ZAR). Return exact JSON format matching the schema.`;

    if (ai) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.6-flash',
          contents: promptText,
          config: {
            systemInstruction: 'You are an expert KwaZulu-Natal tourism architect. Create immersive, accurate, authentic travel itineraries in KZN, South Africa with realistic ZAR costs, travel distances in km, day-by-day schedules, packing recommendations, and local safety & Zulu etiquette tips.',
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                summary: { type: Type.STRING },
                estimatedCostZAR: { type: Type.NUMBER },
                totalDistanceKm: { type: Type.NUMBER },
                packingList: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                safetyTips: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                days: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      dayNumber: { type: Type.NUMBER },
                      title: { type: Type.STRING },
                      morning: { type: Type.STRING },
                      afternoon: { type: Type.STRING },
                      evening: { type: Type.STRING },
                      highlightedSpots: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                      },
                      dayCostZAR: { type: Type.NUMBER },
                    },
                    required: ['dayNumber', 'title', 'morning', 'afternoon', 'evening', 'highlightedSpots', 'dayCostZAR'],
                  },
                },
              },
              required: ['title', 'summary', 'estimatedCostZAR', 'totalDistanceKm', 'packingList', 'safetyTips', 'days'],
            },
          },
        });

        const jsonText = response.text || '';
        const itinerary = JSON.parse(jsonText);
        return res.json({ success: true, itinerary });
      } catch (err) {
        console.error('Gemini API execution error, falling back to dynamic generator:', err);
      }
    }

    // Fallback dynamic generator if AI key is missing or call fails
    const daysArr = [];
    const baseDailyCost = budgetLevel === 'Luxury' ? 3500 : budgetLevel === 'Budget' ? 950 : 1850;
    
    for (let d = 1; d <= durationDays; d++) {
      if (d === 1) {
        daysArr.push({
          dayNumber: 1,
          title: 'Arrival in Durban & Golden Mile Exploration',
          morning: 'Land at King Shaka International Airport. Transfer to Durban beachfront and check into your seaside resort.',
          afternoon: 'Stroll along the Durban Golden Mile oceanfront. Enjoy fresh authentic Durban Mutton Bunny Chow at Sunrise Chip ’N’ Ranch.',
          evening: 'Sunset cocktails overlooking the Indian Ocean at Umhlanga Pier followed by fresh seafood at Cargo Hold uShaka.',
          highlightedSpots: ['King Shaka Airport', 'Durban Golden Mile', 'uShaka Marine World'],
          dayCostZAR: baseDailyCost + 400
        });
      } else if (d === 2 && durationDays >= 2) {
        daysArr.push({
          dayNumber: 2,
          title: 'Zululand Big 5 Safari & St Lucia Estuary',
          morning: 'Early morning drive to Hluhluwe-iMfolozi Park. Join an open 4x4 game drive tracking White Rhinos and Lions.',
          afternoon: 'Head to St Lucia in iSimangaliso Wetland Park. Sunset boat cruise watching hippos and crocodiles.',
          evening: 'Estuary deck braai dinner under the stars at St Lucia, with traditional Zulu storyteller.',
          highlightedSpots: ['Hluhluwe-iMfolozi Game Reserve', 'iSimangaliso Wetland Park', 'St Lucia Estuary'],
          dayCostZAR: baseDailyCost + 850
        });
      } else if (d === 3 && durationDays >= 3) {
        daysArr.push({
          dayNumber: 3,
          title: 'Majestic Drakensberg Peaks & Tugela Falls Hike',
          morning: 'Journey inland into the Royal Natal National Park in the Northern Drakensberg.',
          afternoon: 'Guided hike along the Tugela Gorge river trail towards the colossal Amphitheatre cliff face.',
          evening: 'Cozy log fire dinner at Cathedral Peak Mountain Resort with local South African Pinotage wine.',
          highlightedSpots: ['Royal Natal National Park', 'Drakensberg Amphitheatre', 'Cathedral Peak'],
          dayCostZAR: baseDailyCost + 300
        });
      } else {
        daysArr.push({
          dayNumber: d,
          title: `Day ${d}: KZN Culture, Midlands Craft & Adventure`,
          morning: 'Visit the Nelson Mandela Capture Site and Marco Cianfanelli steel sculpture in Howick.',
          afternoon: 'Explore the Midlands Meander craft market, artisanal cheese tasting, and pottery studios.',
          evening: 'Shisa Nyama traditional Zulu barbecue experience with live music and dancing.',
          highlightedSpots: ['Nelson Mandela Capture Site', 'Midlands Meander', 'Max’s Lifestyle Umlazi'],
          dayCostZAR: baseDailyCost
        });
      }
    }

    const fallbackItinerary = {
      title: `${durationDays}-Day Ultimate ${style} Expedition in KwaZulu-Natal`,
      summary: `A curated ${durationDays}-day journey designed for a ${groupSize.toLowerCase()} seeking a ${budgetLevel.toLowerCase()} ${style.toLowerCase()} experience across KwaZulu-Natal’s coastline, wildlife reserves, and mountain peaks.`,
      estimatedCostZAR: daysArr.reduce((acc, curr) => acc + curr.dayCostZAR, 0),
      totalDistanceKm: durationDays * 185,
      packingList: [
        'Light breathable cotton clothing for warm sub-tropical days',
        'Warm fleece & jacket for chilly Drakensberg mountain evenings',
        'Sturdy hiking boots & sun hat',
        'Binoculars for safari game drives',
        'Environmentally friendly sunscreen & insect repellent'
      ],
      safetyTips: [
        'Keep vehicle doors locked when driving through cities and game parks.',
        'Greet locals with warmth ("Sawubona" in isiZulu means "I see you").',
        'Drink bottled or purified water when hiking in rural areas.',
        'Never feed wild animals in nature reserves.'
      ],
      days: daysArr
    };

    return res.json({ success: true, itinerary: fallbackItinerary });
  });

  // Booking Checkout API
  app.post('/api/bookings', (req, res) => {
    const { items = [], user = {}, paymentMethod = 'credit_card' } = req.body;
    
    const refCode = 'KZN-' + new Date().getFullYear() + '-' + Math.floor(10000 + Math.random() * 90000);
    const totalZAR = items.reduce((sum: number, item: any) => sum + (item.priceZAR || 0), 0);

    const confirmation = {
      success: true,
      referenceCode: refCode,
      bookingDate: new Date().toISOString(),
      itemsCount: items.length,
      totalPaidZAR: totalZAR,
      paymentMethod,
      customerName: user.name || 'Valued Visitor',
      customerEmail: user.email || 'guest@visitkzn.co.za',
      qrCodePayload: `VISIT-KZN|REF:${refCode}|TOTAL:R${totalZAR}`,
      message: 'Booking confirmed! Your KwaZulu-Natal digital travel pass has been issued.'
    };

    return res.json(confirmation);
  });

  // Business Partner Listing Submission API
  app.post('/api/business/listings', (req, res) => {
    const { title, category, region, description, priceZAR, address, contactEmail, contactPhone } = req.body;

    if (!title || !contactEmail) {
      return res.status(400).json({ error: 'Title and contact email are required.' });
    }

    const listingId = 'biz-' + Date.now();
    const newListing = {
      id: listingId,
      title,
      category: category || 'Attraction & Experience',
      region: region || 'Durban & Coast',
      description,
      priceZAR: Number(priceZAR) || 0,
      address,
      contactEmail,
      contactPhone,
      status: 'active',
      createdAt: new Date().toISOString()
    };

    return res.json({ success: true, listing: newListing, message: 'Partner listing published successfully to Visit KZN directory!' });
  });

  // Serve Frontend Assets (Vite Middleware in Dev, Static in Prod)
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Visit KZN full-stack application active at http://localhost:${PORT}`);
  });
}

startServer();
