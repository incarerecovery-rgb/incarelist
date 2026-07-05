import { Mail } from "lucide-react";

export const metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <div className="container-page py-16">
      <div className="mx-auto max-w-2xl">
        <p className="font-body text-sm font-semibold uppercase tracking-widest text-navy-600 mb-2">
          Contact
        </p>
        <h1 className="font-display text-3xl font-medium text-ink mb-6">
          Get in touch
        </h1>

        <div className="space-y-6 text-ink/80 leading-relaxed">
          <p>
            Whether you're a provider with a question about your listing, or
            you spotted something inaccurate that needs fixing, we'd like to
            hear from you. A real person on our team reads and responds to
            every message.
          </p>

          <div className="flex items-center gap-3 rounded-2xl border border-line bg-white p-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-50 text-navy-600">
              <Mail className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm text-ink/50">Email us at</p>
              <a
                href="mailto:hello@incarelist.com"
                className="font-display text-lg font-medium text-ink hover:text-navy-600"
              >
                hello@incarelist.com
              </a>
            </div>
          </div>

          <p className="text-sm text-ink/50">
            We typically respond within 2 business days.
          </p>

          <div className="rounded-2xl border border-line bg-mist p-6">
            <p className="text-sm text-ink/70">
              If you or someone you know is in crisis, please don't wait for
              a reply here — call or text 988 to reach the Suicide &amp;
              Crisis Lifeline, available 24/7.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
