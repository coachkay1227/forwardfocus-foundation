import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { sanitizeInput } from "@/lib/security";
import { ArrowLeft } from "lucide-react";

const AddResource = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    organization: '',
    name: '',
    category: 'Housing',
    website: '',
    phone: '',
    description: ''
  });

  useEffect(() => { 
    document.title = "Add Resource | Partner Portal"; 
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to add resources.",
        variant: "destructive"
      });
      return;
    }

    // Validate required fields
    if (!formData.organization || !formData.name || !formData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      // Sanitize inputs
      const sanitizedData = {
        name: sanitizeInput(formData.organization),
        description: sanitizeInput(formData.description),
        website: formData.website ? sanitizeInput(formData.website) : null,
        phone: formData.phone ? sanitizeInput(formData.phone) : null,
        city: '', // Would need to add city field or default
        state_code: 'OH', // Default to Ohio, could be made dynamic
        verified: false,
        owner_id: user.id
      };

      const { error } = await supabase
        .from('organizations')
        .insert(sanitizedData);

      if (error) {
        console.error('Error adding resource:', error);
        throw error;
      }

      toast({ 
        title: "Resource submitted", 
        description: "Thanks! Our team will review and publish shortly." 
      });
      
      // Clear form
      setFormData({
        organization: '',
        name: '',
        category: 'Housing',
        website: '',
        phone: '',
        description: ''
      });

    } catch (error) {
      console.error('Error submitting resource:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your resource. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main id="main" className="min-h-screen bg-gradient-osu-subtle">
      <div className="bg-gradient-osu-primary border-b border-osu-scarlet/20">
        <div className="container py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-white">Add a Resource</h1>
            <p className="text-xl text-white">Help expand our comprehensive community resource directory</p>
          </div>
        </div>
      </div>
      
      <div className="container py-12">
        <div className="max-w-2xl mx-auto">
          {/* Back to Quick Actions Button */}
          <div className="mb-6">
            <Button asChild variant="outline" className="border-osu-gray/30 text-osu-gray hover:bg-osu-scarlet hover:text-white">
              <NavLink to="/partners?tab=actions" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Quick Actions
              </NavLink>
            </Button>
          </div>
          
          <div className="bg-card rounded-xl shadow-lg border border-osu-scarlet/10 p-8">
            <form onSubmit={onSubmit} className="grid gap-6">
              <div>
                <label className="block text-lg font-semibold mb-2 text-osu-scarlet">Organization Name</label>
                <Input 
                  required 
                  placeholder="Organization" 
                  value={formData.organization}
                  onChange={(e) => handleInputChange('organization', e.target.value)}
                  className="h-12 text-lg border-osu-gray/30 focus:border-osu-scarlet focus:ring-osu-scarlet/20" 
                />
              </div>
              <div>
                <label className="block text-lg font-semibold mb-2 text-osu-scarlet">Resource Name</label>
                <Input 
                  required 
                  placeholder="Program or service" 
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="h-12 text-lg border-osu-gray/30 focus:border-osu-scarlet focus:ring-osu-scarlet/20" 
                />
              </div>
              <div>
                <label className="block text-lg font-semibold mb-2 text-osu-scarlet">Category</label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger className="h-12 text-lg border-osu-gray/30 focus:border-osu-scarlet focus:ring-osu-scarlet/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="z-50 bg-popover border border-osu-gray/20">
                    {['Housing','Employment','Legal','Financial','Health','Education','Family'].map(c=> (
                      <SelectItem key={c} value={c} className="hover:bg-osu-scarlet/5">{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-lg font-semibold mb-2 text-osu-scarlet">Website</label>
                <Input 
                  type="url" 
                  placeholder="https://" 
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  className="h-12 text-lg border-osu-gray/30 focus:border-osu-scarlet focus:ring-osu-scarlet/20" 
                />
              </div>
              <div>
                <label className="block text-lg font-semibold mb-2 text-osu-scarlet">Phone</label>
                <Input 
                  type="tel" 
                  placeholder="(555) 555-5555" 
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="h-12 text-lg border-osu-gray/30 focus:border-osu-scarlet focus:ring-osu-scarlet/20" 
                />
              </div>
              <div>
                <label className="block text-lg font-semibold mb-2 text-osu-scarlet">Description</label>
                <Textarea 
                  required 
                  placeholder="What support is provided? Who qualifies?" 
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="min-h-32 text-lg border-osu-gray/30 focus:border-osu-scarlet focus:ring-osu-scarlet/20" 
                />
              </div>
              <Button 
                type="submit" 
                disabled={loading} 
                size="lg" 
                className="h-14 text-lg bg-gradient-to-r from-osu-scarlet to-osu-gray hover:from-osu-scarlet/90 hover:to-osu-gray/90 text-white shadow-lg"
              >
                {loading ? "Submitting..." : "Submit Resource"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};
export default AddResource;
