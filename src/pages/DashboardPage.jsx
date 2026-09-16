import React, { useState } from "react";
import {
  PieChart as PieIcon,
  BarChart3,
  TrendingDown,
  Plus,
  Trash2,
  Sparkles,
  Scan,
  AlertCircle,
  CheckCircle,
  ArrowUpRight,
  Leaf
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";
import {
  DemoBadge,
  LeafDecoration,
  UnderlineScribble,
  StarDoodle,
  CarbonCoin
} from "../components/HandDrawnDoodles";

export default function DashboardPage({
  user,
  budget,
  categories,
  activities,
  onAddActivity,
  onDeleteActivity,
  onNavigateTab
}) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Transport");
  const [newAmount, setNewAmount] = useState(2.5);

  const percentageUsed = Math.min(100, Math.round((budget.usedKg / budget.monthlyLimitKg) * 100));
  const remainingKg = Math.max(0, budget.monthlyLimitKg - budget.usedKg);

  const handleCreateActivity = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    onAddActivity({
      id: `act-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      icon: newCategory === "Transport" ? "🚗" : newCategory === "Food" ? "🍔" : newCategory === "Energy" ? "⚡" : "🛍️",
      amountKg: parseFloat(newAmount) || 1.5,
      date: "Just now",
      type: parseFloat(newAmount) > 3 ? "high" : "low",
      tip: "Logged into your Carbon Wallet budget.",
    });
    setNewTitle("");
    setShowAddModal(false);
  };

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill="#0B2418"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="font-bold text-[11px]"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="space-y-8 p-4 lg:p-8 max-w-7xl mx-auto">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#F6EFE0] p-6 rounded-3xl border-3 border-[#20251F] shadow-[6px_6px_0px_#0B2418] relative overflow-hidden">
        <LeafDecoration className="absolute -top-3 -right-3 w-16 h-16 text-[#A7C98F]/40" />
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="font-heading text-2xl lg:text-3xl font-extrabold text-[#0B2418]">
              Good morning, {user.name.split(" ")[0]} 🌱
            </h1>
            <DemoBadge />
          </div>
          <p className="text-sm font-medium text-[#173D28]">
            Small steps. Meaningful impact. Here is your personal carbon budget overview.
          </p>
        </div>

        {/* Quick Action buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigateTab("scanner")}
            className="sketch-button bg-[#FFF8E8] px-4 py-2.5 rounded-2xl text-xs font-black text-[#0B2418] flex items-center gap-2"
          >
            <Scan className="w-4 h-4 text-[#173D28]" />
            <span>Scan Product</span>
          </button>
          <button
            onClick={() => onNavigateTab("what-if")}
            className="sketch-button-accent px-4 py-2.5 rounded-2xl text-xs font-black flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>What-If Mode 🔮</span>
          </button>
        </div>
      </div>

      {/* Main Budget Card */}
      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* Left 7 cols: Budget Wallet Container */}
        <div className="lg:col-span-7 sketch-card bg-[#173D28] text-[#FFF8E8] p-6 lg:p-8 border-[#C4E89A] relative overflow-hidden flex flex-col justify-between">
          <LeafDecoration className="absolute top-4 right-4 w-16 h-16 text-[#C4E89A]/20" />
          
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="text-xs font-black uppercase text-[#C4E89A] tracking-wider flex items-center gap-1.5">
                <CarbonCoin className="w-6 h-6" />
                YOUR MONTHLY CARBON BUDGET ({budget.period})
              </span>
              <span className="text-[10px] font-bold bg-[#C4E89A] text-[#0B2418] px-2 py-0.5 rounded-md">
                DEMO ESTIMATE
              </span>
            </div>

            <div className="flex items-baseline gap-3 my-2">
              <span className="font-heading text-5xl lg:text-6xl font-extrabold text-[#C4E89A]">
                {budget.monthlyLimitKg}
              </span>
              <span className="text-lg font-bold text-[#FFF8E8]/90">
                kg CO₂e / month limit
              </span>
            </div>

            {/* Linear Progress Bar */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-[#FFF8E8]">
                  Used: <strong className="text-[#C4E89A]">{budget.usedKg} kg CO₂e</strong> ({percentageUsed}%)
                </span>
                <span className="text-[#A7C98F]">
                  Remaining: <strong>{remainingKg} kg CO₂e</strong>
                </span>
              </div>

              <div className="w-full h-5 rounded-full bg-[#0B2418] border-2 border-[#C4E89A] p-0.5 overflow-hidden relative">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#A7C98F] to-[#C4E89A] transition-all duration-1000 ease-out"
                  style={{ width: `${percentageUsed}%` }}
                />
              </div>
            </div>
          </div>

          {/* Budget Explanation box */}
          <div className="mt-6 pt-4 border-t border-[#C4E89A]/20 flex items-center gap-3 bg-[#0B2418]/60 p-3.5 rounded-2xl border border-[#C4E89A]/30">
            <span className="text-2xl">💡</span>
            <p className="text-xs font-medium text-[#FFF8E8]/90">
              <strong>What this means:</strong> You have used <strong>63%</strong> of your carbon allowance for September. Staying under 100 kg keeps your personal emissions aligned with Paris Climate targets.
            </p>
          </div>

        </div>

        {/* Right 5 cols: Circular Gauge & Quick Stats */}
        <div className="lg:col-span-5 sketch-card bg-[#F6EFE0] p-6 flex flex-col items-center justify-center text-center">
          <h3 className="font-heading text-sm font-extrabold text-[#0B2418] uppercase tracking-wider mb-2">
            Wallet Capacity Gauge
          </h3>

          <div className="relative w-44 h-44 flex items-center justify-center my-2">
            {/* SVG Doughnut chart */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#E5DBC7"
                strokeWidth="12"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#173D28"
                strokeWidth="12"
                strokeDasharray={2 * Math.PI * 40}
                strokeDashoffset={2 * Math.PI * 40 * (1 - percentageUsed / 100)}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-heading text-3xl font-extrabold text-[#0B2418]">
                {remainingKg}
              </span>
              <span className="text-[11px] font-bold text-[#173D28]">kg remaining</span>
            </div>
          </div>

          <div className="mt-2 text-xs font-bold text-[#173D28] bg-[#FFF8E8] px-3 py-1.5 rounded-xl border-2 border-[#20251F]">
            Status: <span className="text-emerald-700">Healthy Carbon Spending 🌿</span>
          </div>
        </div>

      </div>

      {/* Impact Breakdown & Charts */}
      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* Category Breakdown (Pie chart & list) */}
        <div className="lg:col-span-6 sketch-card bg-[#FFF8E8] p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-heading text-lg font-extrabold text-[#0B2418] flex items-center gap-2">
                <PieIcon className="w-5 h-5 text-[#173D28]" />
                Impact Breakdown by Category
              </h3>
              <p className="text-xs text-[#173D28] font-medium">Estimated carbon distribution</p>
            </div>
            <DemoBadge />
          </div>

          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <div className="h-52 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categories}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={75}
                    fill="#8884d8"
                    dataKey="usedKg"
                  >
                    {categories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.hex} stroke="#20251F" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#FFF8E8",
                      borderRadius: "12px",
                      border: "2px solid #20251F",
                      fontWeight: "bold",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-2.5">
              {categories.map((cat) => (
                <div key={cat.id} className="flex items-center justify-between p-2 rounded-xl bg-[#F6EFE0] border-1.5 border-[#20251F]">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{cat.icon}</span>
                    <span className="text-xs font-bold text-[#0B2418]">{cat.name}</span>
                  </div>
                  <span className="text-xs font-extrabold text-[#173D28]">
                    {cat.usedKg} kg ({cat.percentage}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bar comparison */}
        <div className="lg:col-span-6 sketch-card bg-[#FFF8E8] p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-heading text-lg font-extrabold text-[#0B2418] flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#173D28]" />
                Emissions Comparison (kg CO₂e)
              </h3>
              <p className="text-xs text-[#173D28] font-medium">Your categories vs Target averages</p>
            </div>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categories} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                <Bar dataKey="usedKg" fill="#173D28" stroke="#20251F" strokeWidth={2} radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Recent Activities Feed & Modal Trigger */}
      <div className="sketch-card bg-[#F6EFE0] p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="font-heading text-xl font-extrabold text-[#0B2418] flex items-center gap-2">
              <span>📋 Recent Carbon Transactions</span>
            </h3>
            <p className="text-xs text-[#173D28] font-medium">
              Log daily items to update your wallet balance.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="sketch-button-accent px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 shrink-0 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Log Activity</span>
          </button>
        </div>

        {/* Activities List */}
        <div className="space-y-3">
          {activities.length === 0 ? (
            <p className="text-xs text-center text-[#173D28] py-8 font-medium">
              No recent carbon activities logged yet.
            </p>
          ) : (
            activities.map((act) => (
              <div
                key={act.id}
                className="flex items-center justify-between p-3.5 bg-[#FFF8E8] rounded-2xl border-2 border-[#20251F] shadow-[2.5px_2.5px_0px_#0B2418] hover:translate-x-1 transition-transform"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F6EFE0] border-2 border-[#20251F] flex items-center justify-center text-xl shrink-0">
                    {act.icon}
                  </div>
                  <div>
                    <h4 className="font-heading font-extrabold text-xs text-[#0B2418]">
                      {act.title}
                    </h4>
                    <div className="flex items-center gap-2 text-[11px] text-[#173D28]">
                      <span className="font-bold">{act.category}</span>
                      <span>•</span>
                      <span>{act.date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-xs font-black text-[#0B2418] bg-[#C4E89A] px-2.5 py-1 rounded-lg border border-[#20251F]">
                      +{act.amountKg} kg CO₂e
                    </span>
                    <p className="text-[10px] font-handwritten font-bold text-[#173D28] mt-0.5">
                      {act.tip}
                    </p>
                  </div>
                  <button
                    onClick={() => onDeleteActivity(act.id)}
                    className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Log Activity Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-[#0B2418]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="sketch-card bg-[#FFF8E8] max-w-md w-full p-6 border-3 border-[#20251F] shadow-[8px_8px_0px_#0B2418] animate-in fade-in zoom-in-95">
            <h3 className="font-heading text-xl font-extrabold text-[#0B2418] mb-1">
              Log Carbon Activity 🌱
            </h3>
            <p className="text-xs font-medium text-[#173D28] mb-4">
              Add a new item to your carbon budget.
            </p>

            <form onSubmit={handleCreateActivity} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#0B2418] mb-1">
                  Activity Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. 20 km Bus Commute"
                  className="w-full bg-[#F6EFE0] border-2 border-[#20251F] rounded-xl px-3 py-2 text-xs font-bold text-[#0B2418] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0B2418] mb-1">
                  Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-[#F6EFE0] border-2 border-[#20251F] rounded-xl px-3 py-2 text-xs font-bold text-[#0B2418] focus:outline-none"
                >
                  <option value="Transport">🚗 Transport</option>
                  <option value="Food">🍔 Food & Dining</option>
                  <option value="Energy">⚡ Energy & Utilities</option>
                  <option value="Shopping">🛍️ Shopping & Goods</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0B2418] mb-1">
                  Estimated CO₂e (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                  className="w-full bg-[#F6EFE0] border-2 border-[#20251F] rounded-xl px-3 py-2 text-xs font-bold text-[#0B2418] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="sketch-button bg-[#F6EFE0] px-4 py-2 rounded-xl text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="sketch-button-accent px-4 py-2 rounded-xl text-xs font-black"
                >
                  Save Activity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
