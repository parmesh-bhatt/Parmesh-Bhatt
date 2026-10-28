import { motion } from "framer-motion"
import { snappySpring } from "@/lib/animations"

interface SectionHeadingProps {
  title: string
  subtitle: string
  align?: "left" | "center"
}

export function SectionHeading({ title, subtitle, align = "center" }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={snappySpring}
      className={align === "center" ? "text-center mb-14" : "mb-14"}
    >
      <h2 className="scroll-m-20 text-3xl font-bold tracking-tight mb-3">{title}</h2>
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ ...snappySpring, delay: 0.08 }}
        style={{ transformOrigin: align === "center" ? "center" : "left" }}
        className={`h-1 w-11 rounded-full bg-gradient-to-r from-orange-500 via-orange-400 to-amber-400 mb-4 ${align === "center" ? "mx-auto" : ""}`}
      />
      <p className="text-muted-foreground leading-7 max-w-lg mx-auto">{subtitle}</p>
    </motion.div>
  )
}
