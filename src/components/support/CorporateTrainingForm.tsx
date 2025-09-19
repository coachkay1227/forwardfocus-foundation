import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { BookOpenCheck, Send, CheckCircle, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { sanitizeFormData, isValidEmail, RateLimiter, generateCSRFToken } from "@/lib/security";

export default function CorporateTrainingForm() {
  const [formData, setFormData] = useState({
    company_name: '',
    contact_name: '',
    email: '',
    phone: '',
    industry: '',
    company_size: '',
    training_topics: [] as string[],
    delivery_format: '',
    audience_level: '',
    participant_count: '',
    timeline: '',
    budget_range: '',
    current_ai_usage: '',
    training_goals: '',
    success_metrics: '',
    location_preference: '',
    previous_training: '',
    additional_info: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [csrfToken] = useState(generateCSRFToken());
  const rateLimiter = new RateLimiter();

  const trainingTopics = [
    'AI Fundamentals & Ethics',
    'Building AI Chatbots',
    'AI in Customer Service',
    'Educational AI Applications',
    'AI for Social Impact',
    'Data Analytics with AI',
    'AI Implementation Strategy',
    'Change Management for AI',
    'Team AI Training Programs',
    'AI Risk Management'
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

  const handleTopicChange = (topic: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      training_topics: checked 
        ? [...prev.training_topics, topic]
        : prev.training_topics.filter(item => item !== topic)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Rate limiting
    const clientId = `${formData.email || 'anonymous'}_training`;
    if (rateLimiter.isRateLimited(clientId, 2, 3600000)) { // 2 attempts per hour
      toast.error("Too many training requests. Please wait an hour before trying again.");
      return;
    }

    // Sanitize and validate
    const sanitizedData = sanitizeFormData(formData);
    
    if (!sanitizedData.company_name || !sanitizedData.contact_name || !sanitizedData.email) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!isValidEmail(sanitizedData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (sanitizedData.training_topics.length === 0) {
      toast.error("Please select at least one training topic");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('send-support-email', {
        body: {
          type: 'corporate_training',
          data: sanitizedData,
          csrfToken
        }
      });

      if (error) {
        console.error('Error sending training request:', error);
        toast.error("Failed to submit request. Please try again.");
      } else {
        setIsSubmitted(true);
        toast.success("Training request submitted successfully!");
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
            Thank you for your interest in our corporate AI training programs. We'll create a custom proposal and get back to you within 2-3 business days.
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
          <BookOpenCheck className="h-6 w-6 text-primary-foreground" />
        </div>
        <CardTitle className="text-2xl font-bold text-foreground">
          Corporate AI Training Request
        </CardTitle>
        <p className="text-foreground/70">
          Train your team while supporting our mission to help justice-impacted communities
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Company Information */}
          <div className="space-y-2">
            <Label htmlFor="company_name">Company Name *</Label>
            <Input
              id="company_name"
              name="company_name"
              type="text"
              value={formData.company_name}
              onChange={handleInputChange}
              placeholder="Your company name"
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
                placeholder="contact@company.com"
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
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                name="industry"
                type="text"
                value={formData.industry}
                onChange={handleInputChange}
                placeholder="Technology, Healthcare, Finance, etc."
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="company_size">Company Size</Label>
            <Select onValueChange={(value) => handleSelectChange('company_size', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select company size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="startup">Startup (1-10 employees)</SelectItem>
                <SelectItem value="small">Small (11-50 employees)</SelectItem>
                <SelectItem value="medium">Medium (51-200 employees)</SelectItem>
                <SelectItem value="large">Large (201-1000 employees)</SelectItem>
                <SelectItem value="enterprise">Enterprise (1000+ employees)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Training Requirements */}
          <div className="space-y-3">
            <Label>Training Topics of Interest *</Label>
            <div className="grid grid-cols-2 gap-3">
              {trainingTopics.map((topic) => (
                <div key={topic} className="flex items-center space-x-2">
                  <Checkbox
                    id={topic}
                    checked={formData.training_topics.includes(topic)}
                    onCheckedChange={(checked) => handleTopicChange(topic, checked as boolean)}
                  />
                  <Label htmlFor={topic} className="text-sm">{topic}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="delivery_format">Preferred Delivery Format</Label>
              <Select onValueChange={(value) => handleSelectChange('delivery_format', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in_person">In-Person Workshop</SelectItem>
                  <SelectItem value="virtual">Virtual Training</SelectItem>
                  <SelectItem value="hybrid">Hybrid (Both)</SelectItem>
                  <SelectItem value="self_paced">Self-Paced Online</SelectItem>
                  <SelectItem value="custom">Custom Program</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="audience_level">Audience Level</Label>
              <Select onValueChange={(value) => handleSelectChange('audience_level', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="mixed">Mixed Levels</SelectItem>
                  <SelectItem value="executive">Executive/Leadership</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="participant_count">Expected Participants</Label>
              <Select onValueChange={(value) => handleSelectChange('participant_count', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Number of participants" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-10">1-10 people</SelectItem>
                  <SelectItem value="11-25">11-25 people</SelectItem>
                  <SelectItem value="26-50">26-50 people</SelectItem>
                  <SelectItem value="51-100">51-100 people</SelectItem>
                  <SelectItem value="100+">100+ people</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeline">Timeline</Label>
              <Select onValueChange={(value) => handleSelectChange('timeline', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asap">ASAP - 1 month</SelectItem>
                  <SelectItem value="2months">1-2 months</SelectItem>
                  <SelectItem value="quarter">Next quarter</SelectItem>
                  <SelectItem value="6months">3-6 months</SelectItem>
                  <SelectItem value="planning">Still planning</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget_range">Budget Range</Label>
            <Select onValueChange={(value) => handleSelectChange('budget_range', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select budget range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="under_10k">Under $10,000</SelectItem>
                <SelectItem value="10k_25k">$10,000 - $25,000</SelectItem>
                <SelectItem value="25k_50k">$25,000 - $50,000</SelectItem>
                <SelectItem value="50k_100k">$50,000 - $100,000</SelectItem>
                <SelectItem value="over_100k">Over $100,000</SelectItem>
                <SelectItem value="tbd">To be determined</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="current_ai_usage">Current AI Usage</Label>
            <Textarea
              id="current_ai_usage"
              name="current_ai_usage"
              value={formData.current_ai_usage}
              onChange={handleInputChange}
              placeholder="How is your organization currently using AI, if at all?"
              className="min-h-20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="training_goals">Training Goals</Label>
            <Textarea
              id="training_goals"
              name="training_goals"
              value={formData.training_goals}
              onChange={handleInputChange}
              placeholder="What do you hope to achieve with this training?"
              className="min-h-24"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="success_metrics">Success Metrics</Label>
            <Textarea
              id="success_metrics"
              name="success_metrics"
              value={formData.success_metrics}
              onChange={handleInputChange}
              placeholder="How will you measure the success of this training?"
              className="min-h-20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location_preference">Location Preference</Label>
            <Input
              id="location_preference"
              name="location_preference"
              type="text"
              value={formData.location_preference}
              onChange={handleInputChange}
              placeholder="City, state (for in-person training)"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="previous_training">Previous AI Training</Label>
            <Textarea
              id="previous_training"
              name="previous_training"
              value={formData.previous_training}
              onChange={handleInputChange}
              placeholder="Has your team had any previous AI training or experience?"
              className="min-h-20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="additional_info">Additional Information</Label>
            <Textarea
              id="additional_info"
              name="additional_info"
              value={formData.additional_info}
              onChange={handleInputChange}
              placeholder="Any special requirements or additional details?"
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
                Request Training Proposal
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}