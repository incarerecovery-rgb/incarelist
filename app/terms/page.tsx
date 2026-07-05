import Link from "next/link";

export const metadata = {
  title: "Terms of Use",
};

export default function TermsPage() {
  return (
    <div className="container-page py-16">
      <div className="mx-auto max-w-2xl">
        <p className="font-body text-sm font-semibold uppercase tracking-widest text-navy-600 mb-2">
          Legal
        </p>
        <h1 className="font-display text-3xl font-medium text-ink mb-2">
          Terms of Use
        </h1>
        <p className="text-sm text-ink/50 mb-10">Last updated: July 2026</p>

        <div className="space-y-8 text-ink/80 leading-relaxed">
          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">Agreement to terms</h2>
            <p>
              By accessing or using InCareList, you agree to these Terms of Use.
              If you don't agree, please don't use the site.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">What InCareList is</h2>
            <p>
              InCareList is a nationwide directory of behavioral health and
              care providers — including therapists, treatment centers,
              senior living communities, and home care agencies — across the
              United States. We are not a treatment provider, a medical
              professional, or an emergency service.
            </p>
            <p className="mt-3">
              Providers pay a flat annual fee for a listing, regardless of
              whether that listing ever leads to a call, a claim, or an
              admission. <strong>We do not receive any commission, fee, or
              other compensation that depends on which provider you contact
              or choose.</strong> There is no obligation to contact, use, or
              enter treatment with any provider listed here.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">Who this service is for</h2>
            <p>
              InCareList is intended for use by residents of the United
              States searching for U.S.-based providers. If you're accessing
              the site from outside the U.S., please be aware your
              information may be transferred to and processed in the United
              States.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">Not medical advice</h2>
            <p>
              Nothing on InCareList is medical advice or a recommendation of any
              specific provider. Listings, including free listings built
              from public data, are provided for informational purposes and
              may contain errors or become outdated. Always verify
              information directly with a provider before making treatment
              decisions.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">If you're in crisis</h2>
            <p>
              InCareList is not a crisis or emergency service. If you or someone
              you know is in crisis, call or text 988 to reach the Suicide
              &amp; Crisis Lifeline, available 24/7, or call 911.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">Accounts</h2>
            <p>
              You need an account to claim a listing, submit a new listing,
              or manage a provider profile. You're responsible
              for the accuracy of anything you submit and for keeping your
              account secure.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">Claiming and submitting listings</h2>
            <p>
              When you claim a listing, you're representing that you're
              authorized to manage that business's or practice's
              information. We review claims and new submissions by hand and
              may decline or remove any claim or listing at our discretion,
              including if we can't verify it or believe it's inaccurate,
              fraudulent, or violates these terms.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">Premium subscriptions</h2>
            <p>
              Premium subscriptions are billed annually via Stripe at the
              rate shown at the time of purchase. Subscription features may
              change over time. For cancellations or refund requests,
              contact us directly.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">Prohibited conduct</h2>
            <p>You agree not to:</p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>Submit false, misleading, or fraudulent information</li>
              <li>Claim a listing you're not authorized to manage</li>
              <li>Use the site to harass, defraud, or harm others</li>
              <li>Attempt to disrupt or gain unauthorized access to the site or its data</li>
              <li>Scrape or bulk-copy listings for a competing commercial purpose</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">Disclaimer of warranties</h2>
            <p>
              InCareList is provided "as is." We don't guarantee that listings
              are accurate, complete, or current, or that any provider
              listed is licensed, qualified, or appropriate for your needs.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">Limitation of liability</h2>
            <p>
              To the fullest extent permitted by law, InCareList is not liable
              for any damages arising from your use of the site or reliance
              on any listing, including decisions about treatment providers.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">Changes to these terms</h2>
            <p>
              We may update these terms from time to time. We'll update the
              "Last updated" date above when we do. Continued use of the
              site after a change means you accept the updated terms.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">Governing law</h2>
            <p>These terms are governed by the laws of the State of California.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium text-ink mb-3">Contact us</h2>
            <p>
              Questions about these terms? Reach out through our{" "}
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
