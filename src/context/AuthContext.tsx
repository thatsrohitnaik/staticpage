import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the user type
interface User {
  id: string;
  name: string;
  email: string;
  picture: string;
}

// Define the context type
interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check for existing token and user data on mount
  useEffect(() => {
    // Check for token in URL hash (after redirect)
    const hash = window.location.hash;
    if (hash) {
      const token = new URLSearchParams(hash.replace('#', '?')).get('access_token');
      if (token) {
        setAccessToken(token);
        // Remove the hash from the URL
        window.history.replaceState({}, document.title, window.location.pathname);
        
        // Fetch user info with the token
        fetchUserInfo(token);
      } else {
        setIsLoading(false);
      }
    } else {
      // Check for token in localStorage
      const storedToken = localStorage.getItem('google_access_token');
      const storedUser = localStorage.getItem('google_user');
      
      if (storedToken && storedUser) {
        setAccessToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
      
      setIsLoading(false);
    }
  }, []);

  // Fetch user info from Google
  const fetchUserInfo = async (token: string) => {
    try {
      const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch user info');
      }
      
      const userData = await response.json();
      
      const user = {
        id: userData.sub,
        name: userData.name,
        email: userData.email,
        picture: userData.picture
      };
      
      setUser(user);
      
      // Store in localStorage for persistence
      localStorage.setItem('google_access_token', token);
      localStorage.setItem('google_user', JSON.stringify(user));
    } catch (error) {
      console.error('Error fetching user info:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Login function
  const login = () => {
    const clientID = '490487092886-ilkc421u07su95v0f849dblk0hts15n9.apps.googleusercontent.com';
    const redirectUri = 'https://thatsrohitnaik.github.io/staticpage/dist/index.html';
    // Include profile, email, YouTube, and Google Photos scopes
    const scope = 'https://www.googleapis.com/auth/youtube.force-ssl email profile https://www.googleapis.com/auth/photoslibrary.appendonly https://www.googleapis.com/auth/photoslibrary.readonly';

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientID}&redirect_uri=${redirectUri}&response_type=token&scope=${scope}`;
    window.location.href = authUrl;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem('google_access_token');
    localStorage.removeItem('google_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}