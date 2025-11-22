// `src/CountdownBar.jsx`
import React, { useEffect, useState } from 'react';

const TARGET_DATE = new Date(2026, 1, 26, 12, 6, 0); // month is 0-based (1 = Feb)

export default function CountdownBar() {
    // initialize lazily to avoid calling Date.now() during render
    const [now, setNow] = useState(() => Date.now());
    const [pulse, setPulse] = useState(false);

    useEffect(() => {
        const id = setInterval(() => {
            setNow(Date.now());
            // trigger a short pulse animation on each tick
            setPulse(true);
            setTimeout(() => setPulse(false), 260);
        }, 1000);
        return () => clearInterval(id);
    }, []);

    const remainingMs = Math.max(TARGET_DATE - now, 0);

    const secs = Math.floor(remainingMs / 1000);
    const days = Math.floor(secs / 86400);
    const hours = Math.floor((secs % 86400) / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const seconds = secs % 60;

    const isReached = remainingMs === 0;

    const container = {
        width: '100%',
        boxSizing: 'border-box',
        padding: 16,
        display: 'flex',
        justifyContent: 'center',
    };

    const card = {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, minmax(64px, 1fr))',
        gap: 12,
        alignItems: 'center',
        justifyItems: 'center',
        width: '100%',
        maxWidth: 980,
        padding: 18,
        borderRadius: 14,
        background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))',
        // subtle border
        border: '1px solid rgba(255,255,255,0.06)',
        boxShadow: 'none',
    };

    const timeBox = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        padding: '12px 8px',
        borderRadius: 10,
        minWidth: 64,
        width: '100%',
        boxSizing: 'border-box',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0.01))',
    };

    const numberStyle = (active) => ({
        fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
        fontWeight: 700,
        color: '#000',
        fontSize: 'clamp(1.25rem, 4vw, 2.25rem)',
        lineHeight: 1,
        transition: 'transform 180ms ease, opacity 180ms ease',
        transform: active ? 'scale(1.06)' : 'scale(1)'
    });

    const labelStyle = {
        fontSize: 12,
        color: 'rgba(0,0,0,0.75)',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
    };

    // helper to pad numbers
    const pad = (n) => String(n).padStart(2, '0');

    if (isReached) {
        return (
            <div style={container} aria-live="polite">
                <div style={{ ...card, justifyContent: 'center' }}>
                    <div style={{ textAlign: 'center', color: '#000', padding: 24 }}>
                        <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>Event started</div>
                        <div style={{ marginTop: 6, color: 'rgba(0,0,0,0.7)' }}>26 Feb 2026 12:06</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={container} aria-live="polite">
            <div style={card}>
                <div style={timeBox} aria-hidden>
                    <div style={numberStyle(pulse)}>{String(days)}</div>
                    <div style={labelStyle}>Days</div>
                </div>

                <div style={timeBox} aria-hidden>
                    <div style={numberStyle(pulse)}>{pad(hours)}</div>
                    <div style={labelStyle}>Hours</div>
                </div>

                <div style={timeBox} aria-hidden>
                    <div style={numberStyle(pulse)}>{pad(minutes)}</div>
                    <div style={labelStyle}>Minutes</div>
                </div>

                <div style={timeBox} aria-hidden>
                    <div style={numberStyle(pulse)}>{pad(seconds)}</div>
                    <div style={labelStyle}>Seconds</div>
                </div>
            </div>
        </div>
    );
}
