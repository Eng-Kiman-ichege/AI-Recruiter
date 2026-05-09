"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Briefcase, 
  Code2, 
  FileText, 
  Upload, 
  Plus, 
  Sparkles,
  ChevronRight,
  ArrowLeft,
  X,
  Check,
  Stethoscope,
  Globe,
  Scale,
  Users,
  BarChart3,
  Lightbulb,
  Clock,
  Layout,
  Target,
  Rocket,
  Search,
  CheckCircle2,
  AlertCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/client"
import { useUser } from "@clerk/nextjs"

// --- Constants ---

const industries = [
  { id: "tech", label: "Technology", icon: Code2, color: "text-blue-500", bg: "bg-blue-500/10" },
  { id: "healthcare", label: "Healthcare", icon: Stethoscope, color: "text-rose-500", bg: "bg-rose-500/10" },
  { id: "business", label: "Business", icon: Briefcase, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { id: "finance", label: "Finance", icon: BarChart3, color: "text-amber-500", bg: "bg-amber-500/10" },
  { id: "education", label: "Education", icon: Globe, color: "text-indigo-500", bg: "bg-indigo-500/10" },
  { id: "marketing", label: "Marketing", icon: Lightbulb, color: "text-purple-500", bg: "bg-purple-500/10" },
  { id: "law", label: "Law", icon: Scale, color: "text-slate-500", bg: "bg-slate-500/10" },
  { id: "hr", label: "HR", icon: Users, color: "text-cyan-500", bg: "bg-cyan-500/10" },
  { id: "other", label: "Other", icon: Plus, color: "text-slate-400", bg: "bg-white/5" },
]

const interviewTypes = [
  { id: "behavioral", label: "Behavioral", description: "Soft skills & STAR method" },
  { id: "technical", label: "Technical", description: "Deep dive into hard skills" },
  { id: "mixed", label: "Mixed", description: "Balanced real-world simulation" },
  { id: "leadership", label: "Leadership", description: "Focus on strategy & management" },
]

const experienceLevels = ["Entry Level", "Junior", "Mid-level", "Senior", "Lead", "Executive"]
const durations = ["15 mins", "30 mins", "45 mins", "60 mins"]

// --- Components ---

export default function InterviewSetupFlow() {
  const router = useRouter()
  const { user } = useUser()
  const [step, setStep] = React.useState(1)
  const [isLoading, setIsLoading] = React.useState(false)
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  
  // State for the configuration
  const [config, setConfig] = React.useState({
    industry: "",
    type: "mixed",
    role: "",
    experience: "Mid-level",
    jd: "",
    skills: [] as string[],
    duration: "30 mins",
    resumeUrl: ""
  })

  const nextStep = () => setStep(s => Math.min(s + 1, 5))
  const prevStep = () => setStep(s => Math.max(s - 1, 1))

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleStart = async () => {
    if (!user) return
    setIsLoading(true)
    
    try {
      let resumeId = null

      // 1. Upload Resume to Supabase Storage if it exists
      if (selectedFile) {
        const fileExt = selectedFile.name.split('.').pop()
        const fileName = `${user.id}-${Math.random()}.${fileExt}`
        const filePath = `${fileName}` // Upload to the root of the 'resumes' bucket

        const { error: uploadError } = await supabase.storage
          .from('resumes')
          .upload(filePath, selectedFile)

        if (uploadError) throw uploadError

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('resumes')
          .getPublicUrl(filePath)

        // Save Resume Record
        const { data: resumeData, error: resumeError } = await supabase
          .from('resumes')
          .insert([{
            user_id: user.id,
            name: selectedFile.name,
            file_url: publicUrl
          }])
          .select()

        if (resumeError) throw resumeError
        resumeId = resumeData[0].id
      }

      // 2. Save Full Interview Configuration
      const { data: interviewData, error: interviewError } = await supabase
        .from('interviews')
        .insert([{
          user_id: user.id,
          role: config.role,
          job_description: config.jd,
          technologies: config.skills,
          industry: config.industry === 'other' ? config.industry_custom : config.industry,
          type: config.type,
          experience: config.experience,
          duration: config.duration,
          resume_id: resumeId,
          status: 'pending'
        }])
        .select()

      if (interviewError) throw interviewError

      // 3. Redirect to the session
      router.push(`/dashboard/session/${interviewData[0].id}`)
    } catch (err: any) {
      console.error("FULL SETUP ERROR:", err)
      const errorMessage = err.message || err.error_description || "An unknown error occurred during setup."
      const errorDetails = err.details || ""
      
      console.error(`Error Message: ${errorMessage}`)
      if (errorDetails) console.error(`Error Details: ${errorDetails}`)
      
      alert(`Setup Failed: ${errorMessage} ${errorDetails ? `(${errorDetails})` : ""}`)
      setIsLoading(false)
    }
  }

  const renderStep = () => {
    switch(step) {
      case 1: return <IndustryStep config={config} setConfig={setConfig} next={nextStep} />
      case 2: return <RoleStep config={config} setConfig={setConfig} next={nextStep} prev={prevStep} />
      case 3: return <DetailStep config={config} setConfig={setConfig} next={nextStep} prev={prevStep} />
      case 4: return <LogisticStep 
                        config={config} 
                        setConfig={setConfig} 
                        next={nextStep} 
                        prev={prevStep} 
                        fileInputRef={fileInputRef}
                        handleFileChange={handleFileChange}
                        selectedFile={selectedFile}
                      />
      case 5: return <PlanStep config={config} onStart={handleStart} prev={prevStep} isLoading={isLoading} />
    }
  }

  return (
    <div className="max-w-4xl mx-auto min-h-[80vh] flex flex-col">
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-muted-foreground">Step {step} of 5</span>
          <span className="text-sm font-bold text-primary">{Math.round((step/5)*100)}% Complete</span>
        </div>
        <Progress value={(step/5)*100} className="h-1.5" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="flex-1"
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// --- Sub-steps ---

function IndustryStep({ config, setConfig, next }: any) {
  return (
    <div className="space-y-10">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold font-heading">Choose your industry</h2>
        <p className="text-muted-foreground max-w-lg mx-auto">Select the career field you're preparing for. Our AI adapts its behavior to industry standards.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {industries.map((item) => (
          <Card 
            key={item.id}
            onClick={() => setConfig({ ...config, industry: item.id })}
            className={cn(
              "cursor-pointer transition-all hover:scale-105 border-white/10 rounded-3xl overflow-hidden",
              config.industry === item.id ? "ring-2 ring-primary bg-primary/10 border-primary/20" : "bg-white/5"
            )}
          >
            <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-3">
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", item.bg)}>
                <item.icon className={cn("w-6 h-6", item.color)} />
              </div>
              <span className="font-bold text-sm">{item.label}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      <AnimatePresence>
        {config.industry === 'other' && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-md mx-auto space-y-4 pt-4"
          >
            <label className="text-sm font-bold flex items-center gap-2 px-2 text-primary">
              <Sparkles className="w-4 h-4" />
              Specify your industry
            </label>
            <Input 
              placeholder="e.g. Real Estate, Hospitality, Aerospace..." 
              className="h-14 bg-white/5 border-white/10 rounded-2xl px-6 focus:border-primary transition-all"
              onChange={(e) => setConfig({ ...config, industry_custom: e.target.value })}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        {interviewTypes.map((type) => (
          <div 
            key={type.id}
            onClick={() => setConfig({ ...config, type: type.id })}
            className={cn(
              "p-6 rounded-3xl border cursor-pointer transition-all group",
              config.type === type.id 
                ? "bg-primary/20 border-primary/30" 
                : "bg-white/5 border-white/10 hover:border-white/20"
            )}
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold">{type.label}</h3>
              {config.type === type.id && <CheckCircle2 className="w-5 h-5 text-primary" />}
            </div>
            <p className="text-xs text-muted-foreground">{type.description}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-10">
        <Button 
          onClick={next} 
          disabled={!config.industry || (config.industry === 'other' && !config.industry_custom)}
          className="rounded-full px-10 h-14 font-bold shadow-xl shadow-primary/20"
        >
          Continue
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  )
}

function RoleStep({ config, setConfig, next, prev }: any) {
  return (
    <div className="space-y-10">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold font-heading">What role are you targeting?</h2>
        <p className="text-muted-foreground">Be specific! From "Cardiac Nurse" to "Senior Product Designer".</p>
      </div>

      <div className="max-w-xl mx-auto space-y-8">
        <div className="space-y-4">
          <label className="text-sm font-bold flex items-center gap-2">
            <Target className="w-4 h-4 text-primary" />
            Job Role / Title
          </label>
          <Input 
            placeholder="e.g. Senior Frontend Engineer" 
            className="h-16 bg-white/5 border-white/10 rounded-2xl text-lg px-6 focus:border-primary transition-all shadow-inner"
            value={config.role}
            onChange={(e) => setConfig({ ...config, role: e.target.value })}
          />
        </div>

        <div className="space-y-4">
          <label className="text-sm font-bold flex items-center gap-2">
            <Rocket className="w-4 h-4 text-primary" />
            Experience Level
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {experienceLevels.map((lvl) => (
              <Button
                key={lvl}
                variant={config.experience === lvl ? "default" : "outline"}
                onClick={() => setConfig({ ...config, experience: lvl })}
                className={cn(
                  "rounded-xl h-12 transition-all",
                  config.experience === lvl ? "bg-primary text-white" : "border-white/10 hover:bg-white/5"
                )}
              >
                {lvl}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-20">
        <Button variant="ghost" onClick={prev} className="rounded-full px-8 hover:bg-white/5">
          Back
        </Button>
        <Button 
          onClick={next} 
          disabled={!config.role}
          className="rounded-full px-10 h-14 font-bold shadow-xl shadow-primary/20"
        >
          Next Step
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  )
}

function DetailStep({ config, setConfig, next, prev }: any) {
  const [skillInput, setSkillInput] = React.useState("")
  
  const addSkill = () => {
    if (skillInput && !config.skills.includes(skillInput)) {
      setConfig({ ...config, skills: [...config.skills, skillInput] })
      setSkillInput("")
    }
  }

  return (
    <div className="space-y-10">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold font-heading">Add intelligence</h2>
        <p className="text-muted-foreground">The more context you give, the better the AI can simulate your specific interview.</p>
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <label className="text-sm font-bold flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            Job Description / Requirements
          </label>
          <Textarea 
            placeholder="Paste the job posting here..." 
            className="h-[250px] bg-white/5 border-white/10 rounded-3xl p-8 focus:border-primary transition-all resize-none shadow-inner overflow-y-auto"
            value={config.jd}
            onChange={(e) => setConfig({ ...config, jd: e.target.value })}
          />
        </div>

        <div className="space-y-4">
          <label className="text-sm font-bold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            Top Skills to Test
          </label>
          <div className="flex gap-2 mb-4">
            <Input 
              placeholder="e.g. System Design, Communication, Negotiation..." 
              className="h-12 bg-white/5 border-white/10 rounded-xl"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addSkill()}
            />
            <Button onClick={addSkill} className="rounded-xl h-12">Add</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {config.skills.map((s: string) => (
              <Badge key={s} className="px-4 py-2 rounded-full bg-primary/20 text-primary border border-primary/30">
                {s}
                <X className="w-3 h-3 ml-2 cursor-pointer" onClick={() => setConfig({ ...config, skills: config.skills.filter((x: string) => x !== s) })} />
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-10">
        <Button variant="ghost" onClick={prev} className="rounded-full px-8 hover:bg-white/5">
          Back
        </Button>
        <Button 
          onClick={next} 
          className="rounded-full px-10 h-14 font-bold shadow-xl shadow-primary/20"
        >
          Logistics
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  )
}

function LogisticStep({ config, setConfig, next, prev, fileInputRef, handleFileChange, selectedFile }: any) {
  return (
    <div className="space-y-10">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold font-heading">Logistics & Profile</h2>
        <p className="text-muted-foreground">Final details before we generate your interview roadmap.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-6">
          <label className="text-sm font-bold flex items-center gap-2">
            <Upload className="w-4 h-4 text-primary" />
            Upload Resume
          </label>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept=".pdf,.docx" 
            onChange={handleFileChange}
          />
          <Card 
            onClick={() => fileInputRef.current?.click()}
            className="glass border-dashed border-white/20 rounded-3xl overflow-hidden hover:border-primary/50 transition-all cursor-pointer group h-64"
          >
            <CardContent className="h-full flex flex-col items-center justify-center gap-4 p-8">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              <div className="space-y-1 text-center">
                <p className="font-bold">{selectedFile ? "Change Resume" : "Drop your resume here"}</p>
                <p className="text-xs text-muted-foreground">PDF or DOCX (Max 5MB)</p>
              </div>
            </CardContent>
          </Card>
          {selectedFile && (
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
              <Check className="w-4 h-4 text-emerald-500" />
              <div className="flex flex-col overflow-hidden">
                <span className="text-xs font-bold text-emerald-500 truncate">{selectedFile.name}</span>
                <span className="text-[10px] text-emerald-500/70">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</span>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <label className="text-sm font-bold flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              Interview Duration
            </label>
            <div className="grid grid-cols-2 gap-3">
              {durations.map((d) => (
                <Button
                  key={d}
                  variant={config.duration === d ? "default" : "outline"}
                  onClick={() => setConfig({ ...config, duration: d })}
                  className={cn(
                    "rounded-xl h-14 transition-all",
                    config.duration === d ? "bg-primary text-white" : "border-white/10 hover:bg-white/5"
                  )}
                >
                  {d}
                </Button>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-primary/10 border border-primary/20 space-y-4">
            <h4 className="font-bold text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              AI Tailoring Note
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Based on your {config.experience} experience level, the AI will prioritize deep technical questions and leadership scenarios.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-10">
        <Button variant="ghost" onClick={prev} className="rounded-full px-8 hover:bg-white/5">
          Back
        </Button>
        <Button 
          onClick={next} 
          className="rounded-full px-10 h-14 font-bold shadow-xl shadow-primary/20"
        >
          Preview Roadmap
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  )
}

function PlanStep({ config, onStart, prev, isLoading }: any) {
  const steps = [
    { label: "Introduction", sub: "Recruiter greetings & Icebreaker", time: "5 min" },
    { label: "Behavioral Phase", sub: "STAR method scenarios", time: "10 min" },
    { label: "Core Assessment", sub: `${config.role} domain deep-dive`, time: "15 min" },
    { label: "Final Evaluation", sub: "Culture fit & Reflection", time: "5 min" },
  ]

  return (
    <div className="space-y-10">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto border border-primary/30 mb-4">
          <Sparkles className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-4xl font-bold font-heading">AI Interview Roadmap</h2>
        <p className="text-muted-foreground">We've generated a customized structure for your {config.role} session.</p>
      </div>

      <div className="max-w-xl mx-auto">
        <div className="relative space-y-8 before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-px before:bg-white/10">
          {steps.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative flex gap-6"
            >
              <div className="w-10 h-10 rounded-full bg-black border-2 border-primary flex items-center justify-center shrink-0 z-10 shadow-[0_0_15px_rgba(var(--primary),0.3)]">
                <span className="text-xs font-bold">{i + 1}</span>
              </div>
              <div className="flex-1 p-5 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold">{s.label}</h4>
                  <span className="text-[10px] uppercase tracking-wider text-primary font-bold">{s.time}</span>
                </div>
                <p className="text-xs text-muted-foreground">{s.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center pt-10 border-t border-white/5">
        <Button variant="ghost" onClick={prev} className="rounded-full px-8 hover:bg-white/5">
          Refine Setup
        </Button>
        <Button 
          onClick={onStart}
          disabled={isLoading}
          className="rounded-full px-12 h-16 font-bold shadow-2xl shadow-primary/30 group relative overflow-hidden"
        >
          {isLoading ? (
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Initializing AI...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Rocket className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              Start My Interview
            </div>
          )}
        </Button>
      </div>
    </div>
  )
}
