// Renders a Google Maps embed for a provider's address — Premium only,
// per lib/pricing.ts. Uses the Maps Embed API (simple iframe, no JS SDK,
// no client-side API usage), so the key only ever needs to be restricted
// to your domain, never to specific JS origins/referrers logic.
//
// If NEXT_PUBLIC_GOOGLE_MAPS_API_KEY isn't set yet, this renders nothing
// rather than a broken/blank iframe — the rest of the profile page still
// works fine without it.
export default function ProviderMap({
  address,
  city,
  state,
  zip,
  name,
}: {
  address: string;
  city?: string;
  state: string;
  zip: string;
  name: string;
}) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) return null;

  const query = encodeURIComponent(
    [address, city, state, zip].filter(Boolean).join(", ")
  );

  return (
    <div className="mt-10">
      <h2 className="font-display text-xl font-semibold text-ink mb-3">Location</h2>
      <div className="overflow-hidden rounded-2xl border border-line">
        <iframe
          title={`Map showing ${name}`}
          width="100%"
          height="280"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${query}&zoom=15`}
        />
      </div>
    </div>
  );
}
