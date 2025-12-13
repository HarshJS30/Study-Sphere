import { 
  Users, 
  BookOpen, 
  Upload, 
  FileText, 
  MoreHorizontal
} from "lucide-react";

export const dummyGroups = [
  {
    id: 1,
    name: "Calculus 101 Finals Prep",
    subject: "Mathematics",
    description: "Intensive study group for the upcoming finals. We focus on derivatives and integrals.",
    members: 24,
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 2,
    name: "Physics Lab Partners",
    subject: "Physics",
    description: "Coordinating lab reports and discussing quantum mechanics theories.",
    members: 8,
    image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 3,
    name: "CS50 Introduction",
    subject: "Computer Science",
    description: "Beginner friendly group for CS50 students. Python and C help available.",
    members: 156,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 4,
    name: "Art History Modernism",
    subject: "Arts",
    description: "Discussing the impact of modernism on contemporary art.",
    members: 12,
    image: "https://images.unsplash.com/photo-1579783902614-a3fb392796a5?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 5,
    name: "Organic Chemistry",
    subject: "Chemistry",
    description: "Study group for O-Chem. Don't suffer alone!",
    members: 45,
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=60"
  }
];

export const dummyActivities = [
  {
    user: "Sarah Chen",
    action: "uploaded a new resource to",
    target: "Calculus 101",
    time: "2 mins ago",
    type: "upload",
    icon: <FileText className="w-5 h-5" />
  },
  {
    user: "Mike Ross",
    action: "started a video call in",
    target: "Physics Lab",
    time: "15 mins ago",
    type: "call",
    icon: <Users className="w-5 h-5" />
  },
  {
    user: "Jessica Lee",
    action: "posted a question in",
    target: "CS50 Intro",
    time: "1 hour ago",
    type: "message",
    icon: <MoreHorizontal className="w-5 h-5" />
  }
];

export const dummyMessages = [
  {
    id: 1,
    user: "Alex Johnson",
    avatar: "https://i.pravatar.cc/100?img=11",
    content: "Has anyone solved problem 4 on the practice set yet? I'm stuck on the integration part.",
    time: "10:30 AM",
    role: "Admin"
  },
  {
    id: 2,
    user: "Sarah Chen",
    avatar: "https://i.pravatar.cc/100?img=5",
    content: "Yeah! You need to use substitution u = x^2. It simplifies nicely after that.",
    time: "10:32 AM",
    role: "Member"
  },
  {
    id: 3,
    user: "Mike Ross",
    avatar: "https://i.pravatar.cc/100?img=3",
    content: "Wait, I thought we had to use integration by parts?",
    time: "10:33 AM",
    role: "Member"
  },
  {
    id: 4,
    user: "Sarah Chen",
    avatar: "https://i.pravatar.cc/100?img=5",
    content: "You can, but it's way longer. Try u-sub first.",
    time: "10:34 AM",
    role: "Member"
  },
  {
    id: 5,
    user: "Alex Johnson",
    avatar: "https://i.pravatar.cc/100?img=11",
    content: "Oh wow, that works perfectly. Thanks Sarah! 🔥",
    time: "10:35 AM",
    role: "Admin"
  }
];

export const dummyResources = [
  { name: "Week 4 Lecture Notes.pdf", size: "2.4 MB", uploadedBy: "Prof. Smith" },
  { name: "Practice Exam 2024.docx", size: "1.1 MB", uploadedBy: "Sarah Chen" },
  { name: "Integration Cheat Sheet.png", size: "450 KB", uploadedBy: "Alex J." },
  { name: "Textbook Chapter 5.pdf", size: "15 MB", uploadedBy: "Mike Ross" },
];
