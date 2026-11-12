import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Smartphone, 
  Wifi, 
  BatteryMedium, 
  Layers, 
  Flame, 
  Globe, 
  Send, 
  ExternalLink, 
  User, 
  Code,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Maximize2,
  Minimize2,
  RotateCw,
  Play,
  Bell,
  CheckCircle2
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { sound } from '../utils/audio';

gsap.registerPlugin(ScrollTrigger);

export default function MobileExperience({ onOpenResume, onOpenTerminal }) {
  const containerRef = useRef(null);
  const phoneFrameRef = useRef(null);
  const hudIndicatorRef = useRef(null);
  const notificationRef = useRef(null);
  const floatingTagsRef = useRef(null);

  const [activeMobileTab, setActiveMobileTab] = useState('feed');
  const [zoomStage, setZoomStage] = useState('emerging');
  const [isAnimatingManual, setIsAnimatingManual] = useState(false);
  const [isZoomedManual, setIsZoomedManual] = useState(false);

  const { projects, personal } = portfolioData;
  const surgeProject = projects.find(p => p.id === 'surgeticket');
  const webLaunchProject = projects.find(p => p.id === 'weblaunch');

  // Interactive 3D Mouse Parallax Tilt for Phone
  const handleMouseMove = (e) => {
    if (isZoomedManual || isAnimatingManual || !phoneFrameRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const xPos = (clientX / innerWidth - 0.5) * 2;
    const yPos = (clientY / innerHeight - 0.5) * 2;

    gsap.to(phoneFrameRef.current, {
      rotateY: xPos * 22,
      rotateX: -yPos * 16,
      duration: 0.5,
      ease: 'power1.out',
      transformPerspective: 1400
    });

    if (floatingTagsRef.current) {
      gsap.to(floatingTagsRef.current, {
        x: xPos * 25,
        y: yPos * 20,
        duration: 0.7,
        ease: 'power1.out'
      });
    }
  };

  const handleMouseLeave = () => {
    if (isZoomedManual || isAnimatingManual || !phoneFrameRef.current) return;
    gsap.to(phoneFrameRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.9,
      ease: 'power2.out'
    });
    if (floatingTagsRef.current) {
      gsap.to(floatingTagsRef.current, {
        x: 0,
        y: 0,
        duration: 0.9,
        ease: 'power2.out'
      });
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    const phone = phoneFrameRef.current;
    const hud = hudIndicatorRef.current;

    if (!container || !phone) return;

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

      // 1. Giant Phone Floats Up in 3D (0% -> 25%)
      tl.fromTo(phone,
        {
          scale: 0.7,
          rotateY: 32,
          rotateX: 18,
          y: 180,
          opacity: 0.3
        },
        {
          scale: 1,
          rotateY: 0,
          rotateX: 0,
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power2.out'
        }
      );

      // 2. Scroll-Controlled Mobile Zoom (25% -> 50%)
      tl.to(phone, {
        scale: 2.8,
        y: 0,
        rotateY: 0,
        rotateX: 0,
        duration: 2.4,
        ease: 'power3.inOut'
      })
      .to(hud, {
        opacity: 0.95,
        scale: 1.05,
        duration: 0.5
      }, "<0.5");

      // 3. Pinned Full View Inside Mobile Screen (50% -> 70%)
      tl.to(phone, {
        scale: 2.8,
        duration: 1.8
      });

      // 4. Smooth Reversal back into Handheld Phone frame (70% -> 100%)
      tl.to(phone, {
        scale: 1,
        y: 0,
        rotateY: 0,
        rotateX: 0,
        duration: 2.2,
        ease: 'power3.out'
      })
      .to(hud, {
        opacity: 0.6,
        scale: 1,
        duration: 0.5
      }, "<");

    }, container);

    return () => ctx.revert();
  }, []);

  // Direct Interactive Animation Controls
  const animateZoomIn = () => {
    sound.playWhoosh();
    setIsAnimatingManual(true);
    setIsZoomedManual(true);
    gsap.to(phoneFrameRef.current, {
      scale: 2.8,
      rotateY: 0,
      rotateX: 0,
      y: 0,
      duration: 1.2,
      ease: 'power3.inOut',
      onComplete: () => setIsAnimatingManual(false)
    });
  };

  const animateZoomOut = () => {
    sound.playClick();
    setIsAnimatingManual(true);
    setIsZoomedManual(false);
    gsap.to(phoneFrameRef.current, {
      scale: 1,
      rotateY: 0,
      rotateX: 0,
      y: 0,
      duration: 1.2,
      ease: 'power3.out',
      onComplete: () => setIsAnimatingManual(false)
    });
  };

  const animate3DRotate = () => {
    sound.playWhoosh();
    setIsAnimatingManual(true);
    const tl = gsap.timeline({
      onComplete: () => setIsAnimatingManual(false)
    });
    tl.to(phoneFrameRef.current, {
      rotateY: -35,
      rotateX: 16,
      scale: 1.06,
      duration: 0.8,
      ease: 'power2.inOut'
    })
    .to(phoneFrameRef.current, {
      rotateY: 35,
      rotateX: -12,
      duration: 1.2,
      ease: 'power2.inOut'
    })
    .to(phoneFrameRef.current, {
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      duration: 0.8,
      ease: 'power2.out'
    });
  };

  const playFullWalkthrough = () => {
    sound.playSuccess();
    setIsAnimatingManual(true);
    const tl = gsap.timeline({
      onComplete: () => setIsAnimatingManual(false)
    });

    // 1. Entrance 3D rotation
    tl.to(phoneFrameRef.current, {
      rotateY: 30,
      rotateX: 15,
      scale: 0.9,
      duration: 0.8,
      ease: 'power2.out'
    })
    // 2. Face forward
    .to(phoneFrameRef.current, {
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      duration: 0.6,
      ease: 'power2.out'
    })
    // 3. Zoom into screen
    .to(phoneFrameRef.current, {
      scale: 2.8,
      duration: 1.4,
      ease: 'power3.inOut'
    })
    // 4. Switch tab inside phone
    .call(() => setActiveMobileTab('surge'))
    .to({}, { duration: 1.2 })
    .call(() => setActiveMobileTab('web-launch'))
    .to({}, { duration: 1.2 })
    .call(() => setActiveMobileTab('feed'))
    // 5. Zoom back out
    .to(phoneFrameRef.current, {
      scale: 1,
      duration: 1.2,
      ease: 'power3.out'
    });
  };

  return (
    <section 
      id="mobile-experience" 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-[#030509]"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-cyber-grid opacity-25 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[550px] bg-[var(--glow-color)] rounded-full blur-[180px] pointer-events-none opacity-45 transition-all duration-700"></div>

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
            Experience 02: Giant 3D Smartphone
          </span>
          <span className="text-slate-500 hidden sm:inline">|</span>
          <span className="text-slate-200 hidden sm:inline">
            {zoomStage === 'emerging' && "Scroll or click buttons to animate phone zoom"}
            {zoomStage === 'inside' && "📱 Full-screen responsive mobile web experience"}
            {zoomStage === 'reversing' && "Scroll further for deep-dive portfolio"}
          </span>
        </div>
      </div>

      {/* Floating Holographic 3D Orbit Badges around Phone */}
      <div ref={floatingTagsRef} className="absolute inset-0 pointer-events-none z-30 hidden md:block">
        <div className="absolute top-28 left-16 p-3 rounded-2xl bg-slate-900/90 border border-purple-500/40 backdrop-blur-md shadow-2xl shadow-purple-950/40 animate-float">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-300">
            <Smartphone className="w-4 h-4 text-purple-400" />
            <span>100% Mobile Responsive</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Touch-Optimized Layout</p>
        </div>

        <div className="absolute top-32 right-16 p-3 rounded-2xl bg-slate-900/90 border border-cyan-500/40 backdrop-blur-md shadow-2xl shadow-cyan-950/40 animate-float" style={{ animationDelay: '2s' }}>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-300">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Qarshi University</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Roll No: 24L-0043</p>
        </div>
      </div>

      {/* Interactive Animation Control Bar (One-Click for Teacher / Evaluator) */}
      <div className="absolute bottom-6 sm:bottom-8 z-40 flex flex-wrap items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900/95 border border-[var(--primary)] backdrop-blur-xl shadow-2xl">
        <button
          onClick={playFullWalkthrough}
          disabled={isAnimatingManual}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-purple-500/25 transition cursor-pointer disabled:opacity-50"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Play 3D Walkthrough</span>
        </button>

        {isZoomedManual ? (
          <button
            onClick={animateZoomOut}
            disabled={isAnimatingManual}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-purple-300 text-xs font-mono border border-purple-500/30 transition cursor-pointer disabled:opacity-50"
          >
            <Minimize2 className="w-3.5 h-3.5" />
            <span>Zoom Out (Handheld)</span>
          </button>
        ) : (
          <button
            onClick={animateZoomIn}
            disabled={isAnimatingManual}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-mono border border-cyan-500/30 transition cursor-pointer disabled:opacity-50"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Zoom In (Fill Viewport)</span>
          </button>
        )}

        <button
          onClick={animate3DRotate}
          disabled={isAnimatingManual}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono border border-white/10 transition cursor-pointer disabled:opacity-50"
        >
          <RotateCw className="w-3.5 h-3.5 text-purple-400" />
          <span>Orbit 3D Angle</span>
        </button>
      </div>

      {/* 3D Perspective Stage Container */}
      <div className="relative w-full max-w-md px-4 flex justify-center items-center perspective-1600 z-20">
        
        {/* Giant Realistic Smartphone (Titanium Flagship Chassis) */}
        <div 
          ref={phoneFrameRef}
          className="relative w-[340px] sm:w-[380px] h-[690px] rounded-[54px] p-3.5 bg-gradient-to-b from-slate-600 via-slate-800 to-slate-950 shadow-[0_35px_90px_-20px_rgba(0,0,0,0.95),0_0_65px_var(--glow-color)] border-2 border-slate-500/90 preserve-3d transition-shadow duration-500"
          style={{ transformOrigin: 'center center' }}
        >
          {/* Side Titanium Hardware Buttons */}
          <div className="absolute -left-[6px] top-32 w-[4px] h-9 bg-slate-400 rounded-l-md shadow-sm"></div>
          <div className="absolute -left-[6px] top-46 w-[4px] h-14 bg-slate-400 rounded-l-md shadow-sm"></div>
          <div className="absolute -left-[6px] top-64 w-[4px] h-14 bg-slate-400 rounded-l-md shadow-sm"></div>
          <div className="absolute -right-[6px] top-40 w-[4px] h-18 bg-slate-400 rounded-r-md shadow-sm"></div>

          {/* Inner Phone Display */}
          <div className="relative w-full h-full rounded-[44px] overflow-hidden bg-[#07090f] border border-black/90 flex flex-col shadow-inner select-none">
            
            {/* Mobile Status Bar with Dynamic Island */}
            <div className="h-12 px-6 bg-slate-950 flex items-center justify-between text-white text-xs font-medium z-30 shrink-0 border-b border-white/5">
              <span className="font-bold tracking-tight">9:41</span>
              
              {/* Dynamic Island Pill with Interactive Activity Wave */}
              <div className="w-28 h-6 rounded-full bg-black border border-white/15 flex items-center justify-between gap-1 px-2.5 shadow-md">
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--primary)] animate-pulse"></div>
                <span className="text-[9px] font-mono text-[var(--primary)] font-bold">CIT331</span>
                <div className="flex gap-0.5 items-center">
                  <div className="w-0.5 h-2 bg-emerald-400 animate-bounce"></div>
                  <div className="w-0.5 h-3 bg-cyan-400 animate-bounce delay-75"></div>
                  <div className="w-0.5 h-2 bg-purple-400 animate-bounce delay-150"></div>
                </div>
              </div>

              {/* Status Icons */}
              <div className="flex items-center gap-1.5 text-slate-300">
                <span className="text-[10px] font-mono font-bold">5G</span>
                <Wifi className="w-4 h-4 text-slate-300" />
                <BatteryMedium className="w-4 h-4 text-emerald-400" />
              </div>
            </div>

            {/* Simulated Dynamic Island Alert / Notification */}
            <div 
              ref={notificationRef}
              className="mx-3 mt-2 p-2.5 rounded-2xl bg-slate-900/95 border border-cyan-500/40 backdrop-blur-md shadow-xl flex items-center gap-2.5 z-20 animate-pulse"
            >
              <div className="p-1.5 rounded-xl bg-cyan-500/20 text-cyan-400 shrink-0">
                <Bell className="w-3.5 h-3.5" />
              </div>
              <div className="overflow-hidden">
                <p className="text-[10px] font-bold text-white flex items-center gap-1">
                  <span>Qarshi University Portal</span>
                  <span className="text-cyan-400 text-[9px]">• Just now</span>
                </p>
                <p className="text-[9px] text-slate-300 truncate">
                  ⚡ SurgeTicket recognized for high-concurrency architecture!
                </p>
              </div>
            </div>

            {/* Mobile-Optimized Website Feed */}
            <div className="relative flex-1 overflow-y-auto bg-gradient-to-b from-[#070a13] to-[#04060b] text-white p-4 space-y-4">
              
              {/* Mobile App Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 via-blue-500 to-purple-600 p-[1.5px]">
                    <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-xs font-bold text-cyan-400">
                      AR
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-extrabold leading-tight">Abdul Rafey</p>
                    <p className="text-[9px] text-[var(--primary)] font-mono">Qarshi Univ • 24L-0043</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-purple-950/80 text-purple-300 border border-purple-800/40">
                  Mobile Responsive
                </span>
              </div>

              {/* Quick Mobile Category Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 text-[10px] font-mono">
                {['feed', 'surge', 'web-launch'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => { sound.playClick(); setActiveMobileTab(tab); }}
                    className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer ${
                      activeMobileTab === tab 
                        ? 'bg-[var(--primary)] text-slate-950 font-bold shadow-md' 
                        : 'bg-slate-900 text-slate-400 border border-white/5'
                    }`}
                  >
                    {tab === 'feed' ? 'All Highlights' : tab === 'surge' ? 'SurgeTicket' : 'Web Launch'}
                  </button>
                ))}
              </div>

              {/* Mobile Card 1: SurgeTicket (VaultProxy) */}
              {(activeMobileTab === 'feed' || activeMobileTab === 'surge') && (
                <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-cyan-500/40 shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-white">
                      <Flame className="w-4 h-4 text-cyan-400" />
                      SurgeTicket
                    </span>
                    <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/40">
                      CIT331 Web Tech
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-snug mb-2.5">
                    Adaptive load-shedding middleware with atomic distributed seat locks during high-traffic surges.
                  </p>
                  <div className="flex items-center justify-between text-[10px] font-mono pt-2 border-t border-white/10 text-slate-400">
                    <span className="text-emerald-400">● 100% Atomic Hold</span>
                    <span>Roll: 24L-0043</span>
                  </div>
                </div>
              )}

              {/* Mobile Card 2: Web Launch */}
              {(activeMobileTab === 'feed' || activeMobileTab === 'web-launch') && (
                <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-blue-500/40 shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-white">
                      <Globe className="w-4 h-4 text-blue-400" />
                      Web Launch
                    </span>
                    <a
                      href={webLaunchProject.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[9px] font-mono text-blue-300 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-800/40 flex items-center gap-1"
                    >
                      <span>Vercel</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-snug mb-2.5">
                    Agency platform for custom web development, cloud hosting, and Meta ads management.
                  </p>
                  <div className="flex items-center justify-between text-[10px] font-mono pt-2 border-t border-white/10 text-slate-400">
                    <span className="text-cyan-400">Global Edge CDN</span>
                    <span>100% Responsive</span>
                  </div>
                </div>
              )}

              {/* Mobile Card 3: Quick Connect */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-cyan-950/40 border border-purple-500/30 text-center">
                <p className="text-xs font-bold text-white mb-0.5">Need a Full-Stack Engineer?</p>
                <p className="text-[10px] text-slate-300 mb-2.5">Abdul Rafey • Qarshi University</p>
                <a
                  href="#contact"
                  onClick={() => sound.playClick()}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-bold bg-gradient-to-r from-cyan-400 via-sky-400 to-purple-500 text-slate-950 shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </a>
              </div>

            </div>

            {/* Mobile Bottom Dock / Navigation */}
            <div className="h-14 bg-slate-950/95 border-t border-white/10 flex items-center justify-around px-3 text-slate-400 shrink-0 z-30">
              <button 
                onClick={() => { sound.playClick(); setActiveMobileTab('feed'); }}
                className={`flex flex-col items-center gap-1 text-[10px] ${activeMobileTab === 'feed' ? 'text-cyan-400 font-bold' : ''}`}
              >
                <Layers className="w-4 h-4" />
                <span>Home</span>
              </button>
              <button 
                onClick={() => { sound.playClick(); setActiveMobileTab('surge'); }}
                className={`flex flex-col items-center gap-1 text-[10px] ${activeMobileTab === 'surge' ? 'text-cyan-400 font-bold' : ''}`}
              >
                <Flame className="w-4 h-4" />
                <span>Surge</span>
              </button>
              <button 
                onClick={() => { sound.playClick(); setActiveMobileTab('web-launch'); }}
                className={`flex flex-col items-center gap-1 text-[10px] ${activeMobileTab === 'web-launch' ? 'text-cyan-400 font-bold' : ''}`}
              >
                <Globe className="w-4 h-4" />
                <span>Launch</span>
              </button>
              <button 
                onClick={() => { sound.playClick(); onOpenResume(); }}
                className="flex flex-col items-center gap-1 text-[10px] hover:text-white"
              >
                <User className="w-4 h-4" />
                <span>CV</span>
              </button>
            </div>

            {/* iOS Home Indicator Bar */}
            <div className="h-4 bg-slate-950 flex items-center justify-center shrink-0">
              <div className="w-28 h-1 rounded-full bg-slate-600"></div>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
}
