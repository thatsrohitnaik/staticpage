export interface YouTubeResult {
    id: string;
    title: string;
    thumbnail: string;
    channel: string;
}

const API_KEY = 'AIzaSyCLcU459CGNkCFWGpb_M_P0HX_BPWnPfFQ';

// SEARCH FUNCTION
export const searchYouTube = async (query: string): Promise<YouTubeResult[]> => {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=8&q=${encodeURIComponent(query)}&type=video&videoCategoryId=10&key=${API_KEY}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error('YouTube search failed');

    const data = await response.json();
    return data.items.map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
        channel: item.snippet.channelTitle,
    }));
};

// ADD TO PLAYLIST FUNCTION
export const addToYouTubePlaylist = async (videoId: string, accessToken: string, playlistId: string) => {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            snippet: {
                playlistId: playlistId,
                resourceId: {
                    kind: 'youtube#video',
                    videoId: videoId,
                },
            },
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message || 'Failed to update YouTube playlist');
    }

    return await response.json();
};