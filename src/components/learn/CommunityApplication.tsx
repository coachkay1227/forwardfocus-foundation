import { useState } from "react";
import { X, Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

interface CommunityApplicationProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommunityApplication = ({ isOpen, onClose }: CommunityApplicationProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    situation: "",
    goals: "",
    support: "",
    referral: "",
    agreement: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call with loading state
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Application submitted successfully!",
      description: "We've received your application. You'll hear back within 24-48 hours via email."
    });
    
    setIsSubmitting(false);
    onClose();
    setFormData({
      name: "",
      email: "",
      phone: "",
      situation: "",
      goals: "",
      support: "",
      referral: "",
      agreement: false
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground">Join Our Learning Community</h3>
              <p className="text-muted-foreground">Free education • Peer support • Safe space</p>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-muted rounded"
              aria-label="Close application form"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-accent-foreground mb-2">✨ What's Included (Always Free):</h4>
            <div className="grid md:grid-cols-2 gap-2 text-sm text-accent-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-accent" />
                8+ self-paced learning modules
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-accent" />
                Peer support groups
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-accent" />
                AI learning assistance
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-accent" />
                Progress tracking
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-accent" />
                24/7 community access
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-accent" />
                Mobile learning platform
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name *</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email *</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Phone (optional)</label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Which best describes your situation? *</label>
              <select 
                className="w-full p-2 border border-input rounded-md bg-background"
                value={formData.situation}
                onChange={(e) => setFormData({...formData, situation: e.target.value})}
                required
                disabled={isSubmitting}
              >
                <option value="">Select your situation</option>
                <option value="formerly-incarcerated">Formerly incarcerated seeking support</option>
                <option value="family-member">Family member of incarcerated individual</option>
                <option value="preparing-reentry">Preparing for reentry</option>
                <option value="recently-released">Recently released (within 2 years)</option>
                <option value="long-term-reentry">Long-term reentry (2+ years)</option>
                <option value="supporting-someone">Supporting someone in their journey</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">What are your main learning goals? *</label>
              <Textarea
                value={formData.goals}
                onChange={(e) => setFormData({...formData, goals: e.target.value})}
                placeholder="For example: building credit, finding employment, emotional healing, starting a business, strengthening family relationships..."
                required
                rows={3}
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">What type of support would be most helpful?</label>
              <Textarea
                value={formData.support}
                onChange={(e) => setFormData({...formData, support: e.target.value})}
                placeholder="For example: peer support, mentorship, practical guidance, emotional support, accountability..."
                rows={2}
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">How did you hear about us? (optional)</label>
              <Input
                value={formData.referral}
                onChange={(e) => setFormData({...formData, referral: e.target.value})}
                placeholder="Friend, organization, website, etc."
                disabled={isSubmitting}
              />
            </div>

            <div className="bg-primary/10 p-4 rounded-lg">
              <h4 className="font-semibold text-primary mb-2">Community Guidelines</h4>
              <ul className="text-sm text-primary/80 space-y-1 mb-3">
                <li>• Treat all members with respect and dignity</li>
                <li>• Keep all shared information confidential</li>
                <li>• Participate in trauma-informed way</li>
                <li>• Support others on their journey</li>
                <li>• No judgment, only encouragement</li>
              </ul>
              <label className="flex items-start gap-2">
                <input 
                  type="checkbox" 
                  checked={formData.agreement}
                  onChange={(e) => setFormData({...formData, agreement: e.target.checked})}
                  className="mt-1"
                  required
                  disabled={isSubmitting}
                />
                <span className="text-sm text-primary">
                  I agree to follow community guidelines and understand this is a safe space for healing and growth
                </span>
              </label>
            </div>

            <div className="flex gap-3">
              <Button 
                type="submit" 
                className="flex-1 bg-secondary hover:bg-secondary/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-secondary-foreground/30 border-t-secondary-foreground mr-2" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Users className="h-4 w-4 mr-2" />
                    Submit Application
                  </>
                )}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              All education is free. We review applications within 24-48 hours to ensure community safety.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};