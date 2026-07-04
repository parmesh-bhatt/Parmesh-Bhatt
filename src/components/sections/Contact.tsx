import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { SectionHeading } from "@/components/SectionHeading"

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type ContactForm = z.infer<typeof contactSchema>

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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({ resolver: zodResolver(contactSchema) })

  const onSubmit = async (data: ContactForm) => {
    try {
      const response = await fetch("/api/send-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      let result: any = {}
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
      reset()
    } catch (error: any) {
      console.error("Error sending contact form:", error)
      toast.error("Failed to send message", {
        description: error.message || "Please try again later or email me directly.",
      })
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
              Feel free to reach out for collaborations, opportunities, or just
              to say hello!
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
                      <a
                        href={href}
                        className="font-medium hover:text-highlight transition-colors"
                      >
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
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Your Name"
                    aria-invalid={!!errors.name}
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-xs text-destructive">{errors.name.message}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    aria-invalid={!!errors.email}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="What's this about?"
                  aria-invalid={!!errors.subject}
                  {...register("subject")}
                />
                {errors.subject && (
                  <p className="text-xs text-destructive">{errors.subject.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell me about your project or opportunity..."
                  rows={5}
                  aria-invalid={!!errors.message}
                  {...register("message")}
                />
                {errors.message && (
                  <p className="text-xs text-destructive">{errors.message.message}</p>
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
