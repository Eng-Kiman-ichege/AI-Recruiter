"use client"

import { motion } from "framer-motion"
import { 
  Brain, 
  History, 
  ShieldCheck, 
  Sparkles, 
  UserCircle, 
  Video 
} from "lucide-react"

const features = [
  {
    title: "Adaptive Questioning",
    description: "Our AI listens to your answers and asks deep follow-up questions just like a real human interviewer would.",
    icon: Brain
  },
  {
    title: "Resume-Aware",
    description: "The AI knows your background. It will ask questions about your specific projects and career transitions.",
    icon: UserCircle
  },
  {
    title: "Real-time Feedback",
    description: "Get instant metrics on your speaking pace, sentiment, and keyword usage during the interview.",
    icon: Sparkles
  },
  {
    title: "Performance Tracking",
    description: "See your progress over time with detailed charts showing improvement in different competency areas.",
    icon: History
  },
  {
    title: "Realistic Simulations",
    description: "High-fidelity video avatars and voice processing create an immersive interview environment.",
    icon: Video
  },
  {
    title: "Interview Scoring",
    description: "Receive a comprehensive score based on industry standards and the specific job requirements.",
    icon: ShieldCheck
  }
]

export function Features() {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full -z-10" />

      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Cutting-Edge AI
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold font-heading mb-6"
          >
            Powerful Features for <span className="text-primary">Success</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Everything you need to prepare, practice, and land your next big role.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-8 border border-primary/10 group-hover:scale-110 transition-transform">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold font-heading mb-4">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
