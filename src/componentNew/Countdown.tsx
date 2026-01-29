import { useEffect, useState } from 'react';

export default function Countdown() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const weddingDate = new Date('2026-02-26T12:06:00').getTime();
            const now = new Date().getTime();
            const difference = weddingDate - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="py-16 px-4 bg-gradient-to-b from-transparent to-gray-50">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-light text-center text-gray-700 mb-12">
                    The Big Day Is Coming
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="p-8 rounded-3xl shadow-neu text-center">
                        <div className="text-5xl md:text-6xl font-light text-pink-300 mb-2">
                            {timeLeft.days}
                        </div>
                        <p className="text-gray-600 font-light">Days</p>
                    </div>

                    <div className="p-8 rounded-3xl shadow-neu text-center">
                        <div className="text-5xl md:text-6xl font-light text-pink-300 mb-2">
                            {timeLeft.hours}
                        </div>
                        <p className="text-gray-600 font-light">Hours</p>
                    </div>

                    <div className="p-8 rounded-3xl shadow-neu text-center">
                        <div className="text-5xl md:text-6xl font-light text-pink-300 mb-2">
                            {timeLeft.minutes}
                        </div>
                        <p className="text-gray-600 font-light">Minutes</p>
                    </div>

                    <div className="p-8 rounded-3xl shadow-neu text-center">
                        <div className="text-5xl md:text-6xl font-light text-pink-300 mb-2">
                            {timeLeft.seconds}
                        </div>
                        <p className="text-gray-600 font-light">Seconds</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
