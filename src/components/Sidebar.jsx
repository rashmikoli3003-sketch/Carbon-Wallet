import React from "react";
import { NAV_ITEMS } from "./Navbar";
import { LogOut, Leaf, ShieldAlert } from "lucide-react";
import { LeafDecoration, StarDoodle } from "./HandDrawnDoodles";

export default function Sidebar({ activeTab, setActiveTab, user, onLogout }) {
  return (
    <aside className="hidden xl:flex flex-col w-64 bg-[#F6EFE0] border-r-2 border-[#20251F] p-4 min-h-[calc(100vh-65px)] justify-between select-none shrink-0">
      <div className="space-y-6">
        {/* User Card */}
        <div className="sketch-card p-3.5 bg-[#FFF8E8] flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#173D28] text-[#C4E89A] border-2 border-[#20251F] flex items-center justify-center font-bold text-lg shadow-[2px_2px_0px_#0B2418]">
            🌱
          </div>
          <div className="overflow-hidden">
            <h4 className="font-heading font-extrabold text-sm text-[#0B2418] truncate">
              {user.name}
            </h4>
            <p className="text-[11px] font-handwritten font-bold text-[#173D28] truncate">
              📍 {user.city}
            </p>
          </div>
        </div>

        {/* Navigation list */}
        <div className="space-y-1.5">
          <p className="px-3 text-[11px] font-black uppercase text-[#173D28]/70 tracking-wider">
            Navigation
          </p>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-extrabold border-2 transition-all relative ${
                  isActive
                    ? "bg-[#173D28] text-[#FFF8E8] border-[#20251F] shadow-[3px_3px_0px_#0B2418] translate-x-1"
                    : "bg-transparent text-[#20251F] border-transparent hover:border-[#20251F] hover:bg-[#A7C98F]/20"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 ${isActive ? "text-[#C4E89A]" : "text-[#173D28]"}`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-lg border border-[#20251F] font-black ${
                      isActive
                        ? "bg-[#C4E89A] text-[#0B2418]"
                        : "bg-[#FFF8E8] text-[#173D28]"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Banner & Logout */}
      <div className="space-y-3 pt-4 border-t-2 border-[#20251F]/20">
        <div className="p-3 bg-[#173D28] text-[#FFF8E8] rounded-2xl border-2 border-[#20251F] shadow-[3px_3px_0px_#0B2418] relative overflow-hidden">
          <LeafDecoration className="absolute -bottom-2 -right-2 w-12 h-12 text-[#C4E89A]/30" />
          <div className="flex items-center gap-1 text-[11px] font-bold text-[#C4E89A]">
            <StarDoodle className="w-3.5 h-3.5" />
            <span>Hackathon MVP</span>
          </div>
          <p className="text-xs font-medium text-[#FFF8E8]/90 mt-1">
            Track daily carbon just like a bank balance.
          </p>
        </div>

        <button
          onClick={onLogout}
          className="w-full sketch-button flex items-center justify-center gap-2 bg-[#FFF8E8] text-red-700 py-2.5 rounded-xl text-xs font-bold"
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
}
