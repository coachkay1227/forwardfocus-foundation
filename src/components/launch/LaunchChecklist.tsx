import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Circle, AlertTriangle, Rocket, Shield, Database, Mail, Zap } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed' | 'warning' | 'error';
  category: 'security' | 'database' | 'email' | 'performance' | 'analytics';
  icon: React.ElementType;
  priority: 'high' | 'medium' | 'low';
  checkFunction?: () => Promise<boolean>;
}

const LaunchChecklist = () => {
  const { user, isAdmin } = useAuth();
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([
    {
      id: 'resend-key',
      title: 'Email Service Configuration',
      description: 'RESEND_API_KEY is configured for email functionality',
      status: 'pending',
      category: 'email',
      icon: Mail,
      priority: 'high',
      checkFunction: async () => {
        try {
          const { data, error } = await supabase.functions.invoke('send-auth-email', {
            body: { email: 'test@example.com', type: 'test' }
          });
          return !error;
        } catch {
          return false;
        }
      }
    },
    {
      id: 'database-rls',
      title: 'Database Security (RLS)',
      description: 'Row Level Security policies are properly configured',
      status: 'pending',
      category: 'security',
      icon: Shield,
      priority: 'high'
    },
    {
      id: 'analytics-tracking',
      title: 'Analytics Implementation',
      description: 'User interactions and conversions are being tracked',
      status: 'pending',
      category: 'analytics',
      icon: Zap,
      priority: 'medium',
      checkFunction: async () => {
        try {
          const { data } = await supabase.from('ai_usage_analytics').select('id').limit(1);
          return data !== null;
        } catch {
          return false;
        }
      }
    },
    {
      id: 'edge-functions',
      title: 'Edge Functions Status',
      description: 'All AI chat systems and email functions are working',
      status: 'pending',
      category: 'performance',
      icon: Zap,
      priority: 'high'
    },
    {
      id: 'admin-account',
      title: 'Admin Account Setup',
      description: 'At least one admin account is configured',
      status: 'pending',
      category: 'security',
      icon: Shield,
      priority: 'high',
      checkFunction: async () => {
        try {
          const { data } = await supabase.from('user_roles').select('id').eq('role', 'admin').limit(1);
          return data && data.length > 0;
        } catch {
          return false;
        }
      }
    },
    {
      id: 'newsletter-system',
      title: 'Newsletter System',
      description: 'Newsletter signup and admin campaigns are functional',
      status: 'pending',
      category: 'email',
      icon: Mail,
      priority: 'medium'
    },
    {
      id: 'partner-verification',
      title: 'Partner Verification Workflow',
      description: 'Partner verification and access controls are working',
      status: 'pending',
      category: 'security',
      icon: Shield,
      priority: 'medium'
    },
    {
      id: 'performance-optimization',
      title: 'Performance Optimization',
      description: 'Images, loading states, and error boundaries implemented',
      status: 'completed',
      category: 'performance',
      icon: Zap,
      priority: 'medium'
    }
  ]);

  const [overallProgress, setOverallProgress] = useState(0);
  const [isRunningChecks, setIsRunningChecks] = useState(false);

  const runAllChecks = async () => {
    if (!isAdmin) return;

    setIsRunningChecks(true);
    const updatedItems = [...checklistItems];

    for (let i = 0; i < updatedItems.length; i++) {
      const item = updatedItems[i];
      if (item.checkFunction) {
        try {
          const result = await item.checkFunction();
          item.status = result ? 'completed' : 'error';
        } catch (error) {
          console.error(`Check failed for ${item.id}:`, error);
          item.status = 'error';
        }
      }
    }

    setChecklistItems(updatedItems);
    setIsRunningChecks(false);
  };

  useEffect(() => {
    const completed = checklistItems.filter(item => item.status === 'completed').length;
    const progress = (completed / checklistItems.length) * 100;
    setOverallProgress(progress);
  }, [checklistItems]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Circle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      completed: 'default',
      error: 'destructive',
      warning: 'secondary',
      pending: 'outline'
    };
    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, React.ElementType> = {
      security: Shield,
      database: Database,
      email: Mail,
      performance: Zap,
      analytics: Zap
    };
    const Icon = icons[category] || Circle;
    return <Icon className="h-4 w-4" />;
  };

  const groupedItems = checklistItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, ChecklistItem[]>);

  if (!isAdmin) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="h-5 w-5" />
            Launch Readiness
          </CardTitle>
          <CardDescription>
            Admin access required to view launch checklist
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="h-5 w-5" />
            Launch Readiness Checklist
          </CardTitle>
          <CardDescription>
            Complete these items before launching your application
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-muted-foreground">{Math.round(overallProgress)}%</span>
            </div>
            <Progress value={overallProgress} className="h-2" />
          </div>
          
          <Button 
            onClick={runAllChecks} 
            disabled={isRunningChecks}
            className="w-full"
          >
            {isRunningChecks ? 'Running Checks...' : 'Run All Checks'}
          </Button>
        </CardContent>
      </Card>

      {Object.entries(groupedItems).map(([category, items]) => (
        <Card key={category}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 capitalize">
              {getCategoryIcon(category)}
              {category} Checks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg border">
                  <div className="flex-shrink-0 mt-0.5">
                    {getStatusIcon(item.status)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{item.title}</h4>
                      {getStatusBadge(item.status)}
                      <Badge variant="outline" className="text-xs">
                        {item.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default LaunchChecklist;