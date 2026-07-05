export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="container-page py-16">
      <div className="mx-auto max-w-2xl">
        <p className="font-body text-sm font-semibold uppercase tracking-widest text-navy-600 mb-2">
          About
        </p>
        <h1 className="font-display text-3xl font-semibold text-ink mb-6">
          Finding care shouldn't be this hard
        </h1>

        <div className="space-y-6 text-ink/80 leading-relaxed">
          <p>
            InCareList started with a simple observation: when someone is
            looking for behavioral health or care support — for themselves,
            a parent, or someone they love — the search itself is often the
            hardest part. Scattered directories, outdated listings, and
            pages that don't tell you what you actually need to know before
            you pick up the phone.
          </p>
          <p>
            We're building a directory that starts with the basics done
            right: verified providers, accurate contact information, and a
            search that actually helps you narrow down what fits — by
            state, category, and insurance accepted.
          </p>
          <p>
            InCareList covers the full continuum of care in one place — from
            therapists and psychiatrists to substance use treatment,
            assisted living, memory care, and home health — organized by
            state across the United States. Every provider gets a free,
            accurate profile from day one — providers can claim their
            profile to keep it up to date, and upgrade if they want a fuller
            listing.
          </p>
          <p>
            If you're a provider and don't see your profile, or see one that
            needs fixing, we'd rather hear from you directly than have it
            sit wrong.
          </p>
        </div>
      </div>
    </div>
  );
}
