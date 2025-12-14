import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  BookOpen, 
  Video, 
  Users, 
  ArrowRight, 
  CheckCircle2,
  GraduationCap,
  Loader2
} from "lucide-react";

import heroBg from "@assets/generated_images/vibrant_abstract_gradient_background_with_glass_shapes.png";
import heroIcon from "@assets/generated_images/3d_glass_icon_of_a_study_group_chat.png";

export default function Landing() {
  const [isLogin, setIsLogin] = useState(true);
  const { login, signup, isLoading } = useAuth();
  
  // Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [collegeId, setCollegeId] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      await login(email, password);
    } else {
      await signup(name, email, collegeId, password);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden text-foreground">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="Background" 
          className="w-full h-full object-cover opacity-40 blur-[100px] scale-110"
        />
        <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px]" />
      </div>

      {/* Floating Particles/Blobs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-[80px] animate-float" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-[80px] animate-float-delayed" />

      {/* Navbar */}
      <nav className="relative z-10 container mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
            <GraduationCap className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight">StudySync</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</a>
          <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">About</a>
          <Button variant="outline" className="border-primary/50 hover:bg-primary/10 hover:text-primary rounded-full px-6">
            Contact Support
          </Button>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-6 pt-12 pb-24 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-medium tracking-wide uppercase text-muted-foreground">Now Live for Spring 2025</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Study Together,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary animate-gradient-x">
              Anywhere.
            </span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
            The ultimate collaborative platform for college students. Combine the community of Discord with the focus of Zoom. Verify your college ID and start studying smarter.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="rounded-full text-lg h-14 px-8 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity shadow-lg shadow-primary/25">
              Get Started Free <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full text-lg h-14 px-8 border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10">
              View Demo
            </Button>
          </div>

          <div className="flex items-center gap-8 pt-8 border-t border-white/10">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-zinc-800 overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-background bg-zinc-800 flex items-center justify-center text-xs font-bold">
                +2k
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="font-bold text-foreground">2,000+</span> students joined this week
            </div>
          </div>
        </motion.div>

        {/* Right Side - Auth Card / 3D Visual */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative"
        >
          {/* Decorative 3D Element */}
          <motion.img 
            src={heroIcon} 
            alt="Study Icon" 
            className="absolute -top-20 -right-20 w-64 h-64 object-contain z-0 opacity-80 pointer-events-none animate-float"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Glass Card */}
          <div className="relative z-10 glass rounded-3xl p-8 md:p-10 max-w-md mx-auto border border-white/10 shadow-2xl shadow-primary/10">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">{isLogin ? "Welcome Back" : "Join Your Campus"}</h2>
              <p className="text-muted-foreground text-sm">Enter your details to access your study groups.</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    placeholder="Jane Doe" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-black/20 border-white/10 focus:border-primary/50 h-12 rounded-xl" 
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">College Email (.edu)</Label>
                <Input 
                  id="email" 
                  type="email"
                  placeholder="student@university.edu" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-black/20 border-white/10 focus:border-primary/50 h-12 rounded-xl" 
                />
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="id">Student ID</Label>
                  <Input 
                    id="id" 
                    placeholder="12345678" 
                    value={collegeId}
                    onChange={(e) => setCollegeId(e.target.value)}
                    required
                    className="bg-black/20 border-white/10 focus:border-primary/50 h-12 rounded-xl" 
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-black/20 border-white/10 focus:border-primary/50 h-12 rounded-xl" 
                />
              </div>

              <Button type="submit" className="w-full h-12 rounded-xl text-base font-semibold bg-primary hover:bg-primary/90 mt-4 shadow-lg shadow-primary/25" disabled={isLoading}>
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isLogin ? "Sign In" : "Verify & Join")}
              </Button>
              
              <div className="text-center text-sm">
                <span className="text-muted-foreground">{isLogin ? "New here?" : "Already verified?"}</span>{" "}
                <button 
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary hover:underline font-medium"
                >
                  {isLogin ? "Create an account" : "Sign in"}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Features Grid */}
      <div id="features" className="container mx-auto px-6 py-24 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Everything you need to <span className="text-primary">ace it</span>.</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">We've combined the best of communication tools into one seamless platform designed for academic success.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              icon: Users, 
              title: "Community First", 
              desc: "Find students in your major, join course-specific groups, and collaborate in real-time.",
              color: "text-blue-400",
              bg: "bg-blue-400/10"
            },
            { 
              icon: Video, 
              title: "HD Video Study", 
              desc: "Crystal clear video calls with screen sharing, perfect for group projects and late-night cram sessions.",
              color: "text-purple-400",
              bg: "bg-purple-400/10"
            },
            { 
              icon: BookOpen, 
              title: "Resource Hub", 
              desc: "Share notes, past papers, and lecture slides in organized repositories for every subject.",
              color: "text-pink-400",
              bg: "bg-pink-400/10"
            }
          ].map((feature, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className="glass p-8 rounded-3xl border border-white/5 hover:border-primary/30 transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6`}>
                <feature.icon className={`w-7 h-7 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
