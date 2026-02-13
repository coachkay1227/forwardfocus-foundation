import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Flame, Wind, Sparkles } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const DigitalRelease = () => {
  const [content, setContent] = useState('');
  const [isReleasing, setIsReleasing] = useState(false);
  const [releaseType, setReleaseType] = useState<'burn' | 'wind'>('burn');

  const handleRelease = () => {
    if (!content.trim()) {
      toast({
        title: "Nothing to release",
        description: "Write down what's on your mind first.",
        variant: "destructive"
      });
      return;
    }

    setIsReleasing(true);

    // Animation duration logic
    setTimeout(() => {
      setContent('');
      setIsReleasing(false);
      toast({
        title: "Released to the Universe",
        description: "Your words have been transformed and let go. This space is now clear.",
      });
    }, 2000);
  };

  return (
    <Card className="w-full bg-white/40 backdrop-blur-md border-osu-gray/10 shadow-xl overflow-hidden transition-all duration-500">
      <CardHeader className="text-center">
        <div className="flex justify-center gap-4 mb-2">
          <div className={`p-2 rounded-full transition-colors ${releaseType === 'burn' ? 'bg-osu-scarlet/20 text-osu-scarlet' : 'bg-transparent text-muted-foreground'}`}>
            <Flame className="h-6 w-6 cursor-pointer" onClick={() => setReleaseType('burn')} />
          </div>
          <div className={`p-2 rounded-full transition-colors ${releaseType === 'wind' ? 'bg-blue-100 text-blue-600' : 'bg-transparent text-muted-foreground'}`}>
            <Wind className="h-6 w-6 cursor-pointer" onClick={() => setReleaseType('wind')} />
          </div>
        </div>
        <CardTitle className="text-2xl font-heading text-foreground">Digital Release & Venting</CardTitle>
        <CardDescription>
          Pour out your heavy thoughts, frustrations, or pains.
          When you're ready, release them. They are never saved.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write freely here... No one will ever read this."
            className={`min-h-[200px] bg-white/50 border-osu-gray/20 focus:ring-osu-scarlet/20 text-lg leading-relaxed transition-all duration-1000 ${
              isReleasing
                ? (releaseType === 'burn' ? 'opacity-0 scale-95 blur-sm translate-y-[-20px] grayscale contrast-150' : 'opacity-0 translate-x-[100px] skew-x-12 blur-md')
                : 'opacity-100'
            }`}
            disabled={isReleasing}
          />
          {isReleasing && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {releaseType === 'burn' ? (
                <div className="flex flex-col items-center animate-bounce">
                  <Flame className="h-16 w-16 text-osu-scarlet animate-pulse" />
                  <span className="text-osu-scarlet font-bold text-sm tracking-widest uppercase mt-2">Transforming...</span>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Wind className="h-16 w-16 text-blue-400 animate-out fade-out slide-out-to-right-full duration-1000" />
                  <span className="text-blue-500 font-bold text-sm tracking-widest uppercase mt-2">Carrying away...</span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <Button
            onClick={handleRelease}
            disabled={isReleasing || !content.trim()}
            className={`w-full h-14 text-lg font-bold shadow-lg transition-all active:scale-95 ${
              releaseType === 'burn'
                ? 'bg-gradient-to-r from-osu-scarlet to-orange-600 hover:shadow-osu-scarlet/40'
                : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:shadow-blue-500/40'
            }`}
          >
            {isReleasing ? (
              <Sparkles className="h-5 w-5 animate-spin mr-2" />
            ) : (
              releaseType === 'burn' ? 'Release to the Fire' : 'Release to the Wind'
            )}
          </Button>
          <p className="text-[10px] text-center text-muted-foreground uppercase tracking-tighter">
            Clinical Note: Expressive writing helps regulate emotions and reduce stress.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DigitalRelease;
