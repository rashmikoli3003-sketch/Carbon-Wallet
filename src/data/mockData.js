// Mock Data & Emission Calculation Engine for Carbon Wallet AI

export const INITIAL_USER = {
  name: "Eco Explorer",
  email: "eco.explorer@earth.org",
  city: "San Francisco, CA",
  avatar: "🌱",
  joinDate: "September 2026",
};

export const INITIAL_BUDGET = {
  monthlyLimitKg: 100,
  usedKg: 63,
  unit: "kg CO₂e",
  period: "September 2026",
};

export const IMPACT_CATEGORIES = [
  { id: "transport", name: "Transport", icon: "🚗", color: "#173D28", hex: "#173D28", usedKg: 28.5, percentage: 45 },
  { id: "food", name: "Food & Dining", icon: "🍔", color: "#A7C98F", hex: "#A7C98F", usedKg: 18.2, percentage: 29 },
  { id: "energy", name: "Energy & Utilities", icon: "⚡", color: "#C4E89A", hex: "#C4E89A", usedKg: 10.8, percentage: 17 },
  { id: "shopping", name: "Shopping & Goods", icon: "🛍️", color: "#20251F", hex: "#20251F", usedKg: 5.5, percentage: 9 },
];

export const INITIAL_ACTIVITIES = [
  {
    id: "act-1",
    title: "15 km Car Commute (Gasoline)",
    category: "Transport",
    icon: "🚗",
    amountKg: 2.8,
    date: "Today, 8:30 AM",
    type: "high",
    tip: "Taking public bus would reduce this to ~0.7 kg",
  },
  {
    id: "act-2",
    title: "Beef Burger Lunch",
    category: "Food",
    icon: "🍔",
    amountKg: 4.2,
    date: "Yesterday, 1:15 PM",
    type: "high",
    tip: "Swapping for a plant patty saves 3.5 kg CO₂e",
  },
  {
    id: "act-3",
    title: "Metro Subway Trip",
    category: "Transport",
    icon: "🚇",
    amountKg: 0.4,
    date: "Sep 14, 6:00 PM",
    type: "low",
    tip: "Great low-carbon choice!",
  },
  {
    id: "act-4",
    title: "Home Electricity Usage",
    category: "Energy",
    icon: "⚡",
    amountKg: 3.1,
    date: "Sep 14, 11:59 PM",
    type: "medium",
    tip: "Switching to green tariff reduces grid carbon impact",
  },
];

export const SCANNER_KNOWLEDGE_BASE = {
  "beef burger": {
    name: "Beef Burger",
    category: "Food & Dining",
    emissionsKg: 3.8,
    confidence: "High (Based on LCA averages)",
    assumptions: "Assumes 150g beef patty, standard bun, and transport from farm to restaurant.",
    alternatives: [
      { name: "Black Bean Burger", emissionsKg: 0.8, savingsPercent: 79, icon: "🥗" },
      { name: "Chicken Sandwich", emissionsKg: 1.6, savingsPercent: 58, icon: "🥪" },
      { name: "Beyond / Impossible Burger", emissionsKg: 1.1, savingsPercent: 71, icon: "🌱" },
    ],
  },
  "car travel": {
    name: "10 km Solo Drive (Gasoline Car)",
    category: "Transport",
    emissionsKg: 1.9,
    confidence: "High (EPA Average Passenger Vehicle)",
    assumptions: "Assumes average passenger car emitting 192g CO₂e per km.",
    alternatives: [
      { name: "Electric Bus Trip", emissionsKg: 0.3, savingsPercent: 84, icon: "🚌" },
      { name: "Electric Bicycle", emissionsKg: 0.05, savingsPercent: 97, icon: "🚲" },
      { name: "Carpool (3 passengers)", emissionsKg: 0.6, savingsPercent: 68, icon: "🚗" },
    ],
  },
  "flight": {
    name: "Round-Trip Domestic Flight (500 km)",
    category: "Transport",
    emissionsKg: 120.0,
    confidence: "High (ICAO Carbon Calculator)",
    assumptions: "Assumes economy class short-haul flight with radiative forcing multiplier.",
    alternatives: [
      { name: "High-Speed Rail", emissionsKg: 14.0, savingsPercent: 88, icon: "🚆" },
      { name: "Electric Car Roadtrip", emissionsKg: 32.0, savingsPercent: 73, icon: "⚡" },
    ],
  },
  "laptop": {
    name: "8 Hours Laptop Work",
    category: "Energy & Utilities",
    emissionsKg: 0.25,
    confidence: "Medium",
    assumptions: "Assumes 50W average power draw on standard regional grid intensity.",
    alternatives: [
      { name: "Solar-Powered Charging", emissionsKg: 0.02, savingsPercent: 92, icon: "☀️" },
    ],
  },
  "plastic bottle": {
    name: "Single-Use Plastic Water Bottle (500ml)",
    category: "Shopping & Goods",
    emissionsKg: 0.16,
    confidence: "High",
    assumptions: "Includes PET manufacturing, water purification, bottling, and freight distribution.",
    alternatives: [
      { name: "Stainless Steel Flask (Refill)", emissionsKg: 0.005, savingsPercent: 97, icon: "🥛" },
    ],
  },
};

