import React, { useState } from "react";
import { User, MapPin, Key, RefreshCw, Save, ShieldCheck, CheckCircle2 } from "lucide-react";
import { LeafDecoration } from "../components/HandDrawnDoodles";

export default function SettingsPage({
  user,
  budget,
  onUpdateUser,
  onUpdateBudget,
  onResetData
}) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [city, setCity] = useState(user.city);
  const [limit, setLimit] = useState(budget.monthlyLimitKg);
  const [apiKey, setApiKey] = useState("");
  const [savedStatus, setSavedStatus] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    onUpdateUser({ name, email, city });
    onUpdateBudget({ ...budget, monthlyLimitKg: parseFloat(limit) || 100 });
    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 2500);
  };

  return (
    <div className="space-y-8 p-4 lg:p-8 max-w-4xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-[#F6EFE0] p-6 rounded-3xl border-3 border-[#20251F] shadow-[6px_6px_0px_#0B2418] relative overflow-hidden">
        <LeafDecoration className="absolute -top-3 -right-3 w-16 h-16 text-[#A7C98F]/40" />
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-2xl lg:text-3xl font-extrabold text-[#0B2418]">
              Account Settings ⚙️
            </h1>
            <p className="text-sm font-medium text-[#173D28]">
              Manage your personal profile, carbon budget goal, and app options.
            </p>
          </div>
        </div>
      </div>

      {savedStatus && (
        <div className="p-3 bg-[#C4E89A] border-2 border-[#20251F] text-[#0B2418] text-xs font-black rounded-xl flex items-center gap-2 shadow-[3px_3px_0px_#0B2418]">
          <CheckCircle2 className="w-4 h-4 text-[#173D28]" />
          <span>Settings saved successfully!</span>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSaveProfile} className="space-y-6">
        
        {/* Profile Card */}
        <div className="sketch-card bg-[#FFF8E8] p-6 space-y-4">
          <h3 className="font-heading text-lg font-extrabold text-[#0B2418]">
            👤 Profile & Location
          </h3>

          <div className="grid md:grid-cols-2 gap-4 text-xs font-bold">
            <div>
              <label className="block text-[#0B2418] mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#F6EFE0] border-2 border-[#20251F] rounded-xl px-3 py-2 text-[#0B2418] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[#0B2418] mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#F6EFE0] border-2 border-[#20251F] rounded-xl px-3 py-2 text-[#0B2418] focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-[#0B2418] mb-1">City / Region</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-[#F6EFE0] border-2 border-[#20251F] rounded-xl px-3 py-2 text-[#0B2418] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Carbon Target Card */}
        <div className="sketch-card bg-[#FFF8E8] p-6 space-y-4">
          <h3 className="font-heading text-lg font-extrabold text-[#0B2418]">
            💳 Monthly Carbon Target Goal
          </h3>

          <div className="space-y-2 text-xs font-bold">
            <label className="block text-[#0B2418]">
              Monthly Limit (kg CO₂e)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
                className="w-48 bg-[#F6EFE0] border-2 border-[#20251F] rounded-xl px-3 py-2 text-[#0B2418] font-extrabold focus:outline-none"
              />
              <span className="text-xs font-medium text-[#173D28]">
                Recommended for Paris 1.5°C Alignment: <strong>100 kg CO₂e / mo</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Optional AI Key Config */}
        <div className="sketch-card bg-[#F6EFE0] p-6 space-y-4 border-2 border-[#173D28]">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-lg font-extrabold text-[#0B2418] flex items-center gap-2">
              <Key className="w-5 h-5 text-[#173D28]" />
              AI API Configuration (Optional)
            </h3>
            <span className="text-[10px] font-bold bg-[#C4E89A] text-[#0B2418] px-2 py-0.5 rounded-md">
              Developer Mode
            </span>
          </div>

          <p className="text-xs text-[#173D28] font-medium leading-relaxed">
            By default, Carbon Wallet AI uses built-in smart mock calculation engines. You can paste an OpenAI / Gemini API key below to enable real live AI model inference.
          </p>

          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-..."
            className="w-full bg-[#FFF8E8] border-2 border-[#20251F] rounded-xl px-3 py-2 text-xs font-bold text-[#0B2418] focus:outline-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between pt-4">
          <button
            type="button"
            onClick={() => {
              if (confirm("Reset local storage data?")) {
                onResetData();
              }
            }}
            className="sketch-button bg-[#FFF8E8] text-red-700 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset Wallet Data</span>
          </button>

          <button
            type="submit"
            className="sketch-button-accent px-6 py-3 rounded-xl text-xs font-black flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </div>

      </form>

    </div>
  );
}
