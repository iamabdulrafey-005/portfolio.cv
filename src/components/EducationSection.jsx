import React from 'react';
import { GraduationCap, Award, BookOpen, Calendar, MapPin, CheckCircle2, Bookmark } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function EducationSection() {
  const { education } = portfolioData;

  return (
    <section id="education" className="relative py-28 bg-[#05070c] overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/70 border border-blue-500/30 text-blue-300 text-xs font-mono mb-4">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Education & <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">University Journey</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Formally training in computer science, software engineering principles, and web distributed architecture at Qarshi University, Lahore.
          </p>
        </div>

        {/* Main University Card */}
        <div className="rounded-3xl bg-gradient-to-b from-slate-900/90 via-[#0a1226] to-slate-950 border border-white/10 p-6 sm:p-10 shadow-2xl mb-12">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 p-[1.5px] shrink-0">
                <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center text-cyan-400">
                  <GraduationCap className="w-7 h-7" />
                </div>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {education.institution}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-cyan-950 text-cyan-300 border border-cyan-800/40">
                    Roll No: {education.rollNumber}
                  </span>
                </div>
                <p className="text-sm sm:text-base font-semibold text-cyan-300">
                  {education.degree}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-mono mt-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    {education.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-400" />
                    Lahore, Pakistan
                  </span>
                  <span className="text-emerald-400 font-bold">
                    ● Currently in 5th Semester
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end justify-center">
              <span className="text-xs text-slate-400 font-mono uppercase">Current Standing</span>
              <p className="text-lg font-bold text-white font-mono">{education.currentStatus}</p>
              <p className="text-xs text-cyan-400 font-mono mt-0.5">Faculty of Computer Science</p>
            </div>
          </div>

          {/* Academic Highlights & Key Coursework */}
          <div className="mt-8">
            <h4 className="text-sm font-mono uppercase tracking-wider text-slate-400 mb-6 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>Core Academic Coursework & Engineering Impact</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {education.highlights.map((item, idx) => (
                <div 
                  key={idx} 
                  className={`p-5 rounded-2xl border transition-all ${
                    item.course.includes('CIT331')
                      ? 'bg-cyan-950/20 border-cyan-500/40 shadow-lg shadow-cyan-950/20'
                      : 'bg-slate-900/60 border-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="text-base font-bold text-white flex items-center gap-2">
                      <Bookmark className={`w-4 h-4 ${item.course.includes('CIT331') ? 'text-cyan-400' : 'text-blue-400'}`} />
                      {item.course}
                    </h5>
                    {item.course.includes('CIT331') && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        SurgeTicket Project
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
