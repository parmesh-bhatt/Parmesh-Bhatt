import { useState, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion"
import { ArrowUp } from "lucide-react"
import Navbar from "@/components/Navbar"
import Hero from "@/components/sections/Hero"
import About from "@/components/sections/About"
import Skills from "@/components/sections/Skills"
import Projects from "@/components/sections/Projects"
import Experience from "@/components/sections/Experience"
import Education from "@/components/sections/Education"
import Resume from "@/components/sections/Resume"
import Contact from "@/components/sections/Contact"
import { Toaster } from "@/components/ui/sonner"
import { smoothEase } from "@/lib/animations"

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  // Framer Motion Scroll Progress
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 25,
    restDelta: 0.001,
  })

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-500 via-orange-400 to-amber-400 origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Background Grid Pattern Overlay */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-grid-pattern opacity-[0.55] dark:opacity-[0.25]" />

      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Resume />
        <Contact />
      </main>
      <footer className="relative z-10 border-t border-border bg-background/50 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Parmesh Bhatt. All rights reserved.
          </p>
        </div>
      </footer>

      <Toaster position="bottom-right" richColors />

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 15 }}
            transition={{ duration: 0.3, ease: smoothEase }}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white shadow-lg sheryians-btn-glow hover:opacity-90 transition-all cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
