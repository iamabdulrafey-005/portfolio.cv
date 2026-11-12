import React from 'react';

export default function ProfileAvatar({ className = "" }) {
  return (
    <div className={`relative group ${className}`}>
      {/* Outer ambient glow rings */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition duration-700 group-hover:duration-200 animate-pulse"></div>
      
      {/* Cyberpunk accent corner notches */}
      <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-cyan-400 z-20 pointer-events-none"></div>
      <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-cyan-400 z-20 pointer-events-none"></div>
      <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-purple-400 z-20 pointer-events-none"></div>
      <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-purple-400 z-20 pointer-events-none"></div>

      {/* Main portrait container */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900 via-[#0a0f1d] to-[#05070c] border border-cyan-500/30 p-2 shadow-2xl">
        <div className="relative rounded-xl overflow-hidden aspect-[4/5] bg-gradient-to-br from-slate-950 via-[#091122] to-[#04060b] flex items-center justify-center">
          
          {/* Background grid inside frame */}
          <div className="absolute inset-0 bg-cyber-grid opacity-30"></div>
          
          {/* Subtle tech lighting halo */}
          <div className="absolute w-56 h-56 rounded-full bg-cyan-500/20 blur-3xl -top-10 -right-10 pointer-events-none"></div>
          <div className="absolute w-56 h-56 rounded-full bg-blue-600/20 blur-3xl -bottom-10 -left-10 pointer-events-none"></div>

          {/* High-res vector portrait of Abdul Rafey with modern developer aesthetic */}
          <svg viewBox="0 0 400 500" className="w-full h-full object-cover z-10 transition-transform duration-700 group-hover:scale-105">
            <defs>
              <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffdbb5" />
                <stop offset="100%" stopColor="#e0a97d" />
              </linearGradient>
              <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="60%" stopColor="#0f172a" />
                <stop offset="100%" stopColor="#020617" />
              </linearGradient>
              <linearGradient id="hoodieGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="50%" stopColor="#0f172a" />
                <stop offset="100%" stopColor="#080d1a" />
              </linearGradient>
              <linearGradient id="cyberNeon" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
              <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0"/>
              </radialGradient>
              <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Ambient background rays */}
            <circle cx="200" cy="210" r="140" fill="none" stroke="url(#cyberNeon)" strokeWidth="1.5" strokeDasharray="6 8" opacity="0.4" className="animate-[spin_40s_linear_infinite]" />
            <circle cx="200" cy="210" r="170" fill="none" stroke="#06b6d4" strokeWidth="1" strokeDasharray="3 15" opacity="0.3" />

            {/* Neck & Trapezius */}
            <path d="M165 290 L165 340 L235 340 L235 290 Z" fill="#d49b6f" />
            <path d="M175 320 L200 345 L225 320 Z" fill="#ba8054" opacity="0.4" />

            {/* Hoodie / Tech Jacket */}
            <path d="M80 480 L110 370 L165 330 L235 330 L290 370 L320 480 Z" fill="url(#hoodieGrad)" />
            <path d="M165 330 L200 390 L235 330" fill="none" stroke="#334155" strokeWidth="3" />
            
            {/* Neon collar trim */}
            <path d="M165 330 Q200 365 235 330" fill="none" stroke="url(#cyberNeon)" strokeWidth="2.5" filter="url(#neonGlow)" />
            <path d="M200 390 L200 480" stroke="#06b6d4" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />

            {/* Developer Head / Face */}
            {/* Ears */}
            <ellipse cx="132" cy="225" rx="14" ry="24" fill="#e0a97d" />
            <ellipse cx="268" cy="225" rx="14" ry="24" fill="#e0a97d" />
            <ellipse cx="132" cy="225" rx="8" ry="14" fill="#c48e65" />
            <ellipse cx="268" cy="225" rx="8" ry="14" fill="#c48e65" />

            {/* Face Shape */}
            <path d="M142 180 C142 130 258 130 258 180 C258 245 240 300 200 300 C160 300 142 245 142 180 Z" fill="url(#skinGrad)" />

            {/* Modern Haircut & Fade */}
            <path d="M136 180 C134 135 155 105 200 102 C245 105 266 135 264 180 C262 170 250 145 200 142 C150 145 138 170 136 180 Z" fill="url(#hairGrad)" />
            <path d="M140 150 C155 100 220 90 260 120 C250 110 220 98 180 105 C150 110 140 135 140 150 Z" fill="#0f172a" />
            
            {/* Styled Hair Volume / Quiff */}
            <path d="M148 135 C160 90 210 82 255 108 C240 92 195 88 165 102 C150 110 145 125 148 135 Z" fill="#1e293b" />

            {/* Eyebrows */}
            <path d="M154 186 Q172 180 186 186" fill="none" stroke="#0f172a" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M214 186 Q228 180 246 186" fill="none" stroke="#0f172a" strokeWidth="4.5" strokeLinecap="round" />

            {/* Eyes */}
            <ellipse cx="170" cy="202" rx="10" ry="6" fill="#ffffff" />
            <circle cx="171" cy="202" r="4.5" fill="#1e293b" />
            <circle cx="172" cy="200" r="1.5" fill="#ffffff" />

            <ellipse cx="230" cy="202" rx="10" ry="6" fill="#ffffff" />
            <circle cx="229" cy="202" r="4.5" fill="#1e293b" />
            <circle cx="230" cy="200" r="1.5" fill="#ffffff" />

            {/* Modern Developer Glasses with holographic cyan frame */}
            <rect x="150" y="190" width="38" height="26" rx="8" fill="none" stroke="#06b6d4" strokeWidth="2.5" />
            <rect x="212" y="190" width="38" height="26" rx="8" fill="none" stroke="#06b6d4" strokeWidth="2.5" />
            <line x1="188" y1="202" x2="212" y2="202" stroke="#06b6d4" strokeWidth="2.5" />
            <line x1="135" y1="198" x2="150" y2="200" stroke="#06b6d4" strokeWidth="2" />
            <line x1="250" y1="200" x2="265" y2="198" stroke="#06b6d4" strokeWidth="2" />

            {/* Lens subtle reflections */}
            <path d="M154 194 L176 194 L160 212 L154 212 Z" fill="#ffffff" opacity="0.25" />
            <path d="M216 194 L238 194 L222 212 L216 212 Z" fill="#ffffff" opacity="0.25" />

            {/* Nose */}
            <path d="M200 200 L196 230 L204 230" fill="none" stroke="#ba8054" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

            {/* Beard & Mustache Trim (clean sharp cut) */}
            <path d="M188 244 Q200 248 212 244" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M186 254 Q200 258 214 254" fill="none" stroke="#c48e65" strokeWidth="3" strokeLinecap="round" />
            <path d="M176 270 Q200 292 224 270" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" opacity="0.75" />

            {/* Cyber HUD overlays & coordinates */}
            <text x="28" y="40" fill="#06b6d4" fontSize="10" fontFamily="monospace" opacity="0.8">DEV://ABDUL_RAFEY</text>
            <text x="28" y="55" fill="#64748b" fontSize="8" fontFamily="monospace">ROLL: 24L-0043</text>
            <text x="28" y="70" fill="#64748b" fontSize="8" fontFamily="monospace">QU_LAHORE::SEMESTER_5</text>
            <text x="280" y="40" fill="#10b981" fontSize="9" fontFamily="monospace" opacity="0.9">● ONLINE</text>
            
            {/* Hexagon tech decor */}
            <polygon points="340,90 355,82 370,90 370,108 355,116 340,108" fill="none" stroke="#3b82f6" strokeWidth="1.2" opacity="0.5" />
          </svg>

          {/* Bottom gradient overlay */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#05070c] via-[#05070c]/70 to-transparent z-15"></div>

          {/* Floating interactive identification badge */}
          <div className="absolute bottom-3 inset-x-3 z-20 flex items-center justify-between p-2.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-cyan-500/30 shadow-lg">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <div>
                <p className="text-xs font-bold text-white tracking-wide">Abdul Rafey</p>
                <p className="text-[10px] text-cyan-400 font-mono">Qarshi Univ • BSCS 5th</p>
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-700/50">
              24L-0043
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
