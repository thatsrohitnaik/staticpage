import { Music, Trash2 } from 'lucide-react';
import { usePlaylist } from '../context/PlaylistContext';

export default function CrowdsourcedQueue() {
  const { playlist, removeFromPlaylist } = usePlaylist();

  // Format the date to a readable string
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  if (playlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-10 text-center">
        <Music className="w-16 h-16 text-gray-600 mb-4" />
        <h3 className="text-xl font-semibold text-gray-300 mb-2">
          No songs in the queue
        </h3>
        <p className="text-gray-500 max-w-xs">
          Search for songs and add them to the crowdsourced playlist.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">
          Current Queue ({playlist.length})
        </h3>
      </div>

      <div className="space-y-3">
        {playlist.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 p-3 rounded-lg bg-gray-800 border border-gray-700 group relative"
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-12 h-12 rounded object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white truncate">
                {item.title}
              </p>
              <p className="text-sm text-gray-400 truncate">
                {item.channel}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-blue-400">
                  Requested by {item.requestedBy}
                </span>
                <span className="text-xs text-gray-500">
                  • {formatDate(item.addedAt)}
                </span>
              </div>
            </div>
            <button
              onClick={() => removeFromPlaylist(item.id)}
              className="p-2 rounded-full hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Remove from queue"
            >
              <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-400" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}