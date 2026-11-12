import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  Globe, 
  ExternalLink, 
  ShieldCheck, 
  Activity, 
  Server, 
  Lock, 
  Clock, 
  Zap, 
  CheckCircle, 
  AlertTriangle,
  Layers,
  Code2
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { sound } from '../utils/audio';

export default function ProjectsSection() {
  const { projects } = portfolioData;
  const surgeProject = projects.find(p => p.id === 'surgeticket');
  const webLaunchProject = projects.find(p => p.id === 'weblaunch');

  // Interactive SurgeTicket Simulator State
  const [simUsers, setSimUsers] = useState(140);
  const [simStatus, setSimStatus] = useState('NORMAL'); // NORMAL | SURGING | PROTECTED
  const [lockedSeat, setLockedSeat] = useState('A-14');
  const [seatTimer, setSeatTimer] = useState(300); // 5 minutes TTL
  const [isSimulating, setIsSimulating] = useState(false);
  const [latency, setLatency] = useState(16);

  // Seat hold timer countdown
  useEffect(() => {
    let interval = null;
    if (seatTimer > 0) {
      interval = setInterval(() => {
        setSeatTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [seatTimer]);

  const triggerSurgeSimulation = () => {
    sound.playWhoosh();
    setIsSimulating(true);
    setSimStatus('SURGING');
    setSimUsers(8750);
    setLatency(98);

    setTimeout(() => {
      sound.playSuccess();
      setSimStatus('PROTECTED (LOAD-SHEDDING ACTIVE)');
      setLatency(22);
      setSeatTimer(300); // reset 5m lock
      setIsSimulating(false);
    }, 1200);
  };

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <section id="projects" className="relative py-28 bg-[#05070c] overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 -left-40 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>Engineering Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Featured <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Full-Stack Projects</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Real-world systems engineered with a focus on high concurrency, distributed resilience, and conversion-driven digital platforms.
          </p>
        </div>

        {/* PROJECT 1: SurgeTicket (VaultProxy) */}
        <div className="mb-20 rounded-3xl bg-gradient-to-b from-slate-900/90 via-[#0a1122] to-slate-950/95 border border-cyan-500/30 p-6 sm:p-10 shadow-2xl relative overflow-hidden group">
          
          {/* Subtle corner badge */}
          <div className="absolute -top-12 -right-12 w-44 h-44 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Project Details & Context */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-950 text-cyan-300 border border-cyan-700/50 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-cyan-400" />
                  {surgeProject.badge}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-purple-950 text-purple-300 border border-purple-800/40">
                  {surgeProject.highlight}
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
                  {surgeProject.title}
                </h3>
                <p className="text-sm sm:text-base font-medium text-cyan-300 font-mono">
                  {surgeProject.tagline}
                </p>
              </div>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {surgeProject.description}
              </p>

              {/* Architecture Pillars List */}
              <div className="space-y-3 pt-2">
                {surgeProject.keyFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-white/5">
                    <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-300">{feat}</span>
                  </div>
                ))}
              </div>

              {/* Tech Stack Pills */}
              <div className="pt-2">
                <p className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Technologies Used:</p>
                <div className="flex flex-wrap gap-2">
                  {surgeProject.techStack.map(tech => (
                    <span key={tech} className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-800/90 text-cyan-200 border border-cyan-500/20">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Right: Live Interactive Simulation Widget */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl bg-[#070b15] border border-cyan-500/40 p-5 sm:p-6 shadow-2xl relative">
                
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      VaultProxy Telemetry Dashboard
                    </span>
                  </div>
                  <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800/40">
                    <Activity className="w-3 h-3 animate-pulse" />
                    LIVE ENGINE
                  </span>
                </div>

                {/* Telemetry Stats */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5">
                    <span className="text-[11px] text-slate-400 font-mono">Current Traffic</span>
                    <p className="text-xl font-bold font-mono text-white mt-1">
                      {simUsers.toLocaleString()} <span className="text-xs text-cyan-400">req/s</span>
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5">
                    <span className="text-[11px] text-slate-400 font-mono">p99 Latency</span>
                    <p className={`text-xl font-bold font-mono mt-1 ${latency > 50 ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {latency} <span className="text-xs text-slate-400">ms</span>
                    </p>
                  </div>
                </div>

                {/* System Status Display */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-cyan-500/20 mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] text-slate-400 font-mono uppercase">Middleware State</p>
                    <p className="text-xs sm:text-sm font-bold font-mono text-cyan-300 mt-0.5">
                      {simStatus}
                    </p>
                  </div>
                  <Zap className={`w-5 h-5 ${isSimulating ? 'text-amber-400 animate-spin' : 'text-emerald-400'}`} />
                </div>

                {/* Atomic Seat Hold Demonstration */}
                <div className="p-3.5 rounded-xl bg-gradient-to-r from-purple-950/40 to-slate-900 border border-purple-500/30 mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-purple-300">
                      <Lock className="w-3.5 h-3.5 text-purple-400" />
                      <span>Atomic Lock on Seat {lockedSeat}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-mono text-purple-200 bg-purple-900/60 px-2 py-0.5 rounded">
                      <Clock className="w-3 h-3" />
                      <span>TTL: {formatTimer(seatTimer)}</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Protected by distributed atomic lock key <code className="text-purple-300">seat_lock:A-14</code>. Prevents double-booking race condition.
                  </p>
                </div>

                {/* Simulation Trigger Button */}
                <button
                  onClick={triggerSurgeSimulation}
                  disabled={isSimulating}
                  className="w-full py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm font-mono text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 disabled:opacity-50 transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Flame className="w-4 h-4" />
                  <span>{isSimulating ? 'Processing Burst Traffic...' : 'Simulate 10,000 req/s Surge Flash Sale'}</span>
                </button>

                <p className="text-[10px] text-slate-400 text-center font-mono mt-2">
                  *CIT331 Web Technologies concurrency architecture simulation
                </p>

              </div>
            </div>

          </div>

        </div>

        {/* PROJECT 2: Web Launch Agency Platform */}
        <div className="rounded-3xl bg-gradient-to-b from-slate-900/90 via-[#091226] to-slate-950/95 border border-blue-500/30 p-6 sm:p-10 shadow-2xl relative overflow-hidden group">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Details */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-blue-950 text-blue-300 border border-blue-700/50 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-blue-400" />
                  {webLaunchProject.badge}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-950 text-emerald-300 border border-emerald-800/40">
                  {webLaunchProject.highlight}
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
                  {webLaunchProject.title}
                </h3>
                <p className="text-sm sm:text-base font-medium text-blue-300 font-mono">
                  {webLaunchProject.tagline}
                </p>
              </div>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {webLaunchProject.description}
              </p>

              {/* Key Features List */}
              <div className="space-y-3 pt-2">
                {webLaunchProject.keyFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-white/5">
                    <CheckCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-300">{feat}</span>
                  </div>
                ))}
              </div>

              {/* Live Link Button */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href={webLaunchProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sound.playClick()}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"
                >
                  <span>Launch Live Platform</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <span className="text-xs font-mono text-slate-400">
                  {webLaunchProject.liveUrl.replace('https://', '')}
                </span>
              </div>

            </div>

            {/* Right: Mock Browser Preview Frame */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden bg-slate-950 border border-blue-500/30 shadow-2xl">
                {/* Browser bar */}
                <div className="h-8 px-4 bg-slate-900 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                  </div>
                  <div className="px-3 py-0.5 rounded bg-slate-950 text-[10px] font-mono text-slate-400">
                    web-launch-gules.vercel.app
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </div>

                {/* Preview Card Inner Content */}
                <div className="p-6 bg-gradient-to-b from-[#091122] to-[#04060b] space-y-4">
                  <div className="inline-block px-2.5 py-0.5 rounded bg-blue-500/20 text-blue-400 text-[11px] font-mono">
                    Full-Service Digital Agency
                  </div>
                  <h4 className="text-xl font-bold text-white">
                    Scale Your Business With High-Performance Web & Meta Ads
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Designed and deployed for real client conversions. Includes fast-loading SSR pages, tailored hosting configurations, and Meta Pixel attribution integrations.
                  </p>

                  {/* Highlights Metric Grid */}
                  <div className="grid grid-cols-3 gap-2.5 pt-3">
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 text-center">
                      <p className="text-base font-bold text-cyan-400">99/100</p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">Lighthouse</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 text-center">
                      <p className="text-base font-bold text-blue-400">Edge CDN</p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">Global DNS</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 text-center">
                      <p className="text-base font-bold text-purple-400">Meta Ads</p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">Ready Funnel</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
