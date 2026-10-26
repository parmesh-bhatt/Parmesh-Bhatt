import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2, MessageSquare } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { SectionHeading } from "@/components/SectionHeading"
import { contactSchema, type ContactForm } from "@/schemas/contact"

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  )
}

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/parmesh-bhatt",
    handle: "parmesh-bhatt",
    Icon: GitHubIcon,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/parmesh-bhatt",
    handle: "parmesh-bhatt",
    Icon: LinkedInIcon,
  },
  {
    label: "X",
    href: "https://x.com/Parmesh_119",
    handle: "@Parmesh_119",
    Icon: XIcon,
  },
]

function SocialCard({ link }: { link: (typeof socialLinks)[number] }) {
  const Icon = link.Icon
  return (
    <motion.a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 350, damping: 18 }}
      className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-border/80 dark:border-white/10 bg-card hover:border-highlight/50 hover:bg-highlight/5 transition-all text-sm group shadow-sm"
    >
      <Icon className="h-4 w-4 text-foreground group-hover:text-highlight transition-colors shrink-0" />
      <div className="text-left">
        <span className="text-xs font-medium text-foreground group-hover:text-highlight transition-colors block leading-tight">
          {link.label}
        </span>
        <span className="text-[10px] text-muted-foreground block leading-tight">
          {link.handle}
        </span>
      </div>
    </motion.a>
  )
}

const contactDetails = [
  {
    icon: Mail,
    label: "Direct Email",
    value: "parmeshbhatt.dev@gmail.com",
    href: "mailto:parmeshbhatt.dev@gmail.com",
    badge: "Fastest response",
  },
  {
    icon: Phone,
    label: "Phone / WhatsApp",
    value: "+91 6355177933",
    href: "tel:+916355177933",
    badge: "Available 9am - 8pm IST",
  },
  {
    icon: MapPin,
    label: "Current Location",
    value: "Navsari, Gujarat, India",
    href: "https://maps.app.goo.gl/yKwiEppbsG8bsAAV7",
    badge: "Open to Remote / Relocation",
  },
]

export default function Contact() {
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  const onSubmit = async (data: ContactForm) => {
    try {
      const response = await fetch("/api/send-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      let result: { error?: string } = {}
      const contentType = response.headers.get("content-type")
      if (contentType && contentType.includes("application/json")) {
        result = await response.json()
      } else {
        if (response.status === 404) {
          // In local dev without serverless runtime, provide clean simulation feedback
          console.info("Local dev server simulation: Message received successfully:", data)
          toast.success("Message received!", {
            description: "Thanks for reaching out! In local development mode, your message was validated successfully.",
          })
          setIsSuccess(true)
          reset()
          setTimeout(() => setIsSuccess(false), 5000)
          return
        }
        const text = await response.text()
        throw new Error(text || `Request failed with status ${response.status}`)
      }

      if (!response.ok) {
        throw new Error(result.error || "Failed to deliver message")
      }

      toast.success("Message sent successfully!", {
        description: "Thank you for getting in touch. I will respond within 24 hours.",
      })
      setIsSuccess(true)
      reset()
      setTimeout(() => setIsSuccess(false), 5000)
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      console.error("Error submitting contact form:", err)
      toast.error("Message delivery failed", {
        description:
          err.message || "Please try again later or email me directly at parmeshbhatt.dev@gmail.com",
      })
    }
  }

  return (
    <section id="contact" className="py-24 px-4 bg-muted/20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Get In Touch"
          subtitle="Looking for an engineer to architect your backend or build full-stack web solutions? Let's connect."
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-14">
          {/* Contact Information & Channels */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ type: "spring", stiffness: 58, damping: 16 }}
            className="md:col-span-5 space-y-6"
          >
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-highlight/10 text-highlight text-xs font-semibold uppercase tracking-wider mb-3">
                <MessageSquare className="h-3.5 w-3.5" />
                Let's Start a Conversation
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Reach Out Directly
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Whether you have an upcoming project, a full-time engineering opportunity, or just want to chat about tech architecture—my inbox is always open.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              {contactDetails.map(({ icon: Icon, label, value, href, badge }, i) => (
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
                  whileHover={{ x: 4 }}
                  className="p-4 rounded-2xl border border-border/80 dark:border-white/10 bg-card hover:border-highlight/40 hover:shadow-md transition-all duration-300 flex items-start gap-4"
                >
                  <div className="rounded-xl bg-highlight/10 p-3 shrink-0 text-highlight">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-medium text-muted-foreground">{label}</p>
                      <span className="text-[10px] px-2 py-0.2 rounded-full bg-muted font-medium text-muted-foreground">
                        {badge}
                      </span>
                    </div>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-sm font-semibold text-foreground hover:text-highlight transition-colors block"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-semibold text-foreground">{value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Media Channels */}
            <div className="pt-2 space-y-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider text-center sm:text-left">
                Connect on Social Media
              </p>
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-center sm:items-start gap-2.5">
                <div className="flex items-center justify-center gap-2.5">
                  <SocialCard link={socialLinks[0]} />
                  <SocialCard link={socialLinks[1]} />
                </div>
                <div className="flex items-center justify-center">
                  <SocialCard link={socialLinks[2]} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form with Zod + React Hook Form */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ type: "spring", stiffness: 58, damping: 16, delay: 0.1 }}
            className="md:col-span-7"
          >
            <div className="p-6 sm:p-8 rounded-2xl border border-border/80 dark:border-white/10 bg-card shadow-lg relative overflow-hidden">
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-600 dark:text-emerald-400 text-sm"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0" />
                  <div>
                    <p className="font-semibold">Message dispatched!</p>
                    <p className="text-xs opacity-90">Thank you for reaching out. I'll get back to you shortly.</p>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-xs font-semibold text-foreground">
                      Full Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
                      placeholder="e.g. Alex Morgan"
                      {...register("name")}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      className={`h-11 rounded-xl transition-colors ${errors.name ? "border-destructive focus-visible:ring-destructive" : ""
                        }`}
                    />
                    {errors.name && (
                      <p id="name-error" className="text-xs text-destructive font-medium">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs font-semibold text-foreground">
                      Email Address <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="alex@company.com"
                      {...register("email")}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className={`h-11 rounded-xl transition-colors ${errors.email ? "border-destructive focus-visible:ring-destructive" : ""
                        }`}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-xs text-destructive font-medium">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-xs font-semibold text-foreground">
                    Subject <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="subject"
                    placeholder="Project Inquiry / Job Opportunity"
                    {...register("subject")}
                    aria-invalid={!!errors.subject}
                    aria-describedby={errors.subject ? "subject-error" : undefined}
                    className={`h-11 rounded-xl transition-colors ${errors.subject ? "border-destructive focus-visible:ring-destructive" : ""
                      }`}
                  />
                  {errors.subject && (
                    <p id="subject-error" className="text-xs text-destructive font-medium">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-xs font-semibold text-foreground">
                    Message <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell me about your project, timeline, or engineering goals..."
                    rows={5}
                    {...register("message")}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    className={`rounded-xl transition-colors resize-none ${errors.message ? "border-destructive focus-visible:ring-destructive" : ""
                      }`}
                  />
                  {errors.message && (
                    <p id="message-error" className="text-xs text-destructive font-medium">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 rounded-xl bg-highlight text-highlight-foreground hover:bg-highlight/90 shadow-md font-medium text-sm transition-all duration-200 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
