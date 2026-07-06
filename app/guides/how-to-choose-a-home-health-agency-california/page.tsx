import GuideLayout from "@/components/GuideLayout";
import { getGuide } from "@/lib/guides";

const guide = getGuide("how-to-choose-a-home-health-agency-california")!;

export const metadata = {
  title: guide.title,
  description: guide.excerpt,
};

export default function Page() {
  return (
    <GuideLayout title={guide.title} dek={guide.excerpt} relatedCategories={guide.relatedCategories}>
      <p>
        Bringing a home health agency into a family member's life is a
        significant decision — someone will be in their home, providing
        care that used to be handled by family or not at hand at all.
        A little research up front makes the difference between a good
        fit and a frustrating one.
      </p>

      <h2>Start with licensing</h2>
      <p>
        In California, home health agencies are licensed by the
        California Department of Health Care Access and Information
        (formerly through DHCS), and licensing is the baseline — it
        confirms the agency meets the state's requirements for staffing,
        supervision, and patient care standards. Any legitimate agency
        should be able to provide their license number without hesitation
        when asked.
      </p>

      <h2>Understand what "home health" actually covers</h2>
      <p>
        Home health typically includes skilled nursing visits, physical
        or occupational therapy, and help with medical needs like wound
        care or medication management — delivered by licensed clinical
        staff, usually on a scheduled visit basis rather than around the
        clock. This is different from home care or personal care
        services, which focus on non-medical help like companionship,
        light housekeeping, and assistance with daily activities. Make
        sure the type of support needed actually matches what the agency
        provides.
      </p>

      <h2>Questions worth asking before choosing</h2>
      <ul>
        <li><strong>What services are actually included</strong> in a typical care plan, and what costs extra?</li>
        <li><strong>Who performs the in-home visits</strong> — are they employees of the agency, or contracted separately? What background checks are done?</li>
        <li><strong>How is care supervised</strong> — is there a registered nurse overseeing the care plan, and how often are visits reassessed?</li>
        <li><strong>What happens in an emergency</strong> — is there 24/7 on-call support, and what's the actual response process?</li>
        <li><strong>How is billing handled</strong> — is the agency Medicare-certified, and what does insurance actually cover versus out-of-pocket costs?</li>
      </ul>

      <h2>Trust your read on communication</h2>
      <p>
        Beyond the paperwork, pay attention to how responsive and clear
        an agency is during the initial conversation — how quickly they
        answer questions, whether they explain things plainly, and
        whether they seem to actually listen to the specific situation
        rather than offering a generic pitch. This is often the clearest
        early signal of what ongoing communication will actually be like
        once care begins.
      </p>
    </GuideLayout>
  );
}
