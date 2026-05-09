"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { 
  Trophy, 
  Target, 
  TrendingUp, 
  MessageSquare, 
  Zap, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight, 
  Download, 
  Share2,
  BrainCircuit,
  Star,
  ChevronRight,
  LayoutDashboard,
  RotateCcw
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useParams } from "next/navigation"
import { supabase } from "@/lib/supabase/client"

// --- Components ---

export default function SessionResultsPage() {
  const { id } = useParams()
  const [sessionData, setSessionData] = React.useState<any>(null)
  const [feedback, setFeedback] = React.useState<any>(null)

  React.useEffect(() => {
    const fetchResults = async () => {
      // Fetch Interview Metadata
      const { data: interview } = await supabase
        .from('interviews')
        .select('*')
        .eq('id', id)
        .single()
      
      if (interview) setSessionData(interview)

      // Fetch Feedback Results
      const { data: feedbackData } = await supabase
        .from('interview_feedback')
        .select('*')
        .eq('interview_id', id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()
      
      if (feedbackData) setFeedback(feedbackData)
    }
    if (id) fetchResults()
  }, [id])

  const scores = [
    { label: "Technical Accuracy", value: 84, color: "text-blue-500" },
    { label: "Communication", value: 92, color: "text-emerald-500" },
    { label: "Confidence", value: 78, color: "text-amber-500" },
    { label: "Problem Solving", value: 81, color: "text-purple-500" },
  ]

  const improvementAreas = [
    { title: "System Scalability", desc: "You struggled to explain how to handle 1M+ concurrent users in the load balancer question.", impact: "High" },
    { title: "STAR Method", desc: "Your behavioral responses were slightly unfocused. Try to be more concise in the 'Action' phase.", impact: "Medium" }
  ]

  const transcriptHighlights = [
    { role: "ai", text: "How would you handle a sudden traffic spike on the frontend?" },
    { role: "user", text: "I would probably use some kind of caching mechanism like Redis...", type: "good", feedback: "Strong technical intuition mentioned here." },
    { role: "user", text: "Umm, I'm not entirely sure about the specifics of the load balancer configuration...", type: "weak", feedback: "Hesitation noted. Try to explain theoretical concepts even if the specifics are unknown." }
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <Badge variant="outline" className="bg-primary/10 border-primary/20 text-primary px-3 py-1">
            <Trophy className="w-3 h-3 mr-2" />
            Interview Completed
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold font-heading">Performance Report</h1>
          <p className="text-muted-foreground text-lg">{sessionData?.role || 'Session'} @ {sessionData?.industry || 'Specified Industry'} (Simulated)</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full border-white/10 hover:bg-white/5">
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
          <Button className="rounded-full px-8 shadow-xl shadow-primary/20">
            <Share2 className="w-4 h-4 mr-2" />
            Share Profile
          </Button>
        </div>
      </header>

      {/* Hero Score Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 glass border-white/10 rounded-[2.5rem] bg-gradient-to-br from-primary/20 via-transparent to-transparent overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <BrainCircuit className="w-40 h-40 text-primary" />
          </div>
          <CardContent className="p-10 flex flex-col items-center text-center space-y-6">
            <div className="relative w-48 h-48 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90">
                <circle className="text-white/5" strokeWidth="8" stroke="currentColor" fill="transparent" r="80" cx="96" cy="96" />
                <motion.circle 
                  initial={{ strokeDasharray: "0, 502" }}
                  animate={{ strokeDasharray: "420, 502" }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  className="text-primary" 
                  strokeWidth="8" 
                  strokeDashcap="round" 
                  stroke="currentColor" 
                  fill="transparent" 
                  r="80" 
                  cx="96" 
                  cy="96" 
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-6xl font-bold font-heading">{feedback?.score ? (feedback.score / 10).toFixed(1) : '0.0'}</span>
                <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Overall Score</span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-emerald-500 font-bold flex items-center justify-center gap-2">
                <TrendingUp className="w-4 h-4" />
                +12% from last session
              </p>
              <p className="text-sm text-muted-foreground">You are currently in the <strong>Top 8%</strong> of candidates for this role.</p>
            </div>
            <Link href="/dashboard/start" className="w-full">
              <Button variant="outline" className="w-full rounded-2xl h-12 border-primary/30 text-primary hover:bg-primary/10">
                <RotateCcw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </Link>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {scores.map((s, i) => (
            <Card key={i} className="glass border-white/10 rounded-3xl overflow-hidden group hover:border-primary/30 transition-all">
              <CardContent className="p-8 space-y-6">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-muted-foreground">{s.label}</h4>
                  <span className={cn("text-2xl font-bold font-heading", s.color)}>{s.value}%</span>
                </div>
                <Progress value={s.value} className="h-2" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {s.value > 85 ? "Excellent performance. This is a core strength." : "Solid results, but there's room for minor refinement."}
                </p>
              </CardContent>
            </Card>
          ))}
          
          <Card className="md:col-span-2 glass border-primary/20 bg-primary/5 rounded-3xl p-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-bold">AI Recruiter's Take</h4>
                <p className="text-sm text-muted-foreground">"{feedback?.feedback_text || 'Great session! Your full analysis is being processed.'}"</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Deep Dive Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <section className="space-y-6">
            <h2 className="text-2xl font-bold font-heading flex items-center gap-3">
              <MessageSquare className="w-6 h-6 text-primary" />
              Interview Transcript Analysis
            </h2>
            <div className="space-y-4">
              {transcriptHighlights.map((t, i) => (
                <div key={i} className={cn(
                  "p-6 rounded-3xl border transition-all",
                  t.role === "ai" ? "bg-white/5 border-white/5" : "bg-black border-white/10"
                )}>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className={cn(
                      "text-[10px] uppercase tracking-tighter px-2",
                      t.role === "ai" ? "text-primary border-primary/30" : "text-muted-foreground border-white/10"
                    )}>
                      {t.role === "ai" ? "AI Interviewer" : "Your Response"}
                    </Badge>
                    {t.type === "good" && <Badge className="bg-emerald-500/20 text-emerald-500 border-none text-[10px]">Positive Impact</Badge>}
                    {t.type === "weak" && <Badge className="bg-rose-500/20 text-rose-500 border-none text-[10px]">Needs Review</Badge>}
                  </div>
                  <p className="text-sm mb-4 leading-relaxed">{t.text}</p>
                  {t.feedback && (
                    <div className="flex items-start gap-3 p-4 rounded-2xl bg-primary/5 border border-primary/10">
                      <Star className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <p className="text-xs text-primary/80 italic">{t.feedback}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          {/* Weak Areas */}
          <Card className="glass border-white/10 rounded-[2rem] overflow-hidden">
            <CardHeader className="bg-rose-500/10 border-b border-white/5">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-rose-500" />
                Improvement Areas
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {improvementAreas.map((area, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h5 className="font-bold text-sm">{area.title}</h5>
                    <Badge variant="outline" className="text-[10px] border-rose-500/30 text-rose-500">{area.impact} Impact</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{area.desc}</p>
                </div>
              ))}
              <Button className="w-full rounded-xl bg-rose-500/10 text-rose-500 border border-rose-500/20 hover:bg-rose-500 hover:text-white transition-all mt-4">
                Schedule Training Session
              </Button>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card className="glass border-white/10 rounded-[2rem] overflow-hidden">
            <CardHeader className="bg-primary/10 border-b border-white/5">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Recommended
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 group cursor-pointer hover:bg-primary/5 hover:border-primary/30 transition-all">
                <h6 className="font-bold text-sm mb-1">Advanced React Patterns</h6>
                <p className="text-[10px] text-muted-foreground">3 modules • 45 mins</p>
                <div className="flex justify-end mt-2 opacity-0 group-hover:opacity-100 transition-all">
                  <ChevronRight className="w-4 h-4 text-primary" />
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 group cursor-pointer hover:bg-primary/5 hover:border-primary/30 transition-all">
                <h6 className="font-bold text-sm mb-1">STAR Method Guide</h6>
                <p className="text-[10px] text-muted-foreground">Interactive Workshop</p>
                <div className="flex justify-end mt-2 opacity-0 group-hover:opacity-100 transition-all">
                  <ChevronRight className="w-4 h-4 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <footer className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
        <Link href="/dashboard">
          <Button variant="ghost" className="rounded-full hover:bg-white/5">
            <LayoutDashboard className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
        <p className="text-xs text-muted-foreground">Detailed report generated by InterviewIQ AI on May 9, 2026</p>
      </footer>
    </div>
  )
}
