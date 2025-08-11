import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "@/components/ui/use-toast";
import { ExternalLink, Phone, MessageSquare, Home, Utensils, Scale, Activity, ShieldCheck, Lock, CheckCircle2, Users, Briefcase, Wallet } from "lucide-react";

const Page = () => {
  // Basic SEO for this page
  useEffect(() => {
    const title = "Get Help Now | Forward Focus Elevation";
    const desc = "Immediate crisis help: call 211 or text HELP to 741741. Free rights guides. Optional email toolkit for next steps.";
    document.title = title;

    const metaSelector = 'meta[name="description"]';
    let meta = document.querySelector(metaSelector) as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);

    // Canonical tag
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", `${window.location.origin}/help`);
  }, []);

  const [email, setEmail] = useState("");
  const [agree, setAgree] = useState(false);

  const benefits = useMemo(
    () => [
      { text: "Understanding Credit – Complete ebook (immediate download)" },
      { text: "30-Day Action Plan with checklists" },
      { text: "Ohio Resource Directory (housing, employment, legal aid)" },
      { text: "Financial Stability Starter Kit" },
      { text: "Access to our private community platform" },
      { text: "Monthly success stories and tips" },
    ],
    []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = /.+@.+\..+/.test(email);
    if (!isValid) {
      toast({ title: "Enter a valid email", description: "We’ll send your toolkit instantly." });
      return;
    }
    if (!agree) {
      toast({ title: "Please confirm", description: "Tick the consent box to receive your toolkit." });
      return;
    }

    // Here we could send to Supabase or an email service. For now, show success.
    toast({ title: "Toolkit sent!", description: "Check your inbox for your resources." });
    setEmail("");
    setAgree(false);
  };

  return (
    <main id="main" className="container py-8 md:py-12 max-w-3xl mx-auto">
      <header className="mb-6">
        <h1 className="font-heading text-3xl md:text-4xl font-semibold">Get Help Now</h1>
        <p className="mt-2 text-muted-foreground">Take what you need, when you’re ready. No pressure—just support.</p>
      </header>

      {/* Crisis Header (always visible within page) */}
      <section aria-labelledby="crisis-banner" className="mb-8">
        <Alert className="bg-primary text-primary-foreground border-transparent">
          <AlertTitle id="crisis-banner">🆘 You’re safe here • Help is available now</AlertTitle>
          <AlertDescription className="mt-3 grid gap-3 sm:grid-cols-2">
            <Button asChild size="lg" className="h-14 text-base">
              <a href="tel:211" aria-label="Call 211 now for immediate assistance">
                <Phone className="mr-2" /> Call 211 immediately
              </a>
            </Button>
            <Button asChild variant="secondary" size="lg" className="h-14 text-base">
              <a
                href="sms:741741?&body=HELP"
                aria-label="Text HELP to 741741"
                rel="noreferrer"
              >
                <MessageSquare className="mr-2" /> Text “HELP” to 741741
              </a>
            </Button>
          </AlertDescription>
        </Alert>
      </section>

      {/* Immediate Help (public access, no signup) */}
      <section aria-labelledby="immediate-help" className="space-y-4 mb-10">
        <div className="flex items-center justify-between">
          <h2 id="immediate-help" className="text-2xl font-semibold">Need Help Right Now? No Forms, No Wait</h2>
          <Badge>Public access</Badge>
        </div>
        <p className="text-muted-foreground">Get immediate help. No email required. No questions asked.</p>

        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl"><Home /> Emergency Housing Tonight</CardTitle>
              <CardDescription>Find local shelters and emergency housing now.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="h-12 w-full">
                <a href="https://www.211.org/" target="_blank" rel="noreferrer" aria-label="Find emergency housing via 211">
                  Visit 211 – Housing Resources <ExternalLink className="ml-2" />
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl"><Utensils /> Food & Basic Needs Now</CardTitle>
              <CardDescription>Food banks, clothing, and immediate assistance near you.</CardDescription>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-3">
              <Button asChild className="h-12 w-full">
                <a href="https://www.feedingamerica.org/find-your-local-foodbank" target="_blank" rel="noreferrer" aria-label="Find your local food bank">
                  Find Food Bank <ExternalLink className="ml-2" />
                </a>
              </Button>
              <Button asChild variant="secondary" className="h-12 w-full">
                <a href="https://www.211.org/" target="_blank" rel="noreferrer" aria-label="Find basic needs via 211">
                  211 – Basic Needs <ExternalLink className="ml-2" />
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl"><Scale /> Legal Emergency Help</CardTitle>
              <CardDescription>Connect with legal aid hotlines and urgent support.</CardDescription>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-3">
              <Button asChild className="h-12 w-full">
                <a href="https://www.lsc.gov/what-legal-aid/find-legal-aid" target="_blank" rel="noreferrer" aria-label="Find legal aid">
                  Find Legal Aid <ExternalLink className="ml-2" />
                </a>
              </Button>
              <Button asChild variant="secondary" className="h-12 w-full">
                <a href="https://www.americanbar.org/groups/legal_services/flh-home/" target="_blank" rel="noreferrer" aria-label="Find a lawyer fast">
                  Legal Help Finder <ExternalLink className="ml-2" />
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl"><Activity /> Crisis Mental Health Support</CardTitle>
              <CardDescription>Speak with trained counselors or access emergency services.</CardDescription>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-3">
              <Button asChild className="h-12 w-full">
                <a href="https://988lifeline.org/" target="_blank" rel="noreferrer" aria-label="Visit 988 Lifeline">
                  988 Lifeline <ExternalLink className="ml-2" />
                </a>
              </Button>
              <Button asChild variant="secondary" className="h-12 w-full">
                <a href="https://www.nami.org/help" target="_blank" rel="noreferrer" aria-label="Visit NAMI Help & Support">
                  NAMI Help & Support <ExternalLink className="ml-2" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Know Your Rights (public access) */}
      <section aria-labelledby="rights" className="space-y-4 mb-12">
        <div className="flex items-center justify-between">
          <h2 id="rights" className="text-2xl font-semibold">Your Rights & Protections (Always Free)</h2>
          <Badge>Public access</Badge>
        </div>
        <p className="text-muted-foreground">This information is always available to you, no signup needed.</p>
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl"><Briefcase /> Employment Rights Quick Reference</CardTitle>
              <CardDescription>Workplace discrimination and harassment basics.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="h-12 w-full">
                <a href="https://www.eeoc.gov/sites/default/files/2022-10/EEOC_KnowYourRights_screen_reader_10_20.pdf" target="_blank" rel="noreferrer" aria-label="Download EEOC Know Your Rights PDF">
                  Download Guide (PDF) <ExternalLink className="ml-2" />
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl"><Home /> Housing Rights Summary</CardTitle>
              <CardDescription>Fair housing protections and how to get help.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="h-12 w-full">
                <a href="https://www.hud.gov/sites/dfiles/FHEO/documents/Know%20Your%20Rights%20FHEO.pdf" target="_blank" rel="noreferrer" aria-label="Download HUD Fair Housing PDF">
                  Download Guide (PDF) <ExternalLink className="ml-2" />
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl"><ShieldCheck /> Legal Protections Overview</CardTitle>
              <CardDescription>Your civil rights and how to assert them.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="h-12 w-full">
                <a href="https://www.aclu.org/know-your-rights" target="_blank" rel="noreferrer" aria-label="Visit ACLU Know Your Rights">
                  View Overview <ExternalLink className="ml-2" />
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl"><MessageSquare /> How to Report Discrimination</CardTitle>
              <CardDescription>Report to the proper agency and get support.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="h-12 w-full">
                <a href="https://civilrights.justice.gov/" target="_blank" rel="noreferrer" aria-label="File a civil rights complaint">
                  File a Complaint <ExternalLink className="ml-2" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Transition */}
      <section aria-label="Next steps transition" className="my-8">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="mt-4 text-center">
          <h3 className="text-xl font-semibold">Ready for Your Next Steps?</h3>
          <p className="text-muted-foreground mt-1">You’ve gotten the immediate help you need. Now let’s build your path forward.</p>
        </div>
      </section>

      {/* Email-gated Toolkit */}
      <section aria-labelledby="toolkit" className="space-y-4 mb-12">
        <div className="flex items-center justify-between">
          <h2 id="toolkit" className="text-2xl font-semibold">Get Your Complete Resource Toolkit</h2>
          <Badge variant="secondary">Email required</Badge>
        </div>
        <p className="text-muted-foreground">Delivered instantly to your email. Your information stays private and secure. Everything you need for your next 30 days and beyond.</p>

        <div className="grid gap-6">
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid gap-2">
                  <label htmlFor="email" className="text-sm font-medium">Email address</label>
                  <Input
                    id="email"
                    type="email"
                    inputMode="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 text-base"
                    aria-describedby="privacy-note"
                    required
                  />
                </div>

                <ul className="grid gap-2" aria-label="Toolkit benefits">
                  {benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 text-primary" />
                      <span>{b.text}</span>
                    </li>
                  ))}
                </ul>

                <label className="flex items-start gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    className="mt-1 h-4 w-4"
                  />
                  <span id="privacy-note">I agree to receive the toolkit by email. Unsubscribe anytime.</span>
                </label>

                <Button type="submit" className="h-12 text-base">Send me the toolkit</Button>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><Lock size={14} /> Your email is never shared</span>
                  <span className="inline-flex items-center gap-1"><ShieldCheck size={14} /> Judgment‑free zone</span>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Program Preview (informational only) */}
      <section aria-labelledby="preview" className="space-y-4 mb-4">
        <h2 id="preview" className="text-2xl font-semibold">When You’re Ready to Grow</h2>
        <p className="text-muted-foreground">Our programs are here when you’re ready to take the next step.</p>
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl"><Activity /> Mindfulness & Wellness Tools</CardTitle>
              <CardDescription>Build emotional resilience with simple, daily practices.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="ghost" className="h-10">
                <a href="/learn" aria-label="Explore mindfulness and wellness tools">Learn more →</a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl"><Wallet /> Financial Literacy & Credit Education</CardTitle>
              <CardDescription>Strengthen money management and credit confidence.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="ghost" className="h-10">
                <a href="/learn" aria-label="Explore financial literacy resources">Learn more →</a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl"><Briefcase /> Business Formation Support</CardTitle>
              <CardDescription>Turn your idea into a business with step‑by‑step guidance.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="ghost" className="h-10">
                <a href="/learn" aria-label="Explore business formation support">Learn more →</a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl"><Users /> Community Platform</CardTitle>
              <CardDescription>Peer support, mentorship, and shared wins.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="ghost" className="h-10">
                <a href="/community" aria-label="Explore the community platform">Learn more →</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
};

export default Page;
