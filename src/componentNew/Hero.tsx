import { Heart } from 'lucide-react';

export default function Hero() {
    return (
        <section className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center">
                <div className="mb-8 inline-block p-6 rounded-full shadow-neu">
                    <Heart className="w-16 h-16 text-pink-300" fill="currentColor" />
                </div>

                <h1 className="text-6xl md:text-8xl font-cursive mb-4 text-gray-700 heartbeat">
                    Bhakti & Rohit
                </h1>

                <div className="my-8 h-px w-32 mx-auto bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

                <p className="text-2xl md:text-3xl text-gray-600 mb-8 font-light">
                    Are Getting Married
                </p>

                <div className="inline-block p-8 rounded-3xl shadow-neu">
                    <p className="text-xl text-gray-700 mb-2">Thursday, February 26th, 2026</p>
                    <p className="text-lg text-gray-600">Sala de Gaspar, Miramar</p>
                    <p className="text-lg text-gray-600">12:06 PM</p>
                </div>
            </div>
        </section>
    );
}
