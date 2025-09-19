import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Presentation, Send, CheckCircle, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { sanitizeFormData, isValidEmail, RateLimiter, generateCSRFToken } from "@/lib/security";

export default function SpeakerApplicationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    title: '',
    experience: '',
    expertise: [] as string[],
    topics: '',
    availability: '',
    presentation_type: '',
    bio: '',
    linkedin: '',
    previous_speaking: '',
    tech_requirements: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [csrfToken] = useState(generateCSRFToken());
  const rateLimiter = new RateLimiter();

  const expertiseAreas = [
    'Mental Health & Wellness',
    'Reentry Support',
    'Financial Literacy',
    'Entrepreneurship',
    'Technology & AI',
    'Legal Support',
    'Career Development',
    'Education & Training',
    'Community Building',
    'Personal Development'
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

  const handleExpertiseChange = (area: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      expertise: checked 
        ? [...prev.expertise, area]
        : prev.expertise.filter(item => item !== area)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Rate limiting
    const clientId = `${formData.email || 'anonymous'}_speaker`;
    if (rateLimiter.isRateLimited(clientId, 2, 3600000)) { // 2 attempts per hour
      toast.error("Too many applications. Please wait an hour before trying again.");
      return;
    }

    // Sanitize and validate
    const sanitizedData = sanitizeFormData(formData);
    
    if (!sanitizedData.name || !sanitizedData.email || !sanitizedData.bio) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!isValidEmail(sanitizedData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (sanitizedData.expertise.length === 0) {
      toast.error("Please select at least one area of expertise");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('send-support-email', {
        body: {
          type: 'speaker_application',
          data: sanitizedData,
          csrfToken
        }
      });

      if (error) {
        console.error('Error sending speaker application:', error);
        toast.error("Failed to submit application. Please try again.");
      } else {
        setIsSubmitted(true);
        toast.success("Speaker application submitted successfully!");
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to submit application. Please try again.");
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
          <h3 className="text-2xl font-semibold text-foreground mb-4">Application Submitted!</h3>
          <p className="text-foreground/70 mb-6">
            Thank you for your interest in sharing your expertise. We'll review your application and get back to you within 5-7 business days.
          </p>
          <Button onClick={() => setIsSubmitted(false)} variant="outline">
            Submit Another Application
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
          <Presentation className="h-6 w-6 text-primary-foreground" />
        </div>
        <CardTitle className="text-2xl font-bold text-foreground">
          Speaker Application
        </CardTitle>
        <p className="text-foreground/70">
          Join our expert network and help transform lives through knowledge sharing
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your full name"
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
                placeholder="your.email@example.com"
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
              <Label htmlFor="organization">Organization</Label>
              <Input
                id="organization"
                name="organization"
                type="text"
                value={formData.organization}
                onChange={handleInputChange}
                placeholder="Your organization"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Professional Title</Label>
            <Input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Your current role/title"
            />
          </div>

          {/* Expertise Areas */}
          <div className="space-y-3">
            <Label>Areas of Expertise *</Label>
            <div className="grid grid-cols-2 gap-3">
              {expertiseAreas.map((area) => (
                <div key={area} className="flex items-center space-x-2">
                  <Checkbox
                    id={area}
                    checked={formData.expertise.includes(area)}
                    onCheckedChange={(checked) => handleExpertiseChange(area, checked as boolean)}
                  />
                  <Label htmlFor={area} className="text-sm">{area}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Presentation Details */}
          <div className="space-y-2">
            <Label htmlFor="topics">Proposed Topics</Label>
            <Textarea
              id="topics"
              name="topics"
              value={formData.topics}
              onChange={handleInputChange}
              placeholder="What specific topics would you like to present on?"
              className="min-h-24"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="presentation_type">Preferred Presentation Type</Label>
            <Select onValueChange={(value) => handleSelectChange('presentation_type', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select presentation type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="workshop">Interactive Workshop</SelectItem>
                <SelectItem value="presentation">Formal Presentation</SelectItem>
                <SelectItem value="panel">Panel Discussion</SelectItem>
                <SelectItem value="qna">Q&A Session</SelectItem>
                <SelectItem value="mentoring">One-on-One Mentoring</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="availability">Availability</Label>
            <Textarea
              id="availability"
              name="availability"
              value={formData.availability}
              onChange={handleInputChange}
              placeholder="What days/times work best for you? Any scheduling constraints?"
              className="min-h-20"
            />
          </div>

          {/* Professional Background */}
          <div className="space-y-2">
            <Label htmlFor="bio">Professional Bio *</Label>
            <Textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              placeholder="Brief professional biography (250-500 words)"
              className="min-h-32"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="previous_speaking">Previous Speaking Experience</Label>
            <Textarea
              id="previous_speaking"
              name="previous_speaking"
              value={formData.previous_speaking}
              onChange={handleInputChange}
              placeholder="Describe your previous speaking or training experience"
              className="min-h-24"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn Profile</Label>
            <Input
              id="linkedin"
              name="linkedin"
              type="url"
              value={formData.linkedin}
              onChange={handleInputChange}
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tech_requirements">Technical Requirements</Label>
            <Textarea
              id="tech_requirements"
              name="tech_requirements"
              value={formData.tech_requirements}
              onChange={handleInputChange}
              placeholder="Any special technical requirements for your presentation?"
              className="min-h-20"
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
                Submitting Application...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Submit Speaker Application
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}