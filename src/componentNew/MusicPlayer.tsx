import { useState, useRef, useEffect } from 'react';
import { Music, Pause, Play, Volume2 } from 'lucide-react';

export default function MusicPlayer() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.5);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration);
        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', updateDuration);
        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', updateDuration);
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
        };
    }, []);

    const togglePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
        }
    };

    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = parseFloat(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };

    const formatTime = (time: number) => {
        if (!time || isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
            <audio
                ref={audioRef}
                src="https://assets.mixkit.co/active_storage/musics/8948-d3d5c5b3-43e8-46a8-ad9c-e436baf4404d.mp3"
                loop
            />

            <div className="shadow-neu rounded-full p-6 backdrop-blur-sm bg-gray-100 bg-opacity-80">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={togglePlayPause}
                            className="p-3 rounded-full shadow-neu-inset hover:shadow-neu transition-all duration-300"
                        >
                            {isPlaying ? (
                                <Pause className="w-5 h-5 text-gray-700" />
                            ) : (
                                <Play className="w-5 h-5 text-gray-700" />
                            )}
                        </button>

                        <Music className="w-5 h-5 text-pink-400" />
                    </div>

                    <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600 w-8 text-right">
              {formatTime(currentTime)}
            </span>
                        <input
                            type="range"
                            min="0"
                            max={duration || 0}
                            value={currentTime}
                            onChange={handleProgressChange}
                            className="w-24 h-1 bg-gray-300 rounded-full appearance-none cursor-pointer accent-pink-400"
                        />
                        <span className="text-xs text-gray-600 w-8">
              {formatTime(duration)}
            </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Volume2 className="w-4 h-4 text-gray-600" />
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={volume}
                            onChange={handleVolumeChange}
                            className="w-16 h-1 bg-gray-300 rounded-full appearance-none cursor-pointer accent-pink-400"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
