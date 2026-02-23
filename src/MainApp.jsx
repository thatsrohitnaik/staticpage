import {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Added this
import Confetti from 'react-confetti';
import Hero from './componentNew/Hero';
import Countdown from './componentNew/Countdown';
import Letter from './componentNew/Letter';
import PhotoUploadPanel from './componentNew/PhotoUploadPanel';
import Header from './componentNew/Header';
import { PlaylistProvider } from './context/PlaylistContext';
import { AuthProvider } from './context/AuthContext';
import BackgroundMusic from "./componentNew/BackgroundMusic.js";
import MusicSection from "./componentNew/MusicSection.js";
import BlessingsSection from "./componentNew/BlessingsSection.js";
import GuestGuide from "./componentNew/GuestGuide.js";
import { PhotoScrollButton } from "./componentNew/PhotoScrollButton.js";
import PrivacyPolicy from "./componentNew/PrivacyPolicy.js";
import TermsOfService from "./componentNew/TermsOfService.js";
import Details from './componentNew/Details';
import Footer from './componentNew/Footer';
import Gallery from "./componentNew/Gallery.js";

function App() {
    const [windowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        // 1. Get the 'scroll' parameter from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const sectionId = urlParams.get('scroll');

        if (sectionId) {
            // 2. Add a small delay to ensure the DOM is fully rendered
            // This is crucial if your sections are dynamic or large
            const timeoutId = setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, 500); // 500ms delay is usually safe

            return () => clearTimeout(timeoutId);
        }
    }, []);

    // We create a "MainContent" component to keep the App logic clean
    const MainWeddingPage = () => (
        <>
            <Confetti
                width={windowSize.width}
                height={windowSize.height}
                numberOfPieces={150}
                recycle={true}
            />
            <Header />
            <BackgroundMusic />
            <Hero />
            <Countdown />
            <Letter />
            <BlessingsSection />
            <PhotoUploadPanel />
            <MusicSection />
            <GuestGuide />
            <Details />
            <Gallery/>
            <PhotoScrollButton />
            <Footer />

            {/* Tiny Legal Links in Footer for Google's Crawlers */}
            {/*<div className="pb-10 bg-gray-50 text-center">*/}
            {/*    <div className="flex justify-center gap-6 text-[10px] uppercase tracking-widest font-bold text-gray-400">*/}
            {/*        <Link to="/staticpage/dist/privacy" className="hover:text-pink-500 transition-colors">Privacy Policy</Link>*/}
            {/*        <Link to="/staticpage/dist/terms" className="hover:text-pink-500 transition-colors">Terms of Service</Link>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>
    );

    return (
        <AuthProvider>
            <PlaylistProvider>
                <Router> {/* Wrap everything in a Router */}
                    <div className="min-h-screen">
                        <Routes>
                            {/* Main Wedding Site */}
                            <Route path="staticpage/dist/" element={<MainWeddingPage />} />
                            <Route path="/" element={<MainWeddingPage />} />
                            {/* Legal Pages (Google Cloud Console links) */}
                            <Route path="staticpage/dist/privacy" element={<PrivacyPolicy />} />
                            <Route path="staticpage/dist/terms" element={<TermsOfService />} />
                            <Route path="*" element={<MainWeddingPage />} />
                        </Routes>
                    </div>
                </Router>
            </PlaylistProvider>
        </AuthProvider>
    );
}

export default App;