"use client";

import React, { useState } from "react";
import EarthCanvas from "./EarthCanvas";
import { Globe, ShieldAlert, Award, Compass, Wind } from "lucide-react";

interface RegionStat {
  name: string;
  carbonIntensity: string; // High, Medium, Low
  carbonVal: number; // g CO2 / kWh
  renewableShare: number; // percentage
  topSource: string;
  initiatives: string;
}

export default function GlobalGlobeMap() {
  const [metricMode, setMetricMode] = useState<"intensity" | "renewables">("intensity");
  const [selectedRegion, setSelectedRegion] = useState<string>("North America");

  const regionalStats: Record<string, RegionStat> = {
    "North America": {
      name: "North America Region",
      carbonIntensity: "Medium",
      carbonVal: 380,
      renewableShare: 24,
      topSource: "Hydropower & Wind",
      initiatives: "Federal tax incentives driving fast utility solar and wind deployments.",
    },
    "Europe / Asia Region": {
      name: "Europe / Asia Region",
      carbonIntensity: "Low",
      carbonVal: 240,
      renewableShare: 42,
      topSource: "Nuclear & Offshore Wind",
      initiatives: "Carbon border adjustment taxes and strict emissions trading systems.",
    },
    "South America Region": {
      name: "South America Region",
      carbonIntensity: "Low",
      carbonVal: 180,
      renewableShare: 64,
      topSource: "Hydropower & Biofuels",
      initiatives: "Extensive hydro reservoirs supporting local grid baseload energy.",
    },
    "Australia / Oceania Region": {
      name: "Australia / Oceania Region",
      carbonIntensity: "High",
      carbonVal: 520,
      renewableShare: 31,
      topSource: "Solar PV",
      initiatives: "Rooftop solar penetration is highest globally; coal grid phasing active.",
    },
  };

  const currentStat = regionalStats[selectedRegion] || regionalStats["North America"];

  return (
    <section id="global-map" className="relative py-28 px-6 bg-gradient-to-b from-forest-dark to-[#04120B]">
      {/* Background glow lighting */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-emerald-primary/3 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-primary bg-emerald-primary/10 px-3 py-1 rounded-full border border-emerald-primary/20">
            Section 09
          </span>
          <h2 className="text-4xl md:text-5xl font-space font-bold mt-4 mb-3 tracking-tight">
            Global Intensity Map
          </h2>
          <p className="text-gray-400 text-sm max-w-lg mx-auto">
            Interact with our 3D holographic globe tracking carbon outputs and green grid shares worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Globe Canvas (Left) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            {/* Metric Mode Toggles */}
            <div className="flex gap-2 mb-6 bg-white/5 border border-white/5 p-1 rounded-full">
              <button
                onClick={() => setMetricMode("intensity")}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  metricMode === "intensity"
                    ? "bg-emerald-primary text-forest-dark font-black"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Carbon Intensity
              </button>
              <button
                onClick={() => setMetricMode("renewables")}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  metricMode === "renewables"
                    ? "bg-emerald-primary text-forest-dark font-black"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Renewable Share
              </button>
            </div>

            {/* Earth Hologram */}
            <div className="relative w-[340px] h-[340px] md:w-[420px] md:h-[420px] rounded-3xl bg-black/20 border border-white/5 flex items-center justify-center overflow-hidden">
              <EarthCanvas interactiveMode={true} score={metricMode === "intensity" ? 65 : 25} />
              
              {/* Floating map compass helper */}
              <div className="absolute top-4 right-4 flex items-center gap-1 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5 animate-spin-slow text-emerald-primary" />
                <span>Drag to Rotate</span>
              </div>
            </div>
          </div>

          {/* Regional Details Card (Right) */}
          <div className="lg:col-span-5">
            <div className="glass-card p-8 flex flex-col relative overflow-hidden">
              {/* Corner Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-primary/10 to-transparent rounded-bl-full pointer-events-none" />

              <h3 className="font-space font-bold text-lg text-white mb-6 flex items-center gap-2">
                <Globe className="w-5 h-5 text-emerald-primary" />
                Regional Analytics
              </h3>

              {/* Selector buttons */}
              <div className="grid grid-cols-2 gap-2 mb-6">
                {Object.keys(regionalStats).map((reg) => (
                  <button
                    key={reg}
                    onClick={() => setSelectedRegion(reg)}
                    className={`p-2.5 rounded-xl border text-[11px] font-bold text-left transition-all truncate cursor-pointer ${
                      selectedRegion === reg
                        ? "bg-emerald-primary/10 border-emerald-primary text-white"
                        : "bg-white/3 border-white/5 text-gray-400 hover:text-white"
                    }`}
                  >
                    {reg.replace("Region", "")}
                  </button>
                ))}
              </div>

              {/* Stats Box */}
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center pb-3 border-b border-white/5">
                  <span className="text-xs text-gray-400">Carbon Intensity</span>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                      currentStat.carbonIntensity === "Low"
                        ? "text-green-400 bg-green-400/10"
                        : currentStat.carbonIntensity === "Medium"
                        ? "text-yellow-400 bg-yellow-400/10"
                        : "text-red-400 bg-red-400/10"
                    }`}
                  >
                    {currentStat.carbonIntensity} ({currentStat.carbonVal}g/kWh)
                  </span>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-white/5">
                  <span className="text-xs text-gray-400">Renewable Energy Share</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white">{currentStat.renewableShare}%</span>
                    <div className="w-12 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-primary" style={{ width: `${currentStat.renewableShare}%` }} />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-white/5">
                  <span className="text-xs text-gray-400">Primary Clean Source</span>
                  <span className="text-xs font-semibold text-white flex items-center gap-1">
                    <Wind className="w-3.5 h-3.5 text-teal-primary" /> {currentStat.topSource}
                  </span>
                </div>

                <div>
                  <span className="text-xs text-gray-400 block mb-1.5">Local Decarbonization Policy</span>
                  <p className="text-xs text-gray-300 leading-relaxed bg-white/2 p-3 rounded-xl border border-white/5">
                    {currentStat.initiatives}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-start gap-3 p-3 bg-teal-primary/5 border border-teal-primary/10 rounded-xl">
                <Award className="w-5 h-5 text-teal-primary shrink-0 mt-0.5" />
                <p className="text-[10px] text-gray-400 leading-relaxed">
                  Information updated from current UN and regional grid metrics. Grid intensity measures total lifecycle grams of CO2 emitted per kilowatt-hour of electricity generated.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
