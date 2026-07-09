"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { US_STATES } from "@/lib/us-states";
import { CATEGORIES } from "@/lib/types";

export default function SearchBar() {
  const [state, setState] = useState("california");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (state) params.set("state", state);
    if (query) params.set("q", query);
    if (category) params.set("category", category);
    router.push(`/browse${params.toString() ? `?${params.toString()}` : ""}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-3xl flex-col gap-3 rounded-2xl bg-canvas p-3 shadow-xl sm:flex-row sm:items-center"
    >
      <select
        value={state}
        onChange={(e) => setState(e.target.value)}
        aria-label="Select state"
        className="rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink focus:outline-none focus:border-navy-400 sm:w-44"
      >
        <option value="">All states</option>
        {US_STATES.map((s) => (
          <option key={s.slug} value={s.slug}>{s.name}</option>
        ))}
      </select>

      <div className="flex flex-1 items-center gap-3 border-t border-line px-1 pt-3 sm:border-t-0 sm:border-l sm:px-3 sm:pt-0">
        <Search className="h-5 w-5 shrink-0 text-ink/40" aria-hidden="true" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Try &quot;provider name&quot; or &quot;near 90210&quot;"
          aria-label="Search by provider or business name"
          className="w-full bg-transparent py-1 text-base text-ink placeholder:text-ink/40 focus:outline-none"
        />
      </div>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        aria-label="Select category"
        className="rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink focus:outline-none focus:border-navy-400 sm:w-52"
      >
        <option value="">All categories</option>
        {CATEGORIES.map((c) => (
          <option key={c.slug} value={c.slug}>{c.name}</option>
        ))}
      </select>

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-600 transition-colors"
      >
        Search
      </button>
    </form>
  );
}
