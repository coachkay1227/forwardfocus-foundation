import { useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Heart, Users, Shield, CheckCircle, ArrowRight, Star, 
  MessageSquare, BookOpen, Home, Phone 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutUs() {
  useEffect(() => {
    document.title = "About Us | Forward Focus Collective";
    const desc = "Trauma-informed support for justice-impacted families and crime victims. Community platform, educational resources, and personalized guidance.";
    
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);

    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", `${window.location.origin}/about`);

    // JSON-LD Organization structured data
    const ld = document.createElement('script');
    ld.type = 'application/ld+json';
    ld.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Forward Focus Collective',
      url: window.location.origin,
      description: 'Trauma-informed support for justice-impacted families and crime victims.',
      areaServed: 'Ohio',
      serviceType: [
        'Victim Services',
        'Community Support',
        'Educational Resources',
        'Crisis Support'
      ]
    });
    document.head.appendChild(ld);

    return () => {
      if (document.head.contains(ld)) {
        document.head.removeChild(ld);
      }
    };
  }, []);

  return (
    <main id="main">
      {/* Hero Section */}
      <header className="bg-gradient-to-b from-blue-50 to-white border-b">
        <div className="container py-12 md:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Forward Focus Collective
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Trauma-informed support for justice-impacted families and crime victims. 
              We provide resources, community, and guidance when you need it most.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-8">
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Trauma-Informed
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Judgment-Free
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Community-Driven
              </span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Link to="/help">
                  <Phone className="h-4 w-4 mr-2" />
                  Get Help Now
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-purple-600 text-purple-600 hover:bg-purple-50">
                <Link to="/learn">
                  <Users className="h-4 w-4 mr-2" />
                  Join Our Community
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container py-12 space-y-16">
        {/* Our Mission */}
        <section aria-labelledby="mission" className="scroll-mt-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 id="mission" className="text-2xl font-bold text-gray-900">Our Mission</h2>
                <p className="text-gray-600">Why we exist and what drives us</p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">
                Empowering Justice-Impacted Families to Rebuild and Thrive
              </h3>
              <p className="text-blue-800 mb-4">
                We provide trauma-informed support that honors your journey, respects your pace, and believes in your strength. 
                Every interaction is designed to be safe, dignified, and empowering.
              </p>
              <p className="text-blue-700">
                <strong>Our vision:</strong> Communities where everyone has access to the resources, support, and opportunities 
                they need to heal, grow, and build the future they deserve.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Trauma-Informed</h3>
                <p className="text-sm text-gray-600">Every service designed with safety, trust, and healing in mind</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Community-Centered</h3>
                <p className="text-sm text-gray-600">Built by and for people who understand the journey</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Strength-Based</h3>
                <p className="text-sm text-gray-600">Focused on your resilience, skills, and potential</p>
              </div>
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section aria-labelledby="services" className="scroll-mt-16 bg-gray-50">
          <div className="max-w-4xl mx-auto py-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 id="services" className="text-2xl font-bold text-gray-900">What We Offer</h2>
                <p className="text-gray-600">Comprehensive support tailored to your needs</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-red-600" />
                    Crisis Support & Resources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">
                    24/7 crisis contacts, immediate resource navigation, and trauma-informed guidance when you need help most.
                  </p>
                  <Button asChild variant="outline" size="sm">
                    <Link to="/help">Get Help Now</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-purple-600" />
                    Victim Services Hub
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">
                    Specialized support for crime victims including compensation programs, legal rights, and healing resources.
                  </p>
                  <Button asChild variant="outline" size="sm">
                    <Link to="/victim-services">Explore Services</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Home className="h-5 w-5 text-blue-600" />
                    Ohio Resource Directory
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">
                    Curated directory of housing, employment, legal, health, and education resources across Ohio counties.
                  </p>
                  <Button asChild variant="outline" size="sm">
                    <Link to="/help#ohio-resources">Browse Resources</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-green-600" />
                    Learning Community
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">
                    Free education modules, peer support, and guided learning designed specifically for justice-impacted families.
                  </p>
                  <Button asChild variant="outline" size="sm">
                    <Link to="/learn">Join Community</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="font-semibold text-yellow-800 mb-3">💜 Personal Support Available</h3>
              <p className="text-yellow-700 mb-4">
                We also offer one-on-one trauma-informed life coaching with income-based pricing. 
                Every session is designed to honor your pace and support your specific goals.
              </p>
              <div className="flex gap-3">
                <Button asChild size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                  <Link to="/victim-services">Learn About Coaching</Link>
                </Button>
                <Button asChild variant="outline" size="sm" className="border-yellow-600 text-yellow-600 hover:bg-yellow-50">
                  <Link to="/support">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* How We're Different */}
        <section aria-labelledby="different" className="scroll-mt-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <Star className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 id="different" className="text-2xl font-bold text-gray-900">How We're Different</h2>
                <p className="text-gray-600">What sets us apart in supporting your journey</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 className="font-semibold text-purple-900 mb-3">🧠 Smart Technology, Human Heart</h3>
                <p className="text-purple-800 text-sm mb-3">
                  We use AI tools to help you navigate resources more efficiently, but we never replace human connection. 
                  Technology enhances support—it doesn't provide it.
                </p>
                <p className="text-purple-700 text-sm">
                  Our AI assistance is trained to understand justice-impacted experiences and guide you to the right resources faster.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-3">👥 Built by Those We Serve</h3>
                <p className="text-blue-800 text-sm mb-3">
                  Our approach comes from lived experience and deep understanding of the challenges you face. 
                  We're not outsiders looking in—we're community.
                </p>
                <p className="text-blue-700 text-sm">
                  Every resource is curated, every interaction designed with dignity, and every service built to actually help.
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="font-semibold text-green-900 mb-3">🌱 Trauma-Informed Everything</h3>
                <p className="text-green-800 text-sm mb-3">
                  From our website design to our conversation style, everything is built with trauma-informed principles. 
                  Safety, trust, and empowerment guide every decision.
                </p>
                <p className="text-green-700 text-sm">
                  You set the pace. You choose what to share. You decide what help looks like for you.
                </p>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h3 className="font-semibold text-orange-900 mb-3">🎯 Focused on What Works</h3>
                <p className="text-orange-800 text-sm mb-3">
                  No bureaucratic maze. No false promises. No overwhelming options. 
                  We focus on practical help that actually makes a difference in your life.
                </p>
                <p className="text-orange-700 text-sm">
                  Curated resources, verified organizations, and clear next steps—always.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Get Involved */}
        <section aria-labelledby="involved" className="scroll-mt-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg">
          <div className="max-w-4xl mx-auto py-12 px-6">
            <div className="text-center">
              <h2 id="involved" className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-xl mb-8 opacity-90">
                Whether you need immediate help, want to explore resources, or are ready to join our learning community, 
                we're here to support your journey.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold mb-2">Need Help Now?</h3>
                  <p className="text-sm opacity-90 mb-4">Crisis support and immediate resources</p>
                  <Button asChild className="bg-white text-blue-600 hover:bg-gray-100">
                    <Link to="/help">Get Help</Link>
                  </Button>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Home className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold mb-2">Find Resources</h3>
                  <p className="text-sm opacity-90 mb-4">Browse our Ohio directory</p>
                  <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10">
                    <Link to="/help#ohio-resources">Explore</Link>
                  </Button>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold mb-2">Join Community</h3>
                  <p className="text-sm opacity-90 mb-4">Free education and peer support</p>
                  <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10">
                    <Link to="/learn">Apply</Link>
                  </Button>
                </div>
              </div>

              <div className="border-t border-white/20 pt-6">
                <p className="text-sm opacity-90 mb-4">
                  Questions about our services or want to learn more?
                </p>
                <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <Link to="/support">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contact Us
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}