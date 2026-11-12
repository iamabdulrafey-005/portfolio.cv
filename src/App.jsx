import React, { useState, useEffect } from 'react';
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
import ThemeSwitcher from './components/ThemeSwitcher';
import Footer from './components/Footer';
import { sound } from './utils/audio';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(true);
  const [theme, setTheme] = useState('cyber');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleToggleSound = () => {
    const nextState = sound.toggleSound();
    setSoundActive(nextState);
  };

  const handleSelectTheme = (newTheme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-slate-100 flex flex-col selection:bg-[var(--primary)]/30 selection:text-cyan-200 transition-colors duration-500">
      
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

      {/* 2. Giant Desktop Monitor 3D Scroll Experience (With Parallax Tilt & Auto Zoom) */}
      <DesktopExperience 
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />

      {/* 3. Giant Smartphone 3D Scroll Experience (With Parallax Tilt, Live Notification & Auto Walkthrough) */}
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

      {/* Floating Theme Switcher Dock (Cyber, Violet, Matrix, Solar) */}
      <ThemeSwitcher 
        currentTheme={theme}
        onSelectTheme={handleSelectTheme}
      />

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
