import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { useData } from "@/lib/data";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Users, Clock, ArrowUpRight, PlusCircle, X, FileText, MoreHorizontal } from "lucide-react";
import Layout from "@/components/Layout";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Dashboard() {
  const { user, isLoading } = useAuth();
  const { groups, addGroup, activities } = useData();
  const [, setLocation] = useLocation();
  const [isNewGroupOpen, setIsNewGroupOpen] = useState(false);

  // New Group Form State
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupSubject, setNewGroupSubject] = useState("");
  const [newGroupDesc, setNewGroupDesc] = useState("");

  useEffect(() => {
    if (!isLoading && !user) {
      setLocation("/");
    }
  }, [user, isLoading, setLocation]);

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    addGroup(newGroupName, newGroupSubject, newGroupDesc);
    setIsNewGroupOpen(false);
    // Reset form
    setNewGroupName("");
    setNewGroupSubject("");
    setNewGroupDesc("");
  };

  if (isLoading || !user) return null;

  return (
    <Layout>
      <div className="h-full overflow-y-auto p-6 md:p-8">
        <div className="max-w-7xl mx-auto space-y-10">
          
          {/* Welcome Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Hello, {user.name.split(' ')[0]} 👋</h1>
              <p className="text-muted-foreground">Ready to crush your midterms? You have 3 study sessions today.</p>
            </div>
            
            <Dialog open={isNewGroupOpen} onOpenChange={setIsNewGroupOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl h-11 px-6 shadow-lg shadow-primary/20">
                  <PlusCircle className="mr-2 w-5 h-5" /> Create New Group
                </Button>
              </DialogTrigger>
              <DialogContent className="glass border-white/10 sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create Study Group</DialogTitle>
                  <DialogDescription>
                    Start a new community for your class or study topic.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateGroup} className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Group Name</Label>
                    <Input 
                      id="name" 
                      placeholder="e.g. Calculus 101 Finals" 
                      value={newGroupName}
                      onChange={(e) => setNewGroupName(e.target.value)}
                      required
                      className="bg-black/20 border-white/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select onValueChange={setNewGroupSubject} required>
                      <SelectTrigger className="bg-black/20 border-white/10">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mathematics">Mathematics</SelectItem>
                        <SelectItem value="Physics">Physics</SelectItem>
                        <SelectItem value="Computer Science">Computer Science</SelectItem>
                        <SelectItem value="Chemistry">Chemistry</SelectItem>
                        <SelectItem value="Biology">Biology</SelectItem>
                        <SelectItem value="Arts">Arts</SelectItem>
                        <SelectItem value="History">History</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      placeholder="What is this group about?" 
                      value={newGroupDesc}
                      onChange={(e) => setNewGroupDesc(e.target.value)}
                      required
                      className="bg-black/20 border-white/10 resize-none"
                    />
                  </div>
                  <DialogFooter className="pt-4">
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90">Create Group</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "Study Hours", value: "24.5", change: "+12%", color: "from-blue-500/20 to-cyan-500/20", border: "border-blue-500/20" },
              { label: "Active Groups", value: groups.length.toString(), change: "Active", color: "from-purple-500/20 to-pink-500/20", border: "border-purple-500/20" },
              { label: "Tasks Completed", value: "18", change: "On Track", color: "from-green-500/20 to-emerald-500/20", border: "border-green-500/20" },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`glass p-6 rounded-2xl border ${stat.border} relative overflow-hidden group`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <p className="text-muted-foreground text-sm font-medium mb-1">{stat.label}</p>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-3xl font-bold">{stat.value}</h3>
                    <span className="text-xs font-medium text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">{stat.change}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Your Groups */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Your Study Groups</h2>
              <Button variant="link" className="text-primary">View All</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groups.map((group, i) => (
                <Link key={group.id} href={`/group/${group.id}`}>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + (i * 0.05) }}
                    className="glass group rounded-2xl overflow-hidden border border-white/5 hover:border-primary/50 transition-all cursor-pointer h-full flex flex-col"
                  >
                    <div className="h-32 bg-zinc-800 relative overflow-hidden">
                      <img src={group.image} alt={group.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <span className="text-xs font-bold px-2 py-1 rounded bg-primary/20 border border-primary/20 text-primary-foreground backdrop-blur-sm">
                          {group.subject}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{group.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">{group.description}</p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                        <div className="flex -space-x-2">
                          {[1, 2, 3].map((m) => (
                            <div key={m} className="w-7 h-7 rounded-full border border-background bg-zinc-800 overflow-hidden">
                              <img src={`https://i.pravatar.cc/100?img=${m + i * 5}`} alt="Member" />
                            </div>
                          ))}
                          <div className="w-7 h-7 rounded-full border border-background bg-zinc-800 flex items-center justify-center text-[10px] text-muted-foreground">
                            +{group.members}
                          </div>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="w-3 h-3 mr-1" /> Last active 2h ago
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
              
              {/* Add New Card */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={() => setIsNewGroupOpen(true)}
                className="rounded-2xl border border-dashed border-white/10 hover:border-primary/50 hover:bg-white/5 transition-all cursor-pointer flex flex-col items-center justify-center gap-4 min-h-[280px] text-muted-foreground hover:text-primary"
              >
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                  <PlusCircle className="w-8 h-8" />
                </div>
                <span className="font-medium">Find More Groups</span>
              </motion.div>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
            <div className="glass rounded-2xl border border-white/5 overflow-hidden">
              {activities.map((activity, i) => (
                <div key={i} className="flex items-center gap-4 p-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.type === 'upload' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'}`}>
                    {activity.type === 'upload' ? <FileText className="w-5 h-5"/> : activity.type === 'call' ? <Users className="w-5 h-5"/> : <MoreHorizontal className="w-5 h-5"/>}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      <span className="font-bold text-foreground">{activity.user}</span> {activity.action} <span className="text-primary">{activity.target}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="text-muted-foreground">
                    <ArrowUpRight className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}
