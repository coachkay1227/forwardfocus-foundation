import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { GraduationCap, Send, CheckCircle, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { sanitizeFormData, isValidEmail, RateLimiter, generateCSRFToken } from "@/lib/security";

export default function GrantInquiryForm() {
  const [formData, setFormData] = useState({
    organization_name: '',
    contact_name: '',
    email: '',
    phone: '',
    website: '',
    organization_type: '',
    focus_areas: [] as string[],
    grant_range: '',
    timeline: '',
    program_focus: '',
    geographic_scope: '',
    previous_grants: '',
    impact_measurement: '',
    partnership_interest: '',
    additional_info: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [csrfToken] = useState(generateCSRFToken());
  const rateLimiter = new RateLimiter();

  const focusAreas = [
    'Education & Workforce Development',
    'Criminal Justice Reform',
    'Mental Health & Wellness',
    'Technology & Innovation',
    'Community Development',
    'Youth Programs',
    'Reentry Support',
    'Digital Equity',
    'Research & Evaluation',
    'Capacity Building'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFocusAreaChange = (area: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      focus_areas: checked 
        ? [...prev.focus_areas, area]
        : prev.focus_areas.filter(item => item !== area)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Rate limiting
    const clientId = `${formData.email || 'anonymous'}_grant`;
    if (rateLimiter.isRateLimited(clientId, 1, 3600000)) { // 1 attempt per hour
      toast.error("Too many grant inquiries. Please wait an hour before trying again.");
      return;
    }

    // Sanitize and validate
    const sanitizedData = sanitizeFormData(formData);
    
    if (!sanitizedData.organization_name || !sanitizedData.contact_name || !sanitizedData.email) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!isValidEmail(sanitizedData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (sanitizedData.focus_areas.length === 0) {
      toast.error("Please select at least one focus area");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('send-support-email', {
        body: {
          type: 'grant_inquiry',
          data: sanitizedData,
          csrfToken
        }
      });

      if (error) {
        console.error('Error sending grant inquiry:', error);
        toast.error("Failed to submit inquiry. Please try again.");
      } else {
        setIsSubmitted(true);
        toast.success("Grant inquiry submitted successfully!");
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to submit inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="border-accent/20 bg-accent/5">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-accent-foreground" />
          </div>
          <h3 className="text-2xl font-semibold text-foreground mb-4">Inquiry Submitted!</h3>
          <p className="text-foreground/70 mb-6">
            Thank you for your interest in funding our mission. We'll review your inquiry and get back to you within 3-5 business days with more information.
          </p>
          <Button onClick={() => setIsSubmitted(false)} variant="outline">
            Submit Another Inquiry
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
          <GraduationCap className="h-6 w-6 text-primary-foreground" />
        </div>
        <CardTitle className="text-2xl font-bold text-foreground">
          Grant Funding Inquiry
        </CardTitle>
        <p className="text-foreground/70">
          Partner with us to create lasting impact through innovative education
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Organization Information */}
          <div className="space-y-2">
            <Label htmlFor="organization_name">Organization Name *</Label>
            <Input
              id="organization_name"
              name="organization_name"
              type="text"
              value={formData.organization_name}
              onChange={handleInputChange}
              placeholder="Foundation or organization name"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contact_name">Contact Name *</Label>
              <Input
                id="contact_name"
                name="contact_name"
                type="text"
                value={formData.contact_name}
                onChange={handleInputChange}
                placeholder="Primary contact person"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="contact@foundation.org"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="(555) 123-4567"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Organization Website</Label>
              <Input
                id="website"
                name="website"
                type="url"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="https://foundation.org"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="organization_type">Organization Type</Label>
            <Select onValueChange={(value) => handleSelectChange('organization_type', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select organization type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="private_foundation">Private Foundation</SelectItem>
                <SelectItem value="community_foundation">Community Foundation</SelectItem>
                <SelectItem value="corporate_foundation">Corporate Foundation</SelectItem>
                <SelectItem value="government">Government Agency</SelectItem>
                <SelectItem value="nonprofit">Nonprofit Organization</SelectItem>
                <SelectItem value="giving_circle">Giving Circle</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Grant Information */}
          <div className="space-y-3">
            <Label>Primary Focus Areas *</Label>
            <div className="grid grid-cols-2 gap-3">
              {focusAreas.map((area) => (
                <div key={area} className="flex items-center space-x-2">
                  <Checkbox
                    id={area}
                    checked={formData.focus_areas.includes(area)}
                    onCheckedChange={(checked) => handleFocusAreaChange(area, checked as boolean)}
                  />
                  <Label htmlFor={area} className="text-sm">{area}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="grant_range">Typical Grant Range</Label>
              <Select onValueChange={(value) => handleSelectChange('grant_range', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select grant range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under_25k">Under $25,000</SelectItem>
                  <SelectItem value="25k_50k">$25,000 - $50,000</SelectItem>
                  <SelectItem value="50k_100k">$50,000 - $100,000</SelectItem>
                  <SelectItem value="100k_250k">$100,000 - $250,000</SelectItem>
                  <SelectItem value="250k_500k">$250,000 - $500,000</SelectItem>
                  <SelectItem value="over_500k">Over $500,000</SelectItem>
                  <SelectItem value="varies">Varies by Program</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeline">Grant Timeline</Label>
              <Select onValueChange={(value) => handleSelectChange('timeline', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select typical timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6months">6 months</SelectItem>
                  <SelectItem value="1year">1 year</SelectItem>
                  <SelectItem value="2years">2 years</SelectItem>
                  <SelectItem value="3years">3 years</SelectItem>
                  <SelectItem value="multi_year">Multi-year</SelectItem>
                  <SelectItem value="ongoing">Ongoing Support</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="geographic_scope">Geographic Scope</Label>
            <Select onValueChange={(value) => handleSelectChange('geographic_scope', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Geographic focus area" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="local">Local/Regional</SelectItem>
                <SelectItem value="state">State-wide</SelectItem>
                <SelectItem value="national">National</SelectItem>
                <SelectItem value="international">International</SelectItem>
                <SelectItem value="no_restriction">No Geographic Restrictions</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="program_focus">Specific Program Interest</Label>
            <Textarea
              id="program_focus"
              name="program_focus"
              value={formData.program_focus}
              onChange={handleInputChange}
              placeholder="Which aspects of our AI-powered education platform interest you most?"
              className="min-h-24"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="impact_measurement">Impact Measurement Requirements</Label>
            <Textarea
              id="impact_measurement"
              name="impact_measurement"
              value={formData.impact_measurement}
              onChange={handleInputChange}
              placeholder="What types of outcomes and metrics do you typically require?"
              className="min-h-24"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="previous_grants">Previous Justice/Education Grants</Label>
            <Textarea
              id="previous_grants"
              name="previous_grants"
              value={formData.previous_grants}
              onChange={handleInputChange}
              placeholder="Brief overview of similar programs you've funded"
              className="min-h-24"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="partnership_interest">Partnership Opportunities</Label>
            <Textarea
              id="partnership_interest"
              name="partnership_interest"
              value={formData.partnership_interest}
              onChange={handleInputChange}
              placeholder="Are you interested in collaboration beyond funding? (research, capacity building, etc.)"
              className="min-h-24"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="additional_info">Additional Information</Label>
            <Textarea
              id="additional_info"
              name="additional_info"
              value={formData.additional_info}
              onChange={handleInputChange}
              placeholder="Anything else you'd like us to know about your foundation or interests?"
              className="min-h-24"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <AlertCircle className="h-4 w-4 mr-2 animate-spin" />
                Submitting Inquiry...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Submit Grant Inquiry
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}