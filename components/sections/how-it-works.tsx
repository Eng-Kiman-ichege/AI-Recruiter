"use client"

import { motion } from "framer-motion"
import { FileText, Settings2, PlayCircle, BarChart3 } from "lucide-react"

const steps = [
  {
    title: "Upload Context",
    description: "Paste a job description and upload your resume. Our AI analyzes the requirements and your background.",
    icon: FileText,
    number: "01"
  },
  {
    title: "Configure Session",
    description: "Choose interview type, difficulty level, and specific technologies you want to be tested on.",
    icon: Settings2,
    number: "02"
  },
  {
    title: "Practice Mock Interview",
    description: "Engage in a realistic AI-powered video or voice interview with adaptive follow-up questions.",
    icon: PlayCircle,
    number: "03"
  },
  {
    title: "Review & Improve",
    description: "Get a detailed score, section-by-section feedback, and actionable tips to improve.",
    icon: BarChart3,
    number: "04"
  }
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold font-heading mb-4"
            >
              How it <span className="text-primary">Works</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-lg"
            >
              Four simple steps to transform your interview performance from average to exceptional.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="hidden md:block"
          >
            <div className="px-6 py-2 rounded-full border border-primary/20 bg-primary/10 text-primary font-medium text-sm">
              Streamlined Process
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-full h-[1px] bg-gradient-to-r from-primary/30 to-transparent z-0" />
              )}
              
              <div className="relative z-10">
                <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:bg-primary/10 group-hover:border-primary/30 transition-all duration-300 shadow-xl shadow-black/50">
                  <step.icon className="w-10 h-10 text-primary" />
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-black border border-white/10 flex items-center justify-center text-xs font-bold font-heading text-primary">
                    {step.number}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold font-heading mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
