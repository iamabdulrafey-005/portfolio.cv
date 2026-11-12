import React, { useState } from 'react';
import { 
  Code, 
  Layers, 
  Terminal, 
  Cpu, 
  CheckCircle2, 
  Sparkles,
  GitBranch,
  Server,
  Database
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { sound } from '../utils/audio';

export default function SkillsSection() {
  const { skills } = portfolioData;
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Technologies' },
    ...skills.categories.map(c => ({ id: c.id, label: c.name }))
  ];

  const filteredCategories = activeCategory === 'all' 
    ? skills.categories 
    : skills.categories.filter(c => c.id === activeCategory);

  return (
    <section id="skills" className="relative py-28 bg-[#04060b] overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/70 border border-purple-500/30 text-purple-300 text-xs font-mono mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Tools & <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Tech Stack</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            A comprehensive overview of languages, frameworks, systems, and developer workflows I use to build scalable web applications.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { sound.playClick(); setActiveCategory(cat.id); }}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-lg shadow-cyan-500/20 scale-105'
                    : 'bg-slate-900/90 text-slate-400 hover:text-white border border-white/5 hover:border-cyan-500/30'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Cards Grid grouped by category */}
        <div className="space-y-12">
          {filteredCategories.map((group) => (
            <div key={group.id} className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
                <h3 className="text-lg font-bold text-white font-mono tracking-wide">
                  {group.name}
                </h3>
                <div className="flex-1 h-[1px] bg-gradient-to-r from-cyan-500/30 to-transparent"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {group.items.map((skill) => (
                  <div
                    key={skill.name}
                    className="p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-white/5 hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-950/30 group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {skill.name}
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-400 border border-white/5">
                        {skill.status}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                      {skill.desc}
                    </p>

                    {/* Proficiency bar */}
                    <div>
                      <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
                        <span>Proficiency</span>
                        <span className="text-cyan-300 font-bold">{skill.level}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div 
                          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Featured Tools Highlight Row */}
        <div className="mt-16 p-6 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-md flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400">
              <GitBranch className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Daily Workflow & Version Control</p>
              <p className="text-xs text-slate-400 font-mono">VS Code • GitHub (@iamabdulrafey-005) • XAMPP • Vercel CI/CD</p>
            </div>
          </div>

          <a
            href={portfolioData.personal.githubUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => sound.playClick()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium text-cyan-300 bg-cyan-950/80 border border-cyan-700/50 hover:bg-cyan-900 transition-colors"
          >
            <span>Explore Repositories on GitHub</span>
            <span>→</span>
          </a>
        </div>

      </div>

    </section>
  );
}
