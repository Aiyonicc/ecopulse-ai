"use client";

import React, { useState, useEffect, useRef } from "react";
import { Sun, Moon, CloudRain, ShieldCheck, TreePine, Leaf } from "lucide-react";
import { motion } from "framer-motion";

interface ForestTree {
  id: number;
  x: number;
  y: number;
  scale: number;
  type: "oak" | "pine" | "birch";
  plantedDate: string;
  offset: number; // kg CO2 offset
}

export default function VirtualForest() {
  const [isNight, setIsNight] = useState(false);
  const [isRaining, setIsRaining] = useState(false);
  const [activeSeason, setActiveSeason] = useState<"spring" | "summer" | "autumn" | "winter">("spring");
  const [plantedTrees, setPlantedTrees] = useState<ForestTree[]>([
    { id: 1, x: 80, y: 220, scale: 0.9, type: "oak", plantedDate: "15 May 2026", offset: 22 },
    { id: 2, x: 180, y: 240, scale: 1.1, type: "pine", plantedDate: "28 May 2026", offset: 25 },
    { id: 3, x: 280, y: 210, scale: 0.8, type: "birch", plantedDate: "02 Jun 2026", offset: 18 },
    { id: 4, x: 380, y: 230, scale: 1.0, type: "oak", plantedDate: "10 Jun 2026", offset: 22 },
  ]);
  const [selectedTree, setSelectedTree] = useState<ForestTree | null>(null);

  const forestCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const fireflies = useRef<{ x: number; y: number; vx: number; vy: number; alpha: number }[]>([]);
  const rainDrops = useRef<{ x: number; y: number; speed: number; len: number }[]>([]);

  // Generate background stars/fireflies and rain data
  useEffect(() => {
    fireflies.current = Array.from({ length: 15 }, () => ({
      x: Math.random() * 600,
      y: Math.random() * 250,
      vx: Math.random() * 0.4 - 0.2,
      vy: Math.random() * 0.4 - 0.2,
      alpha: Math.random() * 0.5 + 0.3,
    }));

    rainDrops.current = Array.from({ length: 60 }, () => ({
      x: Math.random() * 600,
      y: Math.random() * -300,
      speed: Math.random() * 4 + 8,
      len: Math.random() * 15 + 10,
    }));
  }, []);

  // Main Canvas animation loop (fireflies, weather, birds)
  useEffect(() => {
    const canvas = forestCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;

      // Draw Sky Gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
      if (isNight) {
        skyGrad.addColorStop(0, "#02070e");
        skyGrad.addColorStop(0.5, "#061320");
        skyGrad.addColorStop(1, "#0a2214"); // blend into forest green
      } else {
        // Day gradient depends on season
        if (activeSeason === "spring") {
          skyGrad.addColorStop(0, "#1e3c72");
          skyGrad.addColorStop(0.5, "#2a5298");
          skyGrad.addColorStop(1, "#072415");
        } else if (activeSeason === "autumn") {
          skyGrad.addColorStop(0, "#4a1204");
          skyGrad.addColorStop(0.6, "#5e2908");
          skyGrad.addColorStop(1, "#0a2214");
        } else {
          // Summer
          skyGrad.addColorStop(0, "#082f49");
          skyGrad.addColorStop(0.5, "#0369a1");
          skyGrad.addColorStop(1, "#072415");
        }
      }
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, h);

      // Draw Night Stars
      if (isNight) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        for (let i = 0; i < 25; i++) {
          const starX = (Math.sin(i * 1324) * 0.5 + 0.5) * w;
          const starY = (Math.cos(i * 743) * 0.5 + 0.5) * (h * 0.6);
          const size = Math.abs(Math.sin(Date.now() * 0.002 + i)) * 1.5;
          ctx.beginPath();
          ctx.arc(starX, starY, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw Sun/Moon
      ctx.save();
      if (isNight) {
        ctx.fillStyle = "#fef08a";
        ctx.shadowColor = "#fef08a";
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(w - 70, 60, 20, 0, Math.PI * 2);
        ctx.fill();
      } else {
        const sunGrad = ctx.createRadialGradient(w - 70, 60, 2, w - 70, 60, 22);
        sunGrad.addColorStop(0, "#fef08a");
        sunGrad.addColorStop(1, "rgba(251, 146, 60, 0)");
        ctx.fillStyle = sunGrad;
        ctx.beginPath();
        ctx.arc(w - 70, 60, 22, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // Draw background rolling hills
      ctx.fillStyle = "rgba(7, 30, 18, 0.9)";
      ctx.beginPath();
      ctx.moveTo(0, h);
      ctx.quadraticCurveTo(w * 0.35, h - 80, w * 0.7, h - 30);
      ctx.quadraticCurveTo(w * 0.85, h - 20, w, h - 50);
      ctx.lineTo(w, h);
      ctx.closePath();
      ctx.fill();

      // Draw foreground hills
      ctx.fillStyle = "#05180d";
      ctx.beginPath();
      ctx.moveTo(0, h);
      ctx.quadraticCurveTo(w * 0.25, h - 30, w * 0.5, h - 45);
      ctx.quadraticCurveTo(w * 0.75, h - 60, w, h - 35);
      ctx.lineTo(w, h);
      ctx.closePath();
      ctx.fill();

      // Draw Flowers/Mushrooms on the ground
      ctx.save();
      const flowerColors = activeSeason === "spring" ? ["#f43f5e", "#ec4899", "#a855f7"] : ["#f97316", "#eab308", "#d97706"];
      for (let i = 0; i < 8; i++) {
        const fx = 40 + i * 70 + Math.sin(i * 123) * 15;
        const fy = h - 25 + Math.cos(i * 45) * 8;
        ctx.fillStyle = flowerColors[i % flowerColors.length];
        ctx.beginPath();
        ctx.arc(fx, fy - 3, 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#10B981";
        ctx.fillRect(fx - 0.7, fy - 3, 1.4, 4);
      }
      ctx.restore();

      // Draw Rain effect overlay
      if (isRaining) {
        ctx.strokeStyle = "rgba(186, 230, 253, 0.4)";
        ctx.lineWidth = 1;
        rainDrops.current.forEach((drop) => {
          ctx.beginPath();
          ctx.moveTo(drop.x, drop.y);
          ctx.lineTo(drop.x + 1, drop.y + drop.len);
          ctx.stroke();

          // Move down
          drop.y += drop.speed;
          if (drop.y > h) {
            drop.y = -drop.len;
            drop.x = Math.random() * w;
          }
        });
      }

      // Draw Fireflies in Night mode
      if (isNight) {
        fireflies.current.forEach((ff) => {
          ff.x += ff.vx;
          ff.y += ff.vy;
          // bounce
          if (ff.x < 0 || ff.x > w) ff.vx = -ff.vx;
          if (ff.y < 0 || ff.y > h * 0.8) ff.vy = -ff.vy;

          ctx.fillStyle = `rgba(16, 255, 102, ${ff.alpha})`;
          ctx.beginPath();
          ctx.arc(ff.x, ff.y, 2, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // Draw flying bird
      if (!isRaining) {
        ctx.save();
        ctx.strokeStyle = isNight ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.3)";
        ctx.lineWidth = 1.5;
        const birdX = (Date.now() * 0.05) % (w + 100) - 50;
        const birdY = 80 + Math.sin(Date.now() * 0.003) * 15;
        ctx.beginPath();
        ctx.moveTo(birdX - 8, birdY + 3);
        ctx.quadraticCurveTo(birdX - 4, birdY - 3, birdX, birdY + 3);
        ctx.quadraticCurveTo(birdX + 4, birdY - 3, birdX + 8, birdY + 3);
        ctx.stroke();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isNight, isRaining, activeSeason]);

  const handlePlantTree = () => {
    const types: ("oak" | "pine" | "birch")[] = ["oak", "pine", "birch"];
    const newTree: ForestTree = {
      id: Date.now(),
      x: 60 + Math.random() * 480,
      y: 200 + Math.random() * 40,
      scale: 0.7 + Math.random() * 0.5,
      type: types[Math.floor(Math.random() * types.length)],
      plantedDate: "Today",
      offset: 22,
    };
    setPlantedTrees((prev) => [...prev, newTree]);
  };

  const getTreeColor = (type: string) => {
    if (activeSeason === "autumn") return "from-orange-600 to-amber-700";
    if (activeSeason === "winter") return "from-sky-300 to-blue-200";
    // Spring & Summer
    if (type === "oak") return "from-emerald-600 to-emerald-800";
    if (type === "pine") return "from-teal-600 to-teal-800";
    return "from-green-500 to-emerald-600"; // birch
  };

  return (
    <section id="forest" className="relative py-28 px-6 bg-gradient-to-b from-forest-dark to-[#030906]">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-primary bg-emerald-primary/10 px-3 py-1 rounded-full border border-emerald-primary/20">
            Section 04
          </span>
          <h2 className="text-4xl md:text-5xl font-space font-bold mt-4 mb-3 tracking-tight">
            Virtual Forest Ecosystem
          </h2>
          <p className="text-gray-400 text-sm max-w-lg mx-auto">
            Your carbon offsets shape an interactive woodland. Watch trees bloom, switch climates, and click trees to trace their lifetime offsets.
          </p>
        </div>

        {/* Forest Controls & Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Panel (Left) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="glass-card p-6 flex flex-col gap-6">
              <h3 className="font-space font-bold text-white text-lg">Ecosystem Controls</h3>

              {/* Day/Night toggle */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Time Cycle</span>
                <button
                  onClick={() => setIsNight(!isNight)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-primary/30 text-xs font-semibold text-white transition-all cursor-pointer"
                >
                  {isNight ? (
                    <>
                      <Moon className="w-4 h-4 text-indigo-400" /> Night Mode
                    </>
                  ) : (
                    <>
                      <Sun className="w-4 h-4 text-yellow-500" /> Day Mode
                    </>
                  )}
                </button>
              </div>

              {/* Weather toggle */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Climate Weather</span>
                <button
                  onClick={() => setIsRaining(!isRaining)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                    isRaining
                      ? "bg-sky-500/20 border-sky-400/40 text-sky-300"
                      : "bg-white/5 border-white/10 text-white"
                  }`}
                >
                  <CloudRain className="w-4 h-4" /> {isRaining ? "Raining" : "Sunny"}
                </button>
              </div>

              {/* Season Selection */}
              <div className="flex flex-col gap-2">
                <span className="text-sm text-gray-300">Seasons</span>
                <div className="grid grid-cols-4 gap-2">
                  {(["spring", "summer", "autumn", "winter"] as const).map((season) => (
                    <button
                      key={season}
                      onClick={() => setActiveSeason(season)}
                      className={`py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                        activeSeason === season
                          ? "bg-emerald-primary/20 border-emerald-primary text-emerald-primary"
                          : "bg-white/3 border-white/5 text-gray-400 hover:text-white"
                      }`}
                    >
                      {season}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="border-t border-white/5 pt-6 flex flex-col gap-3">
                <button
                  onClick={handlePlantTree}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-primary to-teal-primary text-forest-dark font-bold text-sm hover:brightness-110 shadow-lg shadow-emerald-primary/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <TreePine className="w-4 h-4" /> Plant Offset Tree
                </button>
                <div className="flex gap-2 items-center text-[10px] text-gray-500 justify-center">
                  <ShieldCheck className="w-4 h-4 text-emerald-primary" />
                  <span>1 reduction point = 1 tree planted</span>
                </div>
              </div>
            </div>

            {/* Tree Info Details (if selected) */}
            {selectedTree && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-5 border border-emerald-primary/30"
              >
                <h4 className="font-space font-bold text-white text-sm capitalize">
                  {selectedTree.type} Tree details
                </h4>
                <div className="flex justify-between items-center text-xs text-gray-400 mt-3">
                  <span>Planted:</span>
                  <span className="font-medium text-white">{selectedTree.plantedDate}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-400 mt-2">
                  <span>CO₂ offset rate:</span>
                  <span className="font-bold text-emerald-primary">{selectedTree.offset} kg / year</span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Interactive Forest Canvas Render (Right) */}
          <div className="lg:col-span-8 relative">
            <div className="glass-card overflow-hidden w-full h-[360px] relative">
              {/* Main Background Canvas */}
              <canvas ref={forestCanvasRef} width="600" height="360" className="absolute top-0 left-0 w-full h-full block" />

              {/* Interactive Vector Trees Overlaid on top of canvas for clickable/hoverable premium CSS anims */}
              <div className="absolute inset-0 pointer-events-none">
                {plantedTrees.map((tree) => {
                  const isSelected = selectedTree?.id === tree.id;
                  return (
                    <button
                      key={tree.id}
                      onClick={() => setSelectedTree(tree)}
                      className="absolute group pointer-events-auto cursor-pointer"
                      style={{
                        left: `${(tree.x / 600) * 100}%`,
                        top: `${(tree.y / 360) * 100}%`,
                        transform: `scale(${tree.scale}) translate(-50%, -100%)`,
                        transformOrigin: "bottom center",
                      }}
                    >
                      {/* Tree branches */}
                      <div className="relative flex flex-col items-center">
                        {/* Leaves */}
                        <div
                          className={`w-12 h-12 rounded-full bg-gradient-to-b ${getTreeColor(
                            tree.type
                          )} shadow-lg shadow-black/10 group-hover:scale-110 transition-transform duration-300 border border-white/5 relative flex items-center justify-center`}
                        >
                          <Leaf className="w-5 h-5 text-white/20 animate-pulse" />
                        </div>
                        {/* Trunk */}
                        <div className="w-2.5 h-6 bg-[#78350f] rounded-b-md" />

                        {/* Selected outline ring */}
                        {isSelected && (
                          <div className="absolute inset-0 -m-3 border border-emerald-primary rounded-full animate-ping pointer-events-none" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Custom Cloud overlay */}
              <div className="absolute top-8 left-12 opacity-35 flex items-center gap-1">
                <div className="w-8 h-4 rounded-full bg-white" />
                <div className="w-12 h-5 rounded-full bg-white -ml-4 -mt-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
