import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Heart, Mail, Phone, MapPin, Clock, Users, BookOpen, HandHeart, DollarSign } from "lucide-react";
import ContactForm from "@/components/forms/ContactForm";

const Support = () => {
  useEffect(() => {
    document.title = "Support Forward Focus Elevation | Make an Impact";
  }, []);

  const supportMethods = [
    {
      icon: DollarSign,
      title: "Financial Donations",
      description: "Every dollar directly supports resources, programs, and community growth.",
      action: "Donate Now",
      highlight: "100% goes to programs",
    },
    {
      icon: Users,
      title: "Volunteer Your Time",
      description: "Join our community of mentors, program facilitators, and resource coordinators.",
      action: "Get Involved",
      highlight: "Flexible schedules",
    },
    {
      icon: BookOpen,
      title: "Share Your Expertise",
      description: "Contribute to our learning modules, workshops, or resource directory.",
      action: "Contribute",
      highlight: "Remote opportunities",
    },
    {
      icon: HandHeart,
      title: "Corporate Partnerships",
      description: "Partner with us to provide employment opportunities and program funding.",
      action: "Partner With Us",
      highlight: "Tax benefits available",
    },
  ];

  const faqs = [
    {
      question: "How do donations support the community?",
      answer: "100% of donations go directly to expanding our resource directory, developing new learning modules, and supporting community programs. We maintain full transparency with quarterly impact reports.",
    },
    {
      question: "What volunteer opportunities are available?",
      answer: "We have opportunities for mentors, program facilitators, content creators, resource researchers, and community outreach coordinators. Most roles offer flexible, remote options.",
    },
    {
      question: "Can I contribute if I've been justice-impacted?",
      answer: "Absolutely! We especially value contributions from those with lived experience. Many of our most impactful programs are led by community members who've walked this path.",
    },
    {
      question: "How can my organization become a partner?",
      answer: "We partner with nonprofits, employers, educational institutions, and service providers. Contact us to discuss partnership opportunities that align with your mission and our community needs.",
    },
    {
      question: "Is Forward Focus Elevation a nonprofit?",
      answer: "Yes, we're a registered 501(c)(3) nonprofit organization. All donations are tax-deductible, and we provide receipts for your records.",
    },
  ];

  return (
    <main id="main" className="container py-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-8">
            <div className="p-2 sm:p-3 bg-primary/10 rounded-lg sm:rounded-xl">
              <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            </div>
            <Badge variant="secondary" className="text-sm sm:text-lg px-3 py-1 sm:px-4 sm:py-2">
              Community-Powered Impact
            </Badge>
          </div>
          <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6">
            Support Our Mission
          </h1>
          <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Your contribution helps us expand resources, build community connections, 
            and create lasting change for justice-impacted individuals and families across Ohio.
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <Card className="bg-card shadow-lg border-0 hover:shadow-xl transition-shadow">
            <CardContent className="p-8 text-center">
              <div className="text-4xl font-bold text-primary mb-2">2,500+</div>
              <div className="text-lg text-muted-foreground">People Served</div>
            </CardContent>
          </Card>
          <Card className="bg-card shadow-lg border-0 hover:shadow-xl transition-shadow">
            <CardContent className="p-8 text-center">
              <div className="text-4xl font-bold text-primary mb-2">150+</div>
              <div className="text-lg text-muted-foreground">Partner Organizations</div>
            </CardContent>
          </Card>
          <Card className="bg-card shadow-lg border-0 hover:shadow-xl transition-shadow">
            <CardContent className="p-8 text-center">
              <div className="text-4xl font-bold text-primary mb-2">85%</div>
              <div className="text-lg text-muted-foreground">Success Rate</div>
            </CardContent>
          </Card>
          <Card className="bg-card shadow-lg border-0 hover:shadow-xl transition-shadow">
            <CardContent className="p-8 text-center">
              <div className="text-4xl font-bold text-primary mb-2">12</div>
              <div className="text-lg text-muted-foreground">Counties Served</div>
            </CardContent>
          </Card>
        </div>

        {/* Support Methods */}
        <section className="mb-12">
          <h2 className="font-heading text-2xl font-semibold mb-6 text-center">
            Ways to Support Our Community
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {supportMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <Card key={index} className="relative overflow-hidden">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{method.title}</CardTitle>
                        <Badge variant="outline" className="mb-3">
                          {method.highlight}
                        </Badge>
                        <CardDescription>{method.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">{method.action}</Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <Separator className="mb-12" />

        {/* Contact and FAQ Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <section>
            <ContactForm 
              type="contact"
              title="Get In Touch"
              description="Have questions about supporting our community? We're here to help connect you with the right opportunities."
            />
            
            <Card className="mt-6">
              <CardContent className="p-6">
                <h3 className="font-semibold">Other Ways to Reach Us</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>support@forwardfocuselevation.org</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>(614) 555-0123</span>
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

          {/* FAQ Section */}
          <section>
            <h2 className="font-heading text-2xl font-semibold mb-6">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </div>

        {/* Final CTA */}
        <section className="mt-12 text-center">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8">
              <h2 className="font-heading text-2xl font-semibold mb-4">
                Ready to Make a Difference?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Join our community of supporters who believe in second chances and the power of 
                collective action to create lasting change.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="px-8">
                  Start Supporting Today
                </Button>
                <Button size="lg" variant="outline" className="px-8">
                  Learn More About Our Impact
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
};
export default Support;
