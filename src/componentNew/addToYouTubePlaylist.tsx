const PLAYLIST_ID = 'PLvdBhqmDlWWLAsLj04-9htz7KnnFLPu5W&jct=X6Hu6c0IAQh4o85Ehc_y9A'; // The ID of the wedding playlist

export const addToYouTubePlaylist = async (videoId: string, accessToken: string, PLAYLIST_ID: string) => {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            snippet: {
                playlistId: PLAYLIST_ID,
                resourceId: {
                    kind: 'youtube#video',
                    videoId: videoId,
                },
            },
        }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error.message || 'Failed to add to playlist');
    }

    return await response.json();
};