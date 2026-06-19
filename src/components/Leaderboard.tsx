"use client";

import React, { useState } from "react";
import { Trophy, ArrowUp, Zap, MapPin, Users, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

interface LeaderboardUser {
  rank: number;
  name: string;
  avatar: string;
  location: string;
  score: number; // carbon footprint score (lower is better)
  streak: number; // days active
  xp: number;
}

export default function Leaderboard() {
  const [filterScope, setFilterScope] = useState<"friends" | "city" | "country" | "global">("global");
  const [userRank, setUserRank] = useState(4); // User is ranked 4th initially

  const mockUsers: Record<string, LeaderboardUser[]> = {
    friends: [
      { rank: 1, name: "David Miller", avatar: "D", location: "Seattle, USA", score: 28, streak: 12, xp: 1420 },
      { rank: 2, name: "Sophia Chen", avatar: "S", location: "Vancouver, CA", score: 32, streak: 8, xp: 1100 },
      { rank: 3, name: "Marcus Aurelius", avatar: "M", location: "Rome, IT", score: 41, streak: 14, xp: 950 },
      { rank: 4, name: "You (Eco Guardian)", avatar: "Y", location: "Seattle, USA", score: 45, streak: 6, xp: 820 },
      { rank: 5, name: "Elena Rostova", avatar: "E", location: "Prague, CZ", score: 52, streak: 2, xp: 620 },
    ],
    city: [
      { rank: 1, name: "Green Seattle Org", avatar: "G", location: "Seattle, USA", score: 15, streak: 45, xp: 3900 },
      { rank: 2, name: "David Miller", avatar: "D", location: "Seattle, USA", score: 28, streak: 12, xp: 1420 },
      { rank: 3, name: "Sarah Jenkins", avatar: "S", location: "Seattle, USA", score: 38, streak: 9, xp: 1050 },
      { rank: 4, name: "You (Eco Guardian)", avatar: "Y", location: "Seattle, USA", score: 45, streak: 6, xp: 820 },
      { rank: 5, name: "Tom Adams", avatar: "T", location: "Seattle, USA", score: 48, streak: 3, xp: 710 },
    ],
    country: [
      { rank: 1, name: "EcoGrid Consortium", avatar: "E", location: "Denver, USA", score: 12, streak: 90, xp: 8400 },
      { rank: 2, name: "Claire Dupont", avatar: "C", location: "Portland, USA", score: 22, streak: 28, xp: 2100 },
      { rank: 3, name: "David Miller", avatar: "D", location: "Seattle, USA", score: 28, streak: 12, xp: 1420 },
      { rank: 4, name: "You (Eco Guardian)", avatar: "Y", location: "Seattle, USA", score: 45, streak: 6, xp: 820 },
    ],
    global: [
      { rank: 1, name: "Yuki Tanaka", avatar: "Y", location: "Tokyo, JP", score: 8, streak: 120, xp: 9800 },
      { rank: 2, name: "Björn Larsson", avatar: "B", location: "Stockholm, SE", score: 11, streak: 60, xp: 7400 },
      { rank: 3, name: "Amara Okoro", avatar: "A", location: "Lagos, NG", score: 19, streak: 45, xp: 5200 },
      { rank: 4, name: "You (Eco Guardian)", avatar: "Y", location: "Seattle, USA", score: 45, streak: 6, xp: 820 },
      { rank: 5, name: "Sophia Chen", avatar: "S", location: "Vancouver, CA", score: 32, streak: 8, xp: 1100 },
    ],
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <span className="text-yellow-400 font-bold text-sm bg-yellow-400/10 px-2 py-0.5 rounded-full border border-yellow-400/20 shadow-[0_0_8px_rgba(234,179,8,0.15)]">🥇 Gold</span>;
    if (rank === 2) return <span className="text-gray-300 font-bold text-sm bg-gray-300/10 px-2 py-0.5 rounded-full border border-gray-300/20">🥈 Silver</span>;
    if (rank === 3) return <span className="text-amber-600 font-bold text-sm bg-amber-600/10 px-2 py-0.5 rounded-full border border-amber-600/20">🥉 Bronze</span>;
    return <span className="text-gray-500 font-semibold text-sm">#{rank}</span>;
  };

  const handleBumpRank = () => {
    if (userRank > 3) {
      setUserRank((prev) => prev - 1);
      confetti({
        particleCount: 120,
        spread: 80,
        colors: ["#10B981", "#EAB308", "#38BDF8"],
      });
    }
  };

  // Adjust rankings array dynamically based on User's rank change
  const currentList = mockUsers[filterScope].map((u) => {
    if (u.name.includes("You")) {
      return { ...u, rank: userRank };
    }
    return u;
  });

  // Sort list based on rank
  currentList.sort((a, b) => a.rank - b.rank);

  return (
    <section id="leaderboard" className="relative py-28 px-6 bg-gradient-to-b from-forest-dark to-[#04120B]">
      {/* Glow highlight */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-96 h-96 bg-emerald-primary/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-primary bg-emerald-primary/10 px-3 py-1 rounded-full border border-emerald-primary/20">
            Section 06
          </span>
          <h2 className="text-4xl md:text-5xl font-space font-bold mt-4 mb-3 tracking-tight">
            Leaderboard Rankings
          </h2>
          <p className="text-gray-400 text-sm max-w-lg mx-auto">
            Compare footprints with friends, neighbors, or global citizens. Keep streaks active to scale rankings.
          </p>
        </div>

        {/* Scope Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {(["friends", "city", "country", "global"] as const).map((scope) => (
            <button
              key={scope}
              onClick={() => setFilterScope(scope)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all flex items-center gap-1.5 cursor-pointer ${
                filterScope === scope
                  ? "bg-emerald-primary text-forest-dark border-emerald-primary shadow-lg shadow-emerald-primary/20"
                  : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
              }`}
            >
              {scope === "friends" && <Users className="w-3.5 h-3.5" />}
              {scope === "city" && <MapPin className="w-3.5 h-3.5" />}
              {scope === "country" && <Globe className="w-3.5 h-3.5" />}
              {scope === "global" && <Trophy className="w-3.5 h-3.5" />}
              {scope}
            </button>
          ))}
        </div>

        {/* Leaderboard Table List */}
        <div className="glass-card p-6 flex flex-col gap-3 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-teal-primary/10 to-transparent rounded-bl-full pointer-events-none" />

          <div className="flex justify-between items-center text-xs font-semibold text-gray-500 uppercase tracking-widest px-4 pb-3 border-b border-white/5">
            <span>Rank & User</span>
            <div className="flex gap-12">
              <span>Streak</span>
              <span>Footprint</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <AnimatePresence mode="popLayout">
              {currentList.map((user) => {
                const isYou = user.name.includes("You");
                return (
                  <motion.div
                    key={user.name}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${
                      isYou
                        ? "bg-emerald-primary/10 border-emerald-primary/30 shadow-[0_0_15px_rgba(16,185,129,0.08)]"
                        : "bg-white/3 border-white/5 hover:border-white/10"
                    }`}
                  >
                    {/* Rank & User details */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 flex justify-center shrink-0">
                        {getRankBadge(user.rank)}
                      </div>
                      <div className="w-9 h-9 rounded-full bg-emerald-primary/10 border border-emerald-primary/20 flex items-center justify-center font-bold text-xs text-white">
                        {user.avatar}
                      </div>
                      <div>
                        <h4 className={`text-sm font-semibold ${isYou ? "text-white" : "text-gray-200"}`}>
                          {user.name}
                        </h4>
                        <p className="text-[10px] text-gray-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {user.location}
                        </p>
                      </div>
                    </div>

                    {/* Streak & Carbon footprint scores */}
                    <div className="flex items-center gap-10">
                      <div className="flex items-center gap-1 text-xs text-orange-400 font-semibold">
                        <Zap className="w-3.5 h-3.5 fill-orange-400" />
                        <span>{user.streak}d</span>
                      </div>
                      <div className="w-16 text-right">
                        <span className="font-space font-black text-sm text-white">
                          {user.score}
                        </span>
                        <span className="text-[10px] text-gray-500 block">/100</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Simulate Action bottom trigger */}
          {userRank > 1 && (
            <div className="flex items-center justify-center mt-6 pt-4 border-t border-white/5">
              <button
                onClick={handleBumpRank}
                className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-primary/40 hover:bg-white/8 text-xs font-semibold text-gray-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <ArrowUp className="w-3.5 h-3.5 text-emerald-primary animate-bounce" />
                Improve My Rank (Reduce Carbon)
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
