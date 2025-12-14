import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

interface User {
  name: string;
  email: string;
  collegeId?: string;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, collegeId: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock "Database" using localStorage
const getStoredUsers = () => {
  const users = localStorage.getItem("studysync_users_db");
  return users ? JSON.parse(users) : [];
};

const saveUserToDb = (user: any) => {
  const users = getStoredUsers();
  users.push(user);
  localStorage.setItem("studysync_users_db", JSON.stringify(users));
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Check for active session
    const sessionUser = localStorage.getItem("studysync_active_session");
    if (sessionUser) {
      setUser(JSON.parse(sessionUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const users = getStoredUsers();
    const foundUser = users.find((u: any) => u.email === email && u.password === password);

    if (foundUser) {
      const { password, ...userProfile } = foundUser; // Remove password from session
      setUser(userProfile);
      localStorage.setItem("studysync_active_session", JSON.stringify(userProfile));
      setLocation("/dashboard");
      toast({
        title: "Welcome back!",
        description: "Successfully logged in.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
      });
    }
    setIsLoading(false);
  };

  const signup = async (name: string, email: string, collegeId: string, password: string) => {
    setIsLoading(true);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const users = getStoredUsers();
    const existingUser = users.find((u: any) => u.email === email);

    if (existingUser) {
      toast({
        variant: "destructive",
        title: "Account exists",
        description: "An account with this email already exists.",
      });
      setIsLoading(false);
      return;
    }

    const newUser = {
      name,
      email,
      collegeId,
      password, // In a real app, this would be hashed. Here it's just a mock DB.
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
    };

    saveUserToDb(newUser);
    
    // Auto login after signup
    const { password: _, ...userProfile } = newUser;
    setUser(userProfile);
    localStorage.setItem("studysync_active_session", JSON.stringify(userProfile));
    
    setLocation("/dashboard");
    toast({
      title: "Account created",
      description: "Welcome to StudySync!",
    });
    
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("studysync_active_session");
    setLocation("/");
    toast({
      description: "Logged out successfully",
    });
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
