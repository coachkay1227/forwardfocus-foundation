import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FileText, Calendar, Mail } from "lucide-react";

const TermsOfService = () => {
  useEffect(() => {
    document.title = "Terms of Service | Forward Focus Elevation";
    
    // SEO meta tags
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Terms of Service for Forward Focus Elevation - Learn about the terms and conditions for using our website and services.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Terms of Service for Forward Focus Elevation - Learn about the terms and conditions for using our website and services.';
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <main id="main" className="container py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <FileText className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <p className="text-lg">Effective Date: March 15, 2025</p>
          </div>
        </div>

        <Card className="shadow-md">
          <CardContent className="p-8 space-y-8 text-center">
            {/* 1. Introduction */}
            <section>
              <h2 className="font-heading text-2xl font-semibold mb-4 text-primary">1. Introduction</h2>
              <p className="text-base leading-relaxed text-foreground/90">
                These Terms of Service ("Terms") govern your use of the Forward Focus Elevation website 
                and services. By accessing our website, you agree to comply with these Terms. If you do 
                not agree, please do not use our website.
              </p>
            </section>

            <Separator />

            {/* 2. Use of Our Services */}
            <section>
              <h2 className="font-heading text-2xl font-semibold mb-4 text-primary">2. Use of Our Services</h2>
              <div className="space-y-4">
                <p className="text-base leading-relaxed text-foreground/90">
                  You must be at least 18 years old or have parental consent to use the Forward Focus 
                  Elevation website.
                </p>
                <p className="text-base leading-relaxed text-foreground/90">
                  You agree to use Forward Focus Elevation's services lawfully and refrain from engaging 
                  in fraudulent or harmful activities.
                </p>
                <p className="text-base leading-relaxed text-foreground/90">
                  Forward Focus Elevation reserves the right to suspend or terminate access if you 
                  violate these Terms.
                </p>
              </div>
            </section>

            <Separator />

            {/* 3. Intellectual Property */}
            <section>
              <h2 className="font-heading text-2xl font-semibold mb-4 text-primary">3. Intellectual Property</h2>
              <div className="space-y-4">
                <p className="text-base leading-relaxed text-foreground/90">
                  All content on the Forward Focus Elevation website, including text, graphics, logos, 
                  and digital products, is owned by Forward Focus Elevation and protected by copyright laws.
                </p>
                <p className="text-base leading-relaxed text-foreground/90">
                  You may not copy, distribute, or modify Forward Focus Elevation's materials without 
                  prior written permission.
                </p>
              </div>
            </section>

            <Separator />

            {/* 4. Digital Products & Payments */}
            <section>
              <h2 className="font-heading text-2xl font-semibold mb-4 text-primary">4. Digital Products & Payments</h2>
              <div className="space-y-4">
                <p className="text-base leading-relaxed text-foreground/90">
                  Forward Focus Elevation offers both free and paid resources.
                </p>
                <p className="text-base leading-relaxed text-foreground/90">
                  Payments are securely processed through third-party providers. Forward Focus Elevation 
                  does not store payment details.
                </p>
                <p className="text-base leading-relaxed text-foreground/90">
                  All sales of digital products are final unless otherwise stated in our refund policy.
                </p>
              </div>
            </section>

            <Separator />

            {/* 5. Limitation of Liability */}
            <section>
              <h2 className="font-heading text-2xl font-semibold mb-4 text-primary">5. Limitation of Liability</h2>
              <div className="space-y-4">
                <p className="text-base leading-relaxed text-foreground/90">
                  Forward Focus Elevation provides educational resources for informational purposes only. 
                  We are not responsible for any financial, business, or personal decisions made based 
                  on our content.
                </p>
                <p className="text-base leading-relaxed text-foreground/90">
                  Forward Focus Elevation is not liable for any damages resulting from the use of our 
                  website or services.
                </p>
              </div>
            </section>

            <Separator />

            {/* 6. Changes to These Terms */}
            <section>
              <h2 className="font-heading text-2xl font-semibold mb-4 text-primary">6. Changes to These Terms</h2>
              <p className="text-base leading-relaxed text-foreground/90">
                Forward Focus Elevation reserves the right to modify these Terms at any time. Changes 
                will be effective upon posting to our website. Continued use of Forward Focus Elevation's 
                services after updates constitutes acceptance of the revised Terms.
              </p>
            </section>

            <Separator />

            {/* 7. Contact Us */}
            <section>
              <h2 className="font-heading text-2xl font-semibold mb-4 text-primary">7. Contact Us</h2>
              <p className="text-base leading-relaxed text-foreground/90 mb-4">
                For any questions regarding these Terms, please contact Forward Focus Elevation at:
              </p>
              <div className="bg-muted/50 p-4 rounded-lg mx-auto max-w-md flex justify-center">
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  <a 
                    href="mailto:support@ffe.services" 
                    className="text-primary hover:underline font-medium"
                  >
                    support@ffe.services
                  </a>
                </div>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default TermsOfService;