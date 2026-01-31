import { useState } from 'react';
import { Music, X, ExternalLink, Search, PlusCircle, CheckCircle2 } from 'lucide-react';

export default function SpotifyMusicPanel() {
    const [isOpen, setIsOpen] = useState(false);

    // Your Spotify Collaborative Playlist link
    const SPOTIFY_PLAYLIST_LINK = "https://open.spotify.com/playlist/your-playlist-id";

    return (
        <>
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-32 right-8 z-50 p-4 rounded-full transition-all text-[#1DB954] hover:scale-110
                    bg-gray-100 border border-gray-200 shadow-[5px_5px_10px_rgba(0,0,0,0.1),-5px_-5px_10px_rgba(255,255,255,0.8)]"
                >
                    <Music className="w-6 h-6" />
                </button>
            )}

            {isOpen && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-md">
                    <div className="bg-gray-50 rounded-[2.5rem] max-w-md w-full overflow-hidden flex flex-col border border-white shadow-2xl max-h-[95vh]">

                        {/* Header */}
                        <div className="p-6 flex items-center justify-between border-b border-gray-100 bg-white shrink-0">
                            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                <div className="bg-[#1DB954]/10 p-1.5 rounded-lg">
                                    <Music className="w-5 h-5 text-[#1DB954]" />
                                </div>
                                Wedding Jukebox
                            </h2>
                            <button onClick={() => setIsOpen(false)}
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400
                                bg-gray-100 border border-gray-200 hover:text-red-500 transition-all hover:rotate-90">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Content Section */}
                        <div className="p-6 overflow-y-auto custom-scrollbar">

                            {/* Spotify Embed Player */}
                            <div className="mb-8 rounded-2xl overflow-hidden shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05),inset_-2px_-2px_5px_rgba(255,255,255,0.8)] bg-white p-1 border border-gray-100">
                                <iframe
                                    data-testid="embed-iframe"
                                    style={{"borderRadius":"16px"}}
                                    src="https://open.spotify.com/embed/playlist/4EBz7UGsSPw0fTxBL4W09I?utm_source=generator"
                                    width="100%"
                                    height="352"
                                    frameBorder="0"
                                    allowFullScreen={true}
                                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                    loading="lazy"
                                ></iframe>
                            </div>

                            <div className="text-center mb-6">
                                <h3 className="text-xl font-bold text-gray-800">Request a Song</h3>
                                <p className="text-gray-500 text-sm italic mt-1">Help us build the perfect wedding vibe</p>
                            </div>

                            {/* Simplified Instructions - Neumorphic Cards */}
                            <div className="space-y-3 mb-8">
                                {[
                                    { step: 1, text: <>Tap <b className="text-gray-900">"Open Spotify"</b> below</> },
                                    { step: 2, text: <>Tap <b className="text-gray-900">"Add songs"</b> or the <Search className="w-3.5 h-3.5 inline mb-0.5" /> icon</> },
                                    { step: 3, text: <>Tap the <PlusCircle className="w-3.5 h-3.5 inline mb-0.5" /> <b className="text-gray-900">Plus</b> next to your song</> }
                                ].map((item) => (
                                    <div key={item.step} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-[2px_2px_5px_rgba(0,0,0,0.02)] transition-transform hover:translate-x-1">
                                        <div className="bg-[#1DB954] text-white w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 shadow-md shadow-[#1DB954]/20">
                                            {item.step}
                                        </div>
                                        <p className="text-gray-600 font-medium text-xs leading-relaxed">
                                            {item.text}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* CTA Button */}
                            <div className="sticky bottom-0 bg-gray-50 pt-2 pb-4">
                                <a
                                    href={SPOTIFY_PLAYLIST_LINK}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-3 w-full py-4 bg-[#1DB954] text-white font-bold rounded-2xl
                                    shadow-[0_8px_20px_rgba(29,185,84,0.3)] hover:bg-[#1ed760] hover:shadow-[0_12px_24px_rgba(29,185,84,0.4)] transition-all active:scale-95"
                                >
                                    <ExternalLink className="w-5 h-5" />
                                    Open Spotify App
                                </a>

                                <div className="mt-4 p-3 bg-green-50/50 rounded-xl border border-green-100/50 text-center">
                                    <p className="text-[10px] text-green-600 uppercase font-bold tracking-[0.15em] flex items-center justify-center gap-2">
                                        <CheckCircle2 className="w-3 h-3" />
                                        Collaborative Mode Active
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}