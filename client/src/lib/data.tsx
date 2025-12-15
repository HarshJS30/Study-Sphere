import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { dummyGroups, dummyMessages } from "@/lib/mockData";

// --- Types ---
export interface Group {
  id: number;
  name: string;
  subject: string;
  description: string;
  members: number;
  image: string;
}

export interface Message {
  id: number;
  user: string;
  avatar: string;
  content: string;
  time: string;
  role: "Admin" | "Member";
}

interface DataContextType {
  groups: Group[];
  messages: Record<number, Message[]>; // Map group ID to messages
  addGroup: (name: string, subject: string, description: string) => void;
  addMessage: (groupId: number, content: string, user: any) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// --- Provider ---
export function DataProvider({ children }: { children: ReactNode }) {
  const [groups, setGroups] = useState<Group[]>([]);
  const [messages, setMessages] = useState<Record<number, Message[]>>({});

  // Initialize with some data if empty
  useEffect(() => {
    const storedGroups = localStorage.getItem("studysync_groups");
    const storedMessages = localStorage.getItem("studysync_messages");

    if (storedGroups) {
      setGroups(JSON.parse(storedGroups));
    } else {
      setGroups(dummyGroups); // Fallback to initial seed data
      localStorage.setItem("studysync_groups", JSON.stringify(dummyGroups));
    }

    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    } else {
      // Initialize messages for seed groups
      const initialMessages: Record<number, Message[]> = {};
      dummyGroups.forEach(g => {
        // Cast dummyMessages to ensure role compatibility
        initialMessages[g.id] = dummyMessages as Message[]; 
      });
      setMessages(initialMessages);
      localStorage.setItem("studysync_messages", JSON.stringify(initialMessages));
    }
  }, []);

  const addGroup = (name: string, subject: string, description: string) => {
    const newGroup: Group = {
      id: Date.now(),
      name,
      subject,
      description,
      members: 1,
      image: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 1000)}?w=800&auto=format&fit=crop&q=60` // Random image
    };
    
    const updatedGroups = [...groups, newGroup];
    setGroups(updatedGroups);
    localStorage.setItem("studysync_groups", JSON.stringify(updatedGroups));

    // Initialize messages for new group
    const updatedMessages = { ...messages, [newGroup.id]: [] };
    setMessages(updatedMessages);
    localStorage.setItem("studysync_messages", JSON.stringify(updatedMessages));
  };

  const addMessage = (groupId: number, content: string, user: any) => {
    const newMessage: Message = {
      id: Date.now(),
      user: user.name,
      avatar: user.avatar,
      content,
      time: "Just now",
      role: "Member"
    };

    const groupMessages = messages[groupId] || [];
    const updatedGroupMessages = [...groupMessages, newMessage];
    
    const updatedMessages = { ...messages, [groupId]: updatedGroupMessages };
    setMessages(updatedMessages);
    localStorage.setItem("studysync_messages", JSON.stringify(updatedMessages));
  };

  return (
    <DataContext.Provider value={{ groups, messages, addGroup, addMessage }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
