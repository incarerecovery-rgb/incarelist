import Link from "next/link";
import SearchBar from "./SearchBar";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* signature motif: a quiet navy thread connecting points — the
          "continuum of care" this directory covers, from first therapy
          session to home health, rendered once, restrained */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-full w-full opacity-[0.5]"
        viewBox="0 0 1200 620"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M -40 520 C 160 420, 340 560, 540 460 S 900 380, 1100 470 S 1300 420, 1400 480"
          fill="none"
          stroke="#D7E1EA"
          strokeWidth="2"
        />
        {[0, 220, 440, 660, 880].map((x, i) => (
          <circle key={i} cx={x + 120} cy={460 - (i % 2 === 0 ? 40 : -20)} r="4" fill="#1E3A5F" opacity="0.35" />
        ))}
      </svg>

      <div className="container-page relative py-20 sm:py-28">
        <p className="font-body text-sm font-semibold uppercase tracking-widest text-navy-600 mb-4">
          America's Behavioral Health &amp; Care Directory
        </p>
        <h1 className="font-display text-4xl sm:text-6xl font-semibold text-ink leading-[1.05] max-w-3xl">
          Find the right care, without the guesswork.
        </h1>
        <p className="mt-5 text-lg text-ink/70 max-w-xl">
          Search therapists, treatment centers, senior living communities,
          and home care providers across the United States — by name,
          business, or category.
        </p>

        <div className="mt-10">
          <SearchBar />
        </div>

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink/60">
          <span>All care categories covered</span>
          <span className="text-navy-300">·</span>
          <span>Every U.S. state</span>
          <span className="text-navy-300">·</span>
          <span>No cost to search</span>
          <span className="text-navy-300">·</span>
          <Link href="/add-profile" className="underline decoration-orange-300 underline-offset-2 hover:text-orange-600">
            Don't see your practice or facility? Create your free profile
          </Link>
        </div>
      </div>
    </section>
  );
}
