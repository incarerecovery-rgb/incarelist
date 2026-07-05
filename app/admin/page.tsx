import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/supabase/admin";
import { ShieldCheck, PlusCircle, Star } from "lucide-react";

export const metadata = { title: "Admin" };

const SECTIONS = [
  {
    title: "Profile claims",
    description: "Review and approve claims on existing provider profiles.",
    href: "/admin/claims",
    icon: ShieldCheck,
  },
  {
    title: "New profile submissions",
    description: "Review profiles submitted via \"Create your free profile.\"",
    href: "/admin/submissions",
    icon: PlusCircle,
  },
  {
    title: "Premium",
    description: "Mark a claimed provider Premium once they've paid.",
    href: "/admin/providers",
    icon: Star,
  },
];

export default async function AdminHomePage() {
  const supabase = await createClient();

  if (!supabase) {
    return (
      <div className="container-page py-20 text-center">
        <p className="text-ink/60">Admin tools aren't connected to a database yet.</p>
      </div>
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/sign-in?next=/admin");
  if (!isAdminEmail(user.email)) {
    return (
      <div className="container-page py-20 text-center">
        <p className="text-ink/60">You don't have access to this page.</p>
      </div>
    );
  }

  return (
    <div className="container-page py-16">
      <p className="font-body text-sm font-semibold uppercase tracking-widest text-navy-600 mb-2">Admin</p>
      <h1 className="font-display text-3xl font-semibold text-ink mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {SECTIONS.map(({ title, description, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-start gap-4 rounded-2xl border border-line bg-white p-6 hover:border-navy-300 hover:shadow-md transition-all"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy-600">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="font-semibold text-ink">{title}</p>
              <p className="mt-1 text-sm text-ink/60">{description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
