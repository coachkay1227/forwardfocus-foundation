import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { SecurityProvider } from "@/components/security/SecurityProvider";
import { SecurityHeaders } from "@/components/security/SecurityHeaders";
import { AntiWhiteLabelProtection } from "@/components/security/AntiWhiteLabelProtection";
import { SessionSecurityProvider } from "@/components/security/SessionSecurityProvider";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import GetHelpNow from "./pages/GetHelpNow";

import VictimServices from "./pages/VictimServices";
import LearnGrow from "./pages/LearnGrow";

import AboutUs from "./pages/AboutUs";
import Support from "./pages/Support";
import Auth from "./pages/Auth";
import Register from "./pages/Register";
import PartnerSignIn from "./pages/PartnerSignIn";
import PartnerSignUp from "./pages/PartnerSignUp";
import Admin from "./pages/Admin";
import Search from "./pages/Search";
import Discover from "./pages/Discover";
import Partners from "./pages/Partners";
import SubmitReferral from "./pages/SubmitReferral";
import AddResource from "./pages/AddResource";
import RequestPartnership from "./pages/RequestPartnership";
import RequestPartnerVerification from "./pages/RequestPartnerVerification";
import Organizations from "./pages/Organizations";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import DonationSuccess from "./pages/DonationSuccess";

import { StateProvider } from "./contexts/StateContext";
import { AnalyticsProvider } from "./components/layout/AnalyticsProvider";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SecurityProvider>
        <SessionSecurityProvider>
          <AuthProvider>
            <AntiWhiteLabelProtection />
            <SecurityHeaders />
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AnalyticsProvider>
                <StateProvider>
              <Layout>
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
                  <Route path="/login" element={<Navigate to="/auth" replace />} />
                  <Route path="/admin" element={<Admin />} />
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
              </Layout>
                </StateProvider>
              </AnalyticsProvider>
            </BrowserRouter>
          </AuthProvider>
        </SessionSecurityProvider>
      </SecurityProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
