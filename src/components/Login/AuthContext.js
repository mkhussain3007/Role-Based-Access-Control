// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedAuthState = localStorage.getItem('isAuthenticated');
    return savedAuthState === 'true'; // Convert string to boolean
  });

  const [timeoutId, setTimeoutId] = useState(null);

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated'); // Clear state
    clearTimeout(timeoutId);
  };

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    startAutoLogoutTimer();
  };

  const startAutoLogoutTimer = () => {
    clearTimeout(timeoutId); // Clear any existing timer
    const id = setTimeout(logout, 5 * 60 * 1000); // 5 minutes
    setTimeoutId(id);
  };

  const resetAutoLogoutTimer = () => {
    if (isAuthenticated) {
      startAutoLogoutTimer();
    }
  };

  useEffect(() => {
    // Attach event listeners to reset the timer on user interaction
    const events = ['mousemove', 'keydown', 'click'];
    events.forEach((event) =>
      window.addEventListener(event, resetAutoLogoutTimer)
    );

    return () => {
      // Cleanup event listeners on unmount
      events.forEach((event) =>
        window.removeEventListener(event, resetAutoLogoutTimer)
      );
    };
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
