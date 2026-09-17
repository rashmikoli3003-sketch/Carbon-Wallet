import React from "react";
import { motion } from "framer-motion";
import { Award, Flame, CheckCircle, Lock, Trophy, Sparkles, Coins, Plus } from "lucide-react";
import confetti from "canvas-confetti";
import { ECO_CHALLENGES, ECO_BADGES } from "../data/mockData";
import { LeafDecoration, StarDoodle } from "../components/HandDrawnDoodles";

export default function EcoJourneyPage({ points, streak, onAddPoints }) {
  const [challenges, setChallenges] = React.useState(ECO_CHALLENGES);

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#C4E89A", "#173D28", "#A7C98F", "#FFF8E8"],
    });
  };

  const handleToggleChallenge = (id, pts) => {
    setChallenges((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const updated = !c.completed;
          if (updated) {
            onAddPoints(pts);
            triggerConfetti();
          }
          return { ...c, completed: updated };
        }
        return c;
      })
    );
  };

  const level = Math.floor(points / 50) + 1;
  const progressToNextLevel = (points % 50) * 2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-8 p-4 lg:p-8 max-w-7xl mx-auto"
    >
      
      {/* Header Banner */}
      <div className="bg-[#173D28] text-[#FFF8E8] p-6 lg:p-8 rounded-3xl border-3 border-[#20251F] shadow-[8px_8px_0px_#0B2418] relative overflow-hidden">
        <LeafDecoration className="absolute -top-3 -right-3 w-20 h-20 text-[#C4E89A]/20" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl animate-bounce">🏆</span>
              <h1 className="font-heading text-2xl lg:text-3xl font-extrabold text-[#C4E89A]">
                Your Eco Journey 🌱
              </h1>
            </div>
            <p className="text-sm font-medium text-[#FFF8E8]/90">
              Earn Eco Points by logging low-carbon choices and completing weekly sustainability challenges.
            </p>
          </div>

          {/* Level & Streak Pill Cards */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Streak Counter */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="sketch-card bg-[#FFF8E8] text-[#0B2418] p-3.5 rounded-2xl flex items-center gap-2 border-2 border-[#20251F]"
            >
              <Flame className="w-6 h-6 text-amber-600 fill-amber-500 animate-bounce" />
              <div>
                <p className="text-[10px] font-black uppercase text-[#173D28]">Daily Streak</p>
                <p className="font-heading text-lg font-extrabold">{streak} Days 🔥</p>
              </div>
            </motion.div>

            {/* Total Eco Points */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="sketch-card bg-[#C4E89A] text-[#0B2418] p-3.5 rounded-2xl flex items-center gap-2 border-2 border-[#20251F]"
            >
              <Coins className="w-6 h-6 text-[#173D28]" />
              <div>
                <p className="text-[10px] font-black uppercase text-[#0B2418]">Total Balance</p>
                <p className="font-heading text-lg font-extrabold">{points} EcoPts</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Level Progress Bar */}
        <div className="mt-6 pt-4 border-t border-[#C4E89A]/20 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-[#C4E89A]">
            <span>Level {level}: Carbon Guardian 🛡️</span>
            <span>{points % 50} / 50 Pts to Level {level + 1}</span>
          </div>
          <div className="w-full h-4 rounded-full bg-[#0B2418] border-2 border-[#C4E89A] p-0.5 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressToNextLevel}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full rounded-full bg-[#C4E89A]"
            />
          </div>
        </div>
      </div>

      {/* Quick Points Log Options */}
      <div className="sketch-card bg-[#FFF8E8] p-6">
        <h3 className="font-heading text-lg font-extrabold text-[#0B2418] mb-3 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#173D28]" />
          Quick Eco Point Activities
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              onAddPoints(20);
              triggerConfetti();
            }}
            className="sketch-button bg-[#F6EFE0] p-4 rounded-2xl text-left border-2 border-[#20251F] hover:bg-[#C4E89A]/40"
          >
            <span className="text-2xl">🚲</span>
            <p className="font-heading text-xs font-extrabold text-[#0B2418] mt-2">Log Cycling Trip</p>
            <span className="text-xs font-black text-emerald-800">+20 EcoPts</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              onAddPoints(10);
              triggerConfetti();
            }}
            className="sketch-button bg-[#F6EFE0] p-4 rounded-2xl text-left border-2 border-[#20251F] hover:bg-[#C4E89A]/40"
          >
            <span className="text-2xl">🚌</span>
            <p className="font-heading text-xs font-extrabold text-[#0B2418] mt-2">Log Public Transit</p>
            <span className="text-xs font-black text-emerald-800">+10 EcoPts</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              onAddPoints(15);
              triggerConfetti();
            }}
            className="sketch-button bg-[#F6EFE0] p-4 rounded-2xl text-left border-2 border-[#20251F] hover:bg-[#C4E89A]/40"
          >
            <span className="text-2xl">🥗</span>
            <p className="font-heading text-xs font-extrabold text-[#0B2418] mt-2">Log Plant Meal</p>
            <span className="text-xs font-black text-emerald-800">+15 EcoPts</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              onAddPoints(10);
              triggerConfetti();
            }}
            className="sketch-button bg-[#F6EFE0] p-4 rounded-2xl text-left border-2 border-[#20251F] hover:bg-[#C4E89A]/40"
          >
            <span className="text-2xl">♻️</span>
            <p className="font-heading text-xs font-extrabold text-[#0B2418] mt-2">Recycling Challenge</p>
            <span className="text-xs font-black text-emerald-800">+10 EcoPts</span>
          </motion.button>
        </div>
      </div>

      {/* Weekly Challenges & Badges Grid */}
      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* Weekly Challenges */}
        <div className="lg:col-span-7 sketch-card bg-[#F6EFE0] p-6">
          <h3 className="font-heading text-lg font-extrabold text-[#0B2418] mb-1">
            🎯 Weekly Sustainability Challenges
          </h3>
          <p className="text-xs text-[#173D28] font-medium mb-4">Complete targets to earn bonus points.</p>

          <div className="space-y-3">
            {challenges.map((ch) => (
              <motion.div
                key={ch.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleToggleChallenge(ch.id, ch.points)}
                className={`p-4 rounded-2xl border-2 border-[#20251F] flex items-center justify-between cursor-pointer transition-all ${
                  ch.completed
                    ? "bg-[#C4E89A] text-[#0B2418] shadow-[2.5px_2.5px_0px_#0B2418]"
                    : "bg-[#FFF8E8] text-[#20251F] shadow-[2.5px_2.5px_0px_#0B2418]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{ch.icon}</span>
                  <div>
                    <h4 className="font-heading font-extrabold text-xs">
                      {ch.title}
                    </h4>
                    <p className="text-[11px] font-medium opacity-80">
                      {ch.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-black bg-[#173D28] text-[#FFF8E8] px-2.5 py-1 rounded-lg border border-[#20251F]">
                    +{ch.points} Pts
                  </span>
                  <div
                    className={`w-6 h-6 rounded-lg border-2 border-[#20251F] flex items-center justify-center ${
                      ch.completed ? "bg-[#173D28] text-[#C4E89A]" : "bg-white"
                    }`}
                  >
                    {ch.completed && <CheckCircle className="w-4 h-4" />}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Badges Showcase */}
        <div className="lg:col-span-5 sketch-card bg-[#FFF8E8] p-6">
          <h3 className="font-heading text-lg font-extrabold text-[#0B2418] mb-1">
            🏅 Achievement Badges
          </h3>
          <p className="text-xs text-[#173D28] font-medium mb-4">Milestone badges earned on your journey.</p>

          <div className="grid grid-cols-2 gap-3">
            {ECO_BADGES.map((badge) => (
              <motion.div
                key={badge.id}
                whileHover={badge.unlocked ? { scale: 1.06, rotate: 2 } : { scale: 1.02 }}
                className={`p-3 rounded-2xl border-2 border-[#20251F] text-center flex flex-col items-center justify-between ${
                  badge.unlocked
                    ? "bg-[#F6EFE0] shadow-[3px_3px_0px_#0B2418]"
                    : "bg-[#F6EFE0]/40 opacity-60 border-dashed"
                }`}
              >
                <div className="text-3xl mb-1 relative">
                  {badge.icon}
                  {!badge.unlocked && (
                    <Lock className="w-4 h-4 text-gray-700 absolute -bottom-1 -right-1" />
                  )}
                </div>
                <h4 className="font-heading font-extrabold text-xs text-[#0B2418]">
                  {badge.title}
                </h4>
                <p className="text-[10px] text-[#173D28] font-medium mt-1">
                  {badge.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

    </motion.div>
  );
}

