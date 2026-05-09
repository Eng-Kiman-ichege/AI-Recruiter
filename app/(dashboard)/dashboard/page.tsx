"use client"

import { UserButton, useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { BrainCircuit, LayoutDashboard, History, FileText, Settings, LogOut, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return null;

  const stats = [
    { label: "Total Interviews", value: "12", icon: History, color: "text-blue-500" },
    { label: "Average Score", value: "8.4/10", icon: BrainCircuit, color: "text-emerald-500" },
    { label: "Resumes Uploaded", value: "3", icon: FileText, color: "text-purple-500" },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 p-6 flex flex-col gap-8 hidden md:flex">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/30">
            <BrainCircuit className="text-primary w-5 h-5" />
          </div>
          <span className="text-lg font-bold font-heading tracking-tight">InterviewIQ</span>
        </Link>

        <nav className="flex flex-col gap-2 flex-1">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-2 rounded-xl bg-primary/10 text-primary font-medium">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-2 rounded-xl text-muted-foreground hover:bg-white/5 hover:text-white transition-all">
            <History className="w-5 h-5" />
            Sessions
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-2 rounded-xl text-muted-foreground hover:bg-white/5 hover:text-white transition-all">
            <FileText className="w-5 h-5" />
            Resumes
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-2 rounded-xl text-muted-foreground hover:bg-white/5 hover:text-white transition-all">
            <Settings className="w-5 h-5" />
            Settings
          </Link>
        </nav>

        <div className="pt-6 border-t border-white/10">
          <div className="flex items-center gap-3 px-4 py-2">
            <UserButton />
            <div className="flex flex-col">
              <span className="text-sm font-medium leading-none">{user?.fullName}</span>
              <span className="text-xs text-muted-foreground truncate w-32">{user?.primaryEmailAddress?.emailAddress}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <header className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold font-heading mb-2">Welcome back, {user?.firstName}!</h1>
            <p className="text-muted-foreground">Ready for your next interview practice?</p>
          </div>
          <div className="md:hidden">
            <UserButton />
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/10"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-2xl font-bold font-heading">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Start */}
          <section className="p-8 rounded-3xl bg-gradient-to-br from-primary/20 to-purple-500/10 border border-primary/20">
            <h2 className="text-2xl font-bold font-heading mb-4">Quick Start</h2>
            <p className="text-muted-foreground mb-8">Launch a new AI-powered interview simulation tailored to your latest resume.</p>
            <div className="space-y-4">
              <button className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold flex items-center justify-between px-6 transition-all group">
                Start New Session
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full h-14 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-between px-6 transition-all group">
                Review Past Feedback
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </section>

          {/* Recent Activity */}
          <section className="p-8 rounded-3xl bg-white/[0.03] border border-white/10">
            <h2 className="text-2xl font-bold font-heading mb-4">Recent Activity</h2>
            <div className="space-y-6">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-all cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                      <BrainCircuit className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Software Engineer Interview</p>
                      <p className="text-xs text-muted-foreground">Yesterday at 4:30 PM</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-emerald-500">8.2</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
