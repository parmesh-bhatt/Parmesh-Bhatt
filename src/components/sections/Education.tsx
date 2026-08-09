import { motion } from "framer-motion"
import { GraduationCap, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { SectionHeading } from "@/components/SectionHeading"

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
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                type: "spring",
                stiffness: 60,
                damping: 15,
                delay: i * 0.12,
              }}
              className="rounded-xl border border-border bg-card p-6 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div className="flex items-start gap-3">
                  <motion.div
                    initial={{ scale: 0, rotate: -15 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 12,
                      delay: i * 0.12 + 0.15,
                    }}
                    className="mt-0.5 rounded-lg bg-highlight/10 p-2 shrink-0"
                  >
                    <GraduationCap className="h-5 w-5 text-highlight" />
                  </motion.div>
                  <div>
                    <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                      {edu.degree}
                    </h3>
                    <p className="text-highlight text-sm font-medium mt-0.5">{edu.institution}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground shrink-0">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{edu.period}</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-6 mb-4">{edu.description}</p>

              <div className="flex flex-wrap gap-2">
                {edu.highlights.map((item) => (
                  <Badge key={item} variant="outline" className="text-xs">
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
