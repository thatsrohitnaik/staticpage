import { useState, useEffect } from 'react';
import { Heart, Loader2, Calendar, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Hero() {
    const { user, isAuthenticated } = useAuth();
    const [votes, setVotes] = useState(0);
    const [hasVoted, setHasVoted] = useState(false);
    const [isVoting, setIsVoting] = useState(false);

    useEffect(() => {
        fetch('https://script.google.com/macros/s/AKfycbyKZ-kxF-dPiO5uqN9JyYh0JrheVXdh_K14NB5lUSFNMWqtGOXlQNV-yWdYFmzqX2-Ghg/exec?action=getVotes')
            .then(res => res.json())
            .then(data => setVotes(data.voteCount || 0));

        if (localStorage.getItem('wedding_voted')) setHasVoted(true);
    }, []);

    const handleVote = async () => {
        if (hasVoted || isVoting) return;
        setIsVoting(true);
        try {
            await fetch('https://script.google.com/macros/s/AKfycbyKZ-kxF-dPiO5uqN9JyYh0JrheVXdh_K14NB5lUSFNMWqtGOXlQNV-yWdYFmzqX2-Ghg/exec', {
                method: 'POST', mode: 'no-cors',
                body: JSON.stringify({ action: 'vote', userId: isAuthenticated ? user?.email : 'anonymous' })
            });
            setVotes(prev => prev + 1);
            setHasVoted(true);
            localStorage.setItem('wedding_voted', 'true');
        } catch (e) { console.error(e); } finally { setIsVoting(false); }
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#faf9f6]">
            {/* Subtle Background Elements */}
            <div className="absolute top-20 left-10 w-64 h-64 bg-pink-50 rounded-full blur-3xl opacity-60 animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-60"></div>

            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                {/* Send Love Interaction */}
                <div className="inline-flex flex-col items-center mb-12">
                    <button
                        onClick={handleVote}
                        disabled={hasVoted}
                        className={`group relative p-6 rounded-full transition-all duration-700 
                        ${hasVoted ? 'bg-white shadow-inner scale-95' : 'bg-white shadow-neu hover:shadow-xl hover:-translate-y-1'}`}
                    >
                        {isVoting ? (
                            <Loader2 className="w-10 h-10 text-pink-300 animate-spin" />
                        ) : (
                            <Heart
                                className={`w-10 h-10 transition-all duration-500 ${hasVoted ? 'text-pink-500 fill-pink-500 scale-110' : 'text-pink-200 group-hover:text-pink-400 group-hover:scale-110'}`}
                            />
                        )}

                        {/* Smooth Vote Badge */}
                        <span className="absolute -bottom-2 -right-2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded-full font-bold tracking-tighter">
                            {votes.toLocaleString()}
                        </span>
                    </button>
                    <p className={`mt-4 text-[10px] uppercase tracking-[0.3em] font-bold transition-colors ${hasVoted ? 'text-pink-500' : 'text-gray-400'}`}>
                        {hasVoted ? "Blessings Received" : "Send them some love"}
                    </p>
                </div>

                {/* Main Typography */}
                <div className="space-y-2 mb-12">
                    <span className="text-gray-400 uppercase tracking-[0.5em] text-xs block mb-4">Save Our Date</span>
                    <h1 className="text-7xl md:text-[120px] font-serif leading-none text-gray-800 tracking-tighter italic">
                        Bhakti <span className="text-3xl md:text-5xl font-light not-italic text-pink-200 mx-2">&</span> Rohit
                    </h1>
                </div>

                {/* Event Summary Bar */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 py-8 px-10 rounded-[3rem] bg-white/50 backdrop-blur-sm border border-white shadow-neu-sm">
                    <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-pink-300" />
                        <div className="text-left">
                            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">When</p>
                            <p className="text-sm font-bold text-gray-700 leading-tight">Feb 26, 2026 • 12:06 PM</p>
                        </div>
                    </div>

                    <div className="hidden md:block w-px h-8 bg-gray-200"></div>

                    <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-pink-300" />
                        <div className="text-left">
                            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Where</p>
                            <p className="text-sm font-bold text-gray-700 leading-tight">Sala de Gaspar, Miramar</p>
                        </div>
                    </div>
                </div>

                {/* Weather Forecast Snippet */}
                <div className="mt-8 text-gray-400 text-[11px] italic">
                    Forecast for Panaji: High of 28°C and clear skies—a perfect day for a wedding.
                </div>
            </div>
        </section>
    );
}