import { useState, useEffect } from 'react';
import { Heart, Loader2, MessageSquare, UserCircle, LayoutGrid } from 'lucide-react';

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
            // Optional: Immediately add the message to the UI for better UX
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
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-light text-gray-700 italic mb-4">Blessings & Wishes</h2>
                    {voteCount > 0 && (
                        <p className="text-pink-400 font-medium tracking-wide animate-pulse">
                            Join {voteCount} others in celebrating Rohit & Bhakti!
                        </p>
                    )}
                </div>

                {/* Input Form Area - Now Centered */}
                <div className="max-w-2xl mx-auto mb-24">
                    <div className="p-10 rounded-[2.5rem] bg-white shadow-xl border border-white">
                        <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center justify-center gap-2">
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
                                <div className="flex items-center justify-between px-2">
                                    <span className="text-sm font-medium text-gray-600">Writing as <b className="text-gray-900">{guestName}</b></span>
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
                </div>

                {/* --- WALL OF BLESSINGS --- */}
                <div className="mt-10">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="h-[1px] flex-1 bg-gray-200" />
                        <h3 className="text-3xl font-light text-gray-600 flex items-center gap-3 px-4">
                            <LayoutGrid className="w-6 h-6 text-pink-400" />
                            Wall of Blessings
                        </h3>
                        <div className="h-[1px] flex-1 bg-gray-200" />
                    </div>

                    {isLoading && receivedMessages.length === 0 ? (
                        <div className="flex justify-center py-20">
                            <Loader2 className="w-10 h-10 animate-spin text-pink-200" />
                        </div>
                    ) : receivedMessages.length > 0 ? (
                        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                            {receivedMessages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className="break-inside-avoid p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 duration-300 group"
                                >
                                    <p className="text-gray-600 italic leading-relaxed mb-6 text-lg">
                                        "{msg.message}"
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center group-hover:bg-pink-100 transition-colors">
                                            <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-gray-800 uppercase tracking-widest">
                                                {msg.name || "Well Wisher"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-400 py-20 bg-white/40 rounded-[3rem] border border-dashed border-gray-200">
                            The wall is waiting for your touch. Be the first to leave a message!
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}