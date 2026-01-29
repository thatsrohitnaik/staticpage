import { useState, useRef, useEffect } from 'react';
import { Music, Search, X } from 'lucide-react';
// import { supabase } from '../supabase';

interface Track {
    id: string;
    name: string;
    artist: string;
    uri: string;
    image: string;
    url: string;
}

export default function SongRequestForm() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [tracks, setTracks] = useState<Track[]>([]);
    const [loading, setLoading] = useState(false);
    const [guestName, setGuestName] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    // @ts-ignore
    const searchTimeout = useRef<NodeJS.Timeout>();
    // @ts-ignore
    const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/spotify-search`;

    useEffect(() => {
        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
        }

        if (query.trim().length < 2) {
            setTracks([]);
            return;
        }

        setLoading(true);
        searchTimeout.current = setTimeout(async () => {
            try {
                // @ts-ignore
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
                    },
                    body: JSON.stringify({ query }),
                });

                if (!response.ok) {
                    throw new Error('Failed to search Spotify');
                }

                const data = await response.json();
                setTracks(data.tracks || []);
                setError('');
            } catch (err) {
                console.error('Search error:', err);
                setError('Failed to search songs');
                setTracks([]);
            } finally {
                setLoading(false);
            }
        }, 500);

        return () => {
            if (searchTimeout.current) {
                clearTimeout(searchTimeout.current);
            }
        };
    }, [query]);

    const handleRequestSong = async (track: Track) => {
        if (!guestName.trim()) {
            setError('Please enter your name');
            return;
        }

        try {
            // const { error: dbError } = await supabase
            //     .from('song_requests')
            //     .insert({
            //         song_name: track.name,
            //         artist_name: track.artist,
            //         spotify_uri: track.uri,
            //         requested_by: guestName,
            //     });

            // if (dbError) {
            //     throw dbError;
            // }

            setSubmitted(true);
            setTimeout(() => {
                setSubmitted(false);
                setQuery('');
                setTracks([]);
                setGuestName('');
            }, 2000);
        } catch (err) {
            console.error('Error:', err);
            setError('Failed to submit request. Please try again.');
        }
    };

    if (submitted) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl p-8 text-center shadow-2xl max-w-sm mx-4">
                    <Music className="w-16 h-16 text-pink-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        Song Request Submitted!
                    </h3>
                    <p className="text-gray-600">
                        Thank you! Your song request has been added to the queue.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <>
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-24 right-8 z-50 p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-pink-400 to-rose-400 text-white hover:scale-110"
                >
                    <Music className="w-6 h-6" />
                </button>
            )}

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-96 overflow-hidden flex flex-col">
                        <div className="bg-gradient-to-r from-pink-400 to-rose-400 p-6 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                <Music className="w-6 h-6" />
                                Request a Song
                            </h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                            >
                                <X className="w-6 h-6 text-white" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    value={guestName}
                                    onChange={(e) => setGuestName(e.target.value)}
                                    placeholder="Enter your name"
                                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-pink-400 focus:outline-none transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Search Spotify
                                </label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder="Song or artist name..."
                                        className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-pink-400 focus:outline-none transition-colors"
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
                                    {error}
                                </div>
                            )}

                            {loading && (
                                <div className="text-center py-4">
                                    <div className="inline-block animate-spin rounded-full h-6 w-6 border-2 border-pink-400 border-t-transparent"></div>
                                </div>
                            )}

                            {tracks.length > 0 && (
                                <div className="space-y-2">
                                    {tracks.map((track) => (
                                        <button
                                            key={track.id}
                                            onClick={() => handleRequestSong(track)}
                                            className="w-full flex items-center gap-3 p-3 rounded-lg border-2 border-gray-200 hover:border-pink-400 hover:bg-pink-50 transition-all duration-200 text-left group"
                                        >
                                            {track.image && (
                                                <img
                                                    src={track.image}
                                                    alt={track.name}
                                                    className="w-12 h-12 rounded object-cover"
                                                />
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-gray-800 truncate">
                                                    {track.name}
                                                </p>
                                                <p className="text-sm text-gray-600 truncate">
                                                    {track.artist}
                                                </p>
                                            </div>
                                            <Music className="w-5 h-5 text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </button>
                                    ))}
                                </div>
                            )}

                            {query.trim().length >= 2 && !loading && tracks.length === 0 && (
                                <div className="text-center py-4 text-gray-500">
                                    No songs found. Try another search.
                                </div>
                            )}

                            {query.trim().length < 2 && (
                                <div className="text-center py-4 text-gray-500 text-sm">
                                    Enter at least 2 characters to search
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
