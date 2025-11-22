import React, { useEffect, useRef } from 'react';
import './Confetti.css';

export default function Confetti({ runOnMount = true, density = 1, duration = 20000 }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const particlesRef = useRef([]);
  const lastRef = useRef(0);
  const spawnIntervalRef = useRef(null);
  const stopTimeoutRef = useRef(null);
  const stopSpawningRef = useRef(false);

  useEffect(() => {
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let mounted = true;

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    window.addEventListener('resize', resize);

    function rand(min, max) { return Math.random() * (max - min) + min; }

    function spawnBurst(x, y) {
      const count = Math.floor(rand(18, 36) * density);
      for (let i = 0; i < count; i++) {
        const angle = rand(0, Math.PI * 2);
        const speed = rand(1.5, 6);
        particlesRef.current.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: rand(900, 1800),
          age: 0,
          size: rand(2, 5),
          hue: Math.floor(rand(0, 360)),
          gravity: 0.02 + Math.random() * 0.03,
          drift: rand(-0.025, 0.025),
        });
      }
    }

    function update(dt) {
      const p = particlesRef.current;
      for (let i = p.length - 1; i >= 0; i--) {
        const pt = p[i];
        pt.age += dt;
        if (pt.age >= pt.life) { p.splice(i,1); continue; }
        pt.vy += pt.gravity;
        pt.vx += pt.drift;
        pt.x += pt.vx;
        pt.y += pt.vy;
      }
    }

    function draw() {
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0,0,w,h);
      ctx.globalCompositeOperation = 'lighter';
      for (const pt of particlesRef.current) {
        const alpha = 1 - (pt.age / pt.life);
        ctx.fillStyle = `hsla(${pt.hue}, 85%, 55%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI*2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = 'source-over';
    }

    function loop(ts) {
      if (!mounted) return;
      if (!lastRef.current) lastRef.current = ts;
      const dt = ts - lastRef.current;
      lastRef.current = ts;
      update(dt);
      draw();

      if (stopSpawningRef.current && particlesRef.current.length === 0) {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
        return;
      }

      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);

    const spawnIntervalMs = 700;

    if (runOnMount) {
      const rect = canvas.getBoundingClientRect();
      const initialCount = Math.max(1, Math.round(2 * density));
      for (let i = 0; i < initialCount; i++) {
        setTimeout(() => {
          spawnBurst(rand(rect.width * 0.15, rect.width * 0.85), rand(rect.height * 0.1, rect.height * 0.5));
        }, i * 200);
      }

      spawnIntervalRef.current = setInterval(() => {
        const r = canvas.getBoundingClientRect();
        spawnBurst(rand(r.width * 0.12, r.width * 0.88), rand(r.height * 0.08, r.height * 0.6));
      }, spawnIntervalMs);

      stopTimeoutRef.current = setTimeout(() => {
        if (spawnIntervalRef.current) {
          clearInterval(spawnIntervalRef.current);
          spawnIntervalRef.current = null;
        }
        stopSpawningRef.current = true;
      }, duration);
    }

    return () => {
      mounted = false;
      window.removeEventListener('resize', resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (spawnIntervalRef.current) clearInterval(spawnIntervalRef.current);
      if (stopTimeoutRef.current) clearTimeout(stopTimeoutRef.current);
      particlesRef.current.length = 0;
    };
  }, [density, runOnMount, duration]);

  return <canvas ref={canvasRef} className="confetti-canvas" />;
}
