import { Hotel, Map, Coffee, Utensils, ExternalLink, Info, Landmark } from 'lucide-react';

export default function GuestGuide() {
    const stays = [
        {
            name: "Goa Marriott Resort",
            type: "Luxury",
            location: "Miramar Beach",
            link: "https://maps.google.com/?q=Goa+Marriott+Resort+and+Spa",
            tag: "Closest to Venue"
        },
        {
            name: "Fortune Miramar",
            type: "Mid-Range",
            location: "Miramar",
            link: "https://maps.google.com/?q=Fortune+Miramar+Goa",
            tag: "Highly Rated"
        },
        {
            name: "Campal Beach Resort",
            type: "Budget",
            location: "Campal, Panjim",
            link: "https://maps.google.com/?q=Campal+Beach+Resort",
            tag: "Affordable & Near"
        },
        {
            name: "Afonso Guest House",
            type: "Heritage/Budget",
            location: "Fontainhas",
            link: "https://maps.google.com/?q=Afonso+Guest+House+Panjim",
            tag: "Old World Charm"
        }
    ];

    const temples = [
        {
            name: "Shree Mahalaxmi Temple",
            desc: "The heart of Panjim. Stunning architecture and a very peaceful atmosphere.",
            loc: "Panjim City Centre"
        },
        {
            name: "Maruti Temple",
            desc: "Perched on Altinho hill, this vibrant orange temple offers a panoramic view of the city.",
            loc: "Altinho, Panjim"
        },
        {
            name: "Shree Shantadurga Temple",
            desc: "A beautiful drive to Kavlem to see one of Goa's most famous and serene temple complexes.",
            loc: "Ponda (45 min drive)"
        }
    ];

    const cafes = [
        { name: "Cafe Bodega", vibe: "Artistic & Quiet", try: "Eggs Benedict / Coffee" },
        { name: "Padaria Prazeres", vibe: "Authentic Bakery", try: "Pastel de Nata" },
        { name: "Caravela Cafe", vibe: "Heritage Bistro", try: "Goan Breakfast" },
        { name: "Cafe Tato", vibe: "Local Legend", try: "Buns & Mix Bhaji" }
    ];

    return (
        <section className="py-20 px-4 bg-gray-50/50">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-light text-gray-700 italic mb-4">Traveler's Guide</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        A little help for our loved ones flying in. From cozy stays to our favorite coffee spots.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 items-start">

                    {/* Stays Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 px-2">
                            <Hotel className="w-6 h-6 text-pink-400" />
                            <h3 className="text-2xl font-bold text-gray-800">Stay Nearby</h3>
                        </div>
                        <div className="space-y-4">
                            {stays.map((hotel, idx) => (
                                <div key={idx} className="p-5 rounded-3xl bg-white shadow-sm border border-white hover:border-pink-100 transition-all">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="text-[10px] font-bold text-pink-400 uppercase tracking-widest">{hotel.type}</span>
                                        <a href={hotel.link} target="_blank" rel="noreferrer"><ExternalLink className="w-4 h-4 text-gray-300" /></a>
                                    </div>
                                    <h4 className="font-bold text-gray-800">{hotel.name}</h4>
                                    <p className="text-xs text-gray-500">{hotel.location}</p>
                                    <span className="mt-3 inline-block text-[10px] bg-gray-100 px-2 py-1 rounded-full text-gray-400 font-medium">
                                        {hotel.tag}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Temples Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 px-2">
                            <Landmark className="w-6 h-6 text-orange-400" />
                            <h3 className="text-2xl font-bold text-gray-800">Visit & Blessings</h3>
                        </div>
                        <div className="p-8 rounded-[2.5rem] bg-white shadow-neu border border-white space-y-8">
                            {temples.map((temple, idx) => (
                                <div key={idx} className="group">
                                    <h4 className="font-bold text-gray-800 group-hover:text-orange-500 transition-colors">{temple.name}</h4>
                                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">{temple.desc}</p>
                                    <p className="text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-tighter italic">{temple.loc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Cafes Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 px-2">
                            <Coffee className="w-6 h-6 text-brown-400" />
                            <h3 className="text-2xl font-bold text-gray-800">Cafe Hops</h3>
                        </div>
                        <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl">
                            <Utensils className="absolute -bottom-4 -right-4 w-32 h-32 text-white/5 -rotate-12" />
                            <div className="space-y-6 relative z-10">
                                {cafes.map((cafe, idx) => (
                                    <div key={idx} className="border-b border-white/10 pb-4 last:border-0">
                                        <div className="flex justify-between items-center">
                                            <h4 className="font-bold text-pink-300">{cafe.name}</h4>
                                            <span className="text-[10px] text-gray-400 uppercase tracking-widest">{cafe.vibe}</span>
                                        </div>
                                        <p className="text-xs text-gray-400 mt-1">Must try: {cafe.try}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/10 text-center">
                                <p className="text-[10px] text-gray-300 italic">
                                    "Miramar is best enjoyed with a morning walk and a coffee at a local spot."
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}