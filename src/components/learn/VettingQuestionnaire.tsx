import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, ArrowRight, Sparkles, Brain, Target, Zap } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const vettingQuestions = [
  {
    id: 'readiness',
    question: "Are you committed to dedicating 15 minutes a day to your personal transformation?",
    icon: Target,
    color: "text-osu-scarlet"
  },
  {
    id: 'tech-curiosity',
    question: "Are you interested in learning how to use AI (like ChatGPT) to simplify your life and goals?",
    icon: Zap,
    color: "text-blue-500"
  },
  {
    id: 'mindfulness',
    question: "Do you believe that mental clarity and mindfulness are key to long-term success?",
    icon: Brain,
    color: "text-purple-500"
  },
  {
    id: 'purpose',
    question: "Are you ready to move beyond your past and focus entirely on your next chapter?",
    icon: Sparkles,
    color: "text-orange-500"
  }
];

interface VettingQuestionnaireProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VettingQuestionnaire = ({ isOpen, onClose }: VettingQuestionnaireProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isQualified, setIsQualified] = useState(false);

  const handleAnswer = (answer: boolean) => {
    if (currentStep < vettingQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsQualified(true);
    }
  };

  const progress = ((currentStep + 1) / vettingQuestions.length) * 100;
  const currentQuestion = vettingQuestions[currentStep];
  const Icon = currentQuestion.icon;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-cream/95 backdrop-blur-md border-osu-gray/10">
        {!isQualified ? (
          <div className="space-y-6 py-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <DialogHeader>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-osu-scarlet">Qualification Check</span>
                <span className="text-[10px] font-bold text-muted-foreground uppercase">Step {currentStep + 1} of {vettingQuestions.length}</span>
              </div>
              <DialogTitle className="text-2xl font-heading font-bold text-foreground leading-tight">
                {currentQuestion.question}
              </DialogTitle>
              <DialogDescription className="sr-only">Vetting question for Focus Flow Elevation Hub</DialogDescription>
            </DialogHeader>

            <div className="flex justify-center py-8">
              <div className={`p-6 rounded-full bg-white shadow-inner border border-osu-gray/5 ${currentQuestion.color}`}>
                <Icon className="h-12 w-12" />
              </div>
            </div>

            <Progress value={progress} className="h-1 bg-osu-gray/10" />

            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={() => handleAnswer(false)}
                className="h-12 border-osu-gray/20 hover:bg-osu-gray/5 font-semibold"
              >
                Not Yet
              </Button>
              <Button
                onClick={() => handleAnswer(true)}
                className="h-12 bg-osu-scarlet hover:bg-osu-scarlet-dark text-white font-bold"
              >
                Absolutely
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-8 py-6 text-center animate-in zoom-in-95 duration-500">
            <DialogHeader>
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-12 w-12 text-green-600" />
              </div>
              <DialogTitle className="text-3xl font-heading font-bold text-foreground">
                You're Qualified!
              </DialogTitle>
              <DialogDescription className="text-lg text-muted-foreground mt-4 leading-relaxed">
                Welcome to the Focus Flow Elevation Hub. You're ready for your next chapter.
              </DialogDescription>
            </DialogHeader>

            <div className="bg-white/60 p-6 rounded-2xl border border-osu-scarlet/10 shadow-sm">
              <p className="text-sm font-medium text-foreground mb-6">
                Click the button below to join our private community and start your AI & Life Transformation.
              </p>
              <Button
                asChild
                className="get-involved-gold-button border-none w-full h-14 text-lg shadow-xl"
              >
                <a href="https://skool.com/focusflow-elevation-hub" target="_blank" rel="noopener noreferrer">
                  Enter the Hub Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>

            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
              Success is a choice. You've just made yours.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
