import React, { useEffect, useRef } from 'react';
import './Fireworks.css';

export default function Fireworks({ density = 1 }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const particlesRef = useRef([]);
  const lastTimeRef = useRef(0);
  const spawnTimerRef = useRef(0);
  const stopTimeoutRef = useRef(null);
  const stopSpawningRef = useRef(false);

  useEffect(() => {
    // respect reduced motion
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq && mq.matches) return () => {};

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let mounted = true;

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * devicePixelRatio));
      canvas.height = Math.max(1, Math.floor(rect.height * devicePixelRatio));
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    }

    resize();
    window.addEventListener('resize', resize);

    function rand(min, max) { return Math.random() * (max - min) + min; }

    function spawnExplosion(x, y, hue) {
      const count = Math.floor(rand(24, 48) * density);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = rand(1.5, 6);
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: rand(800, 1600),
          age: 0,
          hue: hue + rand(-20, 20),
          size: rand(1.2, 3.2),
        });
      }
    }

    function spawnRocket() {
      const rect = canvas.getBoundingClientRect();
      const startX = rand(rect.width * 0.1, rect.width * 0.9);
      const startY = rect.height + 10;
      const targetY = rand(rect.height * 0.15, rect.height * 0.45);
      const hue = Math.floor(rand(0, 360));
      let rocket = { x: startX, y: startY, vy: -rand(6, 10), explodeY: targetY, hue };
      // animate rocket until explodeY
      const rocketInterval = setInterval(() => {
        rocket.x += 0; // no horizontal
        rocket.y += rocket.vy;
        rocket.vy += 0.12; // gravity slows ascent
        // draw a small spark for rocket
        particlesRef.current.push({ x: rocket.x, y: rocket.y, vx: rand(-0.6, 0.6), vy: rand(-0.6, 0.6), life: 200, age: 0, hue: rocket.hue, size: 1.6, fade: true });
        if (rocket.y <= rocket.explodeY) {
          clearInterval(rocketInterval);
          spawnExplosion(rocket.x, rocket.y, rocket.hue);
        }
      }, 1000 / 60);
      // stop rocket if unmounted
      setTimeout(() => clearInterval(rocketInterval), 2000);
    }

    function update(dt) {
      const p = particlesRef.current;
      for (let i = p.length - 1; i >= 0; i--) {
        const part = p[i];
        part.age += dt;
        // physics
        part.vy += 0.02; // gravity
        part.x += part.vx;
        part.y += part.vy;
        // fade
        if (part.age >= part.life) {
          p.splice(i, 1);
        }
      }
    }

    function draw() {
      const cw = canvas.width / devicePixelRatio;
      const ch = canvas.height / devicePixelRatio;
      // clear with slight alpha for trailing effect
      ctx.clearRect(0, 0, cw, ch);
      ctx.globalCompositeOperation = 'lighter';
      for (const part of particlesRef.current) {
        const alpha = 1 - (part.age / part.life);
        ctx.fillStyle = `hsla(${part.hue}, 85%, 55%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(part.x, part.y, part.size, 0, Math.PI * 2);
        ctx.fill();
        // small glow
        ctx.fillStyle = `hsla(${part.hue},85%,65%,${alpha * 0.22})`;
        ctx.beginPath();
        ctx.arc(part.x, part.y, part.size * 3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = 'source-over';
    }

    function loop(ts) {
      if (!mounted) return;
      if (!lastTimeRef.current) lastTimeRef.current = ts;
      const dt = ts - lastTimeRef.current;
      lastTimeRef.current = ts;

      // spawn periodically
      spawnTimerRef.current += dt;
      if (spawnTimerRef.current > 900) {
        spawnTimerRef.current = 0;
        // only spawn rockets while not stopped
        if (!stopSpawningRef.current) spawnRocket();
      }

      update(dt);
      draw();
      // if we've stopped spawning and there are no particles left, stop the animation
      if (stopSpawningRef.current && particlesRef.current.length === 0) {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
        return;
      }
      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);

    // stop spawning after 5 seconds
    stopSpawningRef.current = false;
    stopTimeoutRef.current = setTimeout(() => {
      stopSpawningRef.current = true;
    }, 5000);

    // capture the current particles array reference so cleanup uses a stable variable
    const particlesLocal = particlesRef.current;
    return () => {
      mounted = false;
      window.removeEventListener('resize', resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (stopTimeoutRef.current) clearTimeout(stopTimeoutRef.current);
      if (particlesLocal) particlesLocal.length = 0;
    };
  }, [density]);

  return <canvas ref={canvasRef} className="fireworks-canvas" />;
}
