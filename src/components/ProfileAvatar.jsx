import React from 'react';
import { profileImageBase64 } from '../assets/profileImage';
import { ShieldCheck, Sparkles, GraduationCap } from 'lucide-react';

export default function ProfileAvatar({ className = "" }) {
  return (
    <div className={`relative group ${className}`}>
      {/* Outer ambient glow rings matching theme */}
      <div className="absolute -inset-2 bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] rounded-3xl blur-2xl opacity-65 group-hover:opacity-100 transition duration-700 animate-pulse pointer-events-none"></div>
      
      {/* Cyberpunk corner brackets */}
      <div className="absolute -top-2.5 -left-2.5 w-6 h-6 border-t-2 border-l-2 border-[var(--primary)] z-30 pointer-events-none"></div>
      <div className="absolute -top-2.5 -right-2.5 w-6 h-6 border-t-2 border-r-2 border-[var(--primary)] z-30 pointer-events-none"></div>
      <div className="absolute -bottom-2.5 -left-2.5 w-6 h-6 border-b-2 border-l-2 border-[var(--accent)] z-30 pointer-events-none"></div>
      <div className="absolute -bottom-2.5 -right-2.5 w-6 h-6 border-b-2 border-r-2 border-[var(--accent)] z-30 pointer-events-none"></div>

      {/* Main portrait container */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-slate-900 via-[#0a0f1d] to-[#04060b] border-2 border-[var(--primary)]/40 p-2.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]">
        
        {/* Inner Media Frame */}
        <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-gradient-to-br from-slate-950 via-[#080e1d] to-[#030509] flex items-center justify-center">
          
          {/* Cyber grid & halo inside */}
          <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none"></div>
          <div className="absolute w-60 h-60 rounded-full bg-[var(--glow-color)] blur-3xl -top-12 -right-12 pointer-events-none opacity-60"></div>
          
          {/* Moving Laser Scanner Line */}
          <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent z-20 pointer-events-none animate-[bounce_4s_infinite] opacity-75"></div>

          {/* Abdul Rafey's Real Portrait Photo */}
          <img 
            src={profileImageBase64} 
            alt="Abdul Rafey - CS Student & Full-Stack Developer" 
            className="w-full h-full object-cover object-center z-10 transition-transform duration-700 group-hover:scale-105"
          />

          {/* Cyber HUD overlays & coordinates */}
          <div className="absolute top-3 left-3 z-20 pointer-events-none">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/75 text-[var(--primary)] border border-[var(--primary)]/30 backdrop-blur-md">
              DEV://ABDUL_RAFEY
            </span>
          </div>

          <div className="absolute top-3 right-3 z-20 pointer-events-none">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/75 text-emerald-400 border border-emerald-500/30 backdrop-blur-md flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              ONLINE
            </span>
          </div>

          {/* Bottom subtle gradient shadow for contrast */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#04060a] via-[#04060a]/80 to-transparent z-15 pointer-events-none"></div>

          {/* Identification badge floating at bottom */}
          <div className="absolute bottom-3 inset-x-3 z-20 flex items-center justify-between p-2.5 rounded-xl bg-slate-900/90 backdrop-blur-xl border border-white/10 shadow-xl">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
              <div>
                <p className="text-xs font-black text-white tracking-wide">Abdul Rafey</p>
                <p className="text-[10px] text-[var(--primary)] font-mono">Qarshi University • 5th Sem</p>
              </div>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-950/90 text-cyan-300 border border-cyan-700/50">
              24L-0043
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
