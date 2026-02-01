import { MapPin, Clock, Camera, Sparkles, ExternalLink, Heart } from 'lucide-react';

export default function Details() {
    const events = [
        {
            title: "The Haldi",
            time: "Feb 25 • 10:00 AM",
            locations: [
                { name: "Groom: Raghuvir Niwas", sub: "Kundai, Ponda", link: "https://maps.app.goo.gl/b9gcVuNKXmcPoCYS6" },
                { name: "Bride: Gracia's Villa", sub: "Miramar, Panjim", link: "https://maps.app.goo.gl/u866X4JRQFsJWJzG9" }
            ],
            icon: <Sparkles className="w-6 h-6 text-orange-400" />,
            note: "Theme : Yellow, Start the festivities with turmeric and joy."
        },
        {
            title: "The Wedding Ceremony",
            time: "Feb 26 • 12:06 PM",
            locations: [
                { name: "Sala de Gaspar", sub: "Miramar, Goa", link: "https://maps.app.goo.gl/x9yGzeV9u1JrYRag8" }
            ],
            icon: <Heart className="w-6 h-6 text-pink-400" />,
            note: "The Muhurat—when two stories become one."
        },
        {
            title: "The Celebration",
            time: "Feb 26 • 02:00 PM",
            locations: [
                { name: "Sala de Gaspar", sub: "Reception Hall", link: "https://maps.app.goo.gl/x9yGzeV9u1JrYRag8" }
            ],
            icon: <MapPin className="w-6 h-6 text-blue-400" />,
            note: "Feast, dance, and celebrate with the newlyweds."
        }
    ];

    return (
        <section className="py-24 px-4 bg-white/30" id={"wedding-hero"}>
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-20">
                    <span className="text-pink-400 font-bold tracking-[0.3em] uppercase text-xs">The Main Events</span>
                    <h2 className="text-6xl font-serif mt-4 text-gray-800 italic">Wedding Details</h2>
                    <div className="h-1 w-20 bg-pink-100 mx-auto mt-6 rounded-full"></div>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 items-start">

                    {/* LEFT: Dress Code & Vibe (Sticky Side) */}
                    <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-24">
                        <div className="p-8 rounded-[2.5rem] bg-white shadow-neu border border-white">
                            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                                <Camera className="w-6 h-6 text-pink-300" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Dress Code</h3>
                            <p className="text-gray-600 leading-relaxed italic">
                                "Traditional attire. If your outfit doesn’t make a little <b>swish-swish</b> sound when you walk, try again."
                            </p>
                            <p className="text-xs text-gray-400 mt-6 font-bold uppercase tracking-widest">
                                #RohitWedsBhakti
                            </p>
                        </div>

                        <div className="p-8 rounded-[2.5rem] bg-gray-900 text-white shadow-2xl relative overflow-hidden">
                            <Clock className="absolute -bottom-4 -right-4 w-24 h-24 text-white/5" />
                            <h3 className="text-xl font-bold mb-2">Punctuality</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                We love our Goan time, but the Muhurat waits for no one! Please plan to arrive 15 minutes early.
                            </p>
                        </div>
                    </div>

                    {/* RIGHT: The Timeline */}
                    <div className="lg:col-span-8 space-y-10">
                        {events.map((event, index) => (
                            <div key={index} className="relative group">
                                {/* Connector Line */}
                                {index !== events.length - 1 && (
                                    <div className="absolute left-8 top-16 bottom-[-40px] w-0.5 bg-dashed border-l-2 border-dashed border-gray-200 hidden md:block"></div>
                                )}

                                <div className="flex gap-6 md:gap-10">
                                    {/* Icon Column */}
                                    <div className="hidden md:flex w-16 h-16 shrink-0 bg-white rounded-2xl shadow-neu items-center justify-center z-10 group-hover:scale-110 transition-transform">
                                        {event.icon}
                                    </div>

                                    {/* Content Card */}
                                    <div className="flex-grow p-8 md:p-10 rounded-[2.5rem] bg-white shadow-neu border border-white hover:shadow-xl transition-shadow">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                            <div>
                                                <h4 className="text-2xl font-black text-gray-800">{event.title}</h4>
                                                <p className="text-pink-400 font-bold text-sm uppercase tracking-wider">{event.time}</p>
                                            </div>
                                            <div className="text-sm text-gray-400 italic md:text-right max-w-[200px]">
                                                {event.note}
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            {event.locations.map((loc, lIdx) => (
                                                <a
                                                    key={lIdx}
                                                    href={loc.link}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="flex items-start gap-3 p-4 rounded-2xl bg-gray-50 hover:bg-pink-50 transition-colors group/link border border-transparent hover:border-pink-100"
                                                >
                                                    <MapPin className="w-5 h-5 text-gray-400 group-hover/link:text-pink-400 shrink-0" />
                                                    <div className="overflow-hidden">
                                                        <p className="font-bold text-gray-700 text-sm truncate">{loc.name}</p>
                                                        <p className="text-xs text-gray-500">{loc.sub}</p>
                                                        <div className="flex items-center gap-1 mt-2 text-[10px] text-pink-400 font-bold uppercase">
                                                            <span>Get Directions</span>
                                                            <ExternalLink className="w-3 h-3" />
                                                        </div>
                                                    </div>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}