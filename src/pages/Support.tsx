import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
const Support = () => {
  useEffect(() => {
    document.title = "Support Forward Focus Elevation | Make an Impact";
  }, []);
  return (
    <main id="main">
      {/* Hero Section */}
      <header className="relative bg-gradient-osu-primary text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-osu-scarlet/90 via-osu-gray/85 to-osu-scarlet-dark/80"></div>
        <div className="relative container py-24 md:py-32">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-8 leading-tight">
              Support Second Chances. Build Lasting Change.
            </h1>
            <p className="text-lg md:text-xl mb-12 text-white/90 leading-relaxed max-w-3xl mx-auto">
              Forward Focus Elevation is a new nonprofit committed to empowering justice-impacted families. 
              Your support helps us lay the foundation for stronger communities across Ohio.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" variant="secondary" className="bg-white text-osu-scarlet hover:bg-white/90">
                Donate
              </Button>
              <Button size="lg" className="bg-osu-gray hover:bg-osu-gray-dark text-white">
                Sponsor
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container py-16 md:py-20">
        <div className="max-w-6xl mx-auto space-y-24">
        {/* Ways to Support Grid */}
        <section className="bg-secondary/5 py-16 -mx-4 px-4 rounded-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-background rounded-xl p-10 border shadow-lg hover:shadow-xl transition-all">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-semibold text-foreground mb-4">Donate</CardTitle>
                <CardDescription className="text-foreground/70 text-lg leading-relaxed">Every gift directly funds programs and resources.</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button variant="link" className="p-0 text-primary font-medium text-lg">
                  Donate Now →
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-background rounded-xl p-10 border shadow-lg hover:shadow-xl transition-all">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-semibold text-foreground mb-4">Volunteer</CardTitle>
                <CardDescription className="text-foreground/70 text-lg leading-relaxed">Flexible ways to mentor, facilitate, or support.</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button variant="link" className="p-0 text-primary font-medium text-lg">
                  Get Involved →
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-background rounded-xl p-10 border shadow-lg hover:shadow-xl transition-all">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-semibold text-foreground mb-4">Share Skills</CardTitle>
                <CardDescription className="text-foreground/70 text-lg leading-relaxed">Offer expertise through training, workshops, or mentorship.</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button variant="link" className="p-0 text-primary font-medium text-lg">
                  Contribute →
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-background rounded-xl p-10 border shadow-lg hover:shadow-xl transition-all">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-semibold text-foreground mb-4">Partner With Us</CardTitle>
                <CardDescription className="text-foreground/70 text-lg leading-relaxed">Organizations can co-create programs or provide funding.</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button variant="link" className="p-0 text-primary font-medium text-lg">
                  Partner Today →
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Why Support Matters */}
        <section className="text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
              Why Your Support Matters
            </h2>
            <p className="text-xl text-foreground/70 leading-relaxed">
              We are just beginning, but with your support we aim to expand reentry resources, create community-based learning hubs, 
              and build partnerships that open doors to jobs and healing.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-secondary/5 py-24 -mx-4 px-4 rounded-2xl">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <div>
                <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-8">Get In Touch</h2>
                <Card className="bg-background shadow-lg">
                  <CardContent className="p-8">
                    <form className="space-y-6">
                      <input 
                        type="text" 
                        placeholder="Your Name" 
                        className="w-full p-4 border border-border rounded-lg bg-background text-foreground text-lg"
                      />
                      <input 
                        type="email" 
                        placeholder="Your Email" 
                        className="w-full p-4 border border-border rounded-lg bg-background text-foreground text-lg"
                      />
                      <textarea 
                        placeholder="Message" 
                        rows={5} 
                        className="w-full p-4 border border-border rounded-lg bg-background text-foreground text-lg"
                      />
                      <Button size="lg" className="w-full text-lg bg-primary hover:bg-primary/90 text-primary-foreground">
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Info */}
              <div>
                <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-8">Other Ways to Reach Us</h2>
                <Card className="bg-background shadow-lg">
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4 text-lg">
                        <Mail className="h-6 w-6 text-muted-foreground" />
                        <span className="text-foreground">support@ffeservices.net</span>
                      </div>
                      <div className="flex items-center gap-4 text-lg">
                        <Phone className="h-6 w-6 text-muted-foreground" />
                        <span className="text-foreground">(380) 287-4505</span>
                      </div>
                      <div className="flex items-center gap-4 text-lg">
                        <MapPin className="h-6 w-6 text-muted-foreground" />
                        <span className="text-foreground">Columbus, Ohio</span>
                      </div>
                      <div className="flex items-center gap-4 text-lg">
                        <Clock className="h-6 w-6 text-muted-foreground" />
                        <span className="text-foreground">Mon-Fri, 9AM-5PM EST</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-gradient-to-br from-primary via-accent to-secondary text-primary-foreground rounded-2xl overflow-hidden shadow-2xl">
          <div className="px-8 py-24 md:py-32">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-heading text-4xl md:text-6xl font-bold mb-12">
                Be Part of the Beginning.
              </h2>
              <p className="text-lg md:text-xl leading-relaxed mb-12 text-primary-foreground/95 max-w-2xl mx-auto">
                Your donation or sponsorship today builds the foundation for second-chance families tomorrow.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button size="lg" variant="secondary" className="px-8 text-lg bg-white text-primary hover:bg-white/90">
                  Give Now
                </Button>
                <Button size="lg" className="px-8 text-lg bg-primary/20 hover:bg-primary/30 text-white border border-white/20">
                  Partner With Us
                </Button>
              </div>
            </div>
          </div>
        </section>
        </div>
      </div>
    </main>
  );
};
export default Support;