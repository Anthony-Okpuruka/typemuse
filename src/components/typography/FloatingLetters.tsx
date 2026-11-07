import React, { useEffect, useRef } from 'react';

interface LetterParticle {
  char: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: string | number;
  fontStyle: string;
  isOversized: boolean;
  color: string;
  alpha: number;
  normX: number; // 0 to 1
  normY: number; // 0 to 1
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseAngle: number;
  angle: number;
  vAngle: number;
  idlePhaseX: number;
  idlePhaseY: number;
  idleSpeedX: number;
  idleSpeedY: number;
  idleAmpX: number;
  idleAmpY: number;
  mass: number;
  radius: number;
}

export const FloatingLetters: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const isMobile = width < 768;

    // Palette per creative direction: midnight black, pale lemon, soft lemon, cool grey
    const COLORS = {
      midnight: '#101116',
      paleLemon: '#FBFBCB',
      softLemon: '#F4F36A',
      coolGrey: '#777982',
    };

    // Curated edge & perimeter letter definitions
    // Strategically positioned around borders with oversized cut-offs
    const letterConfigs: Array<{
      char: string;
      normX: number;
      normY: number;
      size: number;
      weight: string | number;
      style?: string;
      font: string;
      color: string;
      alpha: number;
      angle: number;
      isOversized?: boolean;
    }> = [
      // --- OVERSIZED CORNER & EDGE CUT-OFFS (User highlighted feature) ---
      {
        char: 'g',
        normX: 0.02,
        normY: 0.12,
        size: isMobile ? 180 : 320,
        weight: 700,
        style: 'italic',
        font: 'Playfair Display, serif',
        color: COLORS.paleLemon,
        alpha: 0.9,
        angle: -12,
        isOversized: true,
      },
      {
        char: '&',
        normX: 0.96,
        normY: 0.15,
        size: isMobile ? 160 : 300,
        weight: 400,
        style: 'italic',
        font: 'Cormorant Garamond, serif',
        color: COLORS.midnight,
        alpha: 0.08,
        angle: 15,
        isOversized: true,
      },
      {
        char: 'M',
        normX: -0.02,
        normY: 0.88,
        size: isMobile ? 190 : 340,
        weight: 800,
        font: 'Syne, sans-serif',
        color: COLORS.paleLemon,
        alpha: 0.85,
        angle: -8,
        isOversized: true,
      },
      {
        char: 'Q',
        normX: 0.98,
        normY: 0.86,
        size: isMobile ? 170 : 310,
        weight: 700,
        style: 'italic',
        font: 'Playfair Display, serif',
        color: COLORS.softLemon,
        alpha: 0.5,
        angle: 18,
        isOversized: true,
      },

      // --- UPPER MARGINS & EDGES ---
      {
        char: 'A',
        normX: 0.22,
        normY: 0.06,
        size: 56,
        weight: 800,
        font: 'Syne, sans-serif',
        color: COLORS.midnight,
        alpha: 0.2,
        angle: -5,
      },
      {
        char: 'k',
        normX: 0.44,
        normY: 0.04,
        size: 42,
        weight: 400,
        style: 'italic',
        font: 'Cormorant Garamond, serif',
        color: COLORS.midnight,
        alpha: 0.18,
        angle: 12,
      },
      {
        char: '7',
        normX: 0.65,
        normY: 0.05,
        size: 58,
        weight: 700,
        font: 'JetBrains Mono, monospace',
        color: COLORS.midnight,
        alpha: 0.15,
        angle: -14,
      },
      {
        char: 'R',
        normX: 0.82,
        normY: 0.08,
        size: 72,
        weight: 600,
        font: 'Playfair Display, serif',
        color: COLORS.midnight,
        alpha: 0.22,
        angle: 8,
      },

      // --- LEFT FLANK ---
      {
        char: 'B',
        normX: 0.06,
        normY: 0.38,
        size: 86,
        weight: 700,
        font: 'Syne, sans-serif',
        color: COLORS.midnight,
        alpha: 0.16,
        angle: -10,
      },
      {
        char: 'f',
        normX: 0.04,
        normY: 0.58,
        size: 64,
        weight: 400,
        style: 'italic',
        font: 'Playfair Display, serif',
        color: COLORS.midnight,
        alpha: 0.25,
        angle: 16,
      },
      {
        char: '3',
        normX: 0.11,
        normY: 0.72,
        size: 48,
        weight: 700,
        font: 'JetBrains Mono, monospace',
        color: COLORS.paleLemon,
        alpha: 0.95,
        angle: -7,
      },
      {
        char: '§',
        normX: 0.08,
        normY: 0.24,
        size: 34,
        weight: 400,
        font: 'Playfair Display, serif',
        color: COLORS.coolGrey,
        alpha: 0.3,
        angle: 22,
      },

      // --- RIGHT FLANK ---
      {
        char: 'Z',
        normX: 0.94,
        normY: 0.36,
        size: 78,
        weight: 800,
        font: 'Syne, sans-serif',
        color: COLORS.midnight,
        alpha: 0.15,
        angle: 14,
      },
      {
        char: 'x',
        normX: 0.91,
        normY: 0.54,
        size: 52,
        weight: 500,
        font: 'Plus Jakarta Sans, sans-serif',
        color: COLORS.midnight,
        alpha: 0.22,
        angle: -18,
      },
      {
        char: '8',
        normX: 0.93,
        normY: 0.70,
        size: 68,
        weight: 700,
        font: 'JetBrains Mono, monospace',
        color: COLORS.midnight,
        alpha: 0.18,
        angle: 9,
      },
      {
        char: '¶',
        normX: 0.87,
        normY: 0.24,
        size: 38,
        weight: 400,
        font: 'Cormorant Garamond, serif',
        color: COLORS.paleLemon,
        alpha: 0.8,
        angle: -15,
      },

      // --- LOWER MARGINS & ACCENTS ---
      {
        char: 'e',
        normX: 0.22,
        normY: 0.94,
        size: 44,
        weight: 400,
        style: 'italic',
        font: 'Playfair Display, serif',
        color: COLORS.midnight,
        alpha: 0.18,
        angle: 12,
      },
      {
        char: '?',
        normX: 0.40,
        normY: 0.96,
        size: 36,
        weight: 700,
        font: 'Syne, sans-serif',
        color: COLORS.softLemon,
        alpha: 0.8,
        angle: -20,
      },
      {
        char: 't',
        normX: 0.62,
        normY: 0.95,
        size: 48,
        weight: 600,
        font: 'Plus Jakarta Sans, sans-serif',
        color: COLORS.midnight,
        alpha: 0.16,
        angle: 8,
      },
      {
        char: 'W',
        normX: 0.78,
        normY: 0.92,
        size: 82,
        weight: 800,
        font: 'Syne, sans-serif',
        color: COLORS.midnight,
        alpha: 0.14,
        angle: -9,
      },
    ];

    // Filter down count on mobile to keep performance ultra-smooth
    const activeConfigs = isMobile
      ? letterConfigs.filter((_, idx) => idx % 2 === 0 || idx < 4)
      : letterConfigs;

    let particles: LetterParticle[] = [];

    const initParticles = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      particles = activeConfigs.map((cfg, index) => {
        const homeX = cfg.normX * width;
        const homeY = cfg.normY * height;
        const mass = cfg.isOversized ? 4.5 : 1.2 + (cfg.size / 100);
        const rad = cfg.isOversized ? cfg.size * 0.45 : cfg.size * 0.75;

        return {
          char: cfg.char,
          fontFamily: cfg.font,
          fontSize: cfg.size,
          fontWeight: cfg.weight,
          fontStyle: cfg.style || 'normal',
          isOversized: !!cfg.isOversized,
          color: cfg.color,
          alpha: cfg.alpha,
          normX: cfg.normX,
          normY: cfg.normY,
          homeX,
          homeY,
          x: homeX,
          y: homeY,
          vx: 0,
          vy: 0,
          baseAngle: (cfg.angle * Math.PI) / 180,
          angle: (cfg.angle * Math.PI) / 180,
          vAngle: 0,
          idlePhaseX: index * 1.37,
          idlePhaseY: index * 0.91 + 1.2,
          idleSpeedX: 0.0008 + (index % 5) * 0.0002,
          idleSpeedY: 0.0009 + (index % 4) * 0.0002,
          idleAmpX: cfg.isOversized ? 12 : 8,
          idleAmpY: cfg.isOversized ? 16 : 10,
          mass,
          radius: rad,
        };
      });
    };

    initParticles();

    // Mouse / Pointer State
    const pointer = {
      x: -1000,
      y: -1000,
      prevX: -1000,
      prevY: -1000,
      vx: 0,
      vy: 0,
      isActive: false,
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      if (pointer.prevX > -500) {
        pointer.vx = currentX - pointer.prevX;
        pointer.vy = currentY - pointer.prevY;
      }

      pointer.x = currentX;
      pointer.y = currentY;
      pointer.prevX = currentX;
      pointer.prevY = currentY;
      pointer.isActive = true;
    };

    const handlePointerLeave = () => {
      pointer.isActive = false;
      pointer.x = -1000;
      pointer.y = -1000;
      pointer.vx = 0;
      pointer.vy = 0;
    };

    // Gentle tactile click ripple
    const handlePointerDown = (e: PointerEvent) => {
      const clickX = e.clientX;
      const clickY = e.clientY;

      particles.forEach(p => {
        const dx = p.x - clickX;
        const dy = p.y - clickY;
        const dist = Math.hypot(dx, dy);
        const rippleRadius = 240;

        if (dist < rippleRadius && dist > 1) {
          const impulse = (1 - dist / rippleRadius) * (20 / p.mass);
          p.vx += (dx / dist) * impulse;
          p.vy += (dy / dist) * impulse;
          p.vAngle += ((Math.random() - 0.5) * 0.04) / p.mass;
        }
      });
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('pointerdown', handlePointerDown);

    const handleResize = () => {
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let time = 0;
    let isTabVisible = true;

    const handleVisibilityChange = () => {
      isTabVisible = document.visibilityState !== 'hidden';
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const render = () => {
      if (!isTabVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      time += 1;
      ctx.clearRect(0, 0, width, height);

      // Decay pointer velocity
      pointer.vx *= 0.85;
      pointer.vy *= 0.85;

      const repulsionRadius = isMobile ? 130 : 200;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 1. Organic Idle Floating
        const idleX = Math.sin(time * p.idleSpeedX + p.idlePhaseX) * p.idleAmpX;
        const idleY = Math.cos(time * p.idleSpeedY + p.idlePhaseY) * p.idleAmpY;
        const targetX = p.homeX + idleX;
        const targetY = p.homeY + idleY;

        // 2. Cursor Repulsion & Directional Push
        if (pointer.isActive) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const dist = Math.hypot(dx, dy);

          const effectiveRadius = p.isOversized ? repulsionRadius * 1.3 : repulsionRadius;

          if (dist < effectiveRadius && dist > 1) {
            const factor = Math.pow(1 - dist / effectiveRadius, 1.6);
            const repelForce = (factor * 32) / p.mass;

            // Normal radial push
            const nx = dx / dist;
            const ny = dy / dist;
            p.vx += nx * repelForce;
            p.vy += ny * repelForce;

            // Direction-sensitive drag from pointer velocity
            const dragForce = 0.18 / p.mass;
            p.vx += pointer.vx * dragForce * factor;
            p.vy += pointer.vy * dragForce * factor;

            // Slight rotational twist upon impact
            const crossProduct = nx * pointer.vy - ny * pointer.vx;
            p.vAngle += (crossProduct * 0.0001 + (nx > 0 ? 0.002 : -0.002)) * factor;
          }
        }

        // 3. Spring Dynamics (Smooth return to target)
        const springK = p.isOversized ? 0.035 : 0.045;
        const damping = p.isOversized ? 0.88 : 0.84;

        p.vx += (targetX - p.x) * springK;
        p.vy += (targetY - p.y) * springK;
        p.vx *= damping;
        p.vy *= damping;

        p.x += p.vx;
        p.y += p.vy;

        // 4. Angular Spring Dynamics
        const rotSpringK = 0.04;
        const rotDamping = 0.82;
        p.vAngle += (p.baseAngle - p.angle) * rotSpringK;
        p.vAngle *= rotDamping;
        p.angle += p.vAngle;

        // 5. Draw Particle with High-Quality Typography
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);

        ctx.font = `${p.fontStyle} ${p.fontWeight} ${p.fontSize}px ${p.fontFamily}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const isDark = document.documentElement.classList.contains('dark');

        // Delicate shadow for oversized characters to enhance tactile depth
        if (p.isOversized) {
          ctx.shadowColor = isDark ? 'rgba(0, 0, 0, 0.4)' : 'rgba(16, 17, 22, 0.04)';
          ctx.shadowBlur = 18;
          ctx.shadowOffsetY = 8;
        }

        let renderColor = p.color;
        let renderAlpha = p.alpha;

        if (isDark) {
          if (p.color === '#101116') {
            renderColor = '#FFFFFF';
            renderAlpha = p.isOversized ? 0.12 : Math.min(p.alpha * 1.3, 0.28);
          } else if (p.color === '#777982') {
            renderColor = '#A1A1AA';
            renderAlpha = 0.35;
          }
        }

        ctx.globalAlpha = renderAlpha;
        ctx.fillStyle = renderColor;
        ctx.fillText(p.char, 0, 0);

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 select-none overflow-hidden"
      aria-hidden="true"
    />
  );
};
