"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check, Sparkles } from "lucide-react"

const tiers = [
  {
    name: "Free",
    price: "$0",
    desc: "Perfect for a quick practice before your next interview.",
    features: [
      "2 AI Interview Sessions",
      "Basic Performance Score",
      "Behavioral Questions only",
      "Email Support"
    ],
    cta: "Start for Free",
    popular: false
  },
  {
    name: "Pro",
    price: "$29",
    desc: "Everything you need to master your interview skills.",
    features: [
      "Unlimited AI Interviews",
      "Job-Specific Simulations",
      "Technical & System Design",
      "Detailed Feedback Reports",
      "Resume Optimization Tips",
      "Priority Support"
    ],
    cta: "Go Pro",
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "For recruitment teams and career coaching platforms.",
    features: [
      "Custom Interview Scenarios",
      "Team Management",
      "API Access",
      "Whitelabeling Options",
      "Dedicated Account Manager",
      "SLA Support"
    ],
    cta: "Contact Sales",
    popular: false
  }
]

export function Pricing() {
  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold font-heading mb-4"
          >
            Simple, <span className="text-primary">Transparent</span> Pricing
          </motion.h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose the plan that's right for your career goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative p-8 rounded-3xl border ${tier.popular ? 'bg-white/10 border-primary shadow-2xl shadow-primary/20 scale-105' : 'bg-white/[0.03] border-white/10'} flex flex-col`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-white text-xs font-bold flex items-center gap-1 uppercase tracking-wider">
                  <Sparkles className="w-3 h-3" />
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-bold font-heading mb-2">{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  {tier.price !== "Custom" && <span className="text-muted-foreground">/month</span>}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{tier.desc}</p>
              </div>

              <div className="space-y-4 mb-10 flex-1">
                {tier.features.map((feature, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <div className={`mt-1 rounded-full p-0.5 ${tier.popular ? 'bg-primary/20 text-primary' : 'bg-white/10 text-white/50'}`}>
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                variant={tier.popular ? "default" : "outline"} 
                className={`w-full h-12 rounded-xl font-bold ${tier.popular ? 'shadow-lg shadow-primary/20' : ''}`}
              >
                {tier.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
