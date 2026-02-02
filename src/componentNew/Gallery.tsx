import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import us from '../assets/images/us.jpeg';
import patrika from "../assets/images/patrika.png";

export default function Gallery() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const photos = [us, patrika];

    const openLightbox = (index: number) => setActiveIndex(index);
    const closeLightbox = () => setActiveIndex(null);

    const showNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveIndex((prev) => (prev !== null && prev < photos.length - 1 ? prev + 1 : 0));
    };

    const showPrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : photos.length - 1));
    };

    return (
        <section id="gallery" className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-5xl font-light text-center mb-16 text-gray-700 italic">
                    Our Moments
                </h2>

                {/* Grid Display */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {photos.map((photo, index) => (
                        <div
                            key={index}
                            onClick={() => openLightbox(index)}
                            className="aspect-square rounded-3xl shadow-neu overflow-hidden cursor-pointer group"
                        >
                            <img
                                src={photo}
                                alt={`Wedding moment ${index + 1}`}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox Slider Overlay */}
            {activeIndex !== null && (
                <div
                    className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300"
                    onClick={closeLightbox}
                >
                    {/* Close Button */}
                    <button
                        onClick={closeLightbox}
                        className="absolute top-8 right-8 text-white/70 hover:text-white p-2 bg-white/10 rounded-full transition-colors"
                    >
                        <X className="w-8 h-8" />
                    </button>

                    {/* Navigation Buttons */}
                    <button
                        onClick={showPrev}
                        className="absolute left-4 md:left-8 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all active:scale-90"
                    >
                        <ChevronLeft className="w-8 h-8" />
                    </button>

                    <button
                        onClick={showNext}
                        className="absolute right-4 md:right-8 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all active:scale-90"
                    >
                        <ChevronRight className="w-8 h-8" />
                    </button>

                    {/* Main Expanded Image */}
                    <div className="max-w-5xl w-full h-[80vh] flex items-center justify-center overflow-hidden">
                        <img
                            src={photos[activeIndex]}
                            alt="Expanded moment"
                            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
                            onClick={(e) => e.stopPropagation()} // Prevents closing when clicking the image itself
                        />
                    </div>

                    {/* Image Counter Badge */}
                    <div className="absolute bottom-8 px-6 py-2 bg-white/10 rounded-full text-white/80 text-sm font-medium">
                        {activeIndex + 1} / {photos.length}
                    </div>
                </div>
            )}
        </section>
    );
}