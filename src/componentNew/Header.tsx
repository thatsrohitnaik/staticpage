import { Heart } from 'lucide-react';
import LoginButton from './LoginButton';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-pink-500" fill="currentColor" />
          <span className="text-xl font-cursive text-gray-700">Bhakti & Rohit</span>
        </div>
        
        {/*<LoginButton />*/}
      </div>
    </header>
  );
}