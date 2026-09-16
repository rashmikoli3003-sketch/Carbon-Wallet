import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scan,
  Upload,
  Search,
  Sparkles,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  RefreshCw,
  Image as ImageIcon,
  ShieldCheck,
  Globe
} from "lucide-react";
import { calculateLiveCarbonImpact } from "../services/carbonApi";
import { LeafDecoration, UnderlineScribble } from "../components/HandDrawnDoodles";

export default function CarbonScannerPage({ onLogActivity }) {
  const [query, setQuery] = useState("Beef burger");
  const [category, setCategory] = useState("Food & Dining");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Initial lookup on mount
  React.useEffect(() => {
    handleScan("Beef burger");
  }, []);

  const handleScan = async (searchKey = query) => {
    setIsScanning(true);
    const result = await calculateLiveCarbonImpact(searchKey, category);
    setScanResult(result);
    setIsScanning(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      const cleanName = file.name.replace(/\.[^/.]+$/, "");
      setQuery(cleanName);
      handleScan(cleanName);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-8 p-4 lg:p-8 max-w-5xl mx-auto"
    >
      
      {/* Header Banner */}
      <div className="bg-[#F6EFE0] p-6 rounded-3xl border-3 border-[#20251F] shadow-[6px_6px_0px_#0B2418] relative overflow-hidden grid lg:grid-cols-12 gap-6 items-center">
        <LeafDecoration className="absolute -top-3 -right-3 w-20 h-20 text-[#A7C98F]/40" />
        
        <div className="lg:col-span-8 space-y-2">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="font-heading text-2xl lg:text-3xl font-extrabold text-[#0B2418]">
              Scan Your Impact 📸
            </h1>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#173D28] text-[#C4E89A] border-2 border-[#20251F] text-xs font-black shadow-[2px_2px_0px_#0B2418]">
              <Globe className="w-3.5 h-3.5 animate-pulse" />
              LIVE API DATA
            </span>
          </div>
          <p className="text-sm font-medium text-[#173D28]">
            Upload a product photo or search an item to calculate real-time carbon emissions using Open Food Facts & EPA/DEFRA LCA factors.
          </p>
        </div>

        {/* Hand-Drawn Feature Art */}
        <div className="lg:col-span-4 hidden lg:block">
          <motion.div
            whileHover={{ scale: 1.03, rotate: -1 }}
            className="relative rounded-2xl border-2 border-[#20251F] overflow-hidden shadow-[4px_4px_0px_#0B2418] bg-[#FFF8E8]"
          >
            <img
              src="/scanner_sketch.jpg"
              alt="AI Scanner Sketch Concept"
              className="w-full h-36 object-cover"
            />
          </motion.div>
        </div>
      </div>

      {/* Main Scanner Section */}
      <div className="grid md:grid-cols-12 gap-6">
        
        {/* Left Input Dropzone */}
        <div className="md:col-span-6 sketch-card bg-[#FFF8E8] p-6 space-y-4">
          <h3 className="font-heading text-lg font-extrabold text-[#0B2418]">
            Input Item or Upload Photo
          </h3>

          {/* Upload Dropzone */}
          <label className="relative border-2 border-dashed border-[#20251F] rounded-2xl p-6 bg-[#F6EFE0] flex flex-col items-center justify-center cursor-pointer hover:bg-[#A7C98F]/20 transition-colors overflow-hidden group">
            
            {imagePreview ? (
              <div className="relative w-full h-40 rounded-xl overflow-hidden border border-[#20251F]">
                <img src={imagePreview} alt="Uploaded product" className="w-full h-full object-cover" />
                {isScanning && (
                  <div className="absolute inset-x-0 h-1 bg-[#C4E89A] shadow-[0_0_12px_#C4E89A] animate-scan" />
                )}
              </div>
            ) : (
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-[#173D28] text-[#C4E89A] border-2 border-[#20251F] flex items-center justify-center text-xl mx-auto shadow-[2px_2px_0px_#0B2418] group-hover:scale-110 transition-transform">
                  <Upload className="w-5 h-5" />
                </div>
                <p className="text-xs font-extrabold text-[#0B2418]">
                  Click to upload product image
                </p>
                <p className="text-[10px] text-[#173D28] font-medium">PNG, JPG up to 10MB</p>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>

          {/* Or Manual Search */}
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-bold text-[#0B2418]">
              Or type product / activity name:
            </label>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#173D28]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleScan()}
                placeholder="e.g. Beef burger, Nutella, 15 km Drive, Laptop..."
                className="w-full bg-[#F6EFE0] border-2 border-[#20251F] rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold text-[#0B2418] focus:outline-none"
              />
            </div>

            {/* Quick search tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {["Beef burger", "Nutella", "15 km Drive", "Flight 500km", "Laptop"].map((sample) => (
                <button
                  key={sample}
                  onClick={() => {
                    setQuery(sample);
                    handleScan(sample);
                  }}
                  className="text-[11px] font-bold bg-[#F6EFE0] hover:bg-[#C4E89A] border border-[#20251F] px-2.5 py-1 rounded-lg transition-colors text-[#0B2418]"
                >
                  + {sample}
                </button>
              ))}
            </div>

            {/* Scan Button */}
            <button
              onClick={() => handleScan()}
              disabled={isScanning}
              className="w-full sketch-button-accent py-3 rounded-2xl font-black text-xs flex items-center justify-center gap-2 mt-4"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Fetching Real Carbon Data...</span>
                </>
              ) : (
                <>
                  <Scan className="w-4 h-4" />
                  <span>Calculate Real-Time Impact</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Output Results Card */}
        <div className="md:col-span-6 sketch-card bg-[#173D28] text-[#FFF8E8] p-6 border-[#C4E89A] flex flex-col justify-between relative">
          
          {isScanning ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center space-y-4">
              <div className="w-16 h-16 rounded-full border-4 border-[#C4E89A] border-t-transparent animate-spin flex items-center justify-center">
                <Scan className="w-6 h-6 text-[#C4E89A]" />
              </div>
              <p className="font-heading text-lg font-extrabold text-[#C4E89A]">
                Querying Real LCA Database...
              </p>
              <p className="text-xs text-[#FFF8E8]/80 font-medium max-w-xs">
                Fetching Open Food Facts & EPA lifecycle factors.
              </p>
            </div>
          ) : scanResult ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#C4E89A]">
                    REAL-TIME CARBON IMPACT
                  </span>
                  {scanResult.source && (
                    <span className="text-[9px] font-bold bg-[#0B2418] text-[#C4E89A] px-2 py-0.5 rounded border border-[#C4E89A]/40">
                      ⚡ {scanResult.source}
                    </span>
                  )}
                </div>
                <h2 className="font-heading text-2xl font-extrabold text-[#FFF8E8] mt-1">
                  {scanResult.name}
                </h2>
                <span className="inline-block mt-1 bg-[#A7C98F]/20 text-[#C4E89A] text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-[#C4E89A]/30">
                  Category: {scanResult.category}
                </span>
              </div>

              {/* Emissions Big Number */}
              <div className="p-4 bg-[#0B2418] rounded-2xl border-2 border-[#C4E89A] flex items-baseline justify-between shadow-[3px_3px_0px_#0B2418]">
                <div>
                  <p className="text-[11px] font-bold text-[#A7C98F]">Carbon Emissions</p>
                  <p className="font-heading text-4xl font-extrabold text-[#C4E89A]">
                    {scanResult.emissionsKg} <span className="text-lg">kg CO₂e</span>
                  </p>
                </div>
                <span className="text-xs font-bold text-[#FFF8E8] bg-[#173D28] px-2.5 py-1 rounded-xl border border-[#C4E89A]/40">
                  {scanResult.confidence}
                </span>
              </div>

              {/* Assumptions */}
              <div className="space-y-1">
                <p className="text-xs font-bold text-[#C4E89A] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#C4E89A]" />
                  <span>Verified Calculation Method</span>
                </p>
                <p className="text-xs text-[#FFF8E8]/80 font-medium leading-relaxed bg-[#0B2418]/40 p-3 rounded-xl border border-white/10">
                  {scanResult.assumptions}
                </p>
              </div>

              {/* Alternatives cards */}
              {scanResult.alternatives && scanResult.alternatives.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-bold text-[#C4E89A]">
                    🌱 Lower-Impact Verified Alternatives:
                  </p>
                  <div className="grid gap-2">
                    {scanResult.alternatives.map((alt, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center justify-between p-2.5 bg-[#FFF8E8] text-[#0B2418] rounded-xl border-1.5 border-[#20251F] shadow-[2px_2px_0px_#0B2418]"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{alt.icon}</span>
                          <div>
                            <p className="text-xs font-extrabold">{alt.name}</p>
                            <p className="text-[10px] text-emerald-800 font-bold">
                              Save {alt.savingsPercent}% CO₂e ({alt.emissionsKg} kg)
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            onLogActivity({
                              id: `act-${Date.now()}`,
                              title: `Swapped to ${alt.name}`,
                              category: scanResult.category.split(" ")[0],
                              icon: alt.icon,
                              amountKg: alt.emissionsKg,
                              date: "Just now",
                              type: "low",
                              tip: `Saved ${alt.savingsPercent}% CO₂e using real LCA data!`,
                            })
                          }
                          className="text-[10px] font-black bg-[#C4E89A] text-[#0B2418] px-2.5 py-1 rounded-lg border border-[#20251F] hover:scale-105 transition-transform"
                        >
                          Log Choice +
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

            </motion.div>
          ) : null}

        </div>

      </div>

    </motion.div>
  );
}
