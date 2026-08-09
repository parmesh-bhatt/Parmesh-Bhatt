export interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

export type ValidationError = Partial<Record<keyof ContactForm, string>>

export const validateContact = (data: ContactForm): ValidationError => {
  const errors: ValidationError = {}

  if (data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters"
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(data.email)) {
    errors.email = "Please enter a valid email"
  }

  if (data.subject.trim().length < 3) {
    errors.subject = "Subject must be at least 3 characters"
  }

  if (data.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters"
  }

  return errors
}
