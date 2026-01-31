import { useState, useEffect } from 'react';
import { Send, Heart, Loader2, Lock, MessageSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function BlessingsSection() {
    const [receivedMessages, setReceivedMessages] = useState([]);
    const [voteCount, setVoteCount] = useState(0);
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const { user, isAuthenticated, login } = useAuth();

    // Deployment URL
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyKZ-kxF-dPiO5uqN9JyYh0JrheVXdh_K14NB5lUSFNMWqtGOXlQNV-yWdYFmzqX2-Ghg/exec';

    const fetchContent = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(SCRIPT_URL);
            const data = await response.json();

            let rawMessages = [];

            // Handle both object-wrapped and direct-array responses
            if (data && Array.isArray(data.messages)) {
                rawMessages = data.messages;
            } else if (Array.isArray(data)) {
                rawMessages = data;
            }

            // FILTER: Only show messages where public is true
            const publicMessages = rawMessages.filter(msg =>
                msg.public === true ||
                msg.public === "true" ||
                msg.public === "TRUE"
            );

            setReceivedMessages(publicMessages);

            if (data && typeof data.voteCount === 'number') {
                setVoteCount(data.voteCount);
            }
        } catch (error) {
            console.error("Error loading data:", error);
            setReceivedMessages([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchContent();
    }, []);

    const handleSendMessage = async () => {
        if (!message.trim()) return;
        setIsSending(true);
        try {
            await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: user?.name,
                    email: user?.email,
                    message: message,
                    action: 'message'
                })
            });
            setMessage('');
            setTimeout(fetchContent, 2000);
        } catch (error) {
            console.error("Failed to send message", error);
        } finally {
            setIsSending(false);
        }
    };

    return (
        <section className="py-20 px-4 bg-gray-50/50">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-light text-gray-700 italic mb-4">Blessings & Wishes</h2>
                    {voteCount > 0 && (
                        <p className="text-pink-400 font-medium tracking-wide">
                            Join {voteCount} others in celebrating Rohit & Bhakti!
                        </p>
                    )}
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Input Form */}
                    <div className="p-10 rounded-[2.5rem] bg-white shadow-neu border border-white">
                        <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-2">
                            <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
                            Send Your Love
                        </h3>

                        {!isAuthenticated ? (
                            <div className="text-center py-8">
                                <Lock className="w-10 h-10 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500 mb-6">Sign in to leave your blessings</p>
                                <button onClick={login} className="px-8 py-3 bg-blue-600 text-white font-bold rounded-2xl hover:shadow-lg transition-all">
                                    Sign in with Google
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <img src={user?.picture} className="w-8 h-8 rounded-full shadow-sm" alt="profile" />
                                    <span className="text-sm font-medium text-gray-600">Writing as <b>{user?.name}</b></span>
                                </div>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Your wishes..."
                                    className="w-full h-40 p-6 bg-gray-100 rounded-[2rem] border-none outline-none focus:ring-2 ring-pink-200 transition-all resize-none shadow-inner text-gray-700"
                                />
                                <button
                                    onClick={handleSendMessage}
                                    disabled={!message.trim() || isSending}
                                    className="flex items-center justify-center gap-3 w-full py-4 bg-pink-500 text-white font-bold rounded-2xl shadow-lg hover:bg-pink-600 active:scale-95 transition-all disabled:opacity-50"
                                >
                                    {isSending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Send Blessings"}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Feed */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between mb-4 px-2">
                            <span className="flex items-center gap-2 text-gray-500 font-medium">
                                <MessageSquare className="w-5 h-5" /> Guestbook
                            </span>
                            {isLoading && <Loader2 className="w-4 h-4 animate-spin text-pink-300" />}
                        </div>

                        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                            {receivedMessages.length > 0 ? (
                                receivedMessages.map((msg, idx) => (
                                    <div key={idx} className="p-6 rounded-[2rem] bg-white shadow-sm border border-white/60 animate-in fade-in slide-in-from-bottom-2">
                                        <p className="text-gray-700 italic mb-3">"{msg.message || "Sending love!"}"</p>
                                        <div className="flex items-center gap-2 text-sm text-gray-400 font-bold uppercase tracking-tighter">
                                            <span className="text-pink-300">—</span> {msg.name || "Well Wisher"}
                                        </div>
                                    </div>
                                ))
                            ) : !isLoading ? (
                                <div className="text-center py-10 text-gray-400 italic font-light">
                                    No public wishes yet. Be the first to bless the couple!
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}