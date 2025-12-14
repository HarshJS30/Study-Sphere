import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useLocation } from "wouter";

interface User {
  name: string;
  email: string;
  collegeId?: string;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  login: (name: string, email: string) => void;
  signup: (name: string, email: string, collegeId: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Simulate checking for a session
    const storedUser = localStorage.getItem("studysync_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (name: string, email: string) => {
    // Simulate API call
    const mockUser = {
      name: name || "Alex Johnson", // Default if just email provided
      email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name || "Alex"}`,
    };
    setUser(mockUser);
    localStorage.setItem("studysync_user", JSON.stringify(mockUser));
    setLocation("/dashboard");
  };

  const signup = (name: string, email: string, collegeId: string) => {
    const mockUser = {
      name,
      email,
      collegeId,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
    };
    setUser(mockUser);
    localStorage.setItem("studysync_user", JSON.stringify(mockUser));
    setLocation("/dashboard");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("studysync_user");
    setLocation("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
