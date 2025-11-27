import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Shield, Calendar, Mail } from "lucide-react";
const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = "Privacy Policy | Forward Focus Elevation";

    // SEO meta tags
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Privacy Policy for Forward Focus Elevation - Learn how we collect, use, and protect your personal information when using our services.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Privacy Policy for Forward Focus Elevation - Learn how we collect, use, and protect your personal information when using our services.';
      document.head.appendChild(meta);
    }
  }, []);
  return <main id="main" className="min-h-screen bg-gradient-to-br from-cream via-background to-osu-gray-light/20">
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center gap-3 mb-6 p-4 bg-osu-scarlet/10 rounded-full border border-osu-scarlet/20">
              <Shield className="h-10 w-10 text-osu-scarlet" />
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-navy-900">Privacy Policy</h1>
            <div className="flex items-center justify-center gap-2 text-osu-gray">
              <Calendar className="h-4 w-4" />
              <p className="text-lg font-medium">Effective Date: 3/15/2025</p>
            </div>
          </div>

          <Card className="shadow-xl bg-white/95 backdrop-blur-sm border-osu-scarlet/20">
            <CardContent className="p-8 space-y-8 text-center">
              {/* 1. Introduction */}
              <section className="bg-gradient-to-r from-osu-scarlet/5 to-cream/10 p-6 rounded-lg border border-osu-scarlet/10">
                <h2 className="font-heading text-2xl font-semibold mb-4 text-osu-scarlet">1. Introduction</h2>
                <p className="text-base leading-relaxed text-navy-900/80">
                  Forward Focus Elevation ("we," "our," or "us") is committed to protecting your privacy. 
                  This Privacy Policy explains how Forward Focus Elevation collects, uses, discloses, and 
                  protects your personal information when you visit our website and use our services. By 
                  accessing our website, you agree to the terms outlined in this policy.
                </p>
              </section>

              <Separator className="bg-osu-gray-light" />

              {/* 2. Information We Collect */}
              <section className="bg-gradient-to-r from-cream/10 to-osu-gray-light/10 p-6 rounded-lg border border-osu-gray/20">
                <h2 className="font-heading text-2xl font-semibold mb-4 text-osu-scarlet">2. Information We Collect</h2>
                <p className="text-base leading-relaxed text-navy-900/80 mb-4">
                  Forward Focus Elevation may collect the following types of information:
                </p>
                <div className="space-y-4 text-center">
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-osu-scarlet">Personal Information:</h3>
                    <p className="text-base leading-relaxed text-navy-900/80">
                      When you sign up for our resources, subscribe to our emails, or contact us, we may 
                      collect your name, email address, phone number, and any other details you provide.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-osu-scarlet">Non-Personal Information:</h3>
                    <p className="text-base leading-relaxed text-navy-900/80">
                      We collect anonymous data such as browser type, IP address, and device information 
                      to improve our website and services.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-osu-scarlet">Cookies & Tracking Technologies:</h3>
                    <p className="text-base leading-relaxed text-navy-900/80">
                      Forward Focus Elevation uses cookies to enhance user experience, analyze website 
                      traffic, and personalize content. You can manage cookie settings in your browser.
                    </p>
                  </div>
                </div>
              </section>

              <Separator className="bg-osu-gray-light" />

              {/* 3. How We Use Your Information */}
              <section className="bg-gradient-to-r from-osu-scarlet/5 to-cream/10 p-6 rounded-lg border border-osu-scarlet/10">
                <h2 className="font-heading text-2xl font-semibold mb-4 text-osu-scarlet">3. How We Use Your Information</h2>
                <p className="text-base leading-relaxed text-navy-900/80 mb-4">
                  Forward Focus Elevation uses collected data to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base leading-relaxed text-navy-900/80 text-center list-none">
                  <li className="px-0">Provide, improve, and personalize our services</li>
                  <li>Send updates, newsletters, and promotional materials (with your consent)</li>
                  <li>Respond to inquiries and customer support requests</li>
                  <li>Analyze website performance and user engagement</li>
                </ul>
              </section>

              <Separator className="bg-osu-gray-light" />

              {/* 4. How We Share Your Information */}
              <section className="bg-gradient-to-r from-cream/10 to-osu-gray-light/10 p-6 rounded-lg border border-osu-gray/20">
                <h2 className="font-heading text-2xl font-semibold mb-4 text-osu-scarlet">4. How We Share Your Information</h2>
                <p className="text-base leading-relaxed text-navy-900/80 mb-4">
                  Forward Focus Elevation does not sell or rent your personal information. However, we may share it with:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base leading-relaxed text-navy-900/80 text-center list-none">
                  <li>Service providers who assist in operating our website</li>
                  <li>Legal authorities if required by law</li>
                  <li>Business partners or affiliates, with your consent</li>
                </ul>
              </section>

              <Separator className="bg-osu-gray-light" />

              {/* 5. Data Security */}
              <section className="bg-gradient-to-r from-osu-scarlet/5 to-cream/10 p-6 rounded-lg border border-osu-scarlet/10">
                <h2 className="font-heading text-2xl font-semibold mb-4 text-osu-scarlet">5. Data Security</h2>
                <p className="text-base leading-relaxed text-navy-900/80">
                  Forward Focus Elevation implements security measures to protect personal data from 
                  unauthorized access, misuse, or alteration. However, while we strive to protect your 
                  data, no online data transmission is entirely secure.
                </p>
              </section>

              <Separator className="bg-osu-gray-light" />

              {/* 6. Your Choices & Rights */}
              <section className="bg-gradient-to-r from-cream/10 to-osu-gray-light/10 p-6 rounded-lg border border-osu-gray/20">
                <h2 className="font-heading text-2xl font-semibold mb-4 text-osu-scarlet">6. Your Choices & Rights</h2>
                <ul className="list-disc pl-6 space-y-2 text-base leading-relaxed text-navy-900/80 text-center list-none">
                  <li>You can opt out of marketing emails at any time by clicking "unsubscribe."</li>
                  <li>You may request to access, update, or delete your personal information by contacting Forward Focus Elevation.</li>
                </ul>
              </section>

              <Separator className="bg-osu-gray-light" />

              {/* 7. Changes to This Policy */}
              <section className="bg-gradient-to-r from-osu-scarlet/5 to-cream/10 p-6 rounded-lg border border-osu-scarlet/10">
                <h2 className="font-heading text-2xl font-semibold mb-4 text-osu-scarlet">7. Changes to This Policy</h2>
                <p className="text-base leading-relaxed text-navy-900/80">
                  Forward Focus Elevation may update this Privacy Policy from time to time. Any changes 
                  will be posted on this page with an updated effective date.
                </p>
              </section>

              <Separator className="bg-osu-gray-light" />

              {/* 8. Contact Us */}
              <section className="bg-gradient-to-r from-cream/10 to-osu-gray-light/10 p-6 rounded-lg border border-osu-gray/20">
                <h2 className="font-heading text-2xl font-semibold mb-4 text-osu-scarlet">8. Contact Us</h2>
                <p className="text-base leading-relaxed text-navy-900/80 mb-4">
                  For any questions regarding this Privacy Policy, please contact Forward Focus Elevation at:
                </p>
                <div className="bg-osu-gray-light/20 p-4 rounded-lg mx-auto max-w-md flex justify-center border border-osu-scarlet/20">
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-osu-scarlet" />
                    <a href="mailto:support@ffeservices.net" className="text-osu-scarlet hover:text-osu-scarlet-dark hover:underline font-semibold transition-colors">
                      support@ffeservices.net
                    </a>
                  </div>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>;
};
export default PrivacyPolicy;