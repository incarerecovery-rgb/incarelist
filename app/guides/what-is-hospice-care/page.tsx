import GuideLayout from "@/components/GuideLayout";
import { getGuide } from "@/lib/guides";

const guide = getGuide("what-is-hospice-care")!;

export const metadata = {
  title: guide.title,
  description: guide.excerpt,
};

export default function Page() {
  return (
    <GuideLayout title={guide.title} dek={guide.excerpt} relatedCategories={guide.relatedCategories}>
      <p>
        Hospice is one of the most misunderstood parts of the care system.
        It's often described as "giving up," but that framing gets it
        backwards — hospice is a specific, active model of care focused
        on comfort, dignity, and quality of remaining time, for people
        with a serious, life-limiting illness. Understanding what it
        actually offers can make a difficult decision a little clearer.
      </p>

      <h2>What hospice care actually provides</h2>
      <p>
        Hospice focuses on comfort rather than curative treatment —
        managing pain and symptoms, providing emotional and spiritual
        support, and supporting family members through the process. Care
        is typically provided by a team that includes nurses, doctors,
        social workers, aides, and chaplains, and is most often delivered
        wherever the person lives — at home, in an assisted living
        facility, or in a dedicated hospice facility.
      </p>

      <h2>Who qualifies</h2>
      <p>
        Hospice eligibility generally requires a physician's
        certification that the person has a life-limiting illness with a
        prognosis of six months or less, if the disease runs its expected
        course, along with the person's choice to focus on comfort care
        rather than continuing curative treatment. Eligibility is
        reassessed periodically, and it's possible to be on hospice
        longer than six months if a physician continues to certify the
        need.
      </p>

      <h2>Choosing to stop curative treatment isn't required forever</h2>
      <p>
        Someone can leave hospice care and return to curative treatment
        at any point if their condition improves or their goals change —
        the decision isn't permanent or one-way. This flexibility
        surprises a lot of families who assume hospice is a final,
        irreversible step.
      </p>

      <h2>What families and caregivers gain</h2>
      <p>
        Hospice support extends to family caregivers too — including
        respite care (temporary relief for the primary caregiver),
        bereavement support that continues after the person passes, and
        guidance navigating what can be an overwhelming and emotionally
        difficult period. Most hospice benefits, including through
        Medicare, cover this family support as part of the overall care
        plan, not as a separate add-on.
      </p>

      <h2>Questions worth asking a hospice provider</h2>
      <ul>
        <li>How quickly can care begin once eligibility is confirmed?</li>
        <li>What's included for family caregivers, and what support is available after hours?</li>
        <li>How does the team communicate updates, and who's the point of contact day-to-day?</li>
        <li>What happens if the person's condition stabilizes or improves?</li>
      </ul>
    </GuideLayout>
  );
}
