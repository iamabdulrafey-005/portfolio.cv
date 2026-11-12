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
  Maximize2
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

  const [activeTab, setActiveTab] = useState('surgeticket');
  const [zoomStage, setZoomStage] = useState('emerging'); // emerging | inside | zoomed-out

  const { projects, personal } = portfolioData;
  const surgeProject = projects.find(p => p.id === 'surgeticket');
  const webLaunchProject = projects.find(p => p.id === 'weblaunch');

  useEffect(() => {
    const container = containerRef.current;
    const monitor = monitorFrameRef.current;
    const stand = monitorStandRef.current;
    const hud = hudIndicatorRef.current;

    if (!container || !monitor) return;

    // Create GSAP ScrollTrigger timeline with pinning
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=2800',
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

      // 1. Monitor Emerges in 3D (0% -> 25%)
      tl.fromTo(monitor, 
        { 
          scale: 0.65, 
          rotateX: 25, 
          rotateY: -8, 
          y: 120, 
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
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 1 }, 
        "<"
      );

      // 2. Seamless Zoom In: Visitor "Steps Inside" the monitor (25% -> 50%)
      tl.to(monitor, {
        scale: 3.4,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        duration: 2.5,
        ease: 'power3.inOut'
      })
      .to(stand, {
        opacity: 0,
        y: 300,
        duration: 1.5,
        ease: 'power2.in'
      }, "<")
      .to(hud, {
        opacity: 0.9,
        scale: 1.05,
        duration: 0.5
      }, "<0.5");

      // 3. Pinned Full View Inside the Screen (50% -> 70%)
      tl.to(monitor, {
        scale: 3.4,
        duration: 1.8 // hold inside view for reading/interaction
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

  return (
    <section 
      id="desktop-experience" 
      ref={containerRef} 
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-[#04060a]"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-cyber-grid opacity-25 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none"></div>

      {/* Floating HUD Indicator */}
      <div 
        ref={hudIndicatorRef} 
        className="absolute top-20 z-40 px-5 py-2 rounded-full bg-slate-900/90 border border-cyan-500/40 backdrop-blur-md shadow-xl flex items-center gap-3 pointer-events-none transition-all duration-300"
      >
        <div className="flex h-2.5 w-2.5 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-cyan-300 font-semibold uppercase tracking-wider">
            Experience 01: Desktop Station
          </span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-300">
            {zoomStage === 'emerging' && "Scroll down to zoom inside virtual screen"}
            {zoomStage === 'inside' && "✨ You are now inside the Desktop Workspace"}
            {zoomStage === 'reversing' && "Scrolling will transition to Mobile view"}
          </span>
        </div>
      </div>

      {/* 3D Perspective Stage Container */}
      <div className="relative w-full max-w-5xl px-4 flex flex-col items-center perspective-1500 z-20">
        
        {/* Realistic Desktop Monitor */}
        <div 
          ref={monitorFrameRef}
          className="relative w-full aspect-[16/10] max-h-[72vh] rounded-2xl p-2.5 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_50px_rgba(6,182,212,0.15)] border border-slate-600/80 preserve-3d"
          style={{ transformOrigin: 'center center' }}
        >
          {/* Top Webcam & Sensor Notch */}
          <div className="absolute top-1 inset-x-0 flex items-center justify-center gap-2 z-30 pointer-events-none">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-950 border border-cyan-400/40"></div>
            <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></div>
          </div>

          {/* Screen Bezel Specular Sheen */}
          <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#070a13] border border-black/80 flex flex-col shadow-inner">
            
            {/* macOS / Web Browser Chrome Bar */}
            <div className="h-9 px-3 bg-[#0d1322] border-b border-white/10 flex items-center justify-between shrink-0 select-none z-20">
              
              {/* Traffic Light Window Buttons */}
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 hover:opacity-80 transition cursor-pointer"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 hover:opacity-80 transition cursor-pointer"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 hover:opacity-80 transition cursor-pointer"></span>
              </div>

              {/* Browser Address Bar with Tabs */}
              <div className="flex items-center gap-2 max-w-md w-full mx-4">
                <div className="flex-1 flex items-center justify-center gap-2 py-1 px-3 rounded-md bg-[#070b16] border border-white/5 text-[11px] font-mono text-slate-300">
                  <span className="text-emerald-400 text-xs">🔒</span>
                  <span className="text-slate-400">https://</span>
                  <span className="text-white font-medium">abdulrafey.dev</span>
                  <span className="text-cyan-400">/workspace</span>
                </div>
              </div>

              {/* Tab Switchers */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => { sound.playClick(); setActiveTab('surgeticket'); }}
                  className={`px-2.5 py-0.5 rounded text-[10px] font-mono transition-colors ${
                    activeTab === 'surgeticket' 
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  SurgeTicket
                </button>
                <button
                  onClick={() => { sound.playClick(); setActiveTab('weblaunch'); }}
                  className={`px-2.5 py-0.5 rounded text-[10px] font-mono transition-colors ${
                    activeTab === 'weblaunch' 
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  WebLaunch
                </button>
                <button
                  onClick={() => { sound.playClick(); setActiveTab('code'); }}
                  className={`px-2.5 py-0.5 rounded text-[10px] font-mono transition-colors ${
                    activeTab === 'code' 
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  LockEngine.js
                </button>
              </div>
            </div>

            {/* Inner Monitor Display (The Desktop Portfolio Content) */}
            <div 
              ref={screenContentRef}
              className="relative flex-1 overflow-y-auto bg-gradient-to-b from-[#060913] to-[#04060c] text-white p-4 sm:p-6"
            >
              
              {/* Inner Desktop Navigation & Status */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center font-bold text-cyan-400 text-xs">
                    AR
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white tracking-wide">
                      Abdul Rafey's Desktop Workspace
                    </h3>
                    <p className="text-[10px] text-cyan-400 font-mono">
                      Qarshi University • BSCS 5th Sem • Roll 24L-0043
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
                    <CheckCircle2 className="w-3 h-3" />
                    CIT331 Systems Active
                  </span>
                  <button
                    onClick={() => { sound.playClick(); onOpenTerminal(); }}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 text-slate-300 hover:text-cyan-300 text-[10px] font-mono border border-white/10 transition"
                  >
                    <Terminal className="w-3 h-3 text-cyan-400" />
                    <span>sh</span>
                  </button>
                </div>
              </div>

              {/* Dynamic Tab 1: SurgeTicket VaultProxy Showcase */}
              {activeTab === 'surgeticket' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="p-4 rounded-xl bg-gradient-to-r from-slate-900/90 via-[#0a1122] to-slate-900/90 border border-cyan-500/30">
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
                          <Flame className="w-4 h-4" />
                        </span>
                        <h4 className="text-base font-bold text-white">
                          {surgeProject.title}
                        </h4>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-700/50">
                        {surgeProject.badge}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed mb-3">
                      {surgeProject.description}
                    </p>

                    {/* Architecture Highlights Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-white/10 text-[11px]">
                      <div className="p-2 rounded bg-black/40 border border-white/5">
                        <p className="text-cyan-400 font-mono font-medium">Load-Shedding</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">Token-bucket rate limiter throttles burst spikes.</p>
                      </div>
                      <div className="p-2 rounded bg-black/40 border border-white/5">
                        <p className="text-purple-400 font-mono font-medium">Atomic Seat Holds</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">Distributed TTL locks eliminate double-bookings.</p>
                      </div>
                      <div className="p-2 rounded bg-black/40 border border-white/5">
                        <p className="text-emerald-400 font-mono font-medium">Anti-Scalper Queue</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">Smart pacing virtual waiting room for buyers.</p>
                      </div>
                    </div>

                    {/* Tech Badges */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {surgeProject.techStack.map(tech => (
                        <span key={tech} className="px-2 py-0.5 rounded bg-slate-800/80 text-[10px] font-mono text-slate-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Dynamic Tab 2: Web Launch Agency Showcase */}
              {activeTab === 'weblaunch' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="p-4 rounded-xl bg-gradient-to-r from-slate-900/90 via-[#0c1328] to-slate-900/90 border border-blue-500/30">
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400">
                          <Globe className="w-4 h-4" />
                        </span>
                        <h4 className="text-base font-bold text-white">
                          {webLaunchProject.title}
                        </h4>
                      </div>
                      <a
                        href={webLaunchProject.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow transition"
                      >
                        <span>Visit Live Platform</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed mb-3">
                      {webLaunchProject.description}
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 border-t border-white/10 text-[11px]">
                      <div className="p-2 rounded bg-black/40 border border-white/5">
                        <p className="text-blue-400 font-mono font-medium">Vercel Edge</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">Global CDN sub-second page delivery</p>
                      </div>
                      <div className="p-2 rounded bg-black/40 border border-white/5">
                        <p className="text-cyan-400 font-mono font-medium">Meta Ads Portal</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">Integrated campaign performance tracking</p>
                      </div>
                      <div className="p-2 rounded bg-black/40 border border-white/5 col-span-2 sm:col-span-1">
                        <p className="text-emerald-400 font-mono font-medium">High Conversion</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">Engineered sales funnels for clients</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Dynamic Tab 3: Interactive Code Inspector */}
              {activeTab === 'code' && (
                <div className="rounded-xl overflow-hidden bg-slate-950 border border-purple-500/30 p-3 font-mono text-[11px] text-slate-300">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-[10px] text-slate-400">
                    <span className="text-purple-400">CIT331 // VaultProxy // seatHoldService.js</span>
                    <span className="text-emerald-400">Atomic Execution Guaranteed</span>
                  </div>
                  <pre className="overflow-x-auto text-[10px] sm:text-[11px] leading-relaxed text-cyan-200">
                    {surgeProject.codeSnippet}
                  </pre>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Realistic Aluminum Monitor Stand */}
        <div ref={monitorStandRef} className="flex flex-col items-center pointer-events-none -mt-1 select-none">
          {/* Vertical Arm */}
          <div className="w-16 h-14 bg-gradient-to-r from-slate-700 via-slate-500 to-slate-700 shadow-xl border-x border-slate-600 flex items-center justify-center">
            {/* Cable Pass-Through Hole */}
            <div className="w-5 h-8 rounded-full bg-slate-950 border border-slate-600/60 shadow-inner"></div>
          </div>
          {/* Stand Base */}
          <div className="w-48 h-3.5 rounded-t-lg bg-gradient-to-b from-slate-600 via-slate-500 to-slate-700 shadow-[0_12px_20px_rgba(0,0,0,0.8)] border-t border-white/20"></div>
        </div>

      </div>

    </section>
  );
}
