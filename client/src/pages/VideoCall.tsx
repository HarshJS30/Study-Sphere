import { useState } from "react";
import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Monitor, 
  PhoneOff, 
  MessageSquare, 
  Users, 
  Settings,
  Maximize2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { dummyGroups } from "@/lib/mockData";

export default function VideoCall() {
  const { id } = useParams();
  const group = dummyGroups.find(g => g.id === Number(id)) || dummyGroups[0];
  
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  const participants = [
    { name: "You", image: "https://github.com/shadcn.png", isSpeaking: true },
    { name: "Sarah Chen", image: "https://i.pravatar.cc/100?img=5", isSpeaking: false },
    { name: "Mike Ross", image: "https://i.pravatar.cc/100?img=3", isSpeaking: false },
    { name: "Jessica Lee", image: "https://i.pravatar.cc/100?img=9", isSpeaking: true },
  ];

  return (
    <div className="h-screen w-full bg-background flex flex-col relative overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-4 z-20 bg-gradient-to-b from-black/80 to-transparent flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link href={`/group/${id}`}>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full">
              <Maximize2 className="w-5 h-5 rotate-45" />
            </Button>
          </Link>
          <div>
            <h2 className="text-white font-bold text-lg leading-none">{group.name}</h2>
            <div className="flex items-center gap-2 text-white/70 text-xs mt-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              01:45:20 • Study Lounge
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full">
            <Users className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="flex-1 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 auto-rows-fr max-h-[calc(100vh-80px)]">
        {participants.map((p, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className={`relative rounded-2xl overflow-hidden bg-zinc-900 border-2 ${p.isSpeaking ? 'border-primary shadow-[0_0_20px_rgba(147,51,234,0.3)]' : 'border-transparent'}`}
          >
            {/* Mock Video Feed - Using images for prototype */}
            <div className="absolute inset-0">
               {p.name === "You" && !cameraOn ? (
                  <div className="w-full h-full flex items-center justify-center bg-zinc-800">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={p.image} />
                      <AvatarFallback>{p.name[0]}</AvatarFallback>
                    </Avatar>
                  </div>
               ) : (
                 <img 
                   src={p.image} 
                   alt={p.name} 
                   className="w-full h-full object-cover" 
                 />
               )}
            </div>
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

            {/* Name Label */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2">
              <div className="bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg flex items-center gap-2">
                <span className="text-white text-sm font-semibold">{p.name}</span>
                {p.isSpeaking && <Mic className="w-3 h-3 text-green-400" />}
                {!p.isSpeaking && <MicOff className="w-3 h-3 text-red-400" />}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Control Bar */}
      <div className="h-24 bg-zinc-950 flex items-center justify-center gap-4 relative z-20">
        <div className="flex items-center gap-3 p-2 rounded-2xl bg-zinc-900 border border-white/5 shadow-2xl">
          <Button 
            size="icon" 
            className={`w-12 h-12 rounded-xl transition-all ${micOn ? 'bg-zinc-800 hover:bg-zinc-700 text-white' : 'bg-red-500/20 text-red-500 hover:bg-red-500/30'}`}
            onClick={() => setMicOn(!micOn)}
          >
            {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </Button>

          <Button 
            size="icon" 
            className={`w-12 h-12 rounded-xl transition-all ${cameraOn ? 'bg-zinc-800 hover:bg-zinc-700 text-white' : 'bg-red-500/20 text-red-500 hover:bg-red-500/30'}`}
            onClick={() => setCameraOn(!cameraOn)}
          >
            {cameraOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
          </Button>

          <Button 
            size="icon" 
            className={`w-12 h-12 rounded-xl transition-all ${isScreenSharing ? 'bg-green-500 text-white' : 'bg-zinc-800 hover:bg-zinc-700 text-white'}`}
            onClick={() => setIsScreenSharing(!isScreenSharing)}
          >
            <Monitor className="w-5 h-5" />
          </Button>

          <Button 
            size="icon" 
            className="w-12 h-12 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white"
          >
            <MessageSquare className="w-5 h-5" />
          </Button>

          <div className="w-[1px] h-8 bg-white/10 mx-1" />

          <Link href={`/group/${id}`}>
            <Button 
              className="px-6 h-12 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold"
            >
              <PhoneOff className="w-5 h-5 mr-2" /> Leave
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
