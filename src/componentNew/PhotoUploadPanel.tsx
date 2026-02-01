import { Camera, ExternalLink, CloudUpload, CheckCircle2, Music } from 'lucide-react';

export default function PhotoUploadSection() {
    // Your actual Google Photos Shared Album Link
    const SHARED_ALBUM_LINK = "https://photos.google.com/share/AF1QipNw1FJvGS2nqkgdMjuXuGDkv4vdYZs4D9sAqo9XydtV-KdQ93jVdyO2lMmTuH-D7A?key=TF9jR3lfWmNlVjJTbGFZWDFnalVqVEJKWVowNWlB";

    return (
        <section className="py-20 px-4 bg-white/50" id="photo-upload">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-light text-gray-700 italic mb-4">Capture the Magic</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        A wedding is best seen through the eyes of the ones we love.
                        Help us preserve these memories by sharing your favorite shots from the day.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* LEFT: Instruction & Info Card */}
                    <div className="p-10 rounded-[2.5rem] bg-white shadow-neu border border-white">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 bg-purple-50 rounded-2xl shadow-inner">
                                <Camera className="w-8 h-8 text-purple-500" />
                            </div>
                            <h3 className="text-3xl font-bold text-gray-800 tracking-tight">Wedding Gallery</h3>
                        </div>

                        <div className="space-y-6 mb-10">
                            <div className="flex items-start gap-4 group">
                                <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0 shadow-lg">1</div>
                                <div>
                                    <p className="text-gray-700 font-semibold">Open the Album</p>
                                    <p className="text-gray-500 text-sm">Click the big purple button to go to our Google Photos album.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group">
                                <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0 shadow-lg">2</div>
                                <div>
                                    <p className="text-gray-700 font-semibold flex items-center gap-2">
                                        Tap the "Add" Icon
                                        <span className="inline-block bg-gray-50 px-2 py-1 rounded border border-gray-200">
                                            <GooglePhotosAddIcon />
                                        </span>
                                    </p>
                                    <p className="text-gray-500 text-sm">Look for the icon with a plus (+) sign at the top of your screen.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group">
                                <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0 shadow-lg">3</div>
                                <div>
                                    <p className="text-gray-700 font-semibold">Pick & Upload</p>
                                    <p className="text-gray-500 text-sm">Select your best photos or videos and hit "Done".</p>
                                </div>
                            </div>
                        </div>

                        <a
                            href={SHARED_ALBUM_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-3 w-full py-5 bg-purple-600 text-white font-bold rounded-2xl
                            shadow-[0_10px_20px_rgba(147,51,234,0.3)] hover:bg-purple-700 hover:shadow-purple-200/50 transition-all active:scale-95"
                        >
                            <ExternalLink className="w-5 h-5" />
                            Open Google Photos
                        </a>
                    </div>

                    {/* RIGHT: Visual CTA & Fun Note */}
                    <div className="flex flex-col gap-8">
                        <div className="relative p-12 rounded-[2.5rem] bg-purple-50 shadow-neu overflow-hidden flex flex-col items-center text-center">
                            {/* Decorative Background Element */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-200/30 rounded-full blur-3xl"></div>

                            <div className="w-24 h-24 bg-white rounded-[2rem] shadow-neu mb-8 flex items-center justify-center relative z-10">
                                <CloudUpload className="w-12 h-12 text-purple-400" />
                            </div>

                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Share Your Memories</h3>
                            <p className="text-gray-600 italic leading-relaxed mb-6">
                                "Help us capture the magic of Rohit & Bhakti's wedding! Every photo tells a part of our story we might have missed."
                            </p>

                            <div className="px-6 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-purple-100 flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-purple-500" />
                                <span className="text-[11px] text-purple-600 uppercase font-black tracking-widest">Safe & Private Album</span>
                            </div>
                        </div>

                        {/* Fun Tip Card */}
                        <div className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm flex items-start gap-4 italic text-gray-500 text-sm">
                            <Music className="w-5 h-5 text-purple-300 shrink-0" />
                            <p>Pro tip: Candid shots from the dance floor are our favorite! Don't worry about being perfect—just be there with us.</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

// Optimized helper for the custom icon
const GooglePhotosAddIcon = () => (
    <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-6 inline-block text-gray-600"
    >
        <path
            d="M19 13V19C19 20.1046 18.1046 21 17 21H5C3.89543 21 3 20.1046 3 19V7C3 5.89543 3.89543 5 5 5H11"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M17 21L12.5 15.5L9 20L6.5 17L3 21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M18 3V9M15 6H21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);