import React from "react";
import { motion } from "framer-motion";

export const SketchyArrow = ({ className = "w-16 h-16 text-[#173D28]" }) => (
  <motion.svg
    viewBox="0 0 100 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    animate={{ x: [0, 4, 0], y: [0, -2, 0] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
  >
    <path
      d="M10 30 Q 45 5, 80 25 M 80 25 Q 70 18, 65 10 M 80 25 Q 70 30, 68 40"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </motion.svg>
);

export const UnderlineScribble = ({ className = "w-full h-3 text-[#C4E89A]" }) => (
  <motion.svg
    viewBox="0 0 200 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    initial={{ pathLength: 0, opacity: 0.5 }}
    animate={{ pathLength: 1, opacity: 1 }}
    transition={{ duration: 1.2, ease: "easeOut" }}
  >
    <path
      d="M3 8 C 45 2, 95 10, 145 4 C 170 1, 190 9, 197 6"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
    />
  </motion.svg>
);

export const LeafDecoration = ({ className = "w-6 h-6 text-[#173D28]" }) => (
  <motion.svg
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    animate={{ rotate: [-3, 6, -3], scale: [1, 1.06, 1] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
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
  </motion.svg>
);

export const CarbonCoin = ({ className = "w-12 h-12" }) => (
  <motion.div
    whileHover={{ scale: 1.15, rotate: 10 }}
    whileTap={{ scale: 0.9 }}
    animate={{ y: [0, -6, 0] }}
    transition={{ y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" } }}
    className={`relative flex items-center justify-center rounded-full bg-[#C4E89A] border-2 border-[#20251F] shadow-[3px_3px_0px_#0B2418] font-bold text-[#0B2418] select-none cursor-pointer ${className}`}
  >
    <span className="text-xs font-mono font-black tracking-tighter">CO₂</span>
    <motion.span
      animate={{ scale: [0.8, 1.3, 0.8] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className="absolute -top-1 -right-1 text-[10px]"
    >
      ✨
    </motion.span>
  </motion.div>
);

export const StarDoodle = ({ className = "w-5 h-5 text-[#173D28]" }) => (
  <motion.svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    animate={{ rotate: 360, scale: [0.9, 1.15, 0.9] }}
    transition={{ rotate: { duration: 12, repeat: Infinity, ease: "linear" }, scale: { duration: 2, repeat: Infinity } }}
  >
    <path
      d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="#C4E89A"
    />
  </motion.svg>
);

export const DemoBadge = () => null;

