import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { sound } from '../utils/audio';

export default function InteractiveTerminal({ isOpen, onClose }) {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: 'Welcome to Abdul Rafey Developer Console v1.0.0 [BSCS 5th Sem, Qarshi University]' },
    { type: 'system', text: 'Type "help" to list available commands.' },
  ]);

  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      sound.playClick();
      const rawCmd = inputVal.trim();
      const cmd = rawCmd.toLowerCase();

      if (!cmd) return;

      const newHistory = [...history, { type: 'user', text: `$ ${rawCmd}` }];

      switch (cmd) {
        case 'help':
          newHistory.push({
            type: 'output',
            text: `Available commands:
  • about         - View Abdul Rafey's profile and bio
  • education     - Details on Qarshi University BSCS & Roll No
  • projects      - List featured software projects
  • surgeticket   - Deep-dive into SurgeTicket (VaultProxy)
  • weblaunch     - View Web Launch digital agency details
  • skills        - Core languages, frameworks & tools
  • github        - Open GitHub profile (@iamabdulrafey-005)
  • contact       - Reach out directly to Abdul Rafey
  • clear         - Clear terminal history
  • sudo hire     - Unlock special offer 😉`
          });
          break;

        case 'about':
          newHistory.push({
            type: 'output',
            text: `Abdul Rafey: 5th-semester BSCS student at Qarshi University, Lahore.
Passionate about modern web architecture, distributed load management, and full-stack development using React, Node.js, and Tailwind CSS.`
          });
          break;

        case 'education':
          newHistory.push({
            type: 'output',
            text: `Institution: Qarshi University, Lahore
Program:     Bachelor of Science in Computer Science (BSCS)
Semester:    5th Semester
Roll Number: 24L-0043
Focus:       Web Technologies (CIT331), Algorithms, Database Systems`
          });
          break;

        case 'projects':
          newHistory.push({
            type: 'output',
            text: `1. SurgeTicket (VaultProxy)
   Adaptive load-shedding middleware with atomic seat locks during flash sale surges. (CIT331 Web Tech)
2. Web Launch (web-launch-gules.vercel.app)
   Digital agency platform for custom web development, hosting & Meta ads.`
          });
          break;

        case 'surgeticket':
          newHistory.push({
            type: 'output',
            text: `SURGETICKET (VAULTPROXY)
- Engineered for CIT331 Web Technologies at Qarshi University.
- Core: Token-bucket load-shedder + Distributed atomic seat locking with 5-minute TTL.
- Eliminates race conditions and prevents ticket scalping bots.`
          });
          break;

        case 'weblaunch':
          newHistory.push({
            type: 'output',
            text: `WEB LAUNCH (web-launch-gules.vercel.app)
- Digital agency web platform live on Vercel Edge.
- Delivers high-converting landing pages, hosting solutions, and Meta ads campaign funnels.`
          });
          break;

        case 'skills':
          newHistory.push({
            type: 'output',
            text: `Languages & Frontend: JavaScript (ES6+), React, Tailwind CSS, HTML5, CSS3
Backend & Systems:   Node.js, Express, REST APIs, XAMPP, MySQL
Tools & Workflow:    Git, GitHub (iamabdulrafey-005), VS Code, Vercel`
          });
          break;

        case 'github':
          newHistory.push({
            type: 'output',
            text: `Redirecting to https://github.com/iamabdulrafey-005 ...`
          });
          window.open('https://github.com/iamabdulrafey-005', '_blank');
          break;

        case 'contact':
          newHistory.push({
            type: 'output',
            text: `Email:  iamabdulrafey005@gmail.com
GitHub: @iamabdulrafey-005
Campus: Qarshi University, Lahore`
          });
          break;

        case 'clear':
          setHistory([]);
          setInputVal('');
          return;

        case 'sudo hire':
          sound.playSuccess();
          newHistory.push({
            type: 'output',
            text: `🎉 ACCESS GRANTED: Abdul Rafey is highly motivated and ready to bring value to your engineering team! Contact him at iamabdulrafey005@gmail.com`
          });
          break;

        default:
          newHistory.push({
            type: 'error',
            text: `Command not found: "${cmd}". Type "help" for a list of valid commands.`
          });
          break;
      }

      setHistory(newHistory);
      setInputVal('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-3xl rounded-2xl overflow-hidden bg-[#070b14] border border-cyan-500/40 shadow-2xl flex flex-col h-[520px]">
        
        {/* Terminal Header */}
        <div className="h-10 px-4 bg-[#0a0f1d] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TerminalIcon className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-mono font-bold text-white">
              bash -- abdul-rafey@qarshi-univ: ~ (24L-0043)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => { sound.playClick(); onClose(); }}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div 
          onClick={() => inputRef.current?.focus()}
          className="flex-1 p-4 overflow-y-auto font-mono text-xs text-slate-300 space-y-2 select-text"
        >
          {history.map((line, idx) => (
            <div key={idx} className="leading-relaxed">
              {line.type === 'system' && (
                <p className="text-cyan-400 font-medium">{line.text}</p>
              )}
              {line.type === 'user' && (
                <p className="text-emerald-400 font-semibold">{line.text}</p>
              )}
              {line.type === 'output' && (
                <pre className="text-slate-200 whitespace-pre-wrap">{line.text}</pre>
              )}
              {line.type === 'error' && (
                <p className="text-rose-400">{line.text}</p>
              )}
            </div>
          ))}

          {/* Interactive Command Input Line */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-emerald-400 font-bold">$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => {
                sound.playKey();
                setInputVal(e.target.value);
              }}
              onKeyDown={handleCommand}
              placeholder="type a command (e.g. help, surgeticket, skills)..."
              className="flex-1 bg-transparent text-white font-mono text-xs focus:outline-none placeholder-slate-600"
              autoFocus
            />
            <span className="w-2 h-4 bg-cyan-400 animate-pulse"></span>
          </div>

          <div ref={bottomRef}></div>
        </div>

        {/* Quick Suggestion Chips Footer */}
        <div className="px-4 py-2.5 bg-[#090d1a] border-t border-white/5 flex flex-wrap items-center gap-2 text-[10px] font-mono text-slate-400">
          <span>Suggestions:</span>
          {['help', 'surgeticket', 'weblaunch', 'education', 'skills', 'contact', 'clear'].map(c => (
            <button
              key={c}
              onClick={() => {
                sound.playClick();
                setInputVal(c);
                inputRef.current?.focus();
              }}
              className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 hover:bg-slate-700 transition"
            >
              {c}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
