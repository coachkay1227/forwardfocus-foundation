import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Loader2, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface Recommendation {
  resourceName: string;
  reason: string;
  matchScore: number;
}

interface RecommendationResult {
  recommendations: Recommendation[];
  summary: string;
}

export const AIResourceRecommendations = () => {
  const [userNeeds, setUserNeeds] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<RecommendationResult | null>(null);

  const getRecommendations = async () => {
    if (!userNeeds.trim()) {
      toast({
        title: "Input Required",
        description: "Please describe what kind of help you're looking for",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-recommend-resources', {
        body: { 
          userNeeds: userNeeds.trim(),
          location: location.trim() || null,
          category: null
        }
      });

      if (error) {
        if (error.message?.includes('429')) {
          throw new Error('Too many requests. Please try again in a moment.');
        }
        if (error.message?.includes('402')) {
          throw new Error('AI service temporarily unavailable. Please try again later.');
        }
        throw error;
      }

      setResults(data);
      toast({
        title: "Recommendations Ready",
        description: `Found ${data.recommendations.length} matching resources`,
      });
    } catch (error: any) {
      console.error('Error getting recommendations:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to get AI recommendations",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800';
    if (score >= 60) return 'bg-blue-100 text-blue-800';
    return 'bg-yellow-100 text-yellow-800';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            AI-Powered Resource Recommendations
          </CardTitle>
          <CardDescription>
            Tell us what you need, and our AI will find the best matching resources
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="needs">What kind of help are you looking for? *</Label>
            <Textarea
              id="needs"
              value={userNeeds}
              onChange={(e) => setUserNeeds(e.target.value)}
              placeholder="e.g., I need housing assistance after release, looking for job training programs, need mental health support..."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Your Location (Optional)</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Columbus, OH"
            />
          </div>

          <Button 
            onClick={getRecommendations} 
            disabled={loading || !userNeeds.trim()}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Get AI Recommendations
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {results && (
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Recommended Resources</CardTitle>
            <CardDescription>{results.summary}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {results.recommendations.map((rec, index) => (
              <Card key={index} className="hover-scale">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg">{rec.resourceName}</h3>
                    <Badge className={getScoreColor(rec.matchScore)}>
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {rec.matchScore}% Match
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{rec.reason}</p>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
