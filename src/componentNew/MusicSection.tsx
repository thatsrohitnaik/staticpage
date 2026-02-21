import { Music, PlusCircle, ExternalLink, Anchor, Heart } from 'lucide-react';

export default function MusicSection() {
    const playlistJoinLink = "https://open.spotify.com/playlist/3fVrBNVD8pyfYt0Rm5U124?si=2b6b00a9d6694a4c&pt=3ff60f73a55f8dd39ed297b4cb9a1e6d";
    const embedLink = "https://open.spotify.com/embed/playlist/3fVrBNVD8pyfYt0Rm5U124?utm_source=generator";

    return (
        <section className="py-20 px-4 bg-white/50" id={"jukebox-section"}>
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-light text-gray-700 mb-4">Wedding Jams</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        We want to hear your favorite songs! Help us build the ultimate wedding
                        playlist. Add the tracks that will get you on the dance floor.
                    </p>
                </div>

                <div className="grid lg:grid-cols-5 gap-8 items-start">
                    {/* Spotify Embed Player */}
                    <div className="lg:col-span-3 shadow-neu rounded-[2rem] overflow-hidden bg-white p-2">
                        <iframe
                            style={{ borderRadius: '24px' }}
                            src={embedLink}
                            width="100%"
                            height="550" // Increased height to match the new content on the right
                            frameBorder="0"
                            allowFullScreen
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                        ></iframe>
                    </div>

                    {/* Right Column: Tribute & CTA */}
                    <div className="lg:col-span-2 flex flex-col gap-6">

                        {/* Historical Tribute Card */}
                        <div className="p-8 rounded-3xl shadow-neu bg-amber-50/30 border border-amber-100/50">
                            <div className="flex items-center gap-3 mb-4">
                                <Anchor className="w-6 h-6 text-amber-600" />
                                <h3 className="text-xl font-semibold text-gray-700">A Special Tribute</h3>
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed mb-4">
                                We dedicate the song <span className="font-semibold italic">"Hanv Saiba Poltoddi Vetam"</span> to our ancestors who suffered during the <strong>Portuguese Inquisition</strong>.
                            </p>
                            <p className="text-xs text-gray-600 leading-relaxed italic">
                                When traditional weddings, sarees (Saddo), and rituals were banned in the Old Conquests,
                                brave couples crossed the river to the "other side" (Poltoddi) to celebrate their union in
                                freedom. We dance today because they kept our traditions alive.
                            </p>
                            <div className="mt-4 flex items-center gap-2 text-pink-400">
                                <Heart className="w-4 h-4 fill-current" />
                                <span className="text-xs font-medium uppercase tracking-wider">In Remembrance</span>
                            </div>
                        </div>

                        {/* Join Playlist CTA */}
                        <div className="p-10 rounded-3xl shadow-neu bg-white flex flex-col justify-center items-center text-center">
                            <a href={playlistJoinLink} target="_blank" rel="noopener noreferrer">
                                <div className="w-16 h-16 rounded-full shadow-neu mb-6 flex items-center justify-center bg-pink-50">
                                    <PlusCircle className="w-8 h-8 text-pink-300" />
                                </div>
                            </a>
                            <h3 className="text-2xl font-light text-gray-700 mb-3">Add Your Music</h3>
                            <p className="text-sm text-gray-600 mb-6">
                                Join our collaborative playlist and contribute to our celebration.
                            </p>

                            <a
                                href={playlistJoinLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative inline-flex items-center gap-3 px-6 py-3 bg-pink-300 text-white rounded-full font-medium hover:bg-pink-400 transition-all shadow-lg"
                            >
                                <span>Join the Playlist</span>
                                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </a>
                        </div>

                        {/* Fun Note Card */}
                        <div className="p-6 rounded-3xl shadow-neu bg-gray-50/50 flex items-start gap-4">
                            <Music className="w-5 h-5 text-pink-300 flex-shrink-0 mt-1" />
                            <p className="text-xs text-gray-500 italic">
                                Note: Please keep it festive! We can't wait to see what you choose.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}