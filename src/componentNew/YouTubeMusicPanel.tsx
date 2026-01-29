import { useState } from 'react';
import { Music, X, Lock, Check } from 'lucide-react';
import YouTubeSearchBar from './YouTubeSearchBar';
import YouTubeSearchResultItem from './YouTubeSearchResultItem';
import CrowdsourcedQueue from './CrowdsourcedQueue';
import { usePlaylist } from '../context/PlaylistContext';
import { useAuth } from '../context/AuthContext';
import { addToYouTubePlaylist } from './addToYouTubePlaylist';
import { YouTubeResult } from './searchYouTube';

export default function YouTubeMusicPanel() {
    const [isOpen, setIsOpen] = useState(false);
    const [searchResults, setSearchResults] = useState<YouTubeResult[]>([]);
    const [guestName, setGuestName] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Use the shared authentication context
    const { accessToken, login, isAuthenticated } = useAuth();
    const PLAYLIST_ID = 'PLvdBhqmDlWWLAsLj04-9htz7KnnFLPu5W'; // Replace with your actual Playlist ID

    const { addToPlaylist } = usePlaylist();

    const handleAddSong = async (result: YouTubeResult) => {
        if (!guestName.trim()) {
            setError('Please enter your name first');
            return;
        }

        if (!isAuthenticated || !accessToken) {
            setError('Host must be logged in to add to the live YouTube playlist');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            // 1. Add to the ACTUAL YouTube Playlist via API
            await addToYouTubePlaylist(result.id, accessToken, PLAYLIST_ID);

            // 2. Add to your local UI context for the guest to see
            const added = addToPlaylist(result, guestName);

            if (!added) {
                setError('This song is already in the queue');
                return;
            }

            setSubmitted(true);
            setTimeout(() => {
                setSubmitted(false);
                setSearchResults([]);
                setGuestName('');
                setError('');
            }, 2000);
        } catch (err: any) {
            console.error('Playlist Add Error:', err);
            setError(err.message || 'Failed to add to YouTube playlist. Token might be expired.');
        } finally {
            setIsLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-gray-900 rounded-2xl p-8 text-center shadow-2xl max-w-sm mx-4 border border-gray-700">
                    <Check className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">Added to Live Playlist!</h3>
                    <p className="text-gray-400">Rohit & Bhakti will hear your request soon.</p>
                </div>
            </div>
        );
    }

    return (
        <>
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-32 right-8 z-50 p-4 rounded-full shadow-lg transition-all bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:scale-110"
                >
                    <Music className="w-6 h-6" />
                </button>
            )}

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-gray-700">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                <Music className="w-6 h-6" />
                                Wedding Jukebox
                            </h2>
                            <div className="flex items-center gap-4">
                                {!isAuthenticated ? (
                                    <button
                                        onClick={login}
                                        className="flex items-center gap-2 text-xs bg-black bg-opacity-30 px-3 py-1 rounded text-white hover:bg-opacity-50"
                                    >
                                        <Lock className="w-3 h-3" /> Host Login
                                    </button>
                                ) : (
                                    <span className="text-xs text-green-300 flex items-center gap-1">
                                        <Check className="w-3 h-3" /> Live Sync Active
                                    </span>
                                )}
                                <button onClick={() => setIsOpen(false)}>
                                    <X className="w-6 h-6 text-white" />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
                            {/* Search Section */}
                            <div className="w-full lg:w-1/2 p-6 border-b lg:border-b-0 lg:border-r border-gray-700 overflow-y-auto">
                                <div className="space-y-4">
                                    <div className="bg-blue-900 bg-opacity-20 p-4 rounded-xl border border-blue-800">
                                        <label className="block text-sm font-semibold text-blue-300 mb-2">Guest Name</label>
                                        <input
                                            type="text"
                                            value={guestName}
                                            onChange={(e) => setGuestName(e.target.value)}
                                            placeholder="Who is requesting?"
                                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white outline-none focus:border-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">Search Songs</label>
                                        <YouTubeSearchBar onResultsChange={setSearchResults} />
                                    </div>

                                    {error && (
                                        <div className="p-3 bg-red-900 bg-opacity-30 border border-red-500 text-red-400 rounded-lg text-sm">
                                            {error}
                                        </div>
                                    )}

                                    {/* Results */}
                                    <div className="space-y-2">
                                        {isLoading ? (
                                            <div className="text-center py-4 text-blue-400">Adding to YouTube Playlist...</div>
                                        ) : (
                                            searchResults.map((result) => (
                                                <YouTubeSearchResultItem key={result.id} result={result} onAdd={handleAddSong} />
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Queue Section */}
                            <div className="w-full lg:w-1/2 p-6 overflow-y-auto bg-gray-950 bg-opacity-50">
                                <h3 className="text-lg font-bold text-white mb-4">Song Queue</h3>
                                <CrowdsourcedQueue />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}