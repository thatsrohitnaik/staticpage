import { CheckCircle2, Music } from 'lucide-react';

export default function PhotoUploadSection() {
    const SHARED_ALBUM_LINK = "https://photos.google.com/share/AF1QipNw1FJvGS2nqkgdMjuXuGDkv4vdYZs4D9sAqo9XydtV-KdQ93jVdyO2lMmTuH-D7A?key=TF9jR3lfWmNlVjJTbGFZWDFnalVqVEJKWVowNWlB";

    return (
        <section className="py-20 px-4 bg-white/50" id="photo-upload">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-5xl font-light text-gray-700 italic mb-4">Capture the Magic</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        A wedding is best seen through the eyes of the ones we love.
                        Help us preserve these memories by sharing your favorite shots.
                    </p>
                </div>

                <div className="flex flex-col gap-8 max-w-2xl mx-auto">
                    {/* Primary Action Card */}
                    <a
                        href={SHARED_ALBUM_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group"
                    >
                        <div className="relative p-12 rounded-[2.5rem] bg-purple-50 shadow-neu overflow-hidden flex flex-col items-center text-center transition-transform hover:scale-[1.01] active:scale-[0.99]">
                            {/* Decorative Background Element */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-200/30 rounded-full blur-3xl" />

                            {/* Google "Add Photo Alternate" Icon */}
                            <div className="w-24 h-24 bg-white rounded-[2rem] shadow-neu mb-8 flex items-center justify-center relative z-10 text-purple-400">
                                <AddPhotoAlternateIcon />
                            </div>

                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Share Your Memories</h3>
                            <p className="text-gray-600 italic leading-relaxed mb-8">
                                "Help us capture the magic of Rohit & Bhakti's wedding! Every photo tells a part of our story we might have missed."
                            </p>

                            <div className="px-6 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-purple-100 flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-purple-500" />
                                <span className="text-[11px] text-purple-600 uppercase font-black tracking-widest">Safe & Private Album</span>
                            </div>
                        </div>
                    </a>

                    {/* Fun Tip Card */}
                    <div className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm flex items-start gap-4 italic text-gray-500 text-sm">
                        <Music className="w-5 h-5 text-purple-300 shrink-0" />
                        <p>Pro tip: Candid shots from the dance floor are our favorite! Don't worry about being perfect—just be there with us.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

const AddPhotoAlternateIcon = () => (

    <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#EA33F7"><path d="M480-480ZM180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h365v60H180v600h600v-365h60v365q0 24-18 42t-42 18H180Zm60-162h480L576-474 449-307l-94-124-115 149Zm453-323v-87h-88v-60h88v-88h60v88h87v60h-87v87h-60Z"/></svg>);