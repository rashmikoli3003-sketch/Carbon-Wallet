import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown, Leaf, Sparkles, ShieldCheck, Car, Bus, Globe, CheckCircle, PieChart, Scan, RefreshCw } from "lucide-react";
import ClimateVisual from "../components/ClimateVisual";

export default function LandingPage({ onStartJourney, onExploreFeatures, onNavigateAuth }) {
  // What-If Interactive Demo State (Section 4)
  const [transportMode, setTransportMode] = useState("car"); // 'car' vs 'bus'
  const carEmissions = 4.2; // kg CO₂e
  const busEmissions = 0.8; // kg CO₂e
  const savings = Math.round((carEmissions - busEmissions) * 10) / 10;
  const annualTrees = Math.round((savings * 52) / 22);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#07110B] text-[#F4F2E8] font-sans selection:bg-[#B8F56B] selection:text-[#07110B] overflow-x-hidden">
      
      {/* Top Editorial Navigation */}
      <header className="sticky top-0 z-50 bg-[#07110B]/85 backdrop-blur-md border-b border-[#8EBB91]/15 px-6 lg:px-12 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection("hero-section")}>
            <div className="w-9 h-9 rounded-xl bg-[#0D2116] border border-[#B8F56B]/40 flex items-center justify-center font-bold text-sm text-[#B8F56B] glow-lime-sm">
              🌱
            </div>
            <div>
              <span className="font-heading font-extrabold text-base lg:text-lg tracking-wider text-[#F4F2E8]">
                CARBON WALLET <span className="text-[#B8F56B]">AI</span>
              </span>
              <p className="text-[10px] font-mono text-[#8EBB91] tracking-widest uppercase -mt-0.5">
                MAKING YOUR CARBON VISIBLE
              </p>
            </div>
          </div>

          {/* Center Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-wider uppercase text-[#8EBB91]">
            <button onClick={() => scrollToSection("problem-section")} className="hover:text-[#B8F56B] transition-colors">
              How It Works
            </button>
            <button onClick={() => scrollToSection("idea-section")} className="hover:text-[#B8F56B] transition-colors">
              Features
            </button>
            <button onClick={() => scrollToSection("whatif-section")} className="hover:text-[#B8F56B] transition-colors">
              What-If
            </button>
            <button onClick={() => scrollToSection("product-section")} className="hover:text-[#B8F56B] transition-colors">
              About
            </button>
          </nav>

          {/* Right Login Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNavigateAuth}
            className="px-5 py-2.5 rounded-full bg-[#0D2116] border border-[#B8F56B]/40 text-[#B8F56B] text-xs font-mono font-bold tracking-wider uppercase hover:bg-[#B8F56B] hover:text-[#07110B] transition-all flex items-center gap-1.5 glow-lime-sm"
          >
            <span>LOGIN</span>
            <span className="text-sm">↗</span>
          </motion.button>

        </div>
      </header>

      {/* HERO SECTION */}
      <section id="hero-section" className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-12 lg:pt-20 pb-20 grid lg:grid-cols-12 gap-12 items-center min-h-[calc(100vh-80px)]">
        
        {/* Left Side: Editorial Typography */}
        <div className="lg:col-span-7 space-y-8 z-10">
          
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D2116] border border-[#B8F56B]/30 text-[#B8F56B] text-xs font-mono tracking-widest uppercase glow-lime-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#B8F56B] animate-ping" />
            <span>AI FOR CLIMATE ACTION</span>
          </motion.div>

          {/* Main Editorial Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-2 relative"
          >
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[#F4F2E8] leading-[1.02] tracking-tight">
              WHAT IF YOUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B8F56B] via-[#8EBB91] to-[#D5B86A]">
                CARBON HAD
              </span> <br />
              A WALLET?
            </h1>

            {/* Tasteful Handwritten Annotation */}
            <motion.p
              animate={{ rotate: [-2, 2, -2] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="font-handwritten text-2xl lg:text-3xl text-[#D5B86A] pt-2"
            >
              "Every choice leaves a trace."
            </motion.p>
          </motion.div>

          {/* Supporting Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-[#8EBB91] font-medium leading-relaxed max-w-xl"
          >
            Understand your impact. Explore better choices. Build a lighter footprint.
            Carbon Wallet AI turns complex greenhouse gas metrics into intuitive visual accounts.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onStartJourney}
              className="px-8 py-4 rounded-full bg-[#B8F56B] text-[#07110B] font-heading font-bold text-sm tracking-wider uppercase flex items-center gap-2 glow-lime"
            >
              <span>START YOUR JOURNEY</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => scrollToSection("problem-section")}
              className="px-8 py-4 rounded-full bg-[#0D2116] border border-[#8EBB91]/30 text-[#F4F2E8] font-heading font-semibold text-sm tracking-wider uppercase flex items-center gap-2 hover:border-[#B8F56B]/50 transition-all"
            >
              <span>EXPLORE THE IDEA</span>
              <ArrowDown className="w-4 h-4 text-[#B8F56B]" />
            </motion.button>
          </motion.div>

        </div>

        {/* Right Side: Unique Climate 5-Phase Canvas Illustration */}
        <div className="lg:col-span-5 relative">
          <ClimateVisual />
        </div>

      </section>

      {/* SECTION 1 — THE PROBLEM */}
      <section id="problem-section" className="py-24 border-t border-[#8EBB91]/15 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <span className="text-xs font-mono uppercase text-[#B8F56B] tracking-widest">
              01 // THE CORE PROBLEM
            </span>

            <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-[#F4F2E8] leading-tight">
              WE TRACK MONEY. <br />
              <span className="text-[#8EBB91]">BUT WHAT ABOUT CARBON?</span>
            </h2>

            <p className="text-base sm:text-lg text-[#8EBB91] font-normal leading-relaxed">
              Every journey, meal, and purchase has an environmental impact. But understanding that impact isn't always easy. Without visual receipts or budget limits, carbon remains an abstract mystery.
            </p>
          </motion.div>

          {/* Interactive Visual: Coin transforming into Carbon symbol */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 editorial-card p-8 flex flex-col items-center justify-center text-center space-y-6 relative overflow-hidden"
          >
            <div className="w-24 h-24 rounded-full bg-[#0D2116] border border-[#B8F56B]/40 flex items-center justify-center text-4xl shadow-[0_0_30px_rgba(184,245,107,0.2)] animate-pulse">
              🪙
            </div>
            <div className="space-y-2">
              <h4 className="font-heading font-bold text-xl text-[#F4F2E8]">
                Money Has Clear Receipts
              </h4>
              <p className="text-xs text-[#8EBB91] max-w-sm">
                You know exact balances down to the dollar. Carbon Wallet AI gives your emissions that exact same clarity.
              </p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* SECTION 2 — THE IDEA */}
      <section id="idea-section" className="py-24 bg-[#0D2116]/40 border-t border-[#8EBB91]/15">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-mono uppercase text-[#B8F56B] tracking-widest">
              02 // THE SOLUTION
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-[#F4F2E8]">
              MAKE THE INVISIBLE <span className="text-[#B8F56B]">VISIBLE.</span>
            </h2>
            <p className="text-base text-[#8EBB91]">
              Transform invisible greenhouse gas metrics into clear, actionable visual reports.
            </p>
          </div>

          {/* 3 Short Points */}
          <div className="grid md:grid-cols-3 gap-8">
            
            <motion.div
              whileHover={{ y: -6 }}
              className="editorial-card p-8 space-y-4"
            >
              <span className="text-xs font-mono font-bold text-[#B8F56B]">01 / HABITS</span>
              <h3 className="font-heading text-2xl font-bold text-[#F4F2E8]">
                UNDERSTAND YOUR HABITS
              </h3>
              <p className="text-sm text-[#8EBB91] leading-relaxed">
                Discover which daily activities — transportation, meals, or home energy — drive your carbon footprint.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -6 }}
              className="editorial-card p-8 space-y-4 border-[#B8F56B]/30"
            >
              <span className="text-xs font-mono font-bold text-[#B8F56B]">02 / IMPACT</span>
              <h3 className="font-heading text-2xl font-bold text-[#B8F56B]">
                SEE YOUR IMPACT
              </h3>
              <p className="text-sm text-[#8EBB91] leading-relaxed">
                Track your monthly allowance against Paris Climate targets with live budget capacity gauges.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -6 }}
              className="editorial-card p-8 space-y-4"
            >
              <span className="text-xs font-mono font-bold text-[#B8F56B]">03 / CHOICES</span>
              <h3 className="font-heading text-2xl font-bold text-[#F4F2E8]">
                EXPLORE YOUR OPTIONS
              </h3>
              <p className="text-sm text-[#8EBB91] leading-relaxed">
                Simulate lifestyle adjustments with What-If scenario forecasting to find low-stress green swaps.
              </p>
            </motion.div>

          </div>

        </div>
      </section>

      {/* SECTION 3 — THE PRODUCT MOCKUP */}
      <section id="product-section" className="py-24 border-t border-[#8EBB91]/15">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase text-[#B8F56B] tracking-widest">
                03 // PRODUCT PREVIEW
              </span>
              <h2 className="font-heading text-4xl font-extrabold text-[#F4F2E8]">
                MEET YOUR <span className="text-[#B8F56B]">CARBON WALLET.</span>
              </h2>
            </div>
            <p className="text-sm text-[#8EBB91] max-w-md">
              A streamlined dashboard designed for intuitive financial-style climate tracking.
            </p>
          </div>

          {/* Interactive Product Mockup Card */}
          <div className="editorial-card p-6 lg:p-10 space-y-8 bg-[#0D2116]/80 border-[#8EBB91]/30">
            
            <div className="grid md:grid-cols-12 gap-8">
              
              {/* Wallet Balance Box */}
              <div className="md:col-span-6 p-6 rounded-2xl bg-[#07110B] border border-[#8EBB91]/30 space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-[#8EBB91]">
                  <span>SEPTEMBER BUDGET</span>
                  <span className="text-[#B8F56B] bg-[#0D2116] px-2 py-0.5 rounded border border-[#B8F56B]/30">DEMO ESTIMATE</span>
                </div>
                <div>
                  <span className="font-heading text-5xl font-extrabold text-[#B8F56B]">100</span>
                  <span className="text-sm text-[#8EBB91] ml-2">kg CO₂e monthly limit</span>
                </div>
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#F4F2E8]">Used: 63 kg</span>
                    <span className="text-[#8EBB91]">Remaining: 37 kg</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-[#0D2116] border border-[#8EBB91]/30 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#8EBB91] to-[#B8F56B] w-[63%]" />
                  </div>
                </div>
              </div>

              {/* Sample Activity List */}
              <div className="md:col-span-6 space-y-3">
                <h4 className="font-heading text-xs font-mono uppercase text-[#8EBB91] tracking-wider">
                  Recent Carbon Transactions
                </h4>
                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-[#07110B] border border-[#8EBB91]/20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">🚗</span>
                      <div>
                        <p className="text-xs font-bold text-[#F4F2E8]">20 km Car Drive</p>
                        <p className="text-[10px] text-[#8EBB91]">Transport</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#B8F56B]">+4.2 kg CO₂e</span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#07110B] border border-[#8EBB91]/20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">🍔</span>
                      <div>
                        <p className="text-xs font-bold text-[#F4F2E8]">Beef Meal</p>
                        <p className="text-[10px] text-[#8EBB91]">Food & Dining</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#B8F56B]">+3.8 kg CO₂e</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* SECTION 4 — THE DIFFERENCE (WHAT-IF INTERACTIVE DEMO) */}
      <section id="whatif-section" className="py-24 bg-[#0D2116]/40 border-t border-[#8EBB91]/15">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-mono uppercase text-[#B8F56B] tracking-widest">
              04 // WHAT-IF SIMULATION
            </span>
            <h2 className="font-heading text-4xl font-extrabold text-[#F4F2E8]">
              WHAT IF ONE SMALL CHANGE <br />
              <span className="text-[#B8F56B]">CHANGED YOUR ROUTINE?</span>
            </h2>
            <p className="text-sm text-[#8EBB91]">
              Toggle travel options below to see how a simple commute swap reduces annual emissions.
            </p>
          </div>

          {/* Interactive What-If Demo Card */}
          <div className="editorial-card p-8 max-w-4xl mx-auto space-y-8">
            
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setTransportMode("car")}
                className={`px-6 py-3 rounded-full text-xs font-mono font-bold uppercase transition-all border ${
                  transportMode === "car"
                    ? "bg-[#0D2116] border-[#B8F56B] text-[#B8F56B] glow-lime-sm"
                    : "bg-[#07110B] border-[#8EBB91]/30 text-[#8EBB91]"
                }`}
              >
                🚗 Car Drive (20 km)
              </button>

              <button
                onClick={() => setTransportMode("bus")}
                className={`px-6 py-3 rounded-full text-xs font-mono font-bold uppercase transition-all border ${
                  transportMode === "bus"
                    ? "bg-[#B8F56B] border-[#B8F56B] text-[#07110B] glow-lime-sm"
                    : "bg-[#07110B] border-[#8EBB91]/30 text-[#8EBB91]"
                }`}
              >
                🚌 Public Bus (20 km)
              </button>
            </div>

            {/* Live Calculation Display */}
            <div className="grid sm:grid-cols-3 gap-6 text-center">
              <div className="p-4 rounded-2xl bg-[#07110B] border border-[#8EBB91]/20">
                <span className="text-[10px] font-mono text-[#8EBB91] uppercase">Estimated Footprint</span>
                <p className="font-heading text-3xl font-extrabold text-[#F4F2E8] mt-1">
                  {transportMode === "car" ? carEmissions : busEmissions} <span className="text-xs">kg CO₂e</span>
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#07110B] border border-[#B8F56B]/30">
                <span className="text-[10px] font-mono text-[#B8F56B] uppercase">Weekly Savings</span>
                <p className="font-heading text-3xl font-extrabold text-[#B8F56B] mt-1">
                  {transportMode === "bus" ? `${savings} kg` : "0 kg"}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#07110B] border border-[#D5B86A]/30">
                <span className="text-[10px] font-mono text-[#D5B86A] uppercase">Annual Equivalent</span>
                <p className="font-heading text-3xl font-extrabold text-[#D5B86A] mt-1">
                  {transportMode === "bus" ? `~${annualTrees} Trees 🌳` : "Baseline"}
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 5 — CALL TO ACTION */}
      <section className="py-24 border-t border-[#8EBB91]/15 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 space-y-8 relative z-10">
          <span className="text-xs font-mono uppercase text-[#B8F56B] tracking-widest">
            05 // START TODAY
          </span>

          <h2 className="font-heading text-4xl sm:text-6xl font-extrabold text-[#F4F2E8] leading-tight">
            READY TO SEE <br />
            <span className="text-[#B8F56B]">YOUR IMPACT?</span>
          </h2>

          <p className="text-base text-[#8EBB91] max-w-lg mx-auto">
            Start exploring your carbon journey. Experience the prototype and manage your climate footprint with AI.
          </p>

          <div className="pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onStartJourney}
              className="px-10 py-5 rounded-full bg-[#B8F56B] text-[#07110B] font-heading font-extrabold text-base tracking-wider uppercase inline-flex items-center gap-3 glow-lime"
            >
              <span>CREATE YOUR CARBON WALLET</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="border-t border-[#8EBB91]/15 py-12 px-6 lg:px-12 bg-[#07110B]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-[#8EBB91]">
          <div className="flex items-center gap-2">
            <span className="text-lg">🌱</span>
            <span className="font-bold text-[#F4F2E8]">CARBON WALLET AI</span>
            <span>• MAKING YOUR CARBON VISIBLE</span>
          </div>

          <p>© 2026 Carbon Wallet AI • Awwwards-Style Climate Experience</p>
        </div>
      </footer>

    </div>
  );
}
