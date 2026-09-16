import React, { useState } from "react";
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
import { LeafDecoration } from "./HandDrawnDoodles";

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
    <header className="sticky top-0 z-40 bg-[#FFF8E8]/95 backdrop-blur-md border-b-2 border-[#20251F] px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Logo */}
        <button
          onClick={() => setActiveTab(isLoggedIn ? "dashboard" : "landing")}
          className="flex items-center gap-3 group text-left focus:outline-none"
        >
          <div className="w-11 h-11 rounded-2xl bg-[#173D28] text-[#C4E89A] border-2 border-[#20251F] shadow-[3px_3px_0px_#0B2418] flex items-center justify-center font-bold text-xl group-hover:rotate-6 transition-transform">
            🌍
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-heading text-lg lg:text-xl font-extrabold text-[#0B2418] tracking-tight">
              <span>CARBON WALLET</span>
              <span className="bg-[#C4E89A] px-2 py-0.5 rounded-lg border-1.5 border-[#20251F] text-xs font-black shadow-[1.5px_1.5px_0px_#0B2418]">
                AI
              </span>
            </div>
            <p className="hidden sm:block text-[11px] font-handwritten text-[#173D28] font-bold tracking-wide -mt-1">
              "Make carbon as easy to understand as money."
            </p>
          </div>
        </button>

        {/* Desktop Quick Nav */}
        <nav className="hidden xl:flex items-center gap-1 bg-[#F6EFE0] p-1.5 rounded-2xl border-2 border-[#20251F] shadow-[3px_3px_0px_#0B2418]">
          {isLoggedIn ? (
            NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all relative ${
                    isActive
                      ? "bg-[#173D28] text-[#FFF8E8] shadow-[2px_2px_0px_#0B2418]"
                      : "text-[#20251F] hover:bg-[#A7C98F]/30"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#C4E89A]" : "text-[#173D28]"}`} />
                  <span>{item.label}</span>
                  {item.badge && !isActive && (
                    <span className="text-[10px] bg-[#C4E89A] text-[#0B2418] px-1.5 py-0.5 rounded-md font-extrabold border border-[#20251F]">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })
          ) : (
            <div className="flex items-center gap-2 px-2">
              <button
                onClick={() => setActiveTab("landing")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                  activeTab === "landing" ? "bg-[#173D28] text-[#FFF8E8]" : "text-[#20251F]"
                }`}
              >
                Home
              </button>
            </div>
          )}
        </nav>

        {/* Right side user pill & Auth controls */}
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <>
              {/* Eco Points Pill */}
              <button
                onClick={() => setActiveTab("journey")}
                className="sketch-button flex items-center gap-2 bg-[#C4E89A] px-3 py-1.5 rounded-xl text-xs font-bold text-[#0B2418]"
                title="View Eco Journey"
              >
                <Coins className="w-4 h-4 text-[#173D28]" />
                <span>{points} EcoPts</span>
              </button>

              {/* User Dropdown / Avatar */}
              <div className="flex items-center gap-2 bg-[#F6EFE0] pl-2 pr-3 py-1 rounded-2xl border-2 border-[#20251F]">
                <div className="w-7 h-7 rounded-full bg-[#173D28] text-[#C4E89A] flex items-center justify-center text-xs font-bold border border-[#20251F]">
                  🌱
                </div>
                <span className="hidden md:inline text-xs font-extrabold text-[#0B2418]">
                  {user.name.split(" ")[0]}
                </span>
                <button
                  onClick={onLogout}
                  className="p-1 text-[#173D28] hover:text-red-700 hover:scale-110 transition-transform"
                  title="Log out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={onNavigateAuth}
                className="sketch-button bg-[#F6EFE0] px-4 py-2 rounded-xl text-xs font-extrabold text-[#20251F]"
              >
                Log In
              </button>
              <button
                onClick={onNavigateAuth}
                className="sketch-button-accent px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5"
              >
                <span>Get Started</span>
                <Leaf className="w-3.5 h-3.5 fill-[#0B2418]" />
              </button>
            </div>
          )}

          {/* Mobile hamburger button */}
          {isLoggedIn && (
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="xl:hidden p-2 rounded-xl bg-[#F6EFE0] border-2 border-[#20251F] text-[#0B2418]"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && isLoggedIn && (
        <div className="xl:hidden mt-3 pt-3 border-t-2 border-[#20251F] grid grid-cols-2 gap-2 animate-in fade-in slide-in-from-top-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileOpen(false);
                }}
                className={`flex items-center gap-2.5 px-3.5 py-3 rounded-xl text-xs font-bold border-2 border-[#20251F] ${
                  isActive
                    ? "bg-[#173D28] text-[#FFF8E8] shadow-[3px_3px_0px_#0B2418]"
                    : "bg-[#F6EFE0] text-[#20251F]"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-[#C4E89A]" : "text-[#173D28]"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
