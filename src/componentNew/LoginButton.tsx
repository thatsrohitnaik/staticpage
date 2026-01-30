import { useState } from 'react';
import { LogIn, LogOut, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginButton() {
  const { user, isAuthenticated, isLoading, login, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  if (isLoading) {
    return (
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100
      shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05),inset_-2px_-2px_5px_rgba(255,255,255,0.8)]">
          <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
        </div>
    );
  }

  if (isAuthenticated && user) {
    return (
        <div className="relative">
          {/* Profile Button - Neumorphic Convex */}
          <button
              onClick={toggleMenu}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full transition-all active:scale-95
          bg-gray-100 border border-gray-200/50
          shadow-[4px_4px_8px_rgba(0,0,0,0.08),-4px_-4px_8px_rgba(255,255,255,0.9)]
          hover:shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8)]"
          >
            <div className="p-0.5 rounded-full bg-white shadow-[inset_1px_1px_3px_rgba(0,0,0,0.1)]">
              <img
                  src={user.picture}
                  alt={user.name}
                  className="w-7 h-7 rounded-full"
              />
            </div>
            <span className="hidden md:inline text-sm font-semibold text-gray-700">{user.name}</span>
            {isMenuOpen ? (
                <ChevronUp className="w-4 h-4 text-gray-400" />
            ) : (
                <ChevronDown className="w-4 h-4 text-gray-400" />
            )}
          </button>

          {/* Dropdown Menu - Neumorphic Elevated Panel */}
          {isMenuOpen && (
              <div className="absolute right-0 mt-4 w-56 p-2 bg-gray-100 rounded-2xl z-50 border border-white
          shadow-[10px_10px_20px_rgba(0,0,0,0.1),-10px_-10px_20px_rgba(255,255,255,0.8)]">
                <div className="px-4 py-3 mb-2 rounded-xl bg-gray-50/50 border border-gray-200/50
            shadow-[inset_2px_2px_5px_rgba(0,0,0,0.03),inset_-2px_-2px_5px_rgba(255,255,255,0.7)]">
                  <div className="font-bold text-gray-800 text-sm truncate">{user.name}</div>
                  <div className="text-gray-500 text-xs truncate">{user.email}</div>
                </div>

                <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-2 px-4 py-2.5 text-sm font-medium text-red-500
              rounded-xl transition-all hover:bg-red-50 active:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.05)]"
                >
                  <LogOut className="w-4 h-4" />
                  Sign out
                </button>
              </div>
          )}
        </div>
    );
  }

  {/* Sign In Button - Neumorphic Blue Convex */}
  return (
      <button
          onClick={login}
          className="flex items-center gap-3 px-6 py-2.5 rounded-2xl font-bold text-blue-600 transition-all
      bg-gray-100 border border-gray-200/60 active:scale-95
      shadow-[6px_6px_12px_rgba(0,0,0,0.08),-6px_-6px_12px_rgba(255,255,255,0.9)]
      hover:shadow-[3px_3px_6px_rgba(0,0,0,0.05),-3px_-3px_6px_rgba(255,255,255,0.8)]"
      >
        <div className="p-1.5 rounded-lg bg-blue-50 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.05)]">
          <LogIn className="w-4 h-4 text-blue-500" />
        </div>
        <span>Sign in with Google</span>
      </button>
  );
}