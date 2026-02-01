import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Music } from 'lucide-react';

export default function BackgroundMusic() {
    const musicElementRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.1);
    const [showHint, setShowHint] = useState(false); // New state for the hint

    const AUDIO_URL = "https://www.bensound.com/bensound-music/bensound-love.mp3";

    useEffect(() => {
        const audio = musicElementRef.current;
        if (!audio) return;

        audio.volume = volume;

        const attemptPlay = async () => {
            try {
                await audio.play();
                setIsPlaying(true);
                setShowHint(false);
            } catch (error) {
                // This is where your console message comes from
                console.warn("Autoplay blocked: Waiting for user interaction.");
                setIsPlaying(false);
                setShowHint(false); // Show the hint to the user
            }
        };

        attemptPlay();
    }, []);

    const handleToggle = () => {
        const audio = musicElementRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
            setShowHint(false); // Hide hint once they start the music
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="fixed bottom-8 left-8 z-[100] flex items-center gap-4">
            <audio ref={musicElementRef} src={AUDIO_URL} loop preload="auto" />

            <div className="relative">
                {/* The Hint Tooltip */}
                {showHint && (
                    <div className="absolute bottom-full left-0 mb-4 w-32 p-2 bg-white rounded-xl text-[10px] font-bold text-blue-500 text-center shadow-lg animate-bounce border border-blue-100">
                        Tap to play music! 🎵
                        <div className="absolute top-full left-6 w-2 h-2 bg-white border-b border-r border-blue-100 rotate-45 -translate-y-1"></div>
                    </div>
                )}

                {/* Play/Pause Button */}
                <button
                    onClick={handleToggle}
                    className={`flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300
          bg-gray-100 border border-white/60 active:scale-90
          ${isPlaying
                        ? 'shadow-[inset_4px_4px_8px_rgba(0,0,0,0.05),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] text-blue-500'
                        : 'shadow-[6px_6px_12px_rgba(0,0,0,0.1),-6px_-6px_12px_rgba(255,255,255,0.9)] text-gray-400'
                    }`}
                >
                    {isPlaying ? <Pause className="w-6 h-6 animate-pulse" /> : <Play className="w-6 h-6 ml-0.5 text-blue-400" />}
                </button>
            </div>

            {/* Volume Slider */}
            <div className="hidden group-hover:flex flex-col gap-2 p-3 bg-gray-100 rounded-2xl border border-white/60 shadow-lg transition-all">
                <input
                    type="range" min="0" max="1" step="0.01" value={volume}
                    onChange={(e) => {
                        const v = parseFloat(e.target.value);
                        setVolume(v);
                        if (musicElementRef.current) musicElementRef.current.volume = v;
                    }}
                    className="w-20 h-1 bg-gray-300 rounded-full appearance-none cursor-pointer accent-blue-500"
                />
            </div>
        </div>
    );
}