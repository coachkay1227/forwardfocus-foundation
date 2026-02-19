import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FileText, Calendar, Mail } from "lucide-react";
import { SUPPORT_EMAIL } from "@/config/contact";

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
    <main id="main" className="min-h-screen bg-gradient-to-br from-cream via-background to-osu-gray-light/20">
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center gap-3 mb-6 p-4 bg-osu-scarlet/10 rounded-full border border-osu-scarlet/20">
              <FileText className="h-10 w-10 text-osu-scarlet" />
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-navy-900">Terms of Service</h1>
            <div className="flex items-center justify-center gap-2 text-osu-gray">
              <Calendar className="h-4 w-4" />
              <p className="text-lg font-medium">Effective Date: March 15, 2025</p>
            </div>
          </div>

          <Card className="shadow-xl bg-white/95 backdrop-blur-sm border-osu-scarlet/20">
            <CardContent className="p-8 space-y-8 text-center">
            {/* 1. Introduction */}
            <section className="bg-gradient-to-r from-osu-scarlet/5 to-cream/10 p-6 rounded-lg border border-osu-scarlet/10">
              <h2 className="font-heading text-2xl font-semibold mb-4 text-osu-scarlet">1. Introduction</h2>
              <p className="text-base leading-relaxed text-navy-900/80">
                These Terms of Service ("Terms") govern your use of the Forward Focus Elevation website 
                and services. By accessing our website, you agree to comply with these Terms. If you do 
                not agree, please do not use our website.
              </p>
            </section>

            <Separator className="bg-osu-gray-light" />

            {/* 2. Use of Our Services */}
            <section className="bg-gradient-to-r from-cream/10 to-osu-gray-light/10 p-6 rounded-lg border border-osu-gray/20">
              <h2 className="font-heading text-2xl font-semibold mb-4 text-osu-scarlet">2. Use of Our Services</h2>
              <div className="space-y-4">
                <p className="text-base leading-relaxed text-navy-900/80">
                  You must be at least 18 years old or have parental consent to use the Forward Focus 
                  Elevation website.
                </p>
                <p className="text-base leading-relaxed text-navy-900/80">
                  You agree to use Forward Focus Elevation's services lawfully and refrain from engaging 
                  in fraudulent or harmful activities.
                </p>
                <p className="text-base leading-relaxed text-navy-900/80">
                  Forward Focus Elevation reserves the right to suspend or terminate access if you 
                  violate these Terms.
                </p>
              </div>
            </section>

            <Separator className="bg-osu-gray-light" />

            {/* 3. Intellectual Property */}
            <section className="bg-gradient-to-r from-osu-scarlet/5 to-cream/10 p-6 rounded-lg border border-osu-scarlet/10">
              <h2 className="font-heading text-2xl font-semibold mb-4 text-osu-scarlet">3. Intellectual Property</h2>
              <div className="space-y-4">
                <p className="text-base leading-relaxed text-navy-900/80">
                  All content on the Forward Focus Elevation website, including text, graphics, logos, 
                  and digital products, is owned by Forward Focus Elevation and protected by copyright laws.
                </p>
                <p className="text-base leading-relaxed text-navy-900/80">
                  You may not copy, distribute, or modify Forward Focus Elevation's materials without 
                  prior written permission.
                </p>
              </div>
            </section>

            <Separator className="bg-osu-gray-light" />

            {/* 4. Digital Products & Payments */}
            <section className="bg-gradient-to-r from-cream/10 to-osu-gray-light/10 p-6 rounded-lg border border-osu-gray/20">
              <h2 className="font-heading text-2xl font-semibold mb-4 text-osu-scarlet">4. Digital Products & Payments</h2>
              <div className="space-y-4">
                <p className="text-base leading-relaxed text-navy-900/80">
                  Forward Focus Elevation offers both free and paid resources.
                </p>
                <p className="text-base leading-relaxed text-navy-900/80">
                  Payments are securely processed through third-party providers. Forward Focus Elevation 
                  does not store payment details.
                </p>
                <p className="text-base leading-relaxed text-navy-900/80">
                  All sales of digital products are final unless otherwise stated in our refund policy.
                </p>
              </div>
            </section>

            <Separator className="bg-osu-gray-light" />

            {/* 5. Limitation of Liability */}
            <section className="bg-gradient-to-r from-osu-scarlet/5 to-cream/10 p-6 rounded-lg border border-osu-scarlet/10">
              <h2 className="font-heading text-2xl font-semibold mb-4 text-osu-scarlet">5. Limitation of Liability</h2>
              <div className="space-y-4">
                <p className="text-base leading-relaxed text-navy-900/80">
                  Forward Focus Elevation provides educational resources for informational purposes only. 
                  We are not responsible for any financial, business, or personal decisions made based 
                  on our content.
                </p>
                <p className="text-base leading-relaxed text-navy-900/80">
                  Forward Focus Elevation is not liable for any damages resulting from the use of our 
                  website or services.
                </p>
              </div>
            </section>

            <Separator className="bg-osu-gray-light" />

            {/* 6. Changes to These Terms */}
            <section className="bg-gradient-to-r from-cream/10 to-osu-gray-light/10 p-6 rounded-lg border border-osu-gray/20">
              <h2 className="font-heading text-2xl font-semibold mb-4 text-osu-scarlet">6. Changes to These Terms</h2>
              <p className="text-base leading-relaxed text-navy-900/80">
                Forward Focus Elevation reserves the right to modify these Terms at any time. Changes 
                will be effective upon posting to our website. Continued use of Forward Focus Elevation's 
                services after updates constitutes acceptance of the revised Terms.
              </p>
            </section>

            <Separator className="bg-osu-gray-light" />

            {/* 7. Contact Us */}
            <section className="bg-gradient-to-r from-osu-scarlet/5 to-cream/10 p-6 rounded-lg border border-osu-scarlet/10">
              <h2 className="font-heading text-2xl font-semibold mb-4 text-osu-scarlet">7. Contact Us</h2>
              <p className="text-base leading-relaxed text-navy-900/80 mb-4">
                For any questions regarding these Terms, please contact Forward Focus Elevation at:
              </p>
              <div className="bg-osu-gray-light/20 p-4 rounded-lg mx-auto max-w-md flex justify-center border border-osu-scarlet/20">
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-osu-scarlet" />
                  <a 
                    href={`mailto:${SUPPORT_EMAIL}`} 
                    className="text-osu-scarlet hover:text-osu-scarlet-dark hover:underline font-semibold transition-colors"
                  >
                    {SUPPORT_EMAIL}
                  </a>
                </div>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
    </main>
  );
};

export default TermsOfService;