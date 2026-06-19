"use client";

import React, { useState, useEffect, useRef } from "react";
import { Sparkles, Send, User, Bot, HelpCircle, Leaf, Zap, ShieldCheck } from "lucide-react";

interface Message {
  sender: "user" | "bot";
  text: string;
  suggestions?: { title: string; cost: string; saving: string }[];
  goal?: string;
  tip?: string;
}

export default function AICoach() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hello! I am your AI Eco Coach. I analyze your carbon habits and build personalized suggestions to reduce emissions. What area of your footprint are we focusing on today?",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const presetQuestions = [
    "How can I reduce my transportation emissions?",
    "Show me low-carbon diet alternatives.",
    "How can I audit my home electricity?",
    "How do Carbon Offset programs work?",
  ];

  const botResponses: Record<string, Message> = {
    "How can I reduce my transportation emissions?": {
      sender: "bot",
      text: "Transportation constitutes a large chunk of typical emissions. By switching from a petrol car to alternative modes, you make immediate improvements. Here is your roadmap:",
      suggestions: [
        { title: "Switch to Electric Commute", cost: "Medium", saving: "1.2 tons CO2/year" },
        { title: "Carpool 2x Weekly", cost: "Zero", saving: "340 kg CO2/year" },
        { title: "Work From Home (if possible)", cost: "Zero", saving: "450 kg CO2/year" },
      ],
      goal: "Attempt public transit or cycling for all commutes under 5 km this week.",
      tip: "Underinflated tires can lower fuel mileage by up to 3%. Keep tires topped up!",
    },
    "Show me low-carbon diet alternatives.": {
      sender: "bot",
      text: "Dietary habits carry significant environmental weight. Replacing red meat with plant proteins has the single highest food-impact reduction:",
      suggestions: [
        { title: "Meatless Mondays", cost: "Zero", saving: "180 kg CO2/year" },
        { title: "Swap Dairy for Oat/Almond Milk", cost: "Low", saving: "90 kg CO2/year" },
        { title: "Source Local Seasonal Veggies", cost: "Low", saving: "120 kg CO2/year" },
      ],
      goal: "Prepare 3 entirely plant-based dinners this week.",
      tip: "Food waste decomposing in landfills generates methane. Plan meals to buy only what you consume!",
    },
    "How can I audit my home electricity?": {
      sender: "bot",
      text: "Electricity usage is highly optimizable. Many grids still rely on coal or gas. Try these quick alternatives:",
      suggestions: [
        { title: "Install Smart Thermostats", cost: "Medium", saving: "400 kg CO2/year" },
        { title: "Switch to LED Lighting", cost: "Low", saving: "150 kg CO2/year" },
        { title: "Unplug standby phantom power", cost: "Zero", saving: "80 kg CO2/year" },
      ],
      goal: "Adjust thermostat 1°C cooler in winter / warmer in summer.",
      tip: "Washing clothes in cold water (30°C) uses 75% less energy than hot washes.",
    },
    "How do Carbon Offset programs work?": {
      sender: "bot",
      text: "Carbon offsetting lets you fund verified climate solutions (reforestation, methane capture, wind farms) to balance out your unavoidable emissions. Always select certified projects:",
      suggestions: [
        { title: "Reforestation offsets", cost: "Low", saving: "Varies based on trees" },
        { title: "Cookstove projects in developing areas", cost: "Low", saving: "Improves health + lowers wood use" },
      ],
      goal: "Research Gold Standard or VCS certified offset projects before purchasing offsets.",
      tip: "Reduction should always come first! Offsets are secondary tools for emissions you cannot stop yet.",
    },
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg: Message = { sender: "user", text: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    // Simulate response delay
    setTimeout(() => {
      setIsTyping(false);
      // Check if matches preset
      let matchedResponse = botResponses[textToSend];
      if (!matchedResponse) {
        // Fallback response generator
        matchedResponse = {
          sender: "bot",
          text: `Interesting question! Reducing emissions in that area is highly achievable. Let's start with basic eco-efficiency audits:`,
          suggestions: [
            { title: "Reduce single-use buying", cost: "Zero", saving: "150 kg CO2/year" },
            { title: "Use energy star appliances", cost: "High", saving: "300 kg CO2/year" },
          ],
          goal: "Formulate a simple 30-day plan targeting household waste output.",
          tip: "Small everyday actions build compound green benefits over time.",
        };
      }
      setMessages((prev) => [...prev, matchedResponse]);
    }, 1500);
  };

  return (
    <section id="ai-coach" className="relative py-28 px-6 bg-gradient-to-b from-[#04120B] to-[#030906]">
      {/* Glow blobs */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-teal-primary/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-primary bg-emerald-primary/10 px-3 py-1 rounded-full border border-emerald-primary/20">
            Section 02
          </span>
          <h2 className="text-4xl md:text-5xl font-space font-bold mt-4 mb-3 tracking-tight">
            AI Sustainability Coach
          </h2>
          <p className="text-gray-400 text-sm max-w-lg mx-auto">
            Consult our dedicated neural eco-assistant for dynamic, actionable guides to audit and compress your carbon trace.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Preset Questions Panel (Left) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="glass-card p-6 flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <HelpCircle className="w-5 h-5 text-emerald-primary" />
                  <h3 className="font-space font-bold text-white">Suggested Topics</h3>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed mb-6">
                  Select a topic to generate structured action lists, estimated carbon savings, and weekly eco-challenges.
                </p>
                <div className="flex flex-col gap-3">
                  {presetQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSendMessage(q)}
                      className="w-full text-left p-3 rounded-xl bg-white/3 hover:bg-white/8 border border-white/5 hover:border-emerald-primary/20 text-xs font-medium text-gray-300 hover:text-white transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-primary"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 p-4 bg-emerald-primary/5 rounded-xl border border-emerald-primary/10 flex gap-3 items-start">
                <ShieldCheck className="w-5 h-5 text-emerald-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-emerald-primary">Verified Math</h4>
                  <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">
                    All suggestions are scaled from EPA Carbon Equivalencies standards.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Interface (Right) */}
          <div className="lg:col-span-8 flex flex-col h-[520px]">
            <div className="glass-card flex-1 flex flex-col overflow-hidden relative">
              {/* Header */}
              <div className="px-6 py-4 border-b border-white/5 bg-white/2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-primary to-teal-primary flex items-center justify-center text-forest-dark">
                      <Bot className="w-5 h-5" />
                    </div>
                    {/* Active green status light */}
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-neon-green border-2 border-forest-dark animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-white flex items-center gap-1.5">
                      EcoPulse Coach
                      <Sparkles className="w-3.5 h-3.5 text-emerald-primary" />
                    </h3>
                    <p className="text-[10px] text-gray-400">Powered by Green Intelligence</p>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div 
                className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin"
                role="log"
                aria-live="polite"
                aria-label="AI Coach chat messages history"
              >
                {messages.map((msg, index) => {
                  const isBot = msg.sender === "bot";
                  return (
                    <div key={index} className={`flex gap-3 ${!isBot ? "flex-row-reverse" : ""}`}>
                      {/* Avatar */}
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
                          isBot
                            ? "bg-emerald-primary/10 border-emerald-primary/20 text-emerald-primary"
                            : "bg-white/5 border-white/10 text-gray-300"
                        }`}
                      >
                        {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                      </div>

                      {/* Content Bubble */}
                      <div className="max-w-[85%] flex flex-col gap-4">
                        <div
                          className={`p-4 rounded-2xl text-sm leading-relaxed ${
                            isBot
                              ? "bg-white/3 border border-white/5 text-gray-100"
                              : "bg-emerald-primary/15 border border-emerald-primary/25 text-white"
                          }`}
                        >
                          {msg.text}
                        </div>

                        {/* Structured Output Blocks for Bot Responses */}
                        {isBot && (msg.suggestions || msg.goal || msg.tip) && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                            {/* suggestions */}
                            {msg.suggestions && (
                              <div className="md:col-span-2 flex flex-col gap-2">
                                <p className="text-xs font-semibold text-emerald-primary flex items-center gap-1 uppercase tracking-wider">
                                  <Leaf className="w-3.5 h-3.5" /> Core Action Steps
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                  {msg.suggestions.map((s, idx) => (
                                    <div key={idx} className="p-3 bg-white/3 border border-white/5 rounded-xl">
                                      <h5 className="font-semibold text-xs text-white leading-snug">{s.title}</h5>
                                      <div className="flex justify-between items-center mt-3 text-[10px] text-gray-400">
                                        <span>Cost: {s.cost}</span>
                                        <span className="text-emerald-primary font-medium">{s.saving}</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Goal Card */}
                            {msg.goal && (
                              <div className="p-4 bg-gradient-to-br from-teal-primary/10 to-transparent border border-teal-primary/20 rounded-xl">
                                <p className="text-[10px] font-bold text-teal-primary uppercase tracking-wider mb-2 flex items-center gap-1">
                                  <Zap className="w-3 h-3" /> Weekly Coach Challenge
                                </p>
                                <p className="text-xs text-white leading-relaxed">{msg.goal}</p>
                              </div>
                            )}

                            {/* Tip Card */}
                            {msg.tip && (
                              <div className="p-4 bg-gradient-to-br from-emerald-primary/10 to-transparent border border-emerald-primary/20 rounded-xl">
                                <p className="text-[10px] font-bold text-emerald-primary uppercase tracking-wider mb-2 flex items-center gap-1">
                                  <Sparkles className="w-3 h-3" /> Eco Tip
                                </p>
                                <p className="text-xs text-gray-300 leading-relaxed">{msg.tip}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Thinking loader */}
                {isTyping && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-primary/10 border border-emerald-primary/20 text-emerald-primary flex items-center justify-center">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="p-4 bg-white/3 border border-white/5 rounded-2xl flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-primary/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-primary/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-primary/80 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-white/5 bg-white/2">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage(inputText);
                  }}
                  className="flex gap-3"
                >
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Ask about reducing emissions (e.g. diet swaps, flight offsets)..."
                    aria-label="Ask a question about reducing emissions"
                    className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-primary/60 focus-visible:ring-2 focus-visible:ring-emerald-primary transition-all duration-300"
                  />
                  <button
                    type="submit"
                    aria-label="Send message to AI Coach"
                    className="px-5 rounded-xl bg-gradient-to-r from-emerald-primary to-teal-primary text-forest-dark font-semibold hover:brightness-110 flex items-center justify-center transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-primary"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
