import GuideLayout from "@/components/GuideLayout";
import { getGuide } from "@/lib/guides";

const guide = getGuide("how-to-choose-a-therapist")!;

export const metadata = {
  title: guide.title,
  description: guide.excerpt,
};

export default function Page() {
  return (
    <GuideLayout title={guide.title} dek={guide.excerpt} relatedCategories={guide.relatedCategories}>
      <p>
        Most people start looking for a therapist after a specific event —
        a hard year, a relationship ending, a diagnosis, or just a sense
        that something needs to change. That urgency is normal, but rushing
        the choice of therapist itself often backfires. A mismatch in the
        first few sessions is one of the most common reasons people give up
        on therapy altogether, not because therapy didn't work, but because
        the wrong fit felt like proof it wouldn't.
      </p>

      <h2>Start with credentials, but don't stop there</h2>
      <p>
        In the U.S., "therapist" covers several distinct licenses —
        Licensed Clinical Social Worker (LCSW), Licensed Professional
        Counselor (LPC), Licensed Marriage and Family Therapist (LMFT),
        and psychologists (PhD or PsyD), among others. Each requires
        supervised clinical hours and a state license, so none is
        inherently "better" than another for general therapy. The license
        mostly tells you they're legally qualified to practice — it
        doesn't tell you whether they're right for you specifically.
      </p>

      <h2>Match the specialty to the actual problem</h2>
      <p>
        A therapist's training often skews toward certain issues:
      </p>
      <ul>
        <li><strong>Anxiety and depression</strong> — most generalist therapists treat these; look for experience with Cognitive Behavioral Therapy (CBT), which has strong research support here.</li>
        <li><strong>Trauma</strong> — look for training in EMDR or trauma-focused CBT specifically, not just general talk therapy.</li>
        <li><strong>Relationship or family issues</strong> — an LMFT or a therapist who explicitly lists couples/family work is usually a better fit than a generalist.</li>
        <li><strong>Specific conditions</strong> (OCD, eating disorders, substance use) — these often benefit from a therapist with targeted training, since the standard approach for anxiety doesn't always apply directly.</li>
      </ul>

      <h2>The practical logistics people forget to check</h2>
      <p>
        Fit isn't just clinical. Before booking a first session, it's worth
        confirming:
      </p>
      <ul>
        <li><strong>Insurance and cost</strong> — whether they're in-network, out-of-network with reimbursement, or private-pay only, and what a session actually costs after any adjustments.</li>
        <li><strong>Availability</strong> — some therapists have multi-week waitlists; ask upfront rather than assuming next-week availability.</li>
        <li><strong>Format</strong> — in-person, telehealth, or both. Telehealth removes commute time but doesn't suit every issue or preference equally well.</li>
        <li><strong>Session frequency and length</strong> — weekly is standard, but some approaches (like certain trauma protocols) use a different cadence.</li>
      </ul>

      <h2>Give it three sessions before deciding</h2>
      <p>
        The first session is mostly intake — history, goals, logistics. It's
        normal for it to feel a little clinical or slow. A more honest read
        on fit usually takes two or three sessions, once the actual working
        relationship starts to form. That said, if something feels
        genuinely off — dismissive, judgmental, or just not listening — it's
        fine to switch sooner. Therapists themselves generally understand
        that fit matters and won't take it personally.
      </p>

      <h2>Questions worth asking before you commit</h2>
      <ul>
        <li>What's your experience treating [the specific issue]?</li>
        <li>What approach or framework do you typically use?</li>
        <li>How do you usually measure whether therapy is working?</li>
        <li>What does a typical course of treatment look like — weeks, months, longer?</li>
      </ul>
      <p>
        A therapist who answers these clearly and specifically — rather
        than vaguely — is usually a good sign in itself.
      </p>
    </GuideLayout>
  );
}
