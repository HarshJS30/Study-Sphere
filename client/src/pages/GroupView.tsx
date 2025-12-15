import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "wouter";
import Layout from "@/components/Layout";
import { dummyResources } from "@/lib/mockData";
import { useAuth } from "@/lib/auth";
import { useData } from "@/lib/data";
import { 
  Hash, 
  Volume2, 
  Video, 
  MoreVertical, 
  Plus, 
  Paperclip, 
  Send, 
  Smile, 
  Settings,
  Mic,
  FileText,
  Download,
  BookOpen,
  Upload,
  Users
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export default function GroupView() {
  const { id } = useParams();
  const { groups, messages, addMessage } = useData();
  const { user } = useAuth();
  
  const group = groups.find(g => g.id === Number(id));
  const groupMessages = messages[Number(id)] || [];

  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !user || !id) return;
    
    addMessage(Number(id), inputValue, user);
    setInputValue("");
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [groupMessages]);

  if (!group) return <div>Group not found</div>;

  return (
    <Layout>
      <div className="flex h-full">
        {/* Left Sidebar: Channels */}
        <div className="w-64 bg-sidebar/30 backdrop-blur-sm border-r border-white/5 flex flex-col hidden md:flex">
          <div className="p-4 h-16 border-b border-white/5 flex items-center justify-between">
            <h2 className="font-bold truncate">{group.name}</h2>
            <MoreVertical className="w-4 h-4 text-muted-foreground cursor-pointer" />
          </div>

          <ScrollArea className="flex-1 p-3">
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2 flex items-center justify-between group">
                  Text Channels
                  <Plus className="w-3 h-3 opacity-0 group-hover:opacity-100 cursor-pointer" />
                </h3>
                <div className="space-y-1">
                  {["general", "homework-help", "resources", "announcements"].map((channel) => (
                    <Button 
                      key={channel} 
                      variant="ghost" 
                      className={`w-full justify-start px-2 h-9 text-muted-foreground hover:text-foreground hover:bg-white/5 ${channel === 'general' ? 'bg-white/5 text-foreground' : ''}`}
                    >
                      <Hash className="w-4 h-4 mr-2 text-muted-foreground/70" />
                      {channel}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2 flex items-center justify-between group">
                  Voice Channels
                  <Plus className="w-3 h-3 opacity-0 group-hover:opacity-100 cursor-pointer" />
                </h3>
                <div className="space-y-1">
                  <div className="group">
                    <Button variant="ghost" className="w-full justify-start px-2 h-9 text-muted-foreground hover:text-foreground hover:bg-white/5 mb-1">
                      <Volume2 className="w-4 h-4 mr-2 text-muted-foreground/70" />
                      Study Lounge
                    </Button>
                    <div className="pl-9 pb-2 space-y-2">
                       <div className="flex items-center gap-2">
                         <Avatar className="w-5 h-5 border border-background">
                           <AvatarImage src="https://i.pravatar.cc/100?img=12" />
                         </Avatar>
                         <span className="text-xs text-muted-foreground">Sarah Chen</span>
                       </div>
                       <div className="flex items-center gap-2">
                         <Avatar className="w-5 h-5 border border-background">
                           <AvatarImage src="https://i.pravatar.cc/100?img=8" />
                         </Avatar>
                         <span className="text-xs text-muted-foreground">Mike Ross</span>
                       </div>
                    </div>
                    <div className="px-2">
                      <Link href={`/video/${group.id}`}>
                        <Button size="sm" className="w-full bg-green-600/20 text-green-400 hover:bg-green-600/30 border border-green-600/30">
                          Join Voice
                        </Button>
                      </Link>
                    </div>
                  </div>
                  
                  <Button variant="ghost" className="w-full justify-start px-2 h-9 text-muted-foreground hover:text-foreground hover:bg-white/5">
                    <Volume2 className="w-4 h-4 mr-2 text-muted-foreground/70" />
                    Focus Room
                  </Button>
                </div>
              </div>
            </div>
          </ScrollArea>
          
          {/* User Status Bar */}
          <div className="p-3 bg-black/20 border-t border-white/5 flex items-center gap-3">
            <Avatar className="w-9 h-9">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
              <div className="text-sm font-medium truncate">{user?.name}</div>
              <div className="text-xs text-muted-foreground truncate">#{user?.collegeId || "1234"}</div>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="w-7 h-7">
                <Mic className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="w-7 h-7">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-background/50">
          <div className="h-16 border-b border-white/5 flex items-center justify-between px-6 shrink-0">
             <div className="flex items-center gap-3">
               <Hash className="w-6 h-6 text-muted-foreground" />
               <div>
                 <h3 className="font-bold">general</h3>
                 <p className="text-xs text-muted-foreground">Main discussion for {group.name}</p>
               </div>
             </div>
             <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <Avatar key={i} className="w-8 h-8 border-2 border-background">
                      <AvatarImage src={`https://i.pravatar.cc/100?img=${i + 20}`} />
                    </Avatar>
                  ))}
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs border-2 border-background">
                    +{group.members}
                  </div>
                </div>
                <Separator orientation="vertical" className="h-6" />
                <Link href={`/video/${group.id}`}>
                  <Button size="icon" className="bg-primary hover:bg-primary/90 rounded-full w-9 h-9 shadow-lg shadow-primary/20">
                    <Video className="w-4 h-4" />
                  </Button>
                </Link>
             </div>
          </div>

          <ScrollArea ref={scrollRef} className="flex-1 p-6">
             <div className="flex flex-col gap-6">
                {groupMessages.map((msg) => (
                  <motion.div 
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }} 
                    className={`flex gap-4 group ${msg.user === user?.name ? 'flex-row-reverse' : ''}`}
                  >
                    <Avatar className="w-10 h-10 mt-1 cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all">
                      <AvatarImage src={msg.avatar} />
                      <AvatarFallback>{msg.user[0]}</AvatarFallback>
                    </Avatar>
                    <div className={`flex flex-col max-w-[70%] ${msg.user === user?.name ? 'items-end' : 'items-start'}`}>
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="font-bold hover:underline cursor-pointer">{msg.user}</span>
                        <span className="text-xs text-muted-foreground">{msg.time}</span>
                        {msg.role === 'Admin' && <Badge variant="outline" className="text-[10px] h-4 px-1 border-primary/50 text-primary">Admin</Badge>}
                      </div>
                      <div className={`p-3 rounded-2xl ${msg.user === user?.name ? 'bg-primary text-primary-foreground rounded-tr-sm' : 'bg-white/5 border border-white/5 rounded-tl-sm'}`}>
                        <p className="text-sm leading-relaxed">{msg.content}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
             </div>
          </ScrollArea>

          <div className="p-4 px-6 pb-6">
            <form onSubmit={sendMessage} className="relative">
              <div className="absolute left-3 top-3 flex gap-2">
                <Button type="button" size="icon" variant="ghost" className="h-8 w-8 rounded-full text-muted-foreground hover:bg-white/10 hover:text-foreground">
                  <Plus className="w-5 h-5" />
                </Button>
              </div>
              <Input 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={`Message #${group.name}`}
                className="pl-14 pr-32 py-6 bg-white/5 border-white/10 focus:bg-white/10 rounded-2xl shadow-inner"
              />
              <div className="absolute right-3 top-3 flex gap-2">
                 <Button type="button" size="icon" variant="ghost" className="h-8 w-8 rounded-full text-muted-foreground hover:bg-white/10 hover:text-foreground">
                  <Paperclip className="w-4 h-4" />
                </Button>
                 <Button type="button" size="icon" variant="ghost" className="h-8 w-8 rounded-full text-muted-foreground hover:bg-white/10 hover:text-foreground">
                  <Smile className="w-4 h-4" />
                </Button>
                {inputValue.trim() && (
                  <Button type="submit" size="icon" className="h-8 w-8 rounded-full bg-primary hover:bg-primary/90 transition-all">
                    <Send className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Right Sidebar: Resources/Members */}
        <div className="w-72 bg-sidebar/30 backdrop-blur-sm border-l border-white/5 hidden xl:flex flex-col">
           <div className="p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" /> Resources
              </h3>
              <div className="space-y-3">
                {dummyResources.map((res, i) => (
                  <div key={i} className="group p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-primary/30 transition-all cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                        <FileText className="w-4 h-4" />
                      </div>
                      <Button size="icon" variant="ghost" className="w-6 h-6 opacity-0 group-hover:opacity-100">
                        <Download className="w-3 h-3" />
                      </Button>
                    </div>
                    <p className="font-medium text-sm truncate mb-1">{res.name}</p>
                    <p className="text-xs text-muted-foreground">{res.size} • {res.uploadedBy}</p>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full border-dashed border-white/20 hover:border-primary/50 text-muted-foreground hover:text-primary mt-2">
                  <Upload className="w-4 h-4 mr-2" /> Upload Resource
                </Button>
              </div>
           </div>

           <Separator className="bg-white/5" />
           
           <div className="p-6 flex-1 overflow-y-auto">
             <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" /> Online — 4
              </h3>
              <div className="space-y-4">
                {[
                  { name: "Alex Johnson", status: "Studying Calculus", color: "text-green-400" },
                  { name: "Sarah Chen", status: "In Voice Channel", color: "text-purple-400" },
                  { name: "Mike Ross", status: "Online", color: "text-green-400" },
                  { name: "Jessica Lee", status: "Writing", color: "text-yellow-400" }
                ].map((user, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="w-9 h-9">
                        <AvatarImage src={`https://i.pravatar.cc/100?img=${i + 15}`} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background bg-current ${user.color}`} />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="text-sm font-medium truncate">{user.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.status}</p>
                    </div>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </div>
    </Layout>
  );
}
