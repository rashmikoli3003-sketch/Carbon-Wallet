import React from "react";

export const SketchyArrow = ({ className = "w-16 h-16 text-[#173D28]" }) => (
  <svg
    viewBox="0 0 100 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M10 30 Q 45 5, 80 25 M 80 25 Q 70 18, 65 10 M 80 25 Q 70 30, 68 40"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const UnderlineScribble = ({ className = "w-full h-3 text-[#C4E89A]" }) => (
  <svg
    viewBox="0 0 200 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M3 8 C 45 2, 95 10, 145 4 C 170 1, 190 9, 197 6"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
    />
  </svg>
);

export const LeafDecoration = ({ className = "w-6 h-6 text-[#173D28]" }) => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M8 32 C 8 16, 20 6, 34 6 C 34 20, 24 32, 8 32 Z M 8 32 C 16 24, 24 16, 34 6"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="#A7C98F"
      fillOpacity="0.4"
    />
  </svg>
);

export const CarbonCoin = ({ className = "w-12 h-12" }) => (
  <div className={`relative flex items-center justify-center rounded-full bg-[#C4E89A] border-2 border-[#20251F] shadow-[3px_3px_0px_#0B2418] font-bold text-[#0B2418] select-none ${className}`}>
    <span className="text-xs font-mono font-black tracking-tighter">CO₂</span>
    <span className="absolute -top-1 -right-1 text-[10px]">✨</span>
  </div>
);

export const StarDoodle = ({ className = "w-5 h-5 text-[#173D28]" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="#C4E89A"
    />
  </svg>
);

export const DemoBadge = () => (
  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF8E8] border-2 border-[#20251F] text-xs font-bold text-[#173D28] shadow-[2px_2px_0px_#0B2418]">
    <span className="w-2 h-2 rounded-full bg-[#173D28] animate-ping" />
    DEMO DATA
  </span>
);
