"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { CheckCircle2, MessageCircle, TrendingUp } from "lucide-react"

export function AIFeedbackShowcase() {
  return (
    <section className="py-24 bg-black relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-sm font-medium mb-6">
              <TrendingUp className="w-4 h-4" />
              Advanced Analytics
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6 leading-tight">
              Actionable Feedback That <br />
              <span className="text-primary">Actually</span> Works
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Don't just practice, improve. Our AI provides granular feedback on your communication style, 
              technical accuracy, and confidence levels.
            </p>

            <div className="space-y-6">
              {[
                {
                  title: "Detailed Competency Scoring",
                  desc: "Visualize your performance across 5 key areas: Leadership, Problem Solving, Communication, Domain Knowledge, and Strategic Thinking.",
                  icon: CheckCircle2
                },
                {
                  title: "Sample 'Better' Answers",
                  desc: "Not sure how to improve? We provide tailored examples of how you could have answered each question more effectively.",
                  icon: MessageCircle
                }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1 w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <item.icon className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="relative rounded-2xl border border-white/10 bg-black/40 p-3 md:p-6 backdrop-blur-3xl overflow-hidden shadow-2xl">
              <Image 
                src="/feedback-mockup.png" 
                alt="AI Feedback Dashboard" 
                width={800} 
                height={600}
                className="rounded-xl border border-white/5"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
