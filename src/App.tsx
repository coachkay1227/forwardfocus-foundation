import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import GetHelpNow from "./pages/GetHelpNow";
import OhioResources from "./pages/OhioResources";
import LearnGrow from "./pages/LearnGrow";
import JoinCommunity from "./pages/JoinCommunity";
import AboutUs from "./pages/AboutUs";
import Support from "./pages/Support";
import Login from "./pages/Login";
import Search from "./pages/Search";
import { StateProvider } from "./contexts/StateContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <StateProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/help" element={<GetHelpNow />} />
              <Route path="/ohio-resources" element={<OhioResources />} />
              <Route path="/learn" element={<LearnGrow />} />
              <Route path="/community" element={<JoinCommunity />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/support" element={<Support />} />
              <Route path="/login" element={<Login />} />
              <Route path="/search" element={<Search />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </StateProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
