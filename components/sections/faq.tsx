"use client"

import { motion } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "How realistic are the AI interviews?",
    answer: "Extremely. Our AI is trained on thousands of real-world interviews and job descriptions. It uses advanced natural language processing to understand your context and ask relevant follow-up questions in real-time."
  },
  {
    question: "Can I use my own resume for the interview?",
    answer: "Yes! You can upload your PDF resume, and the AI will analyze it to ask questions about your specific experience, technologies, and achievements."
  },
  {
    question: "Does it support technical coding interviews?",
    answer: "Absolutely. We support technical interviews for various roles including Software Engineering (React, Node, Python, Java, etc.), Data Science, and Product Management."
  },
  {
    question: "What kind of feedback do I get?",
    answer: "You get a comprehensive report including an overall score, a breakdown of key competencies, sentiment analysis, speaking pace, and specific suggestions on how to improve each answer."
  },
  {
    question: "Is my data secure?",
    answer: "Yes, we take privacy seriously. Your resumes and interview recordings are encrypted and used only to provide your personal feedback. We never share your data with third parties."
  }
]

export function FAQ() {
  return (
    <section id="faq" className="py-24 relative bg-black/20">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold font-heading mb-4"
          >
            Frequently Asked <span className="text-primary">Questions</span>
          </motion.h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to know about InterviewIQ.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border border-white/10 bg-white/[0.02] rounded-2xl px-6">
                <AccordionTrigger className="text-left font-bold text-lg py-6 hover:no-underline hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
