"use client";

import React, { useState } from "react";
import { Leaf, Heart, Send } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="relative w-full bg-forest-dark border-t border-white/5 pt-20 overflow-hidden">
      {/* Wave Animation Header */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] h-12">
        <svg
          className="relative block w-[200%] h-12"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="fill-emerald-primary/5 animate-wave"
            style={{ animationDuration: "16s" }}
          ></path>
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,4.75,55.05,16.33,87.09,29.11,154.06,55.88,248.56,71.07,321.39,56.44Z"
            className="fill-teal-primary/5 animate-wave"
            style={{ animationDuration: "24s" }}
          ></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & Description */}
          <div className="flex flex-col gap-6">
            <a href="#home" className="flex items-center gap-2 text-2xl font-space font-bold tracking-tight text-white">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-primary/10 border border-emerald-primary/30">
                <Leaf className="w-5 h-5 text-emerald-primary" />
              </div>
              <span className="bg-gradient-to-r from-white via-emerald-primary to-teal-primary bg-clip-text text-transparent">
                EcoPulseAI
              </span>
            </a>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Empowering global citizens to map, understand, and reduce carbon outputs with interactive AI modeling and collaborative gamification.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 hover:border-emerald-primary/30 text-gray-400 hover:text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-primary"
                aria-label="GitHub profile"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2A10 10 0 002 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 hover:border-emerald-primary/30 text-gray-400 hover:text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-primary"
                aria-label="Twitter profile"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 hover:border-emerald-primary/30 text-gray-400 hover:text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-primary"
                aria-label="LinkedIn profile"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>


          {/* Navigation Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-space font-semibold text-white tracking-wider text-sm uppercase">Navigation</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a href="#calculator" className="text-gray-400 hover:text-emerald-primary text-sm transition-colors">
                  Footprint Calculator
                </a>
              </li>
              <li>
                <a href="#dashboard" className="text-gray-400 hover:text-emerald-primary text-sm transition-colors">
                  Personal Dashboard
                </a>
              </li>
              <li>
                <a href="#challenges" className="text-gray-400 hover:text-emerald-primary text-sm transition-colors">
                  Gamified Challenges
                </a>
              </li>
              <li>
                <a href="#ai-coach" className="text-gray-400 hover:text-emerald-primary text-sm transition-colors">
                  AI Coach
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="flex flex-col gap-4">
            <h4 className="font-space font-semibold text-white tracking-wider text-sm uppercase">Resources</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-emerald-primary text-sm transition-colors">
                  Methodology & Math
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-emerald-primary text-sm transition-colors">
                  API Integrations
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-emerald-primary text-sm transition-colors">
                  Community Forums
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-emerald-primary text-sm transition-colors">
                  Open Source Code
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="flex flex-col gap-4">
            <h4 className="font-space font-semibold text-white tracking-wider text-sm uppercase">Eco Digest</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Get bi-weekly tips on smart lifestyle changes and sustainability news.
            </p>
            <form onSubmit={handleSubscribe} className="relative flex">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Enter your email to subscribe to the Eco Digest newsletter"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-primary/60 focus-visible:ring-2 focus-visible:ring-emerald-primary transition-all duration-300"
                required
              />
              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="absolute right-2 top-2 bottom-2 w-8 h-8 rounded-lg bg-emerald-primary flex items-center justify-center text-forest-dark hover:bg-neon-green transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-primary"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            {subscribed && (
              <p className="text-emerald-primary text-xs mt-1 animate-pulse">Thanks for joining the green wave! 🌿</p>
            )}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2026 EcoPulse AI. Crafted for a greener tomorrow.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-emerald-primary animate-pulse" /> by Google Advanced Agentic Coding
          </p>
        </div>
      </div>
    </footer>
  );
}
