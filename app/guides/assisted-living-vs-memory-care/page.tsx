import GuideLayout from "@/components/GuideLayout";
import { getGuide } from "@/lib/guides";

const guide = getGuide("assisted-living-vs-memory-care")!;

export const metadata = {
  title: guide.title,
  description: guide.excerpt,
};

export default function Page() {
  return (
    <GuideLayout title={guide.title} dek={guide.excerpt} relatedCategories={guide.relatedCategories}>
      <p>
        These two options get lumped together constantly, partly because
        they often exist inside the same building or under the same
        company. But they're built for different needs, and placing someone
        in the wrong one usually shows up fast — either as a safety problem
        or as a resident who feels over-managed and loses independence they
        didn't need to lose.
      </p>

      <h2>Assisted living: support with daily life, not medical care</h2>
      <p>
        Assisted living is designed for people who are largely independent
        but need help with specific daily tasks — medication reminders,
        bathing, dressing, meals, or transportation. Residents typically
        have their own apartment or room, come and go with reasonable
        freedom, and take part in community life and activities. Staff are
        present around the clock, but the model assumes residents can
        largely direct their own day.
      </p>

      <h2>Memory care: a secured environment built around cognitive decline</h2>
      <p>
        Memory care serves people with Alzheimer's disease or another form
        of dementia, at a stage where wandering, confusion, or safety risks
        make an open environment unsafe. The building itself is usually
        secured — locked or monitored exits — specifically to prevent a
        resident from leaving unsupervised and becoming lost, which is one
        of the more common and dangerous outcomes of unmanaged dementia.
        Staff are trained specifically in dementia care, and the daily
        structure is more consistent and repetitive by design, since
        predictability tends to reduce agitation for people with cognitive
        decline.
      </p>

      <h2>The signals that usually point to memory care</h2>
      <ul>
        <li>Wandering, or getting lost in familiar places</li>
        <li>Leaving the stove on, or other safety-relevant forgetfulness</li>
        <li>Increasing confusion about time, place, or familiar people</li>
        <li>Aggression or significant personality change tied to confusion</li>
        <li>A formal diagnosis of moderate-to-advanced dementia from a physician</li>
      </ul>
      <p>
        Early-stage dementia doesn't automatically require memory care —
        many people in early stages do fine in assisted living, sometimes
        with added support. It's the safety risks above, more than the
        diagnosis alone, that typically drive the decision.
      </p>

      <h2>Cost and what it usually includes</h2>
      <p>
        Memory care generally costs more than assisted living, reflecting
        the higher staff-to-resident ratio and specialized training
        required. Neither is typically covered by Medicare, since both are
        classified as custodial (non-medical) care rather than skilled
        nursing. Long-term care insurance, veterans' benefits, and in some
        cases Medicaid (depending on state rules and financial eligibility)
        are the more common ways families cover the cost.
      </p>

      <h2>A practical way to decide</h2>
      <p>
        A geriatric care manager or the discharge planner at a hospital or
        rehab facility can do a formal assessment, but a rough gut check:
        if the primary concern is "they need help remembering things and
        getting around," assisted living usually fits. If the concern is
        "they're not safe unsupervised," memory care is worth touring
        seriously, even before a doctor formally recommends it — waitlists
        for good memory care communities can be long, and it's easier to
        plan ahead than to scramble after a safety incident.
      </p>
    </GuideLayout>
  );
}
