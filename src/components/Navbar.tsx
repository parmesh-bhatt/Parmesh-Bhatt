import { useState, useEffect, useCallback } from "react"
import { Menu } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const FULL_NAME = "Parmesh Bhatt"
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
    document.title = `${INITIALS} | ${FULL_NAME}`
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const sections = [...navLinks.map((l) => l.href), "resume"]
    const observers: IntersectionObserver[] = []

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { rootMargin: "-40% 0px -55% 0px" }
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
            <SheetContent side="right" className="w-64">
              <SheetHeader className="sr-only">
                <SheetTitle>Navigation Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 mt-6">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className={cn(
                      "text-left px-3 py-2 rounded-md text-sm transition-colors",
                      activeSection === link.href
                        ? "text-highlight font-medium bg-accent"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    )}
                  >
                    {link.label}
                  </button>
                ))}
                <button
                  onClick={() => handleNavClick("resume")}
                  className={cn(
                    "text-left px-3 py-2 rounded-md text-sm transition-colors",
                    activeSection === "resume"
                      ? "text-highlight font-medium bg-accent"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  Resume
                </button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
