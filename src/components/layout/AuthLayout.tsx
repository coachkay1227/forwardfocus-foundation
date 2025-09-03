import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/3 via-background to-secondary/3">
      {/* Compact Top Bar */}
      <header className="h-14 bg-white/80 backdrop-blur-sm border-b shadow-sm">
        <div className="max-w-5xl mx-auto px-6 h-full flex items-center justify-between">
          <Link to="/" className="font-heading text-xl font-bold text-primary">
            Forward Focus Elevation
          </Link>
          <Link 
            to="/" 
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Auth Content */}
      <div className="max-w-5xl mx-auto px-6 min-h-[calc(100vh-56px)] grid md:grid-cols-2 items-center gap-10">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;