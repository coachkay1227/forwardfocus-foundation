import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service - RealityCheck</title>
        <meta name="description" content="Terms of Service for RealityCheck - Understanding our platform rules and guidelines" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-background to-muted">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-lg">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-3xl font-bold text-foreground mb-4">
                  Terms of Service
                </CardTitle>
                <p className="text-muted-foreground text-lg">
                  Last updated: {new Date().toLocaleDateString()}
                </p>
              </CardHeader>
              
              <CardContent className="prose prose-gray max-w-none">
                <div className="space-y-8">
                  <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      By accessing and using RealityCheck, you accept and agree to be bound by the terms and provision of this agreement.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">2. Use License</h2>
                    <p className="text-muted-foreground leading-relaxed mb-3">
                      Permission is granted to temporarily download one copy of RealityCheck's materials for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                    </p>
                    <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                      <li>modify or copy the materials</li>
                      <li>use the materials for any commercial purpose or for any public display</li>
                      <li>attempt to reverse engineer any software contained on the website</li>
                      <li>remove any copyright or other proprietary notations from the materials</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">3. Disclaimer</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      The materials on RealityCheck are provided on an 'as is' basis. RealityCheck makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">4. Limitations</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      In no event shall RealityCheck or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on RealityCheck, even if RealityCheck or an authorized representative has been notified orally or in writing of the possibility of such damage.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">5. Privacy Policy</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Site, to understand our practices.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">6. Governing Law</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
                    </p>
                  </section>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsOfService;