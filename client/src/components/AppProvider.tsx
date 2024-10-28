import React, { createContext, useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, useNavigate, NavigateFunction } from "react-router-dom";
import axios, { AxiosInstance } from "axios";

// Context Types
interface AppContextType {
  navigate: NavigateFunction;
  apiClient: AxiosInstance;
  theme: string;
  toggleTheme: () => void;
  user: User | null;
  setUser: (user: User | null) => void;
  showModal: (content: React.ReactNode) => void;
  hideModal: () => void;
}

interface User {
  id: number;
  name: string;
  email: string;
}

// Default values for context
const AppContext = createContext<AppContextType | null>(null);

// Custom Hook to access AppContext
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within an AppProvider");
  return context;
};

// AppProvider Component
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  
  // API Client
  const apiClient = axios.create({ baseURL: "https://api.example.com" });

  // Theme State
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => setTheme(prev => (prev === "light" ? "dark" : "light"));

  // Auth State
  const [user, setUser] = useState<User | null>(null);

  // Modal State
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);
  const showModal = (content: React.ReactNode) => setModalContent(content);
  const hideModal = () => setModalContent(null);

  // Set global navigate function in context
  useEffect(() => {
    navigate("/");
  }, [navigate]);

  const contextValue: AppContextType = {
    navigate,
    apiClient,
    theme,
    toggleTheme,
    user,
    setUser,
    showModal,
    hideModal,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
      {modalContent && <Modal>{modalContent}</Modal>}
    </AppContext.Provider>
  );
};

// Modal component 
const Modal: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 1000, background: "white", padding: "20px" }}>
    {children}
    <button onClick={() => useAppContext().hideModal()}>Close</button>
  </div>
);
