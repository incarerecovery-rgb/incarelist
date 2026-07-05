"use client";

import { useState, useTransition } from "react";
import { CheckCircle2 } from "lucide-react";
import { submitContactMessage } from "@/lib/actions/contact";

export default function ContactProviderForm({ providerSlug }: { providerSlug: string }) {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  function handleSubmit(formData: FormData) {
    formData.set("providerSlug", providerSlug);
    startTransition(async () => {
      const res = await submitContactMessage(formData);
      setResult(res);
    });
  }

  if (result?.ok) {
    return (
      <div className="rounded-2xl border border-line bg-navy-50 p-6 flex gap-3">
        <CheckCircle2 className="h-5 w-5 shrink-0 text-navy-600 mt-0.5" aria-hidden="true" />
        <div>
          <p className="font-semibold text-ink">Message sent</p>
          <p className="mt-1 text-sm text-ink/70">{result.message}</p>
        </div>
      </div>
    );
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <Field id="senderName" label="Your name" required />
      <Field id="senderEmail" label="Your email" type="email" required />
      <Field id="senderPhone" label="Your phone (optional)" type="tel" />

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-ink mb-1.5">
          Message <span className="text-navy-600">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="What would you like to ask or share?"
          className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:border-navy-400"
        />
      </div>

      {result && !result.ok && <p className="text-sm text-red-600">{result.message}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white hover:bg-orange-600 transition-colors disabled:opacity-60"
      >
        {isPending ? "Sending…" : "Send message"}
      </button>

      <p className="text-xs text-ink/40">
        Your message goes directly to the provider. InCareList doesn't store
        or read it.
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  type = "text",
  required,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
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
        className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:border-navy-400"
      />
    </div>
  );
}
