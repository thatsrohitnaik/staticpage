import { useState } from 'react';
import { Music, X, ExternalLink, Search, PlusCircle, CheckCircle2 } from 'lucide-react';

export default function SpotifyMusicPanel() {
    const [isOpen, setIsOpen] = useState(false);

    // Replace with your actual Spotify Collaborative Playlist link
    const SPOTIFY_PLAYLIST_LINK = "https://open.spotify.com/playlist/YOUR_PLAYLIST_ID";

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
                    <div className="bg-gray-50 rounded-[2.5rem] max-w-md w-full overflow-hidden flex flex-col border border-white shadow-2xl">

                        {/* Header */}
                        <div className="p-6 flex items-center justify-between border-b border-gray-100 bg-white">
                            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                <Music className="w-5 h-5 text-[#1DB954]" />
                                Wedding Jukebox
                            </h2>
                            <button onClick={() => setIsOpen(false)}
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400
                                bg-gray-100 border border-gray-200 hover:text-red-500 transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Content Section */}
                        <div className="p-8 overflow-y-auto">
                            <div className="text-center mb-8">
                                <div className="w-20 h-20 bg-green-50 rounded-3xl mx-auto mb-4 flex items-center justify-center
                                shadow-[inset_4px_4px_8px_rgba(0,0,0,0.05),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]">
                                    <Music className="w-10 h-10 text-[#1DB954]" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800">Add Your Songs</h3>
                                <p className="text-gray-600 mt-2 text-sm italic">Help us build the perfect wedding playlist!</p>
                            </div>

                            {/* Simplified Instructions */}
                            <div className="space-y-4 mb-8">
                                <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                    <div className="bg-[#1DB954] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">1</div>
                                    <p className="text-gray-700 font-medium text-sm">Tap the <b>"Open Spotify"</b> button below.</p>
                                </div>

                                <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                    <div className="bg-[#1DB954] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">2</div>
                                    <p className="text-gray-700 font-medium text-sm">
                                        Tap <b>"Add songs"</b> or the <Search className="w-4 h-4 inline mb-1" /> icon.
                                    </p>
                                </div>

                                <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                    <div className="bg-[#1DB954] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">3</div>
                                    <p className="text-gray-700 font-medium text-sm">
                                        Find your song and tap the <b>Plus</b> <PlusCircle className="w-4 h-4 inline mb-1" /> icon.
                                    </p>
                                </div>
                            </div>

                            {/* CTA Button */}
                            <a
                                href={SPOTIFY_PLAYLIST_LINK}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-3 w-full py-5 bg-[#1DB954] text-white font-bold rounded-2xl
                                shadow-[0_10px_20px_rgba(29,185,84,0.3)] hover:bg-[#1ed760] transition-all active:scale-95"
                            >
                                <ExternalLink className="w-5 h-5" />
                                Open Spotify
                            </a>

                            <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-100">
                                <p className="text-center text-[10px] text-green-600 uppercase font-bold tracking-widest flex items-center justify-center gap-2">
                                    <CheckCircle2 className="w-3 h-3" />
                                    Collaborative Playlist Active
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}