import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Download, ExternalLink, FileText, Briefcase, GraduationCap, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SectionHeading } from "@/components/SectionHeading"

function ResumeContent() {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Resume header */}
      <div className="bg-highlight px-8 py-8 text-highlight-foreground">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold tracking-tight">Parmesh Bhatt</h2>
          <p className="text-highlight-foreground/80 mt-1 font-medium">Full Stack Developer</p>
          <div className="flex flex-wrap gap-4 mt-3 text-sm text-highlight-foreground/70">
            <span>your.email@example.com</span>
            <span>+1 (555) 000-0000</span>
            <span>Your City, Country</span>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-highlight-foreground transition-colors"
            >
              github.com/yourhandle
            </a>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8 max-w-3xl mx-auto space-y-8">
        {/* Summary */}
        <section>
          <p className="text-sm leading-6 text-muted-foreground">
            Full Stack Developer with 3+ years of experience building scalable, user-centric web
            applications. Proficient in React, TypeScript, Node.js, and Spring Boot. Passionate
            about clean architecture, performance optimization, and delivering polished digital
            experiences.
          </p>
        </section>

        {/* Experience */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="h-4 w-4 text-highlight" />
            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Experience
            </h3>
          </div>
          <div className="space-y-5">
            {[
              {
                role: "Software Developer Engineer",
                company: "Company Name",
                period: "Jun 2023 – Present",
                points: [
                  "Developed enterprise-level web apps using React and Spring Boot, improving performance by 40%.",
                  "Led architecture decisions and mentored junior developers.",
                ],
              },
              {
                role: "Junior Full Stack Developer",
                company: "Company Name",
                period: "Jan 2022 – May 2023",
                points: [
                  "Built responsive UIs with React and integrated RESTful APIs.",
                  "Reduced application load times by 30% through optimization.",
                ],
              },
              {
                role: "Full Stack Developer Intern",
                company: "Company Name",
                period: "Jun 2021 – Dec 2021",
                points: [
                  "Developed and maintained resume builder web applications.",
                  "Integrated third-party APIs and fixed critical production bugs.",
                ],
              },
            ].map((exp) => (
              <div key={exp.role} className="border-l-2 border-highlight/30 pl-4">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <p className="font-semibold text-sm">{exp.role}</p>
                    <p className="text-xs text-highlight">{exp.company}</p>
                  </div>
                  <p className="text-xs text-muted-foreground shrink-0">{exp.period}</p>
                </div>
                <ul className="mt-2 space-y-1">
                  {exp.points.map((pt, i) => (
                    <li
                      key={i}
                      className="text-xs text-muted-foreground leading-5 flex items-start gap-1.5"
                    >
                      <span className="text-highlight mt-1 shrink-0">•</span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Code className="h-4 w-4 text-highlight" />
            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Technical Skills
            </h3>
          </div>
          <div className="space-y-2">
            {[
              {
                label: "Frontend",
                value: "React, Next.js, TypeScript, Tailwind CSS, Framer Motion",
              },
              { label: "Backend", value: "Node.js, Express, Spring Boot, Java, Kotlin, GraphQL" },
              { label: "Database", value: "PostgreSQL, MongoDB, MySQL, Redis, Firebase" },
              { label: "Tools", value: "Git, Docker, AWS, CI/CD, Postman, Figma" },
            ].map((row) => (
              <div key={row.label} className="flex gap-3 text-sm">
                <span className="font-medium text-highlight shrink-0 w-20">{row.label}</span>
                <span className="text-muted-foreground text-xs leading-5">{row.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="h-4 w-4 text-highlight" />
            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Education
            </h3>
          </div>
          <div className="border-l-2 border-highlight/30 pl-4">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <p className="font-semibold text-sm">Bachelor of Technology — Computer Science</p>
                <p className="text-xs text-highlight">University Name</p>
              </div>
              <p className="text-xs text-muted-foreground shrink-0">2019 – 2023</p>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {["Data Structures", "Algorithms", "System Design", "Database Management"].map(
                (s) => (
                  <Badge key={s} variant="outline" className="text-[10px] px-2 py-0">
                    {s}
                  </Badge>
                )
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default function Resume() {
  const [pdfAvailable, setPdfAvailable] = useState<boolean | null>(null)

  useEffect(() => {
    fetch("/resume.pdf", { method: "HEAD" })
      .then((r) => {
        const ct = r.headers.get("content-type") ?? ""
        setPdfAvailable(r.ok && !ct.includes("text/html"))
      })
      .catch(() => setPdfAvailable(false))
  }, [])

  return (
    <section id="resume" className="py-24 px-4 bg-muted/30">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          title="My Resume"
          subtitle="A snapshot of my experience, skills, and education."
        />

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 60, damping: 15 }}
          className="flex flex-wrap items-center justify-end gap-3 mb-5"
        >
          <Button variant="outline" size="sm" asChild>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3.5 w-3.5" />
              Open PDF
            </a>
          </Button>
          <Button
            size="sm"
            className="bg-highlight text-highlight-foreground hover:bg-highlight/90"
            asChild
          >
            <a href="/resume.pdf" download>
              <Download className="h-3.5 w-3.5" />
              Download
            </a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.1 }}
        >
          {pdfAvailable ? (
            <div className="rounded-xl border border-border overflow-hidden shadow-sm">
              {/* Toolbar */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b bg-muted/50">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  <span>resume.pdf</span>
                </div>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-highlight hover:underline"
                >
                  Full screen
                </a>
              </div>
              <iframe src="/resume.pdf" title="Resume" className="w-full h-[750px] bg-muted" />
            </div>
          ) : (
            <ResumeContent />
          )}
        </motion.div>

        {pdfAvailable === false && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-xs text-muted-foreground mt-4"
          >
            Place your <code className="bg-muted rounded px-1">resume.pdf</code> in the{" "}
            <code className="bg-muted rounded px-1">/public</code> folder to embed the actual PDF
            above.
          </motion.p>
        )}
      </div>
    </section>
  )
}
