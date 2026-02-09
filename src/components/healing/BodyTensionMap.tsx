import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Activity, ShieldCheck, HeartPulse, Brain, Zap, User, ArrowLeft, RefreshCcw } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface Exercise {
  title: string;
  steps: string[];
  duration: string;
  type: string;
}

const exercises: Record<string, Exercise> = {
  head: {
    title: "Grounding Awareness",
    type: "Mental Focus",
    duration: "45s",
    steps: [
      "Find three colors you can see in the room right now.",
      "Identify two sounds you can hear, near or far.",
      "Notice one physical sensation, like your feet on the floor."
    ]
  },
  shoulders: {
    title: "Progressive Release",
    type: "Muscle Relaxation",
    duration: "60s",
    steps: [
      "Inhale deeply and shrug your shoulders up to your ears.",
      "Hold for 3 seconds, feeling the tension.",
      "Exhale sharply and let them drop completely. Repeat 3 times."
    ]
  },
  chest: {
    title: "Box Breathing",
    type: "Nervous System Regulation",
    duration: "60s",
    steps: [
      "Inhale for 4 counts.",
      "Hold for 4 counts.",
      "Exhale for 4 counts.",
      "Hold for 4 counts."
    ]
  },
  stomach: {
    title: "Centered Calm",
    type: "Vagus Nerve Stimulation",
    duration: "30s",
    steps: [
      "Place both hands flat on your belly.",
      "Take a breath that makes your hands move outward.",
      "Make a soft 'humming' sound as you exhale slowly."
    ]
  },
  hands: {
    title: "EFT Tapping (Release)",
    type: "Emotional Freedom Technique",
    duration: "45s",
    steps: [
      "Gently tap the side of one hand with the fingers of the other.",
      "Say to yourself: 'Even though I feel this stress, I accept myself.'",
      "Repeat the tapping while taking a slow, calming breath."
    ]
  },
  feet: {
    title: "Rooting Exercise",
    type: "Grounding",
    duration: "30s",
    steps: [
      "Press your big toes into the ground as hard as you can.",
      "Release. Now press your heels into the ground.",
      "Feel the solid support of the earth beneath you."
    ]
  }
};

