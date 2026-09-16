import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function AntigravityVortexAnimation() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.clientWidth || 420);
    let height = (canvas.height = canvas.parentElement.clientHeight || 520);

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
      }
    };
    window.addEventListener("resize", handleResize);

    // Particle items generator (Leaves, CO2 Cubes, Carbon Dust)
    const NUM_PARTICLES = 28;
    const particles = Array.from({ length: NUM_PARTICLES }, () => ({
      x: Math.random() * (width * 0.5) + width * 0.25,
      y: Math.random() * height * 0.7 + height * 0.2,
      type: Math.random() > 0.45 ? "leaf" : Math.random() > 0.5 ? "cube" : "dust",
      speed: Math.random() * 0.8 + 0.4,
      size: Math.random() * 12 + 10,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.03,
      wobbleOffset: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.03 + 0.01,
    }));

    let spiralPhase = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const baseY = height - 70;
      const topJarY = 110;

      // 1. Draw Swirling Neon-Lime Antigravity Spiral Vortex
      spiralPhase += 0.025;
      ctx.save();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = "rgba(196, 232, 154, 0.75)";
      ctx.shadowColor = "#C4E89A";
      ctx.shadowBlur = 15;

      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        const strandOffset = (i * Math.PI) / 2;
        for (let y = baseY; y > topJarY + 20; y -= 4) {
          const progress = (baseY - y) / (baseY - topJarY);
          const radius = (1 - progress * 0.5) * 35 * Math.sin(progress * Math.PI + spiralPhase);
          const angle = progress * Math.PI * 6 + spiralPhase + strandOffset;
          const x = centerX + Math.cos(angle) * Math.abs(radius) * (1 - progress * 0.3);
          
          if (y === baseY) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.restore();

      // 2. Draw Weightless Floating Particles (Leaves, CO2 Cubes, Carbon Dust)
      particles.forEach((p) => {
        // Upward zero-gravity drift
        p.y -= p.speed;
        p.rotation += p.rotSpeed;
        p.wobbleOffset += p.wobbleSpeed;

        // Sine wave horizontal wobble
        const currentX = p.x + Math.sin(p.wobbleOffset) * 18;

        // Reset particle when reaching top jar
        if (p.y < topJarY + 20) {
          p.y = baseY - 10;
          p.x = Math.random() * (width * 0.4) + width * 0.3;
        }

        ctx.save();
        ctx.translate(currentX, p.y);
        ctx.rotate(p.rotation);

        if (p.type === "leaf") {
          // Sage Green Leaf (Organic shape)
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.bezierCurveTo(p.size, -p.size / 2, p.size, p.size / 2, 0, p.size);
          ctx.bezierCurveTo(-p.size, p.size / 2, -p.size, -p.size / 2, 0, -p.size);
          ctx.fillStyle = "#A7C98F";
          ctx.fill();
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = "#173D28";
          ctx.stroke();
          // Vein line
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.lineTo(0, p.size);
          ctx.stroke();
        } else if (p.type === "cube") {
          // Hand-drawn CO2 Cube
          const s = p.size * 0.8;
          ctx.fillStyle = "#173D28";
          ctx.strokeStyle = "#20251F";
          ctx.lineWidth = 2;
          ctx.fillRect(-s / 2, -s / 2, s, s);
          ctx.strokeRect(-s / 2, -s / 2, s, s);

          ctx.fillStyle = "#C4E89A";
          ctx.font = "bold 9px 'Bricolage Grotesque', sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("CO₂", 0, 0);
        } else {
          // Glowing Carbon Dust Particle
          ctx.beginPath();
          ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = "#C4E89A";
          ctx.shadowColor = "#C4E89A";
          ctx.shadowBlur = 10;
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-[520px] bg-[#FFF8E8] rounded-3xl border-3 border-[#20251F] shadow-[8px_8px_0px_#0B2418] overflow-hidden flex flex-col items-center justify-between p-4 paper-texture select-none">
      
      {/* Hand-Drawn Ink Line Boil Filter */}
      <svg className="hidden">
        <defs>
          <filter id="ink-boil">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" result="noise">
              <animate
                attributeName="baseFrequency"
                values="0.04;0.045;0.038;0.04"
                dur="0.6s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.8" />
          </filter>
        </defs>
      </svg>

      {/* Top Glass Jar Hovering (Bobbing up and down gentle easing) */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-20 mt-2 flex flex-col items-center"
      >
        <div className="relative w-28 h-36 rounded-3xl border-3 border-[#20251F] bg-[#FFF8E8]/70 backdrop-blur-sm shadow-[4px_4px_0px_#0B2418] flex flex-col items-center justify-between p-2 overflow-hidden filter-[url(#ink-boil)]">
          {/* Metal lid */}
          <div className="w-20 h-4 rounded-md bg-[#173D28] border-2 border-[#20251F] shadow-[1px_1px_0px_#0B2418] shrink-0" />
          
          {/* Jar Label */}
          <div className="bg-[#F6EFE0] px-2 py-1 rounded-lg border border-[#20251F] text-center my-auto">
            <span className="text-[9px] font-black uppercase text-[#0B2418] tracking-tighter block">
              ATMOSPHERIC SAMPLE
            </span>
            <span className="font-heading text-[10px] font-extrabold text-[#173D28]">
              CO₂ & Organics 🌿
            </span>
          </div>

          {/* Glowing bottom deposit */}
          <div className="w-full h-5 rounded-b-2xl bg-[#C4E89A]/60 border-t border-[#20251F] flex items-center justify-center">
            <span className="text-[9px] font-bold text-[#0B2418]">Captured: 37g</span>
          </div>
        </div>

        {/* Hand-drawn hanging tag */}
        <div className="bg-[#C4E89A] border-2 border-[#20251F] px-2.5 py-0.5 rounded-full text-[10px] font-black text-[#0B2418] shadow-[2px_2px_0px_#0B2418] -mt-2 z-10">
          ✨ Gentle Hover Jar
        </div>
      </motion.div>

      {/* HTML5 Canvas for Floating Vortex & Zero-Gravity Particles */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      {/* Futuristic Base (Static with Neon Lime Pulsing Glow & Boil Filter) */}
      <div className="relative z-20 mb-2 flex flex-col items-center filter-[url(#ink-boil)]">
        
        {/* Swirling Base Aperture */}
        <div className="relative w-36 h-12 rounded-full border-3 border-[#20251F] bg-[#173D28] shadow-[5px_5px_0px_#0B2418] flex items-center justify-center overflow-hidden">
          {/* Neon Pulsing Center Ring */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-20 h-6 rounded-full bg-[#C4E89A] shadow-[0_0_20px_#C4E89A] border-2 border-[#0B2418]"
          />
        </div>

        {/* Outer Heavy Futuristic Platform Base */}
        <div className="w-48 h-10 rounded-b-3xl bg-[#F6EFE0] border-3 border-[#20251F] border-t-0 shadow-[6px_6px_0px_#0B2418] flex items-center justify-center -mt-2">
          <span className="text-[11px] font-black tracking-widest text-[#0B2418] uppercase">
            ANTIGRAVITY ENERGY BASE
          </span>
        </div>
      </div>

      {/* Background Poster Reference Art */}
      <div className="absolute bottom-2 right-2 z-0 opacity-15 max-w-[120px] pointer-events-none">
        <img src="/antigravity_base.jpg" alt="Antigravity Concept" className="w-full rounded-xl border border-[#20251F]" />
      </div>

    </div>
  );
}
