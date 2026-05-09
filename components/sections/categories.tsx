"use client"

import { motion } from "framer-motion"
import { 
  Briefcase, 
  Code2, 
  MessageSquare, 
  Target, 
  Zap, 
  Cpu 
} from "lucide-react"

const categories = [
  {
    title: "Behavioral",
    description: "Master the STAR method with deep follow-up questions tailored to your experience.",
    icon: MessageSquare,
    color: "text-blue-500",
    bg: "bg-blue-500/10"
  },
  {
    title: "Technical",
    description: "Practice coding challenges and system design for React, Python, Next.js, and more.",
    icon: Code2,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10"
  },
  {
    title: "Situational",
    description: "Navigate complex workplace scenarios and show off your problem-solving skills.",
    icon: Zap,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10"
  },
  {
    title: "Career-Focused",
    description: "Align your career goals with the job description for a perfect culture fit.",
    icon: Target,
    color: "text-purple-500",
    bg: "bg-purple-500/10"
  },
  {
    title: "Job-Specific",
    description: "Paste any job description and let the AI tailor the entire interview to that role.",
    icon: Briefcase,
    color: "text-orange-500",
    bg: "bg-orange-500/10"
  },
  {
    title: "Deep Tech",
    description: "In-depth questioning on specific tech stacks, architectures, and best practices.",
    icon: Cpu,
    color: "text-pink-500",
    bg: "bg-pink-500/10"
  }
]

export function InterviewCategories() {
  return (
    <section className="py-24 bg-black/40 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white opacity-20 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold font-heading mb-4"
          >
            Interviews for Every <span className="text-primary">Need</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Whether you're a junior dev or a senior manager, our AI adapts to your level and role requirements.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-white/[0.07] transition-all group"
            >
              <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <h3 className="text-xl font-bold font-heading mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
