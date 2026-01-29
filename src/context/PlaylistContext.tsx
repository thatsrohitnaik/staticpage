import { createContext, useContext, useState, ReactNode } from 'react';
import type { YouTubeResult } from '../services/youtubeService';

// Define the structure for a playlist item
export interface PlaylistItem extends YouTubeResult {
  requestedBy: string;
  addedAt: Date;
}

// Define the context type
interface PlaylistContextType {
  playlist: PlaylistItem[];
  addToPlaylist: (song: YouTubeResult, requestedBy: string) => boolean;
  removeFromPlaylist: (songId: string) => void;
  clearPlaylist: () => void;
}

// Create the context with a default value
const PlaylistContext = createContext<PlaylistContextType | undefined>(undefined);

// Provider component
export function PlaylistProvider({ children }: { children: ReactNode }) {
  const [playlist, setPlaylist] = useState<PlaylistItem[]>([]);

  // Add a song to the playlist
  const addToPlaylist = (song: YouTubeResult, requestedBy: string): boolean => {
    // Check if the song already exists in the playlist
    const isDuplicate = playlist.some(item => item.id === song.id);
    
    if (isDuplicate) {
      return false; // Return false to indicate the song was not added
    }
    
    // Add the song to the playlist with requester info
    setPlaylist(prev => [
      ...prev,
      {
        ...song,
        requestedBy,
        addedAt: new Date()
      }
    ]);
    
    return true; // Return true to indicate the song was added
  };

  // Remove a song from the playlist
  const removeFromPlaylist = (songId: string) => {
    setPlaylist(prev => prev.filter(item => item.id !== songId));
  };

  // Clear the entire playlist
  const clearPlaylist = () => {
    setPlaylist([]);
  };

  return (
    <PlaylistContext.Provider
      value={{
        playlist,
        addToPlaylist,
        removeFromPlaylist,
        clearPlaylist
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
}

// Custom hook to use the playlist context
export function usePlaylist() {
  const context = useContext(PlaylistContext);
  
  if (context === undefined) {
    throw new Error('usePlaylist must be used within a PlaylistProvider');
  }
  
  return context;
}