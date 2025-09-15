import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
const Support = () => {
  useEffect(() => {
    document.title = "Support Forward Focus Elevation | Make an Impact";
  }, []);
  return <main id="main" className="container py-8 md:py-16">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Support Second Chances. Build Lasting Change.
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
            Forward Focus Elevation is a new nonprofit committed to empowering justice-impacted families. 
            Your support helps us lay the foundation for stronger communities across Ohio.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Button size="lg" className="px-6 py-3">
              Donate
            </Button>
            <Button size="lg" variant="outline" className="px-6 py-3">
              Sponsor
            </Button>
          </div>
        </div>

        {/* Ways to Support Grid */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card className="p-6">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl mb-2">Donate 💵</CardTitle>
                <CardDescription>Every gift directly funds programs and resources.</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button variant="link" className="p-0 text-primary font-medium">
                  Donate Now →
                </Button>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl mb-2">Volunteer ⏰</CardTitle>
                <CardDescription>Flexible ways to mentor, facilitate, or support.</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button variant="link" className="p-0 text-primary font-medium">
                  Get Involved →
                </Button>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl mb-2">Share Skills 📚</CardTitle>
                <CardDescription>Offer expertise through training, workshops, or mentorship.</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button variant="link" className="p-0 text-primary font-medium">
                  Contribute →
                </Button>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl mb-2">Partner With Us 🤝</CardTitle>
                <CardDescription>Organizations can co-create programs or provide funding.</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button variant="link" className="p-0 text-primary font-medium">
                  Partner Today →
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Why Support Matters */}
        <section className="mb-12 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-heading text-2xl font-bold mb-4">Why Your Support Matters</h2>
            <p className="text-muted-foreground">
              We are just beginning, but with your support we aim to expand reentry resources, create community-based learning hubs, 
              and build partnerships that open doors to jobs and healing.
            </p>
          </div>
        </section>

        <Separator className="mb-12" />

        {/* Contact and Contact Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Contact Form */}
          <section>
            <h2 className="font-heading text-xl font-bold mb-4">Get In Touch</h2>
            <Card>
              <CardContent className="p-6">
                <form className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="w-full p-3 border border-border rounded-lg bg-background"
                  />
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    className="w-full p-3 border border-border rounded-lg bg-background"
                  />
                  <textarea 
                    placeholder="Message" 
                    rows={4} 
                    className="w-full p-3 border border-border rounded-lg bg-background"
                  />
                  <Button className="w-full">Send Message</Button>
                </form>
              </CardContent>
            </Card>
          </section>

          {/* Contact Info */}
          <section>
            <h2 className="font-heading text-xl font-bold mb-4">Other Ways to Reach Us</h2>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>support@ffeservices.net</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>(380) 287-4505</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>Columbus, Ohio</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Mon-Fri, 9AM-5PM EST</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>

        {/* Final CTA */}
        <section className="text-center">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8">
              <h2 className="font-heading text-2xl font-bold mb-4">
                Be Part of the Beginning.
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Your donation or sponsorship today builds the foundation for second-chance families tomorrow.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="px-6">
                  Give Now
                </Button>
                <Button size="lg" variant="outline" className="px-6">
                  Partner With Us
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>;
};
export default Support;