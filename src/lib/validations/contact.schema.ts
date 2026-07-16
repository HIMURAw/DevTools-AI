import { z } from "zod"

export const contactSchema = z.object({
  name: z.string().min(1, "Enter your name.").max(100),
  email: z.string().min(1, "Enter your email.").email("Enter a valid email."),
  subject: z.string().min(1, "Enter a subject.").max(150),
  message: z
    .string()
    .min(10, "Say a bit more — at least 10 characters.")
    .max(4000),
})

export type ContactValues = z.infer<typeof contactSchema>
