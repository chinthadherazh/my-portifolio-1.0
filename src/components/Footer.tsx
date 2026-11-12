import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Terminal } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onOpenTerminal: () => void;
  onOpenResume: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTerminal, onOpenResume }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-purple-900/30 bg-[#080B16] py-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-purple-900/20">
          <div className="space-y-1">
            <span className="text-base font-bold text-white tracking-tight">
              {PERSONAL_INFO.name}
            </span>
            <p className="text-xs text-purple-300 font-mono">
              Student of NIAT · B.Tech CSE (AIML) · Python & AI Tools
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-slate-300">
            <a href="#overview" className="hover:text-white transition-colors">Overview</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#ai-labs" className="hover:text-white transition-colors">AI Labs</a>
            <a href="#academics" className="hover:text-white transition-colors">Academics</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            <button onClick={onOpenResume} className="hover:text-white transition-colors">Resume CV</button>
            <button onClick={onOpenTerminal} className="hover:text-white transition-colors flex items-center gap-1 font-mono text-sky-400">
              <Terminal className="w-3 h-3" />
              <span>CLI</span>
            </button>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div>
            © {new Date().getFullYear()} Chintha Dherazh · Student of NIAT · Engineered with Three.js, React & Tailwind CSS.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
