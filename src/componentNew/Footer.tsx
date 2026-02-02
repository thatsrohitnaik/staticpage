import { useState, useEffect } from 'react';
import { Heart, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Footer() {
    const { user, isAuthenticated } = useAuth();
    const [hasVoted, setHasVoted] = useState(false);
    const [isVoting, setIsVoting] = useState(false);

    useEffect(() => {
        // Check if user has already voted in this session/browser
        if (localStorage.getItem('wedding_voted')) {
            setHasVoted(true);
        }
    }, []);

    const handleVote = async () => {
        if (hasVoted || isVoting) return;
        setIsVoting(true);

        try {
            await fetch('https://script.google.com/macros/s/AKfycbyKZ-kxF-dPiO5uqN9JyYh0JrheVXdh_K14NB5lUSFNMWqtGOXlQNV-yWdYFmzqX2-Ghg/exec', {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify({
                    action: 'vote',
                    userId: isAuthenticated ? user?.email : 'anonymous',
                    source: 'footer_component'
                })
            });

            setHasVoted(true);
            localStorage.setItem('wedding_voted', 'true');

            // Optional: Trigger a custom event if you want other components
            // to update their UI immediately without a refresh
            window.dispatchEvent(new Event('storage'));
        } catch (e) {
            console.error(e);
        } finally {
            setIsVoting(false);
        }
    };

    return (
        <footer className="py-16 px-4 bg-gray-50/50">
            <div className="max-w-4xl mx-auto text-center">

                {/* Voting Interaction */}
                <div className="flex flex-col items-center mb-8">
                    <button
                        onClick={handleVote}
                        disabled={hasVoted}
                        className={`group relative p-5 rounded-full transition-all duration-700 
                        ${hasVoted ? 'bg-white shadow-inner scale-95' : 'bg-white shadow-neu hover:shadow-lg hover:-translate-y-1 active:scale-90'}`}
                    >
                        {isVoting ? (
                            <Loader2 className="w-8 h-8 text-pink-300 animate-spin" />
                        ) : (
                            <Heart
                                className={`w-8 h-8 transition-all duration-500 ${
                                    hasVoted
                                        ? 'text-pink-500 fill-pink-500 scale-110'
                                        : 'text-pink-200 group-hover:text-pink-400 group-hover:scale-110'
                                }`}
                                fill={hasVoted ? "currentColor" : "none"}
                            />
                        )}
                    </button>
                    <p className={`mt-3 text-[10px] uppercase tracking-[0.2em] font-bold transition-colors ${hasVoted ? 'text-pink-500' : 'text-gray-400'}`}>
                        {hasVoted ? "Blessing Received" : "Leave a little love"}
                    </p>
                </div>

                <p className="text-gray-600 mb-2 font-serif italic text-lg">
                    Cheers to celebrating together soon.
                </p>

                <p className="text-gray-400 text-sm mb-8">
                    For questions, contact us at <a href="mailto:rohit24naik@gmail.com" className="hover:text-pink-400 transition-colors">rohit24naik@gmail.com</a>
                </p>

                {/* Bottom Legal Links & Copyright */}
                <div className="pt-8 border-t border-gray-200/60">
                    <div className="flex justify-center gap-6 mb-4 text-[10px] uppercase tracking-widest font-bold text-gray-400">
                        <a href="/staticpage/dist/privacy.html" className="hover:text-pink-500 transition-colors">Privacy Policy</a>
                        <a href="/staticpage/dist/terms.html" className="hover:text-pink-500 transition-colors">Terms of Service</a>
                    </div>
                    <div className="text-gray-400 text-[10px] uppercase tracking-widest font-medium">
                        © 2026 Bhakti & Rohit • Made with Love
                    </div>
                </div>
            </div>
        </footer>
    );
}