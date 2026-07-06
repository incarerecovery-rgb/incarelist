"use client";

import { useState, useTransition } from "react";
import { CheckCircle2 } from "lucide-react";
import { submitProvider } from "@/lib/actions/add-provider";
import { CATEGORIES, INSURANCE_TYPES } from "@/lib/types";
import { US_STATES } from "@/lib/us-states";

export default function AddProviderForm() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const res = await submitProvider(formData);
      setResult(res);
    });
  }

  if (result?.ok) {
    return (
      <div className="space-y-4">
        <div className="rounded-2xl border border-line bg-navy-50 p-6 flex gap-3">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-navy-600 mt-0.5" aria-hidden="true" />
          <div>
            <p className="font-semibold text-ink">Submitted for review</p>
            <p className="mt-1 text-sm text-ink/70">{result.message}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-mist p-6">
          <p className="font-semibold text-ink">Want more than a basic listing?</p>
          <p className="mt-1 text-sm text-ink/70">
            Premium adds your website, photos, a full description, and
            featured placement in search results — starting at $45/year.
          </p>
          <a
            href="/for-providers"
            className="mt-3 inline-flex text-sm font-semibold text-orange-600 hover:text-orange-700"
          >
            See Premium plans →
          </a>
        </div>
      </div>
    );
  }

  return (
    <form action={handleSubmit} className="max-w-2xl space-y-8">
      <section className="space-y-4">
        <h2 className="font-display text-lg font-semibold text-ink">Profile details</h2>
        <Field id="providerName" label="Business or provider name" required />

        <div>
          <label htmlFor="categorySlug" className="block text-sm font-medium text-ink mb-1.5">
            Category <span className="text-navy-600">*</span>
          </label>
          <select
            id="categorySlug"
            name="categorySlug"
            required
            className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink focus:outline-none focus:border-navy-400"
          >
            <option value="">Select a category</option>
            {CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="stateSlug" className="block text-sm font-medium text-ink mb-1.5">
            State <span className="text-navy-600">*</span>
          </label>
          <select
            id="stateSlug"
            name="stateSlug"
            required
            className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink focus:outline-none focus:border-navy-400"
          >
            <option value="">Select a state</option>
            {US_STATES.map((s) => (
              <option key={s.slug} value={s.slug}>{s.name}</option>
            ))}
          </select>
        </div>

        <Field id="address" label="Street address" required />
        <Field id="zip" label="ZIP code" required />
        <Field id="phone" label="Phone number" type="tel" required />
        <div>
          <Field id="website" label="Website (optional)" type="text" placeholder="e.g. mybusiness.com" />
          <p className="mt-1.5 text-xs text-ink/50">
            We'll save this now — it'll show on your public profile once you upgrade to Premium.
          </p>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-ink mb-1.5">
            Description (optional)
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:border-navy-400"
          />
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg font-semibold text-ink">Insurance accepted</h2>
        <p className="text-xs text-ink/50">
          Used for search on every plan — only shown on your public profile with Premium.
        </p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {INSURANCE_TYPES.map((i) => (
            <label key={i} className="flex items-center gap-2 rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink/80">
              <input type="checkbox" name="insuranceTypes" value={i} className="h-4 w-4 rounded border-line text-navy-600 focus:ring-navy-400" />
              {i}
            </label>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-lg font-semibold text-ink">Your info</h2>
        <p className="text-sm text-ink/60">
          We review every new profile by hand before it goes live. You'll own this profile once approved.
        </p>
        <Field id="submitterName" label="Your full name" required />
        <Field id="submitterRole" label="Your role at this business" required placeholder="e.g. Admissions Director" />
        <Field id="submitterEmail" label="Work email" type="email" required />
        <Field id="submitterPhone" label="Your phone number" type="tel" required />
      </section>

      {result && !result.ok && <p className="text-sm text-red-600">{result.message}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-600 transition-colors disabled:opacity-60"
      >
        {isPending ? "Submitting…" : "Submit for review"}
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
