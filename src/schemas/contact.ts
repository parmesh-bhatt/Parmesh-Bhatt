import { z } from "zod"

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be under 50 characters"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  subject: z
    .string()
    .trim()
    .min(3, "Subject must be at least 3 characters")
    .max(100, "Subject must be under 100 characters"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be under 2000 characters"),
})

export type ContactForm = z.infer<typeof contactSchema>
export type ValidationError = Partial<Record<keyof ContactForm, string>>

export const validateContact = (data: ContactForm): ValidationError => {
  const result = contactSchema.safeParse(data)
  if (result.success) return {}

  const errors: ValidationError = {}
  for (const issue of result.error.issues) {
    const field = issue.path[0] as keyof ContactForm
    if (field && !errors[field]) {
      errors[field] = issue.message
    }
  }
  return errors
}
