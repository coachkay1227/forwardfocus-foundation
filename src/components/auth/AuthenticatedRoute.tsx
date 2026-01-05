import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

interface AuthenticatedRouteProps {
  children: ReactNode;
}

const AuthenticatedRoute = ({ children }: AuthenticatedRouteProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="space-y-4 w-full max-w-md p-8">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-8 w-3/4" />
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default AuthenticatedRoute;
