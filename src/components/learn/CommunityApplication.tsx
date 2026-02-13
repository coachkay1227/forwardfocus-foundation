import { useState } from "react";
import { X, Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

interface CommunityApplicationProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommunityApplication = ({ isOpen, onClose }: CommunityApplicationProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    releaseDate: "",
    housing: "",
    employment: "",
    family: "",
    legal: "",
    goals: "",
    support: "",
    challenges: "",
    readiness: "",
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
      releaseDate: "",
      housing: "",
      employment: "",
      family: "",
      legal: "",
      goals: "",
      support: "",
      challenges: "",
      readiness: "",
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

          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              What's Included (Always Free):
            </h4>
            <div className="grid md:grid-cols-2 gap-2 text-sm text-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-primary" />
                8+ self-paced learning modules
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-primary" />
                Peer support groups
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-primary" />
                AI learning assistance
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-primary" />
                Progress tracking
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-primary" />
                24/7 community access
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-primary" />
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
              <label className="block text-sm font-medium mb-1 text-foreground">Release Timeline *</label>
              <select
                className="w-full p-2 border border-input rounded-md bg-background text-foreground"
                value={formData.releaseDate}
                onChange={(e) => setFormData({...formData, releaseDate: e.target.value})}
                required
                disabled={isSubmitting}
              >
                <option value="">Select your timeline</option>
                <option value="released-recently">Released within 6 months</option>
                <option value="released-1-year">Released 6 months - 1 year ago</option>
                <option value="released-2-years">Released 1-2 years ago</option>
                <option value="released-long-term">Released 2+ years ago</option>
                <option value="preparing-release">Preparing for release (within 6 months)</option>
                <option value="family-member">Family member of incarcerated individual</option>
                <option value="supporting-someone">Supporting someone in reentry</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-foreground">Current Housing Situation *</label>
              <select
                className="w-full p-2 border border-input rounded-md bg-background text-foreground"
                value={formData.housing}
                onChange={(e) => setFormData({...formData, housing: e.target.value})}
                required
                disabled={isSubmitting}
              >
                <option value="">Select housing situation</option>
                <option value="stable-housing">Stable permanent housing</option>
                <option value="transitional">Transitional/temporary housing</option>
                <option value="family-friends">Staying with family/friends</option>
                <option value="shelter">Homeless shelter or program</option>
                <option value="unstable">Unstable or unsafe housing</option>
                <option value="seeking">Actively seeking housing</option>
                <option value="not-applicable">Not applicable (family/supporter)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-foreground">Employment Status *</label>
              <select
                className="w-full p-2 border border-input rounded-md bg-background text-foreground"
                value={formData.employment}
                onChange={(e) => setFormData({...formData, employment: e.target.value})}
                required
                disabled={isSubmitting}
              >
                <option value="">Select employment status</option>
                <option value="employed-full">Employed full-time</option>
                <option value="employed-part">Employed part-time</option>
                <option value="seeking">Actively job searching</option>
                <option value="barriers">Facing employment barriers</option>
                <option value="education">Pursuing education/training</option>
                <option value="unable">Unable to work (disability/other)</option>
                <option value="not-applicable">Not applicable (family/supporter)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-foreground">Family Situation</label>
              <select
                className="w-full p-2 border border-input rounded-md bg-background text-foreground"
                value={formData.family}
                onChange={(e) => setFormData({...formData, family: e.target.value})}
                disabled={isSubmitting}
              >
                <option value="">Select family situation</option>
                <option value="reunifying">Working on family reunification</option>
                <option value="single-parent">Single parent with children</option>
                <option value="co-parent">Co-parenting arrangements</option>
                <option value="estranged">Estranged from family</option>
                <option value="supportive-family">Have supportive family</option>
                <option value="no-children">No children</option>
                <option value="prefer-not-say">Prefer not to say</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-foreground">Legal Concerns</label>
              <select
                className="w-full p-2 border border-input rounded-md bg-background text-foreground"
                value={formData.legal}
                onChange={(e) => setFormData({...formData, legal: e.target.value})}
                disabled={isSubmitting}
              >
                <option value="">Select any legal concerns</option>
                <option value="probation-parole">On probation/parole</option>
                <option value="court-obligations">Outstanding court obligations</option>
                <option value="record-concerns">Concerned about criminal record</option>
                <option value="expungement">Interested in record expungement</option>
                <option value="no-concerns">No current legal concerns</option>
                <option value="prefer-not-say">Prefer not to say</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-foreground">What are your primary reentry goals? *</label>
              <Textarea
                value={formData.goals}
                onChange={(e) => setFormData({...formData, goals: e.target.value})}
                placeholder="For example: stable housing, steady employment, family reunification, mental health, education, starting a business, building credit..."
                required
                rows={3}
                disabled={isSubmitting}
                className="bg-background text-foreground"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-foreground">Biggest Current Challenges</label>
              <Textarea
                value={formData.challenges}
                onChange={(e) => setFormData({...formData, challenges: e.target.value})}
                placeholder="What obstacles are you facing right now? This helps us provide better support..."
                rows={2}
                disabled={isSubmitting}
                className="bg-background text-foreground"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-foreground">Community Readiness *</label>
              <select
                className="w-full p-2 border border-input rounded-md bg-background text-foreground"
                value={formData.readiness}
                onChange={(e) => setFormData({...formData, readiness: e.target.value})}
                required
                disabled={isSubmitting}
              >
                <option value="">How ready are you to participate?</option>
                <option value="very-active">Very active - want to engage regularly</option>
                <option value="moderate">Moderate - participate when I can</option>
                <option value="observer">Mostly observe and learn</option>
                <option value="seasonal">Seasonal - busier during certain times</option>
                <option value="crisis-support">Mainly need crisis/emergency support</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-foreground">What type of support would be most helpful?</label>
              <Textarea
                value={formData.support}
                onChange={(e) => setFormData({...formData, support: e.target.value})}
                placeholder="For example: peer mentorship, practical guidance, emotional support, accountability partner, crisis support..."
                rows={2}
                disabled={isSubmitting}
                className="bg-background text-foreground"
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

            <div className="bg-secondary/10 border border-secondary/20 p-4 rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">Reentry Community Guidelines</h4>
              <ul className="text-sm text-foreground/80 space-y-1 mb-3">
                <li>• Treat all members with respect and dignity - we're all on a journey</li>
                <li>• Keep all shared information strictly confidential</li>
                <li>• Participate in a trauma-informed, non-judgmental way</li>
                <li>• Support others while respecting boundaries</li>
                <li>• No discrimination based on offense type or background</li>
                <li>• Focus on forward progress, not past mistakes</li>
                <li>• Report safety concerns to community moderators</li>
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
                <span className="text-sm text-foreground">
                  I agree to follow community guidelines and understand this is a safe, supportive space for reentry success
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