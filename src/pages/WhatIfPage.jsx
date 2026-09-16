import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, RefreshCw, TreePine, Car, Lightbulb, ShieldCheck, Flame, Globe } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { WHAT_IF_DEFAULT_HABITS } from "../data/mockData";
import { calculateRealTimeWhatIf } from "../services/carbonApi";
import {
  LeafDecoration,
  SketchyArrow,
  UnderlineScribble,
  StarDoodle
} from "../components/HandDrawnDoodles";

export default function WhatIfPage() {
  const [current, setCurrent] = useState(WHAT_IF_DEFAULT_HABITS);

  const [proposed, setProposed] = useState({
    carDaysPerWeek: 2,
    meatMealsPerWeek: 1,
    electricityKwHPerDay: 8,
    flightsPerYear: 1,
    fastFashionItemsPerMonth: 1,
  });

  const currentCalc = calculateRealTimeWhatIf(current);
  const proposedCalc = calculateRealTimeWhatIf(proposed);

  const annualSavingsKg = Math.max(0, currentCalc.totalAnnualKg - proposedCalc.totalAnnualKg);
  const percentageSavings = Math.round((annualSavingsKg / currentCalc.totalAnnualKg) * 100) || 0;
  const treesEquivalent = Math.round(annualSavingsKg / 22);

  const chartData = [
    { name: "Car Travel", Current: currentCalc.carAnnual, Proposed: proposedCalc.carAnnual },
    { name: "Diet/Meals", Current: currentCalc.meatAnnual, Proposed: proposedCalc.meatAnnual },
    { name: "Electricity", Current: currentCalc.electricityAnnual, Proposed: proposedCalc.electricityAnnual },
    { name: "Flights", Current: currentCalc.flightsAnnual, Proposed: proposedCalc.flightsAnnual },
    { name: "Shopping", Current: currentCalc.fashionAnnual, Proposed: proposedCalc.fashionAnnual },
  ];

  const handleResetScenario = () => {
    setProposed({
      carDaysPerWeek: 1,
      meatMealsPerWeek: 1,
      electricityKwHPerDay: 6,
      flightsPerYear: 0,
      fastFashionItemsPerMonth: 1,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-8 p-4 lg:p-8 max-w-7xl mx-auto"
    >
      
      {/* Header Banner */}
      <div className="bg-[#173D28] text-[#FFF8E8] p-6 lg:p-8 rounded-3xl border-3 border-[#20251F] shadow-[8px_8px_0px_#0B2418] relative overflow-hidden grid lg:grid-cols-12 gap-6 items-center">
        <LeafDecoration className="absolute -top-3 -right-3 w-24 h-24 text-[#C4E89A]/20" />
        
        <div className="lg:col-span-8 space-y-2">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl animate-spin [animation-duration:8s]">🔮</span>
            <h1 className="font-heading text-2xl lg:text-3xl font-extrabold text-[#C4E89A]">
              What If? Mode
            </h1>
            <span className="bg-[#C4E89A] text-[#0B2418] text-[10px] font-black px-2.5 py-0.5 rounded-full border border-[#20251F] flex items-center gap-1">
              <Globe className="w-3 h-3 animate-pulse" />
              DEFRA 2026 FACTORS
            </span>
          </div>
          <p className="text-sm font-medium text-[#FFF8E8]/90 max-w-2xl">
            Experiment with your habits and calculate how your annual carbon emissions change in real time using verified EPA & DEFRA lifecycle factors.
          </p>

          <button
            onClick={handleResetScenario}
            className="sketch-button-accent px-4 py-2.5 rounded-2xl text-xs font-black flex items-center gap-2 mt-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Another Scenario →</span>
          </button>
        </div>

        {/* Hand-Drawn Feature Artwork */}
        <div className="lg:col-span-4 hidden lg:block">
          <motion.div
            whileHover={{ scale: 1.03, rotate: 1 }}
            className="relative rounded-2xl border-2 border-[#C4E89A] overflow-hidden shadow-[4px_4px_0px_#0B2418] bg-[#FFF8E8]"
          >
            <img
              src="/whatif_sketch.jpg"
              alt="What If Climate Choice Art"
              className="w-full h-44 object-cover"
            />
          </motion.div>
        </div>
      </div>

      {/* Side-By-Side Comparison Panels */}
      <div className="grid lg:grid-cols-12 gap-6 items-stretch relative">
        
        {/* LEFT PANEL: Current Habits */}
        <motion.div
          whileHover={{ y: -2 }}
          className="lg:col-span-5 sketch-card bg-[#F6EFE0] p-6 space-y-5"
        >
          <div className="flex items-center justify-between border-b-2 border-[#20251F]/20 pb-3">
            <div>
              <span className="text-[10px] font-black uppercase text-[#173D28] tracking-wider">
                BASELINE
              </span>
              <h3 className="font-heading text-lg font-extrabold text-[#0B2418]">
                YOUR CURRENT HABITS
              </h3>
            </div>
            <span className="text-xl">🚗</span>
          </div>

          <div className="space-y-4 text-xs font-bold text-[#0B2418]">
            {/* Car travel */}
            <div>
              <div className="flex justify-between mb-1">
                <span>🚗 Car travel per week:</span>
                <span className="text-[#173D28]">{current.carDaysPerWeek} days/wk</span>
              </div>
              <input
                type="range"
                min="0"
                max="7"
                value={current.carDaysPerWeek}
                onChange={(e) => setCurrent({ ...current, carDaysPerWeek: parseInt(e.target.value) })}
                className="w-full accent-[#173D28] bg-[#FFF8E8] h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Meat meals */}
            <div>
              <div className="flex justify-between mb-1">
                <span>🍔 High-impact meat meals:</span>
                <span className="text-[#173D28]">{current.meatMealsPerWeek} meals/wk</span>
              </div>
              <input
                type="range"
                min="0"
                max="14"
                value={current.meatMealsPerWeek}
                onChange={(e) => setCurrent({ ...current, meatMealsPerWeek: parseInt(e.target.value) })}
                className="w-full accent-[#173D28] bg-[#FFF8E8] h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Electricity */}
            <div>
              <div className="flex justify-between mb-1">
                <span>⚡ Electricity / AC usage:</span>
                <span className="text-[#173D28]">{current.electricityKwHPerDay} kWh/day</span>
              </div>
              <input
                type="range"
                min="4"
                max="30"
                value={current.electricityKwHPerDay}
                onChange={(e) => setCurrent({ ...current, electricityKwHPerDay: parseInt(e.target.value) })}
                className="w-full accent-[#173D28] bg-[#FFF8E8] h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Flights */}
            <div>
              <div className="flex justify-between mb-1">
                <span>✈️ Flights per year:</span>
                <span className="text-[#173D28]">{current.flightsPerYear} flights/yr</span>
              </div>
              <select
                value={current.flightsPerYear}
                onChange={(e) => setCurrent({ ...current, flightsPerYear: parseInt(e.target.value) })}
                className="w-full bg-[#FFF8E8] border-2 border-[#20251F] rounded-xl px-3 py-1.5 text-xs font-bold focus:outline-none"
              >
                <option value="0">0 Flights / year</option>
                <option value="1">1 Flight / year</option>
                <option value="2">2 Flights / year</option>
                <option value="4">4 Flights / year</option>
              </select>
            </div>
          </div>

          {/* Current Total Box */}
          <div className="p-4 bg-[#FFF8E8] rounded-2xl border-2 border-[#20251F] text-center shadow-[3px_3px_0px_#0B2418]">
            <p className="text-[11px] font-bold text-[#173D28]">Calculated Baseline Annual Footprint</p>
            <motion.p
              key={currentCalc.totalAnnualKg}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              className="font-heading text-3xl font-extrabold text-[#0B2418]"
            >
              {currentCalc.totalAnnualKg.toLocaleString()} <span className="text-sm">kg CO₂e / yr</span>
            </motion.p>
          </div>
        </motion.div>

        {/* MIDDLE: Hand-Drawn Arrow & Callout */}
        <div className="hidden lg:flex lg:col-span-2 flex-col items-center justify-center my-auto text-center space-y-2 z-10">
          <motion.div
            animate={{ rotate: [-4, 4, -4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="bg-[#FFF8E8] p-3 rounded-2xl border-2 border-[#20251F] shadow-[3px_3px_0px_#0B2418]"
          >
            <p className="font-handwritten text-lg font-bold text-[#173D28]">
              What if you changed? ⚡
            </p>
            <SketchyArrow className="w-16 h-12 text-[#173D28] mx-auto mt-1" />
          </motion.div>
        </div>

        {/* RIGHT PANEL: What If You Changed Them? */}
        <motion.div
          whileHover={{ y: -2 }}
          className="lg:col-span-5 sketch-card bg-[#FFF8E8] p-6 space-y-5 border-2 border-[#173D28]"
        >
          <div className="flex items-center justify-between border-b-2 border-[#20251F]/20 pb-3">
            <div>
              <span className="text-[10px] font-black uppercase text-[#173D28] tracking-wider">
                PROPOSED HABITS
              </span>
              <h3 className="font-heading text-lg font-extrabold text-[#0B2418]">
                WHAT IF YOU CHANGED THEM?
              </h3>
            </div>
            <span className="text-xl">🚌</span>
          </div>

          <div className="space-y-4 text-xs font-bold text-[#0B2418]">
            {/* Proposed Car */}
            <div>
              <div className="flex justify-between mb-1">
                <span>🚌 Public transit instead of car:</span>
                <span className="text-emerald-700">{proposed.carDaysPerWeek} days car/wk</span>
              </div>
              <input
                type="range"
                min="0"
                max="7"
                value={proposed.carDaysPerWeek}
                onChange={(e) => setProposed({ ...proposed, carDaysPerWeek: parseInt(e.target.value) })}
                className="w-full accent-[#C4E89A] bg-[#F6EFE0] h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Proposed Meals */}
            <div>
              <div className="flex justify-between mb-1">
                <span>🥗 Plant-forward lower-impact meals:</span>
                <span className="text-emerald-700">{proposed.meatMealsPerWeek} meat meals/wk</span>
              </div>
              <input
                type="range"
                min="0"
                max="14"
                value={proposed.meatMealsPerWeek}
                onChange={(e) => setProposed({ ...proposed, meatMealsPerWeek: parseInt(e.target.value) })}
                className="w-full accent-[#C4E89A] bg-[#F6EFE0] h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Proposed Electricity */}
            <div>
              <div className="flex justify-between mb-1">
                <span>⚡ Solar / Energy saving:</span>
                <span className="text-emerald-700">{proposed.electricityKwHPerDay} kWh/day</span>
              </div>
              <input
                type="range"
                min="2"
                max="30"
                value={proposed.electricityKwHPerDay}
                onChange={(e) => setProposed({ ...proposed, electricityKwHPerDay: parseInt(e.target.value) })}
                className="w-full accent-[#C4E89A] bg-[#F6EFE0] h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Proposed Flights */}
            <div>
              <div className="flex justify-between mb-1">
                <span>✈️ Optimized flights:</span>
                <span className="text-emerald-700">{proposed.flightsPerYear} flights/yr</span>
              </div>
              <select
                value={proposed.flightsPerYear}
                onChange={(e) => setProposed({ ...proposed, flightsPerYear: parseInt(e.target.value) })}
                className="w-full bg-[#F6EFE0] border-2 border-[#20251F] rounded-xl px-3 py-1.5 text-xs font-bold focus:outline-none"
              >
                <option value="0">0 Flights / year</option>
                <option value="1">1 Flight / year</option>
                <option value="2">2 Flights / year</option>
              </select>
            </div>
          </div>

          {/* Proposed Total Box */}
          <div className="p-4 bg-[#C4E89A] rounded-2xl border-2 border-[#20251F] text-center shadow-[3px_3px_0px_#0B2418]">
            <p className="text-[11px] font-black uppercase text-[#0B2418]">Projected Annual Footprint</p>
            <motion.p
              key={proposedCalc.totalAnnualKg}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              className="font-heading text-3xl font-extrabold text-[#0B2418]"
            >
              {proposedCalc.totalAnnualKg.toLocaleString()} <span className="text-sm">kg CO₂e / yr</span>
            </motion.p>
          </div>
        </motion.div>

      </div>

      {/* Encouraging Impact Result Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="sketch-card bg-[#173D28] text-[#FFF8E8] p-6 lg:p-8 border-[#C4E89A] flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-[#C4E89A] text-[#0B2418] px-3 py-1 rounded-full text-xs font-black shadow-[2px_2px_0px_#0B2418]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>VERIFIED ANNUAL CARBON SAVINGS</span>
          </div>

          <h2 className="font-heading text-2xl lg:text-3xl font-extrabold text-[#C4E89A]">
            Your annual footprint decreases by ~{annualSavingsKg.toLocaleString()} kg CO₂e!
          </h2>

          <p className="text-sm text-[#FFF8E8]/90 font-medium">
            That's a <strong>{percentageSavings}% reduction</strong> in personal emissions.
          </p>
        </div>

        {/* Tree equivalent pill */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-[#0B2418] p-4 rounded-2xl border-2 border-[#C4E89A] text-center shrink-0 min-w-[220px] shadow-[4px_4px_0px_#0B2418]"
        >
          <TreePine className="w-8 h-8 text-[#C4E89A] mx-auto mb-1 animate-pulse" />
          <p className="text-xs text-[#A7C98F] font-bold">Climate Impact Equivalent</p>
          <p className="font-heading text-xl font-extrabold text-[#C4E89A]">
            🌳 {treesEquivalent} Trees Planted
          </p>
        </motion.div>
      </motion.div>

      {/* Comparison Chart */}
      <div className="sketch-card bg-[#FFF8E8] p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-heading text-lg font-extrabold text-[#0B2418]">
              Category Breakdown: Baseline vs What-If Scenario
            </h3>
            <p className="text-xs text-[#173D28] font-medium">Calculated using DEFRA 2026 factors (kg CO₂e)</p>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#20251F" opacity={0.15} />
              <XAxis dataKey="name" stroke="#0B2418" fontSize={11} fontWeight="bold" />
              <YAxis stroke="#0B2418" fontSize={11} fontWeight="bold" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#FFF8E8",
                  borderRadius: "12px",
                  border: "2px solid #20251F",
                  fontWeight: "bold",
                }}
              />
              <Bar dataKey="Current" fill="#20251F" stroke="#20251F" radius={[6, 6, 0, 0]} />
              <Bar dataKey="Proposed" fill="#C4E89A" stroke="#20251F" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </motion.div>
  );
}
