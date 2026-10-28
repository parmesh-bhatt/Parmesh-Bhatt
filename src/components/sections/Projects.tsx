import { useState } from "react"
import { motion } from "framer-motion"
import { GitBranch, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SectionHeading } from "@/components/SectionHeading"
import { LinkNotFoundModal } from "@/components/LinkNotFoundModal"
import { snappySpring } from "@/lib/animations"

interface Project {
  title: string
  description: string
  tech: string[]
  github: string
  live?: string
}

const projects: Project[] = [
  {
    title: "RitualPlanner",
    description:
      "RitualPlanner is a powerful web-based tool designed for priests to efficiently manage their daily religious tasks. From scheduling rituals and tracking clients to handling payments and reminders, it brings complete organization to every aspect of religious service management.",
    tech: [
      "React",
      "Tanstack Query",
      "Tailwind CSS",
      "Shadcn UI",
      "Node.js",
      "NestJs",
      "PostgreSQL",
      "Redis",
      "TypeOrm",
      "JWT",
      "Passport.js",
      "BullMQ",
      "class-transformer",
      "class-validator",
      "Jest",
    ],
    github: "https://github.com/RitualPlanner",
    live: "",
  },
  {
    title: "RitualPanchang",
    description:
      "RitualPanchang is a comprehensive web-based tool that provides accurate and localized panchangam information. It helps priests and individuals plan religious observances with precise timings for tithis, nakshatras, yogas, and other Vedic astrological data.",
    tech: [
      "React",
      "Tanstack Router",
      "Tanstack Query",
      "Tailwind CSS",
      "Shadcn UI",
      "Node.js",
      "NestJs",
      "PostgreSQL",
      "Redis",
      "TypeOrm",
      "JWT",
      "Passport.js",
      "BullMQ",
      "class-transformer",
      "class-validator",
      "Jest",
    ],
    github: "https://github.com/RitualPanchang",
    live: "",
  },
  {
    title: "Furniture Rentals",
    description:
      "Furniture Rentals is a web-based platform for online furniture rental services, allowing customers to browse items, manage subscriptions, track orders, and make secure payments. This platform aims to simplify the process of renting furniture with a digitized solution.",
    tech: ["React", "Node.js", "Express.js", "Tailwind CSS", "Razorpay", "MongoDB"],
    github: "https://github.com/parmesh-bhatt/Furniture-Rentals",
    live: "https://furniture-renting-client.onrender.com/",
  },
  {
    title: "Bug Tracking System",
    description:
      "The Bug Tracking System is a web-based project I developed to streamline the software development lifecycle by efficiently managing and tracking defects across various projects. It features multi-user roles, detailed reporting, and project organization functionalities, demonstrating my ability to build robust data-management applications.",
    tech: ["Node.js", "Express", "MongoDB", "JWT", "Passport.js"],
    github: "",
  },
  {
    title: "TMS - Transport Management System",
    description:
      "The Transport Management System (TMS) is a web-based platform that streamlines logistics operations by managing vehicles, drivers, and shipments. It enables efficient transport assignment, delivery tracking, and centralized monitoring through an admin dashboard. Customers and businesses can also track their deliveries in real time.",
    tech: ["React", "Tailwind CSS", "Spring Boot", "Kotlin", "Keycloak", "PostgreSQL", "Docker"],
    github: "https://github.com/parmesh-bhatt/TMS",
    live: "",
  },
  {
    title: "Medical Chatbot",
    description:
      "This whole ChatBot we created to learn and our main motive is to digitalize the medical field because India is very behind in medical technologies. The big cities have many facilities but small village people cannot go to big cities and afford the cost. With the use of these ChatBots, if they have small smartphones they can easily get the solution to small diseases and get the answer from their home.",
    tech: ["Telegram", "Dialogflow"],
    github: "https://github.com/parmesh-bhatt/Medical-Chatbot",
  },
]

export default function Projects() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProjectTitle, setSelectedProjectTitle] = useState("")
  const [selectedLinkType, setSelectedLinkType] = useState<"github" | "live">("github")

  const handleUnavailableLink = (title: string, type: "github" | "live") => {
    setSelectedProjectTitle(title)
    setSelectedLinkType(type)
    setModalOpen(true)
  }

  return (
    <section id="projects" className="py-24 px-4 bg-muted/30">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Featured Projects"
          subtitle="A showcase of web applications, platforms, and tools built to solve real-world problems."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                ...snappySpring,
                delay: i * 0.04,
              }}
              whileHover={{
                y: -5,
                transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
              }}
              className="h-full will-change-transform"
            >
              <Card className="group relative overflow-hidden h-full flex flex-col border-border/80 dark:border-white/10 bg-card hover:border-orange-500/50 hover:shadow-[0_10px_35px_-8px_rgba(249,115,22,0.22)] transition-all duration-300">
                {/* Ambient Card Top Glow on Hover */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-orange-500/15 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />

                <CardHeader className="pb-3 relative z-10">
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle className="text-lg group-hover:text-orange-500 transition-colors">
                      {project.title}
                    </CardTitle>
                    <span className="h-1.5 w-1.5 rounded-full bg-orange-500/50 group-hover:bg-orange-500 group-hover:scale-125 transition-all" />
                  </div>
                  <CardDescription className="leading-6">{project.description}</CardDescription>
                </CardHeader>

                <CardContent className="flex-1 pb-3 relative z-10">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <Badge
                        key={t}
                        variant="secondary"
                        className="text-xs transition-colors hover:border-orange-500/40 hover:text-orange-600 dark:hover:text-orange-400"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="gap-2 pt-0 relative z-10">
                  {project.github ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="cursor-pointer hover:border-orange-500/50 hover:bg-orange-500/5 transition-all"
                      asChild
                    >
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <GitBranch className="h-3.5 w-3.5" />
                        Code
                      </a>
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="cursor-pointer hover:border-orange-500/50 hover:bg-orange-500/5 transition-all"
                      onClick={() => handleUnavailableLink(project.title, "github")}
                    >
                      <GitBranch className="h-3.5 w-3.5" />
                      Code
                    </Button>
                  )}

                  {project.live ? (
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-medium shadow-sm hover:shadow-orange-500/30 transition-all cursor-pointer"
                      asChild
                    >
                      <a href={project.live} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3.5 w-3.5" />
                        Live
                      </a>
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-medium shadow-sm hover:shadow-orange-500/30 transition-all cursor-pointer"
                      onClick={() => handleUnavailableLink(project.title, "live")}
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Live
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <LinkNotFoundModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        projectTitle={selectedProjectTitle}
        linkType={selectedLinkType}
      />
    </section>
  )
}
