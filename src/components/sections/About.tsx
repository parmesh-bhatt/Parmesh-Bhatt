import { motion } from "framer-motion"
import { User } from "lucide-react"
import { SectionHeading } from "@/components/SectionHeading"

const facts = [
  { label: "Experience", value: "1+ Years" },
  { label: "Projects", value: "5+" },
  { label: "Technologies", value: "10+" },
  { label: "Contributions", value: "50+" },
]

export default function About() {
  return (
    <section id="about" className="py-24 px-4 bg-muted/30">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="About Me"
          subtitle="Passionate about building elegant, scalable software that makes a real-world impact."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          {/* Photo placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, x: -24 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ type: "spring", stiffness: 55, damping: 16 }}
            className="flex justify-center"
          >
            <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-2xl border-2 border-highlight/30 bg-muted flex items-center justify-center overflow-hidden">
              <img
                src="/Parmesh_Bhatt.jpg"
                alt="Parmesh Bhatt"
                className="absolute inset-0 w-full h-full object-cover z-10"
              />
              <div className="flex flex-col items-center gap-3 text-muted-foreground">
                <User className="h-20 w-20 opacity-40" />
                <p className="text-sm opacity-60">Add your photo here</p>
              </div>
              <div className="absolute inset-0 rounded-2xl ring-1 ring-highlight/20 z-20" />
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ type: "spring", stiffness: 55, damping: 16, delay: 0.1 }}
            className="space-y-5"
          >
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Who I Am</h3>
            <p className="leading-7 text-muted-foreground">
              I'm a Software Engineer passionate about building software that solves real-world
              problems with simplicity, reliability, and thoughtful design. My journey has been
              driven by curiosity, continuous learning, and a desire to create products that people
              genuinely enjoy using.
            </p>
            <p className="leading-7 text-muted-foreground">
              I focus on developing scalable, user-centered applications with clean architecture,
              maintainable code, and intuitive experiences. Whether I'm building a SaaS platform,
              designing APIs, or creating developer tools, I strive to balance functionality,
              performance, and usability.
            </p>
            <p className="leading-7 text-muted-foreground">
              Beyond writing code, I enjoy exploring emerging technologies, refining my engineering
              practices, and contributing to the developer community. I believe great software isn't
              just about technology—it's about making people's work easier, more organized, and more
              meaningful.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              {facts.map((fact, i) => (
                <motion.div
                  key={fact.label}
                  initial={{ opacity: 0, y: 12, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 65,
                    damping: 16,
                    delay: 0.2 + i * 0.08,
                  }}
                  className="rounded-xl border border-border bg-card p-4"
                >
                  <p className="text-2xl font-bold text-highlight">{fact.value}</p>
                  <p className="text-sm text-muted-foreground">{fact.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
