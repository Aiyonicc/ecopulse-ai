"use client";

import React from "react";
import { Quote, Star } from "lucide-react";

interface Story {
  name: string;
  role: string;
  location: string;
  quote: string;
  savingMetric: string;
  treesPlanted: number;
  initials: string;
  avatarBg: string;
}

export default function CommunityStories() {
  const stories: Story[] = [
    {
      name: "Marcus Aurelius",
      role: "Urban Planner",
      location: "Seattle, USA",
      quote: "Swapped my short daily SUV commute for an e-bike. EcoPulse Challenges gave me the nudge I needed. Composting kitchen waste also became a fun habit!",
      savingMetric: "1.2 Tons CO2 / yr",
      treesPlanted: 14,
      initials: "MA",
      avatarBg: "bg-emerald-primary/20 text-emerald-primary",
    },
    {
      name: "Sophia Chen",
      role: "Software Architect",
      location: "Vancouver, Canada",
      quote: "Changing to a 100% renewable grid plan was easier than I thought. The AI Coach recommendations lay out simple steps that fit my busy routine perfectly.",
      savingMetric: "850 kg CO2 / yr",
      treesPlanted: 8,
      initials: "SC",
      avatarBg: "bg-teal-primary/20 text-teal-primary",
    },
    {
      name: "Elena Rostova",
      role: "Designer",
      location: "Prague, Czechia",
      quote: "The visual comparisons in the Impact Visualizer hit home. Knowing my habits equaled felling 4 trees completely shifted my purchasing decisions.",
      savingMetric: "2.1 Tons CO2 / yr",
      treesPlanted: 25,
      initials: "ER",
      avatarBg: "bg-indigo-500/25 text-indigo-400",
    },
  ];

  return (
    <section id="stories" className="relative py-28 px-6 bg-gradient-to-b from-[#04120B] to-forest-dark">
      {/* Background glow highlights */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-80 h-80 bg-teal-primary/3 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-primary bg-emerald-primary/10 px-3 py-1 rounded-full border border-emerald-primary/20">
            Section 10
          </span>
          <h2 className="text-4xl md:text-5xl font-space font-bold mt-4 mb-3 tracking-tight">
            Community Stories
          </h2>
          <p className="text-gray-400 text-sm max-w-lg mx-auto">
            Review real testimonials from members using our platform to audit, target, and neutralize emissions.
          </p>
        </div>

        {/* Stories grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((s, idx) => (
            <div key={idx} className="glass-card p-6 flex flex-col justify-between relative group hover:border-emerald-primary/35 transition-all duration-300">
              {/* Quote icon detail */}
              <div className="absolute top-6 right-6 opacity-[0.03] group-hover:opacity-[0.07] group-hover:scale-110 transition-all duration-300">
                <Quote className="w-24 h-24 text-white" />
              </div>

              <div>
                {/* Rating stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>

                <p className="text-xs text-gray-300 italic leading-relaxed mb-6 relative z-10">
                  &ldquo;{s.quote}&rdquo;
                </p>
              </div>

              {/* User Bio and Stats */}
              <div>
                <div className="flex justify-between items-center border-t border-white/5 pt-4 mb-4">
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest block">Carbon saved</span>
                    <span className="text-xs font-bold text-emerald-primary">{s.savingMetric}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest block">Trees planted</span>
                    <span className="text-xs font-bold text-white">{s.treesPlanted} offset trees</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${s.avatarBg} border border-white/5`}>
                    {s.initials}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{s.name}</h4>
                    <p className="text-[10px] text-gray-500">
                      {s.role} • {s.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Community Statistics Banner */}
        <div className="mt-16 glass-card p-8 flex flex-col md:flex-row justify-around items-center text-center gap-8 relative overflow-hidden">
          {/* Subtle background wave details */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-primary/5 via-transparent to-teal-primary/5 pointer-events-none" />

          <div>
            <span className="text-2xl md:text-3xl font-space font-black text-white block">14,280+</span>
            <span className="text-xs text-gray-400 uppercase tracking-widest font-semibold mt-1 block">Active Guardians</span>
          </div>

          <div className="w-[1px] h-10 bg-white/10 hidden md:block" />

          <div>
            <span className="text-2xl md:text-3xl font-space font-black text-emerald-primary block">320.5 Tons</span>
            <span className="text-xs text-gray-400 uppercase tracking-widest font-semibold mt-1 block">CO₂ Carbon Offsetted</span>
          </div>

          <div className="w-[1px] h-10 bg-white/10 hidden md:block" />

          <div>
            <span className="text-2xl md:text-3xl font-space font-black text-white block">15,800+</span>
            <span className="text-xs text-gray-400 uppercase tracking-widest font-semibold mt-1 block">Trees Planted</span>
          </div>
        </div>
      </div>
    </section>
  );
}
