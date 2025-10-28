import React, { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { SecurityProvider } from "@/components/security/SecurityProvider";
import { SecurityHeaders } from "@/components/security/SecurityHeaders";
import { SessionSecurityProvider } from "@/components/security/SessionSecurityProvider";
import { EnhancedErrorBoundary } from "@/components/ui/enhanced-error-boundary";
import { PageLoadingSkeleton } from "@/components/ui/loading-states";
import Layout from "./components/layout/Layout";
import { StateProvider } from "./contexts/StateContext";
import { AnalyticsProvider } from "./components/layout/AnalyticsProvider";

// Eager load critical pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import GetHelpNow from "./pages/GetHelpNow";
import Auth from "./pages/Auth";

// Lazy load secondary pages for better performance
const VictimServices = lazy(() => import("./pages/VictimServices"));
const LearnGrow = lazy(() => import("./pages/LearnGrow"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Support = lazy(() => import("./pages/Support"));
const Register = lazy(() => import("./pages/Register"));
const PartnerSignIn = lazy(() => import("./pages/PartnerSignIn"));
const PartnerSignUp = lazy(() => import("./pages/PartnerSignUp"));
const PartnerDashboard = lazy(() => import("./pages/PartnerDashboard"));
const Admin = lazy(() => import("./pages/Admin"));
const Search = lazy(() => import("./pages/Search"));
const Discover = lazy(() => import("./pages/Discover"));
const Partners = lazy(() => import("./pages/Partners"));
const SubmitReferral = lazy(() => import("./pages/SubmitReferral"));
const AddResource = lazy(() => import("./pages/AddResource"));
const RequestPartnership = lazy(() => import("./pages/RequestPartnership"));
const RequestPartnerVerification = lazy(() => import("./pages/RequestPartnerVerification"));
const Organizations = lazy(() => import("./pages/Organizations"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const DonationSuccess = lazy(() => import("./pages/DonationSuccess"));
const SetupAdmin = lazy(() => import("./pages/SetupAdmin"));
const AdminGuide = lazy(() => import("./pages/AdminGuide"));
const SuccessStories = lazy(() => import("./pages/SuccessStories"));

const queryClient = new QueryClient();

const App = () => {
  // Initialize security systems
  React.useEffect(() => {
    console.log('Security systems initialized');
  }, []);

  return (
  <EnhancedErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SecurityProvider>
          <SessionSecurityProvider>
            <AuthProvider>
              {/* <AntiWhiteLabelProtection /> */}
              <SecurityHeaders />
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <AnalyticsProvider>
                  <StateProvider>
                    <Layout>
                      <Suspense fallback={<PageLoadingSkeleton />}>
                        <Routes>
                          <Route path="/" element={<Index />} />
                          <Route path="/help" element={<GetHelpNow />} />
                          <Route path="/ohio-resources" element={<Navigate to="/help" replace />} />
                          <Route path="/victim-services" element={<VictimServices />} />
                          <Route path="/learn" element={<LearnGrow />} />
                          <Route path="/community" element={<Navigate to="/learn" replace />} />
                          <Route path="/about" element={<AboutUs />} />
                          <Route path="/support" element={<Support />} />
                          <Route path="/auth" element={<Auth />} />
                          <Route path="/register" element={<Register />} />
                          <Route path="/partner-signin" element={<PartnerSignIn />} />
                          <Route path="/partner-signup" element={<PartnerSignUp />} />
                          <Route path="/partner-dashboard" element={<PartnerDashboard />} />
                          <Route path="/login" element={<Navigate to="/auth" replace />} />
                          <Route path="/setup-admin" element={<SetupAdmin />} />
                          <Route path="/admin" element={<Admin />} />
                          <Route path="/admin-guide" element={<AdminGuide />} />
                          <Route path="/success-stories" element={<SuccessStories />} />
                          <Route path="/search" element={<Search />} />
                          <Route path="/discover" element={<Discover />} />
                          <Route path="/partners" element={<Partners />} />
                          <Route path="/partners/submit-referral" element={<SubmitReferral />} />
                          <Route path="/partners/add-resource" element={<AddResource />} />
                          <Route path="/partners/request" element={<RequestPartnership />} />
                          <Route path="/partners/request-verification" element={<RequestPartnerVerification />} />
                          <Route path="/RequestPartnership" element={<RequestPartnership />} />
                          <Route path="/organizations" element={<Organizations />} />
                          <Route path="/privacy" element={<PrivacyPolicy />} />
                          <Route path="/terms" element={<TermsOfService />} />
                          <Route path="/donation-success" element={<DonationSuccess />} />
                          <Route path="/resources/:id" element={<Navigate to="/help" replace />} />
                          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </Suspense>
                    </Layout>
                  </StateProvider>
                </AnalyticsProvider>
              </BrowserRouter>
            </AuthProvider>
          </SessionSecurityProvider>
        </SecurityProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </EnhancedErrorBoundary>
  );
};

export default App;
