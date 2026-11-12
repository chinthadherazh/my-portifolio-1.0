import React, { useState } from 'react';
import { ArrowUpRight, Github, ExternalLink, Code2, Sparkles, X, Star, HeartHandshake, ShieldAlert } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project, ProjectCategory } from '../types';

export const ProjectsShowcase: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = selectedCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 bg-[#080B16] border-t border-purple-900/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-purple-900/30">
          <div className="space-y-2 max-w-xl">
            <div className="text-xs font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-sky-400 font-mono tracking-wider">
              FLAGSHIP ENGINEERING PROJECTS
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Civic AI & Real-World Solutions
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Practical platforms built with Python, AI tools, and responsive frontend architectures solving real-world challenges in college hostels and community food rescue.
            </p>
          </div>

          {/* Functional Interactive Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 glass-card rounded-xl overflow-x-auto max-w-full">
            {[
              { id: 'all' as const, label: 'All Projects' },
              { id: 'deep-learning' as const, label: 'AI & Logistics' },
              { id: 'systems-dsa' as const, label: 'Hostel Safety & IoT' },
              { id: 'computer-vision' as const, label: 'Computer Vision' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                  selectedCategory === tab.id
                    ? 'bg-gradient-to-r from-purple-500/30 to-sky-500/30 text-white border border-purple-500/50 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Bento Box Layout */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {filteredProjects.map((project, index) => {
            const isWide = index === 0 || index === 1; // Both Food AI Rescue and Smart SOS get prominent layout
            const colSpanClass = isWide ? 'lg:col-span-6' : 'lg:col-span-6';

            return (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`${colSpanClass} group cursor-pointer glass-card rounded-2xl overflow-hidden transition-all duration-300 flex flex-col hover:border-purple-500/40 hover:-translate-y-1`}
              >
                {/* Media Container with 16:9 Aspect Ratio Scrim */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080B16] via-[#080B16]/30 to-transparent" />
                  
                  {/* Category unboxed text */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2 text-xs font-mono text-slate-200 bg-slate-950/85 px-2.5 py-1 rounded-md border border-purple-500/30 backdrop-blur-sm">
                    {project.id === 'food-ai-rescue' ? (
                      <HeartHandshake className="w-3.5 h-3.5 text-purple-400" />
                    ) : project.id === 'smart-sos' ? (
                      <ShieldAlert className="w-3.5 h-3.5 text-sky-400" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    )}
                    <span>{project.categoryLabel}</span>
                  </div>

                  {/* GitHub Stars */}
                  <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 text-xs font-mono text-slate-300 bg-slate-950/85 px-2.5 py-1 rounded-md border border-slate-800/80 backdrop-blur-sm">
                    <Star className="w-3 h-3 text-amber-400 fill-current" />
                    <span className="tabular-nums">{project.starsCount}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    {/* Unboxed Metadata Line */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 font-mono">
                      {project.tags.slice(0, 4).map((tag, tIdx) => (
                        <React.Fragment key={tag}>
                          <span className="text-purple-300/90">{tag}</span>
                          {tIdx < Math.min(3, project.tags.length - 1) && (
                            <span aria-hidden="true" className="text-slate-600">·</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors flex items-center justify-between">
                      <span>{project.title}</span>
                      <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-sky-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </h3>

                    <p className="text-sm text-slate-300 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Metrics preview row */}
                  <div className="pt-3 border-t border-purple-900/20 grid grid-cols-2 gap-3">
                    {project.metrics.slice(0, 2).map((m) => (
                      <div key={m.label} className="space-y-0.5">
                        <span className="text-[11px] font-mono text-slate-400 block">{m.label}</span>
                        <span className="text-sm font-mono font-bold text-sky-400 tabular-nums">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Fullscreen Modal / Lightbox */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/90 backdrop-blur-md overflow-y-auto"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-slate-900 border border-purple-500/30 rounded-2xl shadow-2xl overflow-hidden my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header & Close */}
            <div className="relative aspect-video max-h-80 w-full overflow-hidden bg-slate-950">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
              
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 text-slate-300 bg-slate-950/80 hover:bg-slate-950 hover:text-white rounded-lg border border-purple-500/30 transition-colors z-20"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-2 text-xs font-mono text-sky-400 mb-2">
                  <span className="text-purple-300">{selectedProject.categoryLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-slate-300 font-sans">{selectedProject.subtitle}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  {selectedProject.title}
                </h3>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
              {/* Detailed Narrative */}
              <div>
                <h4 className="text-xs font-semibold text-purple-400 uppercase tracking-wider font-mono mb-2">
                  Project Narrative & Objectives
                </h4>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {selectedProject.longDescription}
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-950/80 rounded-xl border border-purple-500/20">
                {selectedProject.metrics.map((m) => (
                  <div key={m.label} className="space-y-1">
                    <span className="text-xs font-mono text-slate-400">{m.label}</span>
                    <div className="text-lg font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-sky-300 tabular-nums">
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Architecture Highlights */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-purple-400 uppercase tracking-wider font-mono">
                  Key System Architecture & Modules
                </h4>
                <ul className="space-y-2 text-sm text-slate-300">
                  {selectedProject.architectureDetails.map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2.5">
                      <span className="text-sky-400 font-mono text-xs mt-0.5">0{dIdx + 1}.</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Code Snippet Preview */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <Code2 className="w-3.5 h-3.5 text-purple-400" />
                    <span>Python & Implementation Architecture</span>
                  </span>
                  <span className="text-sky-400">{selectedProject.techStack[0]}</span>
                </div>
                <pre className="p-4 bg-slate-950 border border-slate-800/80 rounded-xl overflow-x-auto text-xs font-mono text-slate-300 leading-relaxed">
                  <code>{selectedProject.codeSnippet}</code>
                </pre>
              </div>

              {/* Action Bar */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 font-mono">
                  <span>Stack:</span>
                  {selectedProject.techStack.map((tech, idx) => (
                    <React.Fragment key={tech}>
                      <span className="text-purple-300">{tech}</span>
                      {idx < selectedProject.techStack.length - 1 && <span>·</span>}
                    </React.Fragment>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={`https://github.com/${selectedProject.repoName}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    <Github className="w-4 h-4 text-purple-400" />
                    <span>View Repository</span>
                  </a>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-4 py-2 text-xs font-medium text-slate-950 bg-gradient-to-r from-purple-400 to-sky-300 hover:opacity-90 rounded-lg transition-colors"
                  >
                    Close Viewer
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
