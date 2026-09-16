import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Leaf, Shield, Sparkles, Globe, CheckCircle2, ChevronRight } from "lucide-react";
import { UnderlineScribble, LeafDecoration, StarDoodle, CarbonCoin } from "../components/HandDrawnDoodles";

const ONBOARDING_SLIDES = [
  {
    id: 1,
    badge: "SLIDE 1 OF 3 • THE PROBLEM",
    title: "We track our money, but ignore our carbon.",
    subtitle: "Every car ride, beef burger, and flight creates invisible carbon emissions.",
    description: "Unlike standard bank accounts, there is no receipt, no statement, and no daily budget limit for your carbon footprint. This makes climate impact feel abstract and hard to manage.",
    image: "/earth_sketch.jpg",
    statLabel: "Average Personal Footprint",
    statValue: "4.5 Tons CO₂e / year",
    handwrittenQuote: "Invisible emissions create invisible consequences. 🌫️",
    buttonText: "Next: The Solution →",
  },
  {
    id: 2,
    badge: "SLIDE 2 OF 3 • THE SOLUTION",
    title: "Make carbon as easy to understand as money.",
    subtitle: "Carbon Wallet AI translates greenhouse gases into standard daily budget limits.",
    description: "You receive a monthly allowance of 100 kg CO₂e aligned with Paris 1.5°C climate goals. Every daily action deducts carbon dollars from your wallet balance just like a credit card.",
    image: "/carbon_wallet.jpg",
    statLabel: "Target Monthly Allowance",
    statValue: "100 kg CO₂e / month",
    handwrittenQuote: "Spend your carbon budget wisely! 💳",
    buttonText: "Next: AI Power →",
  },
  {
    id: 3,
    badge: "SLIDE 3 OF 3 • AI INTELLIGENCE",
    title: "Predict your climate impact with AI & What-If Mode.",
    subtitle: "Scan products with AI vision and forecast annual savings with interactive scenario simulations.",
    description: "Upload product photos for real-time Open Food Facts & DEFRA lifecycle carbon calculations. Use What-If Mode to test habit changes and see how many trees you can save!",
    image: "/whatif_sketch.jpg",
    statLabel: "Potential Annual Savings",
    statValue: "Up to 1,280 kg CO₂e (~58 Trees 🌳)",
    handwrittenQuote: "Every green choice earns Eco Points! 🌱",
    buttonText: "Proceed to Login / Signup →",
  }
];

export default function OnboardingPage({ onFinishOnboarding }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const slide = ONBOARDING_SLIDES[currentSlideIndex];

  const handleNext = () => {
    if (currentSlideIndex < ONBOARDING_SLIDES.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    } else {
      onFinishOnboarding();
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8E8] flex flex-col justify-between p-4 lg:p-8 paper-texture">
      
      {/* Top Header Bar */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between py-2">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#173D28] text-[#C4E89A] border-2 border-[#20251F] shadow-[2px_2px_0px_#0B2418] flex items-center justify-center font-bold text-lg">
            🌍
          </div>
          <span className="font-heading font-extrabold text-lg text-[#0B2418]">
            CARBON WALLET AI
          </span>
        </div>

        {/* Step Progress Indicators */}
        <div className="flex items-center gap-2">
          {ONBOARDING_SLIDES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlideIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 border border-[#20251F] ${
                idx === currentSlideIndex
                  ? "w-8 bg-[#173D28]"
                  : "w-2.5 bg-[#A7C98F]/40 hover:bg-[#A7C98F]"
              }`}
              title={`Go to page ${idx + 1}`}
            />
          ))}

          <button
            onClick={onFinishOnboarding}
            className="ml-4 text-xs font-extrabold text-[#173D28] hover:underline"
          >
            Skip to Login →
          </button>
        </div>
      </div>

      {/* Main Slide Card Container */}
      <div className="max-w-5xl mx-auto w-full my-auto py-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="sketch-card bg-[#F6EFE0] border-3 border-[#20251F] shadow-[8px_8px_0px_#0B2418] rounded-3xl p-6 lg:p-10 grid lg:grid-cols-12 gap-8 items-center relative overflow-hidden"
          >
            <LeafDecoration className="absolute -top-4 -right-4 w-24 h-24 text-[#A7C98F]/30" />

            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5">
              
              <div className="inline-flex items-center gap-2 bg-[#173D28] text-[#C4E89A] px-3.5 py-1 rounded-full text-xs font-black border-2 border-[#20251F] shadow-[2px_2px_0px_#0B2418]">
                <Globe className="w-3.5 h-3.5" />
                <span>{slide.badge}</span>
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#0B2418] leading-tight">
                {slide.title}
              </h1>

              <p className="text-base text-[#173D28] font-bold leading-snug">
                {slide.subtitle}
              </p>

              <p className="text-xs sm:text-sm text-[#20251F] font-medium leading-relaxed bg-[#FFF8E8] p-4 rounded-2xl border-2 border-[#20251F] shadow-[3px_3px_0px_#0B2418]">
                {slide.description}
              </p>

              {/* Key Stat Box */}
              <div className="p-3.5 bg-[#C4E89A] rounded-2xl border-2 border-[#20251F] flex items-center justify-between shadow-[3px_3px_0px_#0B2418]">
                <div>
                  <p className="text-[10px] font-black uppercase text-[#0B2418] tracking-wider">
                    {slide.statLabel}
                  </p>
                  <p className="font-heading text-lg font-extrabold text-[#0B2418]">
                    {slide.statValue}
                  </p>
                </div>
                <span className="text-2xl">⚡</span>
              </div>

            </div>

            {/* Right Artwork & Quote */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center text-center space-y-4">
              
              <motion.div
                whileHover={{ scale: 1.04, rotate: 1 }}
                className="relative w-full h-64 lg:h-72 rounded-2xl border-3 border-[#20251F] overflow-hidden shadow-[6px_6px_0px_#0B2418] bg-[#FFF8E8]"
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Handwritten Quote */}
              <div className="bg-[#FFF8E8] text-[#0B2418] px-4 py-2 rounded-2xl border-2 border-[#20251F] shadow-[3px_3px_0px_#0B2418] rotate-[-2deg]">
                <p className="font-handwritten text-lg font-bold text-[#173D28]">
                  "{slide.handwrittenQuote}"
                </p>
              </div>

            </div>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Navigation Control Bar */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between py-2">
        <button
          onClick={handlePrev}
          disabled={currentSlideIndex === 0}
          className={`sketch-button px-5 py-3 rounded-2xl text-xs font-black flex items-center gap-2 ${
            currentSlideIndex === 0
              ? "opacity-40 cursor-not-allowed bg-[#F6EFE0]"
              : "bg-[#FFF8E8] text-[#0B2418]"
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous Page</span>
        </button>

        <span className="text-xs font-extrabold text-[#173D28]">
          Page {currentSlideIndex + 1} of 3
        </span>

        <button
          onClick={handleNext}
          className="sketch-button-accent px-6 py-3.5 rounded-2xl text-xs font-black flex items-center gap-2 shadow-[4px_4px_0px_#0B2418]"
        >
          <span>{slide.buttonText}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
