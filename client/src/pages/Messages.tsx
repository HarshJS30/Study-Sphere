import { useState, useRef, useEffect } from "react";
import Layout from "@/components/Layout";
import { useAuth } from "@/lib/auth";
import { useData, DM } from "@/lib/data";
import { 
  Search, 
  MoreVertical, 
  Phone, 
  Video, 
  Send, 
  Paperclip, 
  Smile, 
  Plus,
  Check,
  CheckCheck
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export default function Messages() {
  const { user } = useAuth();
  const { dms, addDMMessage, createDM } = useData();
  const [selectedDMId, setSelectedDMId] = useState<number | null>(dms[0]?.id || null);
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [newContactName, setNewContactName] = useState("");
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const selectedDM = dms.find(dm => dm.id === selectedDMId);

  useEffect(() => {
    if (dms.length > 0 && !selectedDMId) {
        setSelectedDMId(dms[0].id);
    }
  }, [dms, selectedDMId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [selectedDM?.messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !selectedDMId || !user) return;

    addDMMessage(selectedDMId, inputValue, user);
    setInputValue("");
  };

  const handleCreateChat = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newContactName.trim()) return;
      createDM(newContactName);
      setNewContactName("");
      setIsNewChatOpen(false);
  };

  const filteredDMs = dms.filter(dm => 
      dm.contactName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="flex h-full bg-background/50">
        {/* Left Sidebar: Conversations List */}
        <div className="w-80 border-r border-white/5 flex flex-col bg-sidebar/30 backdrop-blur-sm">
          <div className="p-4 border-b border-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Messages</h2>
              
              <Dialog open={isNewChatOpen} onOpenChange={setIsNewChatOpen}>
                  <DialogTrigger asChild>
                    <Button size="icon" variant="ghost" className="rounded-full hover:bg-white/10">
                        <Plus className="w-5 h-5" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="glass border-white/10">
                      <DialogHeader>
                          <DialogTitle>New Conversation</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleCreateChat} className="space-y-4 pt-4">
                          <Input 
                              placeholder="Enter student name..." 
                              value={newContactName}
                              onChange={(e) => setNewContactName(e.target.value)}
                              className="bg-black/20 border-white/10"
                          />
                          <Button type="submit" className="w-full bg-primary">Start Chat</Button>
                      </form>
                  </DialogContent>
              </Dialog>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search messages..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-white/5 border-white/5 rounded-xl h-10 focus:bg-white/10"
              />
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-2 space-y-1">
              {filteredDMs.map((dm) => (
                <div
                  key={dm.id}
                  onClick={() => setSelectedDMId(dm.id)}
                  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                    selectedDMId === dm.id 
                      ? "bg-primary/10 border border-primary/20" 
                      : "hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <div className="relative">
                    <Avatar className="w-12 h-12 border border-white/10">
                      <AvatarImage src={dm.contactAvatar} />
                      <AvatarFallback>{dm.contactName[0]}</AvatarFallback>
                    </Avatar>
                    {dm.status === 'Online' && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                    )}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className={`font-semibold text-sm ${selectedDMId === dm.id ? "text-primary" : ""}`}>
                        {dm.contactName}
                      </span>
                      <span className="text-[10px] text-muted-foreground">{dm.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{dm.lastMessage}</p>
                  </div>
                  {dm.unread > 0 && (
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground">
                      {dm.unread}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {selectedDM ? (
            <>
              {/* Chat Header */}
              <div className="h-20 border-b border-white/5 flex items-center justify-between px-6 shrink-0 bg-background/40 backdrop-blur-md z-10">
                <div className="flex items-center gap-4">
                  <Avatar className="w-10 h-10 border-2 border-primary/20">
                    <AvatarImage src={selectedDM.contactAvatar} />
                    <AvatarFallback>{selectedDM.contactName[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold">{selectedDM.contactName}</h3>
                    <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${selectedDM.status === 'Online' ? 'bg-green-500' : 'bg-gray-500'}`} />
                        <span className="text-xs text-muted-foreground">{selectedDM.status}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                    <Phone className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                    <Video className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                    <MoreVertical className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Messages List */}
              <ScrollArea ref={scrollRef} className="flex-1 p-6">
                <div className="space-y-6 max-w-4xl mx-auto">
                    {/* Timestamp Divider Example */}
                    <div className="flex justify-center">
                        <span className="text-[10px] uppercase font-bold text-muted-foreground bg-white/5 px-3 py-1 rounded-full">Today</span>
                    </div>

                  {selectedDM.messages.map((msg) => (
                    <motion.div 
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 ${msg.user === user?.name ? "flex-row-reverse" : ""}`}
                    >
                      <Avatar className="w-8 h-8 mt-1">
                        <AvatarImage src={msg.avatar} />
                        <AvatarFallback>{msg.user[0]}</AvatarFallback>
                      </Avatar>
                      <div className={`flex flex-col max-w-[65%] ${msg.user === user?.name ? "items-end" : "items-start"}`}>
                        <div 
                          className={`p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                            msg.user === user?.name 
                              ? "bg-primary text-primary-foreground rounded-tr-sm" 
                              : "bg-white/10 border border-white/5 rounded-tl-sm"
                          }`}
                        >
                          {msg.content}
                        </div>
                        <div className="flex items-center gap-1 mt-1 px-1">
                            <span className="text-[10px] text-muted-foreground opacity-70">{msg.time}</span>
                            {msg.user === user?.name && (
                                <CheckCheck className="w-3 h-3 text-primary" />
                            )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="p-4 px-6 pb-6 bg-background/40 backdrop-blur-md border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                    <form onSubmit={handleSendMessage} className="relative flex items-center gap-2">
                    <Button type="button" size="icon" variant="ghost" className="text-muted-foreground hover:bg-white/10 rounded-full">
                        <Plus className="w-5 h-5" />
                    </Button>
                    <div className="flex-1 relative">
                        <Input 
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder={`Message ${selectedDM.contactName}...`}
                            className="bg-white/5 border-white/10 focus:bg-white/10 rounded-full pl-4 pr-12 h-12"
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                            <Button type="button" size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-foreground rounded-full">
                                <Smile className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                    <Button 
                        type="submit" 
                        size="icon" 
                        className={`h-12 w-12 rounded-full transition-all ${inputValue.trim() ? "bg-primary hover:bg-primary/90" : "bg-white/10 text-muted-foreground hover:bg-white/20"}`}
                        disabled={!inputValue.trim()}
                    >
                        <Send className="w-5 h-5" />
                    </Button>
                    </form>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
                    <Send className="w-8 h-8 opacity-50" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-1">Your Messages</h3>
                <p>Select a conversation to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
