import React from "react";
import { ArrowRight, Leaf, Shield, Sparkles, PieChart, Scan, Coins, HelpCircle } from "lucide-react";
import {
  UnderlineScribble,
  LeafDecoration,
  SketchyArrow,
  StarDoodle,
  CarbonCoin,
  DemoBadge
} from "../components/HandDrawnDoodles";

export default function LandingPage({ onStartJourney, onExploreFeatures }) {
  const scrollToFeatures = () => {
    const el = document.getElementById("why-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#FFF8E8] text-[#20251F] paper-texture">
      
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 lg:px-8 pt-12 lg:pt-20 pb-16 overflow-hidden">
        
        {/* Floating Decorative Doodles */}
        <div className="absolute top-10 left-6 animate-float hidden md:block">
          <LeafDecoration className="w-12 h-12 text-[#173D28]" />
        </div>
        <div className="absolute top-24 right-12 animate-float-delayed hidden md:block">
          <StarDoodle className="w-8 h-8 text-[#173D28]" />
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-6 space-y-6 text-left z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F6EFE0] border-2 border-[#20251F] shadow-[2.5px_2.5px_0px_#0B2418]">
              <span className="text-sm">🌱</span>
              <span className="text-xs font-black text-[#0B2418] uppercase tracking-wider">
                AI Climate Financial Literacy
              </span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0B2418] leading-[1.08] tracking-tight">
              What if your carbon had a{" "}
              <span className="relative inline-block text-[#173D28]">
                wallet?
                <UnderlineScribble className="absolute -bottom-2 left-0 w-full h-4 text-[#C4E89A]" />
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#173D28] font-medium leading-relaxed max-w-xl">
              Track your impact. Understand your habits. Make greener choices with AI.
              Make carbon emissions as clear and actionable as your monthly bank statement.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onStartJourney}
                className="sketch-button-accent px-6 py-3.5 rounded-2xl text-sm font-black flex items-center gap-2 shadow-[4px_4px_0px_#0B2418]"
              >
                <span>Start My Carbon Journey</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={scrollToFeatures}
                className="sketch-button bg-[#F6EFE0] px-6 py-3.5 rounded-2xl text-sm font-extrabold text-[#0B2418] flex items-center gap-2 hover:bg-[#A7C98F]/30"
              >
                <span>Explore How It Works</span>
              </button>
            </div>

            {/* Hackathon Badge Pill */}
            <div className="pt-4 flex items-center gap-4 text-xs font-bold text-[#173D28]">
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full bg-[#173D28] border-2 border-[#20251F] flex items-center justify-center text-white text-[10px]">
                  🌱
                </div>
                <div className="w-7 h-7 rounded-full bg-[#A7C98F] border-2 border-[#20251F] flex items-center justify-center text-[#0B2418] text-[10px]">
                  ⚡
                </div>
                <div className="w-7 h-7 rounded-full bg-[#C4E89A] border-2 border-[#20251F] flex items-center justify-center text-[#0B2418] text-[10px]">
                  🔮
                </div>
              </div>
              <span>Built for Hackathon Presentation • Hackathon MVP</span>
            </div>
          </div>

          {/* Hero Right Visual */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            
            {/* Background Organic Leaf Box */}
            <div className="w-full max-w-lg bg-[#F6EFE0] p-6 lg:p-8 rounded-3xl border-3 border-[#20251F] shadow-[8px_8px_0px_#0B2418] relative">
              
              {/* Hand-Drawn Concept Poster */}
              <div className="relative rounded-2xl border-2 border-[#20251F] overflow-hidden shadow-[4px_4px_0px_#0B2418] bg-[#FFF8E8] group">
                <img
                  src="/carbon_wallet.jpg"
                  alt="Carbon Wallet AI Concept Art"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Floating Animated Carbon Coins */}
              <div className="absolute -top-5 -right-4 animate-float">
                <CarbonCoin className="w-14 h-14" />
              </div>
              <div className="absolute -bottom-6 -left-4 animate-float-delayed">
                <div className="sketch-card bg-[#C4E89A] p-3 rounded-2xl flex items-center gap-2 border-2 border-[#20251F]">
                  <span className="text-xl">💳</span>
                  <div>
                    <p className="text-[10px] font-black uppercase text-[#0B2418]">Budget Status</p>
                    <p className="text-xs font-extrabold text-[#0B2418]">37 kg CO₂e Remaining</p>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 3 Feature Cards */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div className="sketch-card p-6 bg-[#F6EFE0]">
            <div className="w-12 h-12 rounded-2xl bg-[#173D28] text-[#C4E89A] border-2 border-[#20251F] shadow-[3px_3px_0px_#0B2418] flex items-center justify-center text-2xl mb-4">
              🌱
            </div>
            <h3 className="font-heading text-xl font-extrabold text-[#0B2418] mb-2">
              Understand Your Impact
            </h3>
            <p className="text-sm text-[#173D28] font-medium leading-relaxed">
              "See how your daily habits affect the planet in clear, easy-to-digest metrics."
            </p>
          </div>

          {/* Card 2 */}
          <div className="sketch-card p-6 bg-[#173D28] text-[#FFF8E8] border-[#C4E89A]">
            <div className="w-12 h-12 rounded-2xl bg-[#C4E89A] text-[#0B2418] border-2 border-[#20251F] shadow-[3px_3px_0px_#0B2418] flex items-center justify-center text-2xl mb-4">
              💳
            </div>
            <h3 className="font-heading text-xl font-extrabold text-[#C4E89A] mb-2">
              Track Your Carbon Budget
            </h3>
            <p className="text-sm text-[#FFF8E8]/90 font-medium leading-relaxed">
              "Manage your estimated emissions like money. Set monthly allowances and spend wisely."
            </p>
          </div>

          {/* Card 3 */}
          <div className="sketch-card p-6 bg-[#F6EFE0]">
            <div className="w-12 h-12 rounded-2xl bg-[#A7C98F] text-[#0B2418] border-2 border-[#20251F] shadow-[3px_3px_0px_#0B2418] flex items-center justify-center text-2xl mb-4">
              🤖
            </div>
            <h3 className="font-heading text-xl font-extrabold text-[#0B2418] mb-2">
              Get Personal AI Advice
            </h3>
            <p className="text-sm text-[#173D28] font-medium leading-relaxed">
              "Discover realistic, personalized ways to reduce your footprint without dramatic sacrifices."
            </p>
          </div>

        </div>
      </section>

      {/* Why Section */}
      <section id="why-section" className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div className="sketch-card bg-[#FFF8E8] p-8 lg:p-12 border-3 border-[#20251F] shadow-[8px_8px_0px_#0B2418] relative overflow-hidden">
          
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="inline-block bg-[#C4E89A] border-2 border-[#20251F] px-4 py-1 rounded-full text-xs font-black text-[#0B2418] shadow-[2px_2px_0px_#0B2418]">
              The Core Problem
            </span>

            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#0B2418]">
              Why does carbon need a wallet?
            </h2>

            <p className="text-base sm:text-lg text-[#173D28] font-medium leading-relaxed">
              We all understand money. When we spend \$50 on dinner, we know exactly what is left in our bank account.
            </p>

            <div className="p-6 bg-[#F6EFE0] rounded-2xl border-2 border-[#20251F] text-left space-y-4 shadow-[4px_4px_0px_#0B2418]">
              <p className="text-sm text-[#20251F] font-semibold leading-relaxed">
                <strong>The Carbon Mystery:</strong> Carbon emissions are invisible. When you drive 20 km, buy a beef burger, or leave your AC running, you create carbon emissions — but there's no receipt, no balance check, and no budget limit.
              </p>
              <div className="flex items-center gap-3 pt-2 border-t-2 border-[#20251F]/20">
                <span className="text-2xl">💡</span>
                <p className="text-xs font-bold text-[#0B2418]">
                  <strong>Our Solution:</strong> Carbon Wallet AI turns invisible greenhouse gas metrics into standard financial units. You receive a monthly allowance of 100 kg CO₂e, and every action deducts carbon dollars from your wallet.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onStartJourney}
                className="sketch-button-accent px-8 py-4 rounded-2xl font-black text-sm inline-flex items-center gap-2 shadow-[5px_5px_0px_#0B2418]"
              >
                <span>Launch Demo Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#173D28] text-[#FFF8E8] border-t-3 border-[#20251F] py-12 px-4 lg:px-8 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🌍</span>
            <div>
              <h3 className="font-heading font-extrabold text-xl text-[#C4E89A]">
                CARBON WALLET AI
              </h3>
              <p className="text-xs font-handwritten text-[#FFF8E8]/80">
                "Make carbon as easy to understand as money."
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-extrabold text-[#C4E89A]">
            <a href="#why-section" className="hover:underline">About</a>
            <a href="#why-section" className="hover:underline">Features</a>
            <span className="hover:underline cursor-pointer" onClick={() => alert("Privacy First: All MVP data stays in your browser local storage.")}>Privacy</span>
            <span className="hover:underline cursor-pointer" onClick={() => alert("Created for Green Hackathon Presentation.")}>Contact</span>
          </div>

          <p className="text-xs font-medium text-[#FFF8E8]/70">
            © 2026 Carbon Wallet AI • Hackathon Edition
          </p>
        </div>
      </footer>

    </div>
  );
}
