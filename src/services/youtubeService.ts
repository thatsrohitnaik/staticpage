export interface YouTubeResult {
    id: string;
    title: string;
    channel: string;
    thumbnail: string;
}

// Mock implementation that returns sample data instead of making an API call
export async function searchYouTube(query: string): Promise<YouTubeResult[]> {
    console.log(`Searching YouTube Music for: ${query}`);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // If query is empty, return empty results
    if (!query.trim()) {
        return [];
    }
    
    // Mock data - this would normally come from the YouTube Music API
    const mockResults: YouTubeResult[] = [
        {
            id: 'dQw4w9WgXcQ',
            title: 'Rick Astley - Never Gonna Give You Up',
            channel: 'Rick Astley',
            thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg'
        },
        {
            id: '9bZkp7q19f0',
            title: 'PSY - GANGNAM STYLE(강남스타일)',
            channel: 'officialpsy',
            thumbnail: 'https://i.ytimg.com/vi/9bZkp7q19f0/hqdefault.jpg'
        },
        {
            id: 'kJQP7kiw5Fk',
            title: 'Luis Fonsi - Despacito ft. Daddy Yankee',
            channel: 'Luis Fonsi',
            thumbnail: 'https://i.ytimg.com/vi/kJQP7kiw5Fk/hqdefault.jpg'
        },
        {
            id: 'JGwWNGJdvx8',
            title: 'Ed Sheeran - Shape of You',
            channel: 'Ed Sheeran',
            thumbnail: 'https://i.ytimg.com/vi/JGwWNGJdvx8/hqdefault.jpg'
        },
        {
            id: 'RgKAFK5djSk',
            title: 'Wiz Khalifa - See You Again ft. Charlie Puth',
            channel: 'Wiz Khalifa',
            thumbnail: 'https://i.ytimg.com/vi/RgKAFK5djSk/hqdefault.jpg'
        },
        {
            id: 'fJ9rUzIMcZQ',
            title: 'Queen - Bohemian Rhapsody',
            channel: 'Queen Official',
            thumbnail: 'https://i.ytimg.com/vi/fJ9rUzIMcZQ/hqdefault.jpg'
        }
    ];
    
    // Filter results based on query (case-insensitive)
    // For YouTube Music, we would typically search across title, artist, album, and genre
    const lowerQuery = query.toLowerCase();
    
    // Enhanced filtering for YouTube Music search
    // This mock implementation simulates how YouTube Music might search across different attributes
    const filteredResults = mockResults.filter(result => {
        const titleMatch = result.title.toLowerCase().includes(lowerQuery);
        const channelMatch = result.channel.toLowerCase().includes(lowerQuery);
        
        // In a real implementation, we would also check album, genre, lyrics, etc.
        // For this mock, we'll just use title and channel (artist)
        
        return titleMatch || channelMatch;
    });
    
    // Sort results by relevance (in a real implementation, this would use a more sophisticated algorithm)
    // For this mock, we'll prioritize title matches over channel matches
    const sortedResults = filteredResults.sort((a, b) => {
        const aInTitle = a.title.toLowerCase().includes(lowerQuery) ? 1 : 0;
        const bInTitle = b.title.toLowerCase().includes(lowerQuery) ? 1 : 0;
        
        return bInTitle - aInTitle;
    });
    
    return sortedResults;
}
