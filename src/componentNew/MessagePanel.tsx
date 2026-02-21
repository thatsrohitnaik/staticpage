import { useState, useEffect } from 'react';
import { Send, MessageCircle, X, Heart, Loader2, User, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

export default function MessagePanel() {
    const [isOpen, setIsOpen] = useState(false);
    const [guestName, setGuestName] = useState('');
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [isNameStep, setIsNameStep] = useState(true);

    // --- NEW STATES FOR SLIDESHOW ---
    const [allMessages, setAllMessages] = useState([
        { name: "Family", message: "Wishing Rohit & Bhakti a lifetime of happiness!" },
        { name: "Snehal", message: "So happy to be part of your big day! ❤️" }
    ]);
    const [currentSlide, setCurrentSlide] = useState(0);

    const scriptURL = 'https://script.google.com/macros/s/AKfycbyKZ-kxF-dPiO5uqN9JyYh0JrheVXdh_K14NB5lUSFNMWqtGOXlQNV-yWdYFmzqX2-Ghg/exec';

    // 1. Check URL for guest name & Fetch Messages
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const nameFromUrl = params.get('guest');
        if (nameFromUrl) {
            setGuestName(nameFromUrl);
            setIsNameStep(false);
        }

        // Fetch existing messages (Optional: depends on your Google Script GET setup)
        // fetchMessages();
    }, []);

    // 2. Slideshow Auto-play Logic
    useEffect(() => {
        if (allMessages.length > 0 && isOpen) {
            const timer = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % allMessages.length);
            }, 5000); // Change every 5 seconds
            return () => clearInterval(timer);
        }
    }, [allMessages, isOpen]);

    const handleSendMessage = async () => {
        if (!message.trim() || !guestName.trim()) return;
        setIsSending(true);
        try {
            await fetch(scriptURL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: guestName,
                    message: message,
                    date: new Date().toLocaleString()
                })
            });

            // Optimistically add to slideshow
            setAllMessages([{ name: guestName, message: message }, ...allMessages]);
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
                                Blessings Ticker
                            </h2>
                            <button onClick={() => setIsOpen(false)}
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 bg-gray-100 hover:text-red-500 transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* --- SLIDESHOW SECTION --- */}
                        <div className="bg-pink-50/50 p-6 border-b border-pink-100 relative min-h-[120px] flex flex-col justify-center">
                            <Quote className="absolute top-2 left-4 w-8 h-8 text-pink-100 fill-pink-100" />
                            {allMessages.length > 0 ? (
                                <div className="text-center animate-in fade-in slide-in-from-bottom-2 duration-700 key={currentSlide}">
                                    <p className="text-gray-700 italic text-sm px-6">
                                        "{allMessages[currentSlide].message}"
                                    </p>
                                    <p className="text-pink-600 font-bold text-xs mt-2 uppercase tracking-widest">
                                        — {allMessages[currentSlide].name}
                                    </p>
                                </div>
                            ) : (
                                <p className="text-center text-gray-400 text-sm">Waiting for the first blessing...</p>
                            )}

                            {/* Pagination Dots */}
                            <div className="flex justify-center gap-1 mt-4">
                                {allMessages.map((_, i) => (
                                    <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentSlide ? 'bg-pink-400 w-3' : 'bg-pink-200'}`} />
                                ))}
                            </div>
                        </div>

                        <div className="p-8">
                            {isSent ? (
                                /* Success State */
                                <div className="text-center py-6 animate-in zoom-in duration-300">
                                    <div className="w-16 h-16 bg-green-50 rounded-full mx-auto mb-4 flex items-center justify-center">
                                        <Heart className="w-8 h-8 text-green-500 fill-green-500 animate-pulse" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800">Sent!</h3>
                                    <p className="text-gray-600 mt-2 text-sm">Your message is now on the ticker.</p>
                                    <button
                                        onClick={() => setIsSent(false)}
                                        className="mt-4 text-pink-500 font-semibold text-xs underline underline-offset-4"
                                    >
                                        Send another one
                                    </button>
                                </div>
                            ) : isNameStep ? (
                                /* Step 1: Name Entry */
                                <div className="space-y-4 text-center">
                                    <div className="w-12 h-12 bg-pink-50 rounded-full mx-auto flex items-center justify-center">
                                        <User className="w-6 h-6 text-pink-500" />
                                    </div>
                                    <input
                                        type="text"
                                        value={guestName}
                                        onChange={(e) => setGuestName(e.target.value)}
                                        placeholder="Enter your name"
                                        className="w-full p-4 bg-white rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-pink-500 transition-all text-center"
                                    />
                                    <button
                                        onClick={() => guestName.trim() && setIsNameStep(false)}
                                        disabled={!guestName.trim()}
                                        className="w-full py-4 bg-gray-800 text-white font-bold rounded-2xl disabled:opacity-50 transition-all hover:bg-gray-700"
                                    >
                                        Write a Message
                                    </button>
                                </div>
                            ) : (
                                /* Step 2: Message Form */
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-medium text-gray-500">From: <b>{guestName}</b></span>
                                        <button onClick={() => setIsNameStep(true)} className="text-[10px] text-blue-500 hover:underline">Edit Name</button>
                                    </div>

                                    <textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder={`Send your love to the couple...`}
                                        className="w-full h-32 p-4 bg-white rounded-3xl border border-gray-100 outline-none text-gray-700 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05)] focus:border-pink-200 transition-all resize-none"
                                    />

                                    <button
                                        onClick={handleSendMessage}
                                        disabled={!message.trim() || isSending}
                                        className="flex items-center justify-center gap-3 w-full py-4 bg-pink-500 text-white font-bold rounded-2xl shadow-lg hover:bg-pink-600 transition-all active:scale-95 disabled:opacity-50"
                                    >
                                        {isSending ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-5 h-5" /> Send Blessing</>}
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