import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  PieChart,
  Scan,
  Sparkles,
  MessageSquare,
  Award,
  Settings,
  LogOut,
  User,
  Menu,
  X,
  Leaf,
  Coins
} from "lucide-react";

export const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "my-carbon", label: "My Carbon", icon: PieChart },
  { id: "scanner", label: "Scan Impact", icon: Scan, badge: "📸 AI" },
  { id: "what-if", label: "What-If Mode", icon: Sparkles, badge: "🔮 Main" },
  { id: "ecoai", label: "EcoAI Chat", icon: MessageSquare, badge: "🌿 Assistant" },
  { id: "journey", label: "Eco Journey", icon: Award, badge: "🌱 Points" },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function Navbar({
  activeTab,
  setActiveTab,
  user,
  points,
  onLogout,
  onNavigateAuth,
  isLoggedIn
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#07110B]/90 backdrop-blur-md border-b border-[#8EBB91]/15 px-4 lg:px-8 py-3.5 transition-all text-[#F4F2E8]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Logo */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setActiveTab(isLoggedIn ? "dashboard" : "landing")}
          className="flex items-center gap-3 group text-left focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-[#0D2116] border border-[#B8F56B]/40 text-[#B8F56B] flex items-center justify-center font-bold text-lg group-hover:rotate-6 transition-transform glow-lime-sm">
            🌱
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-heading text-lg font-extrabold text-[#F4F2E8] tracking-tight">
              <span>CARBON WALLET</span>
              <span className="bg-[#B8F56B] text-[#07110B] px-2 py-0.5 rounded text-xs font-black">
                AI
              </span>
            </div>
            <p className="hidden sm:block text-[10px] font-mono text-[#8EBB91] tracking-wider uppercase -mt-0.5">
              MAKING YOUR CARBON VISIBLE
            </p>
          </div>
        </motion.button>

        {/* Desktop Quick Nav */}
        <nav className="hidden xl:flex items-center gap-1 bg-[#0D2116]/80 p-1.5 rounded-2xl border border-[#8EBB91]/20">
          {isLoggedIn ? (
            NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-colors relative ${
                    isActive
                      ? "bg-[#B8F56B] text-[#07110B] shadow-md"
                      : "text-[#8EBB91] hover:text-[#F4F2E8] hover:bg-[#8EBB91]/10"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#07110B]" : "text-[#8EBB91]"}`} />
                  <span>{item.label}</span>
                  {item.badge && !isActive && (
                    <span className="text-[9px] bg-[#07110B] text-[#B8F56B] px-1.5 py-0.5 rounded border border-[#B8F56B]/30 font-mono">
                      {item.badge}
                    </span>
                  )}
                </motion.button>
              );
            })
          ) : (
            <div className="flex items-center gap-2 px-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab("landing")}
                className={`px-4 py-1.5 rounded-xl text-xs font-mono font-bold ${
                  activeTab === "landing" ? "bg-[#B8F56B] text-[#07110B]" : "text-[#8EBB91]"
                }`}
              >
                HOME
              </motion.button>
            </div>
          )}
        </nav>

        {/* Right side user pill & Auth controls */}
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <>
              {/* Eco Points Pill */}
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => setActiveTab("journey")}
                className="flex items-center gap-2 bg-[#0D2116] border border-[#B8F56B]/40 px-3 py-1.5 rounded-xl text-xs font-mono font-bold text-[#B8F56B] glow-lime-sm"
                title="View Eco Journey"
              >
                <Coins className="w-4 h-4 text-[#B8F56B]" />
                <span>{points} EcoPts</span>
              </motion.button>

              {/* User Avatar Dropdown */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="flex items-center gap-2 bg-[#0D2116] border border-[#8EBB91]/20 pl-2 pr-3 py-1 rounded-2xl"
              >
                <div className="w-7 h-7 rounded-full bg-[#B8F56B] text-[#07110B] flex items-center justify-center text-xs font-bold">
                  🌱
                </div>
                <span className="hidden md:inline text-xs font-mono font-bold text-[#F4F2E8]">
                  {user.name.split(" ")[0]}
                </span>
                <motion.button
                  whileHover={{ scale: 1.25, rotate: 15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onLogout}
                  className="p-1 text-[#8EBB91] hover:text-red-400 transition-colors"
                  title="Log out"
                >
                  <LogOut className="w-4 h-4" />
                </motion.button>
              </motion.div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onNavigateAuth}
                className="px-4 py-2 rounded-xl text-xs font-mono font-bold text-[#8EBB91] hover:text-[#F4F2E8]"
              >
                LOG IN
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onNavigateAuth}
                className="px-4 py-2 rounded-full bg-[#B8F56B] text-[#07110B] text-xs font-mono font-bold flex items-center gap-1.5 glow-lime-sm"
              >
                <span>GET STARTED</span>
                <Leaf className="w-3.5 h-3.5 fill-[#07110B]" />
              </motion.button>
            </div>
          )}

          {/* Mobile hamburger button */}
          {isLoggedIn && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="xl:hidden p-2 rounded-xl bg-[#0D2116] border border-[#8EBB91]/30 text-[#F4F2E8]"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          )}
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileOpen && isLoggedIn && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="xl:hidden mt-3 pt-3 border-t border-[#8EBB91]/20 grid grid-cols-2 gap-2 overflow-hidden"
          >
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <motion.button
                  key={item.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileOpen(false);
                  }}
                  className={`flex items-center gap-2.5 px-3.5 py-3 rounded-xl text-xs font-mono font-bold border ${
                    isActive
                      ? "bg-[#B8F56B] text-[#07110B] border-[#B8F56B]"
                      : "bg-[#0D2116] text-[#F4F2E8] border-[#8EBB91]/20"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#07110B]" : "text-[#8EBB91]"}`} />
                  <span>{item.label}</span>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
