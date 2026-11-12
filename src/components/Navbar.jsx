import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, FileText, Menu, X, Sparkles, Terminal, Gamepad2 } from 'lucide-react';
import { profileImageBase64 } from '../assets/profileImage';
import { sound } from '../utils/audio';

export default function Navbar({ onOpenResume, onOpenTerminal, onToggleGame, isGameActive, soundActive, onToggleSound }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: "Intro", href: "#hero" },
    { label: "Desktop 3D", href: "#desktop-experience" },
    { label: "Mobile 3D", href: "#mobile-experience" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Academic", href: "#education" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNavClick = (href) => {
    sound.playClick();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'py-3 bg-[#070a12]/85 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-cyan-950/20' 
        : 'py-5 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand / Portrait Monogram */}
        <a 
          href="#hero" 
          onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
          className="group flex items-center gap-3 cursor-pointer"
        >
          <div className="relative flex items-center justify-center w-11 h-11 rounded-full p-[2px] bg-gradient-to-tr from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] shadow-lg shadow-[var(--primary)]/30 group-hover:scale-105 transition-all duration-300">
            <img 
              src={profileImageBase64} 
              alt="Abdul Rafey" 
              className="w-full h-full object-cover rounded-full"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#07090e]"></span>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-sm tracking-tight text-white flex items-center gap-2">
              Abdul Rafey
              <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-700/50">
                24L-0043
              </span>
            </span>
            <span className="text-[11px] text-slate-400 font-mono">Qarshi University • 5th Sem</span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 rounded-full border border-white/5 backdrop-blur-md">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.href)}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Game Mode Launcher */}
          <button
            onClick={() => {
              sound.playWhoosh();
              onToggleGame();
            }}
            title="Launch Interactive Cyber 4D Game"
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold rounded-lg border transition-all shadow-md cursor-pointer ${
              isGameActive 
                ? 'bg-[var(--primary)] text-slate-950 border-white font-extrabold shadow-[var(--primary)]/50 scale-105' 
                : 'bg-slate-800/90 hover:bg-slate-700 text-[var(--primary)] border-[var(--primary)]/40'
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isGameActive ? 'Exit Game' : 'Game Mode'}</span>
          </button>

          {/* Terminal Launcher */}
          <button
            onClick={() => {
              sound.playWhoosh();
              onOpenTerminal();
            }}
            title="Launch Interactive Dev Terminal"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-lg bg-slate-800/80 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 transition-all shadow-sm"
          >
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Terminal</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              onToggleSound();
              sound.playClick();
            }}
            title={soundActive ? "Mute interactive audio" : "Enable interactive audio"}
            className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-700 text-slate-300 hover:text-cyan-400 border border-white/10 transition-colors"
          >
            {soundActive ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          {/* CV Modal Trigger */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenResume();
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-sans shadow-md shadow-cyan-500/20 transition-all hover:scale-[1.02]"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-850 text-slate-300 hover:text-white border border-white/10"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 mx-4 p-4 rounded-2xl bg-slate-900/95 border border-white/10 backdrop-blur-2xl shadow-2xl flex flex-col gap-2">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.href)}
              className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Roll: 24L-0043</span>
            <span>BSCS 5th Sem</span>
          </div>
        </div>
      )}
    </header>
  );
}
