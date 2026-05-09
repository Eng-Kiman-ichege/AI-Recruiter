import { SignUp } from "@clerk/nextjs";
import { BrainCircuit } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-primary/20 blur-[120px] rounded-full opacity-50" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full" />
      
      <div className="relative z-10 flex flex-col items-center gap-8 px-6">
        <Link href="/" className="flex items-center gap-2 mb-4">
          <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center border border-primary/30">
            <BrainCircuit className="text-primary w-7 h-7" />
          </div>
          <span className="text-2xl font-bold font-heading tracking-tight text-white">InterviewIQ</span>
        </Link>

        <div className="glass p-2 rounded-[2.5rem] border border-white/10 shadow-2xl">
          <SignUp 
            appearance={{
              elements: {
                card: "bg-transparent shadow-none border-none",
                headerTitle: "text-2xl font-bold text-white",
                headerSubtitle: "text-muted-foreground",
                formButtonPrimary: "bg-primary hover:bg-primary/90 text-sm h-11 rounded-xl shadow-lg shadow-primary/20",
                socialButtonsBlockButton: "bg-white/5 border-white/10 hover:bg-white/10 text-white rounded-xl h-11",
                socialButtonsBlockButtonText: "text-white font-medium",
                formFieldLabel: "text-white/70",
                formFieldInput: "bg-white/5 border-white/10 text-white rounded-xl h-11 focus:border-primary transition-all",
                footerActionText: "text-muted-foreground",
                footerActionLink: "text-primary hover:text-primary/80 font-bold",
              }
            }}
          />
        </div>

        <p className="text-sm text-muted-foreground">
          Join 50,000+ candidates mastering their interviews.
        </p>
      </div>
    </div>
  );
}
