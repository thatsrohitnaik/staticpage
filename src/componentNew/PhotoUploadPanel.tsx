import { useState } from 'react';
import { Camera, X, ExternalLink, Image as ImageIcon, CheckCircle2, CloudUpload } from 'lucide-react';

export default function PhotoUploadPanel() {
    const [isOpen, setIsOpen] = useState(false);

    // Your actual Google Photos Shared Album Link
    const SHARED_ALBUM_LINK = "https://photos.google.com/share/AF1QipNw1FJvGS2nqkgdMjuXuGDkv4vdYZs4D9sAqo9XydtV-KdQ93jVdyO2lMmTuH-D7A?key=TF9jR3lfWmNlVjJTbGFZWDFnalVqVEJKWVowNWlB";

    return (
        <>
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-16 right-8 z-50 p-4 rounded-full transition-all text-purple-600 hover:scale-110
                    bg-gray-100 border border-gray-200
                    shadow-[5px_5px_10px_rgba(0,0,0,0.1),-5px_-5px_10px_rgba(255,255,255,0.8)]"
                >
                    <Camera className="w-6 h-6" />
                </button>
            )}

            {isOpen && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-md">
                    <div className="bg-gray-50 rounded-[2.5rem] max-w-md w-full overflow-hidden flex flex-col border border-white shadow-2xl">

                        {/* Header */}
                        <div className="p-6 flex items-center justify-between border-b border-gray-100 bg-white">
                            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                <Camera className="w-5 h-5 text-purple-500" />
                                Wedding Gallery
                            </h2>
                            <button onClick={() => setIsOpen(false)}
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400
                                bg-gray-100 border border-gray-200 hover:text-red-500 transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Content Section */}
                        <div className="p-8 overflow-y-auto">
                            <div className="text-center mb-8">
                                <div className="w-20 h-20 bg-purple-50 rounded-3xl mx-auto mb-4 flex items-center justify-center
                                shadow-[inset_4px_4px_8px_rgba(0,0,0,0.05),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]">
                                    <CloudUpload className="w-10 h-10 text-purple-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800">Share Your Memories</h3>
                                <p className="text-gray-600 mt-2 italic text-sm">Help us capture the magic of Rohit & Bhakti's wedding!</p>
                            </div>

                            {/* Easy Steps for Seniors */}
                            <div className="space-y-4 mb-8">
                                <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                    <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">1</div>
                                    <p className="text-gray-700 font-medium text-sm">Tap the <b>"Open Google Photos"</b> button below.</p>
                                </div>

                                <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                    <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">2</div>
                                    <div className="text-sm text-gray-700">
                                        Look for the <b>Add Photos</b> icon <span className="inline-block bg-gray-100 px-2 py-0.5 rounded border border-gray-300"><GooglePhotosAddIcon/></span> at the top of the album.
                                    </div>
                                </div>



                                <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                    <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">3</div>
                                    <p className="text-gray-700 font-medium text-sm">Choose your photos/videos and tap <b>"Add"</b> or <b>"Done"</b>.</p>
                                </div>


                            </div>

                            {/* CTA Button */}
                            <a
                                href={SHARED_ALBUM_LINK}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-3 w-full py-5 bg-purple-600 text-white font-bold rounded-2xl
                                shadow-[0_10px_20px_rgba(147,51,234,0.3)] hover:bg-purple-700 transition-all active:scale-95"
                            >
                                <ExternalLink className="w-5 h-5" />
                                Open Google Photos
                            </a>

                            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                                <p className="text-center text-[10px] text-blue-500 uppercase font-bold tracking-widest flex items-center justify-center gap-2">
                                    <CheckCircle2 className="w-3 h-3" />
                                    Safe & Private Album
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

const GooglePhotosAddIcon = () => (
    <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-12 h-8"
    >
        {/* Outer Frame */}
        <path
            d="M19 13V19C19 20.1046 18.1046 21 17 21H5C3.89543 21 3 20.1046 3 19V7C3 5.89543 3.89543 5 5 5H11"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        {/* Mountains / Photo Detail */}
        <path
            d="M17 21L12.5 15.5L9 20L6.5 17L3 21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        {/* The Plus Symbol */}
        <path
            d="M18 3V9M15 6H21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);