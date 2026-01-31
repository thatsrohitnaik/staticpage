import { Heart } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="py-12 px-4">
            <div className="max-w-4xl mx-auto text-center">
                <div className="inline-block p-4 rounded-full shadow-neu mb-4">
                    <Heart className="w-8 h-8 text-pink-300" fill="currentColor" />
                </div>
                <p className="text-gray-600 mb-2">
                    Cheers to celebrating together soon.
                </p>
                <p className="text-gray-500 text-sm">
                    For questions, contact us at rohit24naik@gmail.com
                </p>
                <div className="mt-8 text-gray-400 text-sm">
                    © 2026 Bhakti & Rohit
                </div>
            </div>
        </footer>
    );
}
