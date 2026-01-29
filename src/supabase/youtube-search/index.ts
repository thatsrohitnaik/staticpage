const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface YouTubeSearchResponse {
    items: Array<{
        id: { videoId: string };
        snippet: {
            title: string;
            channelTitle: string;
            thumbnails: {
                medium: { url: string };
            };
        };
    }>;
}

interface FormattedResult {
    id: string;
    title: string;
    channel: string;
    thumbnail: string;
}

async function searchYouTube(
    query: string,
    apiKey: string
): Promise<FormattedResult[]> {
    const encodedQuery = encodeURIComponent(query);
    const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodedQuery}&type=video&maxResults=10&key=${apiKey}`,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    if (!response.ok) {
        throw new Error(`YouTube API error: ${response.status}`);
    }

    const data = (await response.json()) as YouTubeSearchResponse;

    return data.items.map((item) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        channel: item.snippet.channelTitle,
        thumbnail: item.snippet.thumbnails.medium.url,
    }));
}

Deno.serve(async (req: Request) => {
    if (req.method === "OPTIONS") {
        return new Response(null, {
            status: 200,
            headers: corsHeaders,
        });
    }

    try {
        const { query } = await req.json();

        if (!query || query.trim().length < 2) {
            return new Response(
                JSON.stringify({ error: "Query must be at least 2 characters" }),
                {
                    status: 400,
                    headers: {
                        ...corsHeaders,
                        "Content-Type": "application/json",
                    },
                }
            );
        }

        const apiKey = Deno.env.get("YOUTUBE_API_KEY");
        if (!apiKey) {
            throw new Error("YouTube API key not configured");
        }

        const results = await searchYouTube(query, apiKey);

        return new Response(JSON.stringify({ results }), {
            headers: {
                ...corsHeaders,
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error:", error);
        return new Response(
            JSON.stringify({
                error: error instanceof Error ? error.message : "An error occurred",
            }),
            {
                status: 500,
                headers: {
                    ...corsHeaders,
                    "Content-Type": "application/json",
                },
            }
        );
    }
});
