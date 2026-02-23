import React from 'react';
import { Heart, Quote } from 'lucide-react';

const messages = [
    { name: "Anant", text: "Many many Congratulations to both of youuuuu" },
    { name: "Mihir", text: "Many congratulations and all the best…Wish you both a very happy married life 💐💐" },
    { name: "Narayani & Pankaj", text: "Congratulations!! my darling bhaiya n bhabhi.. lots of love n blessings ❤️" },
    { name: "Bharat", text: "Congratulations Mitra!!!" },
    { name: "Felicia and Yar", text: "We are so excited 💫 So so happy✨ All the best and the countdown begins" },
    { name: "Shalaka", text: "Wishing you both a joyous wedding and an amazing life." },
    { name: "Vishwas", text: "Congratulations and best wishes for a wonderful life together ❤️" },
    { name: "Prajot", text: "Congratulations rohit from prajot and Bindiya" },
    { name: "Teja", text: "Congratulations 😇" },
    { name: "Anuja Kudalkar", text: "Congratulations Bhakti and Rohit ❤️😇. May you have a wonderful married life ahead. Blessings to the lovely couple 🥰" },
    { name: "Pooja", text: "Congratulations to both of you must awaited wedding 😜❤🧿💖🥰" },
];

const MessageCard = ({ msg, index }) => {
    // Alternating subtle styles for a "scrapbook" feel
    const rotations = ['hover:rotate-1', 'hover:-rotate-1', 'hover:rotate-2', 'hover:-rotate-2'];
    const rotation = rotations[index % rotations.length];

    return (
        <div className={`break-inside-avoid mb-6 group transition-all duration-300 ${rotation}`}>
            <div className="relative p-6 rounded-[2rem] bg-white border border-pink-50 shadow-sm group-hover:shadow-md transition-shadow overflow-hidden">
                {/* Decorative Quote Icon */}
                <Quote className="absolute -top-2 -right-2 w-12 h-12 text-pink-50 opacity-40 group-hover:text-pink-100 transition-colors" />

                <div className="relative z-10">
                    <p className="text-gray-700 font-medium leading-relaxed mb-4 italic">
                        "{msg.text}"
                    </p>

                    <div className="flex items-center gap-2">
                        <div className="h-[1px] w-4 bg-pink-200" />
                        <span className="text-sm font-bold text-pink-400 uppercase tracking-wider">
                            {msg.name}
                        </span>
                        <Heart className="w-3 h-3 text-pink-300 fill-pink-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function CelebrationWall() {
    return (
        <section className="py-20 px-6 bg-[#FFFBFA]">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-block p-3 rounded-full bg-pink-50 mb-4">
                        <Heart className="w-6 h-6 text-pink-500 fill-pink-500 animate-pulse" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-light text-gray-800 italic mb-4">
                        Wall of Blessings
                    </h2>
                    <p className="text-gray-500 tracking-[0.2em] uppercase text-xs font-bold">
                        Wishes from our loved ones
                    </p>
                </div>

                {/* Masonry Layout using CSS Columns */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {messages.map((msg, idx) => (
                        <MessageCard key={idx} msg={msg} index={idx} />
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <div className="inline-flex items-center gap-4 px-8 py-3 rounded-full border border-pink-100 text-pink-400 text-sm font-medium italic bg-white shadow-sm">
                        Total {messages.length} Heartfelt Messages
                    </div>
                </div>
            </div>
        </section>
    );
}