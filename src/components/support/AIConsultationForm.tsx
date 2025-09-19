import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Landmark, Send, CheckCircle, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { sanitizeFormData, isValidEmail, RateLimiter, generateCSRFToken } from "@/lib/security";

export default function AIConsultationForm() {
  const [formData, setFormData] = useState({
    organization_name: '',
    contact_name: '',
    email: '',
    phone: '',
    organization_type: '',
    current_services: '',
    ai_interest: [],
    project_scope: '',
    timeline: '',
    budget_range: '',
    target_population: '',
    current_challenges: '',
    desired_outcomes: '',
    technical_capacity: '',
    partnership_type: '',
    additional_info: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [csrfToken] = useState(generateCSRFToken());
  const rateLimiter = new RateLimiter();

  const aiServices = [
    'AI Chatbot Development',
    'Educational Content Creation',
    'Automated Assessment Tools',
    'Personalized Learning Paths',
    'Data Analytics & Insights',
    'Digital Platform Development',
    'Training & Implementation',
    'Custom AI Solutions',
    'Integration Support',
    'Ongoing Maintenance'
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

  const handleAIServiceChange = (service: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      ai_interest: checked 
        ? [...prev.ai_interest, service]
        : prev.ai_interest.filter(item => item !== service)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Rate limiting
    const clientId = `${formData.email || 'anonymous'}_consultation`;
    if (rateLimiter.isRateLimited(clientId, 2, 3600000)) { // 2 attempts per hour
      toast.error("Too many consultation requests. Please wait an hour before trying again.");
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

    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('send-support-email', {
        body: {
          type: 'ai_consultation',
          data: sanitizedData,
          csrfToken
        }
      });

      if (error) {
        console.error('Error sending consultation request:', error);
        toast.error("Failed to submit request. Please try again.");
      } else {
        setIsSubmitted(true);
        toast.success("Consultation request submitted successfully!");
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to submit request. Please try again.");
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
          <h3 className="text-2xl font-semibold text-foreground mb-4">Request Submitted!</h3>
          <p className="text-foreground/70 mb-6">
            Thank you for your interest in our AI consultation services. We'll review your request and schedule a discovery call within 2-3 business days.
          </p>
          <Button onClick={() => setIsSubmitted(false)} variant="outline">
            Submit Another Request
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
          <Landmark className="h-6 w-6 text-primary-foreground" />
        </div>
        <CardTitle className="text-2xl font-bold text-foreground">
          AI Consultation Request
        </CardTitle>
        <p className="text-foreground/70">
          Let us help you implement AI solutions that advance your mission
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
              placeholder="Government agency, nonprofit, etc."
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
                placeholder="contact@organization.gov"
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
              <Label htmlFor="organization_type">Organization Type</Label>
              <Select onValueChange={(value) => handleSelectChange('organization_type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select organization type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="government">Government Agency</SelectItem>
                  <SelectItem value="corrections">Corrections Department</SelectItem>
                  <SelectItem value="courts">Court System</SelectItem>
                  <SelectItem value="nonprofit">Nonprofit Organization</SelectItem>
                  <SelectItem value="workforce">Workforce Development</SelectItem>
                  <SelectItem value="education">Educational Institution</SelectItem>
                  <SelectItem value="healthcare">Healthcare System</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Service Interest */}
          <div className="space-y-3">
            <Label>AI Services of Interest</Label>
            <div className="grid grid-cols-2 gap-3">
              {aiServices.map((service) => (
                <div key={service} className="flex items-center space-x-2">
                  <Checkbox
                    id={service}
                    checked={formData.ai_interest.includes(service)}
                    onCheckedChange={(checked) => handleAIServiceChange(service, checked as boolean)}
                  />
                  <Label htmlFor={service} className="text-sm">{service}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Project Details */}
          <div className="space-y-2">
            <Label htmlFor="current_services">Current Services/Programs</Label>
            <Textarea
              id="current_services"
              name="current_services"
              value={formData.current_services}
              onChange={handleInputChange}
              placeholder="Describe your current programs or services"
              className="min-h-24"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="target_population">Target Population</Label>
            <Textarea
              id="target_population"
              name="target_population"
              value={formData.target_population}
              onChange={handleInputChange}
              placeholder="Who would benefit from this AI solution?"
              className="min-h-20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="current_challenges">Current Challenges</Label>
            <Textarea
              id="current_challenges"
              name="current_challenges"
              value={formData.current_challenges}
              onChange={handleInputChange}
              placeholder="What problems are you trying to solve?"
              className="min-h-24"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="desired_outcomes">Desired Outcomes</Label>
            <Textarea
              id="desired_outcomes"
              name="desired_outcomes"
              value={formData.desired_outcomes}
              onChange={handleInputChange}
              placeholder="What success looks like for your organization"
              className="min-h-24"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="timeline">Project Timeline</Label>
              <Select onValueChange={(value) => handleSelectChange('timeline', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asap">ASAP - 3 months</SelectItem>
                  <SelectItem value="6months">3-6 months</SelectItem>
                  <SelectItem value="year">6-12 months</SelectItem>
                  <SelectItem value="longterm">1+ years</SelectItem>
                  <SelectItem value="planning">Still planning</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget_range">Budget Range</Label>
              <Select onValueChange={(value) => handleSelectChange('budget_range', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under_50k">Under $50,000</SelectItem>
                  <SelectItem value="50k_100k">$50,000 - $100,000</SelectItem>
                  <SelectItem value="100k_250k">$100,000 - $250,000</SelectItem>
                  <SelectItem value="250k_500k">$250,000 - $500,000</SelectItem>
                  <SelectItem value="over_500k">Over $500,000</SelectItem>
                  <SelectItem value="tbd">To be determined</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="technical_capacity">Technical Capacity</Label>
            <Textarea
              id="technical_capacity"
              name="technical_capacity"
              value={formData.technical_capacity}
              onChange={handleInputChange}
              placeholder="Describe your organization's current technical capabilities and IT infrastructure"
              className="min-h-20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="partnership_type">Partnership Type</Label>
            <Select onValueChange={(value) => handleSelectChange('partnership_type', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Preferred partnership model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="contract">Service Contract</SelectItem>
                <SelectItem value="pilot">Pilot Program</SelectItem>
                <SelectItem value="training">Training & Implementation</SelectItem>
                <SelectItem value="licensing">Licensing Agreement</SelectItem>
                <SelectItem value="consultation">Consultation Only</SelectItem>
                <SelectItem value="ongoing">Ongoing Partnership</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="additional_info">Additional Information</Label>
            <Textarea
              id="additional_info"
              name="additional_info"
              value={formData.additional_info}
              onChange={handleInputChange}
              placeholder="Anything else you'd like us to know about your project or organization?"
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
                Submitting Request...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Request AI Consultation
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}