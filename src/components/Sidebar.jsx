import React from "react";
import { motion } from "framer-motion";
import { NAV_ITEMS } from "./Navbar";
import { LogOut, Leaf, ShieldAlert, Sparkles } from "lucide-react";

export default function Sidebar({ activeTab, setActiveTab, user, onLogout }) {
  return (
    <aside className="hidden xl:flex flex-col w-64 bg-[#07110B] border-r border-[#8EBB91]/15 p-4 min-h-[calc(100vh-65px)] justify-between select-none shrink-0 text-[#F4F2E8]">
      <div className="space-y-6">
        {/* User Card */}
        <motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          className="editorial-card p-3.5 bg-[#0D2116]/80 border-[#8EBB91]/30 flex items-center gap-3 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-2xl bg-[#B8F56B] text-[#07110B] flex items-center justify-center font-bold text-lg glow-lime-sm">
            🌱
          </div>
          <div className="overflow-hidden">
            <h4 className="font-heading font-bold text-sm text-[#F4F2E8] truncate">
              {user.name}
            </h4>
            <p className="text-[11px] font-mono text-[#8EBB91] truncate">
              📍 {user.city}
            </p>
          </div>
        </motion.div>

        {/* Navigation list */}
        <div className="space-y-1.5">
          <p className="px-3 text-[10px] font-mono font-bold uppercase text-[#8EBB91] tracking-widest">
            NAVIGATION
          </p>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.02, x: isActive ? 4 : 2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-mono font-bold border transition-colors relative ${
                  isActive
                    ? "bg-[#B8F56B] text-[#07110B] border-[#B8F56B] shadow-md"
                    : "bg-transparent text-[#8EBB91] border-transparent hover:text-[#F4F2E8] hover:bg-[#0D2116]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 ${isActive ? "text-[#07110B]" : "text-[#8EBB91]"}`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <motion.span
                    animate={isActive ? { scale: [1, 1.08, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className={`text-[9px] px-2 py-0.5 rounded border font-mono font-bold ${
                      isActive
                        ? "bg-[#07110B] text-[#B8F56B] border-[#07110B]"
                        : "bg-[#0D2116] text-[#B8F56B] border-[#B8F56B]/30"
                    }`}
                  >
                    {item.badge}
                  </motion.span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Footer Banner & Logout */}
      <div className="space-y-3 pt-4 border-t border-[#8EBB91]/15">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-3.5 rounded-2xl bg-[#0D2116] border border-[#8EBB91]/30 relative overflow-hidden"
        >
          <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#B8F56B]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CLIMATE PROTOTYPE</span>
          </div>
          <p className="text-xs text-[#8EBB91] mt-1 font-medium">
            Track daily carbon just like a bank balance.
          </p>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          onClick={onLogout}
          className="w-full py-2.5 rounded-xl bg-[#0D2116] border border-red-500/30 text-red-400 text-xs font-mono font-bold flex items-center justify-center gap-2 hover:bg-red-950/40 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>LOG OUT</span>
        </motion.button>
      </div>
    </aside>
  );
}
