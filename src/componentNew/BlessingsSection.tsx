import { useState, useEffect } from 'react';
import { Send, Heart, Loader2, MessageSquare, UserCircle, Quote } from 'lucide-react';

export default function BlessingsSection() {
    const [receivedMessages, setReceivedMessages] = useState([]);
    const [voteCount, setVoteCount] = useState(0);
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Slideshow State
    const [currentIndex, setCurrentIndex] = useState(0);

    // Guest State
    const [guestName, setGuestName] = useState('');
    const [isNameSet, setIsNameSet] = useState(false);

    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyKZ-kxF-dPiO5uqN9JyYh0JrheVXdh_K14NB5lUSFNMWqtGOXlQNV-yWdYFmzqX2-Ghg/exec';

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const nameFromUrl = params.get('guest');

        if (nameFromUrl) {
            setGuestName(nameFromUrl);
            setIsNameSet(true);
        }
        fetchContent();
    }, []);

    // --- SLIDESHOW LOGIC ---
    useEffect(() => {
        if (receivedMessages.length > 1) {
            const timer = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % receivedMessages.length);
            }, 5000); // Changes message every 5 seconds
            return () => clearInterval(timer);
        }
    }, [receivedMessages]);

    const fetchContent = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(SCRIPT_URL);
            const data = await response.json();
            let rawMessages = [];

            if (data && Array.isArray(data.messages)) {
                rawMessages = data.messages;
            } else if (Array.isArray(data)) {
                rawMessages = data;
            }

            const publicMessages = rawMessages.filter(msg =>
                msg.public === true || msg.public === "true" || msg.public === "TRUE"
            );

            setReceivedMessages(publicMessages);
            if (data && typeof data.voteCount === 'number') {
                setVoteCount(data.voteCount);
            }
        } catch (error) {
            console.error("Error loading data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendMessage = async () => {
        if (!message.trim() || !guestName.trim()) return;
        setIsSending(true);
        try {
            await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: guestName,
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
        <section className="py-20 px-4 bg-gray-50/50" id={"blessings-section"}>
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-light text-gray-700 italic mb-4">Blessings & Wishes</h2>
                    {voteCount > 0 && (
                        <p className="text-pink-400 font-medium tracking-wide animate-pulse">
                            Join {voteCount} others in celebrating Rohit & Bhakti!
                        </p>
                    )}
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Input Form Area */}
                    <div className="p-10 rounded-[2.5rem] bg-white shadow-xl border border-white h-full">
                        <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-2">
                            <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
                            Send Your Love
                        </h3>

                        {!isNameSet ? (
                            <div className="space-y-6">
                                <div className="text-center mb-4">
                                    <UserCircle className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                                    <p className="text-gray-500">Please enter your name to leave a blessing</p>
                                </div>
                                <input
                                    type="text"
                                    value={guestName}
                                    onChange={(e) => setGuestName(e.target.value)}
                                    placeholder="Your Full Name"
                                    className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 outline-none focus:ring-2 ring-pink-200 transition-all text-center text-lg shadow-inner"
                                />
                                <button
                                    onClick={() => guestName.trim() && setIsNameSet(true)}
                                    className="w-full py-4 bg-gray-800 text-white font-bold rounded-2xl hover:bg-black transition-all shadow-lg"
                                >
                                    Continue
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-600">Writing as <b>{guestName}</b></span>
                                    <button onClick={() => setIsNameSet(false)} className="text-xs text-pink-400 hover:underline">Edit Name</button>
                                </div>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Write your wishes for the couple..."
                                    className="w-full h-40 p-6 bg-gray-50 rounded-[2rem] outline-none focus:ring-2 ring-pink-200 transition-all resize-none shadow-inner text-gray-700"
                                />
                                <button
                                    onClick={handleSendMessage}
                                    disabled={!message.trim() || isSending}
                                    className="flex items-center justify-center gap-3 w-full py-4 bg-pink-500 text-white font-bold rounded-2xl shadow-lg hover:bg-pink-600 transition-all disabled:opacity-50"
                                >
                                    {isSending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Send Blessings"}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* --- UPDATED SLIDESHOW SECTION --- */}
                    <div className="relative flex flex-col justify-center min-h-[400px]">
                        <div className="flex items-center justify-between mb-8 px-4">
                            <span className="flex items-center gap-2 text-gray-400 font-bold uppercase tracking-widest text-xs">
                                <MessageSquare className="w-4 h-4" /> Live Guestbook
                            </span>
                            {isLoading && <Loader2 className="w-4 h-4 animate-spin text-pink-300" />}
                        </div>

                        <div className="relative overflow-hidden h-64 flex items-center">
                            {receivedMessages.length > 0 ? (
                                <div
                                    key={currentIndex}
                                    className="w-full p-10 rounded-[3rem] bg-white shadow-2xl border border-white relative animate-in fade-in slide-in-from-right-8 duration-700"
                                >
                                    <Quote className="absolute top-6 left-6 w-12 h-12 text-pink-50 opacity-10" />
                                    <p className="text-xl md:text-2xl text-gray-700 italic leading-relaxed mb-6 text-center">
                                        "{receivedMessages[currentIndex].message || "Sending love!"}"
                                    </p>
                                    <div className="flex items-center justify-center gap-3">
                                        <div className="h-[1px] w-8 bg-pink-200" />
                                        <span className="text-sm font-black text-pink-500 uppercase tracking-widest">
                                            {receivedMessages[currentIndex].name || "Well Wisher"}
                                        </span>
                                        <div className="h-[1px] w-8 bg-pink-200" />
                                    </div>
                                </div>
                            ) : !isLoading ? (
                                <div className="w-full text-center py-10 text-gray-400 italic bg-white/40 rounded-3xl border border-dashed border-gray-200">
                                    No public wishes yet. Be the first to bless the couple!
                                </div>
                            ) : (
                                <div className="w-full flex justify-center"><Loader2 className="w-10 h-10 animate-spin text-pink-200" /></div>
                            )}
                        </div>

                        {/* Pagination Indicators */}
                        {receivedMessages.length > 1 && (
                            <div className="flex justify-center gap-2 mt-8">
                                {receivedMessages.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentIndex(idx)}
                                        className={`h-1.5 transition-all duration-500 rounded-full ${
                                            idx === currentIndex ? 'w-8 bg-pink-400' : 'w-2 bg-pink-100'
                                        }`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}