import { useState, useEffect } from 'react';
import { Send, MessageCircle, X, Heart, Loader2, User } from 'lucide-react';

export default function MessagePanel() {
    const [isOpen, setIsOpen] = useState(false);
    const [guestName, setGuestName] = useState('');
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [isNameStep, setIsNameStep] = useState(true);

    // 1. Check URL for guest name on mount
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const nameFromUrl = params.get('guest');

        if (nameFromUrl) {
            setGuestName(nameFromUrl);
            setIsNameStep(false);
        }
    }, []);

    const handleSendMessage = async () => {
        if (!message.trim() || !guestName.trim()) return;

        setIsSending(true);
        try {
            await fetch('https://script.google.com/macros/s/AKfycbyKZ-kxF-dPiO5uqN9JyYh0JrheVXdh_K14NB5lUSFNMWqtGOXlQNV-yWdYFmzqX2-Ghg/exec', {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: guestName,
                    message: message,
                    date: new Date().toLocaleString()
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
                    className="fixed bottom-32 right-8 z-50 p-4 rounded-full transition-all text-pink-500 hover:scale-110 bg-white border border-gray-200 shadow-xl"
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
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 bg-gray-100 hover:text-red-500 transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-8">
                            {isSent ? (
                                /* Success State */
                                <div className="text-center py-10 animate-in zoom-in duration-300">
                                    <div className="w-20 h-20 bg-green-50 rounded-full mx-auto mb-4 flex items-center justify-center">
                                        <Heart className="w-10 h-10 text-green-500 fill-green-500 animate-pulse" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800">Thank You, {guestName}!</h3>
                                    <p className="text-gray-600 mt-2">Rohit & Bhakti will cherish your message.</p>
                                    <button
                                        onClick={() => setIsSent(false)}
                                        className="mt-6 text-pink-500 font-semibold text-sm underline underline-offset-4"
                                    >
                                        Send another one
                                    </button>
                                </div>
                            ) : isNameStep ? (
                                /* Step 1: Name Entry (If not in URL) */
                                <div className="space-y-6 text-center">
                                    <div className="w-16 h-16 bg-pink-50 rounded-full mx-auto flex items-center justify-center">
                                        <User className="w-8 h-8 text-pink-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800">Welcome!</h3>
                                        <p className="text-sm text-gray-500">May we know who is sending the wishes?</p>
                                    </div>
                                    <input
                                        type="text"
                                        value={guestName}
                                        onChange={(e) => setGuestName(e.target.value)}
                                        placeholder="Enter your name"
                                        className="w-full p-4 bg-white rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-pink-500 transition-all text-center text-lg"
                                    />
                                    <button
                                        onClick={() => guestName.trim() && setIsNameStep(false)}
                                        disabled={!guestName.trim()}
                                        className="w-full py-4 bg-gray-800 text-white font-bold rounded-2xl disabled:opacity-50"
                                    >
                                        Continue
                                    </button>
                                </div>
                            ) : (
                                /* Step 2: Message Form */
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-500 italic">Writing as <b>{guestName}</b></span>
                                        <button
                                            onClick={() => setIsNameStep(true)}
                                            className="text-xs text-blue-500 hover:underline"
                                        >
                                            Change Name
                                        </button>
                                    </div>

                                    <div className="relative">
                                        <textarea
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            placeholder={`Write your wishes for Rohit & Bhakti here...`}
                                            className="w-full h-40 p-5 bg-white rounded-3xl border border-gray-100 outline-none text-gray-700 placeholder:text-gray-400
                                            shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05)] focus:border-pink-200 transition-all resize-none"
                                        />
                                    </div>

                                    <button
                                        onClick={handleSendMessage}
                                        disabled={!message.trim() || isSending}
                                        className="flex items-center justify-center gap-3 w-full py-4 bg-pink-500 text-white font-bold rounded-2xl
                                        shadow-lg hover:bg-pink-600 transition-all active:scale-95 disabled:opacity-50"
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