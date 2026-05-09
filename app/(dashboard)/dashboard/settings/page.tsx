"use client"

import * as React from "react"
import { UserProfile } from "@clerk/nextjs"
import { dark } from "@clerk/themes"

export default function SettingsPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 flex flex-col items-center">
      <header className="w-full mb-8">
        <h1 className="text-3xl font-bold font-heading">Account Settings</h1>
        <p className="text-muted-foreground">Manage your profile, security, and preferences.</p>
      </header>

      <div className="w-full flex justify-center">
        <UserProfile 
          routing="hash"
          appearance={{
            baseTheme: dark,
            elements: {
              card: "bg-black/40 border border-white/10 shadow-2xl backdrop-blur-xl rounded-[2rem]",
              navbar: "hidden", // Hide clerk navbar if desired, or keep it
              headerTitle: "text-white font-heading",
              headerSubtitle: "text-muted-foreground",
              profileSectionTitleText: "text-white",
              profileSectionPrimaryButton: "text-primary hover:bg-primary/10",
              badge: "bg-primary/20 text-primary border border-primary/30",
            }
          }}
        />
      </div>
    </div>
  )
}
