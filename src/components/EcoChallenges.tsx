"use client";

import React, { useState } from "react";
import { CheckCircle2, Trophy, Clock, Zap, Shield, Smile } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

interface Challenge {
  id: string;
  title: string;
  category: string;
  description: string;
  xp: number;
  duration: string;
  difficulty: "Easy" | "Medium" | "Hard";
  badge: string;
  icon: React.ReactNode;
}

interface EcoChallengesProps {
  onCompleteChallenge: (xp: number) => void;
}

export default function EcoChallenges({ onCompleteChallenge }: EcoChallengesProps) {
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [showCelebration, setShowCelebration] = useState<Challenge | null>(null);

  const challenges: Challenge[] = [
    {
      id: "bike",
      title: "Bike to Work Week",
      category: "Transport",
      description: "Replace all daily vehicle commutes under 8 km with bicycling or walking for 5 consecutive days.",
      xp: 250,
      duration: "5 Days",
      difficulty: "Medium",
      badge: "Velocity Champion",
      icon: <Trophy className="w-5 h-5 text-emerald-primary" />,
    },
    {
      id: "plastic",
      title: "No Single-Use Plastic",
      category: "Waste",
      description: "Avoid purchasing or using single-use plastic cups, straws, bags, or packaging materials for a week.",
      xp: 150,
      duration: "7 Days",
      difficulty: "Easy",
      badge: "Plastik Buster",
      icon: <Shield className="w-5 h-5 text-blue-400" />,
    },
    {
      id: "diet",
      title: "Green Protein Swap",
      category: "Food",
      description: "Replace all beef and pork meals with plant proteins (lentils, beans, tofu) for 10 days.",
      xp: 350,
      duration: "10 Days",
      difficulty: "Hard",
      badge: "Herbivore Elite",
      icon: <Zap className="w-5 h-5 text-orange-400" />,
    },
    {
      id: "energy",
      title: "Phantom Power Audit",
      category: "Home Energy",
      description: "Locate and unplug all standby electronics (TVs, chargers, microwave displays) when sleeping for 3 days.",
      xp: 120,
      duration: "3 Days",
      difficulty: "Easy",
      badge: "Standby Warden",
      icon: <Clock className="w-5 h-5 text-yellow-400" />,
    },
  ];

  const handleComplete = (challenge: Challenge) => {
    if (completedIds.includes(challenge.id)) return;

    setCompletedIds((prev) => [...prev, challenge.id]);
    onCompleteChallenge(challenge.xp);

    // Burst confetti
    confetti({
      particleCount: 80,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ["#10B981", "#38BDF8"],
    });
    confetti({
      particleCount: 80,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ["#10B981", "#38BDF8"],
    });

    // Show achievement card
    setShowCelebration(challenge);
    setTimeout(() => setShowCelebration(null), 4000);
  };

  return (
    <section id="challenges" className="relative py-28 px-6 bg-gradient-to-b from-[#030906] to-forest-dark">
      {/* Background neon dots */}
      <div className="absolute top-1/3 left-10 w-2 h-2 bg-emerald-primary rounded-full animate-ping" />
      <div className="absolute bottom-1/3 right-10 w-2 h-2 bg-teal-primary rounded-full animate-ping" />

      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-primary bg-emerald-primary/10 px-3 py-1 rounded-full border border-emerald-primary/20">
            Section 05
          </span>
          <h2 className="text-4xl md:text-5xl font-space font-bold mt-4 mb-3 tracking-tight">
            Active Eco Challenges
          </h2>
          <p className="text-gray-400 text-sm max-w-lg mx-auto">
            Gamify your carbon reductions. Select challenges, accomplish targets, and unlock verified eco-badges.
          </p>
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {challenges.map((c) => {
            const isCompleted = completedIds.includes(c.id);
            return (
              <div
                key={c.id}
                className={`glass-card p-6 flex flex-col justify-between relative overflow-hidden transition-all duration-500 ${
                  isCompleted ? "border-emerald-primary/40 bg-emerald-primary/5 shadow-md shadow-emerald-primary/5" : ""
                }`}
              >
                {/* Header info */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-primary bg-emerald-primary/10 px-2 py-0.5 rounded-md">
                      {c.category}
                    </span>
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                        c.difficulty === "Easy"
                          ? "text-green-400 bg-green-400/10"
                          : c.difficulty === "Medium"
                          ? "text-yellow-400 bg-yellow-400/10"
                          : "text-red-400 bg-red-400/10"
                      }`}
                    >
                      {c.difficulty}
                    </span>
                  </div>

                  <h3 className="text-lg font-space font-bold text-white mb-2 flex items-center gap-2">
                    {c.title}
                    {isCompleted && <CheckCircle2 className="w-5 h-5 text-emerald-primary shrink-0" />}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed mb-6">{c.description}</p>
                </div>

                {/* Bottom details */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gray-500" />
                      <span>{c.duration}</span>
                    </div>
                    <div className="flex items-center gap-1 font-semibold text-emerald-primary">
                      <Zap className="w-3.5 h-3.5" />
                      <span>+{c.xp} XP</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleComplete(c)}
                    disabled={isCompleted}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isCompleted
                        ? "bg-emerald-primary/10 text-emerald-primary border border-emerald-primary/20 cursor-default"
                        : "bg-white/5 border border-white/10 hover:border-emerald-primary/30 text-white"
                    }`}
                  >
                    {isCompleted ? "Completed" : "Claim Done"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Celebration Cards */}
        <AnimatePresence>
          {showCelebration && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed bottom-8 right-8 z-50 glass-card p-6 border border-emerald-primary max-w-sm flex items-start gap-4 shadow-2xl bg-forest-dark/95 backdrop-blur-xl"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-primary/10 border border-emerald-primary/30 flex items-center justify-center text-emerald-primary shrink-0">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-space font-bold text-white text-sm">Challenge Unlocked!</h4>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                  You accomplished the <strong className="text-white">{showCelebration.title}</strong> task.
                </p>
                <div className="flex gap-2 items-center mt-3">
                  <span className="text-[10px] font-bold text-emerald-primary bg-emerald-primary/10 px-2 py-0.5 rounded-full border border-emerald-primary/20 flex items-center gap-0.5">
                    <Smile className="w-3 h-3" /> Badge: {showCelebration.badge}
                  </span>
                  <span className="text-[10px] font-bold text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded-full border border-yellow-500/20">
                    +{showCelebration.xp} XP
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
