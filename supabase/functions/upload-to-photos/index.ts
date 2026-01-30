import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // 1. Handle CORS Preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { formData, accessToken, albumId, fileName } = await req.json();

    // Step A: Upload bytes to Google to get an Upload Token
    // We convert the base64 string back to bytes
    const blob = Uint8Array.from(atob(formData), c => c.charCodeAt(0));

    const uploadRes = await fetch('https://photoslibrary.googleapis.com/v1/uploads', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-type': 'application/octet-stream',
        'X-Goog-Upload-Protocol': 'raw',
        'X-Goog-Upload-File-Name': fileName,
      },
      body: blob,
    });

    const uploadToken = await uploadRes.text();

    // Step B: Create the Media Item in the Album
    const createRes = await fetch('https://photoslibrary.googleapis.com/v1/mediaItems:batchCreate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        albumId: albumId,
        newMediaItems: [{
          simpleMediaItem: { uploadToken: uploadToken }
        }]
      }),
    });

    const result = await createRes.json();

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
})