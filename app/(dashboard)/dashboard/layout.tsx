"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { UserButton } from "@clerk/nextjs"
import { 
  LayoutDashboard, 
  History, 
  FileText, 
  Settings, 
  BrainCircuit, 
  ChevronLeft,
  ChevronRight,
  PlusCircle,
  BarChart3,
  Search,
  Bell
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const sidebarItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: PlusCircle, label: "Start Interview", href: "/dashboard/start" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
  { icon: History, label: "History", href: "/dashboard/history" },
  { icon: FileText, label: "Resumes", href: "/dashboard/resumes" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isCollapsed, setIsCollapsed] = React.useState(false)
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isCollapsed ? 80 : 280 }}
        className={cn(
          "relative border-r border-white/5 bg-black/40 backdrop-blur-xl flex flex-col z-30 transition-all",
          isCollapsed ? "items-center" : "p-6"
        )}
      >
        <div className={cn("flex items-center gap-3 mb-10", isCollapsed ? "justify-center mt-6" : "")}>
          <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30 shrink-0">
            <BrainCircuit className="text-primary w-6 h-6" />
          </div>
          {!isCollapsed && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl font-bold font-heading tracking-tight"
            >
              InterviewIQ
            </motion.span>
          )}
        </div>

        <nav className="flex flex-col gap-2 flex-1 w-full">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all group relative overflow-hidden",
                    isActive 
                      ? "bg-primary/10 text-primary font-medium" 
                      : "text-muted-foreground hover:bg-white/5 hover:text-white"
                  )}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="active-pill"
                      className="absolute left-0 w-1 h-6 bg-primary rounded-r-full"
                    />
                  )}
                  <item.icon className={cn("w-5 h-5 shrink-0", isActive ? "text-primary" : "group-hover:text-primary transition-colors")} />
                  {!isCollapsed && (
                    <span className="truncate">{item.label}</span>
                  )}
                  {isCollapsed && isActive && (
                    <div className="absolute right-2 w-1.5 h-1.5 bg-primary rounded-full" />
                  )}
                </motion.div>
              </Link>
            )
          })}
        </nav>

        <div className={cn("pt-6 border-t border-white/5", isCollapsed ? "w-full flex justify-center pb-6" : "")}>
          <div className={cn("flex items-center gap-3", isCollapsed ? "justify-center" : "px-2")}>
            <UserButton />
            {!isCollapsed && (
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-medium leading-none truncate">Account</span>
                <span className="text-xs text-muted-foreground mt-1">Manage Profile</span>
              </div>
            )}
          </div>
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-24 w-6 h-6 bg-primary rounded-full flex items-center justify-center border border-background shadow-lg hover:scale-110 transition-transform z-40"
        >
          {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </button>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Top Header */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-black/20 backdrop-blur-sm z-20">
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-full px-4 py-2 w-96 max-w-full">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search sessions, resumes..." 
              className="bg-transparent border-none outline-none text-sm w-full placeholder:text-muted-foreground"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/5">
              <Bell className="w-5 h-5 text-muted-foreground" />
            </Button>
            <div className="h-8 w-px bg-white/10" />
            <Link href="/dashboard/start">
              <Button className="rounded-full px-6 shadow-lg shadow-primary/20">
                <PlusCircle className="w-4 h-4 mr-2" />
                New Interview
              </Button>
            </Link>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto relative p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-7xl mx-auto h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
