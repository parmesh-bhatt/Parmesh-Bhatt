import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowDown, Mail, Circle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  )
}

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 64
    window.scrollTo({ top, behavior: "smooth" })
  }
}

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/parmesh-bhatt",
    handle: "parmesh-bhatt",
    Icon: GitHubIcon,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/parmesh-bhatt",
    handle: "parmesh-bhatt",
    Icon: LinkedInIcon,
  },
  {
    label: "X",
    href: "https://x.com/Parmesh_119",
    handle: "@Parmesh_119",
    Icon: XIcon,
  },
]

import { smoothEase, snappySpring } from "@/lib/animations"

const roles = ["Software Engineer", "Product Builder", "System Designer", "Problem Solver"]

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    const roleInterval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length)
    }, 4500)
    return () => clearInterval(roleInterval)
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-24 sm:pb-20 px-4 overflow-hidden"
    >
      {/* Left Cyber Matrix Dot Grid (Sheryians Inspired) */}
      <div
        aria-hidden="true"
        className="hidden xl:block pointer-events-none absolute left-6 2xl:left-14 top-1/2 -translate-y-1/2 select-none opacity-40 -z-10"
      >
        <div className="p-3 border-l border-t border-orange-500/20 rounded-tl-lg backdrop-blur-[1px]">
          <div className="grid grid-cols-5 gap-3 font-mono text-[10px] text-orange-500/30">
            {Array.from({ length: 30 }).map((_, i) => (
              <span
                key={i}
                className={i % 4 === 0 ? "text-orange-500/70 font-bold animate-pulse" : ""}
              >
                +
              </span>
            ))}
          </div>
          <p className="mt-3 text-[9px] font-mono tracking-widest text-orange-500/50 uppercase">
            SYS.01 // FULL-STACK
          </p>
        </div>
      </div>

      {/* Right Cyber Matrix Dot Grid (Sheryians Inspired) */}
      <div
        aria-hidden="true"
        className="hidden xl:block pointer-events-none absolute right-6 2xl:right-14 top-1/2 -translate-y-1/2 select-none opacity-40 -z-10"
      >
        <div className="p-3 border-r border-t border-orange-500/20 rounded-tr-lg backdrop-blur-[1px] text-right">
          <div className="grid grid-cols-5 gap-3 font-mono text-[10px] text-orange-500/30">
            {Array.from({ length: 30 }).map((_, i) => (
              <span
                key={i}
                className={i % 5 === 0 ? "text-orange-500/70 font-bold animate-pulse" : ""}
              >
                +
              </span>
            ))}
          </div>
          <p className="mt-3 text-[9px] font-mono tracking-widest text-orange-500/50 uppercase">
            ENV // PRODUCTION
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl text-center z-10">
        {/* Available for Opportunities Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={snappySpring}
          className="flex justify-center mb-6 will-change-transform"
        >
          <Badge
            variant="outline"
            className="gap-1.5 px-3 py-1 text-xs border-highlight/40 text-highlight bg-highlight/5 shadow-xs"
          >
            <Circle className="h-2 w-2 fill-green-500 text-green-500 animate-pulse" />
            Available for Opportunities
          </Badge>
        </motion.div>

        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...snappySpring, delay: 0.05 }}
          className="text-lg md:text-xl font-medium text-muted-foreground mb-2 tracking-wide will-change-transform"
        >
          Hi👋, I'm
        </motion.p>

        {/* Name — curtain reveal */}
        <div className="overflow-hidden mb-4">
          <motion.h1
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ ...snappySpring, delay: 0.09 }}
            className="scroll-m-20 text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight will-change-transform"
          >
            <span className="text-foreground">Parmesh </span>
            <span className="bg-gradient-to-r from-orange-500 via-orange-400 to-amber-400 bg-clip-text text-transparent">
              Bhatt
            </span>
          </motion.h1>
        </div>

        {/* Dynamic Role Transition */}
        <div className="h-10 flex items-center justify-center overflow-hidden mb-6">
          <AnimatePresence mode="wait">
            <motion.h2
              key={roles[roleIndex]}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: smoothEase }}
              className="text-lg md:text-xl font-medium text-muted-foreground flex justify-center tracking-wide"
            >
              {roles[roleIndex]}
            </motion.h2>
          </AnimatePresence>
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...snappySpring, delay: 0.15 }}
          className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed font-normal will-change-transform"
        >
          Passionate about crafting meaningful, scalable, and beautifully designed software that
          simplifies real-world challenges—blending modern full-stack engineering with purposeful
          impact.
        </motion.p>

        {/* CTAs with Sheryians Glowing Button & Shimmer */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...snappySpring, delay: 0.22 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-10 will-change-transform"
        >
          <motion.div
            whileHover={{ y: -2, transition: { duration: 0.2, ease: "easeOut" } }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              size="lg"
              className="relative overflow-hidden group bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-semibold px-7 py-3.5 rounded-xl sheryians-btn-glow transition-all duration-300 cursor-pointer border-0 shadow-lg"
              onClick={() => scrollTo("projects")}
            >
              View Featured Work
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1.5 transition-transform" />
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ y: -2, transition: { duration: 0.2, ease: "easeOut" } }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              size="lg"
              variant="outline"
              className="border-border hover:border-highlight/60 hover:bg-highlight/10 shadow-sm transition-all duration-300 cursor-pointer font-medium px-6 py-3.5 rounded-xl"
              onClick={() => scrollTo("contact")}
            >
              <Mail className="h-4 w-4 text-highlight mr-1.5" />
              Get In Touch
            </Button>
          </motion.div>
        </motion.div>

        {/* Social Cards matching Get In Touch */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...snappySpring, delay: 0.28 }}
          className="flex flex-wrap items-center justify-center gap-3 pt-2 will-change-transform"
        >
          {socialLinks.map(({ href, label, handle, Icon }, i) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...snappySpring, delay: 0.3 + i * 0.035 }}
              whileHover={{ y: -3, transition: { duration: 0.2, ease: "easeOut" } }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-border/80 dark:border-white/10 bg-card/80 backdrop-blur-sm hover:border-highlight/50 hover:bg-highlight/5 transition-all text-sm group shadow-sm will-change-transform"
            >
              <Icon className="h-4 w-4 text-foreground group-hover:text-highlight transition-colors shrink-0" />
              <div className="text-left">
                <span className="text-xs font-medium text-foreground group-hover:text-highlight transition-colors block leading-tight">
                  {label}
                </span>
                <span className="text-[10px] text-muted-foreground block leading-tight">
                  {handle}
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5, ease: smoothEase }}
        onClick={() => scrollTo("about")}
        aria-label="Scroll to About"
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-highlight transition-colors animate-bounce"
      >
        <ArrowDown className="h-5 w-5" />
      </motion.button>
    </section>
  )
}
