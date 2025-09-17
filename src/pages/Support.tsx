import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Clock, DollarSign, Users, BookOpen, Handshake } from "lucide-react";
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
        <section className="bg-secondary/5 py-16 rounded-2xl border-2 border-osu-scarlet/20 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-background rounded-xl p-10 border-2 border-osu-scarlet/30 shadow-lg hover:shadow-xl hover:shadow-osu-scarlet/20 transition-all duration-300 md:hover:scale-105 md:hover:-translate-y-1 active:scale-95 cursor-pointer">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-osu-scarlet/10 rounded-full">
                    <DollarSign className="h-6 w-6 text-osu-scarlet" />
                  </div>
                  <CardTitle className="text-2xl font-semibold text-foreground">Donate</CardTitle>
                </div>
                <CardDescription className="text-foreground/70 text-lg leading-relaxed">
                  Every gift directly funds programs and resources that help justice-impacted families rebuild their lives. 
                  Your donation supports housing assistance, job training, mental health services, and educational opportunities.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="text-sm text-foreground/60">
                    • Childcare support programs
                    <br />
                    • Job training and materials
                    <br />
                    • Housing assistance programs
                  </div>
                  <Button variant="link" className="p-0 text-primary font-medium text-lg">
                    Donate Now →
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background rounded-xl p-10 border-2 border-osu-scarlet/30 shadow-lg hover:shadow-xl hover:shadow-osu-scarlet/20 transition-all duration-300 md:hover:scale-105 md:hover:-translate-y-1 active:scale-95 cursor-pointer">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-osu-scarlet/10 rounded-full">
                    <Users className="h-6 w-6 text-osu-scarlet" />
                  </div>
                  <CardTitle className="text-2xl font-semibold text-foreground">Volunteer</CardTitle>
                </div>
                <CardDescription className="text-foreground/70 text-lg leading-relaxed">
                  Flexible volunteer opportunities to mentor individuals, facilitate support groups, assist with events, 
                  or provide administrative support. Choose from weekly, monthly, or project-based commitments.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="text-sm text-foreground/60">
                    • Mentorship programs (2-4 hours/week)
                    <br />
                    • Event assistance (flexible schedule)
                    <br />
                    • Administrative support (remote available)
                  </div>
                  <Button variant="link" className="p-0 text-primary font-medium text-lg">
                    Get Involved →
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background rounded-xl p-10 border-2 border-osu-scarlet/30 shadow-lg hover:shadow-xl hover:shadow-osu-scarlet/20 transition-all duration-300 md:hover:scale-105 md:hover:-translate-y-1 active:scale-95 cursor-pointer">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-osu-scarlet/10 rounded-full">
                    <BookOpen className="h-6 w-6 text-osu-scarlet" />
                  </div>
                  <CardTitle className="text-2xl font-semibold text-foreground">Share Skills</CardTitle>
                </div>
                <CardDescription className="text-foreground/70 text-lg leading-relaxed">
                  Offer your professional expertise through training workshops, skill-building sessions, career coaching, 
                  or specialized mentorship in your field of expertise.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="text-sm text-foreground/60">
                    • Professional skills workshops
                    <br />
                    • Career coaching and resume help
                    <br />
                    • Industry-specific mentorship
                  </div>
                  <Button variant="link" className="p-0 text-primary font-medium text-lg">
                    Contribute →
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background rounded-xl p-10 border-2 border-osu-scarlet/30 shadow-lg hover:shadow-xl hover:shadow-osu-scarlet/20 transition-all duration-300 md:hover:scale-105 md:hover:-translate-y-1 active:scale-95 cursor-pointer">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-osu-scarlet/10 rounded-full">
                    <Handshake className="h-6 w-6 text-osu-scarlet" />
                  </div>
                  <CardTitle className="text-2xl font-semibold text-foreground">Partner With Us</CardTitle>
                </div>
                <CardDescription className="text-foreground/70 text-lg leading-relaxed">
                  Organizations can co-create programs, provide funding, offer employment opportunities, 
                  or collaborate on community initiatives that create lasting change for justice-impacted families.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="text-sm text-foreground/60">
                    • Corporate sponsorship opportunities
                    <br />
                    • Employment partnership programs
                    <br />
                    • Community collaboration initiatives
                  </div>
                  <Button variant="link" className="p-0 text-primary font-medium text-lg">
                    Partner Today →
                  </Button>
                </div>
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
        <section className="bg-secondary/5 py-24 rounded-2xl">
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