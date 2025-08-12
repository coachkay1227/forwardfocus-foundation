import { useEffect } from "react";
import { Link } from "react-router-dom";

const ensureMeta = (name: string, content: string) => {
  let tag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
};

const ensureCanonical = () => {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", window.location.href);
};

const ensureJsonLd = () => {
  const id = "jsonld-victim-services";
  let script = document.getElementById(id) as HTMLScriptElement | null;
  const data = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Victim Services",
    description:
      "Trauma-informed victim services: federal programs, crisis hotlines, legal rights, and Ohio-specific resources. Direct links to nationwide support.",
    url: typeof window !== "undefined" ? window.location.href : undefined,
    isAccessibleForFree: true,
  };
  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = id;
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
  } else {
    script.text = JSON.stringify(data);
  }
};

export default function VictimServices() {
  useEffect(() => {
    document.title = "Victim Services: Nationwide Support | Forward Focus Elevation";
    ensureMeta(
      "description",
      "Trauma-informed victim services with direct links to national crisis help, federal compensation, legal rights, and Ohio-specific resources."
    );
    ensureCanonical();
    ensureJsonLd();
  }, []);

  return (
    <>
      <header className="border-b bg-background/80">
        <div className="container py-8 md:py-12">
          <p className="rounded-md border bg-card px-4 py-2 text-sm">
            🆘 In immediate danger? Call 911 | National Domestic Violence Hotline: 1-800-799-7233
          </p>
          <h1 className="mt-6 font-heading text-3xl font-bold tracking-tight md:text-4xl">
            Victim Services: Nationwide Support for Your Healing Journey
          </h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            Comprehensive trauma-informed resources, professional support, and direct access to services for crime victims and their families nationwide. Access federal programs immediately, with state-specific resources expanding.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Federal resources available nationwide • Ohio resources active • Expanding to more states
          </p>
        </div>
      </header>

      <main>
        <section className="container py-8 md:py-12">
          <h2 className="font-semibold text-xl">Need Help Right Now? National Crisis Resources</h2>
          <p className="mt-2 text-sm text-muted-foreground">Crisis support is available 24/7 nationwide - reach out for immediate help.</p>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            <li className="rounded-lg border bg-card p-4">
              <strong>911</strong> — For immediate danger
            </li>
            <li className="rounded-lg border bg-card p-4">
              National Domestic Violence Hotline: 1-800-799-7233 — <a className="underline" href="https://www.thehotline.org/" target="_blank" rel="noopener noreferrer">thehotline.org</a>
            </li>
            <li className="rounded-lg border bg-card p-4">
              National Sexual Assault Hotline: 1-800-656-4673 — <a className="underline" href="https://www.rainn.org/" target="_blank" rel="noopener noreferrer">rainn.org</a>
            </li>
            <li className="rounded-lg border bg-card p-4">
              Crisis Text Line: Text HOME to 741741 — <a className="underline" href="https://www.crisistextline.org/" target="_blank" rel="noopener noreferrer">crisistextline.org</a>
            </li>
            <li className="rounded-lg border bg-card p-4">
              National Suicide & Crisis Lifeline: 988 — <a className="underline" href="https://988lifeline.org/" target="_blank" rel="noopener noreferrer">988lifeline.org</a>
            </li>
            <li className="rounded-lg border bg-card p-4">
              National Human Trafficking Hotline: 1-888-373-7888 — <a className="underline" href="https://humantraffickinghotline.org/" target="_blank" rel="noopener noreferrer">humantraffickinghotline.org</a>
            </li>
          </ul>
        </section>

        <section className="container py-8">
          <h2 className="font-semibold text-xl">Federal Victim Compensation Programs - Available Nationwide</h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            <li className="rounded-lg border bg-card p-4">
              Office for Victims of Crime — <a className="underline" href="https://ovc.ojp.gov/topics/victim-compensation" target="_blank" rel="noopener noreferrer">ovc.ojp.gov/topics/victim-compensation</a>
            </li>
            <li className="rounded-lg border bg-card p-4">
              VOCA Victim Compensation (State Directory) — <a className="underline" href="https://ovc.ojp.gov/states" target="_blank" rel="noopener noreferrer">ovc.ojp.gov/states</a>
            </li>
            <li className="rounded-lg border bg-card p-4">
              Federal Crime Victim Rights — <a className="underline" href="https://www.justice.gov/usao/resources/crime-victims-rights" target="_blank" rel="noopener noreferrer">justice.gov/usao/resources/crime-victims-rights</a>
            </li>
            <li className="rounded-lg border bg-card p-4">
              Work Opportunity Tax Credit — <a className="underline" href="https://www.dol.gov/agencies/eta/wotc" target="_blank" rel="noopener noreferrer">dol.gov/agencies/eta/wotc</a>
            </li>
          </ul>
        </section>

        <section className="container py-8">
          <h2 className="font-semibold text-xl">National Organizations Providing Direct Victim Support</h2>
          <p className="mt-2 text-sm text-muted-foreground">Click to access services directly - no referrals needed.</p>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            <li className="rounded-lg border bg-card p-4">RAINN — <a className="underline" href="https://www.rainn.org/get-help" target="_blank" rel="noopener noreferrer">rainn.org/get-help</a></li>
            <li className="rounded-lg border bg-card p-4">National Center for Victims of Crime — <a className="underline" href="https://victimsofcrime.org/help-for-crime-victims" target="_blank" rel="noopener noreferrer">victimsofcrime.org/help-for-crime-victims</a></li>
            <li className="rounded-lg border bg-card p-4">National Organization for Victim Assistance — <a className="underline" href="https://trynova.org/" target="_blank" rel="noopener noreferrer">trynova.org</a></li>
            <li className="rounded-lg border bg-card p-4">Victim Rights Law Center — <a className="underline" href="https://victimrights.org/" target="_blank" rel="noopener noreferrer">victimrights.org</a></li>
            <li className="rounded-lg border bg-card p-4">National Crime Victim Bar Association — <a className="underline" href="https://victimbar.org/" target="_blank" rel="noopener noreferrer">victimbar.org</a></li>
          </ul>
        </section>

        <section className="container py-8">
          <h2 className="font-semibold text-xl">Our Trauma-Informed Support Services</h2>
          <ul className="mt-4 grid gap-2 text-muted-foreground">
            <li>Life coaching focused on trauma recovery and empowerment (income-based pricing)</li>
            <li>AI support assistant for 24/7 guidance and resource navigation</li>
            <li>Educational resources on trauma recovery and healing</li>
            <li>Connection to verified professional network</li>
            <li>Crisis intervention and safety planning support</li>
          </ul>
          <p className="mt-3">Personalized support designed specifically for trauma survivors. <Link to="/support" className="underline">Contact us</Link> for consultation and service access.</p>
        </section>

        <section className="container py-8">
          <h2 className="font-semibold text-xl">Ohio-Specific Victim Services and Compensation</h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            <li className="rounded-lg border bg-card p-4">Ohio Attorney General Victim Services — <a className="underline" href="https://www.ohioattorneygeneral.gov/Individuals-and-Families/Victims" target="_blank" rel="noopener noreferrer">ohioattorneygeneral.gov/.../Victims</a></li>
            <li className="rounded-lg border bg-card p-4">Ohio Crime Victim Compensation — <a className="underline" href="https://www.ohioattorneygeneral.gov/Individuals-and-Families/Victims/Victims-Compensation-Application" target="_blank" rel="noopener noreferrer">Compensation Application</a></li>
            <li className="rounded-lg border bg-card p-4">Ohio Domestic Violence Network — <a className="underline" href="https://www.odvn.org/" target="_blank" rel="noopener noreferrer">odvn.org</a></li>
            <li className="rounded-lg border bg-card p-4">Ohio Alliance to End Sexual Violence — <a className="underline" href="https://www.oaesv.org/" target="_blank" rel="noopener noreferrer">oaesv.org</a></li>
            <li className="rounded-lg border bg-card p-4">Legal Aid Society of Columbus — <a className="underline" href="https://www.columbuslegalaid.org/" target="_blank" rel="noopener noreferrer">columbuslegalaid.org</a></li>
          </ul>
          <p className="mt-2 text-sm text-muted-foreground">Ohio residents have access to these additional state-specific resources.</p>
        </section>

        <section className="container py-8">
          <h2 className="font-semibold text-xl">Coming Soon: State-Specific Resources</h2>
          <ul className="mt-4 grid gap-2 text-muted-foreground">
            <li>Texas — Launching 2025: Crime victim compensation and state resources</li>
            <li>California — Launching 2025: Comprehensive victim services directory</li>
            <li>Florida — Launching 2025: State compensation and advocacy resources</li>
            <li>Pennsylvania — Launching 2025: Victim rights and support services</li>
            <li>Illinois — Launching 2025: Trauma-informed state resource network</li>
          </ul>
          <p className="mt-3">Get notified when we launch in your state — <Link to="/support" className="underline">request priority</Link>.</p>
        </section>

        <section className="container py-8">
          <h2 className="font-semibold text-xl">Specialized Support for Unique Needs</h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            <li className="rounded-lg border bg-card p-4">Domestic Violence — <a className="underline" href="https://ncadv.org/" target="_blank" rel="noopener noreferrer">ncadv.org</a></li>
            <li className="rounded-lg border bg-card p-4">Sexual Assault — <a className="underline" href="https://www.rainn.org/" target="_blank" rel="noopener noreferrer">rainn.org</a></li>
            <li className="rounded-lg border bg-card p-4">Human Trafficking — <a className="underline" href="https://polarisproject.org/" target="_blank" rel="noopener noreferrer">polarisproject.org</a></li>
            <li className="rounded-lg border bg-card p-4">Child Abuse Survivors — <a className="underline" href="https://www.childwelfare.gov/" target="_blank" rel="noopener noreferrer">childwelfare.gov</a></li>
            <li className="rounded-lg border bg-card p-4">Elder Abuse — <a className="underline" href="https://ncea.acl.gov/" target="_blank" rel="noopener noreferrer">ncea.acl.gov</a></li>
            <li className="rounded-lg border bg-card p-4">LGBTQ+ Crime Victims — <a className="underline" href="https://avp.org/" target="_blank" rel="noopener noreferrer">avp.org</a></li>
            <li className="rounded-lg border bg-card p-4">Immigrant Crime Victims — <a className="underline" href="https://legalaidatwork.org/" target="_blank" rel="noopener noreferrer">legalaidatwork.org</a></li>
          </ul>
        </section>

        <section className="container py-8">
          <h2 className="font-semibold text-xl">Know Your Rights as a Crime Victim - Federal and State</h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            <li className="rounded-lg border bg-card p-4">Federal Victim Rights — <a className="underline" href="https://www.justice.gov/usao/resources/crime-victims-rights" target="_blank" rel="noopener noreferrer">justice.gov/usao/resources/crime-victims-rights</a></li>
            <li className="rounded-lg border bg-card p-4">Crime Victims' Rights Act — <a className="underline" href="https://www.justice.gov/criminal/vns/crime-victims-rights-act-cvra" target="_blank" rel="noopener noreferrer">justice.gov/.../cvra</a></li>
            <li className="rounded-lg border bg-card p-4">Victim Impact Statements — <a className="underline" href="https://ovc.ojp.gov/topics/victim-impact-statements" target="_blank" rel="noopener noreferrer">ovc.ojp.gov/topics/victim-impact-statements</a></li>
            <li className="rounded-lg border bg-card p-4">Victim Compensation by State — <a className="underline" href="https://www.nacvcb.org/state-programs" target="_blank" rel="noopener noreferrer">nacvcb.org/state-programs</a></li>
            <li className="rounded-lg border bg-card p-4">Legal Aid Locator — <a className="underline" href="https://www.lsc.gov/about-lsc/what-legal-aid/find-legal-aid" target="_blank" rel="noopener noreferrer">lsc.gov/find-legal-aid</a></li>
          </ul>
        </section>

        <section className="container py-8">
          <h2 className="font-semibold text-xl">Trauma Recovery and Mental Health Support</h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            <li className="rounded-lg border bg-card p-4">SAMHSA National Helpline — <a className="underline" href="https://www.samhsa.gov/find-help/national-helpline" target="_blank" rel="noopener noreferrer">samhsa.gov/find-help/national-helpline</a></li>
            <li className="rounded-lg border bg-card p-4">Trauma Recovery Network — <a className="underline" href="https://www.emdrhap.org/content/training/trn/" target="_blank" rel="noopener noreferrer">emdrhap.org/trn</a></li>
            <li className="rounded-lg border bg-card p-4">National Child Traumatic Stress Network — <a className="underline" href="https://www.nctsn.org/" target="_blank" rel="noopener noreferrer">nctsn.org</a></li>
            <li className="rounded-lg border bg-card p-4">International Society for Traumatic Stress Studies — <a className="underline" href="https://www.istss.org/" target="_blank" rel="noopener noreferrer">istss.org</a></li>
            <li className="rounded-lg border bg-card p-4">Mental Health America — <a className="underline" href="https://mhanational.org/finding-help" target="_blank" rel="noopener noreferrer">mhanational.org/finding-help</a></li>
          </ul>
        </section>

        <section className="container py-8">
          <h2 className="font-semibold text-xl">Safety Planning Resources and Tools</h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            <li className="rounded-lg border bg-card p-4">Personal Safety Planning — <a className="underline" href="https://www.thehotline.org/plan-for-safety/" target="_blank" rel="noopener noreferrer">thehotline.org/plan-for-safety</a></li>
            <li className="rounded-lg border bg-card p-4">Technology Safety — <a className="underline" href="https://www.techsafety.org/" target="_blank" rel="noopener noreferrer">techsafety.org</a></li>
            <li className="rounded-lg border bg-card p-4">Stalking Prevention — <a className="underline" href="https://www.stalkingprevention.org/" target="_blank" rel="noopener noreferrer">stalkingprevention.org</a></li>
            <li className="rounded-lg border bg-card p-4">Safety Apps and Tools — <a className="underline" href="https://www.techsafety.org/appsafetycenter" target="_blank" rel="noopener noreferrer">techsafety.org/appsafetycenter</a></li>
            <li className="rounded-lg border bg-card p-4">Legal Protection Orders — <a className="underline" href="https://www.womenslaw.org/" target="_blank" rel="noopener noreferrer">womenslaw.org</a></li>
          </ul>
        </section>

        <section className="container py-8">
          <h2 className="font-semibold text-xl">Financial Recovery and Compensation Programs</h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            <li className="rounded-lg border bg-card p-4">State Victim Compensation Programs — <a className="underline" href="https://www.nacvcb.org/state-programs" target="_blank" rel="noopener noreferrer">nacvcb.org/state-programs</a></li>
            <li className="rounded-lg border bg-card p-4">Victim Restitution Information — <a className="underline" href="https://ovc.ojp.gov/topics/restitution" target="_blank" rel="noopener noreferrer">ovc.ojp.gov/topics/restitution</a></li>
            <li className="rounded-lg border bg-card p-4">Financial Recovery Planning — <a className="underline" href="https://www.consumerfinance.gov/" target="_blank" rel="noopener noreferrer">consumerfinance.gov</a></li>
            <li className="rounded-lg border bg-card p-4">Emergency Financial Assistance — <a className="underline" href="https://www.211.org/" target="_blank" rel="noopener noreferrer">211.org</a></li>
            <li className="rounded-lg border bg-card p-4">Identity Theft Recovery — <a className="underline" href="https://www.identitytheft.gov/" target="_blank" rel="noopener noreferrer">identitytheft.gov</a></li>
          </ul>
        </section>

        <section className="container py-10">
          <h2 className="font-semibold text-xl">Ready to Access Support?</h2>
          <ul className="mt-3 list-disc pl-5 text-muted-foreground">
            <li>Call our trauma-informed support line for immediate assistance</li>
            <li>Use our online contact form for non-urgent support requests</li>
            <li>Access our 24/7 AI assistant for resource navigation</li>
            <li>Schedule a consultation for personalized support planning</li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link to="/support" className="inline-flex items-center rounded-md border bg-primary px-4 py-2 text-primary-foreground">Contact Support</Link>
            <Link to="/support" className="inline-flex items-center rounded-md border px-4 py-2">Ask our AI Assistant</Link>
          </div>
        </section>

        <section className="container pb-12">
          <h2 className="font-semibold text-xl">Your Safety and Privacy Are Protected</h2>
          <ul className="mt-3 list-disc pl-5 text-muted-foreground">
            <li>All communications are confidential and secure</li>
            <li>You control what information you share and when</li>
            <li>No identifying information required for resource access</li>
            <li>Your healing journey is private and personal</li>
          </ul>
          <p className="mt-3 text-sm text-muted-foreground">
            We prioritize your safety in every interaction.
          </p>
        </section>
      </main>
    </>
  );
}
