export const uploadPhotoToAlbum = async (file: File, accessToken: string, albumId: string) => {
    // Step 1: Upload the file bytes
    const uploadResponse = await fetch('https://photoslibrary.googleapis.com/v1/uploads', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-type': 'application/octet-stream',
            'X-Goog-Upload-Protocol': 'raw',
            'X-Goog-Upload-File-Name': file.name,
        },
        body: file,
    });

    const uploadToken = await uploadResponse.text();

    // Step 2: Add the photo to the album
    const response = await fetch('https://photoslibrary.googleapis.com/v1/mediaItems:batchCreate', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            albumId: albumId,
            newMediaItems: [{
                description: "Wedding Guest Upload",
                simpleMediaItem: { uploadToken: uploadToken }
            }]
        }),
    });

    return await response.json();
};