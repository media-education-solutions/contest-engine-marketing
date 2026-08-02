"use client";

import { useActionState, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TurnstileWidget } from "@/components/ui/turnstile-widget";
import { formatPhoneNumber } from "@/lib/utils";
import { apply as content } from "@/content/pages/judges";
import { submitJudgeApplication, type JudgeFormState } from "./actions";

const initialState: JudgeFormState = { status: "idle" };

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

export function JudgeForm() {
  const [state, formAction, pending] = useActionState(
    submitJudgeApplication,
    initialState,
  );
  const [kind, setKind] = useState<"volunteer" | "freelance">(
    state.values?.judgeKind ?? "volunteer",
  );
  const [phone, setPhone] = useState(state.values?.phone ?? "");

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-10 text-center"
      >
        <CheckCircle2 className="size-10 text-brand" />
        <h2 className="text-2xl">Application sent</h2>
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
      <input type="hidden" name="judgeKind" value={kind} />

      <div role="group" aria-label="Judge type" className="flex gap-2">
        <Button
          type="button"
          size="sm"
          variant={kind === "volunteer" ? "default" : "outline"}
          aria-pressed={kind === "volunteer"}
          onClick={() => setKind("volunteer")}
        >
          Volunteer
        </Button>
        <Button
          type="button"
          size="sm"
          variant={kind === "freelance" ? "default" : "outline"}
          aria-pressed={kind === "freelance"}
          onClick={() => setKind("freelance")}
        >
          Freelance
        </Button>
      </div>

      {kind === "volunteer" ? (
        <div className="rounded-lg bg-secondary/60 p-4 text-sm leading-relaxed text-muted-foreground">
          <p className="font-medium text-foreground">{content.volunteer.intro}</p>
          <ul className="mt-2 space-y-1">
            {content.volunteer.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="rounded-lg bg-secondary/60 p-4 text-sm leading-relaxed text-muted-foreground">
          {content.freelance.body}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="judge-name">
            Name <RequiredMark />
          </Label>
          <Input
            id="judge-name"
            name="name"
            autoComplete="name"
            required
            defaultValue={state.values?.name}
          />
          <FieldError message={state.fieldErrors?.name} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="judge-email">
            Email <RequiredMark />
          </Label>
          <Input
            id="judge-email"
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
          <Label htmlFor="judge-phone">Phone</Label>
          <Input
            id="judge-phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            placeholder="(303) 555-1234"
            maxLength={14}
            value={phone}
            onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
          />
          <FieldError message={state.fieldErrors?.phone} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="judge-job-title">Job title</Label>
          <Input
            id="judge-job-title"
            name="jobTitle"
            autoComplete="organization-title"
            defaultValue={state.values?.jobTitle}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="judge-note">Note</Label>
        <Textarea
          id="judge-note"
          name="note"
          rows={5}
          placeholder="Anything else we should know?"
          defaultValue={state.values?.note}
        />
      </div>

      {/* Honeypot — hidden from humans, tempting to bots */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label htmlFor="judge-website">Website</label>
        <input id="judge-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <TurnstileWidget action="judge" resetOn={state} />

      {state.status === "error" && !state.fieldErrors && (
        <p className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {state.message}
        </p>
      )}

      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={pending}>
        {pending ? "Sending…" : "Become a Judge"}
      </Button>
    </form>
  );
}
