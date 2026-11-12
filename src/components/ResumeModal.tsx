import React, { useState } from 'react';
import { X, Download, Printer, Copy, Check, ExternalLink, Mail, MapPin, Github, Linkedin, Award, HeartHandshake, ShieldAlert } from 'lucide-react';
import { PERSONAL_INFO, COURSES, PROJECTS, SKILL_DOMAINS, ACHIEVEMENTS } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyText = () => {
    const text = `
CHINTHA DHERAZH
Student of NIAT (National Institute of Advanced Technologies)
B.Tech in Computer Science & Engineering (Artificial Intelligence & Machine Learning)
Email: ${PERSONAL_INFO.email} | Location: ${PERSONAL_INFO.location}
GitHub: ${PERSONAL_INFO.github} | LinkedIn: ${PERSONAL_INFO.linkedin}

ACADEMIC PROFILE & MILESTONES:
• B.Tech in CSE (AI & ML) - NIAT (National Institute of Advanced Technologies), Class of 2028
• Intermediate Education (10+2 MPC) - Graduated with High Distinction
• College Hackathon: Active Participant & Contributor in Hacktoberfest at NIAT

TECHNICAL SKILLS:
• Programming Languages: Python 3 (OOP, Automation, Data Structures), HTML5, CSS3, JavaScript
• AI Tools & Applications: AI Developer Tools, Prompt Engineering, Generative AI Workflows
• Web Development: Responsive Design, Modern Flexbox & CSS Grid, Glassmorphism, Neon Themes
• Developer Tools: Git, GitHub, Linux/Bash, VS Code

FEATURED PROJECTS:
1. Food AI Rescue (Team Lead / Developer)
   - Built with my team to rescue and redistribute surplus food from hotels and restaurants to community kitchens and shelters.
   - Stack: Python, HTML5, CSS3, AI Logistics Heuristics
   - Impact: 154,000+ meals tracked, 45+ partner hotels, 97.4% waste reduction efficiency.

2. Smart SOS for Hostel Students (Creator & Developer)
   - Emergency panic and room-telemetry alert system designed specifically for student safety in college hostels.
   - Stack: Python, WebSockets, HTML5, CSS3, Emergency Telemetry
   - Features: Sub-3-second trigger time, room-level floorplan mapping, instant multi-cast warden notifications.

3. NeuroVision Edge - Low-latency edge computer vision pipeline for detection and facial telemetry in Python.
4. MicroGrad Autograd - Neural network computation graph and autograd engine built from scratch in Python.

HONORS & ACTIVITIES:
• Hacktoberfest College Edition – Active Participant & Contributor at NIAT
• Food AI Rescue Platform Showcase – Team Lead & Developer
• Intermediate Board Examination – High First-Class Distinction Graduate
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-slate-900 border border-purple-500/30 rounded-2xl shadow-2xl overflow-hidden my-8 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Actions */}
        <div className="h-14 bg-slate-950 border-b border-purple-900/30 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white">Curriculum Vitae</span>
            <span className="text-xs text-purple-400 font-mono">NIAT Student Profile</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-white glass-card rounded-lg transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Plaintext'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-950 font-medium bg-gradient-to-r from-purple-400 to-sky-300 hover:opacity-90 rounded-lg transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors ml-2"
              aria-label="Close CV modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable CV Document Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-[#080B16] text-slate-200 space-y-8 font-sans">
          
          {/* CV Header */}
          <div className="border-b border-purple-900/30 pb-6 flex flex-col sm:flex-row items-center gap-6 justify-between text-center sm:text-left">
            <div className="space-y-1.5 flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white uppercase">
                {PERSONAL_INFO.name}
              </h1>
              <p className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-sky-400 font-medium">
                Student of NIAT · B.Tech in CSE (Artificial Intelligence & Machine Learning)
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-400 font-mono pt-1">
                <span>{PERSONAL_INFO.email}</span>
                <span>·</span>
                <span>{PERSONAL_INFO.location}</span>
                <span>·</span>
                <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="hover:text-purple-300 underline">
                  github.com/chinthadherazh
                </a>
                <span>·</span>
                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="hover:text-sky-300 underline">
                  linkedin.com/in/chinthadherazh
                </a>
              </div>
            </div>

            <img
              src={PERSONAL_INFO.avatarImage}
              alt={PERSONAL_INFO.name}
              referrerPolicy="no-referrer"
              className="w-20 h-20 rounded-full object-cover object-top border-2 border-purple-500/50 shadow-lg shadow-purple-500/20 shrink-0"
            />
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider border-b border-purple-900/30 pb-1">
              Education & Academic Milestones
            </h2>
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between text-sm">
                <span className="font-bold text-white">Bachelor of Technology (B.Tech) in CSE (AI & ML)</span>
                <span className="font-mono text-xs text-purple-400">2024 – 2028 (First Year)</span>
              </div>
              <div className="text-xs text-slate-300">
                <span className="text-sky-300 font-medium">NIAT (National Institute of Advanced Technologies)</span>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between text-sm">
                <span className="font-bold text-white">Intermediate Graduation (10+2 MPC)</span>
                <span className="font-mono text-xs text-emerald-400">Completed with Distinction</span>
              </div>
              <p className="text-xs text-slate-400">
                Core coursework: Python Programming, Frontend Web Development (HTML5 & CSS3), AI Tools, Mathematics for Computing, and Open-Source Collaboration.
              </p>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider border-b border-purple-900/30 pb-1">
              Technical Competencies
            </h2>
            <div className="space-y-2 text-xs">
              <div className="flex flex-col sm:flex-row sm:gap-2">
                <span className="font-bold text-white min-w-[160px]">Programming Languages:</span>
                <span className="text-slate-300">Python 3 (Core, OOP, Automation), HTML5, CSS3, JavaScript (DOM, Fetch)</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-2">
                <span className="font-bold text-white min-w-[160px]">AI Tools & Workflows:</span>
                <span className="text-slate-300">AI Coding & Research Tools, Prompt Engineering, Generative AI APIs, Computer Vision Basics</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-2">
                <span className="font-bold text-white min-w-[160px]">Frontend Design:</span>
                <span className="text-slate-300">Responsive Web Design, Flexbox & CSS Grid, Glassmorphism, Futuristic Dark UI, Animations</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-2">
                <span className="font-bold text-white min-w-[160px]">Version Control & Tools:</span>
                <span className="text-slate-300">Git, GitHub, Hacktoberfest collaboration, Linux command line</span>
              </div>
            </div>
          </div>

          {/* Featured Engineering Projects */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider border-b border-purple-900/30 pb-1">
              Featured Flagship Projects
            </h2>

            {PROJECTS.map((proj) => (
              <div key={proj.id} className="space-y-1.5 p-3 rounded-xl bg-slate-900/40 border border-purple-500/10">
                <div className="flex flex-wrap items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{proj.title}</span>
                    <span className="text-xs text-purple-300 font-mono">[{proj.tags.slice(0, 3).join(', ')}]</span>
                  </div>
                  <span className="text-xs font-mono text-sky-400">{proj.metrics[0].value} {proj.metrics[0].label}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {proj.longDescription}
                </p>
                <div className="text-[11px] font-mono text-slate-400">
                  Key Metrics: {proj.metrics.map((m) => `${m.label}: ${m.value}`).join(' · ')}
                </div>
              </div>
            ))}
          </div>

          {/* Honors & Benchmarks */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider border-b border-purple-900/30 pb-1">
              Achievements & Campus Activities
            </h2>
            <div className="space-y-2 text-xs text-slate-300">
              {ACHIEVEMENTS.map((ach) => (
                <div key={ach.title} className="flex flex-col sm:flex-row sm:justify-between p-2 rounded-lg bg-slate-900/30">
                  <div>
                    <span className="font-bold text-white">{ach.title}</span> – <span>{ach.description}</span>
                  </div>
                  <span className="text-purple-400 font-mono whitespace-nowrap ml-2">{ach.date}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
