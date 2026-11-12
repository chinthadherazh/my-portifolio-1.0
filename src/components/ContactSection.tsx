import React, { useState } from 'react';
import { Mail, Copy, Check, Send, Github, Linkedin, MapPin, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [emailCopied, setEmailCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 600);
  };

  return (
    <section id="contact" className="py-20 bg-[#080B16] border-t border-purple-900/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Outreach & Research Inquiries */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="text-xs font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-sky-400 font-mono tracking-wider">
                GET IN TOUCH
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Let's discuss AI tools, Python & collaborations.
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                I am actively seeking software internships, open-source projects, and mentorship in Artificial Intelligence, Python backend, and modern frontend development.
              </p>
            </div>

            {/* Direct Email One-Click Copy Card */}
            <div className="p-5 glass-card rounded-2xl space-y-3">
              <span className="text-xs font-mono text-slate-400 block">
                Primary Direct Channel
              </span>
              <div className="flex items-center justify-between gap-3 p-3 bg-slate-950/80 rounded-xl border border-purple-500/20">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                  <span className="text-sm font-mono text-white truncate font-medium">
                    {PERSONAL_INFO.email}
                  </span>
                </div>
                <button
                  onClick={copyEmail}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 hover:text-white bg-purple-950/60 hover:bg-purple-900/80 border border-purple-500/30 rounded-lg transition-colors shrink-0"
                  title="Copy email to clipboard"
                >
                  {emailCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{emailCopied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Academic & Geographic Verification */}
            <div className="space-y-2 text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-purple-400" />
                <span>{PERSONAL_INFO.location} · {PERSONAL_INFO.university}</span>
              </div>
              <div>
                Response turnaround: Typically under 24 hours for academic & internship inquiries.
              </div>
            </div>

            {/* Social channels */}
            <div className="pt-2 flex items-center gap-4 text-xs font-medium text-slate-300">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4 text-purple-400" />
                <span>GitHub Profile</span>
              </a>
              <span className="text-slate-700">·</span>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4 text-sky-400" />
                <span>LinkedIn Network</span>
              </a>
            </div>

          </div>

          {/* Right Column: Interactive Dispatch Form */}
          <div className="lg:col-span-7 glass-card rounded-2xl p-6 sm:p-8 shadow-xl">
            {formSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  Message Dispatched Successfully
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Thank you for reaching out! A direct notification has been logged for Chintha Dherazh.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="text-xs font-mono text-slate-300">
                      Your Full Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Recruiter / Mentor"
                      className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-purple-500/20 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="text-xs font-mono text-slate-300">
                      Your Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@organization.com"
                      className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-purple-500/20 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-subject" className="text-xs font-mono text-slate-300">
                    Subject / Area of Interest
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. AI Internship / Food Rescue or SOS Project Collaboration"
                    className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-purple-500/20 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="text-xs font-mono text-slate-300">
                    Message Narrative *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about the role, project collaboration, or mentorship opportunity..."
                    className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-purple-500/20 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 text-xs font-semibold text-slate-950 bg-gradient-to-r from-purple-400 to-sky-300 hover:opacity-95 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 font-sans"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Transmitting Message...' : 'Send Direct Message'}</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
