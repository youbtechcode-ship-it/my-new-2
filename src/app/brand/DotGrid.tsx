'use client';
import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';
import { InertiaPlugin } from 'gsap/InertiaPlugin';

import './DotGrid.css';

gsap.registerPlugin(InertiaPlugin);

const throttle = (func: (...args: any[]) => void, limit: number) => {
  let lastCall = 0;
  return function (this: any, ...args: any[]) {
    const now = performance.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      func.apply(this, args);
    }
  };
};

interface Dot {
  cx: number;
  cy: number;
  xOffset: number;
  yOffset: number;
  _inertiaApplied: boolean;
}

export interface DotGridProps {
  dotSize?: number;
  gap?: number;
  baseColor?: string;
  activeColor?: string;
  proximity?: number;
  speedTrigger?: number;
  shockRadius?: number;
  shockStrength?: number;
  maxSpeed?: number;
  resistance?: number;
  returnDuration?: number;
  className?: string;
  style?: React.CSSProperties;
}

function hslToRgba(hsl: string, alpha: number) {
  const result = /hsl\(([\d.]+)\s*,?\s*([\d.]+)%\s*,?\s*([\d.]+)%\)/.exec(hsl);
  if (result) {
    const [, h, s, l] = result;
    return `hsla(${h}, ${s}%, ${l}%, ${alpha})`;
  }
  
  // Fallback for hex or other formats
  const hexMatch = hsl.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (hexMatch) {
    const r = parseInt(hexMatch[1], 16);
    const g = parseInt(hexMatch[2], 16);
    const b = parseInt(hexMatch[3], 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  
  return `rgba(0, 0, 0, ${alpha})`;
}

const DotGrid: React.FC<DotGridProps> = ({
  dotSize = 1.5,
  gap = 30,
  baseColor = 'hsl(var(--accent-hsl))',
  activeColor = 'hsl(var(--primary-hsl))',
  proximity = 120,
  speedTrigger = 100,
  shockRadius = 200,
  shockStrength = 2,
  maxSpeed = 3000,
  resistance = 500,
  returnDuration = 1.5,
  className = '',
  style
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const pointerRef = useRef({
    x: -9999,
    y: -9999,
    vx: 0,
    vy: 0,
    speed: 0,
    lastTime: 0,
    lastX: 0,
    lastY: 0
  });

  const circlePath = useMemo(() => {
    if (typeof window === 'undefined' || !window.Path2D) return null;
    const p = new Path2D();
    p.arc(0, 0, dotSize, 0, Math.PI * 2);
    return p;
  }, [dotSize]);

  const buildGrid = useCallback(() => {
    const wrap = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const { width, height } = wrap.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(dpr, dpr);

    const cell = dotSize + gap;
    const cols = Math.floor((width + gap) / cell);
    const rows = Math.floor((height + gap) / cell);

    const gridW = cell * cols - gap;
    const gridH = cell * rows - gap;
    const startX = (width - gridW) / 2 + dotSize / 2;
    const startY = (height - gridH) / 2 + dotSize / 2;
    
    const dots: Dot[] = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const cx = startX + x * cell;
        const cy = startY + y * cell;
        dots.push({ cx, cy, xOffset: 0, yOffset: 0, _inertiaApplied: false });
      }
    }
    dotsRef.current = dots;
  }, [dotSize, gap]);


  useEffect(() => {
    if (!circlePath) return;

    let rafId: number;
    const proxSq = proximity * proximity;

    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { x: px, y: py } = pointerRef.current;
      
      const computedBaseColor = getComputedStyle(canvas).getPropertyValue("--base-color-val") || baseColor;
      const computedActiveColor = getComputedStyle(canvas).getPropertyValue("--active-color-val") || activeColor;

      for (const dot of dotsRef.current) {
        const ox = dot.cx + dot.xOffset;
        const oy = dot.cy + dot.yOffset;
        const dx = dot.cx - px;
        const dy = dot.cy - py;
        const dsq = dx * dx + dy * dy;
        
        let style = hslToRgba(computedBaseColor, 0.2);

        if (dsq <= proxSq) {
          const dist = Math.sqrt(dsq);
          const t = 1 - dist / proximity;
          style = hslToRgba(computedActiveColor, 0.2 + (t * 0.8));
        }

        ctx.save();
        ctx.translate(ox, oy);
        ctx.fillStyle = style;
        ctx.fill(circlePath);
        ctx.restore();
      }

      rafId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(rafId);
  }, [proximity, circlePath, baseColor, activeColor]);


  useEffect(() => {
    buildGrid();
    window.addEventListener('resize', buildGrid);
    return () => window.removeEventListener('resize', buildGrid);
  }, [buildGrid]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const pr = pointerRef.current;
      const now = performance.now();
      const dt = Math.max(16, now - pr.lastTime);
      const dx = e.clientX - pr.lastX;
      const dy = e.clientY - pr.lastY;
      let vx = (dx / dt) * 1000;
      let vy = (dy / dt) * 1000;
      let speed = Math.hypot(vx, vy);

      if (speed > maxSpeed) {
        const scale = maxSpeed / speed;
        vx *= scale;
        vy *= scale;
      }

      pr.lastTime = now;
      pr.lastX = e.clientX;
      pr.lastY = e.clientY;
      pr.vx = vx;
      pr.vy = vy;
      pr.speed = speed;

      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        pr.x = e.clientX - rect.left;
        pr.y = e.clientY - rect.top;
      }
      
      if (speed < speedTrigger) return;

      for (const dot of dotsRef.current) {
        const dist = Math.hypot(dot.cx - pr.x, dot.cy - pr.y);
        if (dist < proximity && !dot._inertiaApplied) {
          dot._inertiaApplied = true;
          gsap.killTweensOf(dot);
          const pushX = (dot.cx - pr.x) * 0.1;
          const pushY = (dot.cy - pr.y) * 0.1;
          gsap.to(dot, {
            inertia: { xOffset: {velocity: vx * 0.5, value: pushX}, yOffset: {velocity: vy * 0.5, value: pushY}, resistance },
            onComplete: () => {
              gsap.to(dot, {
                xOffset: 0,
                yOffset: 0,
                duration: returnDuration,
                ease: 'elastic.out(1,0.75)',
                onComplete: () => { dot._inertiaApplied = false; }
              });
            }
          });
        }
      }
    };

    const onClick = (e: MouseEvent) => {
       if (!canvasRef.current) return;
       const rect = canvasRef.current.getBoundingClientRect();
       const cx = e.clientX - rect.left;
       const cy = e.clientY - rect.top;

       for (const dot of dotsRef.current) {
        const dist = Math.hypot(dot.cx - cx, dot.cy - cy);
        if (dist < shockRadius) {
            gsap.killTweensOf(dot);
            dot._inertiaApplied = true;
            const falloff = Math.pow(Math.max(0, 1 - dist / shockRadius), 2);
            const pushX = (dot.cx - cx) * shockStrength * falloff;
            const pushY = (dot.cy - cy) * shockStrength * falloff;
            
            gsap.fromTo(dot, {xOffset: 0, yOffset: 0}, {
                xOffset: pushX,
                yOffset: pushY,
                duration: 0.1,
                onComplete: () => {
                    gsap.to(dot, {
                        xOffset: 0,
                        yOffset: 0,
                        duration: returnDuration,
                        ease: 'elastic.out(1, 0.6)',
                        onComplete: () => { dot._inertiaApplied = false; }
                    });
                }
            });
        }
    }
    };
    
    const onLeave = () => {
        pointerRef.current.x = -9999;
        pointerRef.current.y = -9999;
    };

    const throttledMove = throttle(onMove, 16);
    window.addEventListener('mousemove', throttledMove);
    window.addEventListener('click', onClick);
    document.addEventListener('mouseleave', onLeave);


    return () => {
      window.removeEventListener('mousemove', throttledMove);
      window.removeEventListener('click', onClick);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [maxSpeed, speedTrigger, proximity, resistance, returnDuration, shockRadius, shockStrength]);

  const componentStyle = {
    ...style,
    '--base-color-val': baseColor,
    '--active-color-val': activeColor,
  } as React.CSSProperties;

  return (
    <section className={`dot-grid ${className}`} style={componentStyle}>
      <div ref={wrapperRef} className="dot-grid__wrap">
        <canvas ref={canvasRef} className="dot-grid__canvas" />
      </div>
    </section>
  );
};

export default DotGrid;
