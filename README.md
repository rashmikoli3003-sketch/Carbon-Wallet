# 🌍 CARBON WALLET AI

> **Tagline:** *"Make carbon as easy to understand as money."*

Carbon Wallet AI is an AI-powered climate financial literacy website designed for college hackathons and environmental storytelling. It translates abstract greenhouse gas emissions into standard personal financial budgets.

---

## 🎨 Visual Style & Hand-Drawn Aesthetic
- **Color Palette:** Forest Green (`#173D28`), Deep Green (`#0B2418`), Soft Sage (`#A7C98F`), Cream (`#FFF8E8`), Charcoal (`#20251F`), Accent Green (`#C4E89A`).
- **Typography:** `Bricolage Grotesque` (Headings), `Inter` (Body), `Caveat` & `Patrick Hand` (Handwritten Accents).
- **Design Elements:** Hand-drawn organic sketch artwork, sketchy borders (`box-shadow: 4px 4px 0px #0B2418`), paper background texture, leaf badges, and animated floating carbon coins.

---

## 🚀 Key Features

1. 🔐 **Login & Signup Screen**:
   - Hand-drawn Earth visual with quote *"Every small choice matters."*
   - Toggleable Login / Signup views, password visibility toggle, city input, and Google auth demo mode.

2. 🏠 **Landing Page**:
   - Hero headline: *"What if your carbon had a wallet?"*
   - Feature highlight cards and simple problem breakdown *"Why does carbon need a wallet?"*.

3. 📊 **User Carbon Dashboard**:
   - Monthly budget allowance card (100 kg CO₂e budget limit, 63 kg used, 37 kg remaining).
   - Animated SVG circular gauge and linear progress bar.
   - Recharts pie and bar charts breakdown across Transport, Food, Energy, and Shopping.
   - Interactive activity logger to add & delete transactions in real time.

4. 📸 **AI Carbon Scanner ("Scan Your Impact")**:
   - Product photo upload dropzone with animated scanning overlay line.
   - Manual activity search bar with instant carbon estimate, confidence indicator, assumption details, and lower-impact alternatives (e.g. Black bean burger saves 79% CO₂e).

5. 🔮 **What-If Mode (Main Feature)**:
   - Interactive side-by-side comparison panels (Current Habits vs Proposed Changes).
   - Real-time sliders for car trips, meat meals, electricity kWh, flights, and shopping.
   - Interactive comparison bar chart and trees-planted carbon equivalent calculation.

6. 🤖 **EcoAI Chatbot**:
   - Conversational AI assistant with typing indicator (`. . .`) and recommended climate prompts.

7. 🎮 **Eco Journey & Points**:
   - Level status, streak counter (🔥 4 Days), weekly eco challenges with checkboxes, unlockable achievement badges, and celebratory confetti animations.

---

## 🛠️ How to Run the Project

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### Installation & Startup
```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 🔌 Connecting a Real AI API Key
The app includes built-in mock AI engines for zero-latency hackathon demos. To connect a live LLM API (e.g. OpenAI GPT-4o or Google Gemini):

1. Open `src/pages/SettingsPage.jsx` or navigate to **Settings** in the dashboard.
2. Enter your API key under **AI API Configuration**.
3. In `src/pages/EcoAIChatbotPage.jsx`, replace the `handleSendMessage` timeout block with your API fetch call:
```javascript
const response = await fetch("https://api.openai.com/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
  body: JSON.stringify({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: textToSend }],
  }),
});
```

---

## 📊 Replacing Mock Carbon Estimates with Reliable Data
All emission estimates are configured in `src/data/mockData.js`. To integrate authoritative carbon emission databases:
- **Climatiq API**: Replace `SCANNER_KNOWLEDGE_BASE` with requests to `https://api.climatiq.io/estimate`.
- **UK DEFRA / EPA Factors**: Update baseline calculations in `CALCULATE_WHAT_IF` in `src/data/mockData.js`.

---

*Built with React, Vite, Tailwind CSS, Framer Motion, Recharts, Lucide Icons, and Canvas Confetti.*
