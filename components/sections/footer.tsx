"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, BrainCircuit, Code, Send, ExternalLink, Mail } from "lucide-react"
import Link from "next/link"
import { Show } from "@clerk/nextjs"

export function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-[3rem] bg-gradient-to-br from-primary/20 via-primary/5 to-purple-500/10 border border-primary/20 p-12 md:p-20 text-center overflow-hidden"
        >
          {/* Animated Background Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

          <h2 className="text-4xl md:text-6xl font-bold font-heading mb-8 relative z-10 leading-tight">
            Ready to Ace Your <br /> Next Interview?
          </h2>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto mb-10 relative z-10">
            Join 50,000+ candidates who have transformed their interview performance with InterviewIQ.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10 w-full px-4 sm:px-0">
            <Show when="signed-in">
              <Link href="/dashboard/start" className="w-full sm:w-auto">
                <Button size="lg" className="h-14 px-10 text-lg rounded-full shadow-2xl shadow-primary/20 w-full">
                  Get Started for Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </Show>
            <Show when="signed-out">
              <Link href="/sign-up" className="w-full sm:w-auto">
                <Button size="lg" className="h-14 px-10 text-lg rounded-full shadow-2xl shadow-primary/20 w-full">
                  Get Started for Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </Show>
            <Button size="lg" variant="outline" className="h-14 px-10 text-lg rounded-full border-white/10 hover:bg-white/5 w-full sm:w-auto">
              Talk to Sales
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="py-20 border-t border-white/5 bg-black/50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30">
                <BrainCircuit className="text-primary w-6 h-6" />
              </div>
              <span className="text-xl font-bold font-heading tracking-tight">InterviewIQ</span>
            </Link>
            <p className="text-muted-foreground leading-relaxed">
              Master the art of interviews with our realistic AI-powered simulator. 
              Designed for job seekers who want to stand out.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
                <Send className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
                <Code className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold font-heading mb-6">Platform</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">AI Interviewer</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Technical Practice</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Resume Analysis</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Feedback System</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold font-heading mb-6">Company</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Press</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold font-heading mb-6">Newsletter</h4>
            <p className="text-muted-foreground mb-6">Get interview tips and product updates delivered to your inbox.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 text-sm focus:outline-none focus:border-primary transition-colors"
              />
              <Button size="icon" className="shrink-0">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2026 InterviewIQ Inc. All rights reserved.</p>
          <div className="flex items-center gap-8">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-primary transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
