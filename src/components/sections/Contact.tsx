import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { SectionHeading } from "@/components/SectionHeading"

import { validateContact } from "@/schemas/contact"
import type { ContactForm } from "@/schemas/contact"

const contactDetails = [
  {
    icon: Mail,
    label: "Email",
    value: "parmeshbhatt.dev@gmail.com",
    href: "mailto:parmeshbhatt.dev@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 6355177933",
    href: "tel:+916355177933",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Navsari, Gujarat, India",
    href: "https://maps.app.goo.gl/yKwiEppbsG8bsAAV7",
  },
]

export default function Contact() {
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  
  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
    // Clear validation error on change
    if (errors[id as keyof ContactForm]) {
      setErrors((prev) => ({ ...prev, [id]: undefined }))
    }
  }

  const validate = (): boolean => {
    const newErrors = validateContact(formData)
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/send-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      let result: { error?: string } = {}
      const contentType = response.headers.get("content-type")
      if (contentType && contentType.includes("application/json")) {
        result = await response.json()
      } else {
        if (response.status === 404) {
          throw new Error(
            "Local dev server does not support serverless functions. Please deploy to Vercel or run 'vercel dev' to test this locally."
          )
        }
        const text = await response.text()
        throw new Error(text || `Request failed with status ${response.status}`)
      }

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message")
      }

      toast.success("Message sent!", {
        description: "Thanks for reaching out. I'll get back to you soon.",
      })
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      console.error("Error sending contact form:", err)
      toast.error("Failed to send message", {
        description: err.message || "Please try again later or email me directly.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-24 px-4">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Get In Touch"
          subtitle="I'm always interested in new opportunities and exciting projects. Let's work together."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ type: "spring", stiffness: 58, damping: 16 }}
          >
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-2">
              Let's Connect
            </h3>
            <p className="leading-7 text-muted-foreground mb-8">
              Feel free to reach out for collaborations, opportunities, or just to say hello!
            </p>

            <div className="space-y-5">
              {contactDetails.map(({ icon: Icon, label, value, href }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 70,
                    damping: 16,
                    delay: 0.1 + i * 0.08,
                  }}
                  className="flex items-center gap-4"
                >
                  <motion.div
                    whileHover={{
                      scale: 1.1,
                      rotate: 3,
                      transition: { type: "spring", stiffness: 300 },
                    }}
                    className="rounded-lg bg-highlight/10 p-2.5 shrink-0"
                  >
                    <Icon className="h-5 w-5 text-highlight" />
                  </motion.div>
                  <div>
                    <p className="text-sm text-muted-foreground">{label}</p>
                    {href ? (
                      <a href={href} className="font-medium hover:text-highlight transition-colors">
                        {value}
                      </a>
                    ) : (
                      <p className="font-medium">{value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ type: "spring", stiffness: 58, damping: 16, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="What's this about?"
                  value={formData.subject}
                  onChange={handleChange}
                  aria-invalid={!!errors.subject}
                />
                {errors.subject && (
                  <p className="text-xs text-destructive">{errors.subject}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell me about your project or opportunity..."
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  aria-invalid={!!errors.message}
                />
                {errors.message && (
                  <p className="text-xs text-destructive">{errors.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-highlight text-highlight-foreground hover:bg-highlight/90"
              >
                <Send className="h-4 w-4" />
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
