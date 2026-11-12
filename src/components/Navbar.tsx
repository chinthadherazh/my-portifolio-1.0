import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, Terminal, FileText, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  onOpenResume: () => void;
  onOpenTerminal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume, onOpenTerminal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Overview', href: '#overview' },
    { label: 'Projects', href: '#projects' },
    { label: 'AI Labs', href: '#ai-labs' },
    { label: 'Academics', href: '#academics' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-purple-900/30 bg-[#080B16]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark with gradient */}
        <a 
          href="#overview" 
          className="text-base sm:text-lg font-bold tracking-tight text-white hover:text-purple-300 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2.5 group"
        >
          <img
            src={PERSONAL_INFO.avatarImage}
            alt={PERSONAL_INFO.name}
            referrerPolicy="no-referrer"
            className="w-7 h-7 rounded-full object-cover object-top border border-purple-500/50 group-hover:border-purple-400 transition-colors"
          />
          <span>{PERSONAL_INFO.name}</span>
          <span className="text-xs font-mono text-purple-400 font-normal hidden sm:inline">· NIAT</span>
        </a>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-white transition-colors hover:underline underline-offset-8 decoration-purple-500/70 whitespace-nowrap shrink-0"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenTerminal}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium text-slate-300 glass-card rounded-lg hover:border-purple-400/50 hover:text-white transition-colors whitespace-nowrap shrink-0"
            title="Open Interactive CLI"
          >
            <Terminal className="w-3.5 h-3.5 text-sky-400" />
            <span>CLI</span>
          </button>
          
          <button
            onClick={onOpenResume}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 glass-card rounded-lg hover:border-purple-400/50 hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            <FileText className="w-3.5 h-3.5 text-purple-400" />
            <span>CV</span>
          </button>

          <a
            href="#contact"
            className="flex items-center gap-1 px-4 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-purple-400 to-sky-300 hover:opacity-90 rounded-lg transition-all shadow-md shadow-purple-500/20 whitespace-nowrap shrink-0"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenResume}
            className="px-2.5 py-1 text-xs font-medium text-slate-300 glass-card rounded-md"
          >
            CV
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-400 hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-purple-900/40 bg-[#080B16] px-4 pt-2 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-purple-950/40 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-2 flex items-center gap-2 border-t border-purple-900/30">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenTerminal(); }}
              className="flex-1 py-2 text-xs font-mono text-center text-slate-300 glass-card rounded-lg"
            >
              Launch CLI
            </button>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 py-2 text-xs font-semibold text-center text-slate-950 bg-gradient-to-r from-purple-400 to-sky-300 rounded-lg"
            >
              Get in Touch
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