const BodyTensionMap = () => {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [stepIndex, setStepIndex] = useState(0);

  const selectArea = (area: string) => {
    setSelectedArea(area);
    setStepIndex(0);
  };

  const exercise = selectedArea ? exercises[selectedArea] : null;

  return (
    <Card className="w-full bg-white/40 backdrop-blur-md border-osu-gray/10 shadow-xl min-h-[500px] flex flex-col">
      <CardHeader className="text-center pb-2">
        <div className="flex justify-center mb-2">
          <div className="p-2 bg-blue-50 rounded-full">
            <ShieldCheck className="h-6 w-6 text-blue-600" />
          </div>
        </div>
        <CardTitle className="text-2xl font-heading text-foreground">Somatic Tension Map</CardTitle>
        <CardDescription>
          Where are you holding stress right now? Click an area to start a quick release exercise.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col justify-center p-6">
        {!selectedArea ? (
          <div className="relative w-full max-w-[280px] mx-auto animate-in fade-in duration-700">
            {/* Simple Button-based Body Map Layout */}
            <div className="flex flex-col items-center gap-4">
              <Button
                variant="outline"
                onClick={() => selectArea('head')}
                className="w-16 h-16 rounded-full border-2 border-osu-gray/20 hover:border-osu-scarlet hover:bg-osu-scarlet/5 flex flex-col gap-1"
              >
                <Brain className="h-5 w-5" />
                <span className="text-[10px] uppercase font-bold">Head</span>
              </Button>

              <Button
                variant="outline"
                onClick={() => selectArea('shoulders')}
                className="w-48 h-12 rounded-full border-2 border-osu-gray/20 hover:border-osu-scarlet hover:bg-osu-scarlet/5 flex gap-2"
              >
                <Zap className="h-5 w-5" />
                <span className="text-xs uppercase font-bold tracking-widest">Shoulders</span>
              </Button>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => selectArea('hands')}
                  className="w-12 h-24 rounded-full border-2 border-osu-gray/20 hover:border-osu-scarlet hover:bg-osu-scarlet/5 flex flex-col"
                >
                  <span className="rotate-90 text-[10px] uppercase font-bold">Hand</span>
                </Button>

                <div className="flex flex-col gap-4">
                  <Button
                    variant="outline"
                    onClick={() => selectArea('chest')}
                    className="w-24 h-24 rounded-2xl border-2 border-osu-gray/20 hover:border-osu-scarlet hover:bg-osu-scarlet/5 flex flex-col gap-1"
                  >
                    <HeartPulse className="h-6 w-6" />
                    <span className="text-[10px] uppercase font-bold">Chest</span>
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => selectArea('stomach')}
                    className="w-24 h-20 rounded-2xl border-2 border-osu-gray/20 hover:border-osu-scarlet hover:bg-osu-scarlet/5 flex flex-col gap-1"
                  >
                    <Activity className="h-6 w-6" />
                    <span className="text-[10px] uppercase font-bold">Core</span>
                  </Button>
                </div>

                <Button
                  variant="outline"
                  onClick={() => selectArea('hands')}
                  className="w-12 h-24 rounded-full border-2 border-osu-gray/20 hover:border-osu-scarlet hover:bg-osu-scarlet/5 flex flex-col"
                >
                  <span className="-rotate-90 text-[10px] uppercase font-bold">Hand</span>
                </Button>
              </div>

              <Button
                variant="outline"
                onClick={() => selectArea('feet')}
                className="w-32 h-12 rounded-full border-2 border-osu-gray/20 hover:border-osu-scarlet hover:bg-osu-scarlet/5 flex gap-2"
              >
                <User className="h-5 w-5" />
                <span className="text-xs uppercase font-bold tracking-widest">Lower Body</span>
              </Button>
            </div>

            <p className="mt-8 text-center text-[10px] text-muted-foreground uppercase tracking-widest font-medium">
              Click an area to begin stabilization
            </p>
          </div>
        ) : (
          <div className="animate-in slide-in-from-right-8 duration-500 space-y-6">
            <div className="flex items-center justify-between border-b border-osu-gray/10 pb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedArea(null)}
                className="text-muted-foreground hover:text-osu-scarlet"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
              <div className="text-right">
                <p className="text-[10px] font-bold text-osu-scarlet uppercase tracking-widest">{exercise?.type}</p>
                <p className="text-xs text-muted-foreground flex items-center justify-end gap-1">
                  <RefreshCcw className="h-3 w-3" />
                  {exercise?.duration}
                </p>
              </div>
            </div>

            <div className="py-8 space-y-8 text-center">
              <h3 className="text-3xl font-heading font-bold text-foreground">{exercise?.title}</h3>

              <div className="bg-white/60 p-8 rounded-3xl border border-osu-scarlet/5 shadow-inner min-h-[160px] flex items-center justify-center">
                <p className="text-xl md:text-2xl font-medium text-foreground animate-pulse">
                  {exercise?.steps[stepIndex]}
                </p>
              </div>

              <div className="space-y-4">
                <Progress value={((stepIndex + 1) / (exercise?.steps.length || 1)) * 100} className="h-2 bg-osu-gray/10" />
                <div className="flex justify-between items-center text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  <span>Step {stepIndex + 1} of {exercise?.steps.length}</span>
                  {stepIndex < (exercise?.steps.length || 0) - 1 ? (
                    <Button
                      size="sm"
                      onClick={() => setStepIndex(stepIndex + 1)}
                      className="bg-osu-scarlet text-white h-8"
                    >
                      Next Step
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => setSelectedArea(null)}
                      className="bg-green-600 hover:bg-green-700 text-white h-8"
                    >
                      Done
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <p className="text-[10px] text-center text-muted-foreground leading-relaxed italic">
              Clinical Note: Somatic exercises help re-center the nervous system during moments of hyper-arousal or dissociation.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BodyTensionMap;
