import React from 'react';
import { SKILL_DOMAINS, ACHIEVEMENTS } from '../data/portfolioData';
import { Award, Trophy, BookmarkCheck, GitPullRequest, Code2, Globe, HeartHandshake, BookOpen } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="py-20 bg-[#080B16] border-t border-purple-900/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="space-y-3 max-w-2xl mb-12">
          <div className="text-xs font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-sky-400 font-mono tracking-wider">
            TECHNICAL REPERTOIRE & HONORS
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Core Competencies & Recognized Milestones
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Focused on mastering AI tools, Python programming, responsive HTML/CSS web design, and open-source collaboration at NIAT.
          </p>
        </div>

        {/* 4 Skill Domains Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILL_DOMAINS.map((domain, dIdx) => (
            <div
              key={domain.category}
              className="glass-card rounded-2xl p-6 sm:p-8 space-y-6 hover:border-purple-500/40 transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    {domain.category}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {domain.headline}
                  </p>
                </div>
                {dIdx === 0 && <Code2 className="w-5 h-5 text-purple-400 shrink-0" />}
                {dIdx === 1 && <Globe className="w-5 h-5 text-sky-400 shrink-0" />}
                {dIdx === 2 && <HeartHandshake className="w-5 h-5 text-purple-400 shrink-0" />}
                {dIdx === 3 && <BookOpen className="w-5 h-5 text-cyan-400 shrink-0" />}
              </div>

              <div className="space-y-4">
                {domain.items.map((item) => (
                  <div
                    key={item.name}
                    className="p-3.5 bg-slate-950/60 rounded-xl border border-purple-500/10 hover:border-purple-500/25 transition-colors space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-white font-sans text-sm">
                        {item.name}
                      </span>
                      {/* Depth indicator as clean unboxed text */}
                      <span className="font-mono text-[11px] text-purple-300">
                        {item.depth}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-mono leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Honors & Milestones Strip */}
        <div className="mt-16 pt-12 border-t border-purple-900/30">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-mono text-purple-400 font-semibold block">
                CAMPUS & HACKATHON MILESTONES
              </span>
              <h3 className="text-2xl font-bold text-white mt-1">
                Honors & Accomplishments
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {ACHIEVEMENTS.map((ach) => (
              <div
                key={ach.title}
                className="p-5 glass-card rounded-xl space-y-3 flex flex-col justify-between hover:border-purple-400/40 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span className="text-sky-400">{ach.type}</span>
                    <span className="text-purple-300">{ach.date}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white leading-snug">
                    {ach.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {ach.description}
                  </p>
                </div>
                <div className="pt-2 border-t border-purple-900/20 text-[11px] font-mono text-slate-400">
                  {ach.organization}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
