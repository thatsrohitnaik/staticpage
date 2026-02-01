import { ArrowLeft, ShieldCheck, Lock, Eye, Trash2 } from 'lucide-react';

export default function PrivacyPolicy() {
    const handleBack = () => {
        window.history.back();
    };

    return (
        <section className="min-h-screen bg-gray-100 py-12 px-4">
            <div className="max-w-3xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={handleBack}
                    className="mb-8 flex items-center gap-2 text-gray-500 hover:text-pink-500 transition-colors font-medium"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Wedding Site
                </button>

                {/* Main Policy Card */}
                <div className="bg-gray-100 rounded-[2.5rem] p-8 md:p-12 border border-white
                shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff]">

                    <div className="flex items-center gap-4 mb-10">
                        <div className="p-4 rounded-2xl bg-gray-100 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05),inset_-2px_-2px_5px_rgba(255,255,255,0.8)]">
                            <ShieldCheck className="w-8 h-8 text-blue-500" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Privacy Policy</h1>
                            <p className="text-gray-500 text-sm font-medium">Last updated: February 2, 2026</p>
                        </div>
                    </div>

                    <div className="space-y-10 text-gray-600 leading-relaxed">

                        {/* Section 1 */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                                <Eye className="w-5 h-5 text-pink-400" /> 1. Overview
                            </h2>
                            <p>
                                This website is created for the wedding of <strong>Bhakti & Rohit</strong>.
                                We value your privacy and only collect information necessary to make our
                                celebration interactive and memorable for everyone.
                            </p>
                        </section>

                        {/* Section 2 */}
                        <section className="p-6 rounded-3xl bg-white/50 border border-white shadow-sm">
                            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                                <Lock className="w-5 h-5 text-blue-400" /> 2. Data We Collect
                            </h2>
                            <p className="mb-4">When you use our "Sign in with Google" feature, we access:</p>
                            <ul className="list-disc list-inside space-y-2 ml-2 text-sm font-medium">
                                <li>Your <span className="text-gray-800 font-bold">Name</span> (to personalize your letter and messages).</li>
                                <li>Your <span className="text-gray-800 font-bold">Email</span> (to identify votes and messages).</li>
                                <li>Your <span className="text-gray-800 font-bold">Profile Picture</span> (to show who sent a blessing).</li>
                            </ul>
                        </section>

                        {/* Section 3 */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-800 mb-3">3. How We Use Your Data</h2>
                            <p>
                                Your data is strictly used for wedding-related activities: contributing to our
                                Spotify Jukebox, sending us Blessings, and sharing photos. We do not sell or
                                share this data with any third-party marketing services.
                            </p>
                        </section>

                        {/* Section 4 */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-800 mb-3">4. Storage & Security</h2>
                            <p>
                                Messages and votes are securely stored in a private Google Sheet. External
                                platforms like <strong>Spotify</strong> and <strong>Google Photos</strong>
                                handle their own authentication; we never see your passwords for those services.
                            </p>
                        </section>

                        {/* Section 5 */}
                        <section className="p-6 rounded-3xl bg-gray-100 shadow-[inset_4px_4px_8px_rgba(0,0,0,0.05)] border border-gray-200/50">
                            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2 text-red-400">
                                <Trash2 className="w-5 h-5" /> 5. Data Deletion
                            </h2>
                            <p className="text-sm italic">
                                Want your data removed? No problem. Simply reach out to Bhakti or Rohit,
                                and we will manually delete your messages or records from our sheet immediately.
                            </p>
                        </section>

                        <div className="pt-8 border-t border-gray-200 text-center">
                            <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">
                                Created with love for Bhakti & Rohit
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}