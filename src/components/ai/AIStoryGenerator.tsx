import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Loader2, Copy, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface AIStoryGeneratorProps {
  onStoryGenerated?: (story: { title: string; story: string; summary: string }) => void;
}

export const AIStoryGenerator = ({ onStoryGenerated }: AIStoryGeneratorProps) => {
  const [open, setOpen] = useState(false);
  const [basicInfo, setBasicInfo] = useState('');
  const [outcome, setOutcome] = useState('');
  const [participantQuote, setParticipantQuote] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedStory, setGeneratedStory] = useState<any>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const generateStory = async () => {
    if (!basicInfo.trim()) {
      toast({
        title: "Input Required",
        description: "Please provide basic information about the success story",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-success-story', {
        body: {
          basicInfo: basicInfo.trim(),
          outcome: outcome.trim() || null,
          participantQuote: participantQuote.trim() || null
        }
      });

      if (error) {
        if (error.message?.includes('429')) {
          throw new Error('Too many requests. Please wait a moment and try again.');
        }
        if (error.message?.includes('402')) {
          throw new Error('AI service temporarily unavailable. Please try again later.');
        }
        throw error;
      }

      setGeneratedStory(data);
      toast({
        title: "Story Generated!",
        description: "Your success story has been created by AI",
      });
    } catch (error: any) {
      console.error('Error generating story:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to generate story",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
    toast({
      title: "Copied!",
      description: "Content copied to clipboard",
    });
  };

  const useStory = () => {
    if (generatedStory) {
      onStoryGenerated?.(generatedStory);
      setOpen(false);
      setBasicInfo('');
      setOutcome('');
      setParticipantQuote('');
      setGeneratedStory(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Sparkles className="w-4 h-4 mr-2" />
          Generate with AI
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            AI Success Story Generator
          </DialogTitle>
          <DialogDescription>
            Provide key details and let AI craft a compelling success story
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {!generatedStory ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="basicInfo">Basic Information *</Label>
                <Textarea
                  id="basicInfo"
                  value={basicInfo}
                  onChange={(e) => setBasicInfo(e.target.value)}
                  placeholder="Brief description: Who was helped? What services were provided? What was the situation?"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="outcome">Outcome (Optional)</Label>
                <Textarea
                  id="outcome"
                  value={outcome}
                  onChange={(e) => setOutcome(e.target.value)}
                  placeholder="What positive changes occurred? Employment, housing, education, etc."
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="quote">Participant Quote (Optional)</Label>
                <Textarea
                  id="quote"
                  value={participantQuote}
                  onChange={(e) => setParticipantQuote(e.target.value)}
                  placeholder="Any direct quote from the participant"
                  rows={2}
                />
              </div>

              <Button onClick={generateStory} disabled={loading} className="w-full">
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating Story...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Success Story
                  </>
                )}
              </Button>
            </>
          ) : (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Generated Title</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(generatedStory.title, 'title')}
                  >
                    {copiedField === 'title' ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="font-semibold">{generatedStory.title}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Full Story</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(generatedStory.story, 'story')}
                  >
                    {copiedField === 'story' ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <div className="p-3 bg-muted rounded-lg max-h-60 overflow-y-auto">
                  <p className="text-sm whitespace-pre-wrap">{generatedStory.story}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Social Media Summary</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(generatedStory.summary, 'summary')}
                  >
                    {copiedField === 'summary' ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm">{generatedStory.summary}</p>
                </div>
              </div>

              {generatedStory.suggestedTags && (
                <div className="space-y-2">
                  <Label>Suggested Tags</Label>
                  <div className="flex flex-wrap gap-2">
                    {generatedStory.suggestedTags.map((tag: string, idx: number) => (
                      <Badge key={idx} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Button onClick={useStory} className="flex-1">
                  Use This Story
                </Button>
                <Button 
                  onClick={() => setGeneratedStory(null)} 
                  variant="outline"
                  className="flex-1"
                >
                  Generate Another
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
