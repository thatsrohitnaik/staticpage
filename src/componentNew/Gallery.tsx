import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Plus, ExternalLink } from 'lucide-react';

// @ts-ignore
const imageModules = import.meta.glob('../assets/images/templerun/*.{png,jpg,jpeg,webp}', {
    eager: true,
    import: 'default',
});

const allPhotos = Object.values(imageModules) as string[];

export default function Gallery() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev === allPhotos.length - 1 ? 0 : prev + 1));
    }, []);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? allPhotos.length - 1 : prev - 1));
    };

    // Auto-play effect
    useEffect(() => {
        if (!isAutoPlaying) return;
        const interval = setInterval(nextSlide, 5000); // Change image every 5 seconds
        return () => clearInterval(interval);
    }, [isAutoPlaying, nextSlide]);

    return (
        <section id="gallery" className="py-24 px-4 bg-[#faf9f6]">
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="text-left">
                        <span className="text-pink-300 uppercase tracking-[0.3em] text-[10px] font-bold block mb-2">The Journey</span>
                        <h2 className="text-5xl md:text-6xl font-serif italic text-gray-800 tracking-tighter">
                            Our Moments
                        </h2>
                    </div>

                    {/* Add More Button linking to Google Photos */}
                    <a
                        href="https://photos.app.goo.gl/SgLJ911EaUWJ3mUx6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 px-6 py-3 bg-white border border-gray-100 rounded-full shadow-neu-sm hover:shadow-neu transition-all duration-500 text-gray-600 hover:text-pink-500"
                    >
                        <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
                        <span className="text-xs font-bold uppercase tracking-widest">Add Photos</span>
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                </div>

                {/* Main Slider Container */}
                <div
                    className="relative aspect-[4/5] md:aspect-[16/9] w-full rounded-[3rem] overflow-hidden shadow-2xl bg-gray-100 group"
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                >
                    {/* Images with Fade Transition */}
                    {allPhotos.map((photo, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                                index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                            }`}
                        >
                            <img
                                src={photo}
                                alt={`Moment ${index + 1}`}
                                className="w-full h-full object-cover transform scale-105"
                            />
                            {/* Subtle Overlay for contrast */}
                            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />
                        </div>
                    ))}

                    {/* Navigation Arrows */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-gray-900"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-gray-900"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Image Counter Badge */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 px-4 py-1.5 bg-black/20 backdrop-blur-lg rounded-full border border-white/20 text-white/90 text-[10px] font-bold tracking-widest uppercase">
                        {currentIndex + 1} / {allPhotos.length}
                    </div>
                </div>

                {/* Thumbnails Indicator */}
                <div className="flex justify-center gap-2 mt-8">
                    {allPhotos.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`h-1 transition-all duration-500 rounded-full ${
                                index === currentIndex ? 'w-8 bg-pink-400' : 'w-2 bg-gray-200'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}