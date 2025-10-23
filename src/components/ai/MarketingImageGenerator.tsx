import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Image as ImageIcon, Sparkles, Loader2, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export const MarketingImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('professional');
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const generateImage = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Input Required",
        description: "Please describe the image you want to generate",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setGeneratedImage(null);

    try {
      const { data, error } = await supabase.functions.invoke('generate-marketing-image', {
        body: {
          prompt: prompt.trim(),
          style
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

      setGeneratedImage(data.imageUrl);
      toast({
        title: "Image Generated!",
        description: "Your marketing image is ready",
      });
    } catch (error: any) {
      console.error('Error generating image:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to generate image",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    if (!generatedImage) return;

    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `marketing-image-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Downloaded",
      description: "Image saved to your downloads",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            AI Marketing Image Generator
          </CardTitle>
          <CardDescription>
            Create custom images for social media, newsletters, and marketing materials
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="prompt">Image Description *</Label>
            <Textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., A diverse group of people supporting each other in a community center, warm lighting, professional atmosphere"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="style">Style</Label>
            <Select value={style} onValueChange={setStyle}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="inspirational">Inspirational</SelectItem>
                <SelectItem value="community">Community Focused</SelectItem>
                <SelectItem value="celebration">Celebration</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={generateImage} 
            disabled={loading || !prompt.trim()}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating Image...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Image
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {generatedImage && (
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Generated Image</CardTitle>
            <CardDescription>Your AI-generated marketing image is ready</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative rounded-lg overflow-hidden border">
              <img 
                src={generatedImage} 
                alt="AI generated marketing" 
                className="w-full h-auto"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={downloadImage} className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Download Image
              </Button>
              <Button 
                onClick={() => setGeneratedImage(null)} 
                variant="outline"
                className="flex-1"
              >
                Generate Another
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
