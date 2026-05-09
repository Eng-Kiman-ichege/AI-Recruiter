"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Mic, 
  MicOff, 
  Send, 
  BrainCircuit, 
  MessageSquare, 
  ArrowLeft, 
  Settings, 
  X, 
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Play
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/client"
import { chatCompletion, analyzeInterview } from "@/app/actions/ai"
import Vapi from "@vapi-ai/web"
import { INTERVIEWER_SYSTEM_PROMPT } from "@/lib/ai/prompts"

// --- Constants ---

const interviewStages = [
  { id: 1, label: "Icebreaker", sub: "Warm-up & Introduction" },
  { id: 2, label: "Behavioral", sub: "STAR Method Evaluation" },
  { id: 3, label: "Situational", sub: "Problem Solving Scenarios" },
  { id: 4, label: "Career Focus", sub: "Past Experience Review" },
  { id: 5, label: "Industry Specific", sub: "Domain Standards" },
  { id: 6, label: "Technical Skills", sub: "Deep-dive Assessment" },
  { id: 7, label: "Follow-ups", sub: "Advanced Deep-dive" },
  { id: 8, label: "Reflection", sub: "Final Closing" },
]

const vapi = typeof window !== "undefined" ? new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || "") : null

// --- Components ---

export default function InterviewSessionPage() {
  const { id } = useParams()
  const router = useRouter()
  
  const [sessionData, setSessionData] = React.useState<any>(null)
  const [currentStage, setCurrentStage] = React.useState(1)
  const [isRecording, setIsRecording] = React.useState(false)
  const [isMuted, setIsMuted] = React.useState(false)
  const [isFocusMode, setIsFocusMode] = React.useState(false)
  const [message, setMessage] = React.useState("")
  const [messages, setMessages] = React.useState<any[]>([])
  const [isThinking, setIsThinking] = React.useState(false)

  // Vapi Call Logic
  const startVapiCall = async () => {
    if (!vapi || !sessionData) return
    setIsRecording(true)

    const systemPrompt = INTERVIEWER_SYSTEM_PROMPT({
      role: sessionData.role,
      industry: sessionData.industry,
      type: sessionData.type,
      experience: sessionData.experience,
      jd: sessionData.job_description,
      skills: sessionData.technologies,
    })

    vapi.start({
      name: `Interview with ${sessionData.role}`,
      assistant: {
        model: {
          provider: "openai",
          model: "gpt-4", // Vapi will handle the voice logic
          systemPrompt: systemPrompt,
        },
        voice: "josh", // Professional male voice
        firstMessage: `Hello! I'm your AI interviewer. Ready to start your interview for the ${sessionData.role} role?`,
      },
    })
  }

  const stopVapiCall = () => {
    if (vapi) vapi.stop()
    setIsRecording(false)
  }

  React.useEffect(() => {
    if (!vapi) return

    vapi.on("call-start", () => setIsRecording(true))
    vapi.on("call-end", () => setIsRecording(false))
    vapi.on("message", (msg: any) => {
      if (msg.type === "transcript" && msg.transcriptType === "final") {
        setMessages(prev => [...prev, { role: msg.role, content: msg.transcript }])
      }
    })

    return () => {
      vapi.removeAllListeners()
    }
  }, [])

  React.useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase
        .from('interviews')
        .select('*, resumes(*)')
        .eq('id', id)
        .single()

      if (data) {
        setSessionData(data)
        setMessages([
          { 
            role: "ai", 
            content: `Hello! I'm your AI interviewer today. I've analyzed your ${data.resumes ? 'resume' : 'background'} and the job description for the ${data.role} role in the ${data.industry || 'specified'} industry. Are you ready to begin our ${data.type || 'standard'} session?` 
          }
        ])
      }
    }

    if (id) fetchSession()
  }, [id])

  const handleSendMessage = async () => {
    if (!message.trim() || !sessionData) return
    
    const userMsg = { role: "user", content: message }
    const updatedMessages = [...messages, userMsg]
    setMessages(updatedMessages)
    setMessage("")
    setIsThinking(true)

    try {
      // 1. Prepare system context for the model if it's the first message
      // Note: We usually keep the system message at the start
      const systemMsg = { 
        role: "system", 
        content: `You are an expert recruiter. Industry: ${sessionData.industry}. Role: ${sessionData.role}. Stage: ${currentStage}.` 
      }
      
      const aiResponse = await chatCompletion([systemMsg, ...updatedMessages])
      
      setIsThinking(false)
      setMessages(prev => [...prev, { role: "ai", content: aiResponse }])
      
      // Basic heuristic to advance stages (could be more complex)
      if (messages.length > 3 && currentStage < 8) {
        setCurrentStage(prev => prev + 1)
      }
    } catch (err) {
      console.error("AI Error:", err)
      setIsThinking(false)
    }
  }

  const handleEndSession = async () => {
    setIsThinking(true)
    try {
      const transcript = messages.map(m => `${m.role}: ${m.content}`).join("\n")
      const result = await analyzeInterview(transcript)
      
      // Save results to DB (Feedback table)
      await supabase.from('interview_feedback').insert([{
        interview_id: id,
        category: 'Overall',
        score: result.overallScore,
        feedback_text: result.feedback
      }])

      // Redirect to results page
      router.push(`/dashboard/session/${id}/results`)
    } catch (err) {
      console.error("Analysis Error:", err)
      setIsThinking(false)
    }
  }

  return (
    <div className={cn(
      "fixed inset-0 bg-background z-50 flex overflow-hidden transition-all duration-500",
      isFocusMode ? "p-0" : "p-4 md:p-8"
    )}>
      {/* Sidebar - Roadmap (Hidden in Focus Mode) */}
      <AnimatePresence>
        {!isFocusMode && (
          <motion.aside
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-80 border-r border-white/5 pr-8 hidden lg:flex flex-col gap-8 overflow-y-auto pb-8"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/30">
                <BrainCircuit className="text-primary w-5 h-5" />
              </div>
              <span className="font-bold font-heading">Session Control</span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Interview Roadmap</span>
                <span className="text-xs font-bold text-primary">{Math.round((currentStage / 8) * 100)}%</span>
              </div>
              <div className="space-y-2">
                {interviewStages.map((stage) => {
                  const isCompleted = stage.id < currentStage
                  const isActive = stage.id === currentStage
                  return (
                    <div 
                      key={stage.id}
                      className={cn(
                        "p-4 rounded-2xl border transition-all relative overflow-hidden",
                        isActive ? "bg-primary/10 border-primary/30" : "bg-white/5 border-white/5 opacity-50",
                        isCompleted && "bg-emerald-500/5 border-emerald-500/20 opacity-80"
                      )}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={cn("text-sm font-bold", isActive ? "text-primary" : "text-white")}>
                          {stage.id}. {stage.label}
                        </span>
                        {isCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                        {isActive && <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.8)]" />}
                      </div>
                      <p className="text-[10px] text-muted-foreground leading-tight">{stage.sub}</p>
                      {isActive && (
                        <motion.div 
                          layoutId="active-indicator"
                          className="absolute left-0 top-0 bottom-0 w-1 bg-primary"
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="mt-auto pt-6 border-t border-white/5">
              <Card className="bg-primary/5 border-primary/20 rounded-2xl">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-bold">AI Coach Pro</p>
                    <p className="text-[10px] text-muted-foreground">Monitoring confidence...</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Interaction Area */}
      <main className="flex-1 flex flex-col relative max-w-5xl mx-auto w-full">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-white/5 bg-background/50 backdrop-blur-xl z-10">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full hover:bg-white/5">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="h-4 w-px bg-white/10" />
            <Badge variant="outline" className="bg-white/5 border-white/10 px-3 py-1 gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Simulation
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono mr-4">
              <Clock className="w-3.5 h-3.5 text-primary" />
              24:12
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsFocusMode(!isFocusMode)}
              className="rounded-full hover:bg-white/5"
            >
              {isFocusMode ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/5">
              <Settings className="w-5 h-5" />
            </Button>
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={handleEndSession}
              className="rounded-full px-6 ml-2 bg-rose-500/10 text-rose-500 border border-rose-500/20 hover:bg-rose-500 hover:text-white transition-all"
            >
              End Session
            </Button>
          </div>
        </header>

        {/* Message History / Visualizer Container */}
        <div className="flex-1 overflow-y-auto p-6 md:p-12 space-y-12 scroll-smooth">
          {/* AI Visualizer Stage */}
          <div className="flex flex-col items-center justify-center py-10 space-y-8">
            <div className="relative">
              <motion.div 
                animate={{ 
                  scale: isRecording ? [1, 1.2, 1] : 1,
                  opacity: isRecording ? [0.5, 0.8, 0.5] : 0.5
                }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 bg-primary/40 rounded-full blur-3xl"
              />
              <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full bg-black border border-white/10 flex items-center justify-center shadow-2xl shadow-primary/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
                <motion.div
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    rotate: { repeat: Infinity, duration: 20, ease: "linear" },
                    scale: { repeat: Infinity, duration: 4 }
                  }}
                >
                  <BrainCircuit className="w-16 h-16 md:w-24 md:h-24 text-primary opacity-80" />
                </motion.div>
                
                {/* Wave Visualizer (Simulated) */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 flex items-end justify-center gap-1 px-4 pb-4">
                  {[...Array(8)].map((_, i) => (
                    <motion.div 
                      key={i}
                      animate={{ 
                        height: isRecording ? [4, Math.random() * 24 + 10, 4] : 4
                      }}
                      transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }}
                      className="w-1 bg-primary/50 rounded-full"
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="text-center space-y-2 max-w-lg">
              <h3 className="text-xl font-bold font-heading">AI Interviewer</h3>
              <p className="text-sm text-muted-foreground italic">"I'm listening carefully. Take your time to explain your thought process."</p>
            </div>
          </div>

          {/* Messages */}
          <div className="space-y-8 pb-32">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "flex gap-4 max-w-3xl",
                  msg.role === "ai" ? "mr-auto" : "ml-auto flex-row-reverse"
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border",
                  msg.role === "ai" ? "bg-primary/20 border-primary/30" : "bg-white/10 border-white/20"
                )}>
                  {msg.role === "ai" ? <BrainCircuit className="w-5 h-5 text-primary" /> : <MessageSquare className="w-5 h-5 text-white" />}
                </div>
                <div className={cn(
                  "p-6 rounded-3xl text-sm leading-relaxed",
                  msg.role === "ai" 
                    ? "bg-white/5 border border-white/10 text-white" 
                    : "bg-primary text-white font-medium"
                )}>
                  {msg.content}
                </div>
              </motion.div>
            ))}

            {isThinking && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-4 max-w-3xl mr-auto"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
                  <BrainCircuit className="w-5 h-5 text-primary" />
                </div>
                <div className="flex items-center gap-2 p-6 rounded-3xl bg-white/5 border border-white/10">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" />
                  <span className="text-xs text-muted-foreground ml-2">AI is thinking...</span>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Input Control Bar */}
        <div className="p-6 bg-gradient-to-t from-background via-background to-transparent pt-20 border-t border-white/5 relative z-10">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Textarea 
                  placeholder="Type your response here..." 
                  className="min-h-[60px] max-h-[200px] bg-white/5 border-white/10 rounded-3xl p-6 pr-16 focus:border-primary transition-all resize-none shadow-2xl"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!message.trim() || isThinking}
                  className="absolute right-3 bottom-3 w-10 h-10 rounded-full shadow-lg"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex flex-col gap-2">
                <Button 
                  onClick={() => isRecording ? stopVapiCall() : startVapiCall()}
                  className={cn(
                    "w-16 h-16 rounded-full shadow-2xl transition-all hover:scale-110",
                    isRecording ? "bg-rose-500 hover:bg-rose-600 scale-105 ring-4 ring-rose-500/20" : "bg-primary hover:bg-primary/90"
                  )}
                >
                  {isRecording ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                </Button>
                <div className="text-[10px] text-center font-bold text-muted-foreground uppercase tracking-widest">
                  {isRecording ? "Listening" : "Speak"}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" onClick={() => setIsMuted(!isMuted)} className="text-muted-foreground hover:text-white rounded-full">
                  {isMuted ? <VolumeX className="w-4 h-4 mr-2" /> : <Volume2 className="w-4 h-4 mr-2" />}
                  AI Audio: {isMuted ? "Off" : "On"}
                </Button>
              </div>
              <p className="text-[10px] text-muted-foreground font-medium italic">
                Tip: Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10 font-sans">Enter</kbd> to send, or click the Mic to speak.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
