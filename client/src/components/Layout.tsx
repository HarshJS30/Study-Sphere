import { 
  Users, 
  MessageSquare, 
  Video, 
  Settings, 
  Bell, 
  Search, 
  Plus, 
  LogOut,
  Hash,
  Mic,
  MoreVertical
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const { user, logout } = useAuth();

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
      {/* Sidebar Navigation */}
      <aside className="w-20 md:w-24 flex flex-col items-center py-6 bg-sidebar/50 backdrop-blur-xl border-r border-white/5 z-20">
        <Link href="/dashboard">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20 mb-8 cursor-pointer hover:scale-105 transition-transform">
            <span className="font-bold text-white text-xl">S</span>
          </div>
        </Link>

        <div className="flex-1 w-full flex flex-col items-center gap-4 px-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className={`w-12 h-12 rounded-2xl ${location === "/dashboard" ? "bg-white/10 text-primary" : "text-muted-foreground hover:bg-white/5 hover:text-foreground"}`}
                onClick={() => setLocation("/dashboard")}
              >
                <Users className="w-6 h-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Dashboard</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className={`w-12 h-12 rounded-2xl relative ${location.includes("/messages") ? "bg-white/10 text-primary" : "text-muted-foreground hover:bg-white/5 hover:text-foreground"}`}
                onClick={() => setLocation("/messages")}
              >
                <MessageSquare className="w-6 h-6" />
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-background" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Messages</TooltipContent>
          </Tooltip>

          <div className="w-10 h-[1px] bg-white/10 my-2" />

          {/* Group Shortcuts */}
          {[1, 2, 3].map((i) => (
             <Tooltip key={i}>
             <TooltipTrigger asChild>
               <div className="w-12 h-12 rounded-2xl bg-zinc-800 border border-white/5 hover:border-primary/50 transition-all cursor-pointer overflow-hidden group">
                 <img 
                   src={`https://images.unsplash.com/photo-${1500000000000 + i}?w=100&h=100&fit=crop`} 
                   alt="Group" 
                   className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" 
                 />
               </div>
             </TooltipTrigger>
             <TooltipContent side="right">Calculus 101</TooltipContent>
           </Tooltip>
          ))}
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="w-12 h-12 rounded-2xl border border-dashed border-white/20 text-muted-foreground hover:bg-white/5 hover:text-primary hover:border-primary/50">
                <Plus className="w-6 h-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Create Group</TooltipContent>
          </Tooltip>
        </div>

        <div className="flex flex-col items-center gap-4 mt-auto">
          <Tooltip>
             <TooltipTrigger asChild>
               <Button variant="ghost" size="icon" onClick={logout} className="w-12 h-12 rounded-2xl text-muted-foreground hover:bg-red-500/10 hover:text-red-500">
                  <LogOut className="w-6 h-6" />
               </Button>
             </TooltipTrigger>
             <TooltipContent side="right">Sign Out</TooltipContent>
          </Tooltip>
          
          <Tooltip>
             <TooltipTrigger asChild>
               <Avatar className="w-10 h-10 border-2 border-primary/20 cursor-pointer hover:border-primary transition-colors">
                  <AvatarImage src={user?.avatar || "https://github.com/shadcn.png"} />
                  <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
               </Avatar>
             </TooltipTrigger>
             <TooltipContent side="right">{user?.name || "User"}</TooltipContent>
          </Tooltip>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 relative">
        {/* Top Header - Global for logged in pages */}
        <header className="h-16 border-b border-white/5 bg-background/50 backdrop-blur-md flex items-center justify-between px-6 z-10 shrink-0">
          <div className="flex items-center gap-4 flex-1">
             {/* Search Bar */}
             <div className="relative w-full max-w-md hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search for groups, students, or resources..." 
                className="pl-10 bg-white/5 border-white/5 focus:bg-white/10 rounded-xl h-10 w-full transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-hidden relative">
          {children}
        </div>
      </main>
    </div>
  );
}
