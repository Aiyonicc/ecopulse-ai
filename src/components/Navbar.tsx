"use client";

import React, { useState, useEffect } from "react";
import { Leaf, Menu, X, Sun, Moon, User, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  userStats: { xp: number; level: number };
}

export default function Navbar({ activeSection, setActiveSection, userStats }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Calculator", href: "#calculator" },
    { name: "Dashboard", href: "#dashboard" },
    { name: "Challenges", href: "#challenges" },
    { name: "AI Coach", href: "#ai-coach" },
    { name: "Virtual Forest", href: "#forest" },
    { name: "Timeline", href: "#timeline" },
    { name: "Leaderboard", href: "#leaderboard" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(href.substring(1));
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-forest-dark/75 backdrop-blur-md border-b border-white/5 py-4 shadow-lg shadow-black/20"
            : "bg-transparent py-6 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, "#home")}
            className="flex items-center gap-2 text-2xl font-space font-bold tracking-tight text-white group"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-primary/10 border border-emerald-primary/30 group-hover:border-neon-green/50 transition-colors duration-300">
              <Leaf className="w-5 h-5 text-emerald-primary group-hover:text-neon-green transition-colors duration-300 animate-pulse" />
              <div className="absolute inset-0 rounded-xl bg-neon-green/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="bg-gradient-to-r from-white via-emerald-primary to-teal-primary bg-clip-text text-transparent group-hover:brightness-110 transition-all">
              EcoPulse<span className="font-light text-sm tracking-widest text-emerald-primary align-super ml-1">AI</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/5 border border-white/5 rounded-full p-1.5 backdrop-blur-md">
            {navLinks.map((link) => {
              const linkId = link.href.substring(1);
              const isActive = activeSection === linkId;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-full ${
                    isActive ? "text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute inset-0 bg-emerald-primary/20 border border-emerald-primary/35 shadow-[0_0_10px_rgba(16,185,129,0.15)] rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* User Gamification Stats & Quick Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-all cursor-pointer"
              title="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-yellow-400 animate-spin-slow" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Profile / XP Badges */}
            <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-emerald-primary/10 to-teal-primary/10 border border-emerald-primary/20 rounded-full">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-primary">
                <Award className="w-4 h-4" />
                <span>LVL {userStats.level}</span>
              </div>
              <div className="w-[1px] h-4 bg-white/10" />
              <div className="text-xs font-medium text-gray-300">
                <span>{userStats.xp} XP</span>
              </div>
              <div className="w-7 h-7 rounded-full bg-emerald-primary flex items-center justify-center text-xs font-bold text-forest-dark border border-white/20 shadow-md">
                U
              </div>
            </div>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex lg:hidden w-10 h-10 rounded-xl items-center justify-center bg-white/5 border border-white/10 text-white cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-forest-dark/95 backdrop-blur-lg pt-28 px-6 flex flex-col justify-between pb-10 lg:hidden"
          >
            <div className="flex flex-col gap-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-primary/60 border-b border-white/5 pb-2">
                Navigation
              </p>
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.substring(1);
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className={`text-xl font-semibold tracking-tight transition-colors duration-300 ${
                        isActive
                          ? "text-emerald-primary glow-text-green"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      {link.name}
                    </a>
                  );
                })}
              </nav>
            </div>

            <div className="flex flex-col gap-6 border-t border-white/5 pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-primary flex items-center justify-center font-bold text-forest-dark border border-white/20">
                    U
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Eco Guardian</h4>
                    <p className="text-xs text-gray-400">Level {userStats.level} • {userStats.xp} XP</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-gray-300"
                >
                  {isDarkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
