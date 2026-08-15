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
          subtitle="A selection of my recent work and personal projects."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                type: "spring",
                stiffness: 60,
                damping: 15,
                delay: i * 0.08,
              }}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { type: "spring", stiffness: 350, damping: 20 },
              }}
              className="h-full"
            >
              <Card className="h-full flex flex-col border-border hover:border-highlight/40 hover:shadow-[0_10px_30px_-10px_var(--color-highlight)]/10 dark:hover:shadow-[0_10px_30px_-10px_var(--color-highlight)]/5 transition-all duration-300">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription className="leading-6">{project.description}</CardDescription>
                </CardHeader>

                <CardContent className="flex-1 pb-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <Badge key={t} variant="secondary" className="text-xs">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="gap-2 pt-0">
                  {project.github ? (
                    <Button variant="outline" size="sm" className="cursor-pointer" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <GitBranch className="h-3.5 w-3.5" />
                        Code
                      </a>
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="cursor-pointer"
                      onClick={() => handleUnavailableLink(project.title, "github")}
                    >
                      <GitBranch className="h-3.5 w-3.5" />
                      Code
                    </Button>
                  )}

                  {project.live ? (
                    <Button
                      size="sm"
                      className="bg-highlight text-highlight-foreground hover:bg-highlight/90 cursor-pointer"
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
                      className="bg-highlight text-highlight-foreground hover:bg-highlight/90 cursor-pointer"
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
