import { motion } from "framer-motion"
import { SectionHeading } from "@/components/SectionHeading"
import { techIcons, techColors } from "@/components/tech-icons"

interface Skill {
  name: keyof typeof techIcons
}

interface SkillGroup {
  category: string
  description: string
  skills: Skill[]
}

const skillGroups: SkillGroup[] = [
  {
    category: "Frontend Development",
    description:
      "Crafting pixel-perfect, responsive interfaces with modern frameworks and smooth animations.",
    skills: [
      { name: "React" },
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "JavaScript" },
      { name: "Tailwind CSS" },
      { name: "Shadcn UI" },
      { name: "HTML / CSS" },
      { name: "React Query" },
      { name: "Tanstack Router" },
      { name: "React Router" },
    ],
  },
  {
    category: "Backend Development",
    description: "Building robust and scalable server-side architectures.",
    skills: [
      { name: "Node.js" },
      { name: "NestJs" },
      { name: "Express" },
      { name: "Spring Boot" },
      { name: "Java" },
      { name: "Kotlin" },
      { name: "REST APIs" },
      { name: "GraphQL" },
      { name: "BullMQ" },
      { name: "System Design" },
    ],
  },
  {
    category: "Database",
    description: "Designing efficient and scalable data schemas for modern applications.",
    skills: [
      { name: "PostgreSQL" },
      { name: "MongoDB" },
      { name: "MySQL" },
      { name: "Redis" },
      { name: "Firebase" },
    ],
  },
  {
    category: "Tools & DevOps",
    description: "Streamlining development and deployment with modern tooling.",
    skills: [
      { name: "Git & GitHub" },
      { name: "Docker" },
      { name: "TypeORM" },
      { name: "Jest" },
      { name: "Postman" },
      { name: "Vercel" },
      { name: "VS Code" },
    ],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 220, damping: 15 },
  },
}

function SkillBadge({ skill }: { skill: Skill }) {
  const Icon = techIcons[skill.name]
  const brandColor = techColors[skill.name]
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{
        scale: 1.08,
        y: -3,
        transition: { type: "spring", stiffness: 400, damping: 12 },
      }}
      className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium cursor-default hover:border-highlight/40 hover:shadow-sm transition-all"
    >
      <span
        className="text-base leading-none shrink-0 [&_svg]:size-4"
        style={brandColor ? { color: brandColor } : undefined}
      >
        <Icon />
      </span>
      {skill.name}
    </motion.div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-4">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Skills"
          subtitle="Technologies and tools I use to bring ideas to life."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                type: "spring",
                stiffness: 60,
                damping: 15,
                delay: i * 0.1,
              }}
              className="rounded-xl border border-border bg-card p-6 space-y-4"
            >
              <div className="space-y-1">
                <h3 className="scroll-m-20 text-base font-semibold tracking-tight text-highlight">
                  {group.category}
                </h3>
                <p className="text-xs text-muted-foreground leading-5">{group.description}</p>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="flex flex-wrap gap-2"
              >
                {group.skills.map((skill) => (
                  <SkillBadge key={skill.name} skill={skill} />
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
