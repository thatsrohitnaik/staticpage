import { useEffect, useState, useMemo } from 'react';

export default function Countdown() {
    // Target date: Feb 26, 2026
    const targetDate = useMemo(() => new Date('2026-02-26T12:06:00').getTime(), []);

    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isExpired: false
    });

    useEffect(() => {
        const calculate = () => {
            const now = new Date().getTime();
            const diff = targetDate - now;

            if (diff <= 0) {
                setTimeLeft(prev => ({ ...prev, isExpired: true }));
                return;
            }

            setTimeLeft({
                days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((diff / 1000 / 60) % 60),
                seconds: Math.floor((diff / 1000) % 60),
                isExpired: false
            });
        };

        calculate();
        const timer = setInterval(calculate, 1000);
        return () => clearInterval(timer);
    }, [targetDate]);

    if (timeLeft.isExpired) return null; // Or show a "Just Married!" banner

    const TimeUnit = ({ value, label }) => (
        <div className="flex flex-col items-center p-4 md:p-8 rounded-[2rem] bg-white/40 backdrop-blur-sm border border-white/60 shadow-sm transition-transform hover:scale-105">
            <span className="text-4xl md:text-6xl font-extralight text-pink-500 tabular-nums leading-none">
                {value.toString().padStart(2, '0')}
            </span>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-gray-400 mt-4 font-semibold">
                {label}
            </span>
        </div>
    );

    return (
        <section className="py-24 px-4 relative overflow-hidden bg-white">
            {/* Soft decorative background element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-50 rounded-full blur-[120px] -z-10 opacity-60" />

            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-light text-gray-800 italic mb-4">
                        Saving the Date
                    </h2>
                    <div className="h-1 w-20 bg-pink-200 mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                    <TimeUnit value={timeLeft.days} label="Days" />
                    <TimeUnit value={timeLeft.hours} label="Hours" />
                    <TimeUnit value={timeLeft.minutes} label="Minutes" />
                    <TimeUnit value={timeLeft.seconds} label="Seconds" />
                </div>

                <div className="mt-16 text-center">
                    <p className="text-gray-500 font-light tracking-widest uppercase text-sm">
                        February 26, 2026 • 12:06 PM
                    </p>
                </div>
            </div>
        </section>
    );
}