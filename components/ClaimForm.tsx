"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { CheckCircle2 } from "lucide-react";
import { submitClaim } from "@/lib/actions/claims";

export default function ClaimForm({
  providerSlug,
  providerName,
  planId,
}: {
  providerSlug: string;
  providerName: string;
  planId?: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  function handleSubmit(formData: FormData) {
    formData.set("providerSlug", providerSlug);
    if (planId) formData.set("planId", planId);
    startTransition(async () => {
      const res = await submitClaim(formData);
      setResult(res);
    });
  }

  if (result?.ok) {
    return (
      <div className="rounded-2xl border border-line bg-navy-50 p-6 flex gap-3">
        <CheckCircle2 className="h-5 w-5 shrink-0 text-navy-600 mt-0.5" aria-hidden="true" />
        <div>
          <p className="font-semibold text-ink">Claim submitted</p>
          <p className="mt-1 text-sm text-ink/70">{result.message}</p>
        </div>
      </div>
    );
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <p className="text-sm text-ink/60">
        Claiming <span className="font-semibold text-ink">{providerName}</span>.
        Our team reviews every claim by hand before it goes live.
      </p>
      {planId && (
        <p className="rounded-lg bg-navy-100 px-3 py-2 text-sm text-ink/70">
          Interested in the <span className="font-semibold capitalize">{planId}</span> plan?
          Claim your free profile here first, then visit the{" "}
          <Link href="/for-providers" className="font-semibold underline">pricing page</Link>{" "}
          to complete Premium checkout via Stripe.
        </p>
      )}

      <Field id="fullName" label="Your full name" required />
      <Field id="role" label="Your role at this business" required placeholder="e.g. Admissions Director" />
      <Field id="workEmail" label="Work email" type="email" required />
      <Field id="phone" label="Phone number" type="tel" required />

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-ink mb-1.5">
          Anything else that helps us verify you? (optional)
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:border-navy-400"
          placeholder="e.g. link to a staff directory listing you"
        />
      </div>

      {result && !result.ok && (
        <p className="text-sm text-red-600">{result.message}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white hover:bg-orange-600 transition-colors disabled:opacity-60"
      >
        {isPending ? "Submitting…" : "Submit claim"}
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  type = "text",
  required,
  placeholder,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink mb-1.5">
        {label} {required && <span className="text-navy-600">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:border-navy-400"
      />
    </div>
  );
}
