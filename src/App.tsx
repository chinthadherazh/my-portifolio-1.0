import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { NeuralPlayground } from './components/NeuralPlayground';
import { AcademicRoadmap } from './components/AcademicRoadmap';
import { SkillsSection } from './components/SkillsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { TerminalCLI } from './components/TerminalCLI';
import { ResumeModal } from './components/ResumeModal';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#080B16] text-slate-100 flex flex-col selection:bg-purple-500/30 selection:text-purple-200">
      {/* 3-Zone Top Bar Navigation */}
      <Navbar
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section with 3D Tensor Cortex & Quantitative Strip */}
        <HeroSection
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenTerminal={() => setIsTerminalOpen(true)}
        />

        {/* Selected Projects Bento Grid & Modal Lightbox */}
        <ProjectsShowcase />

        {/* AI Labs: Interactive Neural Backprop & Convolution Playground */}
        <NeuralPlayground />

        {/* 4-Year Academic Progression & Coursework */}
        <AcademicRoadmap />

        {/* Core Competencies & Recognized Achievements */}
        <SkillsSection />

        {/* Contact Outreach & Direct Copy */}
        <ContactSection />
      </main>

      {/* Quiet & Compliant Footer */}
      <Footer
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />

      {/* Interactive Terminal / CLI Playground */}
      <TerminalCLI
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />

      {/* ATS Curriculum Vitae Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
