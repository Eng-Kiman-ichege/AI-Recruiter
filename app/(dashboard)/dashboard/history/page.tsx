"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { History, Search, Calendar, ChevronRight, BarChart3, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || ""
const supabase = createClient(supabaseUrl, supabaseKey)

export default function HistoryPage() {
  const [interviews, setInterviews] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchHistory = async () => {
      const { data, error } = await supabase
        .from('interviews')
        .select('*, interview_feedback(score)')
        .order('created_at', { ascending: false })
      
      if (data) setInterviews(data)
      setLoading(false)
    }
    fetchHistory()
  }, [])

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading">Interview History</h1>
          <p className="text-muted-foreground">Review your past sessions and track your progress.</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search roles or industries..." className="pl-10 bg-white/5 border-white/10 rounded-full" />
        </div>
      </header>

      {loading ? (
        <div className="flex justify-center p-20"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>
      ) : interviews.length === 0 ? (
        <Card className="glass border-white/10 bg-white/5 rounded-3xl p-12 text-center">
          <History className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-bold mb-2">No history yet</h3>
          <p className="text-muted-foreground mb-6">Complete your first interview to see your results here.</p>
          <Link href="/dashboard/start">
            <Button className="rounded-full shadow-lg shadow-primary/20">Start Interview</Button>
          </Link>
        </Card>
      ) : (
        <div className="grid gap-4">
          {interviews.map((interview) => (
            <motion.div
              key={interview.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Link href={`/dashboard/session/${interview.id}/results`}>
                <Card className="glass border-white/10 hover:border-primary/30 transition-all cursor-pointer group rounded-2xl overflow-hidden">
                  <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <BarChart3 className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-bold text-lg">{interview.role}</h3>
                          <Badge variant="outline" className="text-[10px] bg-white/5 border-white/10">{interview.type}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {new Date(interview.created_at).toLocaleDateString()}</span>
                          <span className="flex items-center gap-1 text-primary"><Star className="w-3.5 h-3.5" /> {interview.industry}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">Score</p>
                        <p className="text-2xl font-bold font-heading text-white">
                          {interview.interview_feedback?.[0]?.score ? (interview.interview_feedback[0].score / 10).toFixed(1) : '-'}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
