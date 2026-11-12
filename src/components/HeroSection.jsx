import React from 'react';
import { ArrowDown, ExternalLink, Code2, ShieldCheck, Sparkles, Send, GraduationCap } from 'lucide-react';
import GithubIcon from './GithubIcon';
import ProfileAvatar from './ProfileAvatar';
import { portfolioData } from '../data/portfolioData';
import { sound } from '../utils/audio';

export default function HeroSection({ onOpenResume }) {
  const { personal, stats } = portfolioData;

  const scrollToDesktop = () => {
    sound.playWhoosh();
    const el = document.getElementById('desktop-experience');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex flex-col justify-center overflow-hidden">
      
      {/* Background Ambient Glows & Tech Grid */}
      <div className="absolute inset-0 bg-cyber-grid opacity-35 pointer-events-none"></div>
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-purple-600/15 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        
        {/* Main Grid: Info on left, Stylized Portrait on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Introductions & Impact */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-6 backdrop-blur-md shadow-lg shadow-cyan-950/30">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Qarshi University, Lahore</span>
              <span className="text-slate-500">•</span>
              <span className="text-white font-semibold">Roll: {personal.rollNo}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-4">
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                {personal.name}
              </span>
            </h1>

            {/* Sub-Title */}
            <div className="flex flex-wrap items-center gap-2 text-lg sm:text-2xl font-semibold text-slate-300 mb-6">
              <span>{personal.title}</span>
              <span className="text-cyan-400 font-mono text-sm sm:text-base px-2.5 py-0.5 rounded-md bg-cyan-950/60 border border-cyan-800/40">
                BSCS 5th Semester
              </span>
            </div>

            {/* Bio Description */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl">
              {personal.shortBio}
            </p>

            {/* Call To Actions */}
            <div className="flex flex-wrap items-center gap-3 mb-10 w-full sm:w-auto">
              <button
                onClick={scrollToDesktop}
                className="group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              >
                <span>3D Desktop Monitor</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  sound.playWhoosh();
                  const el = document.getElementById('mobile-experience');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-600/25 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              >
                <span>📱 3D Smartphone Animation</span>
              </button>

              <a
                href={personal.githubUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.playClick()}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-medium text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-white/10 hover:border-cyan-500/40 transition-all duration-300 hover:text-white"
              >
                <GithubIcon className="w-4 h-4 text-cyan-400" />
                <span className="font-mono text-sm">@{personal.githubUsername}</span>
              </a>
            </div>

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl pt-6 border-t border-white/10">
              {stats.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900/40 border border-white/5 backdrop-blur-sm">
                  <p className="text-xs text-slate-400 font-mono">{item.label}</p>
                  <p className="text-base sm:text-lg font-bold text-white tracking-tight mt-0.5">{item.value}</p>
                  <p className="text-[11px] text-cyan-400/80 truncate">{item.detail}</p>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Stylized Cyber Portrait of Abdul Rafey */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="w-full max-w-md">
              <ProfileAvatar />
              
              {/* Floating feature pills around portrait */}
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-slate-900/80 border border-cyan-500/30 text-slate-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  SurgeTicket Load-Shedder
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-slate-900/80 border border-blue-500/30 text-slate-300">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  Web Launch Agency
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Cinematic Animated Scroll Indicator */}
      <div className="relative mt-12 flex flex-col items-center justify-center z-10">
        <button
          onClick={scrollToDesktop}
          className="group flex flex-col items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
        >
          <span className="text-[11px] font-mono tracking-widest uppercase text-slate-400 group-hover:text-cyan-300">
            Scroll to step inside 3D Desktop
          </span>
          <div className="w-6 h-10 rounded-full border-2 border-slate-600 group-hover:border-cyan-400 flex items-start justify-center p-1.5 transition-colors">
            <div className="w-1.5 h-2.5 bg-cyan-400 rounded-full animate-bounce"></div>
          </div>
        </button>
      </div>

    </section>
  );
}
