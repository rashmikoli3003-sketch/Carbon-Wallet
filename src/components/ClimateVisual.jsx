import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function ClimateVisual() {
  const canvasRef = useRef(null);
  const [activePhase, setActivePhase] = useState(1);
  const [phaseLabel, setPhaseLabel] = useState("Phase 1: Invisible Footprint");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // Set high DPI canvas resolution
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * (window.devicePixelRatio || 2);
      canvas.height = rect.height * (window.devicePixelRatio || 2);
      ctx.scale(window.devicePixelRatio || 2, window.devicePixelRatio || 2);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Particle Setup
    const PARTICLE_COUNT = 65;
    const width = canvas.width / (window.devicePixelRatio || 2);
    const height = canvas.height / (window.devicePixelRatio || 2);
    const centerX = width / 2;
    const centerY = height / 2;

    const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      x: centerX + (Math.random() - 0.5) * width * 0.8,
      y: centerY + (Math.random() - 0.5) * height * 0.8,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      radius: Math.random() * 2 + 1.2,
      baseAlpha: Math.random() * 0.6 + 0.3,
      angle: (i / PARTICLE_COUNT) * Math.PI * 2,
    }));

    let startTime = performance.now();
    const CYCLE_DURATION = 15000; // 15 seconds full 5-phase loop

    const render = (now) => {
      const elapsed = (now - startTime) % CYCLE_DURATION;
      const progress = elapsed / CYCLE_DURATION; // 0.0 to 1.0

      // Phase calculations (1 to 5)
      let phase = 1;
      let phaseName = "Phase 1: Invisible Impact";

      if (progress < 0.2) {
        phase = 1;
        phaseName = "Phase 1: Invisible Impact";
      } else if (progress < 0.4) {
        phase = 2;
        phaseName = "Phase 2: Everyday Choices";
      } else if (progress < 0.6) {
        phase = 3;
        phaseName = "Phase 3: Connected Carbon Network";
      } else if (progress < 0.8) {
        phase = 4;
        phaseName = "Phase 4: Carbon Wallet Container";
      } else {
        phase = 5;
        phaseName = "Phase 5: Particle Cycle Loop";
      }

      setActivePhase(phase);
      setPhaseLabel(phaseName);

      // Clear Canvas
      ctx.clearRect(0, 0, width, height);

      // Atmospheric Glow Background
      const bgGlow = ctx.createRadialGradient(centerX, centerY, 20, centerX, centerY, width * 0.45);
      bgGlow.addColorStop(0, "rgba(13, 33, 22, 0.6)");
      bgGlow.addColorStop(0.7, "rgba(7, 17, 11, 0.9)");
      bgGlow.addColorStop(1, "rgba(7, 17, 11, 0)");
      ctx.fillStyle = bgGlow;
      ctx.fillRect(0, 0, width, height);

      // Draw Phase-Specific Motion Dynamics
      particles.forEach((p, idx) => {
        let targetX = p.x;
        let targetY = p.y;

        if (phase === 1) {
          // Soft floating organic particles
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 30 || p.x > width - 30) p.vx *= -1;
          if (p.y < 30 || p.y > height - 30) p.vy *= -1;
        } else if (phase === 2) {
          // Form 4 distinct habit clusters (Bike, House, Meal, Energy)
          const clusterIndex = idx % 4;
          const angles = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];
          const clusterRadius = 110;
          const cx = centerX + Math.cos(angles[clusterIndex]) * clusterRadius;
          const cy = centerY + Math.sin(angles[clusterIndex]) * clusterRadius;

          targetX = cx + Math.cos(p.angle + elapsed * 0.001) * 35;
          targetY = cy + Math.sin(p.angle + elapsed * 0.001) * 35;

          p.x += (targetX - p.x) * 0.05;
          p.y += (targetY - p.y) * 0.05;
        } else if (phase === 3) {
          // Form Stylized Glowing Earth Circle
          const earthRadius = 110;
          targetX = centerX + Math.cos(p.angle + elapsed * 0.0005) * earthRadius;
          targetY = centerY + Math.sin(p.angle + elapsed * 0.0005) * earthRadius;

          p.x += (targetX - p.x) * 0.06;
          p.y += (targetY - p.y) * 0.06;
        } else if (phase === 4) {
          // Form Wallet Rectangular Outline Box & Flow inside
          const boxWidth = 180;
          const boxHeight = 120;
          if (idx < 30) {
            // Outline border particles
            const edge = idx % 4;
            if (edge === 0) {
              targetX = centerX - boxWidth / 2 + (idx / 30) * boxWidth * 4;
              targetY = centerY - boxHeight / 2;
            } else if (edge === 1) {
              targetX = centerX + boxWidth / 2;
              targetY = centerY - boxHeight / 2 + (idx / 30) * boxHeight * 4;
            } else if (edge === 2) {
              targetX = centerX + boxWidth / 2 - (idx / 30) * boxWidth * 4;
              targetY = centerY + boxHeight / 2;
            } else {
              targetX = centerX - boxWidth / 2;
              targetY = centerY + boxHeight / 2 - (idx / 30) * boxHeight * 4;
            }
          } else {
            // Internal floating particles
            targetX = centerX + (Math.sin(p.angle + elapsed * 0.002) * boxWidth) / 3;
            targetY = centerY + (Math.cos(p.angle + elapsed * 0.002) * boxHeight) / 3;
          }

          p.x += (targetX - p.x) * 0.08;
          p.y += (targetY - p.y) * 0.08;
        } else if (phase === 5) {
          // Dissolve and drift outwards smoothly
          p.x += Math.cos(p.angle) * 1.5;
          p.y += Math.sin(p.angle) * 1.5;
        }

        // Draw Particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = phase === 4 ? "#B8F56B" : "#8EBB91";
        ctx.globalAlpha = p.baseAlpha;
        ctx.shadowBlur = phase === 4 ? 12 : 6;
        ctx.shadowColor = "#B8F56B";
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      });

      // Draw Network Connecting Lines in Phase 2 & 3
      if (phase >= 2 && phase <= 4) {
        ctx.strokeStyle = "rgba(184, 245, 107, 0.18)";
        ctx.lineWidth = 1;
        for (let i = 0; i < particles.length; i += 3) {
          for (let j = i + 1; j < particles.length; j += 6) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 90) {
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      }

      // Draw Phase 3 & 4 Central Artwork Overlay
      if (phase === 3) {
        // Stylized Globe Ring
        ctx.beginPath();
        ctx.arc(centerX, centerY, 110, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(184, 245, 107, 0.35)";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([8, 6]);
        ctx.stroke();
        ctx.setLineDash([]);
      } else if (phase === 4) {
        // Wallet Contour Outline
        ctx.beginPath();
        ctx.roundRect(centerX - 100, centerY - 70, 200, 140, 16);
        ctx.strokeStyle = "#B8F56B";
        ctx.lineWidth = 2;
        ctx.shadowBlur = 15;
        ctx.shadowColor = "rgba(184, 245, 107, 0.5)";
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div className="relative w-full aspect-square max-w-lg mx-auto flex items-center justify-center">
      
      {/* Canvas Illustration */}
      <canvas
        ref={canvasRef}
        className="w-full h-full rounded-3xl border border-[#8EBB91]/20 bg-[#07110B]/80 shadow-[0_0_50px_rgba(13,33,22,0.8)]"
      />

      {/* Floating Ink Symbol Overlay Badges (Phase 2 Everyday Choices) */}
      <motion.div
        animate={{ opacity: activePhase === 2 ? 1 : 0, scale: activePhase === 2 ? 1 : 0.9 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
      >
        <div className="absolute top-12 left-14 bg-[#0D2116]/80 border border-[#8EBB91]/40 px-3 py-1.5 rounded-full text-xs font-bold text-[#F4F2E8] flex items-center gap-1.5 shadow-lg">
          <span>🚲</span> <span>Transport</span>
        </div>
        <div className="absolute top-12 right-14 bg-[#0D2116]/80 border border-[#8EBB91]/40 px-3 py-1.5 rounded-full text-xs font-bold text-[#F4F2E8] flex items-center gap-1.5 shadow-lg">
          <span>🏡</span> <span>Energy</span>
        </div>
        <div className="absolute bottom-14 left-14 bg-[#0D2116]/80 border border-[#8EBB91]/40 px-3 py-1.5 rounded-full text-xs font-bold text-[#F4F2E8] flex items-center gap-1.5 shadow-lg">
          <span>🥗</span> <span>Diet</span>
        </div>
        <div className="absolute bottom-14 right-14 bg-[#0D2116]/80 border border-[#8EBB91]/40 px-3 py-1.5 rounded-full text-xs font-bold text-[#F4F2E8] flex items-center gap-1.5 shadow-lg">
          <span>🛍️</span> <span>Shopping</span>
        </div>
      </motion.div>

      {/* Phase Indicator Badge */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between px-4 py-2 bg-[#07110B]/90 backdrop-blur-md rounded-xl border border-[#8EBB91]/20 text-[11px] font-mono">
        <span className="text-[#B8F56B] font-bold tracking-tight">{phaseLabel}</span>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((p) => (
            <div
              key={p}
              className={`w-2 h-2 rounded-full transition-colors ${
                p === activePhase ? "bg-[#B8F56B] scale-125" : "bg-[#8EBB91]/30"
              }`}
            />
          ))}
        </div>
      </div>

    </div>
  );
}
