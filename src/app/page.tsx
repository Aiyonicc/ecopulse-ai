"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EarthCanvas from "@/components/EarthCanvas";
import CarbonCalculator from "@/components/CarbonCalculator";
import AICoach from "@/components/AICoach";
import CarbonDashboard from "@/components/CarbonDashboard";
import VirtualForest from "@/components/VirtualForest";
import EcoChallenges from "@/components/EcoChallenges";
import Leaderboard from "@/components/Leaderboard";
import JourneyTimeline from "@/components/JourneyTimeline";
import ImpactVisualizer from "@/components/ImpactVisualizer";
import GlobalGlobeMap from "@/components/GlobalGlobeMap";
import CommunityStories from "@/components/CommunityStories";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [carbonScore, setCarbonScore] = useState(45);
  const [userStats, setUserStats] = useState({ xp: 820, level: 4 });

  // Update user stats when claiming challenge XP
  const handleCompleteChallenge = (xpGain: number) => {
    setUserStats((prev) => {
      const nextXp = prev.xp + xpGain;
      const nextLevel = Math.floor(nextXp / 500) + 1; // 500 XP per level
      return { xp: nextXp, level: nextLevel };
    });
  };

  // Scroll active section tracking (Intersection Observer)
  useEffect(() => {
    const sections = [
      "home",
      "calculator",
      "dashboard",
      "challenges",
      "ai-coach",
      "forest",
      "timeline",
      "leaderboard",
    ];

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleScrollToCalculator = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById("calculator");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleScrollToForest = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById("forest");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#05160E] text-gray-100 flex flex-col font-sans">
      {/* Dynamic Cursor Glow (soft ambient backdrop) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-primary/10 rounded-full filter blur-[150px] animate-pulse-slow" />
        <div className="absolute top-[40%] right-[-10%] w-[45%] h-[45%] bg-teal-primary/5 rounded-full filter blur-[150px] animate-pulse-slow" style={{ animationDelay: "2s" }} />
      </div>

      {/* Global Navigation Header */}
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} userStats={userStats} />

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden px-6"
      >
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Hero Typography (Left) */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left">
            {/* Tagline */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 w-fit mx-auto lg:mx-0">
              <span className="w-2 h-2 rounded-full bg-neon-green animate-ping" />
              <span className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-emerald-primary">
                A new era of ecological awareness
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl xl:text-7xl font-space font-extrabold tracking-tight text-white leading-[1.1] md:leading-[1.05]">
              Every Choice Leaves a{" "}
              <span className="bg-gradient-to-r from-emerald-primary via-neon-green to-teal-primary bg-clip-text text-transparent">
                Footprint
              </span>
              .<br />Let&apos;s Make Yours Beautiful.
            </h1>

            {/* Brief */}
            <p className="text-gray-400 text-sm md:text-base max-w-lg leading-relaxed mx-auto lg:mx-0">
              EcoPulse AI converts abstract carbon footprints into dynamic, interactive landscapes. Calculate inputs, consult our neural coach, and heal your digital forest.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-4">
              <a
                href="#calculator"
                onClick={handleScrollToCalculator}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-primary to-teal-primary text-forest-dark font-space font-bold text-sm md:text-base hover:brightness-110 shadow-lg shadow-emerald-primary/15 transition-all flex items-center gap-2 group cursor-pointer"
              >
                Calculate My Impact
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </a>
              <a
                href="#forest"
                onClick={handleScrollToForest}
                className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-primary/40 text-white font-space font-bold text-sm md:text-base hover:bg-white/8 transition-all flex items-center gap-2 cursor-pointer"
              >
                Watch Earth Heal
              </a>
            </div>

            {/* Small metrics line */}
            <div className="grid grid-cols-3 gap-6 border-t border-white/5 pt-8 mt-6 max-w-md mx-auto lg:mx-0">
              <div>
                <span className="text-white font-space font-bold text-lg md:text-xl block">10+</span>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Interactive Areas</span>
              </div>
              <div>
                <span className="text-white font-space font-bold text-lg md:text-xl block">95+</span>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Performance Rating</span>
              </div>
              <div>
                <span className="text-white font-space font-bold text-lg md:text-xl block">CO₂</span>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Real-time Auditing</span>
              </div>
            </div>
          </div>

          {/* Interactive Hero Globe (Right) */}
          <div className="lg:col-span-5 relative w-full h-[320px] md:h-[450px] xl:h-[500px] flex items-center justify-center">
            {/* Circular glowing frames behind globe */}
            <div className="absolute inset-0 rounded-full border border-emerald-primary/10 scale-95 pointer-events-none" />
            <div className="absolute inset-4 rounded-full border border-teal-primary/5 scale-90 pointer-events-none" />
            <EarthCanvas score={carbonScore} />
          </div>

        </div>
      </section>

      {/* Main Interactive Sections */}
      <main className="relative z-10 w-full flex flex-col">
        {/* Section 1: Footprint Calculator */}
        <CarbonCalculator onScoreChange={setCarbonScore} onXPChange={handleCompleteChallenge} />

        {/* Section 3: Carbon Dashboard */}
        <CarbonDashboard score={carbonScore} />

        {/* Section 5: Eco Challenges */}
        <EcoChallenges onCompleteChallenge={handleCompleteChallenge} />

        {/* Section 2: AI Sustainability Coach */}
        <AICoach />

        {/* Section 4: Virtual Forest */}
        <VirtualForest />

        {/* Section 7: Journey Timeline */}
        <JourneyTimeline />

        {/* Section 8: Impact Visualizer */}
        <ImpactVisualizer />

        {/* Section 9: Global Intensity Map */}
        <GlobalGlobeMap />

        {/* Section 6: Leaderboard */}
        <Leaderboard />

        {/* Section 10: Community Stories */}
        <CommunityStories />
      </main>

      {/* Global Wavy Footer */}
      <Footer />
    </div>
  );
}
