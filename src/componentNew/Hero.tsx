import { useState, useEffect } from 'react';
import { Heart, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Hero() {
    const { user, isAuthenticated } = useAuth();
    const [votes, setVotes] = useState<number>(0);
    const [hasVoted, setHasVoted] = useState(false);
    const [isVoting, setIsVoting] = useState(false);

    // 1. Load initial votes and check if this browser already voted
    useEffect(() => {
        // Fetch current count from your Google Script
        fetch('https://script.google.com/macros/s/AKfycbyKZ-kxF-dPiO5uqN9JyYh0JrheVXdh_K14NB5lUSFNMWqtGOXlQNV-yWdYFmzqX2-Ghg/exec?action=getVotes')
            .then(res => res.json())
            .then(data => setVotes(data.count || 0));

        const localVoted = localStorage.getItem('wedding_voted');
        if (localVoted) setHasVoted(true);
    }, []);

    const handleVote = async () => {
        if (hasVoted || isVoting) return;

        setIsVoting(true);
        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycbyKZ-kxF-dPiO5uqN9JyYh0JrheVXdh_K14NB5lUSFNMWqtGOXlQNV-yWdYFmzqX2-Ghg/exec', {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify({
                    action: 'vote',
                    userId: isAuthenticated ? user?.email : 'anonymous',
                    userName: isAuthenticated ? user?.name : 'Guest'
                })
            });

            // Update UI locally
            setVotes(prev => prev + 1);
            setHasVoted(true);
            localStorage.setItem('wedding_voted', 'true');
        } catch (error) {
            console.error("Voting failed", error);
        } finally {
            setIsVoting(false);
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center">
                {/* Voting Heart Button */}
                <div className="mb-4">
                    <button
                        onClick={handleVote}
                        disabled={hasVoted}
                        className={`relative p-8 rounded-full transition-all duration-500 group
                        ${hasVoted
                            ? 'shadow-[inset_6px_6px_12px_rgba(0,0,0,0.1),inset_-6px_-6px_12px_rgba(255,255,255,0.8)]'
                            : 'shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.9)] active:scale-90 hover:scale-105'
                        }`}
                    >
                        {isVoting ? (
                            <Loader2 className="w-16 h-16 text-pink-200 animate-spin" />
                        ) : (
                            <Heart
                                className={`w-16 h-16 transition-colors duration-500 
                                ${hasVoted ? 'text-pink-500' : 'text-pink-200 group-hover:text-pink-300'}`}
                                fill={hasVoted ? "currentColor" : "none"}
                            />
                        )}

                        {/* Floating Count Badge */}
                        <div className="absolute -top-2 -right-2 bg-white px-3 py-1 rounded-full text-xs font-bold text-pink-500 shadow-sm border border-pink-50">
                            {votes}
                        </div>
                    </button>
                    <p className="mt-4 text-xs font-bold uppercase tracking-widest text-pink-400">
                        {hasVoted ? "Sending Love!" : "Click the heart to send love"}
                    </p>
                </div>

                <h1 className="text-6xl md:text-8xl font-cursive mb-4 text-gray-700">
                    Bhakti & Rohit
                </h1>

                <div className="my-8 h-px w-32 mx-auto bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

                <p className="text-2xl md:text-3xl text-gray-600 mb-8 font-light">
                    Are Getting Married
                </p>

                <div className="inline-block p-8 rounded-3xl shadow-[6px_6px_12px_rgba(0,0,0,0.05),-6px_-6px_12px_rgba(255,255,255,0.8)]">
                    <p className="text-xl text-gray-700 mb-2">Thursday, February 26th, 2026</p>
                    <p className="text-lg text-gray-600">Sala de Gaspar, Miramar</p>
                    <p className="text-lg text-gray-600">12:06 PM</p>
                </div>
            </div>
        </section>
    );
}