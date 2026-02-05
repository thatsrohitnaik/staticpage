import { useState, useEffect } from 'react';
import { Send, Heart, Loader2, MessageSquare, UserCircle } from 'lucide-react';

export default function BlessingsSection() {
    const [receivedMessages, setReceivedMessages] = useState([]);
    const [voteCount, setVoteCount] = useState(0);
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Guest State
    const [guestName, setGuestName] = useState('');
    const [isNameSet, setIsNameSet] = useState(false);

    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyKZ-kxF-dPiO5uqN9JyYh0JrheVXdh_K14NB5lUSFNMWqtGOXlQNV-yWdYFmzqX2-Ghg/exec';

    // 1. Check for URL Param on mount
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const nameFromUrl = params.get('guest');

        if (nameFromUrl) {
            setGuestName(nameFromUrl);
            setIsNameSet(true);
        }
        fetchContent();
    }, []);

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
            // Optional: Show a "Thank you" toast here
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
                        <p className="text-pink-400 font-medium tracking-wide">
                            Join {voteCount} others in celebrating Rohit & Bhakti!
                        </p>
                    )}
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Input Form Area */}
                    <div className="p-10 rounded-[2.5rem] bg-white shadow-xl border border-white">
                        <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-2">
                            <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
                            Send Your Love
                        </h3>

                        {!isNameSet ? (
                            /* Step 1: Ask for Name if not in URL */
                            <div className="space-y-6 animate-in fade-in duration-500">
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
                                    className="w-full py-4 bg-gray-800 text-white font-bold rounded-2xl hover:bg-black transition-all"
                                >
                                    Continue
                                </button>
                            </div>
                        ) : (
                            /* Step 2: Message Input */
                            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-500">
                                            <Heart className="w-4 h-4 fill-current" />
                                        </div>
                                        <span className="text-sm font-medium text-gray-600">Writing as <b>{guestName}</b></span>
                                    </div>
                                    <button
                                        onClick={() => setIsNameSet(false)}
                                        className="text-xs text-gray-400 hover:text-pink-500 underline underline-offset-2"
                                    >
                                        Edit Name
                                    </button>
                                </div>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Write your wishes for the couple..."
                                    className="w-full h-40 p-6 bg-gray-50 rounded-[2rem] border-none outline-none focus:ring-2 ring-pink-200 transition-all resize-none shadow-inner text-gray-700"
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

                    {/* Feed Section */}
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