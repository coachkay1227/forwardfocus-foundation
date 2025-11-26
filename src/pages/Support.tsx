import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Mail, Phone, MapPin, Clock, Heart, Building2, Presentation, Landmark, GraduationCap, BookOpenCheck } from "lucide-react";
import DonationBoxes from "@/components/support/DonationBoxes";
import SpeakerApplicationForm from "@/components/support/SpeakerApplicationForm";
import GrantInquiryForm from "@/components/support/GrantInquiryForm";
import AIConsultationForm from "@/components/support/AIConsultationForm";
import CorporateTrainingForm from "@/components/support/CorporateTrainingForm";
import ContactForm from "@/components/forms/ContactForm";
import { useCalendlyPopup } from "@/hooks/useCalendlyPopup";
const Support = () => {
  const [activeDialog, setActiveDialog] = useState<string | null>(null);
  const { openCalendly, calendlyReady } = useCalendlyPopup();

  useEffect(() => {
    document.title = "Get Involved | Forward Focus Elevation";
    
    // Add meta description for SEO
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Support Forward Focus Elevation through donations, sponsorships, speaking engagements, or corporate training. Multiple ways to invest in second chances.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Support Forward Focus Elevation through donations, sponsorships, speaking engagements, or corporate training. Multiple ways to invest in second chances.';
      document.head.appendChild(meta);
    }
  }, []);

  const sponsorshipUrl = "https://collect.crowded.me/collection/219ea37a-28de-4930-b00f-dceb78a90e10";
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
              <Button 
                size="lg" 
                variant="secondary" 
                className="bg-white text-osu-scarlet hover:bg-white/90"
                onClick={() => setActiveDialog('donate')}
              >
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-background rounded-xl p-6 h-full border-2 border-osu-scarlet/30 shadow-lg hover:shadow-xl hover:shadow-osu-scarlet/20 transition-all duration-300 md:hover:scale-105 md:hover:-translate-y-1 active:scale-95 cursor-pointer">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-osu-scarlet/10 rounded-full">
                    <Heart className="h-6 w-6 text-osu-scarlet" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground">Start Small, Think Big</CardTitle>
                </div>
                <CardDescription className="text-foreground/70 text-base leading-relaxed">
                  Every dollar powers our AI digital hub providing free mental health, reentry, business, and credit education courses to justice-impacted families.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 flex-1 flex flex-col justify-between">
                <Dialog open={activeDialog === 'donate'} onOpenChange={(open) => setActiveDialog(open ? 'donate' : null)}>
                  <DialogTrigger asChild>
                    <Button variant="link" className="p-0 text-primary font-medium text-lg justify-start">
                      Donate Now →
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">Choose Your Donation Amount</DialogTitle>
                    </DialogHeader>
                    <DonationBoxes />
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            <Card className="bg-background rounded-xl p-6 h-full border-2 border-osu-scarlet/30 shadow-lg hover:shadow-xl hover:shadow-osu-scarlet/20 transition-all duration-300 md:hover:scale-105 md:hover:-translate-y-1 active:scale-95 cursor-pointer">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-osu-scarlet/10 rounded-full">
                    <Building2 className="h-6 w-6 text-osu-scarlet" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground">Sponsor Success Stories</CardTitle>
                </div>
                <CardDescription className="text-foreground/70 text-base leading-relaxed">
                  Sponsor accelerator cohorts, youth AI workshops, or our entire platform. Join us in breaking cycles and creating lasting pathways to success.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="bg-osu-scarlet/5 p-4 rounded-lg border border-osu-scarlet/20">
                    <h4 className="font-semibold text-foreground mb-2">Pay Any Amount</h4>
                    <p className="text-sm text-foreground/70 mb-3">Custom sponsorship levels to match your impact goals</p>
                    <Button 
                      onClick={() => window.open(sponsorshipUrl, '_blank')}
                      className="bg-osu-scarlet hover:bg-osu-scarlet-dark text-osu-scarlet-foreground"
                      size="sm"
                    >
                      Sponsor Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background rounded-xl p-6 h-full border-2 border-osu-scarlet/30 shadow-lg hover:shadow-xl hover:shadow-osu-scarlet/20 transition-all duration-300 md:hover:scale-105 md:hover:-translate-y-1 active:scale-95 cursor-pointer">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-osu-scarlet/10 rounded-full">
                    <Presentation className="h-6 w-6 text-osu-scarlet" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground">Share Your Expertise</CardTitle>
                </div>
                <CardDescription className="text-foreground/70 text-base leading-relaxed">
                  Join our speaker bureau to present to our community and help justice-impacted individuals learn from experienced industry leaders.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 flex-1 flex flex-col justify-between">
                <Dialog open={activeDialog === 'speaker'} onOpenChange={(open) => setActiveDialog(open ? 'speaker' : null)}>
                  <DialogTrigger asChild>
                    <Button variant="link" className="p-0 text-primary font-medium text-lg justify-start">
                      Apply Now →
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <SpeakerApplicationForm />
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            <Card className="bg-background rounded-xl p-6 h-full border-2 border-osu-scarlet/30 shadow-lg hover:shadow-xl hover:shadow-osu-scarlet/20 transition-all duration-300 md:hover:scale-105 md:hover:-translate-y-1 active:scale-95 cursor-pointer">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-osu-scarlet/10 rounded-full">
                    <Landmark className="h-6 w-6 text-osu-scarlet" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground">AI Consultation Services</CardTitle>
                </div>
                <CardDescription className="text-foreground/70 text-base leading-relaxed">
                  Contract our AI expertise to build custom solutions for your organization while directly supporting our community mission.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 flex-1 flex flex-col justify-between">
                <Dialog open={activeDialog === 'consultation'} onOpenChange={(open) => setActiveDialog(open ? 'consultation' : null)}>
                  <DialogTrigger asChild>
                    <Button variant="link" className="p-0 text-primary font-medium text-lg justify-start">
                      Request Consultation →
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <AIConsultationForm />
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            <Card className="bg-background rounded-xl p-6 h-full border-2 border-osu-scarlet/30 shadow-lg hover:shadow-xl hover:shadow-osu-scarlet/20 transition-all duration-300 md:hover:scale-105 md:hover:-translate-y-1 active:scale-95 cursor-pointer">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-osu-scarlet/10 rounded-full">
                    <GraduationCap className="h-6 w-6 text-osu-scarlet" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground">Grant Funding</CardTitle>
                </div>
                <CardDescription className="text-foreground/70 text-base leading-relaxed">
                  Foundations can fund our innovative approach combining AI technology with justice reform and sustainable community building.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 flex-1 flex flex-col justify-between">
                <Dialog open={activeDialog === 'grant'} onOpenChange={(open) => setActiveDialog(open ? 'grant' : null)}>
                  <DialogTrigger asChild>
                    <Button variant="link" className="p-0 text-primary font-medium text-lg justify-start">
                      Submit Inquiry →
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <GrantInquiryForm />
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            <Card className="bg-background rounded-xl p-6 h-full border-2 border-osu-scarlet/30 shadow-lg hover:shadow-xl hover:shadow-osu-scarlet/20 transition-all duration-300 md:hover:scale-105 md:hover:-translate-y-1 active:scale-95 cursor-pointer">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-osu-scarlet/10 rounded-full">
                    <BookOpenCheck className="h-6 w-6 text-osu-scarlet" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground">Corporate AI Training</CardTitle>
                </div>
                <CardDescription className="text-foreground/70 text-base leading-relaxed">
                  Train your team in cutting-edge AI skills while supporting our mission to help justice-impacted communities thrive.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 flex-1 flex flex-col justify-between">
                <Dialog open={activeDialog === 'training'} onOpenChange={(open) => setActiveDialog(open ? 'training' : null)}>
                  <DialogTrigger asChild>
                    <Button variant="link" className="p-0 text-primary font-medium text-lg justify-start">
                      Request Training →
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <CorporateTrainingForm />
                  </DialogContent>
                </Dialog>
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
                <ContactForm type="contact" />
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
                 <Button 
                   type="button"
                   size="lg" 
                   variant="secondary" 
                   className="px-8 text-lg bg-white text-primary hover:bg-white/90"
                   disabled={!calendlyReady}
                   onClick={(e) => {
                     e.preventDefault();
                     e.stopPropagation();
                     if (calendlyReady) {
                       openCalendly('https://calendly.com/ffe_coach_kay/free-call');
                     }
                   }}
                 >
                   {calendlyReady ? 'Schedule Consultation →' : 'Loading...'}
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