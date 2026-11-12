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
  ShieldCheck
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { sound } from '../utils/audio';

gsap.registerPlugin(ScrollTrigger);

export default function MobileExperience({ onOpenResume, onOpenTerminal }) {
  const containerRef = useRef(null);
  const phoneFrameRef = useRef(null);
  const hudIndicatorRef = useRef(null);

  const [activeMobileTab, setActiveMobileTab] = useState('feed');
  const [zoomStage, setZoomStage] = useState('emerging');

  const { projects, personal } = portfolioData;
  const surgeProject = projects.find(p => p.id === 'surgeticket');
  const webLaunchProject = projects.find(p => p.id === 'weblaunch');

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

      // 1. Phone Floats Up in 3D (0% -> 25%)
      tl.fromTo(phone,
        {
          scale: 0.65,
          rotateY: 24,
          rotateX: 14,
          y: 140,
          opacity: 0.4
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
        scale: 2.7,
        y: 0,
        rotateY: 0,
        rotateX: 0,
        duration: 2.4,
        ease: 'power3.inOut'
      })
      .to(hud, {
        opacity: 0.9,
        scale: 1.05,
        duration: 0.5
      }, "<0.5");

      // 3. Pinned Full View Inside Mobile Screen (50% -> 70%)
      tl.to(phone, {
        scale: 2.7,
        duration: 1.8 // hold inside view for interactive feel
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

  return (
    <section 
      id="mobile-experience" 
      ref={containerRef} 
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-[#030509]"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none"></div>

      {/* Floating HUD Indicator */}
      <div 
        ref={hudIndicatorRef} 
        className="absolute top-20 z-40 px-5 py-2 rounded-full bg-slate-900/90 border border-purple-500/40 backdrop-blur-md shadow-xl flex items-center gap-3 pointer-events-none transition-all duration-300"
      >
        <div className="flex h-2.5 w-2.5 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-500"></span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-purple-300 font-semibold uppercase tracking-wider">
            Experience 02: Mobile Device
          </span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-300">
            {zoomStage === 'emerging' && "Scroll to zoom into mobile-optimized layout"}
            {zoomStage === 'inside' && "📱 Full-screen responsive mobile experience"}
            {zoomStage === 'reversing' && "Scroll further for deep-dive portfolio sections"}
          </span>
        </div>
      </div>

      {/* 3D Perspective Stage Container */}
      <div className="relative w-full max-w-sm px-4 flex justify-center items-center perspective-1500 z-20">
        
        {/* Realistic Smartphone (Titanium Flagship Frame) */}
        <div 
          ref={phoneFrameRef}
          className="relative w-[310px] sm:w-[340px] h-[640px] rounded-[50px] p-3 bg-gradient-to-b from-slate-600 via-slate-800 to-slate-900 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.9),0_0_45px_rgba(139,92,246,0.2)] border-2 border-slate-500/80 preserve-3d"
          style={{ transformOrigin: 'center center' }}
        >
          {/* Side Buttons (Simulated Titanium Hardware) */}
          {/* Left: Action Button & Volume */}
          <div className="absolute -left-[5px] top-28 w-[3px] h-8 bg-slate-400 rounded-l-md"></div>
          <div className="absolute -left-[5px] top-40 w-[3px] h-12 bg-slate-400 rounded-l-md"></div>
          <div className="absolute -left-[5px] top-56 w-[3px] h-12 bg-slate-400 rounded-l-md"></div>
          {/* Right: Power / Lock Button */}
          <div className="absolute -right-[5px] top-36 w-[3px] h-16 bg-slate-400 rounded-r-md"></div>

          {/* Inner Phone Display */}
          <div className="relative w-full h-full rounded-[40px] overflow-hidden bg-[#07090f] border border-black/90 flex flex-col shadow-inner select-none">
            
            {/* Mobile Status Bar with Dynamic Island */}
            <div className="h-11 px-6 bg-slate-950 flex items-center justify-between text-white text-[11px] font-medium z-30 shrink-0">
              {/* Clock */}
              <span className="font-semibold tracking-tight">9:41</span>
              
              {/* Dynamic Island Pill */}
              <div className="w-24 h-5 rounded-full bg-black border border-white/10 flex items-center justify-center gap-1.5 px-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                <div className="flex gap-0.5 items-center">
                  <div className="w-0.5 h-2 bg-emerald-400 animate-bounce"></div>
                  <div className="w-0.5 h-3 bg-cyan-400 animate-bounce delay-75"></div>
                  <div className="w-0.5 h-1.5 bg-purple-400 animate-bounce delay-150"></div>
                </div>
              </div>

              {/* Status Icons */}
              <div className="flex items-center gap-1.5 text-slate-300">
                <span className="text-[10px] font-mono">5G</span>
                <Wifi className="w-3.5 h-3.5 text-slate-300" />
                <BatteryMedium className="w-4 h-4 text-emerald-400" />
              </div>
            </div>

            {/* Mobile-Optimized Website Feed */}
            <div className="relative flex-1 overflow-y-auto bg-gradient-to-b from-[#070a13] to-[#04060b] text-white p-3.5 space-y-3.5">
              
              {/* Mobile App Header */}
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 p-[1px]">
                    <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-[10px] font-bold text-cyan-400">
                      AR
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold leading-tight">Abdul Rafey</p>
                    <p className="text-[9px] text-cyan-400 font-mono">Qarshi Univ • 24L-0043</p>
                  </div>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-purple-950/80 text-purple-300 border border-purple-800/40">
                  Mobile Responsive
                </span>
              </div>

              {/* Quick Mobile Category Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 text-[10px] font-mono">
                {['feed', 'surge', 'web-launch'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => { sound.playClick(); setActiveMobileTab(tab); }}
                    className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
                      activeMobileTab === tab 
                        ? 'bg-cyan-500 text-slate-950 font-bold' 
                        : 'bg-slate-900 text-slate-400 border border-white/5'
                    }`}
                  >
                    {tab === 'feed' ? 'All Highlights' : tab === 'surge' ? 'SurgeTicket' : 'Web Launch'}
                  </button>
                ))}
              </div>

              {/* Mobile Card 1: SurgeTicket (VaultProxy) */}
              {(activeMobileTab === 'feed' || activeMobileTab === 'surge') && (
                <div className="p-3 rounded-2xl bg-slate-900/90 border border-cyan-500/30 shadow-md">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="flex items-center gap-1 text-[11px] font-bold text-white">
                      <Flame className="w-3.5 h-3.5 text-cyan-400" />
                      SurgeTicket
                    </span>
                    <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950/80 px-1.5 py-0.5 rounded">
                      CIT331 Web Tech
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-300 leading-snug mb-2">
                    Adaptive load-shedding middleware with atomic seat locks during high-traffic surges.
                  </p>
                  <div className="flex items-center justify-between text-[9px] font-mono pt-1.5 border-t border-white/10 text-slate-400">
                    <span className="text-emerald-400">● 100% Atomic Hold</span>
                    <span>Roll: 24L-0043</span>
                  </div>
                </div>
              )}

              {/* Mobile Card 2: Web Launch */}
              {(activeMobileTab === 'feed' || activeMobileTab === 'web-launch') && (
                <div className="p-3 rounded-2xl bg-slate-900/90 border border-blue-500/30 shadow-md">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="flex items-center gap-1 text-[11px] font-bold text-white">
                      <Globe className="w-3.5 h-3.5 text-blue-400" />
                      Web Launch
                    </span>
                    <a
                      href={webLaunchProject.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[9px] font-mono text-blue-300 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-800/40 flex items-center gap-1"
                    >
                      <span>Vercel</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                  <p className="text-[10px] text-slate-300 leading-snug mb-2">
                    Agency platform for custom web development, cloud hosting, and Meta ads management.
                  </p>
                  <div className="flex items-center justify-between text-[9px] font-mono pt-1.5 border-t border-white/10 text-slate-400">
                    <span className="text-cyan-400">Global Edge CDN</span>
                    <span>100% Responsive</span>
                  </div>
                </div>
              )}

              {/* Mobile Card 3: Quick Connect */}
              <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-cyan-950/40 border border-purple-500/20 text-center">
                <p className="text-[11px] font-bold text-white mb-0.5">Need a Full-Stack Engineer?</p>
                <p className="text-[9px] text-slate-300 mb-2">Abdul Rafey • Qarshi University</p>
                <a
                  href="#contact"
                  onClick={() => sound.playClick()}
                  className="inline-flex items-center justify-center gap-1 px-4 py-1.5 rounded-full text-[10px] font-semibold bg-gradient-to-r from-cyan-400 to-purple-500 text-slate-950 shadow"
                >
                  <Send className="w-3 h-3" />
                  <span>Send Message</span>
                </a>
              </div>

            </div>

            {/* Mobile Bottom Dock / Navigation */}
            <div className="h-12 bg-slate-950/95 border-t border-white/10 flex items-center justify-around px-2 text-slate-400 shrink-0 z-30">
              <button 
                onClick={() => { sound.playClick(); setActiveMobileTab('feed'); }}
                className={`flex flex-col items-center gap-0.5 text-[9px] ${activeMobileTab === 'feed' ? 'text-cyan-400 font-bold' : ''}`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Home</span>
              </button>
              <button 
                onClick={() => { sound.playClick(); setActiveMobileTab('surge'); }}
                className={`flex flex-col items-center gap-0.5 text-[9px] ${activeMobileTab === 'surge' ? 'text-cyan-400 font-bold' : ''}`}
              >
                <Flame className="w-3.5 h-3.5" />
                <span>Surge</span>
              </button>
              <button 
                onClick={() => { sound.playClick(); setActiveMobileTab('web-launch'); }}
                className={`flex flex-col items-center gap-0.5 text-[9px] ${activeMobileTab === 'web-launch' ? 'text-cyan-400 font-bold' : ''}`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Launch</span>
              </button>
              <button 
                onClick={() => { sound.playClick(); onOpenResume(); }}
                className="flex flex-col items-center gap-0.5 text-[9px] hover:text-white"
              >
                <User className="w-3.5 h-3.5" />
                <span>CV</span>
              </button>
            </div>

            {/* iOS Home Indicator Bar */}
            <div className="h-3 bg-slate-950 flex items-center justify-center shrink-0">
              <div className="w-24 h-1 rounded-full bg-slate-600"></div>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
}
