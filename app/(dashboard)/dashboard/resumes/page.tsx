"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { FileText, Download, Trash2, Plus, UploadCloud } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || ""
const supabase = createClient(supabaseUrl, supabaseKey)

export default function ResumesPage() {
  const [resumes, setResumes] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchResumes = async () => {
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (data) setResumes(data)
      setLoading(false)
    }
    fetchResumes()
  }, [])

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading">Resume Library</h1>
          <p className="text-muted-foreground">Manage the documents used for your AI interviews.</p>
        </div>
        <Link href="/dashboard/start">
          <Button className="rounded-full shadow-lg shadow-primary/20">
            <UploadCloud className="w-4 h-4 mr-2" />
            Upload New
          </Button>
        </Link>
      </header>

      {loading ? (
        <div className="flex justify-center p-20"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>
      ) : resumes.length === 0 ? (
        <Card className="glass border-white/10 bg-white/5 rounded-3xl p-12 text-center">
          <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-bold mb-2">No resumes found</h3>
          <p className="text-muted-foreground mb-6">Upload a resume during the interview setup to tailor the AI's questions.</p>
          <Link href="/dashboard/start">
            <Button variant="outline" className="rounded-full border-primary/30 text-primary">Start Setup</Button>
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <motion.div
              key={resume.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Card className="glass border-white/10 hover:border-primary/30 transition-all group rounded-2xl overflow-hidden h-full flex flex-col">
                <CardContent className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/20">Active</Badge>
                  </div>
                  
                  <h3 className="font-bold text-lg mb-1 truncate" title={resume.file_name}>{resume.file_name}</h3>
                  <p className="text-xs text-muted-foreground mb-6">
                    Uploaded on {new Date(resume.created_at).toLocaleDateString()}
                  </p>
                  
                  <div className="mt-auto flex gap-2">
                    <Button variant="outline" className="flex-1 rounded-xl bg-white/5 border-white/10 hover:bg-white/10 text-xs h-9">
                      <Download className="w-3.5 h-3.5 mr-2" />
                      View
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-xl border-rose-500/20 text-rose-500 hover:bg-rose-500 hover:text-white transition-all h-9 w-9">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
