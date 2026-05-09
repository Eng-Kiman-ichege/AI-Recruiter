"use client"

import * as React from "react"
import { motion } from "framer-motion"
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
  Check
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { cn } from "@/lib/utils"

const techOptions = [
  "React", "Next.js", "TypeScript", "Node.js", "Python", 
  "System Design", "AWS", "SQL", "Tailwind CSS", "Docker",
  "Product Strategy", "STAR Method", "Problem Solving"
]

export default function StartInterviewPage() {
  const [role, setRole] = React.useState("")
  const [jd, setJd] = React.useState("")
  const [selectedTech, setSelectedTech] = React.useState<string[]>([])
  const [isUploading, setIsUploading] = React.useState(false)

  const toggleTech = (tech: string) => {
    setSelectedTech(prev => 
      prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      <header className="flex items-center gap-4">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold font-heading">Start New Interview</h1>
          <p className="text-muted-foreground text-sm">Configure your AI interviewer for a realistic session.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-8">
          {/* Step 1: Role & JD */}
          <section className="space-y-6">
            <div className="space-y-4">
              <label className="text-sm font-semibold flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-primary" />
                Target Role
              </label>
              <Input 
                placeholder="e.g. Senior Frontend Engineer" 
                className="h-12 bg-white/5 border-white/10 rounded-xl focus:border-primary transition-all"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              <label className="text-sm font-semibold flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                Job Description
              </label>
              <Textarea 
                placeholder="Paste the job description here for AI tailoring..." 
                className="min-h-[200px] bg-white/5 border-white/10 rounded-2xl p-6 focus:border-primary transition-all resize-none"
                value={jd}
                onChange={(e) => setJd(e.target.value)}
              />
            </div>
          </section>

          {/* Step 2: Tech Selection */}
          <section className="space-y-6">
            <label className="text-sm font-semibold flex items-center gap-2">
              <Code2 className="w-4 h-4 text-primary" />
              Technologies & Topics
            </label>
            <div className="flex flex-wrap gap-2">
              {techOptions.map((tech) => {
                const isSelected = selectedTech.includes(tech)
                return (
                  <Badge
                    key={tech}
                    variant={isSelected ? "default" : "outline"}
                    className={cn(
                      "px-4 py-2 rounded-full cursor-pointer transition-all border-white/10",
                      isSelected ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-white/5 hover:bg-white/10 text-muted-foreground"
                    )}
                    onClick={() => toggleTech(tech)}
                  >
                    {tech}
                    {isSelected ? <X className="w-3 h-3 ml-2" /> : <Plus className="w-3 h-3 ml-2" />}
                  </Badge>
                )
              })}
            </div>
          </section>
        </div>

        {/* Sidebar: Resume & Action */}
        <div className="space-y-8">
          <section className="space-y-4">
            <label className="text-sm font-semibold flex items-center gap-2">
              <Upload className="w-4 h-4 text-primary" />
              Select Resume
            </label>
            <Card className="glass border-dashed border-white/20 rounded-3xl overflow-hidden hover:border-primary/50 transition-all cursor-pointer group">
              <CardContent className="p-8 text-center flex flex-col items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold">Upload Resume</p>
                  <p className="text-xs text-muted-foreground">PDF or DOCX (Max 5MB)</p>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
              <Check className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-medium text-emerald-500">Resume_Latest.pdf selected</span>
            </div>
          </section>

          <div className="pt-6 border-t border-white/5">
            <Button 
              disabled={!role || !jd}
              className="w-full h-14 rounded-2xl shadow-2xl shadow-primary/30 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-600 to-primary bg-[length:200%_auto] animate-gradient" />
              <span className="relative flex items-center justify-center gap-2 font-bold text-lg">
                Generate Interview
                <Sparkles className="w-5 h-5" />
              </span>
            </Button>
            <p className="text-[10px] text-center text-muted-foreground mt-4 leading-relaxed px-4">
              Our AI will take about 10 seconds to analyze your profile and tailor questions.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
