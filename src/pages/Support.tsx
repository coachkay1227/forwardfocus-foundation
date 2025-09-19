import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Clock, Heart, Building2, Presentation, Landmark, GraduationCap, BookOpenCheck } from "lucide-react";
const Support = () => {
  useEffect(() => {
    document.title = "Get Involved | Forward Focus Elevation";
  }, []);
  return (
    <main id="main">
      {/* Hero Section */}
      <header className="relative bg-gradient-osu-primary text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-osu-scarlet/90 via-osu-gray/85 to-osu-scarlet-dark/80"></div>
        <div className="relative container py-24 md:py-32">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-8 leading-tight">
              Multiple Ways to Invest in Second Chances
            </h1>
            <p className="text-lg md:text-xl mb-12 text-white/90 leading-relaxed max-w-3xl mx-auto">
              Choose how you want to support our AI-powered digital education hub that transforms lives and builds stronger communities
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-background rounded-xl p-10 border-2 border-osu-scarlet/30 shadow-lg hover:shadow-xl hover:shadow-osu-scarlet/20 transition-all duration-300 md:hover:scale-105 md:hover:-translate-y-1 active:scale-95 cursor-pointer">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-osu-scarlet/10 rounded-full">
                    <Heart className="h-6 w-6 text-osu-scarlet" />
                  </div>
                  <CardTitle className="text-2xl font-semibold text-foreground">Start Small, Think Big</CardTitle>
                </div>
                <CardDescription className="text-foreground/70 text-lg leading-relaxed">
                  Every dollar powers our AI digital hub providing free mental health, reentry, business, and credit education courses. From $5 monthly to major gifts - all donations create impact.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="text-sm text-foreground/60">
                    • Monthly sustainers starting at $5
                    <br />
                    • Scholarship fund for 30-day accelerators
                    <br />
                    • Platform development and new courses
                    <br />
                    • Emergency assistance for participants
                  </div>
                  <Button variant="link" className="p-0 text-primary font-medium text-lg" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">Donate Now →</a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background rounded-xl p-10 border-2 border-osu-scarlet/30 shadow-lg hover:shadow-xl hover:shadow-osu-scarlet/20 transition-all duration-300 md:hover:scale-105 md:hover:-translate-y-1 active:scale-95 cursor-pointer">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-osu-scarlet/10 rounded-full">
                    <Building2 className="h-6 w-6 text-osu-scarlet" />
                  </div>
                  <CardTitle className="text-2xl font-semibold text-foreground">Sponsor Success Stories</CardTitle>
                </div>
                <CardDescription className="text-foreground/70 text-lg leading-relaxed">
                  Sponsor accelerator cohorts, youth AI workshops, or our entire platform. Get hiring pipeline access, CSR impact, and measurable community investment ROI.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="text-sm text-foreground/60">
                    • Cohort sponsorships ($5K-$25K)
                    <br />
                    • Youth seasonal program sponsorships
                    <br />
                    • Platform partnerships and tech donations
                    <br />
                    • Talent pipeline access to graduates
                  </div>
                  <Button variant="link" className="p-0 text-primary font-medium text-lg">
                    Explore Sponsorship →
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background rounded-xl p-10 border-2 border-osu-scarlet/30 shadow-lg hover:shadow-xl hover:shadow-osu-scarlet/20 transition-all duration-300 md:hover:scale-105 md:hover:-translate-y-1 active:scale-95 cursor-pointer">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-osu-scarlet/10 rounded-full">
                    <Presentation className="h-6 w-6 text-osu-scarlet" />
                  </div>
                  <CardTitle className="text-2xl font-semibold text-foreground">Share Your Expertise</CardTitle>
                </div>
                <CardDescription className="text-foreground/70 text-lg leading-relaxed">
                  Join our speaker bureau to present to our community, lead workshops, or facilitate Q&A sessions. Help justice-impacted individuals learn from industry leaders.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="text-sm text-foreground/60">
                    • Virtual presentations to our community
                    <br />
                    • Industry-specific workshops and panels
                    <br />
                    • 30-day accelerator guest speaking
                    <br />
                    • Youth mentorship and career guidance
                  </div>
                  <Button variant="link" className="p-0 text-primary font-medium text-lg">
                    Join Network →
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background rounded-xl p-10 border-2 border-osu-scarlet/30 shadow-lg hover:shadow-xl hover:shadow-osu-scarlet/20 transition-all duration-300 md:hover:scale-105 md:hover:-translate-y-1 active:scale-95 cursor-pointer">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-osu-scarlet/10 rounded-full">
                    <Landmark className="h-6 w-6 text-osu-scarlet" />
                  </div>
                  <CardTitle className="text-2xl font-semibold text-foreground">Contract Our Services</CardTitle>
                </div>
                <CardDescription className="text-foreground/70 text-lg leading-relaxed">
                  Government agencies can contract our proven AI-integrated digital education model for reentry programs, juvenile justice, or workforce development initiatives.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="text-sm text-foreground/60">
                    • Reentry education service contracts
                    <br />
                    • Juvenile justice digital programming
                    <br />
                    • Workforce development board partnerships
                    <br />
                    • Research and pilot program collaborations
                  </div>
                  <Button variant="link" className="p-0 text-primary font-medium text-lg">
                    Request Proposal →
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background rounded-xl p-10 border-2 border-osu-scarlet/30 shadow-lg hover:shadow-xl hover:shadow-osu-scarlet/20 transition-all duration-300 md:hover:scale-105 md:hover:-translate-y-1 active:scale-95 cursor-pointer">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-osu-scarlet/10 rounded-full">
                    <GraduationCap className="h-6 w-6 text-osu-scarlet" />
                  </div>
                  <CardTitle className="text-2xl font-semibold text-foreground">Grant Funding</CardTitle>
                </div>
                <CardDescription className="text-foreground/70 text-lg leading-relaxed">
                  Foundations can fund our innovative approach combining AI technology with justice reform, education access, and community building for scalable impact.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="text-sm text-foreground/60">
                    • Program expansion grants
                    <br />
                    • Technology development funding
                    <br />
                    • Research partnership opportunities
                    <br />
                    • National replication pilot funding
                  </div>
                  <Button variant="link" className="p-0 text-primary font-medium text-lg">
                    Discuss Grants →
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background rounded-xl p-10 border-2 border-osu-scarlet/30 shadow-lg hover:shadow-xl hover:shadow-osu-scarlet/20 transition-all duration-300 md:hover:scale-105 md:hover:-translate-y-1 active:scale-95 cursor-pointer">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-osu-scarlet/10 rounded-full">
                    <BookOpenCheck className="h-6 w-6 text-osu-scarlet" />
                  </div>
                  <CardTitle className="text-2xl font-semibold text-foreground">License Our Model</CardTitle>
                </div>
                <CardDescription className="text-foreground/70 text-lg leading-relaxed">
                  Organizations can license our curriculum, platform, or train-the-trainer programs to implement our proven digital education approach in their communities.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="text-sm text-foreground/60">
                    • Curriculum licensing for nonprofits
                    <br />
                    • White-label platform partnerships
                    <br />
                    • Train-the-trainer certifications
                    <br />
                    • Consultation for program replication
                  </div>
                  <Button variant="link" className="p-0 text-primary font-medium text-lg">
                    Learn Licensing →
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
              Why Your Investment Matters
            </h2>
            <p className="text-xl text-foreground/70 leading-relaxed">
              Our AI-powered digital education hub is transforming how justice-impacted families access support, education, and opportunities. 
              Your investment helps us scale innovative technology that creates lasting systemic change.
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
                Not Sure Which Option Fits?
              </h2>
              <p className="text-lg md:text-xl leading-relaxed mb-12 text-primary-foreground/95 max-w-2xl mx-auto">
                Let's talk! Schedule a 15-minute consultation to explore how you can invest in transforming lives through innovative digital education.
              </p>
              <div className="flex justify-center">
                <Button size="lg" variant="secondary" className="px-8 text-lg bg-white text-primary hover:bg-white/90">
                  Schedule Consultation →
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