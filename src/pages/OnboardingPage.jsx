import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown, Leaf, Shield, Sparkles, Globe, CheckCircle2 } from "lucide-react";
import { UnderlineScribble, LeafDecoration, StarDoodle, CarbonCoin } from "../components/HandDrawnDoodles";
import AntigravityVortexAnimation from "../components/AntigravityVortexAnimation";

const ONBOARDING_SECTIONS = [
  {
    id: 1,
    badge: "SECTION 1 • THE PROBLEM",
    title: "We track our money, but ignore our carbon.",
    subtitle: "Every car ride, beef burger, and flight creates invisible carbon emissions.",
    description: "Unlike standard bank accounts, there is no receipt, no statement, and no daily budget limit for your carbon footprint. This makes climate impact feel abstract and hard to manage.",
    image: "/earth_sketch.jpg",
    statLabel: "Average Personal Footprint",
    statValue: "4.5 Tons CO₂e / year",
    handwrittenQuote: "Invisible emissions create invisible consequences. 🌫️",
  },
  {
    id: 2,
    badge: "SECTION 2 • CINEMATIC ANTIGRAVITY ENGINE",
    title: "Make carbon as easy to understand as money.",
    subtitle: "Watch carbon particles float weightlessly into your personal wallet storage.",
    description: "You receive a monthly allowance of 100 kg CO₂e. The futuristic antigravity energy base captures floating carbon cubes, sage green leaves, and atmospheric CO₂ in real time.",
    useVortexAnimation: true,
    statLabel: "Target Monthly Allowance",
    statValue: "100 kg CO₂e / month",
    handwrittenQuote: "Swirling neon-lime antigravity vortex! 🌿",
  },
  {
    id: 3,
    badge: "SECTION 3 • AI INTELLIGENCE",
    title: "Predict your climate impact with AI & What-If Mode.",
    subtitle: "Scan products with AI vision and forecast annual savings with interactive scenario simulations.",
    description: "Upload product photos for real-time Open Food Facts & DEFRA lifecycle carbon calculations. Use What-If Mode to test habit changes and see how many trees you can save!",
    image: "/whatif_sketch.jpg",
    statLabel: "Potential Annual Savings",
    statValue: "Up to 1,280 kg CO₂e (~58 Trees 🌳)",
    handwrittenQuote: "Every green choice earns Eco Points! 🌱",
  }
];

export default function OnboardingPage({ onFinishOnboarding }) {
  const scrollToSection = (id) => {
    const el = document.getElementById(`section-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#FFF8E8] text-[#20251F] paper-texture overflow-y-auto relative">
      
      {/* Sticky Header Bar */}
      <header className="sticky top-0 z-40 bg-[#FFF8E8]/95 backdrop-blur-md border-b-2 border-[#20251F] px-4 lg:px-8 py-3.5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="w-9 h-9 rounded-xl bg-[#173D28] text-[#C4E89A] border-2 border-[#20251F] shadow-[2px_2px_0px_#0B2418] flex items-center justify-center font-bold text-lg"
            >
              🌍
            </motion.div>
            <span className="font-heading font-extrabold text-lg text-[#0B2418]">
              CARBON WALLET AI
            </span>
          </div>

          {/* Quick Nav Links */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-[#173D28]">
              {ONBOARDING_SECTIONS.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className="px-2.5 py-1 rounded-lg hover:bg-[#F6EFE0] transition-colors"
                >
                  Part {sec.id}
                </button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onFinishOnboarding}
              className="sketch-button-accent px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-[2px_2px_0px_#0B2418]"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </div>
      </header>

      {/* Main Scrollable Content Container */}
      <main className="max-w-5xl mx-auto px-4 lg:px-8 py-8 space-y-12">
        
        {ONBOARDING_SECTIONS.map((sec) => (
          <motion.section
            key={sec.id}
            id={`section-${sec.id}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="sketch-card bg-[#F6EFE0] border-3 border-[#20251F] shadow-[8px_8px_0px_#0B2418] rounded-3xl p-6 lg:p-10 grid lg:grid-cols-12 gap-8 items-center relative overflow-hidden"
          >
            <LeafDecoration className="absolute -top-4 -right-4 w-24 h-24 text-[#A7C98F]/30" />

            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5">
              
              <motion.div
                whileHover={{ scale: 1.04 }}
                className="inline-flex items-center gap-2 bg-[#173D28] text-[#C4E89A] px-3.5 py-1 rounded-full text-xs font-black border-2 border-[#20251F] shadow-[2px_2px_0px_#0B2418]"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{sec.badge}</span>
              </motion.div>

              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#0B2418] leading-tight">
                {sec.title}
              </h2>

              <p className="text-base text-[#173D28] font-bold leading-snug">
                {sec.subtitle}
              </p>

              <p className="text-xs sm:text-sm text-[#20251F] font-medium leading-relaxed bg-[#FFF8E8] p-4 rounded-2xl border-2 border-[#20251F] shadow-[3px_3px_0px_#0B2418]">
                {sec.description}
              </p>

              {/* Key Stat Box */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-3.5 bg-[#C4E89A] rounded-2xl border-2 border-[#20251F] flex items-center justify-between shadow-[3px_3px_0px_#0B2418]"
              >
                <div>
                  <p className="text-[10px] font-black uppercase text-[#0B2418] tracking-wider">
                    {sec.statLabel}
                  </p>
                  <p className="font-heading text-lg font-extrabold text-[#0B2418]">
                    {sec.statValue}
                  </p>
                </div>
                <span className="text-xl">🌿</span>
              </motion.div>

            </div>

            {/* Right Visual / Antigravity Vortex Animation */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center text-center space-y-4">
              
              {sec.useVortexAnimation ? (
                <div className="w-full">
                  <AntigravityVortexAnimation />
                </div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.04, rotate: 1 }}
                  className="relative w-full h-64 lg:h-72 rounded-2xl border-3 border-[#20251F] overflow-hidden shadow-[6px_6px_0px_#0B2418] bg-[#FFF8E8]"
                >
                  <img
                    src={sec.image}
                    alt={sec.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              )}

              {/* Handwritten Quote */}
              <motion.div
                animate={{ rotate: [-2, 2, -2] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="bg-[#FFF8E8] text-[#0B2418] px-4 py-2 rounded-2xl border-2 border-[#20251F] shadow-[3px_3px_0px_#0B2418]"
              >
                <p className="font-handwritten text-lg font-bold text-[#173D28]">
                  "{sec.handwrittenQuote}"
                </p>
              </motion.div>

            </div>

          </motion.section>
        ))}

        {/* Bottom CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="sketch-card bg-[#173D28] text-[#FFF8E8] p-8 rounded-3xl border-3 border-[#20251F] shadow-[8px_8px_0px_#0B2418] text-center space-y-4"
        >
          <h3 className="font-heading text-2xl lg:text-3xl font-extrabold text-[#C4E89A]">
            Ready to manage your carbon wallet? 🌱
          </h3>
          <p className="text-sm font-medium text-[#FFF8E8]/90 max-w-xl mx-auto">
            Join thousands tracking daily emissions like a bank balance. Sign up or log in to launch your dashboard.
          </p>
          <div className="pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onFinishOnboarding}
              className="sketch-button-accent px-8 py-4 rounded-2xl text-sm font-black inline-flex items-center gap-2 shadow-[5px_5px_0px_#0B2418]"
            >
              <span>Continue to Login & Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>

      </main>

    </div>
  );
}


