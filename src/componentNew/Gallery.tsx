export default function Gallery() {
    const photos = [
        'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1024968/pexels-photo-1024968.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1444424/pexels-photo-1444424.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?auto=compress&cs=tinysrgb&w=800'
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
