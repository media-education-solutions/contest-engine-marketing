"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { TurnstileWidget } from "@/components/ui/turnstile-widget";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { engines, addOns as addOnCatalog, formatUsd } from "@/content/commerce";
import { form as copy } from "@/content/pages/buy";
import { cn, formatPhoneNumber } from "@/lib/utils";
import { submitBuy, type BuyFormState } from "./actions";

const initialState: BuyFormState = { status: "idle" };

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

export function BuyForm({ defaultPlan }: { defaultPlan: string }) {
  const [state, formAction, pending] = useActionState(submitBuy, initialState);
  const [plan, setPlan] = useState(state.values?.plan || defaultPlan);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>(state.values?.addOns ?? []);
  const [phone, setPhone] = useState(state.values?.phone ?? "");
  const [schoolPhone, setSchoolPhone] = useState(state.values?.schoolPhone ?? "");

  const availableAddOns = useMemo(
    () => addOnCatalog.filter((a) => (a.appliesTo as readonly string[]).includes(plan)),
    [plan],
  );

  // Switching Engines can make a previously checked add-on no longer apply
  // (add-ons carry an `appliesTo` list). Derived during render rather than
  // synced via an effect: an id absent from availableAddOns simply never
  // renders as checked, contributes to the total, or gets submitted (its
  // checkbox — and the hidden input backing it — isn't in the DOM).
  const activeAddOnIds = selectedAddOns.filter((id) =>
    availableAddOns.some((a) => a.id === id),
  );

  useEffect(() => {
    if (state.status === "redirect" && state.url) {
      window.location.assign(state.url);
    }
  }, [state]);

  const engineTotal = engines.find((e) => e.id === plan)?.amountCents ?? 0;
  const addOnTotal = activeAddOnIds.reduce((sum, id) => {
    const addOn = addOnCatalog.find((a) => a.id === id);
    return sum + (addOn?.amountCents ?? 0);
  }, 0);
  const total = engineTotal + addOnTotal;

  if (state.status === "redirect") {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-10 text-center"
      >
        <Loader2 className="size-10 animate-spin text-brand" />
        <h2 className="text-2xl">Redirecting to secure checkout…</h2>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="space-y-6 rounded-xl border border-border bg-card p-6 sm:p-8"
      noValidate
    >
      <div className="space-y-2">
        <Label htmlFor="plan">
          {copy.engineLabel} <RequiredMark />
        </Label>
        <Select name="plan" value={plan} onValueChange={setPlan}>
          <SelectTrigger id="plan" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {engines.map((e) => (
              <SelectItem key={e.id} value={e.id}>
                {e.name} — {formatUsd(e.amountCents)} {e.priceNote}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <Label>{copy.addOnsLabel}</Label>
        <div className="space-y-3">
          {availableAddOns.map((addOn) => (
            <label
              key={addOn.id}
              className={cn(
                "flex items-start gap-3 rounded-lg border p-3 text-sm transition-colors",
                selectedAddOns.includes(addOn.id)
                  ? "border-brand/40 bg-brand/5"
                  : "border-border",
              )}
            >
              <Checkbox
                name="addon"
                value={addOn.id}
                checked={selectedAddOns.includes(addOn.id)}
                onCheckedChange={(checked) =>
                  setSelectedAddOns((prev) =>
                    checked === true ? [...prev, addOn.id] : prev.filter((id) => id !== addOn.id),
                  )
                }
                className="mt-0.5"
              />
              <span className="leading-relaxed">
                <span className="font-medium">{addOn.name}</span>{" "}
                <span className="whitespace-nowrap text-muted-foreground">
                  — {formatUsd(addOn.amountCents)}
                </span>
                <span className="block text-muted-foreground">{addOn.blurb}</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="teacherName">
            {copy.fields.teacherName} <RequiredMark />
          </Label>
          <Input
            id="teacherName"
            name="teacherName"
            autoComplete="name"
            required
            defaultValue={state.values?.teacherName}
          />
          <FieldError message={state.fieldErrors?.teacherName} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">
            {copy.fields.email} <RequiredMark />
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
          <Label htmlFor="phone">{copy.fields.phone}</Label>
          <Input
            id="phone"
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
          <Label htmlFor="schoolName">
            {copy.fields.schoolName} <RequiredMark />
          </Label>
          <Input
            id="schoolName"
            name="schoolName"
            autoComplete="organization"
            required
            defaultValue={state.values?.schoolName}
          />
          <FieldError message={state.fieldErrors?.schoolName} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="schoolAddress">{copy.fields.schoolAddress}</Label>
          <Input
            id="schoolAddress"
            name="schoolAddress"
            autoComplete="street-address"
            defaultValue={state.values?.schoolAddress}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="schoolPhone">{copy.fields.schoolPhone}</Label>
          <Input
            id="schoolPhone"
            name="schoolPhone"
            type="tel"
            inputMode="numeric"
            placeholder="(303) 555-1234"
            maxLength={14}
            value={schoolPhone}
            onChange={(e) => setSchoolPhone(formatPhoneNumber(e.target.value))}
          />
          <FieldError message={state.fieldErrors?.schoolPhone} />
        </div>
      </div>

      {/* Honeypot — hidden from humans, tempting to bots */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <TurnstileWidget action="buy" resetOn={state} />

      {state.status === "error" && !state.fieldErrors && (
        <p className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {state.message}
        </p>
      )}

      <div className="flex flex-col gap-4 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          {copy.poNote.text}{" "}
          <a
            href={copy.poNote.href}
            className="font-medium text-brand underline underline-offset-4"
          >
            {copy.poNote.linkLabel}
          </a>
        </p>
        <p className="font-heading text-lg font-semibold whitespace-nowrap">
          {copy.summaryLabel}: {formatUsd(total)}
        </p>
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        {pending ? copy.submitPendingLabel : copy.submitLabel}
      </Button>
    </form>
  );
}