export const WHAT_IF_DEFAULT_HABITS = {
  carDaysPerWeek: 5,
  meatMealsPerWeek: 4,
  electricityKwHPerDay: 12,
  flightsPerYear: 2,
  fastFashionItemsPerMonth: 3,
};

export const CALCULATE_WHAT_IF = (habits) => {
  // Annual calculation estimates
  const carAnnual = habits.carDaysPerWeek * 52 * 12 * 0.192; // ~12km per day drive
  const meatAnnual = habits.meatMealsPerWeek * 52 * 3.5;
  const electricityAnnual = habits.electricityKwHPerDay * 365 * 0.385;
  const flightsAnnual = habits.flightsPerYear * 250;
  const fashionAnnual = habits.fastFashionItemsPerMonth * 12 * 15;

  const totalAnnualKg = carAnnual + meatAnnual + electricityAnnual + flightsAnnual + fashionAnnual;
  return {
    carAnnual: Math.round(carAnnual),
    meatAnnual: Math.round(meatAnnual),
    electricityAnnual: Math.round(electricityAnnual),
    flightsAnnual: Math.round(flightsAnnual),
    fashionAnnual: Math.round(fashionAnnual),
    totalAnnualKg: Math.round(totalAnnualKg),
    monthlyAverageKg: Math.round(totalAnnualKg / 12),
  };
};

export const ECO_CHALLENGES = [
  { id: "ch-1", title: "Meatless Monday", points: 25, description: "Log 3 plant-based meals today", completed: false, icon: "🥗" },
  { id: "ch-2", title: "Public Transit Hero", points: 20, description: "Take bus or train instead of driving", completed: true, icon: "🚌" },
  { id: "ch-3", title: "Zero Plastic Day", points: 15, description: "Use reusable flask & bags all day", completed: false, icon: "♻️" },
  { id: "ch-4", title: "Energy Saver", points: 30, description: "Unplug idle electronics for 24h", completed: false, icon: "🔌" },
];

export const ECO_BADGES = [
  { id: "b1", title: "Eco Explorer 🌱", desc: "Started your carbon wallet journey", unlocked: true, icon: "🌱" },
  { id: "b2", title: "Plant Powered 🥗", desc: "Saved 20kg CO₂ by choosing plant meals", unlocked: true, icon: "🥗" },
  { id: "b3", title: "Transit Champion 🚌", desc: "Took 10 green transit trips", unlocked: true, icon: "🚌" },
  { id: "b4", title: "What-If Master 🔮", desc: "Explored 5 footprint reduction scenarios", unlocked: false, icon: "🔮" },
  { id: "b5", title: "Budget Guardian 🛡️", desc: "Stayed under monthly budget for 30 days", unlocked: false, icon: "🛡️" },
];

export const MOCK_BOT_RESPONSES = [
  {
    keywords: ["reduce", "footprint", "lower", "help", "tips"],
    reply: "To make the biggest dent in your carbon budget this week: 1) Try swapping 2 meat lunches for plant options (saves ~7kg CO₂e), 2) Combine errands into 1 car trip, and 3) Switch home LED lighting. These 3 tweaks fit easily into your budget!",
  },
  {
    keywords: ["habit", "biggest", "impact", "most", "transport"],
    reply: "Based on your carbon budget analysis, **Transport (45%)** is currently your single largest carbon expense! Shifting just 2 commutes per week to public transit or carpooling will save you ~22 kg CO₂e every month.",
  },
  {
    keywords: ["travel", "commute", "car", "bus", "flight"],
    reply: "Greener travel alternatives: High-speed rail emits up to 85% less carbon than short flights. For daily travel, electric buses or e-bikes offer nearly 90% reduction compared to solo gas car driving!",
  },
  {
    keywords: ["food", "diet", "meat", "burger"],
    reply: "Food is one of the easiest areas to win! Beef generates ~27kg CO₂e per kg, while legumes and vegetables produce less than 1kg. Even a 'Flexitarian' diet cuts food emissions by nearly half!",
  },
];
