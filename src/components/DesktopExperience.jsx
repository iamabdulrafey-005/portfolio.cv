import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Laptop, 
  ExternalLink, 
  ShieldCheck, 
  Cpu, 
  Terminal, 
  Layers, 
  Sparkles, 
  Code2, 
  CheckCircle2, 
  Flame, 
  Zap, 
  Globe, 
  Maximize2, 
  Minimize2, 
  Smartphone,
  Eye,
  Activity
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { sound } from '../utils/audio';

gsap.registerPlugin(ScrollTrigger);

export default function DesktopExperience({ onOpenResume, onOpenTerminal }) {
  const containerRef = useRef(null);
  const monitorFrameRef = useRef(null);
  const monitorStandRef = useRef(null);
  const innerScreenRef = useRef(null);
  const screenContentRef = useRef(null);
  const hudIndicatorRef = useRef(null);
  const floatingTagsRef = useRef(null);

  const [activeTab, setActiveTab] = useState('surgeticket');
  const [zoomStage, setZoomStage] = useState('emerging');
  const [isZoomedManual, setIsZoomedManual] = useState(false);

  const { projects, personal } = portfolioData;
  const surgeProject = projects.find(p => p.id === 'surgeticket');
  const webLaunchProject = projects.find(p => p.id === 'weblaunch');

  // Interactive 3D Mouse Parallax Tilt
  const handleMouseMove = (e) => {
    if (isZoomedManual || !monitorFrameRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const xPos = (clientX / innerWidth - 0.5) * 2; // -1 to 1
    const yPos = (clientY / innerHeight - 0.5) * 2; // -1 to 1

    gsap.to(monitorFrameRef.current, {
      rotateY: xPos * 14,
      rotateX: -yPos * 10,
      duration: 0.6,
      ease: 'power1.out',
      transformPerspective: 1600
    });

    if (floatingTagsRef.current) {
      gsap.to(floatingTagsRef.current, {
        x: xPos * 25,
        y: yPos * 20,
        duration: 0.8,
        ease: 'power1.out'
      });
    }
  };

  const handleMouseLeave = () => {
    if (isZoomedManual || !monitorFrameRef.current) return;
    gsap.to(monitorFrameRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 1,
      ease: 'power2.out'
    });
    if (floatingTagsRef.current) {
      gsap.to(floatingTagsRef.current, {
        x: 0,
        y: 0,
        duration: 1,
        ease: 'power2.out'
      });
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    const monitor = monitorFrameRef.current;
    const stand = monitorStandRef.current;
    const hud = hudIndicatorRef.current;

    if (!container || !monitor) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=2400',
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const prog = self.progress;
            if (prog < 0.25) {
              setZoomStage('emerging');
            } else if (prog >= 0.25 && prog <= 0.75) {
              setZoomStage('inside');
            } else {
              setZoomStage('reversing');
            }
          }
        }
      });

      // 1. Giant Monitor Emerges in 3D (0% -> 25%)
      tl.fromTo(monitor, 
        { 
          scale: 0.75, 
          rotateX: 28, 
          rotateY: -10, 
          y: 140, 
          opacity: 0.4 
        },
        { 
          scale: 1, 
          rotateX: 0, 
          rotateY: 0, 
          y: 0, 
          opacity: 1, 
          duration: 1.5,
          ease: 'power2.out' 
        }
      )
      .fromTo(stand, 
        { opacity: 0, y: 60 }, 
        { opacity: 1, y: 0, duration: 1 }, 
        "<"
      );

      // 2. Seamless Zoom In: Stepping Inside the Giant Monitor (25% -> 50%)
      tl.to(monitor, {
        scale: 3.8,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        duration: 2.5,
        ease: 'power3.inOut'
      })
      .to(stand, {
        opacity: 0,
        y: 350,
        duration: 1.5,
        ease: 'power2.in'
      }, "<")
      .to(hud, {
        opacity: 0.95,
        scale: 1.05,
        duration: 0.5
      }, "<0.5");

      // 3. Pinned Full View Inside the Screen (50% -> 70%)
      tl.to(monitor, {
        scale: 3.8,
        duration: 1.8
      });

      // 4. Zoom out / Reversal back into Desktop Monitor (70% -> 100%)
      tl.to(monitor, {
        scale: 1,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        duration: 2.2,
        ease: 'power3.out'
      })
      .to(stand, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power2.out'
      }, "<0.5")
      .to(hud, {
        opacity: 0.6,
        scale: 1,
        duration: 0.5
      }, "<");

    }, container);

    return () => ctx.revert();
  }, []);

  const manualZoomIn = () => {
    sound.playWhoosh();
    setIsZoomedManual(true);
    gsap.to(monitorFrameRef.current, {
      scale: 3.8,
      rotateY: 0,
      rotateX: 0,
      duration: 1.3,
      ease: 'power3.inOut'
    });
    gsap.to(monitorStandRef.current, {
      opacity: 0,
      y: 260,
      duration: 0.8
    });
  };

  const manualZoomOut = () => {
    sound.playClick();
    setIsZoomedManual(false);
    gsap.to(monitorFrameRef.current, {
      scale: 1,
      rotateY: 0,
      rotateX: 0,
      duration: 1.3,
      ease: 'power3.out'
    });
    gsap.to(monitorStandRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8
    });
  };

  const jumpToPhone = () => {
    sound.playWhoosh();
    const phoneEl = document.getElementById('mobile-experience');
    if (phoneEl) {
      phoneEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="desktop-experience" 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-[#030509]"
    >
      {/* Background Ambience & Cyber Grid */}
      <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-[var(--glow-color)] rounded-full blur-[180px] pointer-events-none opacity-40 transition-all duration-700"></div>

      {/* Floating HUD Indicator */}
      <div 
        ref={hudIndicatorRef} 
        className="absolute top-16 sm:top-20 z-40 px-5 py-2.5 rounded-full bg-slate-900/95 border border-[var(--primary)] backdrop-blur-xl shadow-2xl flex items-center gap-3 transition-all duration-300"
      >
        <div className="flex h-3 w-3 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--primary)] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--primary)]"></span>
        </div>
        <div className="flex items-center gap-2.5 text-xs font-mono">
          <span className="text-[var(--primary)] font-bold uppercase tracking-wider">
            Experience 01: Giant 3D Desktop
          </span>
          <span className="text-slate-500 hidden sm:inline">|</span>
          <span className="text-slate-200 hidden sm:inline">
            {zoomStage === 'emerging' && "Scroll or click buttons to step inside"}
            {zoomStage === 'inside' && "✨ You are now inside Abdul Rafey's Desktop"}
            {zoomStage === 'reversing' && "Scroll further to animate 3D Smartphone"}
          </span>
        </div>
      </div>

      {/* Floating Holographic 3D Orbit Badges around Monitor */}
      <div ref={floatingTagsRef} className="absolute inset-0 pointer-events-none z-30 hidden md:block">
        <div className="absolute top-24 left-12 p-3 rounded-2xl bg-slate-900/90 border border-cyan-500/40 backdrop-blur-md shadow-2xl shadow-cyan-950/40 animate-float">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-300">
            <Flame className="w-4 h-4 text-cyan-400" />
            <span>SurgeTicket (VaultProxy)</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Adaptive Load-Shedding • 10,000 req/s</p>
        </div>

        <div className="absolute top-28 right-12 p-3 rounded-2xl bg-slate-900/90 border border-purple-500/40 backdrop-blur-md shadow-2xl shadow-purple-950/40 animate-float" style={{ animationDelay: '1.5s' }}>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-300">
            <ShieldCheck className="w-4 h-4 text-purple-400" />
            <span>Qarshi University, Lahore</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">BSCS 5th Sem • Roll 24L-0043</p>
        </div>

        <div className="absolute bottom-28 left-16 p-3 rounded-2xl bg-slate-900/90 border border-blue-500/40 backdrop-blur-md shadow-2xl shadow-blue-950/40 animate-float" style={{ animationDelay: '3s' }}>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-300">
            <Globe className="w-4 h-4 text-blue-400" />
            <span>Web Launch Platform</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Vercel Edge Global CDN</p>
        </div>
      </div>

      {/* Direct Interactive Control Buttons */}
      <div className="absolute bottom-6 sm:bottom-8 z-40 flex flex-wrap items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900/95 border border-[var(--primary)] backdrop-blur-xl shadow-2xl">
        {isZoomedManual ? (
          <button
            onClick={manualZoomOut}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-[var(--primary)] text-xs font-mono border border-[var(--primary)]/40 transition cursor-pointer"
          >
            <Minimize2 className="w-3.5 h-3.5" />
            <span>Zoom Out (Monitor)</span>
          </button>
        ) : (
          <button
            onClick={manualZoomIn}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-[var(--primary)] text-xs font-mono border border-[var(--primary)]/40 transition cursor-pointer"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Zoom Inside Screen</span>
          </button>
        )}

        <button
          onClick={jumpToPhone}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30 transition cursor-pointer"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Next: 3D Smartphone Animation →</span>
        </button>
      </div>

      {/* 3D Perspective Stage Container */}
      <div className="relative w-full max-w-6xl px-4 flex flex-col items-center perspective-1600 z-20">
        
        {/* Giant Realistic Desktop Monitor */}
        <div 
          ref={monitorFrameRef}
          className="relative w-full aspect-[16/10] max-h-[76vh] rounded-3xl p-3 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-950 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.95),0_0_65px_var(--glow-color)] border-2 border-slate-600/90 preserve-3d transition-shadow duration-500"
          style={{ transformOrigin: 'center center' }}
        >
          {/* Top Webcam, Ambient Light Sensor & Studio Mic */}
          <div className="absolute top-1.5 inset-x-0 flex items-center justify-center gap-2.5 z-30 pointer-events-none">
            <div className="w-2 h-2 rounded-full bg-slate-950 border border-[var(--primary)]/50"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
          </div>

          {/* Screen Inner Chassis with Specular Glass Sheen */}
          <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#060913] border border-black/90 flex flex-col shadow-inner">
            
            {/* macOS Chrome Bar with Live Tab Switcher */}
            <div className="h-10 px-4 bg-[#0a0f1d] border-b border-white/10 flex items-center justify-between shrink-0 select-none z-20">
              
              {/* Traffic Light Buttons */}
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 hover:opacity-80 transition cursor-pointer shadow-sm shadow-rose-500/50"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500 hover:opacity-80 transition cursor-pointer shadow-sm shadow-amber-500/50"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500 hover:opacity-80 transition cursor-pointer shadow-sm shadow-emerald-500/50"></span>
              </div>

              {/* Address Bar */}
              <div className="flex items-center gap-2 max-w-lg w-full mx-4">
                <div className="flex-1 flex items-center justify-center gap-2 py-1 px-4 rounded-lg bg-[#050812] border border-white/10 text-xs font-mono text-slate-300">
                  <span className="text-emerald-400 text-xs">🔒</span>
                  <span className="text-slate-400">https://</span>
                  <span className="text-white font-semibold">abdulrafey.dev</span>
                  <span className="text-[var(--primary)]">/workspace</span>
                </div>
              </div>

              {/* Tab Switchers */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => { sound.playClick(); setActiveTab('surgeticket'); }}
                  className={`px-3 py-1 rounded-md text-xs font-mono transition-all ${
                    activeTab === 'surgeticket' 
                      ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-500/50 font-bold' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  SurgeTicket
                </button>
                <button
                  onClick={() => { sound.playClick(); setActiveTab('weblaunch'); }}
                  className={`px-3 py-1 rounded-md text-xs font-mono transition-all ${
                    activeTab === 'weblaunch' 
                      ? 'bg-blue-500/25 text-blue-300 border border-blue-500/50 font-bold' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  WebLaunch
                </button>
                <button
                  onClick={() => { sound.playClick(); setActiveTab('code'); }}
                  className={`px-3 py-1 rounded-md text-xs font-mono transition-all ${
                    activeTab === 'code' 
                      ? 'bg-purple-500/25 text-purple-300 border border-purple-500/50 font-bold' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  LockEngine.js
                </button>
              </div>
            </div>

            {/* Inner Monitor Content (The Full Interactive Desktop Portfolio) */}
            <div 
              ref={screenContentRef}
              className="relative flex-1 overflow-y-auto bg-gradient-to-b from-[#060913] to-[#03050a] text-white p-5 sm:p-7"
            >
              
              {/* Header inside desktop */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center font-black text-cyan-400 text-sm shadow-md">
                    AR
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-white tracking-wide">
                      Abdul Rafey — CS Student & Full-Stack Developer
                    </h3>
                    <p className="text-[11px] text-[var(--primary)] font-mono">
                      Qarshi University, Lahore • BSCS 5th Sem • Roll: 24L-0043
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono bg-emerald-950/80 text-emerald-400 border border-emerald-800/50">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    CIT331 Systems Active
                  </span>
                  <button
                    onClick={() => { sound.playClick(); onOpenTerminal(); }}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 text-cyan-300 hover:bg-slate-700 text-xs font-mono border border-cyan-500/30 transition shadow"
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    <span>sh</span>
                  </button>
                </div>
              </div>

              {/* Dynamic Tab 1: SurgeTicket VaultProxy */}
              {activeTab === 'surgeticket' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900/95 via-[#0b1428] to-slate-900/95 border border-cyan-500/40 shadow-xl">
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 shadow-md">
                          <Flame className="w-5 h-5" />
                        </span>
                        <div>
                          <h4 className="text-lg font-extrabold text-white">
                            {surgeProject.title}
                          </h4>
                          <p className="text-xs font-mono text-cyan-300">
                            {surgeProject.tagline}
                          </p>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-950 text-cyan-300 border border-cyan-700/60">
                        {surgeProject.badge}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                      {surgeProject.description}
                    </p>

                    {/* Highlights Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-white/10 text-xs">
                      <div className="p-3 rounded-xl bg-black/50 border border-white/5">
                        <p className="text-cyan-400 font-mono font-bold">Load-Shedding</p>
                        <p className="text-[11px] text-slate-400 mt-1">Token-bucket rate limiter throttles burst spikes.</p>
                      </div>
                      <div className="p-3 rounded-xl bg-black/50 border border-white/5">
                        <p className="text-purple-400 font-mono font-bold">Atomic Seat Holds</p>
                        <p className="text-[11px] text-slate-400 mt-1">Distributed TTL locks eliminate double-bookings.</p>
                      </div>
                      <div className="p-3 rounded-xl bg-black/50 border border-white/5">
                        <p className="text-emerald-400 font-mono font-bold">Anti-Scalper Virtual Queue</p>
                        <p className="text-[11px] text-slate-400 mt-1">Smart pacing virtual waiting room for buyers.</p>
                      </div>
                    </div>

                    {/* Tech stack */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {surgeProject.techStack.map(tech => (
                        <span key={tech} className="px-2.5 py-1 rounded-lg bg-slate-800/90 text-xs font-mono text-slate-200 border border-white/10">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Dynamic Tab 2: Web Launch Platform */}
              {activeTab === 'weblaunch' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900/95 via-[#0d1630] to-slate-900/95 border border-blue-500/40 shadow-xl">
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="p-2 rounded-xl bg-blue-500/20 text-blue-400 shadow-md">
                          <Globe className="w-5 h-5" />
                        </span>
                        <div>
                          <h4 className="text-lg font-extrabold text-white">
                            {webLaunchProject.title}
                          </h4>
                          <p className="text-xs font-mono text-blue-300">
                            {webLaunchProject.tagline}
                          </p>
                        </div>
                      </div>
                      <a
                        href={webLaunchProject.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md transition"
                      >
                        <span>Visit Live Platform</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                      {webLaunchProject.description}
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-white/10 text-xs">
                      <div className="p-3 rounded-xl bg-black/50 border border-white/5">
                        <p className="text-blue-400 font-mono font-bold">Vercel Edge</p>
                        <p className="text-[11px] text-slate-400 mt-1">Global CDN sub-second page delivery</p>
                      </div>
                      <div className="p-3 rounded-xl bg-black/50 border border-white/5">
                        <p className="text-cyan-400 font-mono font-bold">Meta Ads Portal</p>
                        <p className="text-[11px] text-slate-400 mt-1">Integrated campaign performance tracking</p>
                      </div>
                      <div className="p-3 rounded-xl bg-black/50 border border-white/5 col-span-2 sm:col-span-1">
                        <p className="text-emerald-400 font-mono font-bold">High Conversion</p>
                        <p className="text-[11px] text-slate-400 mt-1">Engineered client sales funnels</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Dynamic Tab 3: Interactive Code Inspector */}
              {activeTab === 'code' && (
                <div className="rounded-2xl overflow-hidden bg-slate-950 border border-purple-500/40 p-4 font-mono text-xs text-slate-300 shadow-xl">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-xs text-slate-400">
                    <span className="text-purple-400 font-bold">CIT331 // VaultProxy // seatHoldService.js</span>
                    <span className="text-emerald-400 font-semibold">● Atomic Distributed Lock</span>
                  </div>
                  <pre className="overflow-x-auto text-xs leading-relaxed text-cyan-200">
                    {surgeProject.codeSnippet}
                  </pre>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Realistic Aluminum Monitor Stand */}
        <div ref={monitorStandRef} className="flex flex-col items-center pointer-events-none -mt-1 select-none">
          <div className="w-20 h-16 bg-gradient-to-r from-slate-700 via-slate-500 to-slate-700 shadow-2xl border-x border-slate-600 flex items-center justify-center">
            <div className="w-6 h-9 rounded-full bg-slate-950 border border-slate-600/60 shadow-inner"></div>
          </div>
          <div className="w-56 h-4 rounded-t-xl bg-gradient-to-b from-slate-600 via-slate-500 to-slate-700 shadow-[0_15px_30px_rgba(0,0,0,0.9)] border-t border-white/30"></div>
        </div>

      </div>

    </section>
  );
}
