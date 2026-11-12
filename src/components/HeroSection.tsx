import React, { useState } from 'react';
import { ArrowDown, Code2, Sparkles, User, ExternalLink, Github, Linkedin, Mail, FileText, HeartHandshake, ShieldAlert } from 'lucide-react';
import { PERSONAL_INFO, KEY_METRICS } from '../data/portfolioData';
import { Hero3D } from './Hero3D';

interface HeroSectionProps {
  onOpenResume: () => void;
  onOpenTerminal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenResume, onOpenTerminal }) => {
  const [visualTab, setVisualTab] = useState<'3d' | 'portrait'>('3d');

  return (
    <section id="overview" className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden bg-[#080B16]">
      {/* Background Futuristic Grid & Glowing Orbs */}
      <div className="absolute inset-0 futuristic-grid opacity-40 pointer-events-none" />
      
      {/* Ambient Electric Blue & Neon Purple Spheres */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-sky-500/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Split-Screen Hero Grid (1440px desktop baseline) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Unboxed Metadata Kicker (Anti-Slop: Zero static pills) */}
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-slate-300">
              <span className="text-purple-400 font-bold">{PERSONAL_INFO.university}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-sky-400 font-semibold">{PERSONAL_INFO.batch}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>{PERSONAL_INFO.location}</span>
            </div>

            {/* Headline with Purple & Electric Blue Gradient */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.35rem] font-bold tracking-tight text-white leading-[1.12] [text-wrap:balance]">
              Pioneering practical <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-sky-300 to-cyan-300">AI tools, Python</span> & modern web solutions.
            </h1>

            {/* Introduction Card with Prominent Circular Photo on the Right */}
            <div className="p-5 sm:p-6 rounded-2xl glass-card border border-purple-500/35 neon-glow-purple flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1 space-y-3 text-left">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
                  <span className="text-xs font-mono text-emerald-400 font-semibold tracking-wide">
                    Available for Tech Internships · 2026/27
                  </span>
                </div>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                  Hello! I am <span className="text-white font-bold text-base sm:text-lg">{PERSONAL_INFO.name}</span>, a student of <span className="text-purple-300 font-semibold">NIAT</span> specializing in Artificial Intelligence and Machine Learning. Having completed intermediate with distinction and contributed in <span className="text-sky-300 font-medium">Hacktoberfest</span>, I build impactful real-world software—including <span className="text-purple-300 font-medium">Food AI Rescue</span> to eliminate hotel food waste and <span className="text-sky-300 font-medium">Smart SOS</span> to protect hostel students.
                </p>
                <div className="flex items-center gap-2 text-xs font-mono text-purple-300 pt-1">
                  <span className="text-sky-400 font-semibold">B.Tech CSE (AIML)</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>NIAT College</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>Portfolio Creator</span>
                </div>
              </div>

              {/* User Photo: Prominent Circular Frame with Futuristic Gradient Ring */}
              <div className="relative shrink-0 flex flex-col items-center group">
                <div className="relative p-1.5 rounded-full bg-gradient-to-tr from-purple-500 via-sky-400 to-indigo-500 shadow-2xl shadow-purple-500/40 neon-glow-purple">
                  <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden bg-slate-950 border-2 border-[#080B16] relative">
                    <img
                      src={PERSONAL_INFO.avatarImage}
                      alt={PERSONAL_INFO.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top group-hover:scale-108 transition-transform duration-500"
                    />
                  </div>
                  {/* Active Verified Glow Pin */}
                  <div className="absolute bottom-1 right-2 w-6 h-6 rounded-full bg-[#080B16] border-2 border-emerald-400 flex items-center justify-center shadow-md shadow-emerald-400/30" title="Verified Portfolio Owner">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                </div>
                <span className="mt-2 text-[11px] font-mono text-purple-200 font-medium px-2 py-0.5 rounded-full bg-purple-950/80 border border-purple-500/40 backdrop-blur-sm shadow-sm">
                  Chintha Dherazh
                </span>
              </div>
            </div>

            {/* Quick Project Pill Callouts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <a
                href="#projects"
                className="p-3 rounded-xl glass-card border border-purple-500/20 hover:border-purple-400/50 transition-all flex items-center gap-3 group"
              >
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div className="text-left overflow-hidden">
                  <span className="text-xs font-bold text-white block group-hover:text-purple-300 transition-colors">Food AI Rescue</span>
                  <span className="text-[11px] text-slate-400 truncate block">Hotel surplus redistribution</span>
                </div>
              </a>

              <a
                href="#projects"
                className="p-3 rounded-xl glass-card border border-sky-500/20 hover:border-sky-400/50 transition-all flex items-center gap-3 group"
              >
                <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-300 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <div className="text-left overflow-hidden">
                  <span className="text-xs font-bold text-white block group-hover:text-sky-300 transition-colors">Smart SOS System</span>
                  <span className="text-[11px] text-slate-400 truncate block">Emergency hostel security</span>
                </div>
              </a>
            </div>

            {/* Quick Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="px-5 py-2.5 text-sm font-semibold text-slate-950 bg-gradient-to-r from-purple-400 via-sky-300 to-cyan-300 hover:opacity-95 rounded-xl transition-all shadow-lg shadow-purple-500/25 whitespace-nowrap"
              >
                Explore Featured Projects
              </a>
              <a
                href="#ai-labs"
                className="px-5 py-2.5 text-sm font-medium text-slate-200 glass-card hover:text-white rounded-xl transition-colors whitespace-nowrap"
              >
                Interactive AI Labs
              </a>
              <button
                onClick={onOpenResume}
                className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-slate-300 hover:text-white glass-card rounded-xl transition-colors whitespace-nowrap"
              >
                <FileText className="w-4 h-4 text-purple-400" />
                <span>Resume CV</span>
              </button>
            </div>

            {/* Social & Channel Links */}
            <div className="pt-2 flex items-center gap-5 text-sm text-slate-400">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4 text-purple-400" />
                <span>GitHub</span>
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4 text-sky-400" />
                <span>LinkedIn</span>
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-purple-300" />
                <span>Email</span>
              </a>
              <button
                onClick={onOpenTerminal}
                className="flex items-center gap-1.5 text-sky-400 hover:text-sky-300 transition-colors font-mono text-xs"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>CLI Terminal</span>
              </button>
            </div>

          </div>

          {/* Right Column: Visual Container (3D Canvas / Photo View Switcher) */}
          <div className="lg:col-span-6 relative">
            {/* View Switcher Controls (Above Container) */}
            <div className="flex items-center justify-between mb-2 px-1">
              <div className="flex items-center gap-1 glass-card p-1 rounded-xl">
                <button
                  onClick={() => setVisualTab('3d')}
                  className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                    visualTab === '3d'
                      ? 'bg-purple-500/25 text-purple-300 border border-purple-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                  <span>3D AI Cortex</span>
                </button>
                <button
                  onClick={() => setVisualTab('portrait')}
                  className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                    visualTab === 'portrait'
                      ? 'bg-purple-500/25 text-purple-300 border border-purple-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <User className="w-3.5 h-3.5 text-purple-400" />
                  <span>Student Profile</span>
                </button>
              </div>

              <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
                {visualTab === '3d' ? 'Interactive WebGL · Drag to Rotate' : 'NIAT Student Developer'}
              </span>
            </div>

            {/* Container Body */}
            {visualTab === '3d' ? (
              <Hero3D />
            ) : (
              <div className="relative w-full h-[460px] sm:h-[540px] lg:h-[600px] rounded-2xl glass-card border border-purple-500/35 overflow-hidden shadow-2xl flex flex-col items-center justify-center p-6 neon-glow-purple text-center">
                <div className="relative p-2 rounded-full bg-gradient-to-tr from-purple-500 via-sky-400 to-indigo-500 shadow-2xl shadow-purple-500/50 mb-6 group">
                  <div className="w-52 h-52 sm:w-60 sm:h-60 rounded-full overflow-hidden bg-slate-950 border-4 border-[#080B16] relative">
                    <img
                      src={PERSONAL_INFO.avatarImage}
                      alt={PERSONAL_INFO.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute bottom-3 right-4 w-7 h-7 rounded-full bg-[#080B16] border-2 border-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-400/40" title="Verified Portfolio Owner">
                    <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                </div>

                <div className="space-y-1.5 max-w-md">
                  <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{PERSONAL_INFO.name}</h4>
                  <p className="text-xs sm:text-sm text-sky-400 font-mono font-medium">NIAT · B.Tech CSE (AIML) · Class of 2028</p>
                  <p className="text-xs text-slate-300 leading-relaxed pt-2 line-clamp-3">
                    {PERSONAL_INFO.about}
                  </p>
                  <div className="pt-3 flex items-center justify-center gap-2 text-xs font-mono text-purple-300">
                    <span className="px-2.5 py-1 rounded-full bg-purple-950/80 border border-purple-500/30">
                      Food AI Rescue Lead
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-sky-950/80 border border-sky-500/30">
                      Smart SOS Creator
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Full-Width Quantitative Metrics Strip */}
        <div className="mt-14 pt-8 border-t border-purple-900/30">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {KEY_METRICS.map((metric) => (
              <div key={metric.label} className="space-y-1 p-4 rounded-xl glass-card border border-purple-500/10">
                <div className="text-2xl sm:text-3xl lg:text-3xl font-bold tracking-tight text-white font-mono tabular-nums text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-sky-300">
                  {metric.value}
                </div>
                <div className="text-sm font-medium text-slate-200">
                  {metric.label}
                </div>
                <div className="text-xs text-slate-400">
                  {metric.context}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
