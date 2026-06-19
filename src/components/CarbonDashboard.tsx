"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
import { TrendingDown, Users, Globe, Target, Award, Calendar } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface CarbonDashboardProps {
  score: number;
}

export default function CarbonDashboard({ score }: CarbonDashboardProps) {
  // Line chart - Monthly trends
  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Your Footprint (kg CO2)",
        data: [420, 390, 310, 280, 240, Math.round(score * 6)], // dynamic mapping
        borderColor: "#10B981",
        backgroundColor: "rgba(16, 185, 129, 0.08)",
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointBackgroundColor: "#10B981",
      },
      {
        label: "City Target Average",
        data: [380, 380, 370, 370, 360, 360],
        borderColor: "rgba(255, 255, 255, 0.2)",
        borderDash: [5, 5],
        fill: false,
        tension: 0.1,
        borderWidth: 1.5,
        pointBackgroundColor: "rgba(255, 255, 255, 0.2)",
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
        labels: {
          color: "rgba(255, 255, 255, 0.7)",
          font: { family: "Space Grotesk", size: 11 },
        },
      },
      tooltip: {
        backgroundColor: "rgba(15, 35, 25, 0.9)",
        titleColor: "#FFFFFF",
        bodyColor: "rgba(255,255,255,0.8)",
        borderColor: "rgba(16, 185, 129, 0.2)",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "rgba(255, 255, 255, 0.5)", font: { size: 10 } },
      },
      y: {
        grid: { color: "rgba(255, 255, 255, 0.05)" },
        ticks: { color: "rgba(255, 255, 255, 0.5)", font: { size: 10 } },
      },
    },
  };

  // Doughnut chart - Emission distribution
  const doughnutData = {
    labels: ["Transport", "Electricity", "Food", "Shopping", "Waste & Travel"],
    datasets: [
      {
        data: [35, 25, 20, 12, 8],
        backgroundColor: [
          "#10B981", // transport
          "#0D9488", // electricity
          "#38BDF8", // food
          "#F59E0B", // shopping
          "#6366F1", // waste
        ],
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          color: "rgba(255, 255, 255, 0.7)",
          font: { family: "Inter", size: 11 },
          boxWidth: 12,
        },
      },
      tooltip: {
        backgroundColor: "rgba(15, 35, 25, 0.9)",
        borderColor: "rgba(16, 185, 129, 0.2)",
        borderWidth: 1,
      },
    },
    cutout: "70%",
  };

  return (
    <section id="dashboard" className="relative py-28 px-6 bg-gradient-to-b from-[#030906] to-forest-dark">
      {/* Glow highlight */}
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-primary/3 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-primary bg-emerald-primary/10 px-3 py-1 rounded-full border border-emerald-primary/20">
            Section 03
          </span>
          <h2 className="text-4xl md:text-5xl font-space font-bold mt-4 mb-3 tracking-tight">
            Carbon Dashboard
          </h2>
          <p className="text-gray-400 text-sm max-w-lg mx-auto">
            Review detailed, dynamic calculations mapping your footprint against global target averages.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Card 1: Your Score */}
          <div className="glass-card p-6 flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between text-gray-400">
              <span className="text-xs font-medium uppercase tracking-wider">Your Impact Score</span>
              <Target className="w-4 h-4 text-emerald-primary" />
            </div>
            <div className="my-4">
              <span className="text-4xl font-space font-black text-white">{score}</span>
              <span className="text-xs text-gray-500 ml-1">/100</span>
            </div>
            <p className="text-[11px] text-gray-500">
              Lower is better. Calculated from recent inputs.
            </p>
          </div>

          {/* Card 2: City Average */}
          <div className="glass-card p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between text-gray-400">
              <span className="text-xs font-medium uppercase tracking-wider">City Average</span>
              <Users className="w-4 h-4 text-teal-primary" />
            </div>
            <div className="my-4">
              <span className="text-4xl font-space font-black text-white">55</span>
              <span className="text-xs text-gray-500 ml-1">/100</span>
            </div>
            <p className="text-[11px] text-emerald-primary flex items-center gap-1 font-medium">
              <TrendingDown className="w-3.5 h-3.5" />
              <span>{Math.max(0, 55 - score)}% lower than average</span>
            </p>
          </div>

          {/* Card 3: Global Average */}
          <div className="glass-card p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between text-gray-400">
              <span className="text-xs font-medium uppercase tracking-wider">Global Average</span>
              <Globe className="w-4 h-4 text-indigo-500" />
            </div>
            <div className="my-4">
              <span className="text-4xl font-space font-black text-white">68</span>
              <span className="text-xs text-gray-500 ml-1">/100</span>
            </div>
            <p className="text-[11px] text-gray-500">
              Target for safe climate levels: 20
            </p>
          </div>

          {/* Card 4: Weekly Change */}
          <div className="glass-card p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between text-gray-400">
              <span className="text-xs font-medium uppercase tracking-wider">Weekly Improvement</span>
              <Award className="w-4 h-4 text-yellow-500" />
            </div>
            <div className="my-4">
              <span className="text-4xl font-space font-black text-white">-12%</span>
            </div>
            <p className="text-[11px] text-emerald-primary font-medium">
              Equivalent to saving 48kg of wood
            </p>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Line Chart (Left) */}
          <div className="lg:col-span-7 glass-card p-6 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-space font-bold text-lg text-white">Monthly Emission Trends</h3>
                <p className="text-xs text-gray-400">Tracks cumulative carbon output (kg CO2) per month</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-400 border border-white/5 bg-white/3 px-3 py-1.5 rounded-lg">
                <Calendar className="w-3.5 h-3.5 text-emerald-primary" />
                <span>Last 6 Months</span>
              </div>
            </div>

            <div className="h-72 w-full relative">
              <Line data={lineData} options={lineOptions} />
            </div>
          </div>

          {/* Category breakdown (Right) */}
          <div className="lg:col-span-5 glass-card p-6 flex flex-col">
            <h3 className="font-space font-bold text-lg text-white mb-2">Category Contribution</h3>
            <p className="text-xs text-gray-400 mb-6">Distribution of carbon outputs based on lifestyle sectors</p>

            <div className="h-56 w-full relative flex items-center justify-center">
              <Doughnut data={doughnutData} options={doughnutOptions} />

              {/* Center total */}
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Calculated</span>
                <span className="text-2xl font-space font-black text-white">{Math.round(score * 6.5)} kg</span>
                <span className="text-[10px] text-gray-400 font-bold">CO₂ / Month</span>
              </div>
            </div>

            {/* Micro-bar charts for details */}
            <div className="flex flex-col gap-2 mt-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-primary" /> Transport
                </span>
                <span className="font-semibold text-white">35%</span>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-primary" style={{ width: "35%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
