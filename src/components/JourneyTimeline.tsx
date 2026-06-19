"use client";

import React, { useState } from "react";
import { Clock, ShieldAlert, Sparkles, CheckCircle2, ChevronRight, Activity } from "lucide-react";
import { motion } from "framer-motion";

interface Milestone {
  year: string;
  phase: "past" | "present" | "future";
  title: string;
  description: string;
  footprintEstimate: string; // tons CO2 / year
  healthIndex: number; // 0 to 100
  color: string;
  status: string;
  icon: React.ReactNode;
}

export default function JourneyTimeline() {
  const [activeStep, setActiveStep] = useState(1); // Default to Present (index 1)

  const milestones: Milestone[] = [
    {
      year: "2020",
      phase: "past",
      title: "Carbon Baseline (Unoptimized)",
      description: "Standard lifestyle habits: petrol commuting, coal-based electricity contracts, and high red meat diets.",
      footprintEstimate: "16.4 Tons",
      healthIndex: 28,
      color: "from-red-500/20 to-orange-500/20 border-red-500/30",
      status: "High Footprint Baseline",
      icon: <ShieldAlert className="w-5 h-5 text-red-500" />,
    },
    {
      year: "2026",
      phase: "present",
      title: "EcoPulse AI Integration",
      description: "Active auditing: hybrid/EV transitions, local energy sourcing, and gamified challenge participation.",
      footprintEstimate: "8.2 Tons",
      healthIndex: 65,
      color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/35",
      status: "Under Active Audit",
      icon: <Clock className="w-5 h-5 text-emerald-primary" />,
    },
    {
      year: "2032",
      phase: "future",
      title: "Net Zero Target Achieve",
      description: "Optimized green contract grids, fully plant-based dietary focus, zero plastic waste, and localized offset tree plantings.",
      footprintEstimate: "1.8 Tons",
      healthIndex: 94,
      color: "from-indigo-500/20 to-teal-500/20 border-indigo-500/30",
      status: "Regenerative Target",
      icon: <Sparkles className="w-5 h-5 text-indigo-400" />,
    },
  ];

  const currentMilestone = milestones[activeStep];

  return (
    <section id="timeline" className="relative py-28 px-6 bg-gradient-to-b from-[#04120B] to-[#030906]">
      {/* Background soft lighting */}
      <div className="absolute bottom-1/3 left-1/4 w-[350px] h-[350px] bg-teal-primary/3 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-primary bg-emerald-primary/10 px-3 py-1 rounded-full border border-emerald-primary/20">
            Section 07
          </span>
          <h2 className="text-4xl md:text-5xl font-space font-bold mt-4 mb-3 tracking-tight">
            Journey Timeline
          </h2>
          <p className="text-gray-400 text-sm max-w-lg mx-auto">
            Audit your carbon history, analyze present targets, and predict future regenerative outcomes.
          </p>
        </div>

        {/* Timeline Path Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Timeline Milestones list (Left) */}
          <div className="lg:col-span-7 flex flex-col gap-6 relative pl-6 border-l border-white/5">
            {/* Absolute line glow */}
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-red-500 via-emerald-primary to-indigo-500" />

            {milestones.map((m, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={m.year}
                  onClick={() => setActiveStep(idx)}
                  className={`p-5 rounded-2xl border transition-all duration-500 flex gap-4 cursor-pointer relative ${
                    isActive
                      ? `bg-gradient-to-br ${m.color} shadow-lg shadow-black/15`
                      : "bg-white/3 border-white/5 hover:border-white/10"
                  }`}
                >
                  {/* Timeline point node */}
                  <div
                    className={`absolute -left-[30px] top-6 w-4 h-4 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                      isActive
                        ? "bg-forest-dark border-emerald-primary scale-125"
                        : "bg-forest-dark border-white/20"
                    }`}
                  >
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-emerald-primary" />}
                  </div>

                  {/* Icon */}
                  <div className="p-3 bg-black/20 rounded-xl border border-white/5 h-fit shrink-0">
                    {m.icon}
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-center flex-wrap gap-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-emerald-primary">
                        {m.phase} phase
                      </span>
                      <span className="text-xs font-bold font-space text-white/50">{m.year}</span>
                    </div>
                    <h3 className="font-space font-bold text-white text-base mt-2 mb-1">{m.title}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">{m.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Earth Health Indicator card (Right) */}
          <div className="lg:col-span-5">
            <div className="glass-card p-8 flex flex-col relative overflow-hidden">
              <h3 className="font-space font-bold text-lg text-white mb-6 flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-primary" />
                Earth Health Indicator
              </h3>

              {/* Metric values */}
              <div className="flex justify-between items-center text-xs text-gray-400 mb-2">
                <span>Biosphere Health Index</span>
                <span className="font-bold text-white">{currentMilestone.healthIndex}%</span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/5 mb-6 relative">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-red-500 via-yellow-400 to-emerald-primary"
                  style={{ width: `${currentMilestone.healthIndex}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              {/* Detailed metrics box */}
              <div className="p-4 bg-white/3 border border-white/5 rounded-xl flex flex-col gap-3">
                <div className="flex justify-between items-center text-xs border-b border-white/5 pb-2">
                  <span className="text-gray-400">Carbon Output Rate</span>
                  <span className="font-bold text-white">{currentMilestone.footprintEstimate} CO₂/yr</span>
                </div>
                <div className="flex justify-between items-center text-xs border-b border-white/5 pb-2">
                  <span className="text-gray-400">Target Level Status</span>
                  <span className="font-medium text-emerald-primary">{currentMilestone.status}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">Regenerative Capacity</span>
                  <span className="font-medium text-white">
                    {currentMilestone.healthIndex > 80 ? "Fully Restoring" : currentMilestone.healthIndex > 50 ? "Neutralizing" : "Degrading"}
                  </span>
                </div>
              </div>

              {/* Motivation quote */}
              <p className="text-[11px] text-gray-500 text-center mt-6 leading-relaxed">
                "We do not inherit the Earth from our ancestors, we borrow it from our children."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
