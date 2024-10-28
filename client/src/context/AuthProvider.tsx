import React, { createContext, useContext, useEffect, useState } from 'react';

type AuthContextType = {
  isLoggedIn: boolean;
  login: (token: string, currentUser: User) => void;
  logout: () => void;
  token: string | null;
  authenticatedUser: User | null;
};

interface AuthContextProps {
  children: React.ReactNode;
}

interface User {
  id: number;
  name: string;
  email: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [authenticatedUser, setAuthenticatedUser] = useState<User | null>(
    localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null
  );

  const isLoggedIn = !!token;

  const login = (newToken: string, currentUser: User) => {
    setToken(newToken);
    setAuthenticatedUser(currentUser);
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(currentUser));
  };

  const logout = () => {
    setToken(null);
    setAuthenticatedUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken) setToken(storedToken);
    if (storedUser) setAuthenticatedUser(JSON.parse(storedUser));
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, token, authenticatedUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
