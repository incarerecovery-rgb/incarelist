import GuideLayout from "@/components/GuideLayout";
import { getGuide } from "@/lib/guides";

const guide = getGuide("assisted-living-vs-skilled-nursing")!;

export const metadata = {
  title: guide.title,
  description: guide.excerpt,
};

export default function Page() {
  return (
    <GuideLayout title={guide.title} dek={guide.excerpt} relatedCategories={guide.relatedCategories}>
      <p>
        These two get lumped together as "senior care facilities," but
        they're built for genuinely different needs. The short version:
        assisted living supports independence, skilled nursing provides
        medical care. Figuring out which one actually fits usually comes
        down to one question — does this person need help with daily
        life, or do they need ongoing medical treatment?
      </p>

      <h2>Assisted living: support, not medical care</h2>
      <p>
        Assisted living facilities are built for people who are largely
        independent but need help with day-to-day tasks — bathing,
        dressing, medication reminders, meals, transportation. Residents
        typically live in their own apartment or room, keep their own
        schedule, and have access to staff and support as needed rather
        than round-the-clock medical supervision. It's closer to
        independent living with a safety net than to a medical facility.
      </p>
      <p>
        Assisted living is <strong>not</strong> equipped for serious
        medical needs — conditions requiring frequent monitoring,
        IV medication, wound care, or rehabilitation after a hospital
        stay generally fall outside what assisted living is designed
        to handle.
      </p>

      <h2>Skilled nursing: licensed medical care, 24/7</h2>
      <p>
        Skilled nursing facilities (sometimes called nursing homes or
        "post-acute" facilities) provide actual medical care delivered by
        licensed nurses and clinical staff, available around the clock.
        This includes things like wound care, IV therapy, physical and
        occupational therapy, and management of complex or chronic
        medical conditions. Many people arrive at a skilled nursing
        facility directly after a hospital stay — for rehabilitation
        after surgery or a serious illness — while others need it for
        longer-term medical care that can't be managed at home or in
        assisted living.
      </p>

      <h2>How to tell which one fits</h2>
      <ul>
        <li><strong>Choose assisted living</strong> if the person is largely independent and mainly needs help with daily routines, not medical treatment.</li>
        <li><strong>Choose skilled nursing</strong> if there's an ongoing medical condition requiring licensed nursing care, or a recovery period following a hospital stay or surgery.</li>
        <li><strong>Ask directly</strong> what level of nursing coverage a facility actually provides — "staff on-site" and "licensed nurse on-site 24/7" are very different things, and the difference matters a lot if a medical need is involved.</li>
      </ul>

      <h2>They're not always separate buildings</h2>
      <p>
        Some communities offer both under one roof (often called
        "continuing care" communities), letting someone move from
        assisted living into skilled nursing without changing locations
        if their needs increase over time. Worth asking about directly if
        long-term planning is part of the decision.
      </p>
    </GuideLayout>
  );
}
