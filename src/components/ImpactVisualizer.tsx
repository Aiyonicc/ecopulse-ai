"use client";

import React from "react";
import { Car, TreePine, BatteryCharging, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

interface AnalogyCard {
  title: string;
  analogy: string;
  detail: string;
  icon: React.ReactNode;
  svgGraphic: React.ReactNode;
}

export default function ImpactVisualizer() {
  const cards: AnalogyCard[] = [
    {
      title: "Vehicle Transport",
      analogy: "Driving a petrol vehicle 320 km",
      detail: "Represents typical daily commuting emissions across one business week.",
      icon: <Car className="w-5 h-5 text-emerald-primary" />,
      svgGraphic: (
        <svg className="w-24 h-24 text-emerald-primary" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Path line */}
          <line x1="10" y1="75" x2="90" y2="75" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
          <motion.line
            x1="10"
            y1="75"
            x2="90"
            y2="75"
            stroke="#10B981"
            strokeWidth="3"
            strokeDasharray="10 5"
            animate={{ strokeDashoffset: [0, -30] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          />
          {/* Car chassis */}
          <motion.g
            animate={{ y: [0, -2, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <path d="M25 60H75L68 45H32L25 60Z" fill="rgba(16, 185, 129, 0.2)" stroke="#10B981" strokeWidth="2" />
            <rect x="20" y="60" width="60" height="10" rx="3" fill="#0B2F1D" stroke="#10B981" strokeWidth="2" />
            {/* Wheels */}
            <motion.circle
              cx="32"
              cy="70"
              r="6"
              fill="#05160E"
              stroke="#10B981"
              strokeWidth="2"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
            <motion.circle
              cx="68"
              cy="70"
              r="6"
              fill="#05160E"
              stroke="#10B981"
              strokeWidth="2"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
          </motion.g>
        </svg>
      ),
    },
    {
      title: "Deforestation",
      analogy: "Felling 2 mature forest trees",
      detail: "Eliminates decades of carbon sequestration capacity from the environment.",
      icon: <TreePine className="w-5 h-5 text-red-400" />,
      svgGraphic: (
        <svg className="w-24 h-24 text-red-400" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Hill ground */}
          <path d="M15 80 Q50 70 85 80" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
          {/* Standing Tree */}
          <g>
            <rect x="32" y="55" width="6" height="25" rx="1" fill="#78350f" />
            <path d="M35 25 L20 60 L50 60 Z" fill="rgba(16, 185, 129, 0.15)" stroke="#10B981" strokeWidth="2" />
          </g>
          {/* Falling Tree */}
          <motion.g
            style={{ originX: "68px", originY: "80px" }}
            animate={{ rotate: [0, 75, 75, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            <rect x="65" y="55" width="6" height="25" rx="1" fill="#78350f" />
            <path d="M68 25 L53 60 L83 60 Z" fill="rgba(239, 68, 68, 0.15)" stroke="#EF4444" strokeWidth="2" />
            {/* Cut marks */}
            <path d="M53 72 L62 70" stroke="#EF4444" strokeWidth="2" />
          </motion.g>
        </svg>
      ),
    },
    {
      title: "Grid Energy Load",
      analogy: "Charging 40,000 smart phones",
      detail: "Equivalent grid power load required to charge consumer lithium batteries.",
      icon: <BatteryCharging className="w-5 h-5 text-yellow-500" />,
      svgGraphic: (
        <svg className="w-24 h-24 text-yellow-500" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Phone body */}
          <rect x="35" y="20" width="30" height="60" rx="6" fill="rgba(250, 204, 21, 0.05)" stroke="#EAB308" strokeWidth="2" />
          <circle cx="50" cy="74" r="2" fill="#EAB308" />
          {/* Charging lightning bolt */}
          <motion.path
            d="M52 35 L42 48 H50 L48 60 L58 47 H50 Z"
            fill="rgba(250, 204, 21, 0.3)"
            stroke="#EAB308"
            strokeWidth="1.5"
            animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          />
          {/* Glow particles */}
          <motion.circle
            cx="30"
            cy="40"
            r="1.5"
            fill="#EAB308"
            animate={{ y: [-10, 10], opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
          />
          <motion.circle
            cx="70"
            cy="55"
            r="1.5"
            fill="#EAB308"
            animate={{ y: [10, -10], opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 2, delay: 1 }}
          />
        </svg>
      ),
    },
  ];

  return (
    <section id="visualizer" className="relative py-28 px-6 bg-gradient-to-b from-[#030906] to-forest-dark">
      {/* Background highlight */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-primary/3 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-primary bg-emerald-primary/10 px-3 py-1 rounded-full border border-emerald-primary/20">
            Section 08
          </span>
          <h2 className="text-4xl md:text-5xl font-space font-bold mt-4 mb-3 tracking-tight">
            Impact Visualizer
          </h2>
          <p className="text-gray-400 text-sm max-w-lg mx-auto">
            Numbers alone don't build connections. Review these concrete physical comparisons of your cumulative emissions.
          </p>
        </div>

        {/* Analogy cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <div key={idx} className="glass-card p-6 flex flex-col items-center justify-between text-center relative group overflow-hidden">
              {/* Corner alert logo */}
              <div className="absolute top-4 left-4 p-2 bg-white/3 border border-white/5 rounded-lg">
                {card.icon}
              </div>

              {/* Glowing hover circle */}
              <div className="absolute -bottom-10 w-32 h-32 bg-emerald-primary/5 rounded-full filter blur-xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

              {/* Graphic Illustration */}
              <div className="my-6 w-32 h-32 bg-black/10 rounded-2xl flex items-center justify-center border border-white/5">
                {card.svgGraphic}
              </div>

              {/* Text content */}
              <div>
                <h3 className="font-space font-bold text-white text-base mb-2">{card.title}</h3>
                <h4 className="text-lg font-space font-extrabold text-emerald-primary mb-3 leading-snug">
                  {card.analogy}
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed max-w-xs mx-auto">{card.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Action warning details */}
        <div className="mt-12 p-5 bg-red-500/5 border border-red-500/10 rounded-2xl flex items-start gap-4 max-w-2xl mx-auto">
          <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <p className="text-xs text-gray-400 leading-relaxed">
            <strong className="text-white">Note on metrics:</strong> Greenhouse gas equivalents are estimated using carbon conversion coefficients issued by regional environment agencies. All comparisons assume typical power grids and standard combustion metrics.
          </p>
        </div>
      </div>
    </section>
  );
}
