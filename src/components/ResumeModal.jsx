import React from 'react';
import { X, Printer, Download, ExternalLink, Mail, GraduationCap, Award } from 'lucide-react';
import GithubIcon from './GithubIcon';
import { portfolioData } from '../data/portfolioData';
import { sound } from '../utils/audio';

export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const { personal, education, projects, skills } = portfolioData;

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      
      {/* Modal Card */}
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-slate-900 border border-white/15 rounded-3xl shadow-2xl flex flex-col overflow-hidden my-auto">
        
        {/* Top Control Bar */}
        <div className="px-6 py-4 bg-slate-950 border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-cyan-400"></span>
            <span className="text-sm font-bold text-white font-mono">
              Curriculum Vitae — Abdul Rafey (24L-0043)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-semibold shadow transition"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={() => { sound.playClick(); onClose(); }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-white text-slate-900 font-sans print:p-0 print:m-0">
          
          {/* Header */}
          <div className="border-b-2 border-slate-900 pb-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-black tracking-tight text-slate-900 uppercase">
                  {personal.name}
                </h1>
                <p className="text-base font-semibold text-cyan-700 mt-1">
                  {personal.title} • {education.currentStatus}
                </p>
                <p className="text-xs text-slate-600 mt-0.5">
                  Qarshi University, Lahore • Roll Number: {personal.rollNo}
                </p>
              </div>

              <div className="text-xs space-y-1 text-slate-700 sm:text-right font-mono">
                <p>Email: {personal.email}</p>
                <p>GitHub: github.com/{personal.githubUsername}</p>
                <p>Location: {personal.location}</p>
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-1 mb-2 font-mono">
              Professional Summary
            </h2>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
              {personal.longBio}
            </p>
          </div>

          {/* Education */}
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-1 mb-2 font-mono">
              Academic Education
            </h2>
            <div className="space-y-1">
              <div className="flex justify-between items-baseline text-xs sm:text-sm font-bold text-slate-900">
                <span>{education.degree}</span>
                <span className="text-xs font-mono text-slate-600">{education.period}</span>
              </div>
              <p className="text-xs font-semibold text-slate-700">
                {education.institution} (Roll No: {education.rollNumber})
              </p>
              <p className="text-xs text-slate-600">
                Active 5th Semester • Key Focus: CIT331 Web Technologies, Data Structures & Algorithms, Database Systems.
              </p>
            </div>
          </div>

          {/* Featured Technical Projects */}
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-1 mb-3 font-mono">
              Key Engineering Projects
            </h2>

            <div className="space-y-4">
              {projects.map((proj) => (
                <div key={proj.id} className="space-y-1">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                      {proj.title}
                    </h3>
                    <span className="text-[11px] font-mono font-semibold text-cyan-800">
                      {proj.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700">
                    {proj.description}
                  </p>
                  <div className="text-[11px] text-slate-600">
                    <strong className="text-slate-800">Tech Stack:</strong> {proj.techStack.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills & Tools */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-1 mb-3 font-mono">
              Technical Proficiencies & Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-800">
              <div>
                <strong className="block text-slate-900 font-bold mb-1">Frontend</strong>
                <p className="text-slate-700">React, JavaScript (ES6+), Tailwind CSS, HTML5, CSS3, Vite</p>
              </div>
              <div>
                <strong className="block text-slate-900 font-bold mb-1">Backend & Systems</strong>
                <p className="text-slate-700">Node.js, Express, REST APIs, XAMPP, MySQL, Concurrency Locks</p>
              </div>
              <div>
                <strong className="block text-slate-900 font-bold mb-1">Workflow & Tools</strong>
                <p className="text-slate-700">Git, GitHub, VS Code, Vercel Edge, Postman</p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
