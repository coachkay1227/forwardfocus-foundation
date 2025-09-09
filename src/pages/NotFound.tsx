import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/" className="text-primary hover:text-primary/80 underline">
            Return to Home
          </a>
          <a href="/victim-services" className="text-primary hover:text-primary/80 underline">
            Access Healing Hub
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
