import React, { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class AiErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('AI Component Error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-[400px] p-6">
          <div className="max-w-md text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-3 bg-destructive/10 rounded-full">
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
            </div>
            
            <h3 className="text-lg font-semibold">Something went wrong on our end</h3>
            
            <p className="text-sm text-muted-foreground">
              We're experiencing technical difficulties with this AI assistant. 
              Our team has been notified and is working on a fix.
            </p>

            <div className="space-y-2 pt-4">
              <Button 
                onClick={this.handleReset} 
                className="w-full"
                variant="default"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
              
              <div className="pt-4 border-t">
                <p className="text-xs text-muted-foreground mb-3">
                  Need immediate assistance?
                </p>
                <div className="space-y-2">
                  <Button 
                    asChild
                    variant="outline" 
                    size="sm"
                    className="w-full"
                  >
                    <a href="tel:911">
                      <Phone className="h-3 w-3 mr-2" />
                      Call 911 (Emergency)
                    </a>
                  </Button>
                  <Button 
                    asChild
                    variant="outline" 
                    size="sm"
                    className="w-full"
                  >
                    <a href="tel:988">
                      <Phone className="h-3 w-3 mr-2" />
                      Call 988 (Crisis Support)
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
