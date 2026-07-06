import GuideLayout from "@/components/GuideLayout";
import { getGuide } from "@/lib/guides";

const guide = getGuide("skilled-nursing-facility-licensing-california")!;

export const metadata = {
  title: guide.title,
  description: guide.excerpt,
};

export default function Page() {
  return (
    <GuideLayout title={guide.title} dek={guide.excerpt} relatedCategories={guide.relatedCategories}>
      <p>
        A skilled nursing license is one of the first things worth
        checking when evaluating a facility — but it's also easy to
        misunderstand what it actually confirms, and what it leaves
        entirely up to you to find out.
      </p>

      <h2>What licensing actually verifies</h2>
      <p>
        In California, skilled nursing facilities are licensed by the
        California Department of Public Health, which confirms the
        facility meets minimum state requirements for staffing ratios,
        physical safety standards, infection control, and clinical
        protocols. A current, active license means the facility has
        passed these baseline requirements — it doesn't rank facilities
        against each other, and it isn't a quality score.
      </p>

      <h2>How to check a license</h2>
      <p>
        Every licensed facility has a license number tied to its specific
        location, and any legitimate facility should provide this
        without hesitation when asked. Licenses can be independently
        verified through the California Department of Public Health's
        facility search tools, which also show survey and inspection
        history — a genuinely useful resource beyond just confirming the
        license is active.
      </p>

      <h2>What licensing doesn't tell you</h2>
      <ul>
        <li><strong>Staff turnover and actual day-to-day staffing levels</strong> — licensing sets a minimum requirement, but a facility can be technically compliant and still feel understaffed in practice.</li>
        <li><strong>Culture and quality of daily care</strong> — things like how staff interact with residents, cleanliness on a given day, or how quickly call lights are answered aren't captured by a license.</li>
        <li><strong>Fit for a specific person's needs</strong> — a well-run facility for general rehabilitation may not be the right fit for someone with more complex or specialized medical needs.</li>
      </ul>

      <h2>What to check alongside the license</h2>
      <p>
        Beyond confirming licensing, it's worth reviewing a facility's
        inspection and complaint history (available through the same
        state search tools), visiting in person at different times of
        day if possible, and asking directly about staffing ratios on
        the specific unit or floor being considered — not just
        facility-wide averages.
      </p>

      <h2>The bottom line</h2>
      <p>
        A license confirms a facility has met the state's baseline
        requirements to legally operate — it's a necessary first check,
        not a complete picture. Combining it with inspection history, an
        in-person visit, and direct questions gives a far more accurate
        sense of what daily care actually looks like there.
      </p>
    </GuideLayout>
  );
}
