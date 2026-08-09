import { motion, AnimatePresence } from "framer-motion"
import { AlertCircle, ArrowLeft, ExternalLink } from "lucide-react"
import { SiGithub } from "react-icons/si"

interface LinkNotFoundModalProps {
  isOpen: boolean
  onClose: () => void
  projectTitle: string
  linkType: "github" | "live"
}

export function LinkNotFoundModal({
  isOpen,
  onClose,
  projectTitle,
  linkType,
}: LinkNotFoundModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card/95 p-6 shadow-2xl backdrop-blur-lg"
          >
            {/* Ambient Background Glow */}
            <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-highlight/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-highlight/5 blur-3xl pointer-events-none" />

            {/* Content */}
            <div className="relative space-y-6 text-center">
              {/* Header Icon */}
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-destructive shadow-inner">
                <AlertCircle className="h-8 w-8 animate-pulse" />
              </div>

              {/* Status Code / Error message */}
              <div className="space-y-2">
                <h2 className="text-4xl font-extrabold tracking-tight text-highlight bg-gradient-to-r from-highlight to-highlight/70 bg-clip-text text-transparent">
                  404
                </h2>
                <h3 className="text-xl font-bold text-card-foreground">
                  {linkType === "github" ? "Repository Private" : "Live Demo Unavailable"}
                </h3>
                <p className="text-sm text-muted-foreground leading-6 px-2">
                  The {linkType === "github" ? "GitHub repository" : "live deployment link"} for{" "}
                  <strong className="text-highlight font-semibold">{projectTitle}</strong> is
                  currently not publicly available or is under active development.
                </p>
              </div>

              {/* Information Card */}
              <div className="rounded-lg border border-border/80 bg-muted/40 p-4 text-left text-xs space-y-2">
                <p className="font-medium text-card-foreground flex items-center gap-1.5">
                  {linkType === "github" ? (
                    <SiGithub className="h-3.5 w-3.5 text-highlight" />
                  ) : (
                    <ExternalLink className="h-3.5 w-3.5 text-highlight" />
                  )}
                  Why is this link not accessible?
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {linkType === "github"
                    ? "This project is built for a client or organization requiring private source code. For architectural code samples, please contact me directly."
                    : "The hosting server for this project is currently undergoing maintenance, or is a local-only enterprise deployment. Please check back later."}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                <button
                  onClick={onClose}
                  className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted hover:text-card-foreground transition-all duration-200 cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Go Back
                </button>
                <a
                  href="#contact"
                  onClick={onClose}
                  className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-highlight text-highlight-foreground px-4 py-2 text-sm font-medium hover:bg-highlight/90 transition-all duration-200 shadow-md shadow-highlight/20 cursor-pointer"
                >
                  Inquire Access
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
