import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "@/components/ui/use-toast";
import { Phone, MessageSquare, Home, Briefcase, Scale, Activity } from "lucide-react";

const Page = () => {
  // SEO
  useEffect(() => {
    const title = "Get Help Now | Forward Focus Elevation";
    const desc = "Immediate crisis contacts, simple categories, and an email toolkit with AI guidance—no overwhelm.";
    document.title = title;

    const metaSelector = 'meta[name="description"]';
    let meta = document.querySelector(metaSelector) as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);

    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", `${window.location.origin}/help`);
  }, []);

  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = /.+@.+\..+/.test(email);
    if (!isValid) {
      toast({ title: "Enter a valid email", description: "We’ll send your toolkit + AI tips." });
      return;
    }
    toast({ title: "Check your inbox", description: "Toolkit + AI guidance link on the way." });
    setEmail("");
  };

  return (
    <main id="main" className="container py-8 md:py-12 max-w-3xl mx-auto">
      <header className="mb-6">
        <h1 className="font-heading text-3xl md:text-4xl font-semibold">Get Help Now</h1>
        <p className="mt-2 text-muted-foreground">We keep this simple. Take what you need, when you’re ready.</p>
      </header>

      {/* Crisis contacts */}
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
              <a href="sms:741741?&body=HELP" aria-label="Text HELP to 741741" rel="noreferrer">
                <MessageSquare className="mr-2" /> Text “HELP” to 741741
              </a>
            </Button>
          </AlertDescription>
        </Alert>
      </section>

      {/* Internal resource categories */}
      <section aria-labelledby="categories" className="space-y-4 mb-10">
        <div className="flex items-center justify-between">
          <h2 id="categories" className="text-2xl font-semibold">Find support by category</h2>
          <Badge>Curated</Badge>
        </div>
        <p className="text-muted-foreground">Browse our Ohio directory — no signup needed.</p>
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl"><Home /> Housing</CardTitle>
            </CardHeader>
            <CardContent>
              <Button asChild className="h-12 w-full">
                <a href="/ohio-resources#housing">View housing resources →</a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl"><Briefcase /> Employment</CardTitle>
            </CardHeader>
            <CardContent>
              <Button asChild className="h-12 w-full">
                <a href="/ohio-resources#employment">View employment resources →</a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl"><Scale /> Legal</CardTitle>
            </CardHeader>
            <CardContent>
              <Button asChild className="h-12 w-full">
                <a href="/ohio-resources#legal">View legal resources →</a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl"><Activity /> Health</CardTitle>
            </CardHeader>
            <CardContent>
              <Button asChild className="h-12 w-full">
                <a href="/ohio-resources#health">View health resources →</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Email signup */}
      <section aria-labelledby="toolkit" className="space-y-4 mb-12">
        <h2 id="toolkit" className="text-2xl font-semibold">Get our resource toolkit + AI guidance</h2>
        <p className="text-muted-foreground">One simple email. We’ll send a curated checklist and a link to our AI assistant.</p>
        <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <Input
            type="email"
            inputMode="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 text-base"
            aria-label="Email address"
            required
          />
          <Button type="submit" className="h-12 text-base">Send it</Button>
        </form>
        <p className="text-xs text-muted-foreground">We use AI to enhance, not replace, human support.</p>
      </section>

      {/* AI assistant positioning */}
      <section aria-labelledby="ai-help" className="space-y-2">
        <h2 id="ai-help" className="text-2xl font-semibold">Ready for next steps?</h2>
        <p className="text-muted-foreground">Our AI assistant helps you find the right resources and next steps based on your needs.</p>
        <Button asChild>
          <a href="/help#learn-assistant">Open AI assistant</a>
        </Button>
      </section>
    </main>
  );
};

export default Page;
