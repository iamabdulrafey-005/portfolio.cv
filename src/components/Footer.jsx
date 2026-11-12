import React from 'react';
import { ArrowUp, Heart, GraduationCap, Mail } from 'lucide-react';
import GithubIcon from './GithubIcon';
import { portfolioData } from '../data/portfolioData';
import { sound } from '../utils/audio';

export default function Footer() {
  const { personal } = portfolioData;

  const scrollToTop = () => {
    sound.playWhoosh();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 bg-[#030508] border-t border-white/5 text-slate-400 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Affiliation */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-white text-base">Abdul Rafey</span>
            <span className="text-xs text-cyan-400 font-mono px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800/40">
              Roll No: {personal.rollNo}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-mono">
            BSCS 5th Semester • Qarshi University, Lahore
          </p>
        </div>

        {/* Social / Direct Links */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <a
            href={personal.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition"
          >
            <GithubIcon className="w-4 h-4 text-cyan-400" />
            <span>GitHub</span>
          </a>
          <span className="text-slate-700">•</span>
          <a
            href={`mailto:${personal.email}`}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition"
          >
            <Mail className="w-4 h-4 text-blue-400" />
            <span>Email</span>
          </a>
          <span className="text-slate-700">•</span>
          <span className="text-emerald-400">CIT331 Systems Ready</span>
        </div>

        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-mono text-slate-300 hover:text-cyan-400 border border-white/10 transition cursor-pointer"
        >
          <span>Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>

      </div>
    </footer>
  );
}
