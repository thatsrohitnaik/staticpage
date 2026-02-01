import {Calendar, Camera, Heart, Music} from 'lucide-react';
import {QuickNavButton} from "./QuickNavProps";

export function PhotoScrollButton() {
    const scrollToPhotos = () => {
        const element = document.getElementById('photo-upload');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            {/* Wedding Details - Top Button */}
            <QuickNavButton
                icon={Calendar}
                targetId="wedding-hero"
                label="Details"
                colorClass="text-blue-500"
                bottomOffset="bottom-80"
            />

            {/* Photo Gallery Button */}
            <QuickNavButton
                icon={Camera}
                targetId="photo-upload"
                label="Photos"
                colorClass="text-purple-600"
                bottomOffset="bottom-64"
            />

            {/* Blessings Button */}
            <QuickNavButton
                icon={Heart}
                targetId="blessings-section"
                label="Wishes"
                colorClass="text-pink-500"
                bottomOffset="bottom-48"
            />

            {/* Spotify/Music Button */}
            <QuickNavButton
                icon={Music}
                targetId="jukebox-section"
                label="Jukebox"
                colorClass="text-[#1DB954]"
                bottomOffset="bottom-32"
            />
        </>
    )
}