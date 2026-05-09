"use client"

import * as React from "react"
import { useUser } from "@clerk/nextjs"
import { motion } from "framer-motion"
import { 
  Plus, 
  ArrowUpRight, 
  History, 
  Target, 
  Lightbulb, 
  Upload, 
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  BrainCircuit,
  MessageSquare,
  Sparkles,
  ChevronRight,
  FileText
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function DashboardPage() {
  const { user, isLoaded } = useUser()

  if (!isLoaded) return null

  return (
    <div className="space-y-10 pb-20">
      {/* Welcome Hero */}
      <motion.section 
        variants={item}
        initial="hidden"
        animate="show"
        className="relative p-10 rounded-[3rem] bg-gradient-to-br from-primary/20 via-purple-500/10 to-transparent border border-white/10 overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <BrainCircuit className="w-64 h-64 text-primary" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <Badge variant="outline" className="mb-4 bg-white/5 border-white/10 text-primary px-3 py-1">
            <Sparkles className="w-3 h-3 mr-2" />
            AI Coaching Active
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
            Welcome back, {user?.firstName || 'Candidate'}!
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Ready to ace your next role? You've improved your technical communication by <span className="text-emerald-500 font-bold">12%</span> this week. Let's keep the momentum going.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/dashboard/start">
              <Button size="lg" className="rounded-full px-8 h-12 shadow-xl shadow-primary/20">
                Start Mock Interview
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="rounded-full px-8 h-12 border-white/10 hover:bg-white/5">
              View Growth Plan
            </Button>
          </div>
        </div>
      </motion.section>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Left Column - Main Action & Analytics */}
        <div className="lg:col-span-2 space-y-8">
          {/* Analytics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass border-white/10 rounded-3xl overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                  Overall Performance
                  <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-3 mb-4">
                  <span className="text-4xl font-bold font-heading">8.4</span>
                  <span className="text-muted-foreground mb-1">/ 10</span>
                </div>
                <Progress value={84} className="h-2 mb-2" />
                <p className="text-xs text-muted-foreground font-medium">Top 5% of candidates in your field</p>
              </CardContent>
            </Card>

            <Card className="glass border-white/10 rounded-3xl overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                  Interviews Completed
                  <TrendingUp className="w-4 h-4 text-primary" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-3 mb-4">
                  <span className="text-4xl font-bold font-heading">24</span>
                  <span className="text-muted-foreground mb-1">Sessions</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-6 h-6 rounded-full border-2 border-black bg-primary/20" />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">+6 this month</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Interview History */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold font-heading flex items-center gap-2">
                <History className="w-5 h-5 text-primary" />
                Recent Sessions
              </h2>
              <Button variant="ghost" className="text-primary hover:text-primary hover:bg-primary/10 rounded-full">
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {[
                { role: "Senior Frontend Engineer", company: "Google", score: 8.8, date: "2 days ago", tech: ["React", "Next.js", "System Design"] },
                { role: "Product Manager", company: "Stripe", score: 7.5, date: "5 days ago", tech: ["Strategy", "Product Sense"] },
                { role: "Full Stack Developer", company: "Vercel", score: 9.2, date: "1 week ago", tech: ["Node.js", "TypeScript"] }
              ].map((session, i) => (
                <motion.div
                  key={i}
                  variants={item}
                  whileHover={{ x: 5 }}
                  className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between group cursor-pointer hover:bg-white/[0.06] transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30">
                      <BrainCircuit className="text-primary w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white group-hover:text-primary transition-colors">{session.role}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-muted-foreground">{session.company}</span>
                        <div className="w-1 h-1 rounded-full bg-white/20" />
                        <span className="text-xs text-muted-foreground">{session.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="hidden md:flex gap-2">
                      {session.tech.map((t) => (
                        <Badge key={t} variant="secondary" className="bg-white/5 border-white/10 text-[10px]">
                          {t}
                        </Badge>
                      ))}
                    </div>
                    <div className="text-right min-w-[60px]">
                      <p className={cn(
                        "text-lg font-bold font-heading",
                        session.score >= 8.5 ? "text-emerald-500" : session.score >= 7.5 ? "text-yellow-500" : "text-primary"
                      )}>{session.score}</p>
                      <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Score</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-white transition-colors" />
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column - Insights & Tools */}
        <div className="space-y-8">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="glass border-white/10 rounded-2xl">
              <CardContent className="p-4 pt-6">
                <div className="text-xs text-muted-foreground mb-1">Comm.</div>
                <div className="text-xl font-bold font-heading">8.2</div>
                <Progress value={82} className="h-1 mt-2 bg-white/10" />
              </CardContent>
            </Card>
            <Card className="glass border-white/10 rounded-2xl">
              <CardContent className="p-4 pt-6">
                <div className="text-xs text-muted-foreground mb-1">Technical</div>
                <div className="text-xl font-bold font-heading">7.9</div>
                <Progress value={79} className="h-1 mt-2 bg-white/10" />
              </CardContent>
            </Card>
          </div>

          {/* Weak Areas */}
          <Card className="glass border-white/10 rounded-3xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-6 opacity-20">
              <AlertCircle className="w-20 h-20 text-yellow-500" />
            </div>
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Target className="w-5 h-5 text-yellow-500" />
                Improvement Areas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { title: "System Scalability", label: "Technical", level: 65 },
                { title: "Behavioral Nuance", label: "Communication", level: 72 }
              ].map((area, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{area.title}</span>
                    <span className="text-muted-foreground">{area.level}%</span>
                  </div>
                  <Progress value={area.level} className="h-1.5" />
                </div>
              ))}
              <Button variant="outline" className="w-full mt-2 rounded-xl border-white/10 hover:bg-white/5">
                Practice These Areas
              </Button>
            </CardContent>
          </Card>

          {/* AI Recommendations */}
          <Card className="glass border-white/10 rounded-3xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-6 opacity-20">
              <Lightbulb className="w-20 h-20 text-primary" />
            </div>
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-primary" />
                Recommended
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20">
                <h4 className="text-sm font-bold mb-1">Advanced React Hooks</h4>
                <p className="text-xs text-muted-foreground">Tailored for your Vercel application</p>
                <Button variant="link" className="p-0 h-auto text-primary text-xs mt-2">
                  Start Session →
                </Button>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                <h4 className="text-sm font-bold mb-1">STAR Method Workshop</h4>
                <p className="text-xs text-muted-foreground">Based on your recent Amazon mock</p>
                <Button variant="link" className="p-0 h-auto text-primary text-xs mt-2">
                  Learn More →
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Resume Manager Card */}
          <Card className="glass border-white/10 rounded-3xl overflow-hidden bg-gradient-to-br from-primary/10 to-transparent">
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Resume Manager
              </CardTitle>
              <CardDescription>2 resumes uploaded</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs font-medium">Software_Eng_v2.pdf</span>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
              <Button className="w-full rounded-xl bg-primary/20 text-primary hover:bg-primary/30 border border-primary/30">
                <Upload className="w-4 h-4 mr-2" />
                Upload New
              </Button>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}
