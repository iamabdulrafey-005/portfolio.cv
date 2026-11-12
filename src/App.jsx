import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import DesktopExperience from './components/DesktopExperience';
import MobileExperience from './components/MobileExperience';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import EducationSection from './components/EducationSection';
import ContactSection from './components/ContactSection';
import InteractiveTerminal from './components/InteractiveTerminal';
import ResumeModal from './components/ResumeModal';
import Footer from './components/Footer';
import { sound } from './utils/audio';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(true);

  const handleToggleSound = () => {
    const nextState = sound.toggleSound();
    setSoundActive(nextState);
  };

  return (
    <div className="min-h-screen bg-[#05070c] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Global Navigation Header */}
      <Navbar 
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        soundActive={soundActive}
        onToggleSound={handleToggleSound}
      />

      {/* 1. Cinematic Hero Section */}
      <HeroSection 
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* 2. Desktop Monitor 3D Scroll Experience (Scroll-Controlled Zoom In & Out) */}
      <DesktopExperience 
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />

      {/* 3. Smartphone 3D Scroll Experience (Scroll-Controlled Mobile Zoom In & Out) */}
      <MobileExperience 
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />

      {/* 4. Full Featured Projects Deep-Dive (SurgeTicket & Web Launch) */}
      <ProjectsSection />

      {/* 5. Technical Skills & Tools Matrix */}
      <SkillsSection />

      {/* 6. Education & Academic Journey (Qarshi University, 24L-0043) */}
      <EducationSection />

      {/* 7. Contact Form & Social Connect */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Interactive Terminal CLI Modal */}
      <InteractiveTerminal 
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />

      {/* Printable Resume / CV Modal */}
      <ResumeModal 
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

    </div>
  );
}
