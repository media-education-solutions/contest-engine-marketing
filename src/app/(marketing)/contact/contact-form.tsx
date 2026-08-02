"use client";

import { useActionState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TurnstileWidget } from "@/components/ui/turnstile-widget";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { submitContact, type ContactFormState } from "./actions";

const initialState: ContactFormState = { status: "idle" };

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-sm text-destructive">{message}</p>;
}

/** Visual marker only — screen readers get the input's `required` attribute. */
function RequiredMark() {
  return (
    <span aria-hidden className="text-brand">
      *
    </span>
  );
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initialState);

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-10 text-center"
      >
        <CheckCircle2 className="size-10 text-brand" />
        <h2 className="text-2xl">Message sent</h2>
        <p className="max-w-sm text-muted-foreground">{state.message}</p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="space-y-5 rounded-xl border border-border bg-card p-6 sm:p-8"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">
            Name <RequiredMark />
          </Label>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            required
            defaultValue={state.values?.name}
          />
          <FieldError message={state.fieldErrors?.name} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">
            Email <RequiredMark />
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={state.values?.email}
          />
          <FieldError message={state.fieldErrors?.email} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="organization">School or organization</Label>
          <Input
            id="organization"
            name="organization"
            autoComplete="organization"
            defaultValue={state.values?.organization}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="role">I am a…</Label>
          <Select name="role" defaultValue={state.values?.role ?? "educator"}>
            <SelectTrigger id="role" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="educator">Educator</SelectItem>
              <SelectItem value="coordinator">Contest coordinator</SelectItem>
              <SelectItem value="other">Something else</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">
          How can we help? <RequiredMark />
        </Label>
        <Textarea
          id="message"
          name="message"
          rows={6}
          required
          placeholder="Tell us about your contest: how many participants, what kinds of categories, when it runs…"
          defaultValue={state.values?.message}
        />
        <FieldError message={state.fieldErrors?.message} />
      </div>

      {/* Honeypot — hidden from humans, tempting to bots */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <TurnstileWidget action="contact" resetOn={state} />

      {state.status === "error" && !state.fieldErrors && (
        <p className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {state.message}
        </p>
      )}

      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={pending}>
        {pending ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
