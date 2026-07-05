"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Browse Providers", href: "/browse" },
  { label: "Categories", href: "/categories" },
  { label: "Guides", href: "/guides" },
  { label: "For Providers", href: "/for-providers" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-line bg-canvas/95 backdrop-blur sticky top-0 z-40">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-500 text-white font-display font-bold text-sm">
            IC
          </span>
          <span className="font-display text-xl font-semibold text-ink tracking-tight">
            InCareList
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-ink/80">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-navy-600 transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/sign-in"
            className="text-sm font-medium text-ink/80 hover:text-navy-600 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/add-profile"
            className="inline-flex items-center rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600 transition-colors"
          >
            Create Free Profile
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="sm:hidden flex h-9 w-9 items-center justify-center rounded-lg text-ink"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="sm:hidden border-t border-line bg-canvas px-6 py-4 space-y-3">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="block text-sm font-medium text-ink/80">
              {link.label}
            </Link>
          ))}
          <Link href="/sign-in" onClick={() => setOpen(false)} className="block text-sm font-medium text-ink/80">
            Sign In
          </Link>
          <Link
            href="/add-profile"
            onClick={() => setOpen(false)}
            className="inline-flex items-center rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white"
          >
            Create Free Profile
          </Link>
        </div>
      )}
    </header>
  );
}
