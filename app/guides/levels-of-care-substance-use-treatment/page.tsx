import Link from "next/link";
import GuideLayout from "@/components/GuideLayout";
import { getGuide } from "@/lib/guides";

const guide = getGuide("levels-of-care-substance-use-treatment")!;

export const metadata = {
  title: guide.title,
  description: guide.excerpt,
};

export default function Page() {
  return (
    <GuideLayout title={guide.title} dek={guide.excerpt} relatedCategories={guide.relatedCategories}>
      <p>
        Substance use treatment isn't one thing — it's a continuum, moving
        from the most intensive, medically supervised care down to
        increasingly independent support. Most people don't stay in one
        level the whole time; treatment is usually designed to step down
        as stability increases. Here's the full picture, at a glance.
      </p>

      <h2>Detox: stabilizing the body first</h2>
      <p>
        Detox is the medical process of clearing a substance from the
        body while managing withdrawal safely, typically with 24/7
        monitoring and medication support over several days to about a
        week. It addresses the physical side of dependence — it isn't,
        by itself, treatment for the underlying addiction.
      </p>

      <h2>Residential treatment: full-time, structured care</h2>
      <p>
        Residential (inpatient) treatment is where the therapeutic work
        happens — individual therapy, group sessions, and treatment for
        co-occurring conditions — with residents living on-site full time,
        away from daily triggers. Programs typically run 30 to 90 days.
      </p>
      <p>
        We've written a full comparison of these first two stages —{" "}
        <Link href="/guides/detox-vs-residential-treatment" className="font-semibold text-navy-600 hover:text-navy-700">
          Detox vs. Residential Treatment
        </Link>{" "}
        — if that distinction is the one that matters most right now.
      </p>

      <h2>Outpatient treatment: care while living at home</h2>
      <p>
        Outpatient treatment covers a range of program intensities, all
        sharing one feature: the person continues living at home and
        attending work, school, or family responsibilities while getting
        treatment. This ranges from a few hours a week of therapy and
        support, up to more intensive step-down programs like Intensive
        Outpatient (IOP) or Partial Hospitalization (PHP), for people who
        need significant structure but not 24/7 residential care.
        Outpatient is often where residential treatment leads after
        discharge, rather than a sudden return to full independence.
      </p>

      <h2>How the levels usually connect</h2>
      <ul>
        <li><strong>Acute physical dependence</strong> generally starts with detox — the body needs to stabilize before therapy can be meaningfully effective.</li>
        <li><strong>The behavioral and psychological work</strong> happens in residential treatment, once detox is complete or confirmed unnecessary.</li>
        <li><strong>Ongoing support while rebuilding daily life</strong> happens in outpatient care, sober living, or a combination — this is usually the longest phase, and often the one that determines whether recovery holds.</li>
      </ul>

      <h2>There's no single "right" starting point</h2>
      <p>
        Where someone enters this continuum depends on the substance
        involved, how long and how heavily it's been used, and whether
        there are co-occurring medical or mental health conditions. A
        facility's intake team can usually recommend the right starting
        level after an initial assessment — it's worth calling directly
        rather than guessing based on severity alone.
      </p>
    </GuideLayout>
  );
}
