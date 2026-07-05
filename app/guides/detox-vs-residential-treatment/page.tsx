import GuideLayout from "@/components/GuideLayout";
import { getGuide } from "@/lib/guides";

const guide = getGuide("detox-vs-residential-treatment")!;

export const metadata = {
  title: guide.title,
  description: guide.excerpt,
};

export default function Page() {
  return (
    <GuideLayout title={guide.title} dek={guide.excerpt} relatedCategories={guide.relatedCategories}>
      <p>
        These two are often talked about as if they're competing options,
        but for most people dealing with a substance use disorder, they're
        actually sequential — detox first, residential treatment after.
        Confusing them, or trying to skip one, is one of the more common
        and costly mistakes families make when arranging care quickly.
      </p>

      <h2>Detox: managing the body through withdrawal, safely</h2>
      <p>
        Detoxification is the medical process of clearing a substance from
        the body while managing withdrawal symptoms, which can range from
        uncomfortable to genuinely dangerous depending on the substance.
        Withdrawal from alcohol and benzodiazepines in particular can be
        medically serious and, in some cases, life-threatening without
        supervision — this is not something to manage alone at home based
        on willpower. Medical detox typically involves 24/7 monitoring,
        medication to ease symptoms and reduce risk, and lasts anywhere
        from a few days to about a week, depending on the substance and the
        person.
      </p>
      <p>
        What detox does <strong>not</strong> do is address the underlying
        patterns, triggers, or co-occurring mental health issues that drove
        the substance use in the first place. It stabilizes the body. It
        isn't, by itself, treatment for addiction.
      </p>

      <h2>Residential treatment: the actual behavioral work</h2>
      <p>
        Residential (or "inpatient") treatment is where the therapeutic
        work happens — individual therapy, group sessions, education about
        addiction and relapse patterns, and often treatment for co-occurring
        conditions like depression or anxiety that frequently accompany
        substance use disorders. Programs typically run 30, 60, or 90 days,
        with residents living on-site full time in a structured, substance-free
        environment away from the triggers and routines of daily life.
      </p>

      <h2>Why the order matters</h2>
      <p>
        Someone who's still acutely intoxicated or in active withdrawal
        isn't in a state to meaningfully engage in therapy — the body needs
        to stabilize first. This is why most reputable residential programs
        either require completed detox before admission, or have a licensed
        detox unit built into the same facility as a first phase. Trying to
        go straight into intensive therapy while still withdrawing is both
        clinically less effective and, depending on the substance,
        potentially unsafe.
      </p>

      <h2>How to tell which one you're looking for</h2>
      <ul>
        <li><strong>Look for detox first</strong> if the substance was used recently and regularly, and there's any physical dependence — the body needs medical supervision before anything else happens.</li>
        <li><strong>Look for residential treatment</strong> if detox is already complete (medically supervised or otherwise confirmed safe), or if the goal is the underlying behavioral and psychological work rather than physical withdrawal.</li>
        <li><strong>Ask directly</strong> when calling a facility whether they provide detox on-site, refer out for it, or require it to be completed elsewhere first — this varies a lot between programs.</li>
      </ul>

      <h2>What usually comes after</h2>
      <p>
        Residential treatment is typically followed by a step down in
        intensity — a Partial Hospitalization Program (PHP), an Intensive
        Outpatient Program (IOP), or sober living — rather than a sudden
        return to full independence. Treatment centers generally help plan
        this transition before discharge, since aftercare is one of the
        stronger predictors of sustained recovery.
      </p>
    </GuideLayout>
  );
}
