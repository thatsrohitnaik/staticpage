import { Plus } from 'lucide-react';
import type { YouTubeResult } from '../services/youtubeService';

interface YouTubeSearchResultItemProps {
    result: YouTubeResult;
    onAdd: (result: YouTubeResult) => void;
}

export default function YouTubeSearchResultItem({
                                                    result,
                                                    onAdd,
                                                }: YouTubeSearchResultItemProps) {
    return (
        <button
            onClick={() => onAdd(result)}
            className="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-blue-500 transition-all duration-200 text-left group"
        >
            <img
                src={result.thumbnail}
                alt={result.title}
                className="w-12 h-12 rounded object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
                <p className="font-semibold text-white truncate">
                    {result.title}
                </p>
                <p className="text-sm text-gray-400 truncate">
                    {result.channel}
                </p>
            </div>
            <Plus className="w-5 h-5 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
        </button>
    );
}
