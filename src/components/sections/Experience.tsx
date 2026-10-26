import { motion } from "framer-motion"
import { Briefcase, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { SectionHeading } from "@/components/SectionHeading"

interface ExperienceItem {
  role: string
  company: string
  period: string
  type: string
  description: string[]
  tech: string[]
}

const experiences: ExperienceItem[] = [
  {
    role: "Web App Developer",
    company: "Weetech Solution Private Limited",
    period: "December 2025 – Present",
    type: "Full-time",
    description: [
      "Delivered scalable backend APIs with NestJS, supporting multiple application features, by designing relational schemas and migrations using TypeORM and PostgreSQL.",
      "Improved deployment reliability and code maintainability, reducing environment-related issues, by containerizing services with Docker and following clean TypeScript and Git- based workflows.",
    ],
    tech: [
      "TypeScript",
      "Node.js",
      "NestJS",
      "Express",
      "PostgreSQL",
      "Docker",
      "TypeORM",
      "Redis",
      "BullMQ",
      "class-transformer",
      "class-validator",
      "Jest",
    ],
  },
  {
    role: "Web Developer (Internship)",
    company: "Wappzo Infotech Private Limited",
    period: "August 2025 - November 2025",
    type: "Internship",
    description: [
      "Refreshed and strengthened MERN stack fundamentals by learning HTML, CSS, and Tailwind CSS in the first 20 days, and built 2+ responsive websites(one using HTML & CSS and another using HTML & Tailwind CSS) to ensure cross-device compatibility.",
      "Enhanced front-end development expertise by deepening skills in TypeScript and React, exploring Next.js for modern web applications, and currently focusing on learning React Native for cross-platform mobile development.",
    ],
    tech: ["Next.js", "React", "Tailwind CSS", "TypeScript", "PostgreSQL", "RESTful APIs"],
  },
  {
    role: "Software Developer (Internship)",
    company: "Liquify Solutions",
    period: "December 2024 – May 2025",
    type: "Internship",
    description: [
      "Developed and maintained 2 web applications as a part of a 4-member team using React and Spring Boot, reduced page load times by 30 % by using Tanstack Router, Tanstack Query, and data fetching techniques.",
      "Improved code quality and maintainability by participating in bi-weekly code reviews, sprint planning, and implementing best practices across two web apps.",
    ],
    tech: [
      "React",
      "Tanstack Query",
      "Tanstack Router",
      "Tailwind CSS",
      "Spring Boot",
      "Kotlin",
      "PostgreSQL",
    ],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-4 bg-muted/30">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          title="Experience"
          subtitle="My professional journey in software development."
        />

        <div className="relative">
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -24, scale: 0.98 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  type: "spring",
                  stiffness: 60,
                  damping: 16,
                  delay: i * 0.1,
                }}
                className="relative pl-12 md:pl-20"
              >
                {/* Timeline dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 12,
                    delay: i * 0.1 + 0.15,
                  }}
                  className="absolute left-2.5 md:left-6.5 top-2 h-3 w-3 rounded-full border-2 border-highlight bg-background"
                />

                <div className="rounded-xl border border-border bg-card p-5 md:p-6 hover:shadow-md transition-shadow duration-300">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2 text-highlight mt-0.5">
                        <Briefcase className="h-3.5 w-3.5" />
                        <span className="text-sm font-medium">{exp.company}</span>
                        <Badge variant="outline" className="text-xs">
                          {exp.type}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground shrink-0">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  <ul className="my-4 ml-4 list-disc space-y-1.5">
                    {exp.description.map((point, j) => (
                      <li key={j} className="text-sm text-muted-foreground leading-6">
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {exp.tech.map((t) => (
                      <Badge key={t} variant="secondary" className="text-xs">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
