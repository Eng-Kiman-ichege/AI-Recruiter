"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Search, Menu, X, BrainCircuit } from "lucide-react"
import { Show, UserButton, SignInButton } from "@clerk/nextjs"

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl"
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30">
            <BrainCircuit className="text-primary w-6 h-6" />
          </div>
          <span className="text-xl font-bold font-heading tracking-tight">InterviewIQ</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</Link>
          <Link href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">How it Works</Link>
          <Link href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
          <Link href="#faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">FAQ</Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Show when="signed-out">
            <SignInButton mode="modal">
              <Button variant="ghost" className="text-sm font-medium cursor-pointer">Log in</Button>
            </SignInButton>
            <Link href="/sign-up">
              <Button className="rounded-full px-6 shadow-lg shadow-primary/20 cursor-pointer">Get Started</Button>
            </Link>
          </Show>
          <Show when="signed-in">
            <Link href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mr-2">
              Dashboard
            </Link>
            <UserButton />
          </Show>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-20 left-0 right-0 bg-black border-b border-white/5 p-6 flex flex-col gap-6"
        >
          <Link href="#features" onClick={() => setIsOpen(false)}>Features</Link>
          <Link href="#how-it-works" onClick={() => setIsOpen(false)}>How it Works</Link>
          <Link href="#pricing" onClick={() => setIsOpen(false)}>Pricing</Link>
          <div className="flex flex-col gap-3">
            <Show when="signed-out">
              <Link href="/sign-in">
                <Button variant="outline" className="w-full">Log in</Button>
              </Link>
              <Link href="/sign-up">
                <Button className="w-full">Get Started</Button>
              </Link>
            </Show>
            <Show when="signed-in">
              <Link href="/dashboard">
                <Button variant="outline" className="w-full">Dashboard</Button>
              </Link>
              <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl mt-2">
                <UserButton showName />
              </div>
            </Show>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
