"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Car, Zap, Flame, Trash2, Calendar, Droplet, ShoppingBag, Leaf, ChevronRight, ChevronLeft, RotateCcw } from "lucide-react";
import confetti from "canvas-confetti";

interface Question {
  id: string;
  category: string;
  icon: React.ReactNode;
  question: string;
  options: { label: string; value: number; description: string }[];
}

interface CarbonCalculatorProps {
  onScoreChange: (score: number) => void;
  onXPChange: (xp: number) => void;
}

export default function CarbonCalculator({ onScoreChange, onXPChange }: CarbonCalculatorProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const treeCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const questions: Question[] = [
    {
      id: "transport",
      category: "Transportation",
      icon: <Car className="w-5 h-5 text-emerald-primary" />,
      question: "What is your primary mode of daily commuting?",
      options: [
        { label: "Bicycle or Walking", value: 5, description: "Zero emissions commute" },
        { label: "Electric Vehicle (EV)", value: 12, description: "Charged on local grid" },
        { label: "Public Transit", value: 18, description: "Bus, train, or metro system" },
        { label: "Average Hybrid Car", value: 30, description: "Dual motor combustion" },
        { label: "Petrol / Diesel SUV", value: 55, description: "High displacement fossil fuel" },
      ],
    },
    {
      id: "electricity",
      category: "Home Energy",
      icon: <Zap className="w-5 h-5 text-yellow-500" />,
      question: "How is your household electricity primarily generated?",
      options: [
        { label: "100% Rooftop Solar / Wind", value: 2, description: "Completely green local generation" },
        { label: "Green Energy Contract", value: 8, description: "Purchased offset grid power" },
        { label: "Standard National Grid Mix", value: 25, description: "Mix of hydro, gas, and coal" },
        { label: "Coal / Fossil Heavy Grid", value: 50, description: "Coal-dependent regional grid" },
      ],
    },
    {
      id: "diet",
      category: "Diet & Food",
      icon: <Flame className="w-5 h-5 text-red-500" />,
      question: "How would you describe your typical weekly diet?",
      options: [
        { label: "Vegan / Plant-Based", value: 6, description: "Zero animal products" },
        { label: "Vegetarian / Pescatarian", value: 14, description: "Dairy, eggs, or seafood" },
        { label: "Low Meat (Poultry/Pork)", value: 24, description: "Red meat excluded or rare" },
        { label: "High Red Meat (Beef/Lamb)", value: 45, description: "Frequent beef or lamb consumption" },
      ],
    },
    {
      id: "shopping",
      category: "Consumption",
      icon: <ShoppingBag className="w-5 h-5 text-blue-500" />,
      question: "How often do you buy new clothing and electronics?",
      options: [
        { label: "Minimalist / Thrift", value: 5, description: "Only essentials or pre-owned" },
        { label: "Eco-Conscious Brands", value: 12, description: "Sustainable materials" },
        { label: "Average Consumer", value: 25, description: "Standard monthly shopping" },
        { label: "Trend-Follower / High Volume", value: 48, description: "Frequent brand-new upgrades" },
      ],
    },
    {
      id: "waste",
      category: "Waste Management",
      icon: <Trash2 className="w-5 h-5 text-orange-500" />,
      question: "How much of your household waste is recycled and composted?",
      options: [
        { label: "Zero Waste lifestyle", value: 3, description: "Almost all composted & recycled" },
        { label: "Careful Recycler", value: 9, description: "Standard sorting & low plastic" },
        { label: "Partial Sorting", value: 20, description: "Recycle paper/cans only" },
        { label: "No sorting / Direct Landfill", value: 38, description: "Everything goes to trash" },
      ],
    },
    {
      id: "water",
      category: "Water Usage",
      icon: <Droplet className="w-5 h-5 text-teal-primary" />,
      question: "What are your household's typical water usage patterns?",
      options: [
        { label: "Eco-Fixtures & Quick Showers", value: 4, description: "High conservation fixtures" },
        { label: "Standard 8-min Showers", value: 12, description: "Normal daily usage" },
        { label: "Frequent Baths & Watering", value: 28, description: "No flow restrictors, high volume" },
      ],
    },
    {
      id: "travel",
      category: "Air Travel",
      icon: <Calendar className="w-5 h-5 text-indigo-500" />,
      question: "How many flight hours do you take per year?",
      options: [
        { label: "None / Roadtrips only", value: 0, description: "Zero aviation emissions" },
        { label: "Short flights (< 5 hours)", value: 15, description: "Regional domestic trips" },
        { label: "Medium duration (5-20 hours)", value: 35, description: "Annual international holidays" },
        { label: "Frequent Long-haul (>20 hours)", value: 65, description: "Regular business or global trips" },
      ],
    },
  ];

  // Calculate real-time score dynamically based on answers state
  const currentScore = Object.keys(answers).length === 0 ? 0 : (() => {
    let scoreAcc = 0;
    questions.forEach((q) => {
      scoreAcc += answers[q.id] || 0;
    });
    return Math.min(100, Math.round((scoreAcc / 220) * 100));
  })();

  // Sync carbon score changes to parent component
  useEffect(() => {
    onScoreChange(currentScore);
  }, [currentScore, onScoreChange]);

  // Canvas drawing loop for the Tree
  useEffect(() => {
    const canvas = treeCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeTree = () => {
      canvas.width = 280;
      canvas.height = 320;
    };
    resizeTree();

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Score maps to tree health: lower score = lush green tree, higher score = dying red/orange tree
    const treeHealth = 1 - currentScore / 100; // 1 = fully healthy, 0 = dry/dead

    const drawBranch = (
      startX: number,
      startY: number,
      len: number,
      angle: number,
      branchWidth: number,
      depth: number
    ) => {
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      const endX = startX + Math.cos(angle) * len;
      const endY = startY + Math.sin(angle) * len;

      ctx.lineCap = "round";
      ctx.lineWidth = branchWidth;

      // Tree trunk/branch colors
      const trunkColorRed = Math.round(90 + (1 - treeHealth) * 60);
      const trunkColorGreen = Math.round(55 - (1 - treeHealth) * 20);
      const trunkColorBlue = Math.round(30 - (1 - treeHealth) * 10);
      ctx.strokeStyle = `rgb(${trunkColorRed}, ${trunkColorGreen}, ${trunkColorBlue})`;
      ctx.lineTo(endX, endY);
      ctx.stroke();

      if (depth === 0) {
        // Draw leaves/blossoms
        ctx.fillStyle = treeHealth > 0.6
          ? `rgba(16, 185, 129, ${0.45 + treeHealth * 0.4})` // Vibrant green
          : treeHealth > 0.3
          ? `rgba(234, 179, 8, ${0.5})` // Autumn yellow
          : `rgba(239, 68, 68, ${0.25})`; // Barely-there red/dry twigs

        const leafCount = Math.round(treeHealth * 12);
        for (let i = 0; i < leafCount; i++) {
          ctx.beginPath();
          const rx = endX + (Math.random() - 0.5) * 16;
          const ry = endY + (Math.random() - 0.5) * 16;
          ctx.arc(rx, ry, Math.random() * 4 + 2, 0, Math.PI * 2);
          ctx.fill();
        }
        return;
      }

      // Decreasing branch dimensions
      const nextLen = len * (0.7 + Math.random() * 0.15);
      const nextWidth = branchWidth * 0.7;

      // Adjust branching based on health (healthier = wider branches)
      const angleSpread = 0.25 + (0.15 * treeHealth);

      // Branching paths
      drawBranch(endX, endY, nextLen, angle - angleSpread, nextWidth, depth - 1);
      drawBranch(endX, endY, nextLen, angle + angleSpread, nextWidth, depth - 1);
    };

    // Draw the tree
    const rootX = canvas.width / 2;
    const rootY = canvas.height - 30;
    const initialLen = 65 + treeHealth * 20; // taller if healthy
    const initialWidth = 8 + treeHealth * 4;

    drawBranch(rootX, rootY, initialLen, -Math.PI / 2, initialWidth, 5);

    // Draw grass at the root
    ctx.fillStyle = treeHealth > 0.4
      ? `rgba(16, 185, 129, ${0.3})`
      : `rgba(139, 92, 26, ${0.2})`;
    ctx.beginPath();
    ctx.ellipse(rootX, rootY, 60, 8, 0, 0, Math.PI * 2);
    ctx.fill();

  }, [currentScore]);

  const handleSelectOption = (value: number) => {
    const qId = questions[currentStep].id;
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
      onXPChange(10); // Reward XP for filling questions
    } else {
      // Finished
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#10B981", "#0D9488", "#00FF66"],
      });
      onXPChange(150); // High XP bonus on completion
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
  };

  const currentQ = questions[currentStep];
  const selectedValue = answers[currentQ?.id];

  return (
    <section id="calculator" className="relative py-28 px-6 bg-gradient-to-b from-forest-dark to-[#04120B]">
      {/* Background radial highlight */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-primary/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-primary bg-emerald-primary/10 px-3 py-1 rounded-full border border-emerald-primary/20">
            Section 01
          </span>
          <h2 className="text-4xl md:text-5xl font-space font-bold mt-4 mb-3 tracking-tight">
            Impact Calculator
          </h2>
          <p className="text-gray-400 text-sm max-w-lg mx-auto">
            Answer a few simple questions to dynamically grow your virtual eco-tree and compute your footprints.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Form Step (Left) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="glass-card p-8 relative overflow-hidden">
              {/* Card Accent Glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-primary/20 to-teal-primary/0 rounded-bl-full pointer-events-none" />

              {/* Step indicator bar */}
              <div className="w-full h-1 bg-white/5 rounded-full mb-8 relative overflow-hidden">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-emerald-primary to-neon-green"
                  style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Active Step Question */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center">
                      {currentQ.icon}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-emerald-primary/75 tracking-wider uppercase">
                        {currentQ.category}
                      </p>
                      <p className="text-xs text-gray-500 font-medium">
                        Question {currentStep + 1} of {questions.length}
                      </p>
                    </div>
                  </div>

                  <h3 className="text-xl md:text-2xl font-space font-bold text-white leading-snug">
                    {currentQ.question}
                  </h3>

                  {/* Options */}
                  <div 
                    className="flex flex-col gap-3 mt-2"
                    role="radiogroup"
                    aria-label={currentQ.question}
                  >
                    {currentQ.options.map((opt) => {
                      const isSelected = selectedValue === opt.value;
                      return (
                        <button
                          key={opt.label}
                          onClick={() => handleSelectOption(opt.value)}
                          role="radio"
                          aria-checked={isSelected}
                          className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex justify-between items-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-primary ${
                            isSelected
                              ? "bg-emerald-primary/10 border-emerald-primary shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                              : "bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/15"
                          }`}
                        >
                          <div>
                            <p className={`font-semibold text-sm ${isSelected ? "text-white" : "text-gray-300"}`}>
                              {opt.label}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">{opt.description}</p>
                          </div>
                          {isSelected && (
                            <div className="w-5 h-5 rounded-full bg-emerald-primary flex items-center justify-center">
                              <Leaf className="w-3.5 h-3.5 text-forest-dark" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Form Navigation Controls */}
              <div className="flex items-center justify-between border-t border-white/5 mt-8 pt-6">
                <button
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors flex items-center gap-1.5 disabled:opacity-30 disabled:pointer-events-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-primary rounded-lg"
                  aria-label="Go back to the previous question"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>

                <div className="flex gap-2">
                  {selectedValue !== undefined && (
                    <button
                      onClick={handleNext}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-primary to-teal-primary text-forest-dark font-semibold text-sm hover:brightness-110 shadow-lg shadow-emerald-primary/15 transition-all flex items-center gap-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-primary"
                      aria-label={currentStep === questions.length - 1 ? "Complete footprint calculations" : "Continue to the next question"}
                    >
                      {currentStep === questions.length - 1 ? "Complete Impact" : "Continue"}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Real-time Indicator & Visual Tree (Right) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="glass-card w-full p-8 flex flex-col items-center relative overflow-hidden">
              {/* Sparkle details */}
              <div className="absolute top-4 left-4">
                <Leaf className="w-4 h-4 text-emerald-primary/30 rotate-12" />
              </div>
              <h3 className="font-space font-bold text-lg text-white mb-6">Your Real-time Impact Tree</h3>

              {/* Canvas Growth Area */}
              <div className="relative w-[280px] h-[320px] rounded-2xl bg-black/20 border border-white/5 overflow-hidden flex items-center justify-center">
                <canvas 
                  ref={treeCanvasRef} 
                  className="block" 
                  role="img"
                  aria-label="Visual eco-tree representing your carbon footprint. The tree grows green and full when your score is low, and turns yellow or dries up when your carbon footprint is high."
                />

                {/* Score Progress Ring Overlaid in Bottom Corner */}
                <div 
                  className="absolute bottom-4 right-4 bg-forest-dark/90 border border-white/10 backdrop-blur-md px-3 py-2 rounded-2xl flex items-center gap-2 shadow-xl"
                  role="progressbar"
                  aria-valuenow={currentScore}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Calculator completion score"
                >
                  {/* Small progress circle */}
                  <svg className="w-9 h-9 transform -rotate-90">
                    <circle cx="18" cy="18" r="14" className="stroke-white/10 fill-none" strokeWidth="2.5" />
                    <motion.circle
                      cx="18"
                      cy="18"
                      r="14"
                      className="stroke-emerald-primary fill-none"
                      strokeWidth="2.5"
                      strokeDasharray={2 * Math.PI * 14}
                      strokeDashoffset={2 * Math.PI * 14 * (1 - currentScore / 100)}
                      transition={{ duration: 0.5 }}
                    />
                  </svg>
                  <div>
                    <p className="text-[10px] text-gray-500 font-bold tracking-wider uppercase">Score</p>
                    <p className="text-sm font-space font-black text-white">{currentScore}</p>
                  </div>
                </div>
              </div>

              {/* Description message on tree health */}
              <p className="text-gray-400 text-xs text-center leading-relaxed mt-6 max-w-xs">
                {currentScore === 0
                  ? "Select values on the left to initialize tree growth calculations."
                  : currentScore < 30
                  ? "🌿 Excellent! Your choices foster a lush, healthy canopy with minimal carbon weight."
                  : currentScore < 60
                  ? "🍂 Moderate impact. The tree is healthy but shows standard stress from emissions."
                  : "🔥 Warning! High carbon choices severely dry and restrict branch development."}
              </p>

              {/* Reset option */}
              {Object.keys(answers).length > 0 && (
                <button
                  onClick={handleReset}
                  className="mt-4 text-xs font-semibold text-emerald-primary/60 hover:text-emerald-primary flex items-center gap-1 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-primary rounded"
                  aria-label="Reset all calculator inputs"
                >
                  <RotateCcw className="w-3 h-3" /> Reset Calculator
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
