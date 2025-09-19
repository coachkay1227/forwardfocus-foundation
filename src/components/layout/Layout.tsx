import EmergencyBar from "./EmergencyBar";
import Header from "./Header";
import Footer from "./Footer";
import { EmergencySafetySystem } from "../safety/EmergencySafetySystem";


const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col font-body">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-background focus:text-foreground focus:ring-2 focus:ring-ring rounded px-3 py-2">Skip to content</a>
      <EmergencyBar />
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
      <EmergencySafetySystem />
    </div>
  );
};

export default Layout;
