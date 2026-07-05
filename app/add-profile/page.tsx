import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import AddProviderForm from "@/components/AddProviderForm";
import { PlusCircle } from "lucide-react";

export const metadata = {
  title: "Create Your Free Professional Profile",
  description: "Don't see your practice or facility on InCareList? Create your free profile and it'll be reviewed and listed within 2 business days.",
};

export default async function AddProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = supabase ? await supabase.auth.getUser() : { data: { user: null } };

  return (
    <div className="container-page py-16">
      <div className="mx-auto max-w-2xl">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-50 text-navy-600 mb-4">
          <PlusCircle className="h-5 w-5" aria-hidden="true" />
        </span>
        <p className="font-body text-sm font-semibold uppercase tracking-widest text-navy-600 mb-2">
          Create your profile
        </p>
        <h1 className="font-display text-3xl font-semibold text-ink mb-2">
          Don't see your practice or facility listed?
        </h1>
        <p className="text-ink/70 mb-8">
          Create your free professional profile. We review every new profile
          by hand — once approved, it goes live and you own it automatically,
          no separate claim needed.
        </p>

        {user ? (
          <AddProviderForm />
        ) : (
          <div className="rounded-2xl border border-line bg-mist p-6">
            <p className="text-sm text-ink/70 mb-4">
              Sign in first so we know who's creating this profile.
            </p>
            <Link
              href={`/sign-in?next=${encodeURIComponent("/add-profile")}`}
              className="inline-flex w-full items-center justify-center rounded-xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white hover:bg-orange-600"
            >
              Sign in to continue
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
