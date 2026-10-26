import { useState, useEffect, useCallback } from "react"
import { Menu, X } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const FULL_NAME = "Parmesh Bhatt"
const EMAIL = "parmeshbhatt.dev@gmail.com"
const INITIALS = FULL_NAME.split(" ")
  .map((w) => w[0])
  .join("")
  .toUpperCase()

const navLinks = [
  { href: "home", label: "Home" },
  { href: "about", label: "About" },
  { href: "skills", label: "Skills" },
  { href: "projects", label: "Projects" },
  { href: "experience", label: "Experience" },
  { href: "education", label: "Education" },
  { href: "resume", label: "Resume" },
  { href: "contact", label: "Contact" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [open, setOpen] = useState(false)

  const handleNavClick = useCallback((id: string) => {
    setOpen(false)
    const el = document.getElementById(id)
    if (el) {
      const offset = 64
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: "smooth" })
    }
  }, [])

  useEffect(() => {
    document.title = `${FULL_NAME}`
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const sections = navLinks.map((l) => l.href)
    const observers: IntersectionObserver[] = []

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { rootMargin: "-30% 0px -50% 0px" }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((obs) => obs.disconnect())
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "bg-background border-b border-border shadow-sm" : "bg-transparent"
      )}
    >
      <nav className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <button
          onClick={() => handleNavClick("home")}
          className="flex items-center gap-2 font-bold text-lg text-highlight hover:opacity-80 transition-opacity"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-highlight text-highlight-foreground text-sm font-bold tracking-tight">
            {INITIALS}
          </span>
          <span>{FULL_NAME}</span>
        </button>

        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNavClick(link.href)}
                className={cn(
                  "relative px-3 py-1.5 text-sm rounded-md transition-colors duration-200 cursor-pointer",
                  activeSection === link.href
                    ? "text-highlight font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {activeSection === link.href && (
                  <motion.span
                    layoutId="activeNavBackground"
                    className="absolute inset-0 bg-muted rounded-md -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="hidden md:inline-flex border-highlight text-highlight hover:bg-highlight hover:text-highlight-foreground"
            onClick={() => handleNavClick("resume")}
          >
            Resume
          </Button>
          <ModeToggle />

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              showCloseButton={false}
              className="w-full sm:max-w-sm h-full flex flex-col justify-between p-6 sm:p-8 bg-background border-l border-border"
            >
              <SheetHeader className="sr-only">
                <SheetTitle>Navigation Menu</SheetTitle>
              </SheetHeader>

              {/* Top Bar: Brand Logo & Circular Close Button */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => handleNavClick("home")}
                  className="font-bold text-lg tracking-tight text-foreground hover:text-highlight transition-colors text-left cursor-pointer"
                >
                  {FULL_NAME}<span className="text-highlight font-extrabold">.</span>
                </button>
                <SheetClose asChild>
                  <button
                    aria-label="Close menu"
                    className="h-10 w-10 rounded-full border border-border/80 dark:border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-highlight/50 transition-colors cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </SheetClose>
              </div>

              {/* Numbered Navigation Items */}
              <nav className="flex flex-col space-y-4 my-auto py-4">
                {navLinks.map((link, i) => {
                  const num = String(i + 1).padStart(2, "0")
                  const isActive = activeSection === link.href
                  return (
                    <button
                      key={link.href}
                      onClick={() => handleNavClick(link.href)}
                      className="group flex items-baseline gap-4 text-left cursor-pointer transition-all duration-200"
                    >
                      <span
                        className={cn(
                          "text-xs font-semibold tracking-wider font-mono transition-colors shrink-0",
                          isActive
                            ? "text-highlight"
                            : "text-highlight/70 group-hover:text-highlight"
                        )}
                      >
                        {num}
                      </span>
                      <span
                        className={cn(
                          "text-2xl sm:text-3xl font-bold tracking-tight transition-all",
                          isActive
                            ? "text-highlight font-extrabold"
                            : "text-foreground group-hover:text-highlight group-hover:translate-x-1"
                        )}
                      >
                        {link.label}
                      </span>
                    </button>
                  )
                })}
              </nav>

              {/* Bottom Footer Details */}
              <div className="pt-4 border-t border-border/50 text-xs text-muted-foreground flex items-center justify-between gap-2">
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-xs text-muted-foreground hover:text-highlight transition-colors truncate"
                >
                  {EMAIL}
                </a>
                <span className="text-highlight font-medium shrink-0">Software Engineer</span>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
