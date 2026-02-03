import { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Plus } from 'lucide-react';

// Use Vite's glob import to get all images from the folder
// @ts-ignore
const imageModules = import.meta.glob('../assets/images/templerun/*.{png,jpg,jpeg,webp}', {
    eager: true,
    import: 'default',
});

// Convert the object into an array of strings (the resolved URLs)
const allPhotos = Object.values(imageModules) as string[];

export default function Gallery() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [showAll, setShowAll] = useState(false);

    // Show only 6 images initially, or all if 'showAll' is true
    const displayedPhotos = showAll ? allPhotos : allPhotos.slice(0, 6);

    const openLightbox = (index: number) => setActiveIndex(index);
    const closeLightbox = () => setActiveIndex(null);

    const showNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveIndex((prev) => (prev !== null && prev < allPhotos.length - 1 ? prev + 1 : 0));
    };

    const showPrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : allPhotos.length - 1));
    };

    return (
        <section id="gallery" className="py-20 px-4 bg-gray-50/50">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-5xl font-light text-center mb-16 text-gray-700 italic">
                    Our Moments
                </h2>

                {/* Grid Display */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {displayedPhotos.map((photo, index) => (
                        <div
                            key={index}
                            onClick={() => openLightbox(index)}
                            className="aspect-square rounded-3xl shadow-md overflow-hidden cursor-pointer group bg-gray-200"
                        >
                            <img
                                src={photo}
                                loading="lazy" // Native Browser Lazy Loading
                                alt={`Temple run moment ${index + 1}`}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                            />
                        </div>
                    ))}

                    {/* "View More" Card - Only shows if not showing all and there are more than 6 pics */}
                    {!showAll && allPhotos.length > 6 && (
                        <div
                            onClick={() => setShowAll(true)}
                            className="aspect-square rounded-3xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-white hover:border-gray-400 transition-all group"
                        >
                            <div className="p-4 bg-gray-100 rounded-full group-hover:scale-110 transition-transform">
                                <Plus className="w-8 h-8 text-gray-500" />
                            </div>
                            <span className="mt-4 text-gray-600 font-medium">View {allPhotos.length - 6} More</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Lightbox Slider Overlay */}
            {activeIndex !== null && (
                <div
                    className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
                    onClick={closeLightbox}
                >
                    <button onClick={closeLightbox} className="absolute top-8 right-8 text-white/70 hover:text-white z-10">
                        <X className="w-10 h-10" />
                    </button>

                    <button onClick={showPrev} className="absolute left-4 p-3 rounded-full bg-white/5 text-white hover:bg-white/20">
                        <ChevronLeft className="w-10 h-10" />
                    </button>

                    <button onClick={showNext} className="absolute right-4 p-3 rounded-full bg-white/5 text-white hover:bg-white/20">
                        <ChevronRight className="w-10 h-10" />
                    </button>

                    <div className="max-w-5xl w-full h-[85vh] flex items-center justify-center">
                        <img
                            key={activeIndex} // Force re-animation on change
                            src={allPhotos[activeIndex]}
                            alt="Expanded moment"
                            className="max-w-full max-h-full object-contain shadow-2xl animate-in fade-in zoom-in-95 duration-300"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>

                    <div className="absolute bottom-8 px-6 py-2 bg-white/5 rounded-full text-white/60 text-sm">
                        {activeIndex + 1} / {allPhotos.length}
                    </div>
                </div>
            )}
        </section>
    );
}