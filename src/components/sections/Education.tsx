import { motion } from "framer-motion"
import { GraduationCap, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { SectionHeading } from "@/components/SectionHeading"
import { snappySpring } from "@/lib/animations"

interface EducationItem {
  degree: string
  institution: string
  period: string
  description: string
  highlights: string[]
}

const educationItems: EducationItem[] = [
  {
    degree: "Bachelor of Technology — Information Technology",
    institution: "Charotar University of Science and Technology",
    period: "October 2021 – May 2025",
    description:
      "Focused on software engineering, data structures, and system design. Completed several real-world projects and hackathons.",
    highlights: [
      "Data Structures & Algorithms",
      "Database Management",
      "Operating Systems",
      "Computer Networks",
      "Software Engineering",
    ],
  },
  {
    degree: "12th Science - HSC",
    institution: "The Ambika High School, Gadat",
    period: "June 2019 – July 2021",
    description:
      "Completed higher secondary education with a focus on Science and Computer Science, laying the groundwork for a career in technology.",
    highlights: ["Mathematics", "Physics", "Chemistry"],
  },
]

export default function Education() {
  return (
    <section id="education" className="py-24 px-4">
      <div className="mx-auto max-w-4xl">
        <SectionHeading title="Education" subtitle="My academic background and qualifications." />

        <div className="space-y-6">
          {educationItems.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                ...snappySpring,
                delay: i * 0.04,
              }}
              whileHover={{
                y: -4,
                transition: { duration: 0.2, ease: "easeOut" },
              }}
              className="group relative overflow-hidden rounded-2xl border border-border/80 dark:border-white/10 bg-card p-6 md:p-7 shadow-sm hover:border-orange-500/40 hover:shadow-[0_12px_35px_-10px_rgba(249,115,22,0.18)] transition-all duration-300 will-change-transform"
            >
              {/* Ambient Card Corner Glow on Hover */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full bg-orange-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div className="flex items-start gap-3.5">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      ...snappySpring,
                      delay: i * 0.04 + 0.05,
                    }}
                    className="mt-0.5 rounded-xl bg-highlight/10 p-2.5 shrink-0 text-highlight"
                  >
                    <GraduationCap className="h-5 w-5" />
                  </motion.div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
                      {edu.degree}
                    </h3>
                    <p className="text-highlight text-sm font-semibold mt-0.5">{edu.institution}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground shrink-0 bg-muted/60 px-3 py-1 rounded-full border border-border/60">
                  <Calendar className="h-3.5 w-3.5 text-highlight" />
                  <span>{edu.period}</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed my-4">{edu.description}</p>

              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/50">
                {edu.highlights.map((item) => (
                  <Badge
                    key={item}
                    variant="outline"
                    className="text-xs font-medium bg-muted/50 hover:bg-highlight/10 hover:text-highlight transition-colors cursor-default"
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
