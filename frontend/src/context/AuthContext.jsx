import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const API_BASE_URL = 'http://127.0.0.1:8080/api';

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for existing session
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedAuth));
    }
    setLoading(false);
  }, []);

  const checkServer = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      const data = await response.json();
      if (data.database !== 'connected') {
        return { online: true, db: false, message: 'Server is up, but Database connection failed.' };
      }
      return { online: true, db: true };
    } catch (error) {
      return { online: false, message: 'HireNova API server is not running. Please start the backend on port 8080.' };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (data.success) {
        setIsAuthenticated(true);
        setUser(data.user);
        localStorage.setItem('auth', JSON.stringify(data.user));
        return { success: true };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      const serverStatus = await checkServer();
      return { success: false, error: serverStatus.message || 'Server connection failed' };
    }
  };

  const signup = async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      const data = await response.json();
      if (data.success) {
        return { success: true };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      const serverStatus = await checkServer();
      return { success: false, error: serverStatus.message || 'Server connection failed' };
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('auth');
  };

  const updateUser = (newUserData) => {
    const updated = { ...user, ...newUserData };
    setUser(updated);
    localStorage.setItem('auth', JSON.stringify(updated));
  };

  const value = {
    isAuthenticated,
    user,
    login,
    signup,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
