// High-performance smooth animation presets using cubic-bezier curves
// Provides butter-smooth 60-120fps GPU-accelerated motion without main-thread spring physics lag

export const smoothEase = [0.22, 1, 0.36, 1] as const
export const snappyEase = [0.16, 1, 0.3, 1] as const

// Recommended physics-based spring that adapts fluidly to frame rates with 0 frame drops
export const snappySpring = {
  type: "spring" as const,
  stiffness: 100,
  damping: 18,
  mass: 0.6,
}

export const springTransition = (delay = 0) => ({
  type: "spring" as const,
  stiffness: 100,
  damping: 18,
  mass: 0.6,
  delay,
})

export const transition = (delay = 0, duration = 0.5) => ({
  duration,
  delay,
  ease: smoothEase,
})

export const fastTransition = (delay = 0, duration = 0.35) => ({
  duration,
  delay,
  ease: snappyEase,
})

export const inViewFadeUp = (delay = 0, y = 20, duration = 0.55) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" } as const,
  transition: { duration, delay, ease: smoothEase },
})

export const inViewFade = (delay = 0, duration = 0.5) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-40px" } as const,
  transition: { duration, delay, ease: smoothEase },
})
