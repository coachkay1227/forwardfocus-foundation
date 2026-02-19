import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, Circle, ExternalLink, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  steps: string[];
  url?: string;
  priority: "critical" | "high" | "medium";
  estimatedTime: string;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: "password-protection",
    title: "Enable Leaked Password Protection",
    description: "Prevent users from using compromised passwords",
    priority: "critical",
    estimatedTime: "2 minutes",
    url: `https://supabase.com/dashboard/project/${import.meta.env.VITE_SUPABASE_PROJECT_ID}/auth/settings`,
    steps: [
      "Click the button below to open Auth Settings",
      "Scroll down to 'Password Security' section",
      "Toggle ON 'Enable Leaked Password Protection'",
      "Click 'Save' at the bottom of the page",
      "Mark this item as complete below"
    ]
  },
  {
    id: "test-email-delivery",
    title: "Test Email Delivery",
    description: "Verify email campaigns and reminders are working correctly",
    priority: "high",
    estimatedTime: "10 minutes",
    steps: [
      "Navigate to the Admin Dashboard → Email tab",
      "Use the Test Email Sender to send a test email",
      "Verify the email is received and formatted correctly",
      "Check the Email Deliverability dashboard for delivery status",
      "Mark this item as complete below"
    ]
  }
];

export function PreLaunchChecklist() {
  const [completedItems, setCompletedItems] = useState<Set<string>>(
    new Set(JSON.parse(localStorage.getItem("prelaunch-checklist") || "[]"))
  );

  const toggleComplete = (id: string) => {
    const newCompleted = new Set(completedItems);
    if (newCompleted.has(id)) {
      newCompleted.delete(id);
    } else {
      newCompleted.add(id);
    }
    setCompletedItems(newCompleted);
    localStorage.setItem("prelaunch-checklist", JSON.stringify([...newCompleted]));
    
    toast.success(
      newCompleted.has(id) ? "Item marked as complete ✓" : "Item marked as incomplete"
    );
  };

  const completionPercentage = Math.round((completedItems.size / CHECKLIST_ITEMS.length) * 100);
  const isReady = completionPercentage === 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">🚀 Pre-Launch Checklist</h2>
          <p className="text-muted-foreground mt-1">
            Complete these critical tasks before launching
          </p>
        </div>
        <div className="text-right">
          <div className="text-4xl font-bold text-osu-scarlet">{completionPercentage}%</div>
          <div className="text-sm text-muted-foreground">Complete</div>
        </div>
      </div>

      {/* Progress Alert */}
      {isReady ? (
        <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
          <AlertDescription className="text-green-800 dark:text-green-200 font-medium">
            🎉 All pre-launch tasks complete! Your site is ready to launch.
          </AlertDescription>
        </Alert>
      ) : (
        <Alert className="border-osu-scarlet bg-osu-scarlet/10">
          <AlertTriangle className="h-5 w-5 text-osu-scarlet" />
          <AlertDescription className="text-osu-scarlet-dark font-medium">
            {CHECKLIST_ITEMS.length - completedItems.size} critical item(s) remaining before launch
          </AlertDescription>
        </Alert>
      )}

      {/* Checklist Items */}
      <div className="space-y-4">
        {CHECKLIST_ITEMS.map((item) => {
          const isComplete = completedItems.has(item.id);
          
          return (
            <Card key={item.id} className={isComplete ? "border-green-500 bg-green-50/50 dark:bg-green-950/20" : ""}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <button
                      onClick={() => toggleComplete(item.id)}
                      className="mt-1 transition-transform hover:scale-110"
                    >
                      {isComplete ? (
                        <CheckCircle2 className="h-6 w-6 text-green-600" />
                      ) : (
                        <Circle className="h-6 w-6 text-muted-foreground" />
                      )}
                    </button>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <CardTitle className={isComplete ? "line-through text-muted-foreground" : ""}>
                          {item.title}
                        </CardTitle>
                        <Badge variant={item.priority === "critical" ? "destructive" : "secondary"}>
                          {item.priority}
                        </Badge>
                        <Badge variant="outline">{item.estimatedTime}</Badge>
                      </div>
                      <CardDescription className="mt-1">
                        {item.description}
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Steps */}
                <div className="space-y-2">
                  <div className="text-sm font-medium">Steps:</div>
                  <ol className="space-y-2 text-sm">
                    {item.steps.map((step, index) => (
                      <li key={index} className="flex gap-2">
                        <span className="text-osu-scarlet font-bold min-w-[20px]">
                          {index + 1}.
                        </span>
                        <span className="text-muted-foreground">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  {item.url && (
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => window.open(item.url, "_blank")}
                      className="bg-osu-scarlet hover:bg-osu-scarlet-dark"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open Settings
                    </Button>
                  )}
                  
                  <Button
                    variant={isComplete ? "secondary" : "default"}
                    size="sm"
                    onClick={() => toggleComplete(item.id)}
                  >
                    {isComplete ? "Mark Incomplete" : "Mark Complete"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Final CTA */}
      {isReady && (
        <Card className="border-osu-scarlet bg-gradient-to-br from-osu-scarlet/10 to-osu-scarlet/5">
          <CardHeader>
            <CardTitle className="text-2xl">🎊 Ready to Launch!</CardTitle>
            <CardDescription>
              All critical pre-launch tasks are complete. Your site is ready to go live.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              size="lg"
              className="bg-osu-scarlet hover:bg-osu-scarlet-dark get-involved-gold-button"
              onClick={() => toast.success("Deploy your site when you're ready!")}
            >
              Your site is ready to deploy! 🚀
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}