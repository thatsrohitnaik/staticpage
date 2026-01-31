import { useState } from 'react';
import { Send, MessageCircle, X, Heart, Loader2, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function MessagePanel() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const { user, isAuthenticated, login } = useAuth();
    const handleSendMessage = async () => {
        if (!message.trim()) return;

        setIsSending(true);
        try {
            await fetch('https://script.google.com/macros/s/AKfycbyKZ-kxF-dPiO5uqN9JyYh0JrheVXdh_K14NB5lUSFNMWqtGOXlQNV-yWdYFmzqX2-Ghg/exec', {
                method: 'POST',
                mode: 'no-cors', // Essential for Google Scripts
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: user?.name,
                    email: user?.email,
                    message: message
                })
            });

            setIsSent(true);
            setMessage('');
        } catch (error) {
            console.error("Failed to send message", error);
        } finally {
            setIsSending(false);
        }
    };

    return (
        <>
            {/* Floating Toggle Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-32 right-8 z-50 p-4 rounded-full transition-all text-pink-500 hover:scale-110
                    bg-gray-100 border border-gray-200
                    shadow-[5px_5px_10px_rgba(0,0,0,0.1),-5px_-5px_10px_rgba(255,255,255,0.8)]"
                >
                    <MessageCircle className="w-6 h-6" />
                </button>
            )}

            {isOpen && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-md">
                    <div className="bg-gray-50 rounded-[2.5rem] max-w-md w-full overflow-hidden flex flex-col border border-white shadow-2xl">

                        {/* Header */}
                        <div className="p-6 flex items-center justify-between border-b border-gray-100 bg-white">
                            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
                                Send Blessings
                            </h2>
                            <button onClick={() => setIsOpen(false)}
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400
                                bg-gray-100 border border-gray-200 hover:text-red-500 transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-8">
                            {!isAuthenticated ? (
                                /* Login Prompt */
                                <div className="text-center py-6">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center
                                    shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.8)]">
                                        <Lock className="w-6 h-6 text-gray-400" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-700 mb-2">Sign in to leave a message</h3>
                                    <p className="text-sm text-gray-500 mb-6">We'd love to know who sent us these beautiful wishes!</p>
                                    <button
                                        onClick={login}
                                        className="px-8 py-3 bg-blue-600 text-white font-bold rounded-2xl shadow-lg hover:bg-blue-700 transition-all"
                                    >
                                        Sign in with Google
                                    </button>
                                </div>
                            ) : isSent ? (
                                /* Success State */
                                <div className="text-center py-10 animate-in zoom-in duration-300">
                                    <div className="w-20 h-20 bg-green-50 rounded-full mx-auto mb-4 flex items-center justify-center">
                                        <Heart className="w-10 h-10 text-green-500 fill-green-500 animate-pulse" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800">Thank You, {user?.name.split(' ')[0]}!</h3>
                                    <p className="text-gray-600 mt-2">Your message has been sent to the couple.</p>
                                    <button
                                        onClick={() => setIsSent(false)}
                                        className="mt-6 text-pink-500 font-semibold text-sm underline underline-offset-4"
                                    >
                                        Send another one
                                    </button>
                                </div>
                            ) : (
                                /* Message Form */
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 mb-2">
                                        <img src={user?.picture} className="w-8 h-8 rounded-full shadow-sm" alt="profile" />
                                        <span className="text-sm font-medium text-gray-600">Writing as <b>{user?.name}</b></span>
                                    </div>

                                    <div className="relative">
                                        <textarea
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            placeholder="Write your wishes for Rohit & Bhakti here..."
                                            className="w-full h-40 p-5 bg-gray-100 rounded-3xl border-none outline-none text-gray-700 placeholder:text-gray-400
                                            shadow-[inset_4px_4px_8px_rgba(0,0,0,0.05),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]
                                            focus:shadow-[inset_6px_6px_12px_rgba(0,0,0,0.08),inset_-6px_-6px_12px_rgba(255,255,255,1)] transition-all resize-none"
                                        />
                                    </div>

                                    <button
                                        onClick={handleSendMessage}
                                        disabled={!message.trim() || isSending}
                                        className="flex items-center justify-center gap-3 w-full py-4 bg-pink-500 text-white font-bold rounded-2xl
                                        shadow-[0_10px_20px_rgba(236,72,153,0.3)] hover:bg-pink-600 transition-all active:scale-95 disabled:opacity-50 disabled:grayscale"
                                    >
                                        {isSending ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5" />
                                                Send Blessings
                                            </>
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}