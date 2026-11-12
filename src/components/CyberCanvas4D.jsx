import React, { useEffect, useRef, useState } from 'react';
import { Gamepad2, X, Trophy, Zap, Shield, Flame } from 'lucide-react';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

export default function CyberCanvas4D({ isGameActive, onCloseGame }) {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);

  const gameStateRef = useRef({
    active: isGameActive,
    playerX: 0,
    playerY: 0,
    bullets: [],
    targets: [],
    particles: [],
    lastSpawn: 0,
    score: 0,
    lives: 3
  });

  useEffect(() => {
    gameStateRef.current.active = isGameActive;
    if (isGameActive) {
      setScore(0);
      setLives(3);
      setGameOver(false);
      gameStateRef.current.score = 0;
      gameStateRef.current.lives = 3;
      gameStateRef.current.targets = [];
      gameStateRef.current.bullets = [];
    }
  }, [isGameActive]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gameStateRef.current.playerX = canvas.width / 2;
      gameStateRef.current.playerY = canvas.height - 100;
    };
    resize();
    window.addEventListener('resize', resize);

    // 4D Starfield / Tesseract Points
    const numPoints = 200;
    const points4D = [];
    for (let i = 0; i < numPoints; i++) {
      points4D.push({
        x: (Math.random() - 0.5) * 2000,
        y: (Math.random() - 0.5) * 2000,
        z: Math.random() * 2000,
        w: (Math.random() - 0.5) * 1000,
        size: Math.random() * 2 + 1,
        color: i % 3 === 0 ? '#06b6d4' : i % 3 === 1 ? '#8b5cf6' : '#3b82f6'
      });
    }

    let angle4D = 0;

    // Mouse Tracking
    const handleMouseMove = (e) => {
      gameStateRef.current.playerX = e.clientX;
      if (gameStateRef.current.active) {
        gameStateRef.current.playerY = Math.max(canvas.height - 200, Math.min(canvas.height - 50, e.clientY));
      }
    };

    const handleClick = (e) => {
      if (gameStateRef.current.active && !gameOver) {
        sound.playKey();
        // Fire player photon torpedo
        gameStateRef.current.bullets.push({
          x: gameStateRef.current.playerX,
          y: gameStateRef.current.playerY - 20,
          vy: -14
        });
      } else {
        // Hyperspace shockwave in background
        sound.playClick();
        for (let i = 0; i < 30; i++) {
          gameStateRef.current.particles.push({
            x: e.clientX,
            y: e.clientY,
            vx: (Math.random() - 0.5) * 8,
            vy: (Math.random() - 0.5) * 8,
            alpha: 1,
            color: '#06b6d4'
          });
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    // Main 4D Animation & Game Loop
    const render = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      angle4D += 0.008;

      // 1. Render 4D Hyperspace Warp Points
      const fov = 400;
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      for (let i = 0; i < points4D.length; i++) {
        const p = points4D[i];
        
        // 4D Rotation in XW and ZW planes
        const cosA = Math.cos(angle4D * 0.5);
        const sinA = Math.sin(angle4D * 0.5);
        const rotatedX = p.x * cosA - p.w * sinA;
        const rotatedW = p.x * sinA + p.w * cosA;

        // Warp travel toward screen
        p.z -= 4 * speedMultiplier;
        if (p.z <= 10) {
          p.z = 2000;
          p.x = (Math.random() - 0.5) * 2000;
          p.y = (Math.random() - 0.5) * 2000;
        }

        // Perspective Projection 4D -> 3D -> 2D Screen
        const scale = fov / (fov + p.z);
        const sx = cx + rotatedX * scale;
        const sy = cy + p.y * scale;

        if (sx > 0 && sx < canvas.width && sy > 0 && sy < canvas.height) {
          ctx.beginPath();
          ctx.arc(sx, sy, Math.max(0.8, p.size * scale * 2), 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.min(1, Math.max(0.1, (1 - p.z / 2000) * 1.5));
          ctx.fill();

          // Speed streaks for 4D warp feeling
          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.lineTo(cx + rotatedX * (scale * 0.96), cy + p.y * (scale * 0.96));
          ctx.strokeStyle = p.color;
          ctx.lineWidth = scale * 1.5;
          ctx.stroke();
        }
      }

      ctx.globalAlpha = 1;

      // 2. Click Particles Shockwave
      for (let i = gameStateRef.current.particles.length - 1; i >= 0; i--) {
        const pt = gameStateRef.current.particles[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.alpha -= 0.02;
        if (pt.alpha <= 0) {
          gameStateRef.current.particles.splice(i, 1);
        } else {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = pt.color;
          ctx.globalAlpha = pt.alpha;
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      // 3. GAME MODE EXECUTION
      if (gameStateRef.current.active && !gameOver) {
        const state = gameStateRef.current;

        // Spawn targets (Packets vs Bots)
        if (time - state.lastSpawn > 1100) {
          state.lastSpawn = time;
          const isBot = Math.random() > 0.4;
          state.targets.push({
            x: Math.random() * (canvas.width - 120) + 60,
            y: -30,
            isBot: isBot,
            radius: isBot ? 22 : 18,
            vy: isBot ? 3.5 : 2.5,
            label: isBot ? 'DDoS' : 'Ticket Req'
          });
        }

        // Draw Player Cyber Probe
        ctx.save();
        ctx.translate(state.playerX, state.playerY);
        ctx.beginPath();
        ctx.moveTo(0, -22);
        ctx.lineTo(-18, 18);
        ctx.lineTo(0, 8);
        ctx.lineTo(18, 18);
        ctx.closePath();
        ctx.fillStyle = '#06b6d4';
        ctx.shadowColor = '#06b6d4';
        ctx.shadowBlur = 20;
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();

        // Update & Render Bullets
        for (let b = state.bullets.length - 1; b >= 0; b--) {
          const bullet = state.bullets[b];
          bullet.y += bullet.vy;

          ctx.beginPath();
          ctx.arc(bullet.x, bullet.y, 4, 0, Math.PI * 2);
          ctx.fillStyle = '#38bdf8';
          ctx.shadowColor = '#38bdf8';
          ctx.shadowBlur = 12;
          ctx.fill();

          if (bullet.y < 0) {
            state.bullets.splice(b, 1);
            continue;
          }

          // Collision check bullet vs targets
          for (let t = state.targets.length - 1; t >= 0; t--) {
            const target = state.targets[t];
            const dist = Math.hypot(bullet.x - target.x, bullet.y - target.y);
            if (dist < target.radius + 4) {
              sound.playSuccess();
              if (target.isBot) {
                state.score += 150;
              } else {
                state.score += 50;
              }
              setScore(state.score);

              // Celebration confetti upon milestone
              if (state.score >= 1000 && state.score - 150 < 1000) {
                confetti({ particleCount: 80, spread: 60 });
              }

              // Destroy target and bullet
              state.targets.splice(t, 1);
              state.bullets.splice(b, 1);
              break;
            }
          }
        }

        // Update & Render Targets
        for (let t = state.targets.length - 1; t >= 0; t--) {
          const target = state.targets[t];
          target.y += target.vy;

          // Draw Target
          ctx.save();
          ctx.translate(target.x, target.y);
          ctx.beginPath();
          ctx.arc(0, 0, target.radius, 0, Math.PI * 2);
          ctx.fillStyle = target.isBot ? 'rgba(239, 68, 68, 0.85)' : 'rgba(16, 185, 129, 0.85)';
          ctx.shadowColor = target.isBot ? '#ef4444' : '#10b981';
          ctx.shadowBlur = 15;
          ctx.fill();
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Label
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 9px monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(target.label, 0, 0);
          ctx.restore();

          // Check if target passed player
          if (target.y > canvas.height) {
            if (target.isBot) {
              // Missed a DDoS bot -> take life
              state.lives -= 1;
              setLives(state.lives);
              if (state.lives <= 0) {
                setGameOver(true);
              }
            }
            state.targets.splice(t, 1);
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, [gameOver, speedMultiplier]);

  return (
    <>
      {/* Background 4D Canvas */}
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 pointer-events-none transition-opacity duration-700 ${
          isGameActive ? 'z-40 pointer-events-auto bg-black/85 backdrop-blur-sm' : 'z-0 opacity-70'
        }`}
      />

      {/* Game Mode HUD (When Active) */}
      {isGameActive && (
        <div className="fixed inset-0 z-50 pointer-events-none flex flex-col justify-between p-6 select-none">
          
          {/* Top Game HUD Bar */}
          <div className="flex items-center justify-between pointer-events-auto">
            <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-900/90 border border-cyan-500/40 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center gap-2">
                <Gamepad2 className="w-5 h-5 text-cyan-400 animate-pulse" />
                <div>
                  <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                    Surge Defender: CIT331 Shield
                  </h4>
                  <p className="text-[10px] text-cyan-400 font-mono">
                    Aim with mouse • Click to shoot packets
                  </p>
                </div>
              </div>

              <div className="h-6 w-[1px] bg-white/10"></div>

              {/* Score Counter */}
              <div className="text-right">
                <p className="text-[10px] text-slate-400 font-mono">Score</p>
                <p className="text-lg font-black text-cyan-300 font-mono tracking-wider">{score}</p>
              </div>

              {/* Lives */}
              <div className="flex items-center gap-1 pl-2">
                {[...Array(3)].map((_, i) => (
                  <span 
                    key={i} 
                    className={`text-sm ${i < lives ? 'text-rose-500' : 'text-slate-700'}`}
                  >
                    ❤️
                  </span>
                ))}
              </div>
            </div>

            {/* Exit Game Button */}
            <button
              onClick={() => { sound.playClick(); onCloseGame(); }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white text-xs font-mono border border-white/20 shadow-2xl transition cursor-pointer"
            >
              <X className="w-4 h-4 text-rose-400" />
              <span>Exit Game</span>
            </button>
          </div>

          {/* Game Over Screen */}
          {gameOver && (
            <div className="m-auto pointer-events-auto p-8 rounded-3xl bg-slate-950/95 border-2 border-rose-500/50 backdrop-blur-2xl text-center space-y-4 max-w-md shadow-2xl animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
                <Flame className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-wider">
                System Overloaded!
              </h3>
              <p className="text-xs text-slate-300 font-mono">
                Final Score: <span className="text-cyan-400 font-bold text-sm">{score}</span>
              </p>
              <p className="text-[11px] text-slate-400">
                SurgeTicket load-shedding circuit breaker prevented total shutdown.
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setGameOver(false);
                    setScore(0);
                    setLives(3);
                    gameStateRef.current.score = 0;
                    gameStateRef.current.lives = 3;
                    gameStateRef.current.targets = [];
                  }}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg cursor-pointer"
                >
                  Play Again
                </button>
                <button
                  onClick={onCloseGame}
                  className="px-5 py-2.5 rounded-xl font-mono text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                >
                  Back to Portfolio
                </button>
              </div>
            </div>
          )}

          {/* Bottom Instructions Tip */}
          {!gameOver && (
            <div className="mx-auto text-center pointer-events-auto">
              <span className="px-4 py-1.5 rounded-full bg-black/70 border border-cyan-500/30 text-[11px] font-mono text-slate-300 backdrop-blur-md">
                🟢 Green = Ticket Requests (+50) • 🔴 Red = DDoS Attacks (+150)
              </span>
            </div>
          )}

        </div>
      )}
    </>
  );
}
