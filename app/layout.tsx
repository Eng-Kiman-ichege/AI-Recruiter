import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { cn } from "@/lib/utils";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InterviewIQ | AI-Powered Interview Simulator",
  description: "Master your next job interview with InterviewIQ. Realistic AI simulations, adaptive questioning, and instant feedback.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={cn(inter.variable, outfit.variable, "antialiased font-sans bg-background text-foreground selection:bg-primary/20 selection:text-primary")}>
        <NextThemesProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <ClerkProvider
            appearance={{
              baseTheme: dark,
              variables: { colorPrimary: '#1d4ed8' },
            }}
          >
            <TooltipProvider>{children}</TooltipProvider>
          </ClerkProvider>
        </NextThemesProvider>
      </body>
    </html>
  );
}
