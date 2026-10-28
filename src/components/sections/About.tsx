import { useState } from "react"
import { motion } from "framer-motion"
import { Code2, Sparkles, Terminal, Award, FolderGit2, Cpu } from "lucide-react"
import { SectionHeading } from "@/components/SectionHeading"
import { snappySpring } from "@/lib/animations"

const facts = [
  { label: "Experience", value: "1+ Years", icon: Sparkles, detail: "Full-Stack & Backend" },
  { label: "Production Apps", value: "5+", icon: FolderGit2, detail: "Shipped & Maintained" },
  { label: "Tech Stack", value: "15+", icon: Cpu, detail: "Modern Frameworks" },
  { label: "Open Source", value: "50+", icon: Award, detail: "Contributions & PRs" },
]

export default function About() {
  const [imgError, setImgError] = useState(false)

  return (
    <section id="about" className="py-24 px-4 bg-muted/30">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="About Me"
          subtitle="Behind the code: my background, engineering approach, and what drives my work."
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Professional Photo Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={snappySpring}
            className="md:col-span-5 flex justify-center will-change-transform"
          >
            <div className="relative group w-72 h-80 sm:w-80 sm:h-96">
              {/* Ambient Glow */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-highlight/25 via-highlight/10 to-transparent blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Main Card Container */}
              <div className="relative w-full h-full rounded-2xl border border-border/80 dark:border-white/10 bg-card overflow-hidden shadow-xl transition-transform duration-300 group-hover:-translate-y-1">
                {!imgError ? (
                  <img
                    src="/Parmesh_Bhatt.jpg"
                    alt="Parmesh Bhatt — Full Stack Software Engineer"
                    loading="lazy"
                    decoding="async"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  /* Sleek Vector Illustration Fallback */
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-card via-muted/40 to-card p-6 text-center">
                    <div className="h-20 w-20 rounded-2xl bg-highlight/10 border border-highlight/30 flex items-center justify-center text-highlight shadow-inner mb-4">
                      <Terminal className="h-10 w-10 text-highlight" />
                    </div>
                    <p className="text-xl font-bold tracking-tight text-foreground">Parmesh Bhatt</p>
                    <p className="text-xs text-muted-foreground mt-1">Full-Stack Software Engineer</p>
                    <div className="flex items-center gap-1.5 mt-4 px-3 py-1 rounded-full bg-highlight/10 text-highlight text-xs font-medium">
                      <Code2 className="h-3.5 w-3.5" />
                      <span>TypeScript • React • NestJS</span>
                    </div>
                  </div>
                )}

                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80" />

                {/* Status Pill Card */}
                <div className="absolute bottom-3 inset-x-3 p-3 rounded-xl bg-background/90 dark:bg-card/90 backdrop-blur-md border border-border/80 shadow-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                    </span>
                    <span className="text-xs font-medium text-foreground">Software Engineer</span>
                  </div>
                  <span className="text-[11px] font-semibold text-highlight tracking-wide uppercase">
                    1+ YOE
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text Content & Structured Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ ...snappySpring, delay: 0.05 }}
            className="md:col-span-7 space-y-5 will-change-transform"
          >
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Who I Am
            </h3>

            <p className="leading-7 text-muted-foreground">
              I'm a Software Engineer driven by curiosity, continuous learning, and a desire to create products that people genuinely enjoy using. I focus on solving real-world problems with simplicity, reliability, and thoughtful design.
            </p>

            <p className="leading-7 text-muted-foreground">
              I develop scalable, user-centered applications with clean architecture, maintainable code, and intuitive experiences. Whether I'm building a SaaS platform, designing APIs, or creating developer tools, I strive to balance functionality, performance, and usability.
            </p>

            <p className="leading-7 text-muted-foreground">
              Beyond writing code, I enjoy exploring emerging technologies, refining my engineering practices, and contributing to the developer community. I believe great software isn't just about technology—it's about making people's work easier, more organized, and more meaningful.
            </p>

            {/* Facts Grid with subtle hover-lift */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
              {facts.map((fact, i) => {
                const Icon = fact.icon
                return (
                  <motion.div
                    key={fact.label}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{
                      y: -4,
                      transition: { duration: 0.2, ease: "easeOut" },
                    }}
                    transition={{
                      ...snappySpring,
                      delay: 0.08 + i * 0.035,
                    }}
                    className="group rounded-xl border border-border/80 dark:border-white/10 bg-card p-3.5 shadow-sm hover:border-orange-500/40 hover:shadow-[0_8px_25px_-5px_rgba(249,115,22,0.18)] transition-all duration-300 will-change-transform"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl font-extrabold bg-gradient-to-r from-orange-500 via-orange-400 to-amber-400 bg-clip-text text-transparent">
                        {fact.value}
                      </span>
                      <Icon className="h-4 w-4 text-muted-foreground/70 group-hover:text-orange-500 transition-colors" />
                    </div>
                    <p className="text-xs font-semibold text-foreground">{fact.label}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{fact.detail}</p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
