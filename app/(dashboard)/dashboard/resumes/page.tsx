"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { 
  FileText, 
  Upload, 
  MoreVertical, 
  Download, 
  Trash2, 
  Eye,
  Plus,
  Search,
  CheckCircle2,
  Clock
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ResumesPage() {
  return (
    <div className="space-y-8 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading">Resume Manager</h1>
          <p className="text-muted-foreground text-sm">Upload and manage resumes for AI-tailored interviews.</p>
        </div>
        <Button className="rounded-full px-6 shadow-lg shadow-primary/20">
          <Upload className="w-4 h-4 mr-2" />
          Upload New Resume
        </Button>
      </header>

      <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-4 py-2 max-w-md">
        <Search className="w-4 h-4 text-muted-foreground" />
        <input 
          type="text" 
          placeholder="Search resumes..." 
          className="bg-transparent border-none outline-none text-sm w-full"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Upload Card */}
        <Card className="glass border-dashed border-white/20 rounded-3xl overflow-hidden hover:border-primary/50 transition-all cursor-pointer group h-[200px]">
          <CardContent className="h-full flex flex-col items-center justify-center gap-4 p-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Plus className="w-6 h-6 text-primary" />
            </div>
            <p className="font-bold">Add New Resume</p>
          </CardContent>
        </Card>

        {/* Resume Items */}
        {[
          { name: "Software_Eng_Google.pdf", date: "2 days ago", size: "1.2 MB", status: "Active" },
          { name: "Frontend_React_v3.pdf", date: "1 week ago", size: "840 KB", status: "Archived" }
        ].map((resume, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="glass border-white/10 rounded-3xl overflow-hidden hover:bg-white/[0.05] transition-all group">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30">
                    <FileText className="text-primary w-6 h-6" />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-black/90 border-white/10 backdrop-blur-xl">
                      <DropdownMenuItem className="gap-2 focus:bg-primary/20">
                        <Eye className="w-4 h-4" /> View
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 focus:bg-primary/20">
                        <Download className="w-4 h-4" /> Download
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 focus:bg-destructive/20 text-destructive">
                        <Trash2 className="w-4 h-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <h3 className="font-bold text-lg mb-1 truncate">{resume.name}</h3>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs text-muted-foreground">{resume.size}</span>
                  <div className="w-1 h-1 rounded-full bg-white/20" />
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {resume.date}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <Badge variant={resume.status === "Active" ? "default" : "secondary"} className="rounded-full px-3">
                    {resume.status === "Active" && <CheckCircle2 className="w-3 h-3 mr-1" />}
                    {resume.status}
                  </Badge>
                  <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10 rounded-full h-8">
                    Use for Session
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
