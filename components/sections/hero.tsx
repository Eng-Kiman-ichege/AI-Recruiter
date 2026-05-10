"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Play, Star } from "lucide-react"
import { Show } from "@clerk/nextjs"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-primary/20 blur-[120px] rounded-full opacity-50 -z-10" />
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full -z-10" />

      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="outline" className="mb-6 px-4 py-1.5 rounded-full bg-white/5 border-white/10 backdrop-blur-sm">
            <Star className="w-3.5 h-3.5 mr-2 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-medium">Trusted by 50,000+ job seekers</span>
          </Badge>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
            Master the Art of <br /> 
            <span className="text-primary">AI-Powered</span> Interviews
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
            Realistic, adaptive AI simulations tailored to your dream role. Get instant feedback, 
            scoring, and the confidence to ace any interview.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 w-full px-4 sm:px-0">
            <Show when="signed-in">
              <Link href="/dashboard/start" className="w-full sm:w-auto">
                <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-2xl shadow-primary/20 w-full">
                  Start Your First Interview
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </Show>
            <Show when="signed-out">
              <Link href="/sign-up" className="w-full sm:w-auto">
                <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-2xl shadow-primary/20 w-full">
                  Start Your First Interview
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </Show>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-white/10 hover:bg-white/5 w-full sm:w-auto">
              <Play className="mr-2 w-5 h-5 fill-current" />
              Watch Demo
            </Button>
          </div>
        </motion.div>

        {/* Mock UI Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="relative rounded-2xl border border-white/10 bg-black/40 p-2 md:p-4 backdrop-blur-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-purple-500/10 pointer-events-none" />
            <Image 
              src="/hero-mockup.png" 
              alt="InterviewIQ Interface" 
              width={1200} 
              height={800}
              className="rounded-xl border border-white/5 shadow-inner"
            />
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/20 blur-3xl rounded-full -z-10" />
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-500/20 blur-3xl rounded-full -z-10" />
        </motion.div>
      </div>
    </section>
  )
}
