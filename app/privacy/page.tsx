import Link from "next/link";

export const metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <div className="container-page py-16">
      <div className="mx-auto max-w-2xl">
        <p className="font-body text-sm font-semibold uppercase tracking-widest text-navy-600 mb-2">
          Legal
        </p>
        <h1 className="font-display text-3xl font-medium text-ink mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-ink/50 mb-10">Last updated: July 2026</p>

        <div className="prose-content space-y-8 text-ink/80 leading-relaxed">
          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">Overview</h2>
            <p>
              InCareList ("we," "us," or "our") operates a nationwide
              directory of behavioral health and care providers — including
              therapists, treatment centers, senior living communities, and
              home care agencies — across the United States. This policy
              explains what information we collect, how we use it, and the
              choices you have.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">Information we collect</h2>
            <p className="mb-3">
              <strong>Directory information.</strong> Free listings are built
              from publicly available sources, such as state and federal
              licensing records. This includes business or provider names,
              addresses, phone numbers, and license information.
            </p>
            <p className="mb-3">
              <strong>Account information.</strong> If you create an account
              to claim or submit a listing, we collect your email address
              through our authentication provider (Supabase). We use
              passwordless "magic link" sign-in, so we never store a
              password.
            </p>
            <p>
              <strong>Claim and submission information.</strong> When you
              claim a profile or create a new profile, we collect
              what you provide: your name, role, phone number, email, and any
              other details submitted for our review — such as license
              numbers, business details, or verification notes.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">How we use information</h2>
            <p>We use the information we collect to:</p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>Operate and maintain the directory</li>
              <li>Review and verify listing claims and new submissions</li>
              <li>Communicate with you about your account or listing</li>
              <li>Maintain the security and integrity of the site</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">How we share information</h2>
            <p className="mb-3">
              We do not sell your personal information. We share information
              only with service providers who help us operate the site —
              currently Supabase (database and authentication) and Netlify
              (hosting) — and, once payment processing is live, a payment
              provider such as Stripe or PayPal to process subscription
              payments. These providers only access what they need to
              perform their function.
            </p>
            <p>
              We may also disclose information if required by law, or to
              protect the safety, rights, or property of InCareList, our users,
              or the public.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">Cookies</h2>
            <p>
              We use cookies required for authentication — to keep you
              signed in and to know who's submitting a claim. We also use
              Google Analytics to understand how visitors use the site
              (which pages are viewed, general location by region, device
              type). Google Analytics uses cookies and does not identify
              you personally. We do not currently use advertising cookies
              or share this data for ad targeting.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">Your choices</h2>
            <p>
              You can request access to, correction of, or deletion of your
              personal information by contacting us (see below). If you
              submitted a claim or listing and want it removed or corrected,
              you can also reach out directly.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">Your privacy rights</h2>
            <p className="mb-3">
              Depending on where you live, you may have rights under state
              privacy laws (including California's CCPA/CPRA, and similar
              laws in states such as Colorado, Connecticut, Virginia, and
              others) to:
            </p>
            <ul className="list-disc pl-5 space-y-1 mb-3">
              <li>Confirm what personal information we hold about you</li>
              <li>Access or request a copy of that information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
            </ul>
            <p>
              We do not sell personal information, and we do not currently
              use tracking technologies that would qualify as a "sale" or
              "share" under these laws. To exercise any of these rights,
              contact us using the details below — we'll respond within the
              timeframe required by applicable law.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">Data retention</h2>
            <p>
              We keep account and claim/submission information for as long
              as your account or listing is active, and for a reasonable
              period afterward in case of disputes or legal requirements.
              Directory information sourced from public records is retained
              as long as the listing remains on the site. You can request
              deletion at any time, subject to the limits described above.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">Data security</h2>
            <p>
              We take reasonable measures to protect information from
              unauthorized access or disclosure, including access controls
              on our database. No method of storing or transmitting
              information is completely secure, and we cannot guarantee
              absolute security.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">Children's privacy</h2>
            <p>
              InCareList is not directed to children under 18, and we do not
              knowingly collect personal information from children. If you
              believe a child has provided us with personal information,
              please contact us and we will remove it.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">If you're in crisis</h2>
            <p>
              This site is a directory, not a crisis service. If you or
              someone you know is in crisis, call or text 988 to reach the
              Suicide &amp; Crisis Lifeline, available 24/7.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">Changes to this policy</h2>
            <p>
              We may update this policy from time to time. We'll update the
              "Last updated" date above when we do. Continued use of the site
              after a change means you accept the updated policy.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">Contact us</h2>
            <p>
              Questions about this policy or your information? Reach out
              through our{" "}
              <Link href="/contact" className="text-navy-600 font-semibold hover:text-navy-700">
                contact page
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
