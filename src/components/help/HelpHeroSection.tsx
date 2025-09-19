import { AlertTriangle } from "lucide-react";

export const HelpHeroSection = () => {
  return (
    <header className="relative bg-gradient-osu-primary text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-osu-gray/90 via-osu-scarlet/80 to-osu-scarlet-dark/70"></div>
      <div className="relative container py-16 md:py-24">
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <AlertTriangle className="h-8 w-8 text-white animate-pulse" />
            <span className="text-sm uppercase tracking-wider font-medium bg-white/20 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full">
              Crisis Support Available 24/7
            </span>
          </div>
          
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Need Help Right Now?
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
            You're not alone. Get immediate crisis support, emergency resources, or personalized guidance to find the help you need.
          </p>

          <div className="bg-osu-gray/20 backdrop-blur-sm border border-white/20 rounded-lg p-4 mb-8 max-w-md mx-auto">
            <p className="text-sm text-white/90">
              <strong>Need to exit quickly?</strong> Press Ctrl+Shift+Q for a safe exit
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};