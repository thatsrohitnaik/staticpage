import { ArrowLeft, Scale, ShieldAlert, UserCheck, HelpCircle } from 'lucide-react';

export default function TermsOfService() {
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

                {/* Main Terms Card */}
                <div className="bg-gray-100 rounded-[2.5rem] p-8 md:p-12 border border-white
                shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff]">

                    <div className="flex items-center gap-4 mb-10">
                        <div className="p-4 rounded-2xl bg-gray-100 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05),inset_-2px_-2px_5px_rgba(255,255,255,0.8)]">
                            <Scale className="w-8 h-8 text-purple-500" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Terms of Service</h1>
                            <p className="text-gray-500 text-sm font-medium">Effective Date: February 2, 2026</p>
                        </div>
                    </div>

                    <div className="space-y-10 text-gray-600 leading-relaxed">

                        {/* Section 1: Acceptance */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                                <UserCheck className="w-5 h-5 text-green-400" /> 1. Acceptance of Terms
                            </h2>
                            <p>
                                By accessing this website for <strong>Bhakti & Rohit's Wedding</strong>,
                                you agree to use the site in a respectful and celebratory manner. This site is
                                intended for invited guests only.
                            </p>
                        </section>

                        {/* Section 2: Use of Features */}
                        <section className="p-6 rounded-3xl bg-white/50 border border-white shadow-sm">
                            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                                <ShieldAlert className="w-5 h-5 text-orange-400" /> 2. Content Guidelines
                            </h2>
                            <p className="mb-4">When using the Jukebox, Blessings, or Photo features:</p>
                            <ul className="list-disc list-inside space-y-2 ml-2 text-sm font-medium">
                                <li>Be kind and celebratory in your messages.</li>
                                <li>Only upload photos that are appropriate for a family wedding event.</li>
                                <li>Avoid adding offensive or unrelated songs to the Spotify playlist.</li>
                            </ul>
                        </section>

                        {/* Section 3: Google Login */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-800 mb-3">3. Account & Authentication</h2>
                            <p>
                                Certain features require signing in via Google. You are responsible for maintaining
                                the security of your own Google account. We do not have access to your Google
                                password or any data other than your basic profile info.
                            </p>
                        </section>

                        {/* Section 4: Limitation of Liability */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-800 mb-3">4. Disclaimer</h2>
                            <p>
                                This website is provided "as is" for information and entertainment purposes.
                                While we strive for 100% uptime, we are not responsible for technical glitches
                                or the loss of digital well-wishes.
                            </p>
                        </section>

                        {/* Section 5: Changes to Site */}
                        <section className="p-6 rounded-3xl bg-gray-100 shadow-[inset_4px_4px_8px_rgba(0,0,0,0.05)] border border-gray-200/50">
                            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                                <HelpCircle className="w-5 h-5 text-blue-400" /> 5. Questions
                            </h2>
                            <p className="text-sm">
                                If you have questions about the RSVP, venue, or site features, please contact
                                the couple directly. We can't wait to celebrate with you!
                            </p>
                        </section>

                        <div className="pt-8 border-t border-gray-200 text-center">
                            <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">
                                See you at the wedding!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}