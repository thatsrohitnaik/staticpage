import beach from '../assets/images/beach.png'
import food from '../assets/images/food.png'
import silk from '../assets/images/silk.png'

export default function Gallery() {
    const photos = [
        beach,
        food,
        silk
    ];

    return (
        <section className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-5xl font-light text-center mb-16 text-gray-700">
                    Our Moments
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {photos.map((photo, index) => (
                        <div key={index} className="aspect-square rounded-3xl shadow-neu overflow-hidden">
                            <img
                                src={photo}
                                alt={`Wedding moment ${index + 1}`}
                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
