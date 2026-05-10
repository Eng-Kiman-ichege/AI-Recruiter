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
  Bell,
  Menu,
  X
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
  const [isCollapsed, setIsCollapsed] = React.useState(false) // Default to open on desktop
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const pathname = usePathname()

  // Close mobile menu on route change
  React.useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <div className="flex min-h-screen bg-background text-foreground overflow-hidden">
      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          width: isMobileMenuOpen ? 260 : (isCollapsed ? 80 : 260)
        }}
        className={cn(
          "fixed inset-y-0 left-0 z-50 md:relative border-r border-white/5 bg-black/95 md:bg-black/40 backdrop-blur-xl flex flex-col transition-all overflow-hidden shrink-0",
          (isCollapsed && !isMobileMenuOpen) ? "items-center" : "items-start",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className={cn("flex items-center gap-3 mb-10 w-full p-6", (isCollapsed && !isMobileMenuOpen) ? "justify-center p-0 mt-6" : "")}>
          <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30 shrink-0 relative">
            <BrainCircuit className="text-primary w-6 h-6" />
          </div>
          {(!isCollapsed || isMobileMenuOpen) && (
            <div className="flex items-center justify-between w-full">
              <span className="text-xl font-bold font-heading tracking-tight">InterviewIQ</span>
              <button 
                className="md:hidden p-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-muted-foreground hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        <nav className={cn("flex flex-col gap-2 flex-1 w-full", (isCollapsed && !isMobileMenuOpen) ? "px-3" : "px-4")}>
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "flex items-center gap-3 py-3 rounded-xl transition-all group relative overflow-hidden",
                    (isCollapsed && !isMobileMenuOpen) ? "justify-center px-0" : "px-4",
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
                  {(!isCollapsed || isMobileMenuOpen) && (
                    <span className="truncate whitespace-nowrap">{item.label}</span>
                  )}
                  {isCollapsed && !isMobileMenuOpen && isActive && (
                    <div className="absolute right-2 w-1.5 h-1.5 bg-primary rounded-full" />
                  )}
                </motion.div>
              </Link>
            )
          })}
        </nav>

        <div className={cn("border-t border-white/5 w-full", (isCollapsed && !isMobileMenuOpen) ? "p-4 flex justify-center" : "p-6")}>
          <div className={cn("flex items-center gap-3 w-full", (isCollapsed && !isMobileMenuOpen) ? "justify-center" : "")}>
            <div>
              <UserButton />
            </div>
            {(!isCollapsed || isMobileMenuOpen) && (
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-medium leading-none truncate text-white">Account</span>
                <span className="text-xs text-muted-foreground mt-1">Manage Profile</span>
              </div>
            )}
          </div>
        </div>

        {/* Expand/Collapse Toggle (only show on desktop) */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-24 w-6 h-6 bg-primary rounded-full hidden md:flex items-center justify-center border border-background shadow-lg hover:scale-110 transition-transform z-40"
        >
          {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </button>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden min-w-0 w-full">
        {/* Top Header */}
        <header className="h-16 md:h-20 border-b border-white/5 flex items-center justify-between px-4 md:px-8 bg-black/20 backdrop-blur-sm z-20">
          <div className="flex items-center gap-3 md:gap-4 w-full md:w-auto">
            {/* Mobile Hamburger */}
            <button 
              className="md:hidden p-2 -ml-2 rounded-lg text-muted-foreground hover:bg-white/5 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            {/* Search Bar */}
            <div className="flex-1 md:flex-initial flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-4 py-2 w-full md:w-48 lg:w-96 transition-all">
              <Search className="w-4 h-4 text-muted-foreground shrink-0" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent border-none outline-none text-sm w-full placeholder:text-muted-foreground"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3 md:gap-4 shrink-0 pl-2">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/5 hidden sm:flex">
              <Bell className="w-5 h-5 text-muted-foreground" />
            </Button>
            <div className="h-8 w-px bg-white/10 hidden sm:block" />
            <Link href="/dashboard/start">
              <Button className="rounded-full px-0 w-9 h-9 md:px-6 md:w-auto md:h-10 shadow-lg shadow-primary/20 text-xs md:text-sm flex items-center justify-center">
                <PlusCircle className="w-4 h-4 md:mr-2 shrink-0" />
                <span className="hidden md:inline whitespace-nowrap">New Interview</span>
              </Button>
            </Link>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto relative p-4 md:p-8 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-7xl mx-auto h-full w-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
