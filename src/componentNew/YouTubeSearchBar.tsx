import { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { searchYouTube, type YouTubeResult } from './searchYouTube';

interface YouTubeSearchBarProps {
    onResultsChange: (results: YouTubeResult[]) => void;
    placeholder?: string;
}
// ... (imports remain the same)

export default function YouTubeSearchBar({ onResultsChange, placeholder }: YouTubeSearchBarProps) {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const searchTimeout = useRef<any>(null);

    useEffect(() => {
        if (searchTimeout.current) clearTimeout(searchTimeout.current);

        if (query.trim().length < 2) {
            onResultsChange([]);
            return;
        }

        setLoading(true);
        searchTimeout.current = setTimeout(async () => {
            try {
                const results = await searchYouTube(query);
                onResultsChange(results);
                setError('');
            } catch (err: any) {
                setError(err.message || 'Search failed');
                onResultsChange([]);
            } finally {
                setLoading(false);
            }
        }, 500);

        return () => clearTimeout(searchTimeout.current);
    }, [query]);

    return (
        <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className="w-full pl-10 pr-10 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:border-blue-500 text-white outline-none"
            />
            {loading && (
                <div className="absolute right-3 top-3">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
                </div>
            )}
        </div>
    );
}