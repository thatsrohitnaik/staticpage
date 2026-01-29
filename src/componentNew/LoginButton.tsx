import { useState } from 'react';
import { LogIn, LogOut, User, ChevronDown, ChevronUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginButton() {
  const { user, isAuthenticated, isLoading, login, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-700 animate-pulse">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (isAuthenticated && user) {
    return (
      <div className="relative">
        <button
          onClick={toggleMenu}
          className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-full transition-colors"
        >
          <img
            src={user.picture}
            alt={user.name}
            className="w-8 h-8 rounded-full border-2 border-blue-500"
          />
          <span className="hidden md:inline">{user.name}</span>
          {isMenuOpen ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50">
            <div className="px-4 py-2 text-sm text-gray-300 border-b border-gray-700">
              <div className="font-medium">{user.name}</div>
              <div className="text-gray-400 truncate">{user.email}</div>
            </div>
            <button
              onClick={() => {
                logout();
                setIsMenuOpen(false);
              }}
              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-white hover:bg-gray-700"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={login}
      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
    >
      <LogIn className="w-4 h-4" />
      <span>Sign in with Google</span>
    </button>
  );
}