import { useState } from 'react';
import Confetti from 'react-confetti';
import Hero from './componentNew/Hero';
import Countdown from './componentNew/Countdown';
import Letter from './componentNew/Letter';
import Gallery from './componentNew/Gallery';
// import RSVP from './componentNew/RSVP';
import Details from './componentNew/Details';
import Footer from './componentNew/Footer';
import MusicPlayer from './componentNew/MusicPlayer';
// import SongRequestForm from './componentNew/SongRequestForm';
import YouTubeMusicPanel from './componentNew/YouTubeMusicPanel';
import Header from './componentNew/Header';
import { PlaylistProvider } from './context/PlaylistContext';
import { AuthProvider } from './context/AuthContext';

function App() {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    return (
        <AuthProvider>
            <PlaylistProvider>
                <div className="min-h-screen">
                    <Confetti
                        width={windowSize.width}
                        height={windowSize.height}
                        numberOfPieces={150}
                        recycle={true}
                        tweenDuration={1000}
                    />
                    <Header />
                    <MusicPlayer />
                    {/*<SongRequestForm />*/}
                    <YouTubeMusicPanel />
                    <Hero />
                    <Countdown />
                    <Letter />
                    <Gallery />
                    {/*<RSVP />*/}
                    <Details />
                    <Footer />
                </div>
            </PlaylistProvider>
        </AuthProvider>
    );
}

export default App;
