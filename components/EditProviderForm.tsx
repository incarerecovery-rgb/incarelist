"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { CheckCircle2, Lock } from "lucide-react";
import { updateProvider } from "@/lib/actions/provider";
import { INSURANCE_TYPES } from "@/lib/types";
import { getPlanForCategory } from "@/lib/pricing";

interface Initial {
  description: string;
  phone: string;
  website: string;
  address: string;
  zip: string;
  imageUrl: string;
  logoUrl: string;
  hoursOfOperation: string;
  contactEmail: string;
  facebookUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  servicesOffered: string[];
  insuranceTypes: string[];
}

export default function EditProviderForm({
  providerId,
  providerSlug,
  isPremium,
  category,
  initial,
}: {
  providerId: string;
  providerSlug: string;
  isPremium: boolean;
  category: string;
  initial: Initial;
}) {
  const plan = getPlanForCategory(category);
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  function handleSubmit(formData: FormData) {
    formData.set("providerId", providerId);
    formData.set("providerSlug", providerSlug);
    startTransition(async () => {
      const res = await updateProvider(formData);
      setResult(res);
    });
  }

  return (
    <form action={handleSubmit} className="max-w-2xl space-y-8">
      {result && (
        <div
          className={`flex items-center gap-2 rounded-xl p-4 text-sm ${
            result.ok ? "bg-navy-50 text-navy-700" : "bg-red-50 text-red-700"
          }`}
        >
          {result.ok && <CheckCircle2 className="h-4 w-4" aria-hidden="true" />}
          {result.message}
        </div>
      )}

      <section className="space-y-4">
        <h2 className="font-display text-lg font-semibold text-ink">Basics</h2>
        <p className="text-xs text-ink/50">Free on every profile.</p>

        <Field id="phone" label="Phone number" type="tel" defaultValue={initial.phone} />
        <Field id="address" label="Street address" defaultValue={initial.address} />
        <Field id="zip" label="ZIP code" defaultValue={initial.zip} />
      </section>

      {isPremium ? (
        <section className="space-y-4">
          <h2 className="font-display text-lg font-semibold text-ink">Premium details</h2>
          <Field id="website" label="Website" type="text" placeholder="e.g. mybusiness.com" defaultValue={initial.website} />
          <Field id="logoUrl" label="Logo URL" defaultValue={initial.logoUrl} />
          <Field id="imageUrl" label="Cover photo URL" defaultValue={initial.imageUrl ?? ""} />
          <Field id="hoursOfOperation" label="Hours of operation" defaultValue={initial.hoursOfOperation} placeholder="e.g. Mon–Fri 9am–5pm" />
          <Field
            id="contactEmail"
            label="Contact form delivery email"
            type="email"
            defaultValue={initial.contactEmail}
            placeholder="Where 'Send a message' submissions are delivered"
          />
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-ink mb-1.5">
              Full business description
            </label>
            <textarea
              id="description"
              name="description"
              rows={5}
              defaultValue={initial.description}
              className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:border-navy-400"
            />
          </div>
          <div>
            <label htmlFor="servicesOffered" className="block text-sm font-medium text-ink mb-1.5">
              Services offered (comma-separated)
            </label>
            <input
              id="servicesOffered"
              name="servicesOffered"
              defaultValue={initial.servicesOffered.join(", ")}
              placeholder="e.g. Individual Therapy, Family Counseling, Telehealth"
              className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:border-navy-400"
            />
          </div>
          <Field id="facebookUrl" label="Facebook link (optional)" type="text" defaultValue={initial.facebookUrl} />
          <Field id="instagramUrl" label="Instagram link (optional)" type="text" defaultValue={initial.instagramUrl} />
          <Field id="linkedinUrl" label="LinkedIn link (optional)" type="text" defaultValue={initial.linkedinUrl} />
        </section>
      ) : (
        <section className="rounded-2xl border border-dashed border-line bg-mist p-6">
          <div className="flex items-start gap-3">
            <Lock className="h-5 w-5 shrink-0 text-ink/40 mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-ink">Website, logo, photos, description &amp; more</p>
              <p className="mt-1 text-sm text-ink/60">
                Available with Premium (${plan.priceAnnual}/year). Insurance
                accepted is still saved below and used for search, even on
                the free plan — it just isn't shown on your public profile
                until you upgrade.
              </p>
              <Link
                href="/for-providers"
                className="mt-3 inline-flex text-sm font-semibold text-orange-600 hover:text-orange-700"
              >
                Upgrade to Premium →
              </Link>
            </div>
          </div>
          {/* Hidden fields preserve existing values on save, in case they were set before a downgrade */}
          <input type="hidden" name="website" value={initial.website} />
          <input type="hidden" name="imageUrl" value={initial.imageUrl ?? ""} />
          <input type="hidden" name="logoUrl" value={initial.logoUrl} />
          <input type="hidden" name="description" value={initial.description} />
          <input type="hidden" name="hoursOfOperation" value={initial.hoursOfOperation} />
          <input type="hidden" name="contactEmail" value={initial.contactEmail} />
        </section>
      )}

      <section className="space-y-3">
        <h2 className="font-display text-lg font-semibold text-ink">Insurance accepted</h2>
        <p className="text-xs text-ink/50">
          Used for search on every plan — only shown on your public profile with Premium.
        </p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {INSURANCE_TYPES.map((i) => (
            <label key={i} className="flex items-center gap-2 rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink/80">
              <input
                type="checkbox"
                name="insuranceTypes"
                value={i}
                defaultChecked={initial.insuranceTypes.includes(i)}
                className="h-4 w-4 rounded border-line text-navy-600 focus:ring-navy-400"
              />
              {i}
            </label>
          ))}
        </div>
      </section>

      <button
        type="submit"
        disabled={isPending}
        className="rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-600 transition-colors disabled:opacity-60"
      >
        {isPending ? "Saving…" : "Save changes"}
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  type = "text",
  defaultValue,
  placeholder,
}: {
  id: string;
  label: string;
  type?: string;
  defaultValue?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink mb-1.5">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:border-navy-400"
      />
    </div>
  );
}
