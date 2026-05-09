"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { BarChart3, TrendingUp, Target, BrainCircuit, Activity } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || ""
const supabase = createClient(supabaseUrl, supabaseKey)

export default function AnalyticsPage() {
  const [stats, setStats] = React.useState({
    totalInterviews: 0,
    avgScore: 0,
    technicalAvg: 0,
    communicationAvg: 0
  })

  React.useEffect(() => {
    const fetchAnalytics = async () => {
      const { data: feedbackData } = await supabase.from('interview_feedback').select('*')
      
      if (feedbackData && feedbackData.length > 0) {
        let totalScore = 0
        let techScore = 0
        let commScore = 0
        let validParses = 0

        feedbackData.forEach(f => {
          totalScore += (f.score || 0)
          try {
            const parsed = typeof f.feedback_text === 'string' ? JSON.parse(f.feedback_text) : f.feedback_text
            techScore += (parsed.scores?.technical || 0)
            commScore += (parsed.scores?.communication || 0)
            validParses++
          } catch(e) {}
        })

        setStats({
          totalInterviews: feedbackData.length,
          avgScore: totalScore / feedbackData.length,
          technicalAvg: validParses > 0 ? techScore / validParses : 0,
          communicationAvg: validParses > 0 ? commScore / validParses : 0
        })
      }
    }
    fetchAnalytics()
  }, [])

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold font-heading">Performance Analytics</h1>
        <p className="text-muted-foreground">Detailed insights across all your interview sessions.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass border-white/10 rounded-3xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-primary/20 rounded-xl border border-primary/30">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">Average Score</p>
            <h2 className="text-4xl font-bold font-heading">{stats.avgScore > 0 ? (stats.avgScore / 10).toFixed(1) : '-'} <span className="text-lg text-muted-foreground">/ 10</span></h2>
          </CardContent>
        </Card>

        <Card className="glass border-white/10 rounded-3xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-cyan-500/20 rounded-xl border border-cyan-500/30">
                <Activity className="w-5 h-5 text-cyan-500" />
              </div>
            </div>
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">Total Sessions</p>
            <h2 className="text-4xl font-bold font-heading">{stats.totalInterviews}</h2>
          </CardContent>
        </Card>

        <Card className="glass border-white/10 rounded-3xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-purple-500/20 rounded-xl border border-purple-500/30">
                <BrainCircuit className="w-5 h-5 text-purple-500" />
              </div>
            </div>
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">Top Skill</p>
            <h2 className="text-3xl font-bold font-heading truncate">
              {stats.technicalAvg > stats.communicationAvg ? 'Technical' : (stats.communicationAvg > 0 ? 'Communication' : 'N/A')}
            </h2>
          </CardContent>
        </Card>
      </div>

      <Card className="glass border-white/10 rounded-3xl overflow-hidden">
        <CardHeader>
          <CardTitle>Skill Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-8">
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-bold">
              <span>Technical Accuracy</span>
              <span className="text-primary">{Math.round(stats.technicalAvg)}%</span>
            </div>
            <Progress value={stats.technicalAvg} className="h-3" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-bold">
              <span>Communication</span>
              <span className="text-emerald-500">{Math.round(stats.communicationAvg)}%</span>
            </div>
            <Progress value={stats.communicationAvg} className="h-3 [&>div]:bg-emerald-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
