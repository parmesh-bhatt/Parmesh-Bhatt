import { motion } from "framer-motion"

interface SectionHeadingProps {
  title: string
  subtitle: string
  align?: "left" | "center"
}

export function SectionHeading({ title, subtitle, align = "center" }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 60, damping: 15 }}
      className={align === "center" ? "text-center mb-14" : "mb-14"}
    >
      <h2 className="scroll-m-20 text-3xl font-bold tracking-tight mb-3">{title}</h2>
      <div
        className={`h-1 w-10 rounded-full bg-highlight mb-4 ${align === "center" ? "mx-auto" : ""}`}
      />
      <p className="text-muted-foreground leading-7 max-w-lg mx-auto">{subtitle}</p>
    </motion.div>
  )
}
