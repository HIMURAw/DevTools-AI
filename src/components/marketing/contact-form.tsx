"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SendIcon } from "lucide-react"
import { toast } from "sonner"

import {
  contactSchema,
  type ContactValues,
} from "@/lib/validations/contact.schema"
import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  })

  const onSubmit = handleSubmit((values) => {
    const body = `${values.message}\n\n---\nFrom: ${values.name} <${values.email}>`
    const url = `${siteConfig.links.github}/issues/new?title=${encodeURIComponent(
      values.subject
    )}&body=${encodeURIComponent(body)}`

    window.open(url, "_blank", "noopener,noreferrer")
    toast.success("Opening a new GitHub issue with your message…")
    reset()
  })

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Ada Lovelace"
            aria-invalid={Boolean(errors.name)}
            {...register("name")}
          />
          {errors.name && (
            <p className="text-destructive text-xs">{errors.name.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="ada@example.com"
            aria-invalid={Boolean(errors.email)}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-destructive text-xs">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          placeholder="Bug report, feature idea, question…"
          aria-invalid={Boolean(errors.subject)}
          {...register("subject")}
        />
        {errors.subject && (
          <p className="text-destructive text-xs">{errors.subject.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          rows={6}
          placeholder="What's going on?"
          aria-invalid={Boolean(errors.message)}
          {...register("message")}
        />
        {errors.message && (
          <p className="text-destructive text-xs">{errors.message.message}</p>
        )}
      </div>

      <p className="text-muted-foreground text-xs">
        This opens a new GitHub issue in your browser with your message
        pre-filled — DevTools AI doesn&rsquo;t run its own mail server.
      </p>

      <Button type="submit" disabled={isSubmitting} className="self-start">
        <SendIcon className="size-4" />
        Continue on GitHub
      </Button>
    </form>
  )
}
