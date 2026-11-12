import React, { useState } from 'react';
import { 
  Send, 
  Mail, 
  MapPin, 
  Copy, 
  Check, 
  GraduationCap, 
  ExternalLink,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import GithubIcon from './GithubIcon';
import confetti from 'canvas-confetti';
import { portfolioData } from '../data/portfolioData';
import { sound } from '../utils/audio';

export default function ContactSection() {
  const { personal } = portfolioData;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const copyEmail = () => {
    sound.playClick();
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sound.playClick();
    setIsSubmitting(true);

    setTimeout(() => {
      sound.playSuccess();
      setIsSubmitting(false);
      setSubmitted(true);

      // Trigger celebratory confetti burst
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.7 }
        });
      } catch {
        // ignore
      }

      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 6000);
    }, 1000);
  };

  return (
    <section id="contact" className="relative py-28 bg-[#04060a] overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Connect & Collaborate</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Get In <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Open for software engineering internships, technical collaborations, and full-stack project inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Credentials & Info */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-white/10 shadow-xl space-y-6">
              
              <div>
                <h3 className="text-xl font-bold text-white mb-1">
                  Abdul Rafey
                </h3>
                <p className="text-xs text-cyan-400 font-mono">
                  Qarshi University, Lahore • Roll No: {personal.rollNo}
                </p>
                <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                  Feel free to send a message or copy my email directly. Whether you have questions about SurgeTicket, want to collaborate, or discuss potential opportunities, I'd love to hear from you.
                </p>
              </div>

              {/* Direct Email Card with One-Click Copy */}
              <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/30 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <p className="text-[11px] text-slate-400 font-mono">Direct Email</p>
                    <p className="text-xs sm:text-sm font-bold text-white font-mono truncate">{personal.email}</p>
                  </div>
                </div>

                <button
                  onClick={copyEmail}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-cyan-300 flex items-center gap-1.5 shrink-0 border border-white/10 transition"
                  title="Copy email to clipboard"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              {/* Campus Location */}
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-950/60 border border-white/5">
                <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 font-mono">Academic Campus</p>
                  <p className="text-xs sm:text-sm font-semibold text-white">Qarshi University, Lahore, Pakistan</p>
                </div>
              </div>

              {/* GitHub Link Card */}
              <a
                href={personal.githubUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.playClick()}
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-white/5 hover:border-cyan-500/30 transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400 shrink-0">
                    <GithubIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 font-mono">GitHub Profile</p>
                    <p className="text-xs sm:text-sm font-semibold text-white group-hover:text-cyan-400 transition">
                      @{personal.githubUsername}
                    </p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition" />
              </a>

            </div>

          </div>

          {/* Right Column: Direct Message Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-white/10 shadow-2xl relative">
              
              <h3 className="text-xl font-bold text-white mb-2">
                Send a Direct Message
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Fill in the details below and I will get back to you promptly.
              </p>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-3 animate-fadeIn">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Message Dispatched!</h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto">
                    Thank you for reaching out. Your message has been received and Abdul Rafey will reply shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-xs font-sans placeholder-slate-600 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-xs font-sans placeholder-slate-600 transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Subject / Topic *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Internship / SurgeTicket Inquiry / Collaboration"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-xs font-sans placeholder-slate-600 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi Abdul, I saw your SurgeTicket architecture and would like to discuss..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-xs font-sans placeholder-slate-600 transition resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl font-semibold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Transmitting Message...' : 'Send Message'}</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
