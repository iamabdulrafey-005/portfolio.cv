import React from 'react';
import { Palette, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

export const THEMES = [
  { id: 'cyber', name: 'Cyber Cyan', color: '#06b6d4', glow: 'rgba(6, 182, 212, 0.6)' },
  { id: 'violet', name: 'Neon Tokyo', color: '#c084fc', glow: 'rgba(192, 132, 252, 0.6)' },
  { id: 'matrix', name: 'Matrix Emerald', color: '#10b981', glow: 'rgba(16, 185, 129, 0.6)' },
  { id: 'solar', name: 'Solar Flare', color: '#f59e0b', glow: 'rgba(245, 158, 11, 0.6)' },
];

export default function ThemeSwitcher({ currentTheme, onSelectTheme }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 p-2 rounded-2xl bg-slate-900/90 border border-white/10 backdrop-blur-xl shadow-2xl shadow-black/80">
      <div className="flex items-center gap-1.5 px-2 py-1 text-slate-400 font-mono text-xs">
        <Palette className="w-3.5 h-3.5 text-cyan-400" />
        <span className="hidden sm:inline font-bold">Theme</span>
      </div>

      <div className="flex items-center gap-1.5">
        {THEMES.map((t) => (
          <button
            key={t.id}
            onClick={() => {
              sound.playClick();
              onSelectTheme(t.id);
            }}
            title={`Switch to ${t.name}`}
            className={`relative flex items-center justify-center w-7 h-7 rounded-xl transition-all duration-300 cursor-pointer ${
              currentTheme === t.id
                ? 'scale-115 ring-2 ring-white/80 shadow-lg'
                : 'opacity-65 hover:opacity-100 hover:scale-105'
            }`}
            style={{ 
              backgroundColor: t.color,
              boxShadow: currentTheme === t.id ? `0 0 16px ${t.glow}` : 'none'
            }}
          >
            {currentTheme === t.id && (
              <span className="w-2 h-2 rounded-full bg-white shadow-sm animate-ping"></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
