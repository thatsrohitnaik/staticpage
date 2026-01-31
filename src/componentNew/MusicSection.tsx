import { Music, PlusCircle, ExternalLink } from 'lucide-react';

export default function MusicSection() {
    const playlistJoinLink = "https://open.spotify.com/playlist/4EBz7UGsSPw0fTxBL4W09I?si=QdjCLdhaRumZFdQi7IXy9A";
    const embedLink = "https://open.spotify.com/embed/playlist/4EBz7UGsSPw0fTxBL4W09I?utm_source=generator";

    return (
        <section className="py-20 px-4 bg-white/50">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-light text-gray-700 mb-4">Wedding Jams</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        We want to hear your favorite songs! Help us build the ultimate wedding
                        playlist. Add the tracks that will get you on the dance floor.
                    </p>
                </div>

                <div className="grid lg:grid-cols-5 gap-8 items-start">
                    {/* Spotify Embed Player - Takes 3 columns */}
                    <div className="lg:col-span-3 shadow-neu rounded-[2rem] overflow-hidden bg-white p-2">
                        <iframe
                            style={{ borderRadius: '24px' }}
                            src={embedLink}
                            width="100%"
                            height="450"
                            frameBorder="0"
                            allowFullScreen
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                        ></iframe>
                    </div>

                    {/* Join Playlist CTA - Takes 2 columns */}
                    <div className="lg:col-span-2 flex flex-col h-full gap-6">
                        <div className="p-10 rounded-3xl shadow-neu bg-white flex-1 flex flex-col justify-center items-center text-center">
                            <div className="w-20 h-20 rounded-full shadow-neu mb-8 flex items-center justify-center bg-pink-50">
                                <PlusCircle className="w-10 h-10 text-pink-300" />
                            </div>
                            <h3 className="text-3xl font-light text-gray-700 mb-4">Add Your Music</h3>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Join our collaborative playlist on Spotify and contribute to our celebration.
                            </p>

                            <a
                                href={playlistJoinLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-pink-300 text-white rounded-full font-medium hover:bg-pink-400 transition-all shadow-lg hover:shadow-pink-200/50"
                            >
                                <span>Join the Playlist</span>
                                <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </a>
                        </div>

                        {/* Fun Note Card */}
                        <div className="p-8 rounded-3xl shadow-neu bg-gray-50/50 flex items-start gap-4">
                            <Music className="w-6 h-6 text-pink-300 flex-shrink-0 mt-1" />
                            <p className="text-sm text-gray-500 italic">
                                Note: Please keep it festive! We can't wait to see what you choose.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}