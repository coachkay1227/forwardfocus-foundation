import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Book, Sparkles, Trash2, Save, ChevronRight, History } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';

const prompts = [
  "What is one thing your past self would be proud of today?",
  "Describe your 'Safe Place' using all five senses.",
  "Write a short letter of forgiveness to yourself.",
  "What does 'peace' look like for you in this moment?",
  "List three small victories you've had this week.",
  "If your strength was a physical object, what would it be and why?",
  "What is a boundary you are proud of setting recently?",
  "Describe a moment today when you felt even a tiny spark of hope."
];

interface JournalEntry {
  id: string;
  prompt: string;
  content: string;
  timestamp: string;
}

const SoulJournal = () => {
  const [content, setContent] = useState('');
  const [currentPrompt, setCurrentPrompt] = useState(prompts[0]);
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('soul_journal_entries');
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  const saveToHistory = () => {
    if (!content.trim()) return;

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      prompt: currentPrompt,
      content: content.trim(),
      timestamp: new Date().toLocaleString()
    };

    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    localStorage.setItem('soul_journal_entries', JSON.stringify(updatedEntries));
    setContent('');
    toast({
      title: "Saved to Your Journey",
      description: "Your reflection has been safely stored locally.",
    });
  };

  const newPrompt = () => {
    const next = prompts[Math.floor(Math.random() * prompts.length)];
    setCurrentPrompt(next);
  };

  const clearJournal = () => {
    setContent('');
    toast({
      title: "Cleared",
      description: "Your current writing has been cleared.",
    });
  };

  const deleteEntry = (id: string) => {
    const updated = entries.filter(e => e.id !== id);
    setEntries(updated);
    localStorage.setItem('soul_journal_entries', JSON.stringify(updated));
  };

  return (
    <Card className="w-full bg-white/40 backdrop-blur-md border-osu-gray/10 shadow-xl overflow-hidden">
      <CardHeader className="border-b border-osu-gray/5 bg-cream/20">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2 text-osu-scarlet">
            <Book className="h-5 w-5" />
            <span className="font-bold tracking-tight text-sm uppercase">Coach Kay's Guided Reflection</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowHistory(!showHistory)}
            className="text-xs text-muted-foreground hover:text-osu-scarlet"
          >
            {showHistory ? <Sparkles className="h-4 w-4 mr-1" /> : <History className="h-4 w-4 mr-1" />}
            {showHistory ? "Back to Journal" : "My Journey"}
          </Button>
        </div>
        <CardTitle className="text-xl font-heading text-foreground">Soul Journal</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {!showHistory ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white/60 p-4 rounded-xl border border-osu-scarlet/10 relative group">
              <p className="text-lg font-medium text-foreground leading-snug pr-8">
                "{currentPrompt}"
              </p>
              <Button
                variant="ghost"
                size="icon"
                onClick={newPrompt}
                className="absolute right-2 top-2 h-8 w-8 text-muted-foreground hover:text-osu-scarlet"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Reflect here... Be honest, be gentle."
              className="min-h-[250px] bg-white/50 border-osu-gray/20 focus:ring-osu-scarlet/20 text-base leading-relaxed resize-none"
            />

            <div className="flex gap-3">
              <Button
                onClick={saveToHistory}
                disabled={!content.trim()}
                className="flex-1 bg-osu-scarlet hover:bg-osu-scarlet-dark text-white font-bold"
              >
                <Save className="h-4 w-4 mr-2" />
                Save to My Journey
              </Button>
              <Button
                variant="outline"
                onClick={clearJournal}
                disabled={!content.trim()}
                className="border-osu-gray/20 text-osu-gray hover:bg-osu-gray/5"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest">
              Note: This journal is stored locally in your browser. Clearing your cache may delete entries.
            </p>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h4 className="font-bold text-osu-scarlet mb-4 flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Your Healing History
            </h4>
            <ScrollArea className="h-[400px] pr-4">
              {entries.length === 0 ? (
                <div className="text-center py-20 opacity-50">
                  <Book className="h-12 w-12 mx-auto mb-2" />
                  <p>Your journey is just beginning.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {entries.map((entry) => (
                    <div key={entry.id} className="bg-white/60 p-4 rounded-xl border border-osu-gray/10 relative group hover:border-osu-scarlet/20 transition-colors">
                      <p className="text-[10px] text-muted-foreground mb-1">{entry.timestamp}</p>
                      <p className="text-xs font-bold text-osu-scarlet/70 mb-2 italic">Q: {entry.prompt}</p>
                      <p className="text-sm text-foreground whitespace-pre-wrap">{entry.content}</p>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteEntry(entry.id)}
                        className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SoulJournal;
