import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Letter() {
    const { user, isAuthenticated } = useAuth();
    const [urlName, setUrlName] = useState<string | null>("F Friends & Family");

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const name = params.get('guest');
        if (name) {
            setUrlName(decodeURIComponent(name));
        }
    }, []);

    // Priority: 1. Logged in User, 2. URL Parameter, 3. Empty (original behavior)
    const displayName = isAuthenticated && user?.name
        ? user.name
        : urlName;

    return (
        <section className="py-20 px-4 bg-gradient-to-b from-rose-50 to-pink-50">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <div className="bg-gradient-to-r from-rose-300 via-pink-300 to-rose-300 px-8 py-12 text-center">
                        <Heart className="w-12 h-12 text-white mx-auto mb-4" />
                        <h2 className="text-4xl font-bold text-white mb-2">A Letter from Our Hearts</h2>
                        <p className="text-rose-100">To someone special like you</p>
                    </div>

                    <div className="p-12 space-y-8">
                        {/* Display name if either logged in or in URL */}
                        {displayName && (
                            <p className="text-xl font-semibold text-gray-700 italic">
                                Dear {displayName},
                            </p>
                        )}

                        <div className="prose prose-lg max-w-none">
                            <p className="text-gray-700 leading-relaxed text-lg font-light">
                                As we begin our beautiful journey together, we are so excited to celebrate with the people we love! Your presence and blessings would add so much joy to our wedding day, we would love to see you there.
                            </p>
                        </div>

                        <div className="flex justify-center gap-2 text-rose-300">
                            <Heart className="w-5 h-5 fill-current" />
                            <Heart className="w-5 h-5 fill-current" />
                            <Heart className="w-5 h-5 fill-current" />
                        </div>

                        <div className="text-center pt-6 border-t border-gray-200">
                            <p className="text-gray-600">
                                With all our love and warmest regards,
                            </p>
                            <p className="text-gray-700 font-semibold mt-4">
                                The Happy Couple
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}